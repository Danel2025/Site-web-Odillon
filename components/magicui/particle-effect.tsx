"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: string
  scale: number
  duration: number
  delay: number
}

export function ParticleEffect() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Générer les particules uniquement côté client
    const particleArray = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: "100%",
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(particleArray)
    setMounted(true)
  }, [])

  // Ne rien rendre pendant le SSR
  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-odillon-teal/30 rounded-full"
          initial={{
            x: particle.x + "%",
            y: particle.y,
            scale: particle.scale,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

