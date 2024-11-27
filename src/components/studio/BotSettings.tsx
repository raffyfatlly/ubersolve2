import React, { useState, useEffect } from 'react';
import { X, BookText, Database, ChevronDown, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateApiKey } from '../../lib/openai';
import FileUploadZone from './FileUploadZone';

// Define models array at the top level
const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    icon: `data:image/svg+xml,%3Csvg fill='%23AB68FF' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z'/%3E%3C/svg%3E`,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    icon: `data:image/svg+xml,%3Csvg fill='%2374AA9C' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z'/%3E%3C/svg%3E`,
  }
];

interface BotSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSystemPrompt?: (prompt: string) => void;
  onUpdateModel?: (model: string) => void;
  currentSystemPrompt?: string;
  currentModel?: string;
  embedded?: boolean;
  onSave?: () => Promise<void>;
}

export default function BotSettings({ 
  isOpen, 
  onClose,
  onUpdateSystemPrompt,
  onUpdateModel,
  currentSystemPrompt,
  currentModel,
  embedded = false,
  onSave
}: BotSettingsProps) {
  const [selectedModel, setSelectedModel] = useState(currentModel || 'gpt-4');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'knowledge'>('instructions');
  const [instructions, setInstructions] = useState(currentSystemPrompt || '');
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when props change
  useEffect(() => {
    if (currentSystemPrompt) {
      setInstructions(currentSystemPrompt);
    }
    if (currentModel) {
      setSelectedModel(currentModel);
    }
  }, [currentSystemPrompt, currentModel]);

  useEffect(() => {
    const checkApiKey = async () => {
      const isValid = await validateApiKey();
      if (!isValid) {
        toast.error('Invalid OpenAI API key. Please check your configuration.');
      }
    };
    checkApiKey();
  }, []);

  const selectedModelData = models.find(m => m.id === selectedModel);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    onUpdateModel?.(modelId);
    setIsModelDropdownOpen(false);
  };

  const handleInstructionsChange = (value: string) => {
    setInstructions(value);
    onUpdateSystemPrompt?.(value);
  };

  const handleFileSummary = (summary: string) => {
    const newInstructions = `${instructions}\n\nAdditional Knowledge:\n${summary}`;
    handleInstructionsChange(newInstructions);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave();
        toast.success('Settings saved successfully');
      }
      if (!embedded) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const content = (
    <div className="space-y-6">
      {!embedded && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bot Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('instructions')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'instructions'
              ? 'border-green-500 text-green-500'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <BookText size={20} />
          Instructions
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'knowledge'
              ? 'border-green-500 text-green-500'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Database size={20} />
          Knowledge Base
        </button>
      </div>

      {activeTab === 'instructions' ? (
        <>
          {/* Model Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Model
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all flex items-center justify-between group hover:border-green-500/50"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedModelData?.icon} 
                    alt="" 
                    className="w-5 h-5"
                  />
                  <span>{selectedModelData?.name}</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform duration-200 ${
                    isModelDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isModelDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                  <div className="py-1">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelChange(model.id)}
                        className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-700/50 transition-colors ${
                          selectedModel === model.id ? 'bg-green-500/10 text-green-500' : 'text-gray-300'
                        }`}
                      >
                        <img 
                          src={model.icon} 
                          alt="" 
                          className="w-5 h-5"
                        />
                        <span>{model.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Instructions */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              System Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => handleInstructionsChange(e.target.value)}
              placeholder="Write instructions for your AI assistant..."
              className="w-full h-[500px] px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-mono text-sm"
            />
            <p className="text-xs text-gray-400">
              Tip: Replace all [bracketed text] with your specific business information. Add or modify sections based on your needs.
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-400">
            Upload documents to train your AI assistant. Supported formats: PDF, Excel, Text files
          </p>
          <FileUploadZone onProcessComplete={handleFileSummary} />
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Save size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className="bg-[#0F1117] rounded-xl border border-gray-800 shadow-xl p-6">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}