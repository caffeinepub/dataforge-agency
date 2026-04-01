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
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let ADMIN_PASSWORD = "DataForge@2024";

  func isValidAdmin(password : Text) : Bool {
    password == ADMIN_PASSWORD;
  };

  func assertAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  public type UserProfile = { name : Text };

  type ContentState = {
    heroHeadline : Text;
    heroSubheading : Text;
    tagline : Text;
    aboutText : Text;
    ctaButtonText : Text;
  };

  type ContactInfo = {
    phone : Text;
    email : Text;
    enterpriseEmail : Text;
    linkedIn : Text;
    twitter : Text;
    instagram : Text;
    address : Text;
    city : Text;
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

  module Service {
    public func compare(a : Service, b : Service) : Order.Order {
      switch (Nat.compare(a.order, b.order)) {
        case (#equal) { Nat.compare(a.id, b.id) };
        case (other) { other };
      };
    };
  };

  module TeamMember {
    public func compare(a : TeamMember, b : TeamMember) : Order.Order {
      switch (Nat.compare(a.order, b.order)) {
        case (#equal) { Nat.compare(a.id, b.id) };
        case (other) { other };
      };
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  var contentState : ContentState = {
    heroHeadline = "Elevate Your Business with DataForge";
    heroSubheading = "Data-Driven Solutions for the Modern Enterprise";
    tagline = "Empowering Growth Through Data Insight and Optimization";
    aboutText = "DataForge Agency is committed to helping businesses harness the power of data. We provide comprehensive data services tailored to streamline operations, enhance decision-making, and drive sustainable growth.";
    ctaButtonText = "Get Started";
  };

  var contactInfo : ContactInfo = {
    phone = "+91 7987254547";
    email = "hello@dataforge.ai";
    enterpriseEmail = "enterprise@dataforge.ai";
    linkedIn = "";
    twitter = "";
    instagram = "";
    address = "Sagar, Madhya Pradesh";
    city = "India 470002";
  };

  let servicesMap = Map.empty<Nat, Service>();
  var nextServiceId = 1;

  let teamMap = Map.empty<Nat, TeamMember>();
  var nextTeamMemberId = 1;

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  func seedServices() {
    let initialServices = [
      { id = 0; title = "ESG & Sustainability Data Research"; description = "Comprehensive analysis and reporting on environmental, social, and governance metrics."; icon = "leaf"; order = 1; isActive = true },
      { id = 0; title = "Data Mining"; description = "Extract meaningful patterns and insights from large datasets with advanced data mining tools."; icon = "database"; order = 2; isActive = true },
      { id = 0; title = "Web Scraping"; description = "Automated collection and structuring of data from public sources to support business intelligence."; icon = "globe"; order = 3; isActive = true },
      { id = 0; title = "Lead Generation & Email Finding"; description = "Identify potential clients and gather verified contact information using targeted research techniques."; icon = "mail"; order = 4; isActive = true },
      { id = 0; title = "Data Entry & Processing"; description = "Efficient handling and organization of large volumes of data for streamlined workflows."; icon = "clipboard"; order = 5; isActive = true },
    ];
    for (service in initialServices.values()) {
      servicesMap.add(nextServiceId, { service with id = nextServiceId });
      nextServiceId += 1;
    };
  };

  func seedTeamMembers() {
    let initialTeam = [
      { id = 0; name = "Karan Vishwakarma"; role = "CEO & Founder"; bio = "Experienced data strategist and business leader driving DataForge's vision."; order = 1; isActive = true },
      { id = 0; name = "Neha Soni"; role = "Co-Founder"; bio = "Expert in data analysis and business operations, co-leading DataForge's growth."; order = 2; isActive = true },
    ];
    for (member in initialTeam.values()) {
      teamMap.add(nextTeamMemberId, { member with id = nextTeamMemberId });
      nextTeamMemberId += 1;
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  public shared func adminVerifyPassword(password : Text) : async Bool {
    isValidAdmin(password);
  };

  public shared func adminGetContactSubmissions(password : Text) : async ?[ContactSubmission] {
    if (not isValidAdmin(password)) return null;
    ?contactSubmissions.values().toList<ContactSubmission>().toArray();
  };

  public shared func adminUpdateContent(password : Text, newContent : ContentState) : async Bool {
    if (not isValidAdmin(password)) return false;
    contentState := newContent;
    true;
  };

  public shared func adminUpdateContactInfo(password : Text, info : ContactInfo) : async Bool {
    if (not isValidAdmin(password)) return false;
    contactInfo := info;
    true;
  };

  public shared func adminCreateService(password : Text, service : Service) : async ?Nat {
    if (not isValidAdmin(password)) return null;
    let newId = nextServiceId;
    servicesMap.add(newId, { service with id = newId });
    nextServiceId += 1;
    ?newId;
  };

  public shared func adminUpdateService(password : Text, service : Service) : async Bool {
    if (not isValidAdmin(password)) return false;
    if (not servicesMap.containsKey(service.id)) return false;
    servicesMap.add(service.id, service);
    true;
  };

  public shared func adminDeleteService(password : Text, id : Nat) : async Bool {
    if (not isValidAdmin(password)) return false;
    servicesMap.remove(id);
    true;
  };

  public shared func adminCreateTeamMember(password : Text, member : TeamMember) : async ?Nat {
    if (not isValidAdmin(password)) return null;
    let newId = nextTeamMemberId;
    teamMap.add(newId, { member with id = newId });
    nextTeamMemberId += 1;
    ?newId;
  };

  public shared func adminUpdateTeamMember(password : Text, member : TeamMember) : async Bool {
    if (not isValidAdmin(password)) return false;
    if (not teamMap.containsKey(member.id)) return false;
    teamMap.add(member.id, member);
    true;
  };

  public shared func adminDeleteTeamMember(password : Text, id : Nat) : async Bool {
    if (not isValidAdmin(password)) return false;
    teamMap.remove(id);
    true;
  };

  public query func getContent() : async ContentState {
    contentState;
  };

  public query func getContactInfo() : async ContactInfo {
    contactInfo;
  };

  public query func getServices() : async [Service] {
    servicesMap.values().toList<Service>().toArray().sort();
  };

  public query func getTeam() : async [TeamMember] {
    teamMap.values().toList<TeamMember>().toArray().sort();
  };

  public shared func submitContactForm(submission : ContactSubmission) : async Nat {
    let newId = nextContactId;
    contactSubmissions.add(newId, { submission with id = newId; timestamp = Time.now() });
    nextContactId += 1;
    newId;
  };

  public shared ({ caller }) func claimAdminWithPassword(password : Text) : async Bool {
    if (isValidAdmin(password)) {
      accessControlState.userRoles.remove(caller);
      accessControlState.userRoles.add(caller, #admin);
      accessControlState.adminAssigned := true;
      true;
    } else {
      false;
    };
  };

  public shared ({ caller }) func updateContent(newContent : ContentState) : async () {
    assertAdmin(caller);
    contentState := newContent;
  };

  public shared ({ caller }) func createService(service : Service) : async Nat {
    assertAdmin(caller);
    let newId = nextServiceId;
    servicesMap.add(newId, { service with id = newId });
    nextServiceId += 1;
    newId;
  };

  public shared ({ caller }) func updateService(service : Service) : async () {
    assertAdmin(caller);
    servicesMap.add(service.id, service);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    assertAdmin(caller);
    servicesMap.remove(id);
  };

  public shared ({ caller }) func createTeamMember(member : TeamMember) : async Nat {
    assertAdmin(caller);
    let newId = nextTeamMemberId;
    teamMap.add(newId, { member with id = newId });
    nextTeamMemberId += 1;
    newId;
  };

  public shared ({ caller }) func updateTeamMember(member : TeamMember) : async () {
    assertAdmin(caller);
    teamMap.add(member.id, member);
  };

  public shared ({ caller }) func deleteTeamMember(id : Nat) : async () {
    assertAdmin(caller);
    teamMap.remove(id);
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
