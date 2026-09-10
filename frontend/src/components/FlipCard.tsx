"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FlipCard({
  frontContent,
  backContent,
  className
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn("perspective-1000 relative group cursor-pointer w-full h-full", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {frontContent}
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}
