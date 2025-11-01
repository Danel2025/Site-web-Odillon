"use client"

import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ParticleEffect } from "@/components/magicui/particle-effect"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GlassmorphismIcon } from "@/components/ui/glassmorphism-icon"
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/marquee"
import { 
  Award, 
  Shield, 
  Lightbulb, 
  Heart,
  Building2,
  Users,
  Trophy,
  ArrowRight,
  Rocket,
  TrendingUp,
  Zap
} from "lucide-react"
import Link from "next/link"
import { NumberTicker } from "@/components/ui/number-ticker"

const companyStats = [
  { icon: Building2, value: 7, suffix: "+", label: "Années", color: "#1A9B8E" },
  { icon: Users, value: 50, suffix: "+", label: "Clients", color: "#C4D82E" },
  { icon: Trophy, value: 200, suffix: "+", label: "Projets", color: "#1A9B8E" }
]

const coreValues = [
  {
    icon: Award,
    title: "Excellence",
    description: "Standards élevés dans chaque mission",
    color: "#1A9B8E"
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Transparence et éthique totale",
    color: "#C4D82E"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Solutions créatives et adaptées",
    color: "#1A9B8E"
  },
  {
    icon: Heart,
    title: "Partenariat",
    description: "Collaboration étroite et durable",
    color: "#C4D82E"
  }
]

const journey = [
  { year: "2017", title: "Fondation", icon: Rocket, color: "#1A9B8E" },
  { year: "2019", title: "Expansion", icon: TrendingUp, color: "#C4D82E" },
  { year: "2022", title: "Reconnaissance", icon: Trophy, color: "#1A9B8E" },
  { year: "2024", title: "Innovation", icon: Zap, color: "#C4D82E" }
]

export function AboutHome() {
  return (
    <section id="apropos" className="relative py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
      {/* Particle Effect Background */}
      <ParticleEffect 
        className="absolute inset-0"
        quantity={30}
        staticity={40}
        color="rgba(26, 155, 142, 0.15)"
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <BlurFade delay={0.1}>
            <Badge className="mb-4 md:mb-6 bg-odillon-teal text-white border-0 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
              Notre Histoire
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-4">
              Votre partenaire{" "}
              <span className="bg-gradient-to-r from-[#1A9B8E] to-[#C4D82E] bg-clip-text text-transparent">
                de confiance
              </span>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-base md:text-lg text-gray-600 px-4">
              Depuis 2017, nous accompagnons les entreprises dans leur transformation avec excellence et intégrité
            </p>
          </BlurFade>
        </div>

        {/* Stats Bar */}
        <BlurFade delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 md:mb-16">
            {companyStats.map((stat, idx) => {
              const StatIcon = stat.icon
              return (
                <FadeIn key={stat.label} delay={0.1 * (idx + 1)}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        border: `2px solid ${stat.color}40`
                      }}
                    >
                      <StatIcon className="w-6 h-6 md:w-8 md:h-8" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>
                        <NumberTicker value={stat.value} delay={0.5 + idx * 0.1} />
                        {stat.suffix}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </BlurFade>

        <Separator className="mb-10 md:mb-16" />

        {/* Journey Timeline Horizontal */}
        <BlurFade delay={0.5}>
          <div className="mb-10 md:mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8">
              Notre Évolution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {journey.map((step, idx) => {
                const StepIcon = step.icon
                return (
                  <FadeIn key={step.year} delay={0.1 * (idx + 1)}>
                    <Card className="border-2 border-gray-200 hover:border-odillon-teal transition-all duration-300 hover:shadow-lg group">
                      <CardContent className="p-4 md:p-6 text-center">
                        <div className="flex justify-center mb-3 md:mb-4">
                          <GlassmorphismIcon 
                            icon={StepIcon}
                            size={56}
                            color={step.color}
                            className="mx-auto"
                          />
                        </div>
                        <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: step.color }}>
                          {step.year}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">
                          {step.title}
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </BlurFade>

        {/* Core Values - Marquee */}
        <BlurFade delay={0.6}>
          <div className="mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-4 md:mb-6">
              Nos Valeurs Fondamentales
            </h3>
            <Marquee>
              <MarqueeContent speed={40} pauseOnHover>
                {coreValues.map((value) => {
                  const ValueIcon = value.icon
                  return (
                    <MarqueeItem 
                      key={value.title}
                      className="mx-4"
                    >
                      <div className="flex items-center gap-4 bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:scale-105 min-w-[320px] md:min-w-[380px]"
                        style={{ borderColor: `${value.color}40` }}
                      >
                        {/* Glassmorphism Icon */}
                        <div className="flex-shrink-0">
                          <GlassmorphismIcon 
                            icon={ValueIcon}
                            size={56}
                            color={value.color}
                          />
                        </div>
                        
                        {/* Text content */}
                        <div className="flex-1">
                          <h4 
                            className="text-base md:text-lg font-bold mb-2"
                            style={{ color: value.color }}
                          >
                            {value.title}
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                        
                        {/* Decorative corner */}
                        <div 
                          className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-full"
                          style={{ backgroundColor: value.color }}
                        />
                      </div>
                    </MarqueeItem>
                  )
                })}
              </MarqueeContent>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
            </Marquee>
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.7}>
          <div className="text-center">
            <Link 
              href="/a-propos"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1A9B8E] to-[#C4D82E] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:opacity-90 transition-opacity group shadow-lg"
            >
              Découvrir notre histoire complète
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

