import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { TypewriterText } from '../TypewriterText';
import { ParallaxContainer } from '../ParallaxContainer';

export function ContactSection() {
  const { t } = useLanguage();
  const [startTyping, setStartTyping] = useState(false);

  return (
    <section className="py-32 px-8 relative">
      <ParallaxContainer speed={0.2} className="absolute inset-0 opacity-5">
        <div className="w-full h-full">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-gray-300 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 30, repeat: Infinity }}
          />
        </div>
      </ParallaxContainer>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
          }}
          onViewportEnter={() => setTimeout(() => setStartTyping(true), 500)}
          viewport={{ once: true }}
        >
          {startTyping ? (
            <TypewriterText
              text={t('contact.title')}
              speed={80}
              delay={0}
              showCursor={false}
            />
          ) : (
            <span className="opacity-0">{t('contact.title')}</span>
          )}
        </motion.h2>
        
        <div className="space-y-12">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.8, delay: 1 }
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-8 h-8 text-gray-600" />
                </motion.div>
                <div className="text-left">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-medium">
                    {t('contact.email')}
                  </div>
                  <a 
                    href="mailto:alfredklimov@gmail.com"
                    className="text-xl md:text-2xl hover:text-gray-600 transition-colors duration-300 font-medium"
                  >
                    alfredklimov@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-gray-200/50 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
          
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.8, delay: 1.3 }
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone className="w-8 h-8 text-gray-600" />
                </motion.div>
                <div className="text-left">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-medium">
                    {t('contact.phone')}
                  </div>
                  <a 
                    href="tel:+436701896338"
                    className="text-xl md:text-2xl hover:text-gray-600 transition-colors duration-300 font-medium"
                  >
                    +436701896338
                  </a>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-gray-300/40 rounded-full"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 4, delay: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Section decorative elements */}
        <motion.div
          className="absolute bottom-10 right-10 w-12 h-12 border border-gray-200/25 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
    </section>
  );
}