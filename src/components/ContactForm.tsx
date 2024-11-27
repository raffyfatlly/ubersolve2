import React, { useState } from 'react';
import { Send, Loader2, X, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    businessName: '',
    whatsappNumber: '',
    websiteAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const normalizeWebsiteUrl = (url: string) => {
    let normalizedUrl = url.trim().toLowerCase();
    
    // Remove any existing protocol
    normalizedUrl = normalizedUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    // Remove any trailing slashes
    normalizedUrl = normalizedUrl.replace(/\/$/, '');
    
    // Add https protocol
    return `https://${normalizedUrl}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Basic website validation (just check if it has at least one dot)
      if (!formData.websiteAddress.includes('.')) {
        throw new Error('Please enter a valid website address (e.g., www.business.com)');
      }

      // Validate WhatsApp number (basic validation for 10-11 digits)
      const phoneRegex = /^\d{10,11}$/;
      if (!phoneRegex.test(formData.whatsappNumber.replace(/[\s-]/g, ''))) {
        throw new Error('Please enter a valid phone number');
      }

      const normalizedWebsite = normalizeWebsiteUrl(formData.websiteAddress);

      const { error: supabaseError } = await supabase
        .from('business_applications')
        .insert([{
          business_name: formData.businessName,
          whatsapp_number: formData.whatsappNumber.replace(/[\s-]/g, ''),
          website_address: normalizedWebsite
        }]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error('Unable to submit application. Please try again later.');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Unable to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1">
          <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter">
            <div className="aspect-square h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
          </div>
        </div>
        
        <div className="relative bg-gray-800 rounded-xl shadow-xl">
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-xl" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-full"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">Apply for Beta Access</h3>
            <p className="text-gray-400 mb-6">Join our exclusive network of AI-powered businesses. Limited spots available.</p>
            
            {success ? (
              <div className="text-center py-8">
                <div className="text-green-500 text-xl font-semibold mb-2">Application Submitted!</div>
                <p className="text-gray-400">We'll review your application and contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2">
                    <AlertTriangle size={20} />
                    <span>{error}</span>
                  </div>
                )}
                
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="Enter your business name"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="0123456789"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="websiteAddress" className="block text-sm font-medium text-gray-300 mb-1">
                    Website Address
                  </label>
                  <input
                    type="text"
                    id="websiteAddress"
                    value={formData.websiteAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteAddress: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="www.business.com"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Application
                    </>
                  )}
                </button>
                
                <p className="text-center text-sm text-gray-400 mt-4">
                  Our team will review your application and contact you if your business qualifies for our AI solution.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}