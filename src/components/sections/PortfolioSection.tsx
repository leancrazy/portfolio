import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useContent } from '../ContentContext';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TypewriterText } from '../TypewriterText';
import { ParallaxContainer } from '../ParallaxContainer';
import { VideoModal } from '../VideoModal';
import { Play } from 'lucide-react';

export function PortfolioSection() {
  const { t, language } = useLanguage();
  const { portfolioItems } = useContent();
  const [startIntroTyping, setStartIntroTyping] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const introText = language === 'en' 
    ? "Welcome to my creative universe. Each project tells a story of innovation, passion, and endless possibilities."
    : "Willkommen in meinem kreativen Universum. Jedes Projekt erzählt eine Geschichte von Innovation, Leidenschaft und endlosen Möglichkeiten.";

  return (
    <section className="py-32 px-8 relative overflow-hidden">
      <ParallaxContainer speed={0.4} className="absolute inset-0 opacity-5">
        <div className="w-full h-full">
          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-gray-400 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-gray-300"
            animate={{
              rotate: [0, -360],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      </ParallaxContainer>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Introduction with typewriter effect */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          onViewportEnter={() => setTimeout(() => setStartIntroTyping(true), 200)}
          viewport={{ once: true }}
        >
          <div className="text-lg md:text-xl text-gray-600 mb-8 min-h-[3em] flex items-center justify-center">
            {startIntroTyping && (
              <TypewriterText
                text={introText}
                speed={5}
                delay={0}
                showCursor={true}
                onComplete={() => setIntroComplete(true)}
              />
            )}
          </div>
        </motion.div>

        {/* Alfred's photo */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ 
            opacity: introComplete ? 1 : 0, 
            scale: introComplete ? 1 : 0.8,
            transition: { duration: 0.4, delay: 0.2 }
          }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.div
              className="relative w-48 h-64 md:w-56 md:h-72 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl rotate-3"></div>
              <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://i.imgur.com/qOZAQlS.jpeg"
                  alt="Alfred Klimov"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gray-200/60 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gray-300/40 rounded-full"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 5, delay: 1, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: introComplete ? 1 : 0, 
                y: introComplete ? 0 : 20,
                transition: { duration: 0.3, delay: 0.5 }
              }}
            >
              <span className="font-medium text-gray-800">Alfred Klimov</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Portfolio title */}
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: introComplete ? 1 : 0, 
            y: introComplete ? 0 : 50,
            transition: { duration: 0.4, delay: 0.3 }
          }}
          viewport={{ once: true }}
        >
          {introComplete && (
            <TypewriterText
              text={t('portfolio.title')}
              speed={80}
              delay={300}
              showCursor={false}
            />
          )}
        </motion.h2>
        
        {/* Portfolio grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: introComplete ? 1 : 0,
            transition: { duration: 0.4, delay: 0.5 }
          }}
          viewport={{ once: true }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotateY: 0,
                transition: { 
                  duration: 0.4, 
                  delay: 0.6 + (index * 0.1),
                  ease: "easeOut"
                }
              }}
              whileHover={{ 
                y: -5,
                rotateY: 3,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
              onClick={() => {
                if (item.videoUrl) {
                  setSelectedProject(item);
                } else if (item.link) {
                  window.open(item.link, '_blank');
                }
              }}
              style={{ perspective: 1000 }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title[language]}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-white/60 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {(item.videoUrl || item.link) && (
                  <motion.div
                    className="absolute bottom-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.videoUrl ? (
                      <Play className="w-4 h-4 text-gray-700" />
                    ) : (
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </motion.div>
                )}
              </div>
              
              <motion.div
                className="space-y-3"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-medium group-hover:text-gray-600 transition-colors duration-200">
                  {item.title[language]}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                  {item.description[language]}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Background decorations */}
        <motion.div
          className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-1 h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 3 }}
        />
      </div>

      <VideoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        videoUrl={selectedProject?.videoUrl}
        title={selectedProject?.title[language] || ''}
        description={selectedProject?.description[language] || ''}
      />
    </section>
  );
}
