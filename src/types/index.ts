export interface Friend {
  id: string;
  name: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  note?: string;
}

export interface Loan {
  id: string;
  friendId: string;
  friendName: string;
  amount: number;
  remainingAmount: number;
  date: string;
  dueDate?: string;
  note?: string;
  status: 'active' | 'overdue' | 'fully-paid';
  payments: Payment[];
}

export interface LoanSummary {
  totalLoaned: number;
  totalActive: number;
  totalOverdue: number;
  totalPaid: number;
  count: {
    active: number;
    overdue: number;
    paid: number;
    total: number;
  };
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export type AppView = 'landing' | 'dashboard' | 'add-loan' | 'view-loan' | 'settings' | 'auth';