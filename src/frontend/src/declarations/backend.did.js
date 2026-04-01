/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const UserRole = IDL.Variant({
  'admin' : IDL.Null,
  'user' : IDL.Null,
  'guest' : IDL.Null,
});
export const Service = IDL.Record({
  'id' : IDL.Nat,
  'title' : IDL.Text,
  'order' : IDL.Nat,
  'icon' : IDL.Text,
  'description' : IDL.Text,
  'isActive' : IDL.Bool,
});
export const TeamMember = IDL.Record({
  'id' : IDL.Nat,
  'bio' : IDL.Text,
  'order' : IDL.Nat,
  'name' : IDL.Text,
  'role' : IDL.Text,
  'isActive' : IDL.Bool,
});
export const UserProfile = IDL.Record({ 'name' : IDL.Text });
export const ContactSubmission = IDL.Record({
  'id' : IDL.Nat,
  'name' : IDL.Text,
  'email' : IDL.Text,
  'company' : IDL.Text,
  'message' : IDL.Text,
  'timestamp' : IDL.Int,
});
export const ContactInfo = IDL.Record({
  'phone' : IDL.Text,
  'email' : IDL.Text,
  'enterpriseEmail' : IDL.Text,
  'linkedIn' : IDL.Text,
  'twitter' : IDL.Text,
  'instagram' : IDL.Text,
  'address' : IDL.Text,
  'city' : IDL.Text,
});
export const ContentState = IDL.Record({
  'tagline' : IDL.Text,
  'ctaButtonText' : IDL.Text,
  'aboutText' : IDL.Text,
  'heroHeadline' : IDL.Text,
  'heroSubheading' : IDL.Text,
});

const serviceDefinition = {
  '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
  'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
  'createService' : IDL.Func([Service], [IDL.Nat], []),
  'createTeamMember' : IDL.Func([TeamMember], [IDL.Nat], []),
  'deleteContactSubmission' : IDL.Func([IDL.Nat], [], []),
  'deleteService' : IDL.Func([IDL.Nat], [], []),
  'deleteTeamMember' : IDL.Func([IDL.Nat], [], []),
  'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
  'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
  'getContactSubmissions' : IDL.Func([], [IDL.Vec(ContactSubmission)], ['query']),
  'getContent' : IDL.Func([], [ContentState], ['query']),
  'getContactInfo' : IDL.Func([], [ContactInfo], ['query']),
  'getServices' : IDL.Func([], [IDL.Vec(Service)], ['query']),
  'getTeam' : IDL.Func([], [IDL.Vec(TeamMember)], ['query']),
  'getUserProfile' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
  'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
  'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
  'submitContactForm' : IDL.Func([ContactSubmission], [IDL.Nat], []),
  'updateContent' : IDL.Func([ContentState], [], []),
  'updateService' : IDL.Func([Service], [], []),
  'updateTeamMember' : IDL.Func([TeamMember], [], []),
  'adminVerifyPassword' : IDL.Func([IDL.Text], [IDL.Bool], []),
  'adminGetContactSubmissions' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(ContactSubmission))], []),
  'adminUpdateContent' : IDL.Func([IDL.Text, ContentState], [IDL.Bool], []),
  'adminUpdateContactInfo' : IDL.Func([IDL.Text, ContactInfo], [IDL.Bool], []),
  'adminCreateService' : IDL.Func([IDL.Text, Service], [IDL.Opt(IDL.Nat)], []),
  'adminUpdateService' : IDL.Func([IDL.Text, Service], [IDL.Bool], []),
  'adminDeleteService' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
  'adminCreateTeamMember' : IDL.Func([IDL.Text, TeamMember], [IDL.Opt(IDL.Nat)], []),
  'adminUpdateTeamMember' : IDL.Func([IDL.Text, TeamMember], [IDL.Bool], []),
  'adminDeleteTeamMember' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
};

export const idlService = IDL.Service(serviceDefinition);

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({ 'admin' : IDL.Null, 'user' : IDL.Null, 'guest' : IDL.Null });
  const Service = IDL.Record({ 'id' : IDL.Nat, 'title' : IDL.Text, 'order' : IDL.Nat, 'icon' : IDL.Text, 'description' : IDL.Text, 'isActive' : IDL.Bool });
  const TeamMember = IDL.Record({ 'id' : IDL.Nat, 'bio' : IDL.Text, 'order' : IDL.Nat, 'name' : IDL.Text, 'role' : IDL.Text, 'isActive' : IDL.Bool });
  const UserProfile = IDL.Record({ 'name' : IDL.Text });
  const ContactSubmission = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text, 'email' : IDL.Text, 'company' : IDL.Text, 'message' : IDL.Text, 'timestamp' : IDL.Int });
  const ContactInfo = IDL.Record({ 'phone' : IDL.Text, 'email' : IDL.Text, 'enterpriseEmail' : IDL.Text, 'linkedIn' : IDL.Text, 'twitter' : IDL.Text, 'instagram' : IDL.Text, 'address' : IDL.Text, 'city' : IDL.Text });
  const ContentState = IDL.Record({ 'tagline' : IDL.Text, 'ctaButtonText' : IDL.Text, 'aboutText' : IDL.Text, 'heroHeadline' : IDL.Text, 'heroSubheading' : IDL.Text });
  return IDL.Service({
    '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'createService' : IDL.Func([Service], [IDL.Nat], []),
    'createTeamMember' : IDL.Func([TeamMember], [IDL.Nat], []),
    'deleteContactSubmission' : IDL.Func([IDL.Nat], [], []),
    'deleteService' : IDL.Func([IDL.Nat], [], []),
    'deleteTeamMember' : IDL.Func([IDL.Nat], [], []),
    'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getContactSubmissions' : IDL.Func([], [IDL.Vec(ContactSubmission)], ['query']),
    'getContent' : IDL.Func([], [ContentState], ['query']),
    'getContactInfo' : IDL.Func([], [ContactInfo], ['query']),
    'getServices' : IDL.Func([], [IDL.Vec(Service)], ['query']),
    'getTeam' : IDL.Func([], [IDL.Vec(TeamMember)], ['query']),
    'getUserProfile' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
    'submitContactForm' : IDL.Func([ContactSubmission], [IDL.Nat], []),
    'updateContent' : IDL.Func([ContentState], [], []),
    'updateService' : IDL.Func([Service], [], []),
    'updateTeamMember' : IDL.Func([TeamMember], [], []),
    'adminVerifyPassword' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'adminGetContactSubmissions' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(ContactSubmission))], []),
    'adminUpdateContent' : IDL.Func([IDL.Text, ContentState], [IDL.Bool], []),
    'adminUpdateContactInfo' : IDL.Func([IDL.Text, ContactInfo], [IDL.Bool], []),
    'adminCreateService' : IDL.Func([IDL.Text, Service], [IDL.Opt(IDL.Nat)], []),
    'adminUpdateService' : IDL.Func([IDL.Text, Service], [IDL.Bool], []),
    'adminDeleteService' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'adminCreateTeamMember' : IDL.Func([IDL.Text, TeamMember], [IDL.Opt(IDL.Nat)], []),
    'adminUpdateTeamMember' : IDL.Func([IDL.Text, TeamMember], [IDL.Bool], []),
    'adminDeleteTeamMember' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
  });
};

export const init = ({ IDL }) => { return []; };
