"use client"

import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ArrowRight, Shield, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GridPattern } from "@/components/ui/grid-pattern"
import { CountingNumber } from "@/components/ui/counting-number"
import { HighlightText } from "@/components/ui/highlight-text"
import { TextShimmer } from "@/components/ui/text-shimmer"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity"
import { DottedMap } from "@/components/ui/dotted-map"

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Dotted Map Background - Gabon */}
      <div className="absolute inset-0 opacity-30 md:opacity-40 pointer-events-none z-0">
        <DottedMap
          width={1200}
          height={900}
          mapSamples={15000}
          markers={[
            {
              lat: 0.8037,
              lng: 11.6094,
              size: 8,
            },
          ]}
          markerColor="#C4D82E"
          dotColor="#1A9B8E"
          dotRadius={0.6}
          className="w-full h-full"
        />
      </div>

      {/* Animated Grid Background - En Arrière-Plan */}
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [8, 8],
          [12, 4],
          [16, 8],
          [6, 10],
          [10, 6],
          [14, 10],
          [3, 6],
          [18, 4],
        ]}
        className="absolute inset-0 h-full w-full opacity-30"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <FadeIn delay={0.1}>
              <div className="inline-block">
                <span className="inline-flex items-center rounded-full bg-odillon-teal/10 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-odillon-teal">
                  <Award className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  <TextShimmer className="text-xs md:text-sm">Excellence en Ingénierie d'Entreprises</TextShimmer>
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Structurez votre{" "}
                <HighlightText className="text-odillon-teal" delay={0.5}>
                  entreprise
                </HighlightText>{" "}
                pour la{" "}
                <HighlightText className="text-odillon-lime" highlightClassName="bg-odillon-lime/20" delay={0.8}>
                  réussite
                </HighlightText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Cabinet de conseil en ingénierie d'entreprises spécialisé dans la structuration, 
                la gestion administrative, les relations publiques et le management des risques.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-odillon-teal hover:bg-odillon-teal/90 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group"
                >
                  <Link href="#contact">
                    Démarrer un projet
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-odillon-teal text-odillon-teal hover:bg-odillon-teal hover:text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
                >
                  <Link href="#services">Nos services</Link>
                </Button>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 border-t" id="gouvernance">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-odillon-teal">
                    <CountingNumber value={15} suffix="+" duration={2} />
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Années d'expérience</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-odillon-teal">
                    <CountingNumber value={100} suffix="+" duration={2.5} />
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Projets réalisés</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-odillon-teal">
                    <CountingNumber value={50} suffix="+" duration={2.3} />
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Clients satisfaits</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative mt-8 lg:mt-0" id="services">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <BlurFade delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white p-4 md:p-6 rounded border border-gray-200"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-odillon-teal/10 rounded-sm flex items-center justify-center mb-3 md:mb-4">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-odillon-teal" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Gouvernance</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Structuration et mise en place de politiques efficaces
                  </p>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.3}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white p-4 md:p-6 rounded border border-gray-200 mt-4 md:mt-8"
                  id="conseil"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-odillon-lime/10 rounded-sm flex items-center justify-center mb-3 md:mb-4">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-odillon-lime" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Finances</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Conseil financier et levée de fonds stratégique
                  </p>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.4}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white p-4 md:p-6 rounded border border-gray-200"
                  id="administration"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-odillon-teal/10 rounded-sm flex items-center justify-center mb-3 md:mb-4">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-odillon-teal" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">RH</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Gestion des talents et développement organisationnel
                  </p>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.5}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white p-4 md:p-6 rounded border border-gray-200 mt-4 md:mt-8"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-odillon-lime/10 rounded-sm flex items-center justify-center mb-3 md:mb-4">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-odillon-lime" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Juridique</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Accompagnement juridique et contractuel complet
                  </p>
                </motion.div>
              </BlurFade>
            </div>
          </div>
        </div>

        {/* Scroll Velocity Section */}
        <FadeIn delay={0.6}>
          <div className="mt-12 md:mt-16 lg:mt-20 relative">
            <ScrollVelocityContainer className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-[-0.02em] text-gray-300 md:leading-[4rem]">
              <ScrollVelocityRow baseVelocity={5} direction={1}>
                Gouvernance • Finances • Ressources Humaines • Juridique
              </ScrollVelocityRow>
              <ScrollVelocityRow baseVelocity={5} direction={-1}>
                Excellence • Innovation • Expertise • Performance
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
            <div className="from-gray-50 pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-gray-50 pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

