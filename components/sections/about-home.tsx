"use client"

import { useState, useEffect } from "react"
import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Award,
  Shield,
  Lightbulb,
  Heart,
  ArrowRight,
  Rocket,
  TrendingUp,
  Trophy,
  Zap,
  BarChart3,
  Users,
  Target,
  Send
} from "lucide-react"
import Link from "next/link"
import { m } from "framer-motion"

const coreValues = [
  {
    icon: Award,
    title: "Excellence",
    description: "Standards élevés dans chaque mission",
    color: "#39837a",
    gradient: "from-odillon-teal/10 to-odillon-teal/5"
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Transparence et éthique totale",
    color: "#C4D82E",
    gradient: "from-odillon-lime/10 to-odillon-lime/5"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Solutions créatives et adaptées",
    color: "#39837a",
    gradient: "from-odillon-teal/10 to-odillon-teal/5"
  },
  {
    icon: Heart,
    title: "Partenariat",
    description: "Collaboration étroite et durable",
    color: "#C4D82E",
    gradient: "from-odillon-lime/10 to-odillon-lime/5"
  }
]

const journey = [
  { 
    year: "2017", 
    title: "Fondation", 
    icon: Rocket, 
    color: "#39837a",
    description: "Création d'Odillon avec une vision claire"
  },
  { 
    year: "2019", 
    title: "Expansion", 
    icon: TrendingUp, 
    color: "#C4D82E",
    description: "Extension de nos services et équipe"
  },
  { 
    year: "2022", 
    title: "Reconnaissance", 
    icon: Trophy, 
    color: "#39837a",
    description: "Certifications et leadership régional"
  },
  { 
    year: "2024", 
    title: "Innovation", 
    icon: Zap, 
    color: "#C4D82E",
    description: "Solutions digitales et présence renforcée"
  }
]

