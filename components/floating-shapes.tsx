"use client"

import { motion } from "framer-motion"

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <div
            className="w-8 h-8 md:w-12 md:h-12"
            style={{
              background: `rgba(255, 255, 255, ${Math.random() * 0.2})`,
              clipPath: i % 2 === 0 ? "polygon(50% 0%, 100% 100%, 0% 100%)" : "circle(50% at 50% 50%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

