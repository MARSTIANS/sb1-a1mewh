export type Stage = 
  | 'Lead'
  | 'Client Engagement'
  | 'Design & Planning'
  | 'Work Preparation'
  | 'Material and Site Work'
  | 'Execution Phase'
  | 'Completion';

export type SubStage = {
  id: string;
  name: string;
  completed: boolean;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: Stage;
  subStages: SubStage[];
  budget?: number;
  approvalDate?: string;
  address?: string;
};

export type Material = {
  id: string;
  name: string;
  category: string;
  cost?: number;
  distributor?: string;
  date?: string;
};

export type Distributor = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
};

export type Labor = {
  id: string;
  name: string;
  role: 'main' | 'helper';
  charge: number;
  date: string;
};

export type Transaction = {
  id: string;
  date: string;
  type: 'material' | 'labor';
  description: string;
  amount: number;
  category?: string;
  relatedId?: string;
};