export function AboutHome() {
  const [expertiseImageUrl, setExpertiseImageUrl] = useState<string | null>(null)

  // Récupérer l'URL de l'image d'expertise depuis les paramètres
  useEffect(() => {
    const fetchExpertiseImage = async () => {
      try {
        const res = await fetch('/api/settings', {
          cache: 'default',
          next: { revalidate: 60 }
        })
        if (res.ok) {
          const data = await res.json()
          setExpertiseImageUrl(data.settings?.expertise_image_url || null)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'image Expertise:', error)
      }
    }
    fetchExpertiseImage()
  }, [])

  return (
    <section id="apropos" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgb(26,155,142)_1px,transparent_0)] [background-size:32px_32px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section - Redesigned */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <BlurFade delay={0.1}>
            <Badge className="mb-6 bg-gradient-to-r from-odillon-teal to-odillon-teal/80 text-white border-0 text-sm px-5 py-2 shadow-lg shadow-odillon-teal/20">
              Notre Histoire
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-odillon-dark mb-6 leading-[1.1]">
              Votre partenaire{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-odillon-teal via-odillon-teal to-odillon-lime bg-clip-text text-transparent">
                  de confiance
                </span>
                <m.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-odillon-teal/20 to-odillon-lime/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Depuis 2017, nous accompagnons les entreprises dans leur transformation avec excellence et intégrité
            </p>
          </BlurFade>
        </div>

        {/* Journey Timeline - Redesigned with connected line */}
        <BlurFade delay={0.4}>
          <div className="mb-20 md:mb-28">
            <div className="text-center mb-12 md:mb-16">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-odillon-dark mb-3">
                Notre Évolution
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-odillon-teal to-odillon-lime mx-auto rounded-full" />
            </div>
            
            {/* Timeline Container */}
            <div className="relative">
              {/* Connecting Line - Desktop only */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-odillon-teal via-odillon-lime to-odillon-teal transform -translate-y-1/2" />
              
              {/* Timeline Items */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
                {journey.map((step, idx) => {
                  const StepIcon = step.icon
                  const isEven = idx % 2 === 0
                  
                  return (
                    <FadeIn key={step.year} delay={0.1 * (idx + 1)}>
                      <m.div
                        className="relative group"
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Timeline Dot - Desktop */}
                        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <m.div
                            className="w-4 h-4 rounded-full border-4 border-white shadow-lg"
                            style={{ backgroundColor: step.color }}
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                        
                        {/* Card */}
                        <Card className="border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-opacity-100 transition-all duration-500 hover:shadow-2xl group-hover:shadow-xl overflow-hidden relative">
                          {/* Gradient overlay on hover */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ 
                              background: `linear-gradient(135deg, ${step.color}08 0%, transparent 100%)`
                            }}
                          />
                          
                          <CardContent className="p-6 md:p-8 text-center relative z-10">
                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                              <m.div
                                className="relative"
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <div 
                                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                                  style={{ 
                                    backgroundColor: `${step.color}15`,
                                    border: `2px solid ${step.color}30`
                                  }}
                                >
                                  <StepIcon 
                                    size={32} 
                                    style={{ color: step.color }}
                                    className="drop-shadow-sm"
                                  />
                                </div>
                              </m.div>
                            </div>
                            
                            {/* Year */}
                            <div 
                              className="text-3xl md:text-4xl font-bold mb-2"
                              style={{ color: step.color }}
                            >
                              {step.year}
                            </div>
                            
                            {/* Title */}
                            <div className="text-base md:text-lg font-semibold text-odillon-dark mb-2">
                              {step.title}
                            </div>
                            
                            {/* Description - Desktop only */}
                            <p className="hidden md:block text-sm text-gray-600 leading-relaxed mt-3">
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </m.div>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Core Values - Optimized Design */}
        <BlurFade delay={0.5}>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <Badge variant="secondary" className="mb-4">
                  Nos Valeurs
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Nos Valeurs Fondamentales
                </h2>
                <p className="text-muted-foreground">
                  Les principes qui guident chaque action et façonnent notre engagement envers l'excellence
                </p>
              </div>
              
              <div className="mx-auto max-w-4xl">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Stats & Expertise Card - Left */}
                  <FadeIn delay={0.2}>
                    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-1">
                          <div className="relative flex flex-col items-center justify-center bg-primary/5 min-h-[280px] overflow-hidden">
                            {/* Image de fond avec overlay - occupe tout l'espace */}
                            {expertiseImageUrl && (
                              <div className="absolute inset-0">
                                <Image
                                  src={expertiseImageUrl}
                                  alt="Expertise en ingénierie d'entreprises - Équipe professionnelle"
                                  fill
                                  className="object-cover opacity-20"
                                  priority={false}
                                />
                                <div className="absolute inset-0 bg-primary/10" />
                              </div>
                            )}
                            
                            {/* Contenu au-dessus de l'image */}
                            <div className="relative z-10 flex flex-col items-center p-8">
                              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/30">
                                <BarChart3 className="h-10 w-10 text-primary" aria-hidden="true" />
                              </div>
                              <Badge className="mb-2 bg-primary text-primary-foreground border-transparent">
                                Depuis 2017
                              </Badge>
                              <h3 className="text-center text-xl font-bold mb-2">
                                Notre Expertise
                              </h3>
                              <p className="text-center text-sm text-muted-foreground">
                                Ingénierie d'Entreprises
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center p-8 space-y-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                  <Target className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">4 Domaines d'Expertise</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Gouvernance, Juridique, Finances et Ressources Humaines
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                  <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Approche Personnalisée</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Solutions adaptées aux enjeux spécifiques de chaque organisation
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                  <Award className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Méthodologies Éprouvées</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Combinaison des meilleures pratiques internationales avec adaptation locale
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>

                  {/* Values List - Right */}
                  <div className="space-y-4">
                    {coreValues.map((value, idx) => {
                      const ValueIcon = value.icon
                      return (
                        <FadeIn key={value.title} delay={0.1 * (idx + 1)}>
                          <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div 
                                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                                  style={{ 
                                    backgroundColor: `${value.color}15`
                                  }}
                                >
                                  <ValueIcon 
                                    className="h-6 w-6"
                                    style={{ color: value.color }}
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-1 flex items-start justify-between gap-2">
                                    <h3 
                                      className="font-semibold"
                                      style={{ color: value.color }}
                                    >
                                      {value.title}
                                    </h3>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {value.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </FadeIn>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              asChild
              size="lg"
              className="bg-odillon-teal hover:bg-odillon-teal/90 text-white text-sm md:text-base px-6 md:px-8 py-4 md:py-5 group"
            >
              <Link href="/a-propos">
                Découvrir notre histoire complète
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-odillon-teal text-odillon-teal hover:bg-odillon-teal/10 text-sm md:text-base px-6 md:px-8 py-4 md:py-5 group"
            >
              <Link href="/contact">
                <Send className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Parlons de votre projet
              </Link>
            </Button>
          </div>
          
          {/* Séparateur */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-2xl mx-auto"></div>
        </BlurFade>
      </div>
    </section>
  )
}

