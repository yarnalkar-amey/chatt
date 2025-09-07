"use client";
// eslint-disable-next-line no-unused-vars
import { motion,useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Animation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create a smooth parallax effect based on mouse position
  const translateX1 = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const translateY1 = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  const translateX2 = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const translateY2 = useTransform(mouseY, [0, window.innerHeight], [20, -20]);

  const translateX3 = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const translateY3 = useTransform(mouseY, [0, window.innerHeight], [15, -15]);

  // Track mouse movement for interactive depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* First Orb */}
      <motion.div
        className="absolute w-[42rem] h-[42rem] rounded-full bg-gradient-to-r from-[#00eaff] via-[#0077ff] to-[#7b00ff] blur-[140px] opacity-25 top-[-10%] left-[-15%]"
        style={{ x: translateX1, y: translateY1 }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second Orb */}
      <motion.div
        className="absolute w-[38rem] h-[38rem] rounded-full bg-gradient-to-r from-[#ff00cc] via-[#ff6600] to-[#ffee00] blur-[140px] opacity-20 bottom-[-20%] right-[-15%]"
        style={{ x: translateX2, y: translateY2 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Third Orb */}
      <motion.div
        className="absolute w-[34rem] h-[34rem] rounded-full bg-gradient-to-r from-[#00ffaa] via-[#0077ff] to-[#ff00ff] blur-[140px] opacity-15 top-[30%] left-[40%]"
        style={{ x: translateX3, y: translateY3 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
