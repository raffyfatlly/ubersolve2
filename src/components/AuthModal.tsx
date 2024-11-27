import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, Mail, Bot } from 'lucide-react';
import { signInWithEmail, signUpWithEmail } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      if (mode === 'signin') {
        const { data, error } = await signInWithEmail(email, password);
        if (error) throw error;
        if (data.user) {
          onClose();
          navigate('/studio');
          toast.success('Successfully signed in!');
        }
      } else {
        const { data, error } = await signUpWithEmail(email, password);
        if (error) throw error;
        
        // If signup is successful and we have a user
        if (data.user) {
          onClose();
          navigate('/studio');
          toast.success('Account created successfully! Welcome to AI Studio.');
        } else {
          toast.success('Please check your email to confirm your account');
          onClose();
        }
      }
    } catch (err: any) {
      console.error('Email auth error:', err);
      toast.error(err.message || `Failed to ${mode === 'signin' ? 'sign in' : 'sign up'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Premium Glow Effect */}
        <div className="absolute -inset-1">
          <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter">
            <div className="aspect-square h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
          </div>
        </div>
        
        <div className="relative bg-[#0F1117] rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative Header */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-gray-800/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* Logo & Title Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-4">
                <Bot className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to AI Studio</h2>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                {mode === 'signin' 
                  ? 'Sign in to preview our upcoming AI Studio platform and join our early access list.'
                  : 'Create an account to preview our upcoming AI Studio platform and be among the first to experience it.'}
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden mt-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Mail size={20} />
                    {mode === 'signin' ? 'Sign In with Email' : 'Sign Up with Email'}
                  </>
                )}
              </button>
            </form>

            {/* Mode Toggle */}
            <p className="text-center text-gray-400 text-sm mt-6">
              {mode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-green-500 hover:text-green-400 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="text-green-500 hover:text-green-400 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}