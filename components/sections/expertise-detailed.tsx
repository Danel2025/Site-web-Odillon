"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { TextShimmer } from "@/components/ui/text-shimmer"
import { CountingNumber } from "@/components/ui/counting-number"
import { Globe } from "@/components/ui/globe"
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee"
import { VideosSection } from "@/components/sections/videos-section"
import type { VideoItem } from "@/components/sections/videos-section"
import { 
  Target, 
  Briefcase,
  Globe2,
  TrendingUp,
  CheckCircle,
  Award,
  Lightbulb,
  Users2,
  BarChart3,
  FileText,
  Zap,
  ArrowRight,
  Building2,
  ShieldCheck,
  Rocket,
  Clock,
  TrendingDown,
  Star,
  CheckCircle2,
  Users
} from "lucide-react"
import Link from "next/link"

const expertiseDomains = [
  {
    id: "structuration",
    icon: Target,
    title: "Structuration & Restructuration",
    color: "#1A9B8E",
    shortDesc: "Optimisez votre organisation",
    description: "Transformez votre structure organisationnelle en un modèle d'efficacité aligné sur vos objectifs stratégiques.",
    stats: { value: 35, suffix: "%", label: "d'efficacité en plus" },
    highlights: [
      "Diagnostic organisationnel complet",
      "Redesign de la structure",
      "Optimisation des processus",
      "Accompagnement au changement"
    ],
    details: {
      challenge: "Les organisations inefficaces perdent jusqu'à 30% de leur potentiel de performance à cause de structures inadaptées, de processus redondants et de silos organisationnels.",
      solution: "Nous analysons votre organisation actuelle, identifions les leviers d'amélioration et concevons une structure optimale qui libère le potentiel de vos équipes.",
      results: [
        { metric: "30-40%", description: "d'amélioration de l'efficacité opérationnelle" },
        { metric: "3-6 mois", description: "pour une restructuration complète" },
        { metric: "85%", description: "de taux d'adhésion des équipes" }
      ]
    }
  },
  {
    id: "gestion",
    icon: Briefcase,
    title: "Gestion Administrative, Juridique & Financière",
    color: "#C4D82E",
    shortDesc: "Externalisez pour mieux performer",
    description: "Service intégré couvrant tous vos besoins administratifs, juridiques et financiers avec efficacité et conformité totale.",
    stats: { value: 25, suffix: "%", label: "de réduction des coûts" },
    highlights: [
      "Systèmes de gestion intégrés",
      "Conformité réglementaire",
      "Automatisation administrative",
      "Pilotage financier complet"
    ],
    details: {
      challenge: "La gestion administrative, juridique et financière mobilise des ressources importantes et détourne les dirigeants de leur cœur de métier.",
      solution: "Notre service externalisé prend en charge l'ensemble de votre gestion avec des processus digitalisés, une conformité garantie et une expertise pointue.",
      results: [
        { metric: "25%", description: "de réduction des coûts administratifs" },
        { metric: "40%", description: "de gain de temps sur les tâches admin" },
        { metric: "100%", description: "de conformité réglementaire" }
      ]
    }
  },
  {
    id: "relations-publiques",
    icon: Globe2,
    title: "Relations Publiques",
    color: "#1A9B8E",
    shortDesc: "Construisez votre influence",
    description: "Développement stratégique de votre réputation et relations avec les parties prenantes clés pour maximiser votre impact.",
    stats: { value: 60, suffix: "%", label: "de visibilité en plus" },
    highlights: [
      "Communication institutionnelle",
      "Relations médias",
      "Gestion de crise",
      "Lobbying et influence"
    ],
    details: {
      challenge: "Une image de marque faible ou une mauvaise gestion de crise peut coûter des millions et détruire la confiance des parties prenantes.",
      solution: "Nous développons votre stratégie de communication, gérons vos relations publiques et protégeons votre réputation avec professionnalisme.",
      results: [
        { metric: "60%", description: "d'amélioration de la visibilité médiatique" },
        { metric: "90%", description: "de perception positive de la marque" },
        { metric: "48h", description: "de délai de réponse en cas de crise" }
      ]
    }
  },
  {
    id: "risques",
    icon: TrendingUp,
    title: "Management des Risques",
    color: "#C4D82E",
    shortDesc: "Maîtrisez tous vos risques",
    description: "Approche systématique pour identifier, évaluer et gérer l'ensemble de vos risques organisationnels avec méthode.",
    stats: { value: 50, suffix: "%", label: "d'incidents en moins" },
    highlights: [
      "Cartographie des risques",
      "Contrôle interne robuste",
      "Plans de continuité (PCA/PRA)",
      "Audit et surveillance"
    ],
    details: {
      challenge: "Les risques non maîtrisés peuvent entraîner des pertes financières massives, des arrêts d'activité et des dommages réputationnels irréversibles.",
      solution: "Nous identifions tous vos risques, les évaluons et mettons en place des systèmes de prévention et de gestion pour assurer la continuité de votre activité.",
      results: [
        { metric: "50%", description: "de réduction des incidents majeurs" },
        { metric: "99%", description: "de disponibilité des systèmes critiques" },
        { metric: "24h", description: "de délai de reprise d'activité maximum" }
      ]
    }
  }
]

