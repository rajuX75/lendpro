import React from 'react';
import { Loan } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Card from '../ui/Card';
import LoanStatusBadge from './LoanStatusBadge';
import { useApp } from '../../contexts/AppContext';
import { Users, Calendar, ArrowRight } from 'lucide-react';

interface LoanCardProps {
  loan: Loan;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  const { setActiveLoan, currency } = useApp();

  const defaultCurrency = {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  };

  const handleClick = () => {
    setActiveLoan(loan.id);
  };

  return (
    <Card hover onClick={handleClick} className="group animate-slide-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{loan.friendName}</h3>
            <LoanStatusBadge status={loan.status} />
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span className="mr-3">Friend</span>
            
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(loan.date)}</span>
          </div>
          
          {loan.note && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {loan.note}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          <div className="font-bold text-xl">
            {formatCurrency(loan.amount, currency || defaultCurrency)}
          </div>
          
          {loan.remainingAmount < loan.amount && (
            <div className="text-sm text-gray-600">
              {loan.remainingAmount > 0 
                ? `${formatCurrency(loan.remainingAmount, currency || defaultCurrency)} remaining` 
                : 'Fully repaid'}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        {loan.dueDate ? (
          <div className="text-sm">
            <span className="text-gray-500">Due: </span>
            <span className={loan.status === 'overdue' ? 'text-danger-600 font-medium' : ''}>
              {formatDate(loan.dueDate)}
            </span>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No due date</div>
        )}
        
        <div className="text-primary-500 text-sm font-medium flex items-center transition-transform group-hover:translate-x-0.5">
          View Details
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </div>
      </div>
    </Card>
  );
};

export default LoanCard;