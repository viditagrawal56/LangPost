"use client";

import { motion } from "framer-motion";

interface AnimationContainerProps {
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
  className?: string;
  marquee?: boolean; // Add marquee prop
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
        duration: 0.2,
        delay: delay,
        ease: "easeInOut",
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {marquee ? (
        <div className="">
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
