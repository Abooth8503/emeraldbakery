export interface FliplDashboard {
  Cost: number;
  DateSubmitted: string;
  DocumentName: string;
  DocumentID: string;
  FLIPLID: number;
  Unit: string;
}

export type FliplDashboardItems = Array<FliplDashboard>;

export interface FliplRole {
  Edipi: string;
  Email: string;
  FLIPLStatus: string;
  First_Name: string;
  Last_Name: string;
  MEDCOEStatus: string;
  OrgNameParent: string;
  OrgNameUserLevel: string;
  RankFullName: string;
  RoleName: string;
}

export type FliplRoles = Array<FliplRole>;

export interface FliplApproval {
  CommentDate: string;
  FLIPLID: number;
  ID: number;
  Queue: string;
  QueueComments: string;
  QueueDateCompleted: string;
  QueueDateReceived: string;
  QueueStatus: string;
  UserName: string;
  UserRole: string;
}

export type FliplApprovals = Array<FliplApproval>;

export interface FliplSubmission {
  Adjudication: string;
  CoS: boolean;
  Complete: boolean;
  Cost: number;
  CurrentQueue: string;
  CurrentQueueStatus: string;
  DateSubmitted: string;
  DaysInCurrentQueue: string;
  DocumentName: string;
  DocumentID: string;
  FLIPLID: number;
  G4: boolean;
  Investigation: boolean;
  InvestigationID: string;
  PBO: boolean;
  SGS: boolean;
  Submitted: boolean;
  TotalFLIPLDays: string;
  Unit: string;
}

export type FliplSubmissions = Array<FliplSubmission>;

export interface FliplUser {
  Edipi: string;
  Email: string;
  FLIPLStatus: string;
  First_Name: string;
  Last_Name: string;
  MEDCOEStatus: string;
  OrgNameParent: string;
  OrgNameUserLevel: string;
  RankFullName: string;
  RoleName: string;
}

export type FliplUsers = Array<FliplUser>;

// Audits
export interface FliplAudit {
  AuditAction: string;
  Comments: string;
  CreateDate: string;
  ID: number;
  RankFullName: string;
  RecID: number;
  RoleName: string;
  TableName: string;
  UserEdipi: string;
}

export type FliplAudits = Array<FliplAudit>;

// dashboard stats
export interface FliplStat {
  TotalAmount: string;
  NewFLIPLs: string;
  CompletedFLIPLS: string;
  InProcessFLIPLs: string;
}

export type FliplStats = Array<FliplStat>;

// User Unit
export interface FliplUserUnit {
  Unit: string;
}

export type UserUnit = Array<FliplUserUnit>;

// APOMT Hierarchy
export interface FliplApomtHierarchy {
  OrgID: number;
  OrgName: string;
  level: number;
  OrgStrucID: number;
  Sq: number;
  SortOrder: number;
}

export type FliplApomtHierarchies = Array<FliplApomtHierarchy>;

export async function fliplGet<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export type ApomtUser = {
  label: string;
  rank: string;
  value: string;
};

export const enum FliplRoleName {
  Admin = 'Admin',
  SGS = 'SGS',
  CoS = 'CoS',
  G4 = 'G4',
  Investigator = 'Investigator'
}
