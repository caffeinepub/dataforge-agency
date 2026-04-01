/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface ContactSubmission {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'company' : string,
  'message' : string,
  'timestamp' : bigint,
}
export interface ContactInfo {
  'phone' : string,
  'email' : string,
  'enterpriseEmail' : string,
  'linkedIn' : string,
  'twitter' : string,
  'instagram' : string,
  'address' : string,
  'city' : string,
}
export interface ContentState {
  'tagline' : string,
  'ctaButtonText' : string,
  'aboutText' : string,
  'heroHeadline' : string,
  'heroSubheading' : string,
}
export interface Service {
  'id' : bigint,
  'title' : string,
  'order' : bigint,
  'icon' : string,
  'description' : string,
  'isActive' : boolean,
}
export interface TeamMember {
  'id' : bigint,
  'bio' : string,
  'order' : bigint,
  'name' : string,
  'role' : string,
  'isActive' : boolean,
}
export interface UserProfile { 'name' : string }
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  '_initializeAccessControlWithSecret' : ActorMethod<[string], undefined>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'createService' : ActorMethod<[Service], bigint>,
  'createTeamMember' : ActorMethod<[TeamMember], bigint>,
  'deleteContactSubmission' : ActorMethod<[bigint], undefined>,
  'deleteService' : ActorMethod<[bigint], undefined>,
  'deleteTeamMember' : ActorMethod<[bigint], undefined>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getContactSubmissions' : ActorMethod<[], Array<ContactSubmission>>,
  'getContent' : ActorMethod<[], ContentState>,
  'getContactInfo' : ActorMethod<[], ContactInfo>,
  'getServices' : ActorMethod<[], Array<Service>>,
  'getTeam' : ActorMethod<[], Array<TeamMember>>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'submitContactForm' : ActorMethod<[ContactSubmission], bigint>,
  'updateContent' : ActorMethod<[ContentState], undefined>,
  'updateService' : ActorMethod<[Service], undefined>,
  'updateTeamMember' : ActorMethod<[TeamMember], undefined>,
  'adminVerifyPassword' : ActorMethod<[string], boolean>,
  'adminGetContactSubmissions' : ActorMethod<[string], [] | [Array<ContactSubmission>]>,
  'adminUpdateContent' : ActorMethod<[string, ContentState], boolean>,
  'adminUpdateContactInfo' : ActorMethod<[string, ContactInfo], boolean>,
  'adminCreateService' : ActorMethod<[string, Service], [] | [bigint]>,
  'adminUpdateService' : ActorMethod<[string, Service], boolean>,
  'adminDeleteService' : ActorMethod<[string, bigint], boolean>,
  'adminCreateTeamMember' : ActorMethod<[string, TeamMember], [] | [bigint]>,
  'adminUpdateTeamMember' : ActorMethod<[string, TeamMember], boolean>,
  'adminDeleteTeamMember' : ActorMethod<[string, bigint], boolean>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
