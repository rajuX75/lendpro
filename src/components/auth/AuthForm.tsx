import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Loader } from 'lucide-react';

const AuthForm: React.FC = () => {
  const { setView } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: import.meta.env.VITE_APP_URL,
          data: {
            name: email.split('@')[0],
          },
        },
      });

      if (error) {
        throw error;
      }

      setMessage({
        type: 'success',
        text: 'Check your email for the login link!',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to send login link. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to LendTracker</h2>
            <p className="text-gray-600 mt-2">Enter your email to sign in or create an account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5" />}
              required
              disabled={loading}
            />

            {message && (
              <div className={`p-3 rounded-lg mb-4 ${
                message.type === 'success' 
                  ? 'bg-success-50 text-success-700 border border-success-200'
                  : 'bg-danger-50 text-danger-700 border border-danger-200'
              }`}>
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Sending Link...
                </>
              ) : (
                'Send Magic Link'
              )}
            </Button>

            <button
              type="button"
              onClick={() => setView('landing')}
              className="mt-4 text-sm text-gray-600 hover:text-gray-800 text-center w-full"
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;