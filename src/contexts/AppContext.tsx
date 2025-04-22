import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Loan, Friend, Payment, AppView, LoanSummary, Currency } from '../types';
import { calculateSummary, updateLoanStatus, currencies } from '../utils/helpers';
import { supabase } from '../lib/supabase';

interface AppContextType {
  view: AppView;
  setView: (view: AppView) => void;
  loans: Loan[];
  friends: Friend[];
  activeLoan: Loan | null;
  summary: LoanSummary;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  addLoan: (loan: Omit<Loan, 'id' | 'payments' | 'status' | 'remainingAmount'>) => void;
  addFriend: (name: string) => Friend;
  addPayment: (loanId: string, payment: Omit<Payment, 'id'>) => void;
  setActiveLoan: (loanId: string | null) => void;
  filterLoans: (status?: string, searchTerm?: string) => Loan[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<AppView>('landing');
  const [loans, setLoans] = useState<Loan[]>(() => {
    const savedLoans = localStorage.getItem('loans');
    return savedLoans ? JSON.parse(savedLoans) : [];
  });
  const [friends, setFriends] = useState<Friend[]>(() => {
    const savedFriends = localStorage.getItem('friends');
    return savedFriends ? JSON.parse(savedFriends) : [];
  });
  const [currency, setCurrency] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem('currency');
    return savedCurrency ? JSON.parse(savedCurrency) : currencies[0];
  });
  const [activeLoan, setActiveLoanState] = useState<Loan | null>(null);
  const [summary, setSummary] = useState<LoanSummary>(() => calculateSummary(loans));

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const hasLoans = loans.length > 0;
        setView(hasLoans ? 'dashboard' : 'add-loan');
      } else if (event === 'SIGNED_OUT') {
        setView('landing');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loans]);

  useEffect(() => {
    localStorage.setItem('loans', JSON.stringify(loans));
    setSummary(calculateSummary(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    const checkOverdueLoans = () => {
      const updatedLoans = loans.map(updateLoanStatus);
      if (JSON.stringify(updatedLoans) !== JSON.stringify(loans)) {
        setLoans(updatedLoans);
      }
    };

    checkOverdueLoans();
    const interval = setInterval(checkOverdueLoans, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loans]);

  const addLoan = (loanData: Omit<Loan, 'id' | 'payments' | 'status' | 'remainingAmount'>) => {
    const newLoan: Loan = {
      ...loanData,
      id: uuidv4(),
      remainingAmount: loanData.amount,
      status: 'active',
      payments: [],
    };
    
    setLoans(prevLoans => [...prevLoans, newLoan]);
    setView('dashboard');
  };

  const addFriend = (name: string): Friend => {
    const newFriend: Friend = { id: uuidv4(), name };
    setFriends(prevFriends => [...prevFriends, newFriend]);
    return newFriend;
  };

  const addPayment = (loanId: string, paymentData: Omit<Payment, 'id'>) => {
    const payment: Payment = { ...paymentData, id: uuidv4() };
    
    setLoans(prevLoans => {
      return prevLoans.map(loan => {
        if (loan.id !== loanId) return loan;
        
        const newRemainingAmount = Math.max(0, loan.remainingAmount - payment.amount);
        
        const updatedLoan: Loan = {
          ...loan,
          payments: [...loan.payments, payment],
          remainingAmount: newRemainingAmount,
        };
        
        return updateLoanStatus(updatedLoan);
      });
    });
  };

  const setActiveLoan = (loanId: string | null) => {
    if (loanId === null) {
      setActiveLoanState(null);
      return;
    }
    
    const loan = loans.find(l => l.id === loanId) || null;
    setActiveLoanState(loan);
    if (loan) setView('view-loan');
  };

  const filterLoans = (status?: string, searchTerm?: string): Loan[] => {
    return loans.filter(loan => {
      if (status && status !== 'all' && loan.status !== status) {
        return false;
      }
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          loan.friendName.toLowerCase().includes(searchLower) ||
          loan.note?.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  return (
    <AppContext.Provider 
      value={{ 
        view,
        setView,
        loans,
        friends,
        activeLoan,
        summary,
        currency,
        setCurrency,
        addLoan,
        addFriend,
        addPayment,
        setActiveLoan,
        filterLoans,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};