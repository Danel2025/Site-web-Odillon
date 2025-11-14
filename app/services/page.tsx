"use client"

import { HeaderPro } from "@/components/layout/header-pro"
import { Footer } from "@/components/layout/footer"
import { ServicesDetailed } from "@/components/sections/services-detailed"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { ScrollToTop } from "@/components/magicui/scroll-to-top"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { cn } from "@/lib/utils"

export default function ServicesPage() {
  return (
    <>
      {/* Background avec grille interactive */}
      <div className="fixed inset-0 w-screen h-screen -z-10 bg-white">
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[100, 100]}
          className="w-full h-full"
          squaresClassName="fill-gray-300/10 stroke-gray-400/15 hover:fill-[#1A9B8E]/60 hover:stroke-[#1A9B8E] transition-all duration-200"
        />
      </div>
      
      <ScrollProgress />
      <ScrollToTop />
      <HeaderPro />
      <main className="relative min-h-screen pt-[88px] md:pt-[104px]">
        <ServicesDetailed />
      </main>
      <Footer />
    </>
  )
}

