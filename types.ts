
export enum ViewMode {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF'
}

export enum Page {
  HOME = 'home',
  REWARDS = 'rewards',
  HISTORY = 'history',
  RECEIPT = 'receipt',
  SCAN = 'scan',
  PROFILE = 'profile',
  INVITE = 'invite'
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  points: number;
  tier: string;
  memberId: string;
  avatarUrl?: string;
  spendingAmount?: number;
  spendingGoal?: number;
  nextTier?: string;
  joinDate?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
  category: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance?: string;
}

export interface Transaction {
  id: string;
  type: 'EARN' | 'BURN';
  amount: number;
  description: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
}
