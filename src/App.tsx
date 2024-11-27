import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import BusinessTypes from './components/BusinessTypes';
import AnnouncementSection from './components/AnnouncementSection';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import ContactForm from './components/ContactForm';
import AIStudio from './pages/AIStudio';
import OGImage from './components/OGImage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';

export default function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/og-image" element={<OGImage />} />
        <Route path="/studio" element={
          <ProtectedRoute>
            <AIStudio />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-dark text-gray-100 font-sans">
            <Header 
              onShowContactForm={() => setShowContactForm(true)} 
              onShowAuthModal={() => setShowAuthModal(true)}
            />
            <main className="pt-16">
              <Hero onShowAuthModal={() => setShowAuthModal(true)} />
              <Features />
              <BusinessTypes />
              <AnnouncementSection onShowAuthModal={() => setShowAuthModal(true)} />
              <Pricing onShowContactForm={() => setShowContactForm(true)} />
              <CTA onShowContactForm={() => setShowContactForm(true)} />
            </main>
            
            <footer className="bg-dark-lighter/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-400">
                <p className="font-medium">© 2024 agentif.co by Ubersolve. All rights reserved.</p>
              </div>
            </footer>

            {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
          </div>
        } />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}