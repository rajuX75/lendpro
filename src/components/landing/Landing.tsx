import React from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import { ArrowRight, Shield, Clock, Users, Coins, BarChart as ChartBar, Bell, CreditCard, Smartphone, CheckCircle, Wallet, PiggyBank } from 'lucide-react';

const Landing: React.FC = () => {
  const { setView } = useApp();

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-10 bg-cover bg-center"></div>
          <div className="max-w-6xl mx-auto px-4 py-20 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                Track Your Personal Loans with Confidence
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl">
                Never forget who owes what. LendTracker helps you manage personal loans to friends and family with ease, clarity, and professionalism.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => setView('auth')}
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  Get Started - It's Free
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">$2M+</div>
                <div className="text-gray-600">Loans Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">98%</div>
                <div className="text-gray-600">Repayment Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">4.9/5</div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Manage Personal Loans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make tracking personal loans simple, organized, and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Bank-grade security ensures your financial data stays private. We never share your information with third parties.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">
                Never miss a payment with automated reminders. Stay on top of due dates effortlessly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ChartBar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
              <p className="text-gray-600">
                Track repayment progress and analyze lending patterns with beautiful visual reports.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Friend Management</h3>
              <p className="text-gray-600">
                Organize loans by friend and maintain clear records of all transactions and communications.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Access your loan information anywhere, anytime. Our responsive design works on all devices.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
              <p className="text-gray-600">
                Record and track partial payments with ease. Keep a detailed history of all transactions.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started in minutes with our simple three-step process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Create a Loan</h3>
                <p className="text-gray-600">
                  Enter the loan amount, friend's name, and optional details like due date and notes.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Track Payments</h3>
                <p className="text-gray-600">
                  Record payments as they come in and keep track of the remaining balance.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Stay Organized</h3>
                <p className="text-gray-600">
                  Get notifications for due dates and view detailed reports of your lending activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Tracking?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of users who trust LendTracker for managing their personal loans.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => setView('auth')}
            icon={<Coins className="h-5 w-5" />}
          >
            Start Managing Loans - Free Forever
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;