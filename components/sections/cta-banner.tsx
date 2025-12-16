"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"

interface CtaBannerProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  badgeText?: string
  imageUrl?: string | null
  defaultImageUrl?: string
  className?: string
}

export function CtaBanner({
  title,
  description,
  buttonText,
  buttonHref,
  badgeText,
  imageUrl: propImageUrl,
  defaultImageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=500&fit=crop",
  className = ""
}: CtaBannerProps) {
  const [ctaImageUrl, setCtaImageUrl] = useState<string | null>(propImageUrl ?? null)

  // Récupérer l'URL de la photo CTA depuis les paramètres si non fournie
  useEffect(() => {
    if (propImageUrl !== undefined) {
      setCtaImageUrl(propImageUrl)
      return
    }

    const fetchCtaImage = async () => {
      try {
        const res = await fetch('/api/settings', {
          cache: 'default',
          next: { revalidate: 60 }
        })
        if (res.ok) {
          const data = await res.json()
          setCtaImageUrl(data.settings?.services_cta_image_url || null)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la photo CTA:', error)
      }
    }
    fetchCtaImage()
  }, [propImageUrl])

  return (
    <BlurFade delay={0.4}>
      <section className={`py-12 w-full ${className}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden w-full rounded">
          <Image
            alt="Équipe en collaboration"
            src={ctaImageUrl || defaultImageUrl}
            width={1200}
            height={500}
            className="aspect-[21/9] w-full object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30"></div>
          
          {/* Badge en haut à droite */}
          {badgeText && (
            <div className="absolute top-6 right-6 z-10">
              <Badge className="bg-white/90 backdrop-blur-sm border-2 border-odillon-teal text-odillon-teal text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
                {badgeText}
              </Badge>
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-md px-6 sm:px-8">
              <h2 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight text-white">
                {title}
              </h2>
              {description && (
                <p className="mb-6 text-sm md:text-base text-white/90 leading-relaxed">
                  {description}
                </p>
              )}
              <Button
                asChild
                className="bg-odillon-teal hover:bg-odillon-teal/90 text-white border-2 border-odillon-teal transition-all duration-300"
              >
                <Link href={buttonHref} className="inline-flex items-center gap-2 group">
                  {buttonText}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </BlurFade>
  )
}

