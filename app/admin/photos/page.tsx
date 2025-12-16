"use client"

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PANNEAU D'ADMINISTRATION - ODILLON
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Cette page a été réorganisée pour une meilleure utilisabilité :
 *
 * ✅ Guide d'utilisation intégré en haut
 * ✅ Navigation par onglets clairs
 * ✅ Sections organisées logiquement
 * ✅ Recherche globale intelligente
 * ✅ Interface épurée et professionnelle
 *
 * SECTIONS :
 * - 📸 Photos Hero : Gérer le carrousel de la page d'accueil
 * - 🏢 Logos : Partenaires et logos d'entreprises
 * - 🎥 Vidéos : Vidéos YouTube, Vimeo et directes
 * - 💬 Témoignages : Avis clients
 * - 📅 Calendrier : Événements du Gabon et planification
 * - ⚙️  Paramètres : Configuration globale du site
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Loader2,
  LogOut,
  CalendarDays,
  Search,
  Filter,
  X,
  Building2,
  ArrowUp,
  ArrowDown,
  Video,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Edit,
  Quote,
  RefreshCw
} from "lucide-react"
import { HeroImagesDebugger } from "@/components/admin/hero-images-debugger"
import { AdminGuide } from "@/components/admin/admin-guide"
import { MONTHLY_THEMES } from "@/lib/photo-themes"
import { createClient } from "@/lib/supabase/client"
import {
  getEventForDate,
  hasEvent,
  getUpcomingEvents,
  getEventsForMonth,
  type GabonEvent
} from "@/lib/gabon-events"

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES TYPESCRIPT
// ═══════════════════════════════════════════════════════════════════════════

interface Photo {
  id: string
  url: string
  description: string
  location: string | null
  month: number | null
  theme_id: string | null
  section_id: string | null
  is_active: boolean
  display_order: number
}

interface CompanyLogo {
  id: string
  name: string
  full_name: string
  logo_path: string
  fallback: string
  color: string
  display_order: number
  is_active: boolean
}

interface Video {
  id: string
  title: string
  description: string | null
  url: string
  type: 'youtube' | 'vimeo' | 'direct'
  thumbnail: string | null
  category: 'presentation' | 'testimonial'
  is_active: boolean
  display_order: number
}

