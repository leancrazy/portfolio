import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { TypewriterText } from '../TypewriterText';
import { ParallaxContainer } from '../ParallaxContainer';

export function AboutSection() {
  const { t } = useLanguage();
  const [startTyping, setStartTyping] = useState(false);

  return (
    <section className="py-32 px-8 relative">
      <ParallaxContainer speed={0.3} className="absolute inset-0 opacity-20">
        <div className="w-full h-full">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-1 h-48 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 6, delay: 2, repeat: Infinity }}
          />
        </div>
      </ParallaxContainer>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          }}
          onViewportEnter={() => setTimeout(() => setStartTyping(true), 300)}
          viewport={{ once: true }}
        >
          {t('about.title')}
        </motion.h2>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 min-h-[3em]">
            {startTyping && (
              <TypewriterText
                text={t('about.text')}
                speed={20}
                delay={0}
                showCursor={true}
              />
            )}
          </p>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-8 -right-8 w-16 h-16 border-2 border-gray-200/30 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute -bottom-8 -left-8 w-12 h-12 border-2 border-gray-200/20"
          animate={{
            rotate: [0, -360],
            y: [0, -10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
    </section>
  );
}