"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountingNumber } from "@/components/ui/counting-number"
import { Separator } from "@/components/ui/separator"
import { DottedMap } from "@/components/ui/dotted-map"
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee"
import { 
  Building2, 
  Users, 
  Trophy, 
  Globe, 
  Target, 
  Heart, 
  Lightbulb, 
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Star,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    icon: Clock,
    value: 48,
    suffix: "h",
    label: "Temps de réponse moyen",
    description: "Réactivité garantie",
    color: "#1A9B8E"
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Satisfaction client",
    description: "Taux de satisfaction moyen",
    color: "#C4D82E"
  },
  {
    icon: CheckCircle2,
    value: 50,
    suffix: "+",
    label: "Projets réalisés",
    description: "Missions menées à bien",
    color: "#1A9B8E"
  },
  {
    icon: Users,
    value: 10,
    suffix: "+",
    label: "Clients accompagnés",
    description: "Entreprises satisfaites",
    color: "#C4D82E"
  }
]

const timeline = [
  {
    year: "2017",
    title: "Fondation",
    description: "Création d'Odillon avec la vision de transformer le paysage entrepreneurial en Afrique Centrale",
    color: "#1A9B8E",
    icon: Sparkles
  },
  {
    year: "2019",
    title: "Expansion",
    description: "Extension de nos services et développement d'une équipe pluridisciplinaire d'experts",
    color: "#C4D82E",
    icon: TrendingUp
  },
  {
    year: "2022",
    title: "Reconnaissance",
    description: "Obtention de certifications internationales et reconnaissance comme leader régional",
    color: "#1A9B8E",
    icon: Award
  },
  {
    year: "2024",
    title: "Innovation",
    description: "Lancement de nouvelles solutions digitales et renforcement de notre présence régionale",
    color: "#C4D82E",
    icon: Lightbulb
  }
]

const valeurs = [
  {
    icon: Award,
    title: "Excellence",
    value: "Standards élevés",
    description: "Nous visons l'excellence dans chaque mission avec une approche rigoureuse et des méthodologies éprouvées.",
    gradient: "from-[#1A9B8E]/20 to-[#1A9B8E]/5"
  },
  {
    icon: Shield,
    title: "Intégrité",
    value: "Éthique totale",
    description: "Transparence absolue, principes éthiques stricts et confidentialité garantie dans tous nos engagements.",
    gradient: "from-[#C4D82E]/20 to-[#C4D82E]/5"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    value: "Approches créatives",
    description: "Combinaison des meilleures pratiques internationales avec adaptation au contexte local unique.",
    gradient: "from-[#1A9B8E]/20 to-[#1A9B8E]/5"
  },
  {
    icon: Heart,
    title: "Partenariat",
    value: "Collaboration étroite",
    description: "Relations durables basées sur la confiance mutuelle et le transfert effectif de compétences.",
    gradient: "from-[#C4D82E]/20 to-[#C4D82E]/5"
  }
]

const approche = [
  {
    number: "01",
    title: "Écoute Active",
    description: "Compréhension approfondie de vos enjeux, contraintes et objectifs avant toute intervention",
    icon: Target
  },
  {
    number: "02",
    title: "Solutions Sur-Mesure",
    description: "Conception de stratégies personnalisées adaptées à votre contexte organisationnel unique",
    icon: Lightbulb
  },
  {
    number: "03",
    title: "Collaboration",
    description: "Travail main dans la main avec vos équipes pour garantir appropriation et pérennité",
    icon: Users
  },
  {
    number: "04",
    title: "Résultats Mesurables",
    description: "Engagement sur des livrables concrets avec indicateurs de performance clairs et transparents",
    icon: CheckCircle
  }
]

