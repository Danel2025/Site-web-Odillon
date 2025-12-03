"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ParallaxBackground } from "@/components/ui/parallax-background"
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Star,
  Mail,
  Users,
  CheckCircle2,
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react"

type ContactItem = {
  label: string
  link?: string
}

type ContactInfo = {
  icon: any
  title: string
  items: ContactItem[]
  link?: string
  color: string
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Par Téléphone",
    items: [
      { label: "+241 11747574", link: "tel:+24111747574" }
    ],
    color: "#1A9B8E"
  },
  {
    icon: Mail,
    title: "Par Email",
    items: [
      { label: "contact@odillon.fr", link: "mailto:contact@odillon.fr" }
    ],
    color: "#C4D82E"
  },
  {
    icon: MapPin,
    title: "Adresse",
    items: [
      { label: "BP- 13262" },
      { label: "Libreville, Gabon" }
    ],
    link: "https://www.google.com/maps/search/?api=1&query=Libreville,+Gabon",
    color: "#1A9B8E"
  }
]

const stats = [
  { value: 48, suffix: "h", label: "Temps de réponse moyen", icon: Clock },
  { value: 98, suffix: "%", label: "Satisfaction client", icon: Star },
  { value: 50, suffix: "+", label: "Projets réalisés", icon: CheckCircle2 },
  { value: 10, suffix: "+", label: "Clients accompagnés", icon: Users }
]

interface ContactPhoto {
  id: string
  url: string
  alt: string
}

