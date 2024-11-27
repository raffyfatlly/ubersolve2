import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Brain, MessageSquare, Rocket, LogOut, Menu, X, Loader2 } from 'lucide-react';
import BotSettings from '../components/studio/BotSettings';
import ChatInterface from '../components/studio/ChatInterface';
import ComingSoonModal from '../components/studio/ComingSoonModal';
import { signOut, saveUserSettings, getUserSettings, saveChatHistory, getChatHistory } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

export default function AIStudio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('settings');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load user settings and chat history on mount
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Load settings
        const settings = await getUserSettings();
        if (settings) {
          setSystemPrompt(settings.system_prompt);
          setSelectedModel(settings.selected_model);
        }

        // Load chat history
        const history = await getChatHistory();
        setMessages(history);
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load your settings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Prompt user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSignOut = async () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Do you want to save them before signing out?');
      if (confirm) {
        await handleSaveSettings();
      }
    }

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

  const handleUpdateSystemPrompt = (prompt: string) => {
    setSystemPrompt(prompt);
    setHasUnsavedChanges(true);
  };

  const handleUpdateModel = (model: string) => {
    setSelectedModel(model);
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      await saveUserSettings({
        system_prompt: systemPrompt,
        selected_model: selectedModel
      });
      setHasUnsavedChanges(false);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleUpdateMessages = async (newMessages: Message[]) => {
    setMessages(newMessages);
    try {
      await saveChatHistory(newMessages);
    } catch (error) {
      console.error('Error saving chat history:', error);
      toast.error('Failed to save chat history');
    }
  };

  const handleResetChat = async () => {
    try {
      setMessages([]);
      await saveChatHistory([]);
      toast.success('Chat history cleared');
    } catch (error) {
      console.error('Error clearing chat history:', error);
      toast.error('Failed to clear chat history');
    }
  };

  const HeaderActions = ({ isMobile = false }) => (
    <>
      <button 
        onClick={() => setActiveTab('settings')}
        className={`${
          isMobile ? 'w-full' : 'px-4 py-2'
        } text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3 ${
          activeTab === 'settings' ? 'text-green-500 bg-green-500/10' : ''
        }`}
      >
        <Brain size={20} />
        <span>Bot Settings</span>
      </button>
      <button 
        onClick={() => setActiveTab('chat')}
        className={`${
          isMobile ? 'w-full' : 'px-4 py-2'
        } text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-3 ${
          activeTab === 'chat' ? 'text-green-500 bg-green-500/10' : ''
        }`}
      >
        <MessageSquare size={20} />
        <span>Try Chat</span>
      </button>
      <button 
        onClick={() => setIsComingSoonOpen(true)}
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <p className="text-gray-400">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#111111] sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Bot className="text-green-500" size={24} />
                <span className="font-semibold">AI Studio</span>
              </div>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-hidden">
            {activeTab === 'chat' ? (
              <ChatInterface 
                systemPrompt={systemPrompt}
                model={selectedModel}
                messages={messages}
                setMessages={handleUpdateMessages}
                onResetChat={handleResetChat}
              />
            ) : (
              <div className="p-6">
                <BotSettings 
                  isOpen={true}
                  onClose={() => setActiveTab('chat')}
                  onUpdateSystemPrompt={handleUpdateSystemPrompt}
                  onUpdateModel={handleUpdateModel}
                  currentSystemPrompt={systemPrompt}
                  currentModel={selectedModel}
                  embedded={true}
                  onSave={handleSaveSettings}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        message="We're crafting something extraordinary – a no-code platform where you can build, train, and deploy AI chatbots in minutes. Preview our studio interface and be among the first to experience the future of conversational AI."
      />
    </div>
  );
}