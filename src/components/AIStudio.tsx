import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Settings, Share2, Rocket, Send, LogOut, Menu, X } from 'lucide-react';
import BotSettings from './studio/BotSettings';
import ComingSoonModal from './studio/ComingSoonModal';
import { signOut } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AIStudio() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonTrigger, setComingSoonTrigger] = useState<'deploy' | 'chat'>('deploy');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleComingSoonOpen = (trigger: 'deploy' | 'chat') => {
    setComingSoonTrigger(trigger);
    setIsComingSoonOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const { error } = await signOut();
      if (error) throw error;
      
      toast.success('Successfully signed out');
      navigate('/');
    } catch (err: any) {
      console.error('Sign out error:', err);
      toast.error(err.message || 'Failed to sign out');
    } finally {
      setIsSigningOut(false);
    }
  };

  const HeaderActions = ({ isMobile = false }) => (
    <>
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className={`${isMobile ? 'w-full' : 'p-2'} text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3`}
      >
        <Settings size={20} />
        {isMobile && <span>Settings</span>}
      </button>
      <button 
        className={`${isMobile ? 'w-full' : 'p-2'} text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3`}
      >
        <Share2 size={20} />
        {isMobile && <span>Share</span>}
      </button>
      <button 
        onClick={() => handleComingSoonOpen('deploy')}
        className={`${
          isMobile 
            ? 'w-full bg-green-500/10 hover:bg-green-500/20' 
            : 'bg-green-500 hover:bg-green-600'
        } text-${isMobile ? 'green-500' : 'white'} px-4 py-2 rounded-lg transition-colors flex items-center gap-3`}
      >
        <Rocket size={20} />
        <span>Deploy</span>
      </button>
      {!isMobile && <div className="w-px h-6 bg-gray-800"></div>}
      <button
        onClick={handleSignOut}
        disabled={isSigningOut}
        className={`${
          isMobile
            ? 'w-full text-red-500 hover:bg-red-500/10'
            : 'group relative inline-flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white'
        } transition-colors flex items-center gap-3`}
      >
        <LogOut size={18} className={isMobile ? '' : 'group-hover:translate-x-0.5 transition-transform'} />
        <span>Sign out</span>
        {!isMobile && <div className="absolute inset-0 border border-gray-800 rounded-lg group-hover:border-green-500/30 transition-colors"></div>}
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#111111] sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Bot className="text-green-500" size={24} />
                <span className="font-semibold">Test Agent</span>
              </div>
              <span className="text-sm text-gray-500">Draft</span>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <HeaderActions />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800 py-4 space-y-2 animate-fadeIn">
              <div className="flex flex-col gap-2 px-2">
                <HeaderActions isMobile={true} />
              </div>
            </div>
          )}
        </div>
      </header>

 
      {/* Settings Modal */}
      <BotSettings 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        message={
          comingSoonTrigger === 'chat' 
            ? "We're crafting something extraordinary – a no-code platform where you can test and preview your AI chatbot's responses in real-time. Join our early access list to be among the first to experience the future of conversational AI."
            : "We're crafting something extraordinary – a no-code platform where you can build, train, and deploy AI chatbots in minutes. Preview our studio interface and be among the first to experience the future of conversational AI."
        }
      />
    </div>
  );
}