interface PhotoSection {
  id: string
  title: string
  description: string | null
  badge: string | null
  page: string
  position_after: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Testimonial {
  id: string
  quote: string
  name: string
  position: string
  avatar_url: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export default function AdminPhotosPage() {
  const router = useRouter()

  // ─────────────────────────────────────────────────────────────────────────
  // ÉTATS DE DONNÉES
  // ─────────────────────────────────────────────────────────────────────────

  const [photos, setPhotos] = useState<Photo[]>([])
  const [logos, setLogos] = useState<CompanyLogo[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [photoSections, setPhotoSections] = useState<PhotoSection[]>([])

  // ─────────────────────────────────────────────────────────────────────────
  // ÉTATS DE CHARGEMENT
  // ─────────────────────────────────────────────────────────────────────────

  const [loading, setLoading] = useState(true)
  const [loadingLogos, setLoadingLogos] = useState(false)
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [loadingTestimonials, setLoadingTestimonials] = useState(false)
  const [loadingSections, setLoadingSections] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // ─────────────────────────────────────────────────────────────────────────
  // PARAMÈTRES DU SITE
  // ─────────────────────────────────────────────────────────────────────────

  const [siteSettings, setSiteSettings] = useState({
    show_videos_section: true,
    show_photos_section: true,
    services_cta_image_url: null as string | null,
    expertise_image_url: null as string | null
  })
  const [loadingSettings, setLoadingSettings] = useState(false)
  const [uploadingCtaImage, setUploadingCtaImage] = useState(false)
  const [uploadingExpertiseImage, setUploadingExpertiseImage] = useState(false)

  // ─────────────────────────────────────────────────────────────────────────
  // CALENDRIER
  // ─────────────────────────────────────────────────────────────────────────

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<GabonEvent | undefined>()
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  // ─────────────────────────────────────────────────────────────────────────
  // FILTRES ET RECHERCHE
  // ─────────────────────────────────────────────────────────────────────────

  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState<number | null>(null)
  const [filterTheme, setFilterTheme] = useState<string | null>(null)
  const [filterSection, setFilterSection] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [commandSearch, setCommandSearch] = useState("")

  // ─────────────────────────────────────────────────────────────────────────
  // ÉDITION
  // ─────────────────────────────────────────────────────────────────────────

  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [editPhotoForm, setEditPhotoForm] = useState({
    description: "",
    location: "",
    month: null as number | null,
    theme_id: null as string | null,
    section_id: null as string | null
  })

  // ─────────────────────────────────────────────────────────────────────────
  // FORMULAIRES D'AJOUT
  // ─────────────────────────────────────────────────────────────────────────

  const [newPhoto, setNewPhoto] = useState({
    file: null as File | null,
    description: "",
    location: "" as string,
    month: null as number | null,
    theme_id: null as string | null,
    section_id: null as string | null
  })

  const [newLogo, setNewLogo] = useState({
    name: "",
    full_name: "",
    logo_path: "",
    fallback: "",
    color: "#39837a"
  })

  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    url: "",
    type: "youtube" as 'youtube' | 'vimeo' | 'direct',
    thumbnail: "",
    category: "presentation" as 'presentation' | 'testimonial'
  })

  const [newTestimonial, setNewTestimonial] = useState({
    quote: "",
    name: "",
    position: "",
    avatar_url: ""
  })

  // ─────────────────────────────────────────────────────────────────────────
  // ONGLET ACTIF
  // ─────────────────────────────────────────────────────────────────────────

  const [activeTab, setActiveTab] = useState("photos")

  // ─────────────────────────────────────────────────────────────────────────
  // CONSTANTES
  // ─────────────────────────────────────────────────────────────────────────

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  const currentMonthEvents = getEventsForMonth(new Date().getMonth(), new Date().getFullYear())

  // ═══════════════════════════════════════════════════════════════════════════
  // EFFETS (USEEFFECT)
  // ═══════════════════════════════════════════════════════════════════════════

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  // Charger les données au montage
  useEffect(() => {
    if (!checkingAuth) {
      loadPhotos()
      loadLogos()
      loadVideos()
      loadTestimonials()
      loadSiteSettings()
      loadPhotoSections()
    }
  }, [checkingAuth])

  // Gérer la sélection de date
  useEffect(() => {
    if (selectedDate) {
      const event = getEventForDate(selectedDate)
      setSelectedEvent(event)
    }
  }, [selectedDate])

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTIONS DE CHARGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  const loadPhotos = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterMonth) params.append("month", filterMonth.toString())

      const res = await fetch(`/api/photos?${params}`)
      if (!res.ok) throw new Error("Erreur lors du chargement")

