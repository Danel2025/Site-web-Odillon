"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface ParallaxBackgroundProps {
  images: Array<{
    url: string
    alt: string
  }>
  speed?: number
  className?: string
}

export function ParallaxBackground({ 
  images, 
  speed = 0.3,
  className = "" 
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollPosition = window.scrollY - rect.top
        setScrollY(scrollPosition)
        
        // Vérifier si le conteneur est visible
        const viewportHeight = window.innerHeight
        const isInViewport = rect.top < viewportHeight && rect.bottom > 0
        setIsVisible(isInViewport)
      }
    }

    // Utiliser requestAnimationFrame pour de meilleures performances
    let rafId: number
    const optimizedScroll = () => {
      handleScroll()
      rafId = requestAnimationFrame(optimizedScroll)
    }

    window.addEventListener("scroll", optimizedScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", optimizedScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Rotation des images si plusieurs sont disponibles
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true)
        setNextImageIndex((currentImageIndex + 1) % images.length)
        
        // Après la transition, changer l'image actuelle
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length)
          setIsTransitioning(false)
        }, 1000) // Durée de la transition
      }, 6000) // Change d'image toutes les 6 secondes

      return () => clearInterval(interval)
    }
  }, [images.length, currentImageIndex])

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[currentImageIndex]
  const nextImage = images[nextImageIndex]

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Image actuelle */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          transform: `translateY(${scrollY * speed}px)`,
          willChange: "transform",
          opacity: isVisible ? (isTransitioning ? 0 : 1) : 0
        }}
      >
        <Image
          src={currentImage.url}
          alt={currentImage.alt}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Overlay léger pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </div>
      
      {/* Image suivante pour transition en fondu (si plusieurs images) */}
      {images.length > 1 && (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            transform: `translateY(${scrollY * speed}px)`,
            opacity: isTransitioning ? 1 : 0,
            willChange: "transform, opacity"
          }}
          key={`next-${nextImageIndex}`}
        >
          <Image
            src={nextImage.url}
            alt={nextImage.alt}
            fill
            className="object-cover"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        </div>
      )}
    </div>
  )
}
