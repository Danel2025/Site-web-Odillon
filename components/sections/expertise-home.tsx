"use client"

import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { AnimatedGradient } from "@/components/magicui/animated-gradient"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Target, 
  Briefcase, 
  Globe2, 
  TrendingUp,
  CheckCircle
} from "lucide-react"
import { NumberTicker } from "@/components/ui/number-ticker"

const expertiseDomains = [
  {
    icon: Target,
    title: "Structuration",
    subtitle: "& Restructuration",
    impact: "35%",
    metric: "d'efficacité en plus",
    color: "#39837a",
    features: ["Diagnostic complet", "Optimisation", "Accompagnement"]
  },
  {
    icon: Briefcase,
    title: "Gestion Intégrée",
    subtitle: "Admin • Juridique • Finance",
    impact: "25%",
    metric: "de coûts en moins",
    color: "#C4D82E",
    features: ["Conformité totale", "Digitalisation", "Pilotage"]
  },
  {
    icon: Globe2,
    title: "Relations Publiques",
    subtitle: "Image & Influence",
    impact: "60%",
    metric: "de visibilité en plus",
    color: "#39837a",
    features: ["Communication", "Médias", "Lobbying"]
  },
  {
    icon: TrendingUp,
    title: "Management Risques",
    subtitle: "Prévention & Contrôle",
    impact: "50%",
    metric: "d'incidents en moins",
    color: "#C4D82E",
    features: ["Cartographie", "PCA/PRA", "Audit"]
  }
]

export function ExpertiseHome() {
  return (
    <section id="expertise" className="relative py-12 md:py-16 lg:py-24 bg-gray-50 overflow-hidden">
      {/* Animated Gradient Background */}
      <AnimatedGradient className="absolute inset-0 opacity-30" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <BlurFade delay={0.1}>
            <Badge className="mb-4 md:mb-6 bg-white/90 backdrop-blur-sm border-2 border-odillon-teal text-odillon-teal text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
              Expertise Reconnue
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-4">
              Des résultats{" "}
              <span className="text-odillon-teal">mesurables</span>{" "}
              pour votre entreprise
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-base md:text-lg text-gray-600 px-4">
              4 domaines d'expertise, des dizaines de compétences, un seul objectif : votre succès
            </p>
          </BlurFade>
        </div>

        {/* Expertise Cards - Diagonal Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {expertiseDomains.map((domain, idx) => {
            const DomainIcon = domain.icon
            const isEven = idx % 2 === 0
            
            return (
              <FadeIn key={domain.title} delay={0.1 * (idx + 1)}>
                <Card className={`relative overflow-hidden border-2 transition-all duration-500 group hover:shadow-xl ${isEven ? 'md:translate-y-0' : 'md:translate-y-6'}`}
                  style={{ borderColor: `${domain.color}40` }}
                >
                  {/* Hover gradient */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${domain.color}, transparent)` }}
                  />
                  
                  <CardContent className="p-5 md:p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${domain.color}25, ${domain.color}10)`,
                          border: `2px solid ${domain.color}40`
                        }}
                      >
                        <DomainIcon className="w-6 h-6 md:w-7 md:h-7" style={{ color: domain.color }} />
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl md:text-4xl font-bold" style={{ color: domain.color }}>
                          <NumberTicker value={parseInt(domain.impact)} delay={0.5 + idx * 0.1} />%
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-600">{domain.metric}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {domain.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                      {domain.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {domain.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-gray-700">
                          <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: domain.color }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

