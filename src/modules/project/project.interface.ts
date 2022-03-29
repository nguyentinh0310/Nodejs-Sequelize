export interface IProject {
  id: string | number;
  name: string;
  description: string;
  startDate: string;
  customerId: string | number;
}

export interface IProjectUser {
  id: string | number;
  projectId: string | number;
  userId: string | number;
}
