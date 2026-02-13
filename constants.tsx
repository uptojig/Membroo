
import React from 'react';
import { 
  Home, 
  Gift, 
  History, 
  Camera, 
  User, 
  QrCode, 
  CheckCircle, 
  Clock 
} from 'lucide-react';
import { Page, Reward, Transaction, Branch } from './types';

export const BRAND_COLOR = '#0ea5e9'; // Sky-500

export const MOCK_MEMBER = {
  id: '1',
  name: 'Thanaphat Sirisapkakin',
  phone: '082-789-4289',
  points: 3590,
  tier: 'MANAGER',
  memberId: '7317210',
  avatarUrl: 'https://picsum.photos/seed/membroo/200/200',
  spendingAmount: 3590,
  spendingGoal: 49999,
  nextTier: 'DIRECTOR',
  joinDate: '25/02/2025'
};

export const MOCK_REWARDS: Reward[] = [
  {
    id: 'r1',
    name: 'Free Espresso',
    description: 'Get one hot or iced espresso for free.',
    pointsRequired: 100,
    imageUrl: 'https://picsum.photos/seed/coffee/400/300',
    category: 'Beverage'
  },
  {
    id: 'r2',
    name: '20% Discount Coupon',
    description: 'Apply 20% discount on your next visit.',
    pointsRequired: 500,
    imageUrl: 'https://picsum.photos/seed/discount/400/300',
    category: 'Voucher'
  },
  {
    id: 'r3',
    name: 'Signature Steak',
    description: 'Redeem for our premium signature ribeye.',
    pointsRequired: 2500,
    imageUrl: 'https://picsum.photos/seed/steak/400/300',
    category: 'Food'
  }
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'Central World',
    address: '4, 4/1-4/2 Rama I Rd, Pathum Wan, Bangkok',
    phone: '02-123-4567',
    distance: '1.2 km'
  },
  {
    id: 'b2',
    name: 'Siam Paragon',
    address: '991 Rama I Rd, Pathum Wan, Bangkok',
    phone: '02-987-6543',
    distance: '1.8 km'
  },
  {
    id: 'b3',
    name: 'EmQuartier',
    address: '693 Sukhumvit Rd, Khlong Tan Nuea, Bangkok',
    phone: '02-555-4444',
    distance: '4.5 km'
  }
];

export const MOCK_HISTORY: Transaction[] = [
  {
    id: 't1',
    type: 'EARN',
    amount: 50,
    description: 'Purchase at Main Branch',
    date: '2023-11-20 14:30',
    status: 'COMPLETED'
  },
  {
    id: 't2',
    type: 'BURN',
    amount: -100,
    description: 'Redeemed Espresso',
    date: '2023-11-18 10:15',
    status: 'COMPLETED'
  },
  {
    id: 't3',
    type: 'EARN',
    amount: 500,
    description: 'Receipt Upload #551',
    date: '2023-11-15 09:00',
    status: 'PENDING'
  }
];

export const NAV_ITEMS = [
  { id: Page.HOME, label: 'Home', icon: Home },
  { id: Page.REWARDS, label: 'Rewards', icon: Gift },
  { id: Page.RECEIPT, label: 'Upload', icon: Camera },
  { id: Page.PROFILE, label: 'Profile', icon: User }
];
