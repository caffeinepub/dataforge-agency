import Time "mo:core/Time";
import Order "mo:core/Order";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Authorization
  // =============

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Helper function for admin authorization
  func assertAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // Hardcoded admin password claim
  let ADMIN_PASSWORD = "DataForge@2024";

  public shared ({ caller }) func claimAdminWithPassword(password : Text) : async Bool {
    if (password == ADMIN_PASSWORD) {
      accessControlState.userRoles.add(caller, #admin);
      accessControlState.adminAssigned := true;
      true;
    } else {
      false;
    };
  };

  // Content Types
  // =============

  public type UserProfile = {
    name : Text;
  };

  type ContentState = {
    heroHeadline : Text;
    heroSubheading : Text;
    tagline : Text;
    aboutText : Text;
    ctaButtonText : Text;
  };

  type Service = {
    id : Nat;
    title : Text;
    description : Text;
    icon : Text;
    order : Nat;
    isActive : Bool;
  };

  type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
    order : Nat;
    isActive : Bool;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    timestamp : Int;
  };

  // Compare by order, then by id
  module Service {
    public func compare(a : Service, b : Service) : Order.Order {
      switch (Nat.compare(a.order, b.order)) {
        case (#equal) {
          Nat.compare(a.id, b.id);
        };
        case (other) { other };
      };
    };
  };

  module TeamMember {
    public func compare(a : TeamMember, b : TeamMember) : Order.Order {
      switch (Nat.compare(a.order, b.order)) {
        case (#equal) {
          Nat.compare(a.id, b.id);
        };
        case (other) { other };
      };
    };
  };

  // Persistent State
  // ================

  // User profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Site content state, using seed values
  var contentState : ContentState = {
    heroHeadline = "Elevate Your Business with DataForge";
    heroSubheading = "Data-Driven Solutions for the Modern Enterprise";
    tagline = "Empowering Growth Through Data Insight and Optimization";
    aboutText = "DataForge Agency is committed to helping businesses harness the power of data. We provide comprehensive data services tailored to streamline operations, enhance decision-making, and drive sustainable growth.";
    ctaButtonText = "Get Started";
  };

  let servicesMap = Map.empty<Nat, Service>();
  var nextServiceId = 1;

  let teamMap = Map.empty<Nat, TeamMember>();
  var nextTeamMemberId = 1;

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  // Stable Initialization for Seeding
  // ================================

  func seedServices() {
    let initialServices = [
      {
        id = 0;
        title = "ESG & Sustainability Data Research";
        description = "Comprehensive analysis and reporting on environmental, social, and governance metrics.";
        icon = "leaf";
        order = 1;
        isActive = true;
      },
      {
        id = 0;
        title = "Data Mining";
        description = "Extract meaningful patterns and insights from large datasets with advanced data mining tools.";
        icon = "database";
        order = 2;
        isActive = true;
      },
      {
        id = 0;
        title = "Web Scraping";
        description = "Automated collection and structuring of data from public sources to support business intelligence.";
        icon = "browser";
        order = 3;
        isActive = true;
      },
      {
        id = 0;
        title = "Lead Generation & Email Finding";
        description = "Identify potential clients and gather verified contact information using targeted research techniques.";
        icon = "mail";
        order = 4;
        isActive = true;
      },
      {
        id = 0;
        title = "Data Entry & Processing";
        description = "Efficient handling and organization of large volumes of data for streamlined workflows.";
        icon = "edit";
        order = 5;
        isActive = true;
      },
    ];

    for (service in initialServices.values()) {
      let newService = {
        service with
        id = nextServiceId;
      };

      servicesMap.add(nextServiceId, newService);
      nextServiceId += 1;
    };
  };

  func seedTeamMembers() {
    let initialTeam = [
      {
        id = 0;
        name = "Karan Vishwakarma";
        role = "CEO & Founder";
        bio = "Experienced data strategist and business leader driving DataForge's vision.";
        order = 1;
        isActive = true;
      },
      {
        id = 0;
        name = "Neha Soni";
        role = "Co-Founder";
        bio = "Expert in data analysis and business operations, co-leading DataForge's growth.";
        order = 2;
        isActive = true;
      },
    ];

    for (member in initialTeam.values()) {
      let newMember = {
        member with
        id = nextTeamMemberId;
      };
      teamMap.add(nextTeamMemberId, newMember);
      nextTeamMemberId += 1;
    };
  };

  // User Profile Management
  // ======================

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Site Content Management
  // ======================

  public query func getContent() : async ContentState {
    contentState;
  };

  public shared ({ caller }) func updateContent(newContent : ContentState) : async () {
    assertAdmin(caller);
    contentState := newContent;
  };

  // Service Management
  // ==================

  public query func getServices() : async [Service] {
    servicesMap.values().toList<Service>().toArray().sort();
  };

  public shared ({ caller }) func createService(service : Service) : async Nat {
    assertAdmin(caller);
    let newId = nextServiceId;
    let newService = {
      service with
      id = newId;
    };
    servicesMap.add(newId, newService);
    nextServiceId += 1;
    newId;
  };

  public shared ({ caller }) func updateService(service : Service) : async () {
    assertAdmin(caller);
    if (not servicesMap.containsKey(service.id)) {
      Runtime.trap("Service not found");
    };
    servicesMap.add(service.id, service);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    assertAdmin(caller);
    servicesMap.remove(id);
  };

  // Team Management
  // ===============

  public query func getTeam() : async [TeamMember] {
    teamMap.values().toList<TeamMember>().toArray().sort();
  };

  public shared ({ caller }) func createTeamMember(member : TeamMember) : async Nat {
    assertAdmin(caller);
    let newId = nextTeamMemberId;
    let newMember = {
      member with
      id = newId;
    };
    teamMap.add(newId, newMember);
    nextTeamMemberId += 1;
    newId;
  };

  public shared ({ caller }) func updateTeamMember(member : TeamMember) : async () {
    assertAdmin(caller);
    if (not teamMap.containsKey(member.id)) {
      Runtime.trap("Team member not found");
    };
    teamMap.add(member.id, member);
  };

  public shared ({ caller }) func deleteTeamMember(id : Nat) : async () {
    assertAdmin(caller);
    teamMap.remove(id);
  };

  // Contact Form Submissions
  // =======================

  public shared ({ caller }) func submitContactForm(submission : ContactSubmission) : async Nat {
    let newId = nextContactId;
    let newSubmission = {
      submission with
      id = newId;
      timestamp = Time.now();
    };
    contactSubmissions.add(newId, newSubmission);
    nextContactId += 1;
    newId;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    assertAdmin(caller);
    contactSubmissions.values().toList<ContactSubmission>().toArray();
  };

  public shared ({ caller }) func deleteContactSubmission(id : Nat) : async () {
    assertAdmin(caller);
    contactSubmissions.remove(id);
  };
};
