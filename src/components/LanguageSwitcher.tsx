import React from 'react';
import { useLanguage, type Language } from './LanguageContext';
import { motion } from 'motion/react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
      {(['en', 'de'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`relative px-3 py-1 text-sm transition-colors duration-200 ${
            language === lang 
              ? 'text-gray-900' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {language === lang && (
            <motion.div
              layoutId="language-indicator"
              className="absolute inset-0 bg-gray-100 rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 font-medium">
            {lang.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}