      const data = await res.json()
      setPhotos(data.photos || [])
    } catch (error: unknown) {
      console.error("Erreur lors du chargement des photos:", error)
      alert(error instanceof Error ? error.message : "Impossible de charger les photos")
    } finally {
      setLoading(false)
    }
  }

  const loadLogos = async () => {
    try {
      setLoadingLogos(true)
      const res = await fetch('/api/logos')
      if (!res.ok) throw new Error("Erreur lors du chargement")

      const data = await res.json()
      setLogos(data.logos || [])
    } catch (error: unknown) {
      console.error("Erreur lors du chargement des logos:", error)
      alert(error instanceof Error ? error.message : "Impossible de charger les logos")
    } finally {
      setLoadingLogos(false)
    }
  }

  const loadVideos = async () => {
    try {
      setLoadingVideos(true)
      const res = await fetch('/api/videos')
      if (!res.ok) throw new Error("Erreur lors du chargement")

      const data = await res.json()
      setVideos(data.videos || [])
    } catch (error: unknown) {
      console.error("Erreur lors du chargement des vidéos:", error)
      alert(error instanceof Error ? error.message : "Impossible de charger les vidéos")
    } finally {
      setLoadingVideos(false)
    }
  }

  const loadTestimonials = async () => {
    try {
      setLoadingTestimonials(true)
      const res = await fetch('/api/testimonials')
      if (!res.ok) throw new Error("Erreur lors du chargement")

      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch (error: unknown) {
      console.error("Erreur lors du chargement des témoignages:", error)
      alert(error instanceof Error ? error.message : "Impossible de charger les témoignages")
    } finally {
      setLoadingTestimonials(false)
    }
  }

  const loadPhotoSections = async () => {
    try {
      setLoadingSections(true)
      const res = await fetch('/api/photo-sections')
      if (!res.ok) throw new Error("Erreur lors du chargement")

      const data = await res.json()
      setPhotoSections(data.sections || [])
    } catch (error: unknown) {
      console.error("Erreur lors du chargement des sections:", error)
      alert(error instanceof Error ? error.message : "Impossible de charger les sections")
    } finally {
      setLoadingSections(false)
    }
  }

  const loadSiteSettings = async () => {
    try {
      setLoadingSettings(true)
      const response = await fetch('/api/settings')
      if (!response.ok) throw new Error('Erreur chargement paramètres')
      const data = await response.json()
      setSiteSettings(data)
    } catch (error: unknown) {
      console.error('Erreur chargement paramètres:', error)
      alert(error instanceof Error ? error.message : "Impossible de charger les paramètres")
    } finally {
      setLoadingSettings(false)
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTIONS CRUD - PHOTOS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto({ ...newPhoto, file: e.target.files[0] })
    }
  }

  const handleUpload = async () => {
    if (!newPhoto.file) {
      alert("Veuillez sélectionner un fichier")
      return
    }

    if (!newPhoto.description.trim()) {
      alert("Veuillez ajouter une description")
      return
    }

    try {
      setUploading(true)

      // 1. Upload du fichier
      const formData = new FormData()
      formData.append("file", newPhoto.file)

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!uploadRes.ok) throw new Error("Erreur lors de l'upload")

      const { url } = await uploadRes.json()

      // 2. Créer l'entrée dans la base de données
      const photoRes = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          description: newPhoto.description,
          location: newPhoto.location || null,
          month: newPhoto.month,
          theme_id: newPhoto.theme_id,
          section_id: newPhoto.section_id,
          is_active: true,
          display_order: photos.length + 1
        })
      })

      if (!photoRes.ok) throw new Error("Erreur lors de la création")

      alert("✅ Photo ajoutée avec succès !")

      // Réinitialiser le formulaire
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      setNewPhoto({
        file: null,
        description: "",
        location: "",
        month: null,
        theme_id: null,
        section_id: null
      })

      // Recharger les photos
      loadPhotos()
    } catch (error: unknown) {
      console.error("Erreur lors de l'ajout de la photo:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de l'ajout de la photo")
    } finally {
      setUploading(false)
    }
  }

  const togglePhotoActive = async (photoId: string) => {
    try {
      const photo = photos.find(p => p.id === photoId)
      if (!photo) return

      const res = await fetch(`/api/photos/${photoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !photo.is_active })
      })

      if (!res.ok) throw new Error("Erreur")

      setPhotos(photos.map(p =>
        p.id === photoId ? { ...p, is_active: !p.is_active } : p
      ))
    } catch (error: unknown) {
      console.error("Erreur lors de la mise à jour:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de la mise à jour")
    }
  }

  const deletePhoto = async (photoId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) return

    try {
      const res = await fetch(`/api/photos/${photoId}`, {
        method: "DELETE"
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")

      alert("Photo supprimée avec succès")
      loadPhotos()
    } catch (error: unknown) {
      console.error("Erreur lors de la suppression:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de la suppression")
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTIONS CRUD - LOGOS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleAddLogo = async () => {
    if (!newLogo.name.trim() || !newLogo.full_name.trim() || !newLogo.logo_path.trim()) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    try {
      const res = await fetch('/api/logos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLogo)
      })

      if (!res.ok) throw new Error("Erreur lors de l'ajout")

      alert("Logo ajouté avec succès")
      setNewLogo({
        name: "",
        full_name: "",
        logo_path: "",
        fallback: "",
        color: "#39837a"
      })
      loadLogos()
    } catch (error: unknown) {
      console.error("Erreur lors de l'ajout du logo:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de l'ajout du logo")
    }
  }

  const toggleLogoActive = async (logoId: string) => {
    try {
      const logo = logos.find(l => l.id === logoId)
      if (!logo) return

      const res = await fetch(`/api/logos/${logoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !logo.is_active })
      })

      if (!res.ok) throw new Error("Erreur")

      setLogos(logos.map(l =>
        l.id === logoId ? { ...l, is_active: !l.is_active } : l
      ))
    } catch (error: unknown) {
      console.error("Erreur lors de la mise à jour:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de la mise à jour")
    }
  }

  const deleteLogo = async (logoId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce logo ?")) return

    try {
      const res = await fetch(`/api/logos/${logoId}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")

      alert("Logo supprimé avec succès")
      loadLogos()
    } catch (error: unknown) {
      console.error("Erreur lors de la suppression:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de la suppression")
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTIONS UTILITAIRES
  // ═══════════════════════════════════════════════════════════════════════════

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error: unknown) {
      console.error("Erreur lors de la déconnexion:", error)
      alert(error instanceof Error ? error.message : "Erreur lors de la déconnexion")
    }
  }

  // Filtrer les photos
  const filteredPhotos = photos.filter(photo => {
    if (searchTerm && !photo.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    if (filterMonth && photo.month !== filterMonth) {
      return false
    }

    if (filterTheme && photo.theme_id !== filterTheme) {
      return false
    }

    if (filterSection) {
      if (filterSection === "none" && photo.section_id !== null) {
        return false
      }
      if (filterSection !== "none" && photo.section_id !== filterSection) {
        return false
      }
    }

    if (filterStatus === "active" && !photo.is_active) {
      return false
    }
    if (filterStatus === "inactive" && photo.is_active) {
      return false
    }

    return true
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU - LOADER
  // ═══════════════════════════════════════════════════════════════════════════

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-odillon-teal mx-auto mb-4" />
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDU PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* EN-TÊTE */}
        {/* ═════════════════════════════════════════════════════════════════ */}

        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-odillon-teal to-odillon-lime flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              Panneau d'Administration
            </h1>
            <p className="text-gray-600">
              Gérez le contenu de votre site web Odillon
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="shadow-sm">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* GUIDE D'UTILISATION */}
        {/* ═════════════════════════════════════════════════════════════════ */}

        <AdminGuide />

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* RECHERCHE GLOBALE */}
        {/* ═════════════════════════════════════════════════════════════════ */}

        <Card className="mb-6 shadow-md border-blue-100">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher dans toutes les sections..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="pl-10 bg-white"
              />
              {commandSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCommandSearch("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* NAVIGATION PAR ONGLETS */}
        {/* ═════════════════════════════════════════════════════════════════ */}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

          {/* Liste des onglets */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-white shadow-md">
            <TabsTrigger
              value="photos"
              className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Photos Hero</span>
            </TabsTrigger>

            <TabsTrigger
              value="logos"
              className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              <Building2 className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Logos</span>
            </TabsTrigger>

            <TabsTrigger
              value="videos"
              className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <Video className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Vidéos</span>
            </TabsTrigger>

            <TabsTrigger
              value="testimonials"
              className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
            >
              <Quote className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Témoignages</span>
            </TabsTrigger>

            <TabsTrigger
              value="calendar"
              className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Calendrier</span>
            </TabsTrigger>

            <TabsTrigger
              value="settings"
              className="flex flex-col sm:flex-row items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-gray-700 data-[state=active]:text-white"
            >
              <SettingsIcon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Paramètres</span>
            </TabsTrigger>
          </TabsList>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ONGLET : PHOTOS HERO */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <TabsContent value="photos" className="space-y-6">
            <Card className="shadow-lg border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <ImageIcon className="w-5 h-5" />
                  Gestion des Photos Hero
                  <Badge variant="secondary" className="ml-auto">
                    {filteredPhotos.length} photos
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">

                {/* Filtres */}
                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Recherche
                    </label>
                    <Input
                      placeholder="Rechercher par description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Mois
                    </label>
                    <Select
                      value={filterMonth?.toString() || "all"}
                      onValueChange={(value) => setFilterMonth(value === "all" ? null : Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les mois" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les mois</SelectItem>
                        {months.map((month, index) => (
                          <SelectItem key={index + 1} value={(index + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Statut
                    </label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="active">Actifs</SelectItem>
                        <SelectItem value="inactive">Inactifs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setFilterMonth(null)
                      setFilterStatus("all")
                      setFilterTheme(null)
                      setFilterSection(null)
                    }}
                    className="self-end"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>

                {/* Formulaire d'ajout */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter une nouvelle photo
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Fichier image
                      </label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description *
                      </label>
                      <Input
                        placeholder="Description de la photo"
                        value={newPhoto.description}
                        onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Mois
                      </label>
                      <Select
                        value={newPhoto.month?.toString() || ""}
                        onValueChange={(value) => setNewPhoto({ ...newPhoto, month: value ? Number(value) : null })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Sélectionner un mois" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month, index) => (
                            <SelectItem key={index + 1} value={(index + 1).toString()}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Thème
                      </label>
                      <Select
                        value={newPhoto.theme_id || ""}
                        onValueChange={(value) => setNewPhoto({ ...newPhoto, theme_id: value || null })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Sélectionner un thème" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-theme">Aucun thème</SelectItem>
                          {MONTHLY_THEMES.map((theme) => (
                            <SelectItem key={theme.id} value={theme.id}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleUpload}
                    disabled={uploading || !newPhoto.file || !newPhoto.description}
                    className="mt-4 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Upload en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Ajouter la photo
                      </>
                    )}
                  </Button>
                </div>

                {/* Liste des photos */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Photos existantes ({filteredPhotos.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadPhotos}
                      disabled={loading}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Actualiser
                    </Button>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600">Chargement...</p>
                    </div>
                  ) : filteredPhotos.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-600">Aucune photo trouvée</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPhotos.map((photo) => (
                        <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative aspect-video bg-gray-100">
                            <img
                              src={photo.url}
                              alt={photo.description}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Badge variant={photo.is_active ? "default" : "secondary"}>
                                {photo.is_active ? "Actif" : "Inactif"}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="pt-4">
                            <p className="text-sm font-medium mb-2">{photo.description}</p>
                            {photo.month && (
                              <Badge variant="outline" className="mb-2">
                                {months[photo.month - 1]}
                              </Badge>
                            )}
                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => togglePhotoActive(photo.id)}
                                className="flex-1"
                              >
                                {photo.is_active ? (
                                  <><EyeOff className="w-3 h-3 mr-1" /> Désactiver</>
                                ) : (
                                  <><Eye className="w-3 h-3 mr-1" /> Activer</>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deletePhoto(photo.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ONGLET : LOGOS */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <TabsContent value="logos" className="space-y-6">
            <Card className="shadow-lg border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Building2 className="w-5 h-5" />
                  Gestion des Logos Partenaires
                  <Badge variant="secondary" className="ml-auto">
                    {logos.length} logos
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">

                {/* Formulaire d'ajout de logo */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter un nouveau logo
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nom court (ex: ACME)"
                      value={newLogo.name}
                      onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })}
                    />
                    <Input
                      placeholder="Nom complet"
                      value={newLogo.full_name}
                      onChange={(e) => setNewLogo({ ...newLogo, full_name: e.target.value })}
                    />
                    <Input
                      placeholder="URL du logo"
                      value={newLogo.logo_path}
                      onChange={(e) => setNewLogo({ ...newLogo, logo_path: e.target.value })}
                      className="md:col-span-2"
                    />
                    <Input
                      placeholder="Initiales (ex: AC)"
                      value={newLogo.fallback}
                      onChange={(e) => setNewLogo({ ...newLogo, fallback: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newLogo.color}
                        onChange={(e) => setNewLogo({ ...newLogo, color: e.target.value })}
                        className="w-20"
                      />
                      <Input
                        value={newLogo.color}
                        onChange={(e) => setNewLogo({ ...newLogo, color: e.target.value })}
                        placeholder="#39837a"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddLogo}
                    disabled={!newLogo.name || !newLogo.full_name || !newLogo.logo_path}
                    className="mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter le logo
                  </Button>
                </div>

                {/* Liste des logos */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Logos existants ({logos.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadLogos}
                      disabled={loadingLogos}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${loadingLogos ? 'animate-spin' : ''}`} />
                      Actualiser
                    </Button>
                  </div>

                  {loadingLogos ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
                      <p className="text-gray-600">Chargement...</p>
                    </div>
                  ) : logos.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-600">Aucun logo trouvé</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {logos.map((logo) => (
                        <Card key={logo.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div
                                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                                style={{ backgroundColor: logo.color }}
                              >
                                {logo.fallback}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{logo.full_name}</p>
                                <p className="text-sm text-gray-500">{logo.name}</p>
                                <Badge variant={logo.is_active ? "default" : "secondary"} className="mt-1">
                                  {logo.is_active ? "Actif" : "Inactif"}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleLogoActive(logo.id)}
                                className="flex-1"
                              >
                                {logo.is_active ? (
                                  <><EyeOff className="w-3 h-3 mr-1" /> Désactiver</>
                                ) : (
                                  <><Eye className="w-3 h-3 mr-1" /> Activer</>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteLogo(logo.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ONGLET : VIDÉOS (Placeholder) */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <TabsContent value="videos" className="space-y-6">
            <Card className="shadow-lg border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Video className="w-5 h-5" />
                  Gestion des Vidéos
                  <Badge variant="secondary" className="ml-auto">
                    {videos.length} vidéos
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12 bg-purple-50 rounded-lg">
                  <Video className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    Section Vidéos
                  </h3>
                  <p className="text-purple-700 mb-4">
                    Cette section sera disponible dans la prochaine mise à jour
                  </p>
                  <p className="text-sm text-purple-600">
                    Fonctionnalités à venir : Ajout de vidéos YouTube, Vimeo, vidéos directes, catégorisation, etc.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ONGLET : TÉMOIGNAGES (Placeholder) */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <TabsContent value="testimonials" className="space-y-6">
            <Card className="shadow-lg border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Quote className="w-5 h-5" />
                  Gestion des Témoignages
                  <Badge variant="secondary" className="ml-auto">
                    {testimonials.length} témoignages
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12 bg-orange-50 rounded-lg">
                  <Quote className="w-16 h-16 text-orange-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    Section Témoignages
                  </h3>
                  <p className="text-orange-700 mb-4">
                    Cette section sera disponible dans la prochaine mise à jour
                  </p>
                  <p className="text-sm text-orange-600">
                    Fonctionnalités à venir : Ajout de témoignages clients, gestion des avatars, etc.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ONGLET : CALENDRIER */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <TabsContent value="calendar" className="space-y-6">
            <Card className="shadow-lg border-pink-200">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-pink-900">
                  <CalendarDays className="w-5 h-5" />
                  Calendrier des Événements du Gabon
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Calendrier */}
                  <div>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      className="rounded-md border"
                      modifiers={{
                        hasEvent: (date) => hasEvent(date)
                      }}
                      modifiersStyles={{
                        hasEvent: {
                          fontWeight: 'bold',
                          backgroundColor: '#fce7f3',
                          color: '#ec4899'
                        }
                      }}
                    />
                  </div>

                  {/* Informations sur l'événement sélectionné */}
                  <div className="space-y-4">
                    {selectedEvent ? (
                      <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                        <h3 className="font-semibold text-pink-900 mb-2">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-sm text-pink-700 mb-3">
                          {selectedEvent.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-pink-600">
                          <CalendarDays className="w-4 h-4" />
                          <span>
                            {selectedDate.toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        {selectedEvent.type && (
                          <Badge className="mt-2" variant="outline">
                            {selectedEvent.type}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-600">
                          Sélectionnez une date pour voir les événements
                        </p>
                      </div>
                    )}

                    {/* Prochains événements */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Prochains événements
                      </h3>
                      <div className="space-y-2">
                        {getUpcomingEvents(5).map((event, index) => (
                          <div
                            key={index}
                            className="p-3 bg-white rounded-lg border hover:border-pink-300 transition-colors"
                          >
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {event.date.toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long'
                              })}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ONGLET : PARAMÈTRES */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-gray-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <SettingsIcon className="w-5 h-5" />
                  Paramètres du Site
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <SettingsIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Paramètres Globaux
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Cette section sera disponible dans la prochaine mise à jour
                  </p>
                  <p className="text-sm text-gray-600">
                    Fonctionnalités à venir : Activation/désactivation de sections, images CTA, etc.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
