import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Coins, Calendar, User, AlignLeft, XCircle } from 'lucide-react';

const AddLoanForm: React.FC = () => {
  const { addLoan, friends, addFriend, setView } = useApp();
  const [amount, setAmount] = useState('');
  const [friendId, setFriendId] = useState('');
  const [friendName, setFriendName] = useState('');
  const [isNewFriend, setIsNewFriend] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (isNewFriend) {
      if (!friendName.trim()) {
        newErrors.friendName = 'Please enter your friend\'s name';
      }
    } else {
      if (!friendId) {
        newErrors.friendId = 'Please select a friend';
      }
    }
    
    if (!date) {
      newErrors.date = 'Please select a date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    let selectedFriendId = friendId;
    let selectedFriendName = friends.find(f => f.id === friendId)?.name || '';
    
    if (isNewFriend && friendName.trim()) {
      const newFriend = addFriend(friendName.trim());
      selectedFriendId = newFriend.id;
      selectedFriendName = newFriend.name;
    }
    
    addLoan({
      friendId: selectedFriendId,
      friendName: selectedFriendName,
      amount: parseFloat(amount),
      date,
      dueDate: dueDate || undefined,
      note: note.trim() || undefined,
    });
  };

  const toggleFriendOption = () => {
    setIsNewFriend(!isNewFriend);
    setFriendId('');
    setFriendName('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Loan</h2>
        <p className="text-gray-600">Record money lent to a friend</p>
      </div>
      
      <Input
        label="Amount"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        icon={<Coins className="h-5 w-5" />}
        error={errors.amount}
        required
      />
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Friend
          </label>
          <button 
            type="button"
            className="text-sm text-primary-600 hover:text-primary-700"
            onClick={toggleFriendOption}
          >
            {isNewFriend ? 'Select existing friend' : 'Add new friend'}
          </button>
        </div>
        
        {isNewFriend ? (
          <Input
            placeholder="Enter friend's name"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            icon={<User className="h-5 w-5" />}
            error={errors.friendName}
          />
        ) : (
          <div className="relative">
            <select
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
              className={`
                w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 appearance-none
                ${errors.friendId ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : 'focus:border-primary-500 focus:ring-1 focus:ring-primary-500'}
              `}
            >
              <option value="">Select a friend</option>
              {friends.map((friend) => (
                <option key={friend.id} value={friend.id}>
                  {friend.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            {errors.friendId && (
              <p className="mt-1 text-xs text-danger-500">{errors.friendId}</p>
            )}
          </div>
        )}
      </div>
      
      <Input
        label="Loan Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        icon={<Calendar className="h-5 w-5" />}
        error={errors.date}
      />
      
      <Input
        label="Due Date (Optional)"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        icon={<Calendar className="h-5 w-5" />}
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note (Optional)
        </label>
        <div className="relative">
          <textarea
            placeholder="Add a note about this loan..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            rows={3}
          />
          <div className="absolute top-3 left-3 text-gray-500">
            <AlignLeft className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-6">
        <Button type="submit" variant="primary" fullWidth>
          Add Loan
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => setView('dashboard')}
          icon={<XCircle className="h-5 w-5" />}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddLoanForm;