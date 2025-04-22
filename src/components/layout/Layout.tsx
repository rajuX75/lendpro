import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="container mx-auto px-4 py-4 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} LendTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;