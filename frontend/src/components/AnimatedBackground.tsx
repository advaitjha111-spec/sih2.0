"use client";
import React from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
          x: [0, 100, 0],
          y: [0, -100, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen" 
      />
      <motion.div 
        animate={{
          scale: [1, 2, 1],
          opacity: [0.1, 0.4, 0.1],
          x: [0, -200, 0],
          y: [0, 200, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] mix-blend-screen" 
      />
    </div>
  );
}
