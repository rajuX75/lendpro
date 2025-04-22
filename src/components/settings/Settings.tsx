import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { currencies } from '../../utils/helpers';
import Card from '../ui/Card';
import { ArrowLeft, Coins } from 'lucide-react';

const Settings: React.FC = () => {
  const { currency, setCurrency, setView } = useApp();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <button 
          onClick={() => setView('dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to dashboard
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Customize your LendTracker experience</p>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
            <Coins className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Currency Settings</h3>
            <p className="text-sm text-gray-500">Choose your preferred currency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr)}
              className={`p-3 rounded-lg border transition-all ${
                currency.code === curr.code
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{curr.name}</div>
              <div className="text-sm text-gray-500">
                {curr.symbol} ({curr.code})
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Settings;