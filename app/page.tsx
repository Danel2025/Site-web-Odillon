import { use } from "react"
import dynamic from "next/dynamic"
import { HeaderPro } from "@/components/layout/header-pro"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { TrustedByHome } from "@/components/sections/trusted-by-home"
import { ServicesHome } from "@/components/sections/services-home"
import { ExpertiseHome } from "@/components/sections/expertise-home"
import { CtaBanner } from "@/components/sections/cta-banner"

// Lazy load components below the fold (not visible initially)
const AboutHome = dynamic(() => import("@/components/sections/about-home").then(mod => ({ default: mod.AboutHome })), {
  loading: () => <div className="min-h-[400px] bg-gray-50" />,
})
const ContactHome = dynamic(() => import("@/components/sections/contact-home").then(mod => ({ default: mod.ContactHome })), {
  loading: () => <div className="min-h-[600px] bg-white" />,
})

// Lazy load UI enhancement components (client-only)
const ScrollProgress = dynamic(() => import("@/components/magicui/scroll-progress").then(mod => ({ default: mod.ScrollProgress })))
const ScrollToTop = dynamic(() => import("@/components/magicui/scroll-to-top").then(mod => ({ default: mod.ScrollToTop })))

export default function Home({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[]>>
}) {
  // Unwrap the promises to prevent DevTools enumeration warnings
  // Even though we don't use these values, we need to handle them properly
  use(params)
  use(searchParams)
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <HeaderPro />
      <main className="min-h-screen pt-[88px] md:pt-[104px]">
        <Hero />
        <TrustedByHome />
        <ServicesHome />
        <ExpertiseHome />
        <CtaBanner
          title="Découvrez notre expertise approfondie et nos méthodologies éprouvées"
          description=""
          buttonText="En savoir plus sur notre expertise"
          buttonHref="/expertise"
          badgeText="Expertise"
        />
        <AboutHome />
        <ContactHome />
      </main>
      <Footer />
    </>
  )
}
