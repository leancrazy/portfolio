import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useContent } from '../ContentContext';
import { motion, AnimatePresence } from 'motion/react';
import { TypewriterText } from '../TypewriterText';
import { ParallaxContainer } from '../ParallaxContainer';

export function SkillsSection() {
  const { t, language } = useLanguage();
  const { skillCategories } = useContent();
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [startTyping, setStartTyping] = useState(false);

  return (
    <section className="py-32 px-8 relative">
      <ParallaxContainer speed={0.2} className="absolute inset-0 opacity-10">
        <div className="w-full h-full">
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-400 to-transparent"
            animate={{ scaleY: [0, 1] }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1 }}
          />
        </div>
      </ParallaxContainer>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          onViewportEnter={() => setTimeout(() => setStartTyping(true), 200)}
          viewport={{ once: true }}
        >
          {startTyping ? (
            <TypewriterText
              text={t('skills.title')}
              speed={50}
              delay={0}
              showCursor={false}
            />
          ) : (
            <span className="opacity-0">{t('skills.title')}</span>
          )}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="relative"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.3, delay: index * 0.05 }
              }}
              viewport={{ once: true }}
            >
              <div
                className="relative cursor-pointer"
                onClick={() =>
                  setOpenCard(openCard === category.id ? null : category.id)
                }
              >
                {/* Main card */}
                <motion.div
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50"
                  whileHover={{ 
                    y: -5,
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -8, 8, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  
                  <h3 className="text-xl md:text-2xl font-medium">
                    {category.title[language]}
                  </h3>
                </motion.div>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {openCard === category.id && (
                    <motion.div
                      className="relative mt-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -10,
                        transition: { duration: 0.15 }
                      }}
                    >
                      <motion.div
                        className="bg-white/98 backdrop-blur-md border border-gray-200/60 rounded-xl p-6 shadow-xl"
                        layoutId={`dropdown-${category.id}`}
                      >
                        <div className="grid grid-cols-1 gap-3">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/80 transition-colors group/skill"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: skillIndex * 0.05 }
                              }}
                            >
                              <span className="font-medium text-gray-800 group-hover/skill:text-gray-900">
                                {skill}
                              </span>
                              <motion.div
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                whileHover={{ scale: 1.5, backgroundColor: "#6B7280" }}
                                transition={{ duration: 0.2 }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 border border-gray-200/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 w-16 h-16 border border-gray-200/15"
          animate={{
            rotate: [0, -360],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
