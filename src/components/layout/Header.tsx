import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Coins, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { setView, currency } = useApp();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setView('dashboard')}
          >
            <div className="bg-primary-500 text-white p-2 rounded-lg mr-3">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">LendTracker</h1>
              <p className="text-sm text-gray-500">Track money lent to friends ({currency.code})</p>
            </div>
          </div>
          
          <button
            onClick={() => setView('settings')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;