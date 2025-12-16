import { use } from "react"
import { HeaderPro } from "@/components/layout/header-pro"
import { Footer } from "@/components/layout/footer"
import { ExpertiseDetailed } from "@/components/sections/expertise-detailed"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { ScrollToTop } from "@/components/magicui/scroll-to-top"

export const metadata = {
  title: "Notre Expertise | Odillon - Ingénierie d'Entreprises",
  description: "Découvrez notre expertise en structuration, gestion administrative, relations publiques et management des risques.",
}

export default function ExpertisePage({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[]>>
}) {
  // Unwrap promises to prevent DevTools enumeration warnings
  use(params)
  use(searchParams)
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <HeaderPro />
      <main className="min-h-screen pt-[88px] md:pt-[104px]">
        <ExpertiseDetailed />
      </main>
      <Footer />
    </>
  )
}

