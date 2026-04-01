import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TeamMember {
    id: bigint;
    bio: string;
    order: bigint;
    name: string;
    role: string;
    isActive: boolean;
}
export interface Service {
    id: bigint;
    title: string;
    order: bigint;
    icon: string;
    description: string;
    isActive: boolean;
}
export interface ContentState {
    tagline: string;
    ctaButtonText: string;
    aboutText: string;
    heroHeadline: string;
    heroSubheading: string;
}
export interface ContactInfo {
    phone: string;
    email: string;
    enterpriseEmail: string;
    linkedIn: string;
    twitter: string;
    instagram: string;
    address: string;
    city: string;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createService(service: Service): Promise<bigint>;
    createTeamMember(member: TeamMember): Promise<bigint>;
    deleteContactSubmission(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteTeamMember(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getContent(): Promise<ContentState>;
    getContactInfo(): Promise<ContactInfo>;
    getServices(): Promise<Array<Service>>;
    getTeam(): Promise<Array<TeamMember>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(submission: ContactSubmission): Promise<bigint>;
    updateContent(newContent: ContentState): Promise<void>;
    updateService(service: Service): Promise<void>;
    updateTeamMember(member: TeamMember): Promise<void>;
    adminUpdateContactInfo(password: string, info: ContactInfo): Promise<boolean>;
}
