import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import LoanCard from '../loans/LoanCard';
import SummaryCards from './SummaryCards';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { setView, filterLoans } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLoans = filterLoans(filter === 'all' ? undefined : filter, searchTerm);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Loans</h1>
          <p className="text-gray-600">Track money you've lent to friends</p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => setView('add-loan')}
          icon={<Plus className="h-5 w-5" />}
        >
          Add Loan
        </Button>
      </div>
      
      <SummaryCards />
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5" />}
            />
          </div>
          
          <div className="w-full sm:w-40">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 appearance-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Loans</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="fully-paid">Paid</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredLoans.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">No loans found</p>
            {filter !== 'all' || searchTerm ? (
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
            ) : (
              <Button 
                variant="primary"
                size="sm"
                onClick={() => setView('add-loan')}
                className="mt-2"
              >
                Add your first loan
              </Button>
            )}
          </div>
        ) : (
          filteredLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;