export function AboutDetailed() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-white/80 via-gray-50/60 to-white/80">
      {/* Particles Background - Different from Aurora */}
      <ParticlesBackground 
        className="absolute inset-0" 
        quantity={40} 
        color="rgba(26, 155, 142, 0.2)"
        staticity={50}
        ease={50}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section avec Dotted Map */}
        <div className="relative mb-20">
          {/* Dotted Map Background - Gabon */}
          <div className="absolute inset-0 -inset-x-[50vw] left-1/2 -translate-x-1/2 w-screen opacity-40 pointer-events-none -z-10">
            <DottedMap
              width={2000}
              height={1500}
              mapSamples={25000}
              markers={[
                {
                  lat: 0.8037,
                  lng: 11.6094,
                  size: 12,
                },
              ]}
              markerColor="#C4D82E"
              dotColor="#1A9B8E"
              dotRadius={0.8}
              className="w-full h-full"
            />
          </div>

          {/* Header with AnimatedGradient */}
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 relative z-10 px-4">
          <BlurFade delay={0.1}>
            <Badge className="mb-4 md:mb-6 bg-[#1A9B8E]/10 border border-[#1A9B8E]/20 text-[#1A9B8E] hover:bg-[#1A9B8E]/15 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 font-medium">
              À Propos de Nous
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Votre partenaire de confiance en{" "}
              <span className="bg-gradient-to-r from-[#1A9B8E] to-[#C4D82E] bg-clip-text text-transparent animate-gradient-x">
                ingénierie d'entreprises
              </span>
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Découvrez qui nous sommes, nos valeurs et notre engagement envers l'excellence
              et la réussite de nos clients.
            </p>
          </BlurFade>
          </div>
        </div>

        {/* Stats with Modern Horizontal Layout */}
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
                return (
                  <div key={stat.label} className="flex-1 flex items-center">
                    <FadeIn delay={0.1 * (idx + 1)} className="flex-1">
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 hover:border-gray-300/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden rounded-2xl p-6 md:p-8 text-center">
                        {/* Gradient overlay on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                          style={{ background: `linear-gradient(135deg, ${stat.color} 0%, transparent 100%)` }}
                        />
                        
                        {/* Icon */}
                        <div 
                          className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10"
                          style={{ 
                            background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                            border: `2px solid ${stat.color}40`
                          }}
                        >
                          <StatIcon className="w-7 h-7 md:w-8 md:h-8" style={{ color: stat.color }} />
                        </div>
                        
                        {/* Value */}
                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 relative z-10" style={{ color: stat.color }}>
                          <CountingNumber value={stat.value} />
                          <span className="text-2xl md:text-3xl ml-1">{stat.suffix}</span>
                        </div>
                        
                        {/* Label */}
                        <div className="text-sm md:text-base font-semibold text-gray-900 mb-1 relative z-10">
                          {stat.label}
                        </div>
                        
                        {/* Description */}
                        <div className="text-xs md:text-sm text-gray-600 relative z-10">
                          {stat.description}
                        </div>
                        
                        {/* Progress bar at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100/50 rounded-b-2xl overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${(idx + 1) * 25}%`,
                              background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`
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
                return (
                  <FadeIn key={stat.label} delay={0.1 * (idx + 1)}>
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 hover:border-gray-300/80 hover:shadow-xl transition-all duration-300 group relative overflow-hidden rounded-2xl p-4 md:p-6 text-center">
                      {/* Gradient overlay on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                        style={{ background: `linear-gradient(135deg, ${stat.color} 0%, transparent 100%)` }}
                      />
                      
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                        style={{ 
                          background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                          border: `2px solid ${stat.color}40`
                        }}
                      >
                        <StatIcon className="w-6 h-6 md:w-7 md:h-7" style={{ color: stat.color }} />
                      </div>
                      
                      {/* Value */}
                      <div className="text-3xl md:text-4xl font-bold mb-1 relative z-10" style={{ color: stat.color }}>
                        <CountingNumber value={stat.value} />
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
                            background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`
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

        {/* Timeline Verticale Interactive */}
        <BlurFade delay={0.5}>
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="text-center mb-8 md:mb-12 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Notre Parcours</h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Une évolution constante au service de l'excellence et de l'innovation
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((event, idx) => {
                const EventIcon = event.icon
                const isLeft = idx % 2 === 0
                
                return (
                  <FadeIn key={event.year} delay={0.1 * (idx + 1)}>
                    <div className="relative">
                      {/* Timeline Line */}
                      {idx < timeline.length - 1 && (
                        <div 
                          className="absolute left-1/2 top-16 md:top-20 -translate-x-1/2 w-1 h-full hidden md:block"
                          style={{ 
                            background: `linear-gradient(to bottom, ${event.color}, transparent)`,
                            opacity: 0.3
                          }}
                        />
                      )}

                      <div className={`flex items-center gap-4 md:gap-8 mb-8 md:mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Content Card */}
                        <div className="flex-1">
                          <Card className="border-2 hover:shadow-xl transition-all duration-300 group" style={{ borderColor: `${event.color}30` }}>
                            <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                              <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <div 
                                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                  style={{ backgroundColor: `${event.color}20`, color: event.color }}
                                >
                                  <EventIcon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs md:text-sm font-semibold text-gray-500">{event.year}</div>
                                  <CardTitle className="text-base md:text-xl">{event.title}</CardTitle>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{event.description}</p>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Central Icon */}
                        <div className="hidden md:block flex-shrink-0">
                          <div 
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative z-10 bg-white shadow-lg border-4"
                            style={{ borderColor: event.color }}
                          >
                            <div className="text-lg md:text-xl font-bold" style={{ color: event.color }}>
                              {event.year.slice(2)}
                            </div>
                          </div>
                        </div>

                        {/* Spacer for alternating layout */}
                        <div className="flex-1 hidden md:block" />
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </BlurFade>

        <Separator className="my-20" />

        {/* Valeurs - Different Layout */}
        <BlurFade delay={0.6}>
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="text-center mb-8 md:mb-12 px-4">
              <Badge className="mb-3 md:mb-4 bg-[#1A9B8E]/10 border border-[#1A9B8E]/20 text-[#1A9B8E] hover:bg-[#1A9B8E]/15 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 font-medium">
                Nos Valeurs Fondamentales
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Ce qui nous définit
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Des principes qui guident chaque action et façonnent notre engagement envers l'excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {valeurs.map((valeur, idx) => {
                const ValeurIcon = valeur.icon
                const color = idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'
                const bgGradient = `linear-gradient(135deg, ${color}20, ${color}10)`
                return (
                  <FadeIn key={valeur.title} delay={0.1 * (idx + 1)}>
                    <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden h-full">
                      {/* Animated gradient background on hover */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${valeur.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      
                      <CardContent className="p-5 md:p-8 relative">
                        <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                          <div 
                            className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                            style={{ 
                              background: bgGradient
                            }}
                          >
                            <ValeurIcon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#1A9B8E] transition-colors">
                              {valeur.title}
                            </h3>
                            <div className="text-xs md:text-sm font-semibold mb-2 md:mb-3" style={{ color }}>
                              {valeur.value}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {valeur.description}
                        </p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </BlurFade>

        {/* Notre Approche - Horizontal Flow */}
        <BlurFade delay={0.7}>
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="text-center mb-8 md:mb-12 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Notre Approche</h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Une méthodologie en 4 étapes pour garantir des résultats concrets et durables
              </p>
            </div>

            {/* Horizontal Flow with Arrows */}
            <div className="hidden lg:flex items-start justify-between gap-4 mb-12 relative">
              {/* Connection Line Background */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200 opacity-30 -translate-y-1/2" />
              
              {/* Animated Progress Line */}
              <div 
                className="absolute top-12 left-0 h-0.5 bg-gradient-to-r from-[#1A9B8E] via-[#C4D82E] to-[#1A9B8E] -translate-y-1/2"
                style={{ 
                  width: '0%',
                  animation: 'progressLine 5s ease-in-out 0.5s infinite'
                }}
              />
              
              {/* Animated Progress Indicator */}
              <div 
                className="absolute top-12 h-2 w-2 rounded-full bg-gradient-to-r from-[#1A9B8E] to-[#C4D82E] -translate-y-1/2 -translate-x-1/2 shadow-lg"
                style={{ 
                  left: '0%',
                  animation: 'progressIndicator 5s ease-in-out 0.5s infinite'
                }}
              />
              
              {approche.map((etape, idx) => {
                const EtapeIcon = etape.icon
                return (
                  <FadeIn key={etape.number} delay={0.1 * (idx + 1)}>
                    <div className="flex-1 relative flex flex-col items-center">
                      <div className="text-center w-full">
                        <div 
                          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10 bg-white shadow-lg border-4 hover:scale-110 transition-transform duration-300"
                          style={{ borderColor: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }}
                        >
                          <EtapeIcon className="w-10 h-10" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }} />
                        </div>
                        <div className="text-sm font-bold text-gray-400 mb-2">{etape.number}</div>
                        <h3 className="text-lg font-bold text-gray-900">{etape.title}</h3>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>

            {/* Descriptions Below */}
            <Marquee className="py-4">
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent speed={40} pauseOnHover={true}>
                {approche.map((etape, idx) => (
                  <MarqueeItem key={`desc-${etape.number}`} className="w-80">
                    <Card className="border border-gray-200 hover:border-gray-300 transition-all h-full">
                      <CardContent className="p-6">
                        <div className="lg:hidden text-4xl font-bold mb-2 opacity-10" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }}>
                          {etape.number}
                        </div>
                        <h3 className="lg:hidden text-lg font-bold text-gray-900 mb-2">{etape.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{etape.description}</p>
                      </CardContent>
                    </Card>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </BlurFade>

        {/* Mission Statement - Centered Hero */}
        <BlurFade delay={0.8}>
          <Card className="border-2 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden mb-12 md:mb-16 lg:mb-20" style={{ borderColor: '#1A9B8E30' }}>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1A9B8E]/10 to-transparent" />
            <CardContent className="p-6 md:p-10 lg:p-12 text-center relative">
              <Target className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-[#1A9B8E]" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Notre Mission</h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8">
                Accompagner les entreprises dans leur transformation et leur croissance en apportant 
                des solutions innovantes, personnalisées et adaptées aux réalités locales tout en 
                maintenant les plus hauts standards d'éthique professionnelle.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm">
                {['Innovation', 'Excellence', 'Résultats', 'Partenariat'].map((mot, i) => {
                  const badgeColor = i % 2 === 0 ? '#1A9B8E' : '#C4D82E'
                  return (
                    <Badge 
                      key={mot}
                      className="px-3 md:px-4 py-1.5 md:py-2"
                      style={{ 
                        backgroundColor: `${badgeColor}15`,
                        color: badgeColor,
                        border: `1px solid ${badgeColor}30`
                      }}
                    >
                      {mot}
                    </Badge>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* CTA Final */}
        <BlurFade delay={0.9}>
          <Card className="border-2 border-gray-300 bg-gradient-to-r from-gray-50 via-white to-gray-50">
            <CardContent className="p-6 md:p-10 lg:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Rencontrons-nous pour discuter de vos enjeux et découvrir comment nous pouvons 
                vous accompagner vers l'excellence
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
                <Link 
                  href="/contact"
                  className="relative inline-flex items-center justify-center gap-2 h-10 md:h-12 px-6 md:px-8 rounded-md text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group w-full sm:w-auto"
                  style={{ 
                    backgroundColor: '#1A9B8E',
                    color: '#ffffff'
                  }}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300"></span>
                  <span className="relative" style={{ color: '#ffffff' }}>Contactez-nous</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative" style={{ color: '#ffffff' }} />
                </Link>
                <Link 
                  href="/services"
                  className="relative inline-flex items-center justify-center gap-2 h-10 md:h-12 px-6 md:px-8 rounded-md text-sm md:text-base font-medium border-2 transition-all duration-300 overflow-hidden group w-full sm:w-auto"
                  style={{ 
                    borderColor: '#1A9B8E',
                    color: '#1A9B8E'
                  }}
                >
                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: '#1A9B8E' }}
                  ></span>
                  <span className="relative" style={{ color: '#1A9B8E' }}>Nos services</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative" style={{ color: '#1A9B8E' }} />
                </Link>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </section>
  )
}
