import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import LoanStatusBadge from './LoanStatusBadge';
import { ArrowLeft, Users, Calendar, Clock, Coins, Send, AlertCircle, Receipt, CreditCard } from 'lucide-react';

const LoanDetail: React.FC = () => {
  const { activeLoan, addPayment, setActiveLoan, setView, currency } = useApp();
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [error, setError] = useState('');

  if (!activeLoan) {
    return (
      <div className="text-center py-10">
        <p>No loan selected</p>
        <Button variant="primary" onClick={() => setView('dashboard')} className="mt-4">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (amount > activeLoan.remainingAmount) {
      setError(`Payment cannot exceed the remaining amount (${formatCurrency(activeLoan.remainingAmount, currency)})`);
      return;
    }
    
    addPayment(activeLoan.id, {
      amount,
      date: paymentDate,
      note: paymentNote.trim() || undefined,
    });
    
    setPaymentAmount('');
    setPaymentNote('');
    setShowPaymentForm(false);
    setError('');
  };

  const progressPercentage = Math.round(((activeLoan.amount - activeLoan.remainingAmount) / activeLoan.amount) * 100);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => setActiveLoan(null)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to all loans
        </button>
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>
          <LoanStatusBadge status={activeLoan.status} />
        </div>
      </div>
      
      <div className="grid gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center text-primary-700">
                <Users className="h-5 w-5 mr-2" />
                <span>Lent to</span>
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mt-1">{activeLoan.friendName}</h3>
            </div>
            
            <div className="text-right">
              <div className="text-primary-700 mb-1">Total Amount</div>
              <div className="text-3xl font-bold text-primary-900">{formatCurrency(activeLoan.amount, currency)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center text-primary-700 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Loan Date</span>
              </div>
              <div className="text-lg font-semibold text-primary-900">{formatDate(activeLoan.date)}</div>
            </div>
            
            <div className="bg-white bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center text-primary-700 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span>Due Date</span>
              </div>
              <div className="text-lg font-semibold text-primary-900">
                {activeLoan.dueDate 
                  ? formatDate(activeLoan.dueDate)
                  : 'Not specified'
                }
              </div>
            </div>
          </div>
          
          {activeLoan.note && (
            <div className="mt-6 pt-6 border-t border-primary-200">
              <div className="text-primary-700 mb-2">Note</div>
              <p className="text-primary-900">{activeLoan.note}</p>
            </div>
          )}
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-gray-600" />
              Payment Status
            </h3>
            
            {activeLoan.remainingAmount > 0 && (
              <Button 
                variant={showPaymentForm ? 'ghost' : 'primary'} 
                size="sm"
                onClick={() => setShowPaymentForm(!showPaymentForm)}
                icon={showPaymentForm ? undefined : <CreditCard className="h-4 w-4" />}
              >
                {showPaymentForm ? 'Cancel' : 'Record Payment'}
              </Button>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-gray-600 mb-1">Remaining Balance</div>
                <div className={`text-2xl font-bold ${activeLoan.remainingAmount > 0 ? 'text-danger-600' : 'text-success-600'}`}>
                  {formatCurrency(activeLoan.remainingAmount, currency)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-gray-600 mb-1">Repaid Amount</div>
                <div className="text-2xl font-bold text-success-600">
                  {formatCurrency(activeLoan.amount - activeLoan.remainingAmount, currency)}
                </div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs font-semibold text-primary-600">
                  Progress
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-primary-600">{progressPercentage}%</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary-100">
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
          
          {showPaymentForm && (
            <div className="border-t border-gray-100 pt-4 mt-4 animate-slide-up">
              <h4 className="font-medium mb-4">Record New Payment</h4>
              
              <form onSubmit={handleAddPayment} className="space-y-4">
                <Input
                  label="Payment Amount"
                  type="number"
                  placeholder={`Max: ${formatCurrency(activeLoan.remainingAmount, currency)}`}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  max={activeLoan.remainingAmount.toString()}
                  icon={<Coins className="h-5 w-5" />}
                  error={error}
                  required
                />
                
                <Input
                  label="Payment Date"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  icon={<Calendar className="h-5 w-5" />}
                  required
                />
                
                <Input
                  label="Note (Optional)"
                  placeholder="Add a payment note..."
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                />
                
                <Button 
                  type="submit" 
                  variant="success" 
                  fullWidth
                  icon={<Send className="h-4 w-4" />}
                >
                  Record Payment
                </Button>
              </form>
            </div>
          )}
        </Card>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-gray-600" />
            Payment History
          </h3>
          
          {activeLoan.payments.length === 0 ? (
            <Card className="text-center py-8">
              <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">No payments recorded yet</p>
              <p className="text-gray-500 text-sm mt-1">Payments will appear here once recorded</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {[...activeLoan.payments].reverse().map((payment) => (
                <Card key={payment.id} className="hover:border-primary-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg text-gray-900">
                        {formatCurrency(payment.amount, currency)}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(payment.date)}
                      </div>
                    </div>
                    
                    {payment.note && (
                      <div className="text-sm text-gray-600 max-w-[50%] text-right">
                        {payment.note}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;