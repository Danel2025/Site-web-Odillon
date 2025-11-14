"use client"

import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { InteractiveGridPattern } from "@/components/ui/shadcn-io/interactive-grid-pattern"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  Clock,
  ArrowRight,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

const contactMethods = [
  {
    icon: Phone,
    title: "Appelez-nous",
    value: "+241 11747574",
    description: "Lun-Ven 8h-17h",
    link: "tel:+24111747574",
    color: "#1A9B8E",
    gradient: "from-[#1A9B8E]/20 to-[#1A9B8E]/5"
  },
  {
    icon: Mail,
    title: "Écrivez-nous",
    value: "contact@odillon.fr",
    description: "Réponse sous 24h",
    link: "mailto:contact@odillon.fr",
    color: "#C4D82E",
    gradient: "from-[#C4D82E]/20 to-[#C4D82E]/5"
  },
  {
    icon: MapPin,
    title: "Visitez-nous",
    value: "Libreville, Gabon",
    description: "BP-13262",
    link: "https://www.google.com/maps/search/?api=1&query=Libreville,+Gabon",
    color: "#1A9B8E",
    gradient: "from-[#1A9B8E]/20 to-[#1A9B8E]/5"
  }
]

const quickActions = [
  { icon: MessageSquare, text: "Formulaire complet", href: "/contact", primary: true },
  { icon: Phone, text: "Appel direct", href: "tel:+24111747574", primary: false }
]

export function ContactHome() {
  return (
    <section id="contact" className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <InteractiveGridPattern
          width={50}
          height={50}
          squares={[80, 80]}
          className="w-full h-full"
          squaresClassName="fill-gray-200/2 stroke-gray-300/3 hover:fill-[#1A9B8E]/30 hover:stroke-[#1A9B8E]/70 transition-all duration-300"
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Contact Info */}
          <div>
            <BlurFade delay={0.1}>
              <Badge className="mb-4 md:mb-6 bg-[#1A9B8E]/10 border border-[#1A9B8E]/20 text-[#1A9B8E] hover:bg-[#1A9B8E]/15 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 font-medium">
                <Send className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Parlons de votre projet
              </Badge>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Transformons ensemble votre{" "}
                <span className="text-odillon-teal">vision</span>
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                Notre équipe d'experts est prête à vous accompagner. Choisissez votre canal préféré pour nous joindre.
              </p>
            </BlurFade>

            {/* Contact Methods - Stacked Cards */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {contactMethods.map((method, idx) => {
                const MethodIcon = method.icon
                return (
                  <FadeIn key={method.title} delay={0.1 * (idx + 1)}>
                    <a
                      href={method.link}
                      target={method.icon === MapPin ? "_blank" : undefined}
                      rel={method.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="block group"
                    >
                      <div className={`bg-gradient-to-r ${method.gradient} border-2 border-gray-200 rounded-xl p-4 md:p-5 hover:border-gray-400 transition-all duration-300 hover:shadow-lg`}>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div 
                            className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                          >
                            <MethodIcon className="w-6 h-6 md:w-7 md:h-7" style={{ color: method.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs md:text-sm font-semibold text-gray-500 mb-0.5">
                              {method.title}
                            </div>
                            <div className="text-base md:text-lg font-bold text-gray-900 group-hover:text-odillon-teal transition-colors truncate">
                              {method.value}
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-600">
                              {method.description}
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-odillon-teal group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                )
              })}
            </div>

            {/* Quick Actions */}
            <BlurFade delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {quickActions.map((action, idx) => {
                  const ActionIcon = action.icon
                  return action.primary ? (
                    <Button
                      key={action.text}
                      asChild
                      size="lg"
                      className="bg-odillon-teal hover:bg-odillon-teal/90 text-white text-sm md:text-base px-6 md:px-8 py-4 md:py-5 group w-full sm:w-auto"
                    >
                      <Link href={action.href}>
                        <ActionIcon className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                        {action.text}
                        <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      key={action.text}
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-2 border-odillon-teal text-odillon-teal hover:bg-odillon-teal hover:text-white text-sm md:text-base px-6 md:px-8 py-4 md:py-5 w-full sm:w-auto"
                    >
                      <Link href={action.href}>
                        <ActionIcon className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                        {action.text}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </BlurFade>
          </div>

          {/* Right - Hours Card */}
          <BlurFade delay={0.4}>
            <Card className="border-2 border-gray-200 bg-white/90 backdrop-blur-sm hover:border-odillon-teal transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-6 md:p-8 lg:p-10">
                <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#1A9B8E]/20 to-[#C4D82E]/20 flex items-center justify-center">
                    <Clock className="w-7 h-7 md:w-8 md:h-8 text-odillon-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      Horaires d'ouverture
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6 border-l-4 border-odillon-teal">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm md:text-base font-semibold text-gray-900">Lundi - Vendredi</span>
                      <Badge className="bg-odillon-teal text-white text-xs">Ouvert</Badge>
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-odillon-teal">
                      8h00 - 17h00
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm md:text-base font-semibold text-gray-900">Week-end</span>
                      <Badge variant="outline" className="text-xs">Fermé</Badge>
                    </div>
                    <div className="text-base md:text-lg text-gray-600">
                      Sur rendez-vous uniquement
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-odillon-lime/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-odillon-lime" />
                      </div>
                      <div>
                        <div className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                          Réponse garantie
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">
                          Nous nous engageons à répondre à toute demande dans les <strong className="text-odillon-teal">24 heures</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