const methodology = {
  title: "Notre Méthodologie",
  subtitle: "Une approche éprouvée en 4 phases",
  steps: [
    {
      number: "01",
      title: "Diagnostic & Analyse",
      description: "Compréhension approfondie de votre contexte, enjeux et objectifs",
      icon: BarChart3,
      deliverables: ["Audit complet", "Cartographie", "Rapport de diagnostic"]
    },
    {
      number: "02",
      title: "Conception & Stratégie",
      description: "Élaboration de solutions sur mesure adaptées à vos besoins spécifiques",
      icon: Lightbulb,
      deliverables: ["Plan stratégique", "Roadmap", "Quick wins"]
    },
    {
      number: "03",
      title: "Déploiement & Formation",
      description: "Mise en œuvre des solutions avec accompagnement terrain de vos équipes",
      icon: Rocket,
      deliverables: ["Implémentation", "Formation", "Documentation"]
    },
    {
      number: "04",
      title: "Suivi & Optimisation",
      description: "Monitoring des résultats et ajustements pour garantir le succès",
      icon: TrendingUp,
      deliverables: ["KPIs", "Reporting", "Amélioration continue"]
    }
  ]
}

const coreValues = [
  {
    icon: Award,
    title: "Excellence",
    value: "Standards élevés",
    description: "Engagement envers l'excellence dans chaque mission avec rigueur, méthodologie et professionnalisme constant."
  },
  {
    icon: CheckCircle,
    title: "Intégrité",
    value: "Éthique totale",
    description: "Principes éthiques stricts, transparence absolue dans nos recommandations et confidentialité garantie."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    value: "Approches créatives",
    description: "Solutions innovantes combinant meilleures pratiques internationales et adaptation au contexte local."
  },
  {
    icon: Users2,
    title: "Partenariat",
    value: "Collaboration étroite",
    description: "Relation de partenariat durable avec transfert de compétences effectif et accompagnement sur le long terme."
  }
]

