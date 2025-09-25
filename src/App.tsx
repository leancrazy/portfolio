import React, { useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { ContentProvider } from './components/ContentContext';
import { AdminAuthProvider, useAdminAuth, AdminLogin } from './components/admin/AdminAuth';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { BackgroundGrid } from './components/BackgroundGrid';
import { Button } from './components/ui/button';
import { Settings } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

function AdminToggle() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { isAuthenticated } = useAdminAuth();

  if (showAdmin) {
    return isAuthenticated ? (
      <AdminDashboard />
    ) : (
      <AdminLogin />
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0"
        variant="outline"
        title="Admin Panel"
      >
        <Settings className="w-5 h-5" />
      </Button>
      <MainSite />
    </>
  );
}

function MainSite() {
  return (
    <div className="overflow-x-hidden relative">
      <BackgroundGrid />
      <LanguageSwitcher />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      
      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AdminAuthProvider>
          <AdminToggle />
          <Toaster position="top-right" />
        </AdminAuthProvider>
      </ContentProvider>
    </LanguageProvider>
  );
}