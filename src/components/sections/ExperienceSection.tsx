import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useContent } from "../ContentContext";
import { motion } from "motion/react";
import { TypewriterText } from "../TypewriterText";
import { ParallaxContainer } from "../ParallaxContainer";

export function ExperienceSection() {
  const { t, language } = useLanguage();
  const { experienceItems } = useContent();
  const [startTyping, setStartTyping] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set<string>());

  const handleItemVisible = (itemId: string) => {
    setVisibleItems((prev) => new Set([...prev, itemId]));
  };

  return (
    <section className="py-32 px-8 relative">
      {/* Parallax background line */}
      <ParallaxContainer speed={0.3} className="absolute inset-0 opacity-8">
        <div className="w-full h-full">
          <motion.div
            className="absolute top-1/3 right-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      </ParallaxContainer>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Заголовок */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
          }}
          onViewportEnter={() => setTimeout(() => setStartTyping(true), 800)}
          viewport={{ once: true }}
        >
          {startTyping ? (
            <TypewriterText
              text={t("experience.title")}
              speed={80}
              delay={0}
              showCursor={false}
            />
          ) : (
            <span className="opacity-0">{t("experience.title")}</span>
          )}
        </motion.h2>

        <div className="relative">
          {/* Линия таймлайна */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-400 to-gray-200"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            viewport={{ once: true }}
          />

          <div className="space-y-16">
            {experienceItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative pl-20"
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.8, delay: 1.5 + index * 0.3 },
                }}
                onViewportEnter={() => handleItemVisible(item.id)}
                viewport={{ once: true }}
              >
                {/* Точка на линии */}
                <motion.div
                  className="absolute left-6 top-2 w-4 h-4 bg-gray-900 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: visibleItems.has(item.id) ? 1 : 0,
                    transition: { delay: 1.7 + index * 0.3 },
                  }}
                />
                <motion.div
                  className="absolute left-5 top-1 w-6 h-6 border-2 border-gray-300 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: visibleItems.has(item.id) ? 1 : 0,
                    opacity: visibleItems.has(item.id) ? 0.5 : 0,
                    transition: { delay: 1.8 + index * 0.3 },
                  }}
                />

                {/* Карточка опыта */}
                <motion.div
                  className="space-y-3 bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.div
                    className="text-sm text-gray-500 tracking-wider uppercase font-medium"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: visibleItems.has(item.id) ? 1 : 0,
                      transition: { delay: 2 + index * 0.3 },
                    }}
                  >
                    {item.period}
                  </motion.div>

                  <h3 className="text-xl md:text-2xl leading-relaxed min-h-[2em]">
                    {visibleItems.has(item.id) && (
                      <TypewriterText
                        text={item.title[language]}
                        speed={40}
                        delay={2200 + index * 300}
                        showCursor={false}
                      />
                    )}
                  </h3>

                  {/* Декор */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 bg-gray-200/60 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 3 + index * 0.5,
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Декоративный круг */}
        <motion.div
          className="absolute top-32 -right-8 w-16 h-16 border border-gray-200/30 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
