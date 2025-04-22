import React from 'react';
import { useApp } from '../contexts/AppContext';
import Dashboard from './dashboard/Dashboard';
import AddLoanForm from './loans/AddLoanForm';
import LoanDetail from './loans/LoanDetail';
import Settings from './settings/Settings';
import Landing from './landing/Landing';
import AuthForm from './auth/AuthForm';

const ViewManager: React.FC = () => {
  const { view } = useApp();
  
  switch (view) {
    case 'dashboard':
      return <Dashboard />;
    case 'add-loan':
      return <AddLoanForm />;
    case 'view-loan':
      return <LoanDetail />;
    case 'settings':
      return <Settings />;
    case 'auth':
      return <AuthForm />;
    case 'landing':
    default:
      return <Landing />;
  }
};

export default ViewManager;