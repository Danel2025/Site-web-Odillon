"use client"

import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee"
import { 
  Shield, 
  Scale, 
  TrendingUp, 
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react"
import Link from "next/link"
import { NumberTicker } from "@/components/ui/number-ticker"

const mainServices = [
  {
    icon: Shield,
    title: "Gouvernance d'Entreprise",
    tagline: "Structurez votre organisation",
    color: "#1A9B8E",
    gradient: "from-[#1A9B8E]/20 to-[#1A9B8E]/5",
    highlights: ["Conseil d'administration", "Politique de gouvernance", "Contrôle interne"]
  },
  {
    icon: Scale,
    title: "Services Juridiques",
    tagline: "Sécurisez vos opérations",
    color: "#C4D82E",
    gradient: "from-[#C4D82E]/20 to-[#C4D82E]/5",
    highlights: ["Contrats", "Conformité", "Audit juridique"]
  },
  {
    icon: TrendingUp,
    title: "Conseil Financier",
    tagline: "Optimisez votre croissance",
    color: "#1A9B8E",
    gradient: "from-[#1A9B8E]/20 to-[#1A9B8E]/5",
    highlights: ["Business plan", "Levée de fonds", "Tableaux de bord"]
  },
  {
    icon: Users,
    title: "Ressources Humaines",
    tagline: "Développez vos talents",
    color: "#C4D82E",
    gradient: "from-[#C4D82E]/20 to-[#C4D82E]/5",
    highlights: ["Gestion des talents", "Performance", "Carrières"]
  }
]

const benefits = [
  { icon: Sparkles, text: "Excellence garantie", metric: "95%" },
  { icon: Zap, text: "Réponse rapide", metric: "24h" },
  { icon: Target, text: "Résultats mesurables", metric: "100%" }
]

export function ServicesHome() {
  return (
    <section id="services" className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-odillon-teal/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <BlurFade delay={0.1}>
            <Badge className="mb-4 md:mb-6 bg-[#1A9B8E]/10 border border-[#1A9B8E]/20 text-[#1A9B8E] hover:bg-[#1A9B8E]/15 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 font-medium">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              Nos Services
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-4">
              Solutions complètes pour{" "}
              <span className="bg-gradient-to-r from-[#1A9B8E] via-[#C4D82E] to-[#1A9B8E] bg-clip-text text-transparent animate-gradient-x">
                votre réussite
              </span>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-base md:text-lg text-gray-600 px-4">
              Quatre piliers d'expertise pour transformer et structurer votre organisation
            </p>
          </BlurFade>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {mainServices.map((service, idx) => {
            const ServiceIcon = service.icon
            return (
              <BlurFade key={service.title} delay={0.1 * (idx + 1)}>
                <Card className={`relative overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 group hover:shadow-2xl ${idx === 0 ? 'md:col-span-2' : ''}`}>
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <CardContent className="relative p-5 md:p-6">
                    <div className="flex flex-col gap-4 md:gap-6 items-start">
                      <div 
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${service.color}30, ${service.color}15)`,
                          border: `2px solid ${service.color}40`
                        }}
                      >
                        <ServiceIcon className="w-7 h-7 md:w-8 md:h-8" style={{ color: service.color }} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-odillon-teal transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm md:text-base font-medium mb-3 md:mb-4" style={{ color: service.color }}>
                          {service.tagline}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {service.highlights.map((highlight, i) => (
                            <Badge 
                              key={i}
                              variant="outline" 
                              className="text-xs border-gray-300 text-gray-700 hover:border-odillon-teal hover:text-odillon-teal transition-colors"
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            )
          })}
        </div>

        {/* Marquee Benefits */}
        <BlurFade delay={0.5}>
          <Marquee className="py-4 mb-8 md:mb-12">
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent speed={30} pauseOnHover={true}>
              {benefits.map((benefit, idx) => {
                const BenefitIcon = benefit.icon
                return (
                  <MarqueeItem key={idx} className="w-72 md:w-80">
                    <Card className="border-2 border-gray-200 hover:border-odillon-teal transition-all duration-300">
                      <CardContent className="p-5 md:p-6 flex items-center gap-4">
                        <div 
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ 
                            background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}20, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}10)`
                          }}
                        >
                          <BenefitIcon className="w-6 h-6 md:w-7 md:h-7" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }} />
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }}>
                            <NumberTicker value={parseInt(benefit.metric)} delay={0.5 + idx * 0.2} />
                            {benefit.metric.replace(/\d+/g, '')}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">{benefit.text}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </MarqueeItem>
                )
              })}
            </MarqueeContent>
          </Marquee>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.6}>
          <div className="text-center">
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 inline-block">
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  Découvrez nos services en détail
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-odillon-teal hover:bg-odillon-teal/90 text-white text-sm md:text-base px-6 md:px-8 py-4 md:py-5 group w-full sm:w-auto"
                  >
                    <Link href="/services">
                      Voir tous nos services
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-odillon-teal text-odillon-teal hover:bg-odillon-teal hover:text-white text-sm md:text-base px-6 md:px-8 py-4 md:py-5 w-full sm:w-auto"
                  >
                    <Link href="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

