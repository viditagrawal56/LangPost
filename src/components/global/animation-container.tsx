"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimationContainerProps {
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
  className?: string;
  marquee?: boolean; // Enable marquee behavior
}

const AnimationContainer = ({
  children,
  className,
  reverse,
  delay,
  marquee,
}: AnimationContainerProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {marquee ? (
        <div className="relative flex overflow-hidden">
          <div className="flex space-x-4 animate-marquee whitespace-nowrap">
            {children}
          </div>
          <div className="flex space-x-4 animate-marquee whitespace-nowrap">
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimationContainer;
