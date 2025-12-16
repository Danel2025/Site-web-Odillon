import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#39837a]/95 backdrop-blur-lg border-t-2 border-[#39837a] border-b-2 border-odillon-lime text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Logo et Description */}
          <div className="space-y-4 md:space-y-5 sm:col-span-2 lg:col-span-1">
            <Link 
              href="#accueil" 
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm transition-all"
              aria-label="Retour à l'accueil - Odillon"
            >
              <Image
                src="/Logo-blanclogo-de-chronodil-pour-fond-sombre.webp"
                alt="Odillon - Ingénierie d'Entreprises"
                width={200}
                height={60}
                className="h-12 md:h-14 w-auto hover:opacity-90 transition-opacity"
                priority={false}
              />
            </Link>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-xs">
              Cabinet de conseil en ingénierie d'entreprises, 
              spécialisé dans la structuration et le management stratégique.
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Navigation des services">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5 text-white">
              Nos Services
            </h3>
            <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm">
              <li>
                <Link 
                  href="#services" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Gouvernance
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Juridique
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Finances
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Ressources Humaines
                </Link>
              </li>
            </ul>
          </nav>

          {/* Liens rapides */}
          <nav aria-label="Navigation principale">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5 text-white">
              Liens Rapides
            </h3>
            <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm">
              <li>
                <Link 
                  href="#accueil" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  href="#expertise" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Notre Expertise
                </Link>
              </li>
              <li>
                <Link 
                  href="/phototheque" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Photothèque
                </Link>
              </li>
              <li>
                <Link 
                  href="#apropos" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-5 text-white">
              Contact
            </h3>
            <ul className="space-y-3 md:space-y-3.5 text-xs md:text-sm">
              <li className="flex items-start gap-2.5">
                <Phone 
                  className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-white flex-shrink-0" 
                  aria-hidden="true"
                />
                <a 
                  href="tel:+24111747574" 
                  className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all"
                  aria-label="Appeler Odillon au +241 11747574"
                >
                  +241 11747574
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail 
                  className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-white flex-shrink-0" 
                  aria-hidden="true"
                />
                <a 
                  href="mailto:contact@odillon.fr" 
                  className="text-gray-300 hover:text-odillon-lime focus:text-odillon-lime focus:outline-none focus:ring-2 focus:ring-odillon-lime focus:ring-offset-2 focus:ring-offset-black rounded-sm px-1 py-0.5 transition-all break-all"
                  aria-label="Envoyer un email à contact@odillon.fr"
                >
                  contact@odillon.fr
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin 
                  className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-white flex-shrink-0" 
                  aria-hidden="true"
                />
                <span className="text-white/80 leading-relaxed">
                  BP- 13262 Libreville, Gabon
                </span>
              </li>
            </ul>
          </address>
        </div>

        <Separator className="my-8 md:my-10 lg:my-12 bg-white/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/70">
          <p className="text-center sm:text-left">
            &copy; {currentYear} Odillon - Ingénierie d'Entreprises. Tous droits réservés.
          </p>
          <p className="text-center sm:text-right">
            Site web :{" "}
            <a 
              href="https://www.odillon.fr" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#39837a] rounded-sm px-1 py-0.5 transition-all inline-flex items-center gap-1"
              aria-label="Visiter le site web Odillon (nouvelle fenêtre)"
            >
              www.odillon.fr
              <ExternalLink className="w-3 h-3 inline-block" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

