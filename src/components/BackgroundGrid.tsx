import React from 'react';
import { motion } from 'motion/react';

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Enhanced main grid lines with more opacity */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid-large"
              width="240"
              height="240"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 240 0 L 0 0 0 240"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#grid-large)" className="opacity-60" />
        </svg>
      </div>

      {/* Enhanced floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-gray-200/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-32 h-32 border-2 border-gray-200/15"
        animate={{
          y: [0, 40, 0],
          rotate: [0, -360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-3/4 w-24 h-24 border-2 border-gray-200/25 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* More dynamic connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <motion.line
          x1="5%"
          y1="15%"
          x2="95%"
          y2="85%"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="15%"
          y1="95%"
          x2="85%"
          y2="5%"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6,8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="12,6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Enhanced parallax layers with more elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 3) + 1} h-${Math.floor(Math.random() * 3) + 1} bg-gray-300/20 rounded-full`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60 - (i * 10), 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 8 + (i * 2), 
              delay: i * 0.5, 
              repeat: Infinity 
            }}
          />
        ))}
      </div>

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 opacity-[0.04]">
        <motion.div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-400 to-transparent rotate-12"
          animate={{ x: ['-100vw', '100vw'] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent -rotate-12"
          animate={{ x: ['100vw', '-100vw'] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Corner accent elements */}
      <motion.div
        className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-gray-200/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-gray-200/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, delay: 2, repeat: Infinity }}
      />
    </div>
  );
}