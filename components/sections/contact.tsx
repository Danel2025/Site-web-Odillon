"use client"

import { FadeIn } from "@/components/magicui/fade-in"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { Icon3D } from "@/components/ui/icon-3d"
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Star,
  Mail,
  Calendar,
  FolderOpen,
  MessageSquare,
  Shield,
  FileText,
  Users,
  CheckCircle2
} from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Par Téléphone",
    items: [
      { label: "+241 11747574" }
    ],
    color: "#1A9B8E"
  },
  {
    icon: Mail,
    title: "Par Email",
    items: [
      { label: "contact@odillon.fr" }
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
    color: "#1A9B8E"
  }
]

const stats = [
  { value: "24h", label: "Temps de réponse", icon: Clock },
  { value: "95%", label: "Satisfaction client", icon: Star },
  { value: "200+", label: "Projets réalisés", icon: CheckCircle2 },
  { value: "50+", label: "Clients accompagnés", icon: Users }
]

export function Contact() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero Section with Bubble Background */}
      <div className="relative overflow-hidden py-32 bg-white">
        <BubbleBackground
          interactive={true}
          className="absolute inset-0 opacity-20"
          colors={{
            first: '26,155,142',      // odillon-teal
            second: '196,216,46',     // odillon-lime
            third: '26,155,142',      // odillon-teal
            fourth: '196,216,46',     // odillon-lime
            fifth: '26,155,142',      // odillon-teal
            sixth: '196,216,46'       // odillon-lime
          }}
          transition={{ stiffness: 150, damping: 25 }}
        />
        
        {/* Gradient overlay vers le blanc en bas */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left - Content */}
            <div className="space-y-8">
              <BlurFade delay={0.1}>
                <Badge className="bg-gradient-to-r from-[#1A9B8E] to-[#C4D82E] text-white hover:opacity-90 border-0 text-base px-6 py-3 inline-flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Contactez-nous
                </Badge>
              </BlurFade>
              
              <BlurFade delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transformons ensemble votre{" "}
                  <span className="bg-gradient-to-r from-[#1A9B8E] via-[#C4D82E] to-[#1A9B8E] bg-clip-text text-transparent animate-gradient-x">
                    vision en réalité
                  </span>
                </h1>
              </BlurFade>
              
              <BlurFade delay={0.3}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Notre équipe d'experts est à votre écoute pour comprendre vos enjeux 
                  et vous proposer des solutions innovantes adaptées à vos besoins
                </p>
              </BlurFade>

              {/* Stats Grid */}
              <BlurFade delay={0.4}>
                <div className="grid grid-cols-2 gap-6 pt-8">
                  {stats.map((stat, idx) => {
                    const StatIcon = stat.icon
                    return (
                      <FadeIn key={stat.label} delay={0.1 * (idx + 1)}>
                        <div>
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm mb-3 border border-gray-200"
                               style={{ 
                                 background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}20, ${idx % 2 === 0 ? '#1A9B8E' : '#C4D82E'}10)`
                               }}
                          >
                            <StatIcon className="w-6 h-6" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }} />
                          </div>
                          <div className="text-2xl font-bold mb-1" style={{ color: idx % 2 === 0 ? '#1A9B8E' : '#C4D82E' }}>
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </FadeIn>
                    )
                  })}
                </div>
              </BlurFade>
            </div>

            {/* Right - Orbiting Circles */}
            <BlurFade delay={0.5}>
              <div className="relative flex h-[500px] w-full items-center justify-center">
                {/* Center Logo/Icon */}
                <div className="absolute z-10 flex items-center justify-center">
                  <Icon3D
                    src="/icons/3d/mail.png" 
                    alt="Email"
                    width={80}
                    height={80}
                    fallbackIcon={Mail}
                    className="drop-shadow-lg text-odillon-teal"
                  />
                </div>

                {/* Inner Circle - Services principaux */}
                <OrbitingCircles radius={100} duration={20} iconSize={60}>
                  <Icon3D
                    src="/icons/3d/calendar.png" 
                    alt="Calendrier"
                    width={60}
                    height={60}
                    fallbackIcon={Calendar}
                    className="drop-shadow-lg text-odillon-teal"
                  />
                  <Icon3D
                    src="/icons/3d/folder.png" 
                    alt="Stockage"
                    width={60}
                    height={60}
                    fallbackIcon={FolderOpen}
                    className="drop-shadow-lg text-odillon-lime"
                  />
                  <Icon3D
                    src="/icons/3d/chat.png" 
                    alt="Messages"
                    width={60}
                    height={60}
                    fallbackIcon={MessageSquare}
                    className="drop-shadow-lg text-odillon-teal"
                  />
                </OrbitingCircles>

                {/* Outer Circle - Services additionnels */}
                <OrbitingCircles radius={180} duration={25} reverse iconSize={60}>
                  <Icon3D
                    src="/icons/3d/shield.png" 
                    alt="Sécurité"
                    width={60}
                    height={60}
                    fallbackIcon={Shield}
                    className="drop-shadow-lg text-odillon-lime"
                  />
                  <Icon3D
                    src="/icons/3d/document.png" 
                    alt="Documents"
                    width={60}
                    height={60}
                    fallbackIcon={FileText}
                    className="drop-shadow-lg text-odillon-teal"
                  />
                  <Icon3D
                    src="/icons/3d/users.png" 
                    alt="Collaboration"
                    width={60}
                    height={60}
                    fallbackIcon={Users}
                    className="drop-shadow-lg text-odillon-lime"
                  />
                  <Icon3D
                    src="/icons/3d/checkmark.png" 
                    alt="Vérification"
                    width={60}
                    height={60}
                    fallbackIcon={CheckCircle2}
                    className="drop-shadow-lg text-odillon-teal"
                  />
                </OrbitingCircles>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Contact Info */}
            <BlurFade delay={0.5}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Coordonnées
                  </h2>
                  <p className="text-lg text-gray-600">
                    Plusieurs moyens de nous joindre pour échanger sur vos besoins
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {contactInfo.map((info, idx) => {
                    const InfoIcon = info.icon
                    return (
                      <FadeIn key={info.title} delay={0.1 * (idx + 1)}>
                        <div className="group relative overflow-hidden rounded border border-gray-200 hover:border-odillon-teal transition-all duration-300 p-6">
                          {/* Gradient overlay */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${info.color} 0%, transparent 100%)` }}
                          />
                          
                          <div className="flex items-start gap-6 relative">
                            <div 
                              className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all duration-300"
                              style={{ 
                                background: `linear-gradient(135deg, ${info.color}30, ${info.color}15)`
                              }}
                            >
                              <InfoIcon className="w-6 h-6" style={{ color: info.color }} />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-gray-900 mb-2">
                                {info.title}
                              </h3>
                              <div className="space-y-2">
                                {info.items.map((item, i) => (
                                  <div key={i} className="text-sm text-gray-600">
                                    {item.label}
                                  </div>
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
                  <div className="bg-white p-6 rounded border border-gray-200">
                    <div className="w-12 h-12 bg-odillon-teal/10 rounded-sm flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-odillon-teal" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Horaires d'ouverture</h3>
                    <p className="text-sm text-gray-600">
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
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="w-12 h-12 bg-odillon-teal/10 rounded-sm flex items-center justify-center mb-4">
                      <Send className="w-6 h-6 text-odillon-teal" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Envoyez-nous un message
                    </h2>
                    <p className="text-gray-600">
                      Remplissez le formulaire et nous vous recontacterons rapidement
                    </p>
                  </div>

                  <form className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="resize-none"
                        placeholder="Décrivez-nous votre projet ou votre besoin..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-odillon-teal hover:bg-odillon-teal/90 text-white px-12 py-6 text-lg group"
                      >
                        Envoyer le message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
