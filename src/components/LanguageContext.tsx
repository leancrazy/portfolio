import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Hero Section
    'hero.title': "Hi, I'm Alfred Klimov — Designer, Developer & Sound Engineer based in Vienna",
    'hero.subtitle': "Creative mind with passion for design, code, sound & motion",
    
    // About Section
    'about.title': "About",
    'about.text': "I was born on February 2, 2009 in Saint Petersburg. Since 2011 I have been living in Austria. I studied at Volksschule im Park (Währinger Straße), then at Glassergasse 8 (focus on computer science), later at FMS Burggasse. In parallel, I interned at Ahead Media as a graphic designer and worked in catering. In addition, I have created many personal projects at home on my computer.",
    
    // Skills Section
    'skills.title': "Skills",
    'skills.design': "Design",
    'skills.development': "Development", 
    'skills.ai': "AI & Prompt Engineering",
    'skills.sound': "Sound Design",
    'skills.motion': "Motion & Video",
    
    // Portfolio Section
    'portfolio.title': "Portfolio",
    
    // Experience Section
    'experience.title': "Experience",
    'experience.ahead': "Ahead Media — Internship, Graphic Design",
    'experience.catering': "Catering — Team Member", 
    'experience.freelance': "Freelance Projects — Web Design & Development, Creative Projects",
    
    // Contact Section
    'contact.title': "Let's Connect",
    'contact.email': "Email",
    'contact.phone': "Phone",
    
    // Admin
    'admin.title': "Admin Dashboard",
    'admin.login': "Login",
    'admin.logout': "Logout",
    'admin.password': "Password",
    'admin.portfolio': "Portfolio Management",
    'admin.content': "Content Management",
    'admin.add': "Add",
    'admin.edit': "Edit", 
    'admin.delete': "Delete",
    'admin.save': "Save",
    'admin.cancel': "Cancel"
  },
  de: {
    // Hero Section
    'hero.title': "Hallo, ich bin Alfred Klimov — Designer, Entwickler & Sound Engineer aus Wien",
    'hero.subtitle': "Kreativer Kopf mit Leidenschaft für Design, Code, Sound & Motion",
    
    // About Section
    'about.title': "Über mich",
    'about.text': "Ich wurde am 2. Februar 2009 in Sankt Petersburg geboren. Seit 2011 lebe ich in Österreich. Ich habe an der Volksschule im Park (Währinger Straße) studiert, dann an der Glassergasse 8 (Schwerpunkt Informatik) und später an der FMS Burggasse. Parallel dazu absolvierte ich ein Praktikum bei Ahead Media als Grafikdesigner und arbeitete im Catering. Darüber hinaus habe ich viele eigene Projekte am Computer entwickelt.",
    
    // Skills Section
    'skills.title': "Kenntnisse",
    'skills.design': "Design",
    'skills.development': "Entwicklung",
    'skills.ai': "KI & Prompt Engineering", 
    'skills.sound': "Sound Design",
    'skills.motion': "Motion & Video",
    
    // Portfolio Section
    'portfolio.title': "Portfolio",
    
    // Experience Section
    'experience.title': "Erfahrung",
    'experience.ahead': "Ahead Media — Praktikum, Grafikdesign",
    'experience.catering': "Catering — Teammitglied",
    'experience.freelance': "Freelance Projekte — Webdesign & Entwicklung, Kreative Projekte",
    
    // Contact Section
    'contact.title': "Lass uns verbinden",
    'contact.email': "E-Mail",
    'contact.phone': "Telefon",
    
    // Admin
    'admin.title': "Admin Dashboard",
    'admin.login': "Anmelden",
    'admin.logout': "Abmelden", 
    'admin.password': "Passwort",
    'admin.portfolio': "Portfolio-Verwaltung",
    'admin.content': "Inhaltsverwaltung",
    'admin.add': "Hinzufügen",
    'admin.edit': "Bearbeiten",
    'admin.delete': "Löschen", 
    'admin.save': "Speichern",
    'admin.cancel': "Abbrechen"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}