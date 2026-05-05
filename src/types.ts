export interface Member {
  id: string;
  name: string;
  phone: string;
  address: string;
  reference1: string;
  reference2: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: 'Blood Donation' | 'Medical Camp' | 'Relief' | 'Other';
}

export interface Donation {
  id: string;
  amount?: string;
  transactionId?: string;
  screenshotUrl?: string;
  phone: string;
  donorName: string;
  date: number;
  method: 'bKash' | 'Nagad';
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  phone: string;
  imageUrl: string;
  type: 'Advisory' | 'Executive' | 'General';
}