export function ExpertiseDetailed() {
  const [presentationVideos, setPresentationVideos] = useState<VideoItem[]>([])
  const [testimonialVideos, setTestimonialVideos] = useState<VideoItem[]>([])

  // Charger les vidéos depuis Supabase
  useEffect(() => {
    const loadVideos = async () => {
      try {
        // Charger les vidéos de présentation
        const presentationRes = await fetch('/api/videos?category=presentation&active=true')
        if (presentationRes.ok) {
          const presentationData = await presentationRes.json()
          setPresentationVideos(
            (presentationData.videos || []).map((v: any) => {
              // Détecter automatiquement le type si l'URL ne correspond pas au type enregistré
              let videoType = v.type as 'youtube' | 'vimeo' | 'direct'
              if (v.url.includes("youtube.com") || v.url.includes("youtu.be")) {
                videoType = "youtube"
              } else if (v.url.includes("vimeo.com")) {
                videoType = "vimeo"
              }
              
              return {
                id: v.id,
                title: v.title,
                description: v.description || undefined,
                url: v.url,
                type: videoType,
                thumbnail: v.thumbnail || undefined
              }
            })
          )
        }

        // Charger les vidéos de témoignages
        const testimonialRes = await fetch('/api/videos?category=testimonial&active=true')
        if (testimonialRes.ok) {
          const testimonialData = await testimonialRes.json()
          setTestimonialVideos(
            (testimonialData.videos || []).map((v: any) => {
              // Détecter automatiquement le type si l'URL ne correspond pas au type enregistré
              let videoType = v.type as 'youtube' | 'vimeo' | 'direct'
              if (v.url.includes("youtube.com") || v.url.includes("youtu.be")) {
                videoType = "youtube"
              } else if (v.url.includes("vimeo.com")) {
                videoType = "vimeo"
              }
              
              return {
                id: v.id,
                title: v.title,
                description: v.description || undefined,
                url: v.url,
                type: videoType,
                thumbnail: v.thumbnail || undefined
              }
            })
          )
        }
      } catch (error) {
        console.error("Erreur lors du chargement des vidéos:", error)
      }
    }

    loadVideos()
  }, [])
  // Configuration du Globe avec les couleurs Odillon
  const globeConfig = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1] as [number, number, number],
    markerColor: [26 / 255, 155 / 255, 142 / 255] as [number, number, number], // Couleur Odillon #1A9B8E
    glowColor: [196 / 255, 216 / 255, 46 / 255] as [number, number, number], // Couleur Odillon #C4D82E
    markers: [
      { location: [0.3807, 9.4547] as [number, number], size: 0.1 }, // Libreville, Gabon (siège)
      { location: [48.8566, 2.3522] as [number, number], size: 0.08 }, // Paris
      { location: [51.5074, -0.1278] as [number, number], size: 0.07 }, // London
      { location: [40.7128, -74.006] as [number, number], size: 0.08 }, // New York
      { location: [-23.5505, -46.6333] as [number, number], size: 0.07 }, // São Paulo
      { location: [30.0444, 31.2357] as [number, number], size: 0.06 }, // Cairo
      { location: [35.6762, 139.6503] as [number, number], size: 0.07 }, // Tokyo
      { location: [1.3521, 103.8198] as [number, number], size: 0.06 }, // Singapore
    ],
  }

  return (
    <div className="relative py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header avec Globe */}
        <div className="relative text-center max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20">
          {/* Globe en arrière-plan - bien visible, réduit sur mobile */}
          <div className="absolute -top-20 md:-top-32 left-1/2 -translate-x-1/2 pointer-events-none w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[700px] md:h-[700px] z-0">
            <Globe config={globeConfig} className="opacity-30 md:opacity-40" />
          </div>
          
          {/* Contenu par-dessus le Globe */}
          <div className="relative z-10 pt-6 md:pt-8 pb-6 md:pb-8 px-4">
            <BlurFade delay={0.1}>
              <Badge className="mb-4 md:mb-6 bg-[#1A9B8E]/10 border border-[#1A9B8E]/20 text-[#1A9B8E] hover:bg-[#1A9B8E]/15 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 font-medium">
                Domaines d'Expertise
              </Badge>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Expertise reconnue pour{" "}
                <TextShimmer className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  transformer votre organisation
                </TextShimmer>
              </h1>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                Depuis notre création, nous accompagnons les entreprises dans leur transformation 
                avec des solutions sur mesure, une méthodologie éprouvée et des résultats mesurables.
              </p>
            </BlurFade>

            {/* Stats Row */}
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
                  {[
                    { icon: Building2, value: 15, suffix: "+", label: "Années d'expérience", description: "Plus de 15 ans d'expertise", color: "#1A9B8E" },
                    { icon: CheckCircle2, value: 200, suffix: "+", label: "Projets réalisés", description: "Missions menées à bien", color: "#C4D82E" },
                    { icon: Star, value: 95, suffix: "%", label: "Satisfaction client", description: "Taux de satisfaction moyen", color: "#1A9B8E" },
                    { icon: Target, value: 4, suffix: "", label: "Domaines d'expertise", description: "Spécialisations clés", color: "#C4D82E" }
                  ].map((stat, idx) => {
                    const StatIcon = stat.icon
                    const isLast = idx === 3
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
                  {[
                    { icon: Building2, value: 15, suffix: "+", label: "Années d'expérience", description: "Plus de 15 ans d'expertise", color: "#1A9B8E" },
                    { icon: CheckCircle2, value: 200, suffix: "+", label: "Projets réalisés", description: "Missions menées à bien", color: "#C4D82E" },
                    { icon: Star, value: 95, suffix: "%", label: "Satisfaction client", description: "Taux de satisfaction moyen", color: "#1A9B8E" },
                    { icon: Target, value: 4, suffix: "", label: "Domaines d'expertise", description: "Spécialisations clés", color: "#C4D82E" }
                  ].map((stat, idx) => {
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
          </div>
        </div>

        {/* Section Vidéos de Présentation */}
        <VideosSection
          title="Nos Vidéos de Présentation"
          badge="Vidéos"
          videos={presentationVideos}
        />

        {/* Expertise Domains - Bento Grid Layout */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <BlurFade delay={0.5}>
            <div className="text-center mb-8 md:mb-12 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Nos Domaines d'Expertise</h2>
              <p className="text-sm md:text-base text-gray-600">Passez votre souris sur chaque domaine pour en savoir plus</p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {expertiseDomains.map((domain, idx) => {
              const DomainIcon = domain.icon
              return (
                <BlurFade key={domain.id} delay={0.1 * (idx + 1)}>
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Card 
                        className="border-2 hover:border-gray-400 transition-all duration-500 cursor-pointer group h-full"
                        style={{ borderColor: `${domain.color}30` }}
                      >
                        <CardHeader className="px-4 md:px-6 py-4 md:py-6">
                          <div className="flex items-start justify-between mb-2 md:mb-3">
                            <div 
                              className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
                            >
                              <DomainIcon className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <Badge 
                              className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1"
                              style={{ backgroundColor: `${domain.color}15`, color: domain.color, border: `1px solid ${domain.color}30` }}
                            >
                              Expertise clé
                            </Badge>
                          </div>
                          <CardTitle className="text-lg md:text-2xl mb-1 md:mb-2 group-hover:text-[#1A9B8E] transition-colors">
                            {domain.title}
                          </CardTitle>
                          <CardDescription className="text-xs md:text-sm font-medium" style={{ color: domain.color }}>
                            {domain.shortDesc}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6 pb-4 md:pb-6">
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                            {domain.description}
                          </p>

                          {/* Stats Badge */}
                          <div 
                            className="inline-flex items-baseline gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg"
                            style={{ backgroundColor: `${domain.color}10` }}
                          >
                            <span className="text-2xl md:text-3xl font-bold" style={{ color: domain.color }}>
                              {domain.stats.value}{domain.stats.suffix}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-600">{domain.stats.label}</span>
                          </div>

                          {/* Highlights */}
                          <div className="grid grid-cols-2 gap-1.5 md:gap-2 pt-2">
                            {domain.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-start gap-1.5 md:gap-2">
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" style={{ color: domain.color }} />
                                <span className="text-[10px] md:text-xs text-gray-700 leading-tight">{highlight}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium pt-2" style={{ color: domain.color }}>
                            <span className="hidden sm:inline">Survolez pour en savoir plus</span>
                            <span className="sm:hidden">Touchez pour plus</span>
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    
                    <HoverCardContent className="w-[500px] p-6" align="center">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <DomainIcon className="w-5 h-5" style={{ color: domain.color }} />
                            <h4 className="font-bold text-lg">{domain.title}</h4>
                          </div>
                          <Separator className="mb-4" />
                        </div>

                        <div>
                          <div className="flex items-start gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">Défi</Badge>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {domain.details.challenge}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-start gap-2 mb-2">
                            <Badge className="text-xs" style={{ backgroundColor: `${domain.color}20`, color: domain.color }}>
                              Notre Solution
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {domain.details.solution}
                          </p>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-3">Résultats Mesurables</div>
                          <div className="grid gap-2">
                            {domain.details.results.map((result, i) => (
                              <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 border-l-2" style={{ borderColor: domain.color }}>
                                <div className="font-bold text-lg" style={{ color: domain.color }}>{result.metric}</div>
                                <div className="text-xs text-gray-700">{result.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Link 
                          href="/contact"
                          className="relative inline-flex items-center justify-center gap-2 w-full h-10 px-6 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group mt-4"
                          style={{ 
                            backgroundColor: domain.color,
                            color: '#ffffff'
                          }}
                        >
                          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300"></span>
                          <span className="relative" style={{ color: '#ffffff' }}>Discutons de votre projet</span>
                          <ArrowRight className="w-4 h-4 relative" style={{ color: '#ffffff' }} />
                        </Link>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </BlurFade>
              )
            })}
          </div>
        </div>

        {/* Methodology Section - Horizontal Timeline */}
        <BlurFade delay={0.6}>
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="text-center mb-8 md:mb-12 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{methodology.title}</h2>
              <p className="text-sm md:text-base text-gray-600">{methodology.subtitle}</p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#1A9B8E] via-[#C4D82E] to-[#1A9B8E] opacity-20" />

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {methodology.steps.map((step, idx) => {
                  const StepIcon = step.icon
                  return (
                    <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                      <div className="relative">
                        {/* Step Number Circle */}
                        <div className="flex justify-center mb-3 md:mb-4">
                          <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-3 md:border-4 flex items-center justify-center shadow-lg relative z-10"
                              style={{ borderColor: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }}
                            >
                              <div className="text-center">
                                <StepIcon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-0.5 md:mb-1" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }} />
                                <div className="text-[10px] md:text-xs font-bold text-gray-500">{step.number}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="text-center px-2">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2">{step.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 leading-relaxed">{step.description}</p>
                          
                          {/* Deliverables */}
                          <div className="space-y-0.5 md:space-y-1">
                            {step.deliverables.map((deliverable, i) => (
                              <div key={i} className="text-[10px] md:text-xs text-gray-500 flex items-center justify-center gap-1">
                                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }} />
                                <span className="line-clamp-1">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Section Vidéos de Témoignages */}
        <VideosSection
          title="Témoignages Clients"
          badge="Témoignages"
          videos={testimonialVideos}
        />

        <Separator className="my-20" />

        {/* Core Values - Cards Layout */}
        <BlurFade delay={0.7}>
          <div className="mb-12 md:mb-16 lg:mb-20">
            <div className="text-center mb-8 md:mb-12 px-4">
              <Badge className="mb-3 md:mb-4 bg-[#1A9B8E]/10 border border-[#1A9B8E]/20 text-[#1A9B8E] hover:bg-[#1A9B8E]/15 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 font-medium">
                Nos Valeurs
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Les principes qui nous guident
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Des valeurs fondamentales qui inspirent notre action quotidienne et façonnent notre engagement envers l'excellence.
              </p>
            </div>

            <Marquee className="py-4">
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent speed={40} pauseOnHover={true}>
                {coreValues.map((value, idx) => {
                  const ValueIcon = value.icon
                  return (
                    <MarqueeItem key={idx} className="w-80">
                      <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-xl group relative overflow-hidden h-full">
                        {/* Gradient overlay on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                          style={{ 
                            background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'} 0%, transparent 100%)` 
                          }}
                        />
                        
                        <CardContent className="p-6 text-center relative">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md"
                            style={{ 
                              background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}15, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}05)`,
                              border: `2px solid ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}30`
                            }}
                          >
                            <ValueIcon className="w-8 h-8" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                          <div className="text-sm font-semibold mb-3" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }}>
                            {value.value}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                        </CardContent>
                      </Card>
                    </MarqueeItem>
                  )
                })}
              </MarqueeContent>
            </Marquee>
          </div>
        </BlurFade>

        {/* CTA Final */}
        <BlurFade delay={0.8}>
          <Card className="border-2 border-gray-300 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1A9B8E]/10 to-transparent pointer-events-none" />
            <CardContent className="p-6 md:p-10 lg:p-12 text-center relative">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
                  Prêt à faire passer votre organisation au niveau supérieur ?
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed px-4">
                  Rencontrons-nous pour discuter de vos enjeux et découvrir comment notre expertise 
                  peut accélérer votre transformation et maximiser votre performance.
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
                    <span className="relative" style={{ color: '#ffffff' }}>Contactez nos experts</span>
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
                    <span className="relative" style={{ color: '#1A9B8E' }}>Découvrir nos services</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative" style={{ color: '#1A9B8E' }} />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  )
}
