import { Loan, LoanSummary, Currency } from '../types';
import { format, differenceInDays, parseISO } from 'date-fns';

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
];

export const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM d, yyyy');
};

export const isLoanOverdue = (loan: Loan): boolean => {
  if (!loan.dueDate) return false;
  
  const today = new Date();
  const dueDate = parseISO(loan.dueDate);
  
  return differenceInDays(today, dueDate) > 0 && loan.remainingAmount > 0;
};

export const updateLoanStatus = (loan: Loan): Loan => {
  if (loan.remainingAmount <= 0) {
    return { ...loan, status: 'fully-paid' };
  }
  
  if (isLoanOverdue(loan)) {
    return { ...loan, status: 'overdue' };
  }
  
  return { ...loan, status: 'active' };
};

export const calculateSummary = (loans: Loan[]): LoanSummary => {
  const initialSummary: LoanSummary = {
    totalLoaned: 0,
    totalActive: 0,
    totalOverdue: 0,
    totalPaid: 0,
    count: {
      active: 0,
      overdue: 0,
      paid: 0,
      total: loans.length,
    },
  };
  
  return loans.reduce((summary, loan) => {
    summary.totalLoaned += loan.amount;
    
    if (loan.status === 'active') {
      summary.totalActive += loan.remainingAmount;
      summary.count.active += 1;
    } else if (loan.status === 'overdue') {
      summary.totalOverdue += loan.remainingAmount;
      summary.count.overdue += 1;
    } else if (loan.status === 'fully-paid') {
      summary.count.paid += 1;
    }
    
    summary.totalPaid += (loan.amount - loan.remainingAmount);
    
    return summary;
  }, initialSummary);
};