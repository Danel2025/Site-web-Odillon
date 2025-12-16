import { getHeroPhotos } from "@/lib/photos-cache"
import { HeroClient } from "./hero-client"

/**
 * Hero Section - Server Component
 * Fetches photos server-side with caching for optimal performance
 */
export async function Hero() {
  const images = await getHeroPhotos()

  return <HeroClient images={images} />
}