export function Contact() {
  const [contactPhotos, setContactPhotos] = useState<ContactPhoto[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const loadContactPhotos = async () => {
      try {
        // Charger les sections photos pour la page contact
        const sectionsRes = await fetch('/api/photo-sections/with-photos?page=contact&active=true')
        const sectionsData = await sectionsRes.json()
        
        if (sectionsData.sections && sectionsData.sections.length > 0) {
          // Prioriser les sections avec "hero" dans le titre ou badge
          // Sinon prendre la première section avec des photos
          let selectedSection = sectionsData.sections.find((s: any) => 
            (s.title?.toLowerCase().includes('hero') || 
             s.badge?.toLowerCase().includes('hero') ||
             s.title?.toLowerCase().includes('arrière-plan') ||
             s.badge?.toLowerCase().includes('background')) &&
            s.photos && s.photos.length > 0
          )
          
          // Si pas de section hero, prendre la première section avec des photos
          if (!selectedSection) {
            selectedSection = sectionsData.sections.find((s: any) => 
              s.photos && s.photos.length > 0
            )
          }
          
          if (selectedSection && selectedSection.photos) {
            const photos = selectedSection.photos.map((photo: any) => ({
              id: photo.id,
              url: photo.url,
              alt: photo.description || selectedSection.title || 'Image de fond contact'
            }))
            setContactPhotos(photos)
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des photos de contact:', error)
      }
    }

    loadContactPhotos()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue')
      }

      // Succès
      setSubmitStatus({
        type: 'success',
        message: result.message || 'Votre message a été envoyé avec succès. Nous vous recontacterons rapidement.'
      })

      // Réinitialiser le formulaire de manière sécurisée
      if (formRef.current) {
        formRef.current.reset()
      }

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 md:py-28 lg:py-36 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        {/* Parallax Background */}
        {contactPhotos.length > 0 ? (
          <ParallaxBackground 
            images={contactPhotos}
            speed={0.3}
            className="z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white z-0" />
        )}
        
        {/* Overlay pour améliorer la lisibilité du texte */}
        {contactPhotos.length > 0 && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 z-[1]" />
        )}
        
        {/* Content Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Content - Centered */}
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <BlurFade delay={0.1}>
              <Badge 
                className="bg-white/90 backdrop-blur-sm border border-odillon-teal/20 text-odillon-teal hover:bg-white shadow-lg text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3 inline-flex items-center gap-2 font-medium mb-6 md:mb-8 transition-colors"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Contactez-nous
              </Badge>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 md:mb-8">
                Transformons ensemble votre{" "}
                <span className="bg-gradient-to-r from-odillon-teal via-odillon-lime to-odillon-teal bg-clip-text text-transparent animate-gradient-x">
                  vision en réalité
                </span>
              </h1>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
                Notre équipe d'experts est à votre écoute pour comprendre vos enjeux 
                et vous proposer des solutions innovantes adaptées à vos besoins
              </p>
            </BlurFade>
          </div>

          {/* Stats Section - Horizontal Layout */}
          <BlurFade delay={0.4}>
            <div className="relative">
              {/* Animated Zigzag Curve Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1, height: '100%' }}>
                <svg 
                  className="w-full" 
                  viewBox="0 0 1200 300" 
                  preserveAspectRatio="xMidYMid meet"
                  style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', width: '100%', height: '300px' }}
                >
                  {/* Main zigzag curve that tapers - goes from left to right */}
                  <motion.path
                    d="M 0 150 L 80 130 L 160 170 L 240 110 L 320 190 L 400 90 L 480 210 L 560 70 L 640 230 L 720 50 L 800 250 L 880 30 L 960 270 L 1040 10 L 1120 290 L 1200 -10"
                    fill="none"
                    stroke="#1A9B8E"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, strokeWidth: 3, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      strokeWidth: [3, 0.8, 3],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ 
                      pathLength: { duration: 5, ease: "easeInOut", repeat: Infinity },
                      strokeWidth: { duration: 3, ease: "easeInOut", repeat: Infinity },
                      opacity: { duration: 2, ease: "easeInOut", repeat: Infinity }
                    }}
                  />
                  {/* Secondary zigzag with different pattern and tapering */}
                  <motion.path
                    d="M 0 150 L 100 170 L 200 130 L 300 190 L 400 110 L 500 210 L 600 90 L 700 230 L 800 70 L 900 250 L 1000 50 L 1100 270 L 1200 30"
                    fill="none"
                    stroke="#C4D82E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="8,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.3, 0.5, 0.3],
                      strokeWidth: [2, 0.5, 2],
                    }}
                    transition={{ 
                      pathLength: { duration: 6, ease: "easeInOut", repeat: Infinity },
                      opacity: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
                      strokeWidth: { duration: 4, ease: "easeInOut", repeat: Infinity },
                      delay: 0.8
                    }}
                  />
                </svg>
              </div>
              
              <div className="relative z-10">
              {/* Desktop: Horizontal layout with separators */}
              <div className="hidden lg:flex items-center justify-between gap-8 max-w-6xl mx-auto">
                {stats.map((stat, idx) => {
                  const StatIcon = stat.icon
                  const isLast = idx === stats.length - 1
                  const statColor = idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'
                  return (
                    <div key={stat.label} className="flex-1 flex items-center">
                      <FadeIn delay={0.1 * (idx + 1)} className="flex-1">
                        <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 hover:border-gray-300/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden rounded-2xl p-6 md:p-8 text-center">
                          {/* Gradient overlay on hover */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                            style={{ background: `linear-gradient(135deg, ${statColor} 0%, transparent 100%)` }}
                          />
                          
                          {/* Icon */}
                          <div 
                            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10"
                            style={{ 
                              background: `linear-gradient(135deg, ${statColor}20, ${statColor}10)`,
                              border: `2px solid ${statColor}40`
                            }}
                          >
                            <StatIcon className="w-7 h-7 md:w-8 md:h-8" style={{ color: statColor }} />
                          </div>
                          
                          {/* Value */}
                          <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 relative z-10" style={{ color: statColor }}>
                            <NumberTicker 
                              value={stat.value} 
                              delay={0.5 + idx * 0.1}
                              className="inline"
                            />
                            <span className="text-2xl md:text-3xl ml-1">{stat.suffix}</span>
                          </div>
                          
                          {/* Label */}
                          <div className="text-sm md:text-base font-semibold text-gray-900 mb-1 relative z-10">
                            {stat.label}
                          </div>
                          
                          {/* Progress bar at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100/50 rounded-b-2xl overflow-hidden">
                            <div 
                              className="h-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${(idx + 1) * 25}%`,
                                background: `linear-gradient(90deg, ${statColor}, ${statColor}80)`
                              }}
                            />
                          </div>
                        </div>
                      </FadeIn>
                      
                      {/* Separator */}
                      {!isLast && (
                        <div className="mx-4 flex-shrink-0">
                          <div 
                            className="w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-50"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Mobile/Tablet: Grid layout */}
              <div className="lg:hidden grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat, idx) => {
                  const StatIcon = stat.icon
                  const statColor = idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'
                  return (
                    <FadeIn key={stat.label} delay={0.1 * (idx + 1)}>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 hover:border-gray-300/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden rounded-2xl p-4 md:p-6 text-center">
                        {/* Gradient overlay on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                          style={{ background: `linear-gradient(135deg, ${statColor} 0%, transparent 100%)` }}
                        />
                        
                        {/* Icon */}
                        <div 
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                          style={{ 
                            background: `linear-gradient(135deg, ${statColor}20, ${statColor}10)`,
                            border: `2px solid ${statColor}40`
                          }}
                        >
                          <StatIcon className="w-6 h-6 md:w-7 md:h-7" style={{ color: statColor }} />
                        </div>
                        
                        {/* Value */}
                        <div className="text-3xl md:text-4xl font-bold mb-1 relative z-10" style={{ color: statColor }}>
                          <NumberTicker 
                            value={stat.value} 
                            delay={0.5 + idx * 0.1}
                            className="inline"
                          />
                          <span className="text-xl md:text-2xl ml-1">{stat.suffix}</span>
                        </div>
                        
                        {/* Label */}
                        <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1 relative z-10 leading-tight">
                          {stat.label}
                        </div>
                        
                        {/* Progress bar at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100/50 rounded-b-2xl overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${(idx + 1) * 25}%`,
                              background: `linear-gradient(90deg, ${statColor}, ${statColor}80)`
                            }}
                          />
                        </div>
                      </div>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </div>
          </BlurFade>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-12 md:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <BlurFade delay={0.3}>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Coordonnées
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Plusieurs moyens de nous joindre pour échanger sur vos besoins
              </p>
            </div>
          </BlurFade>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left - Contact Info */}
            <BlurFade delay={0.5}>
              <div className="space-y-6 md:space-y-8">
                {/* Contact Cards */}
                <div className="space-y-4 md:space-y-6">
                  {contactInfo.map((info, idx) => {
                    const InfoIcon = info.icon
                    const isClickable = info.link || info.items.some(item => item.link)
                    
                    return (
                      <FadeIn key={info.title} delay={0.1 * (idx + 1)}>
                        <div 
                          className={`group relative overflow-hidden rounded border border-gray-200 hover:border-odillon-teal transition-all duration-300 p-4 md:p-6 ${isClickable ? 'cursor-pointer hover:shadow-lg' : ''}`}
                          onClick={() => {
                            if (info.link) {
                              window.open(info.link, '_blank')
                            }
                          }}
                        >
                          {/* Gradient overlay */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${info.color} 0%, transparent 100%)` }}
                          />
                          
                          <div className="flex items-start gap-4 md:gap-6 relative">
                            <div 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all duration-300"
                              style={{ 
                                background: `linear-gradient(135deg, ${info.color}30, ${info.color}15)`
                              }}
                            >
                              <InfoIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: info.color }} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm md:text-base font-semibold text-gray-900">
                                  {info.title}
                                </h3>
                                {isClickable && (
                                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-odillon-teal transition-colors flex-shrink-0" />
                                )}
                              </div>
                              <div className="space-y-1 md:space-y-2">
                                {info.items.map((item, i) => (
                                  item.link ? (
                                    <a
                                      key={i}
                                      href={item.link}
                                      onClick={(e) => e.stopPropagation()}
                                      className="block text-xs md:text-sm text-gray-600 hover:text-odillon-teal transition-colors font-medium break-all"
                                    >
                                      {item.label}
                                    </a>
                                  ) : (
                                    <div key={i} className="text-xs md:text-sm text-gray-600">
                                      {item.label}
                                    </div>
                                  )
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    )
                  })}
                </div>

                {/* Hours */}
                <FadeIn delay={0.5}>
                  <div className="bg-white p-4 md:p-6 rounded border border-gray-200">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-odillon-teal/10 rounded-sm flex items-center justify-center mb-3 md:mb-4">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-odillon-teal" />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">Horaires d'ouverture</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Lundi - Vendredi<br />
                      8h00 - 17h00
                    </p>
                  </div>
                </FadeIn>
              </div>
            </BlurFade>

            {/* Right - Contact Form */}
            <BlurFade delay={0.6}>
              <Card className="border border-gray-200">
                <CardContent className="p-4 md:p-6">
                  <div className="mb-4 md:mb-6">
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-odillon-teal/10 rounded-sm flex items-center justify-center mb-2 md:mb-3">
                      <Send className="w-5 h-5 md:w-6 md:h-6 text-odillon-teal" />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      Envoyez-nous un message
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600">
                      Remplissez le formulaire et nous vous recontacterons rapidement
                    </p>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    {/* Messages de statut */}
                    {submitStatus.type && (
                      <div
                        className={`p-3 md:p-4 rounded-lg border ${
                          submitStatus.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {submitStatus.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          )}
                          <p className="text-sm font-medium">{submitStatus.message}</p>
                        </div>
                      </div>
                    )}

                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+241 XX XX XX XX"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Entreprise
                        </label>
                        <Input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet *
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder="Objet de votre demande"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="resize-none"
                        placeholder="Décrivez-nous votre projet ou votre besoin..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="default"
                        disabled={isSubmitting}
                        className="w-full bg-odillon-teal hover:bg-odillon-teal/90 text-white group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer le message
                            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
