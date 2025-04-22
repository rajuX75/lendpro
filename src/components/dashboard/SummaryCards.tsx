import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../utils/helpers';
import Card from '../ui/Card';
import { DollarSign, PiggyBank, AlertTriangle, CheckCircle2 } from 'lucide-react';

const SummaryCards: React.FC = () => {
  const { summary, currency } = useApp();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
        <div className="flex items-start">
          <div className="p-2 bg-primary-500 text-white rounded-lg mr-3">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-primary-900 text-sm font-medium">Total Lent</h3>
            <p className="text-primary-950 text-xl font-bold">{formatCurrency(summary.totalLoaned, currency)}</p>
            <p className="text-primary-700 text-xs mt-1">
              {summary.count.total} {summary.count.total === 1 ? 'loan' : 'loans'} total
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
        <div className="flex items-start">
          <div className="p-2 bg-primary-500 text-white rounded-lg mr-3">
            <PiggyBank className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-primary-900 text-sm font-medium">Active Loans</h3>
            <p className="text-primary-950 text-xl font-bold">{formatCurrency(summary.totalActive, currency)}</p>
            <p className="text-primary-700 text-xs mt-1">
              {summary.count.active} active {summary.count.active === 1 ? 'loan' : 'loans'}
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-danger-50 to-danger-100 border border-danger-200">
        <div className="flex items-start">
          <div className="p-2 bg-danger-500 text-white rounded-lg mr-3">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-danger-900 text-sm font-medium">Overdue</h3>
            <p className="text-danger-950 text-xl font-bold">{formatCurrency(summary.totalOverdue, currency)}</p>
            <p className="text-danger-700 text-xs mt-1">
              {summary.count.overdue} overdue {summary.count.overdue === 1 ? 'loan' : 'loans'}
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-success-50 to-success-100 border border-success-200">
        <div className="flex items-start">
          <div className="p-2 bg-success-500 text-white rounded-lg mr-3">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-success-900 text-sm font-medium">Total Repaid</h3>
            <p className="text-success-950 text-xl font-bold">{formatCurrency(summary.totalPaid, currency)}</p>
            <p className="text-success-700 text-xs mt-1">
              {summary.count.paid} {summary.count.paid === 1 ? 'loan' : 'loans'} fully repaid
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;