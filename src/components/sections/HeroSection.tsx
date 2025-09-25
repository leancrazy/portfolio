import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-32 pb-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>
      </div>
    </section>
  );
}