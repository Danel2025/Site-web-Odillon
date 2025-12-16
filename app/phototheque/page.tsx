"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Filter, Calendar, Tag, Image as ImageIcon, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { HeaderPro } from "@/components/layout/header-pro";
import { Footer } from "@/components/layout/footer";
import { MONTHLY_THEMES } from "@/lib/photo-themes";
import { FadeIn } from "@/components/magicui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/shadcn-io/text-generate-effect";

// Types basés sur la structure Supabase
interface Photo {
  id: string;
  url: string;
  description: string;
  location: string | null; // Lieu ou point particulier pour le badge
  event_description?: string; // Description narrative de l'événement
  theme_id: string | null;
  month: number | null;
  year: number | null;
  is_active: boolean;
  display_order: number;
}

interface FilterState {
  themes: string[];
  months: number[];
}

// Utility component for animated height changes
const AnimateChangeInHeight: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <m.div
      className={cn(className, "overflow-hidden")}
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.1, damping: 0.2, ease: "easeIn" }}
    >
      <div ref={containerRef}>{children}</div>
    </m.div>
  );
};

// Lightbox Modal Component
const Lightbox: React.FC<{
  photo: Photo | null;
  onClose: () => void;
}> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (photo) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [photo, onClose]);

  if (!photo) return null;

  const theme = MONTHLY_THEMES.find(t => t.id === photo.theme_id);
  const monthName = photo.month
    ? new Date(2024, photo.month - 1).toLocaleDateString('fr-FR', { month: 'long' })
    : '';
  const fullDate = photo.month && photo.year
    ? new Date(photo.year, photo.month - 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : '';

  // Générer une description narrative de l'événement (même logique que PhotoCard)
  const getEventDescription = (): string => {
    if (photo.event_description) {
      return photo.event_description;
    }

    const parts: string[] = [];
    
    if (theme) {
      if (theme.description) {
        parts.push(`Dans le cadre de ${theme.name}, ${theme.description.toLowerCase()}, cette photo capture un moment significatif de notre engagement.`);
      } else {
        parts.push(`Cette photo illustre notre engagement dans le cadre de ${theme.name.toLowerCase()}.`);
      }
    }
    
    if (monthName && photo.year) {
      parts.push(`Capturée en ${monthName} ${photo.year}, cette image témoigne de nos activités et de notre dynamisme au sein de l'organisation.`);
    } else if (monthName) {
      parts.push(`Capturée en ${monthName}, cette image témoigne de nos activités et de notre dynamisme.`);
    } else if (photo.year) {
      parts.push(`Cette photo de ${photo.year} reflète notre engagement continu envers l'excellence.`);
    }
    
    if (photo.description) {
      const sceneLower = photo.description.toLowerCase();
      if (sceneLower.includes('réunion') || sceneLower.includes('collaboration')) {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" met en lumière notre esprit d'équipe et notre approche collaborative.`);
      } else if (sceneLower.includes('réflexion') || sceneLower.includes('pensée')) {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" illustre notre engagement envers la réflexion stratégique et l'innovation.`);
      } else if (sceneLower.includes('entretien') || sceneLower.includes('embauche')) {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" témoigne de notre processus de recrutement et de développement des talents.`);
      } else {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" reflète notre engagement envers l'excellence et le professionnalisme dans tous nos projets.`);
      }
    }

    if (parts.length === 0) {
      return "Cette photo témoigne de nos activités et de notre engagement envers l'excellence dans tous nos projets et initiatives.";
    }

    return parts.join(' ');
  };

  const eventDescription = getEventDescription();

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <m.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.url}
            alt={photo.description}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white px-4 py-3 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-shrink-0">
                <p className="text-sm font-medium mb-1">{photo.description}</p>
                {(theme || monthName) && (
                  <p className="text-xs text-gray-300">
                    {theme?.name} {monthName && `• ${monthName}`}
                  </p>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <TextGenerateEffect
                  words={eventDescription}
                  className="text-sm font-normal text-gray-200 leading-relaxed"
                  duration={0.3}
                  staggerDelay={0.05}
                />
              </div>
            </div>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};

// Blog-style Photo Card Component
const PhotoCard: React.FC<{
  photo: Photo;
  onClick: () => void;
}> = ({ photo, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(photo.url);

  const handleError = () => {
    setImgSrc(`https://placehold.co/800x600/39837a/ffffff?text=${encodeURIComponent(photo.description)}`);
  };

  const theme = MONTHLY_THEMES.find(t => t.id === photo.theme_id);
  const monthName = photo.month
    ? new Date(2024, photo.month - 1).toLocaleDateString('fr-FR', { month: 'long' })
    : '';
  const fullDate = photo.month && photo.year
    ? new Date(photo.year, photo.month - 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : '';

  // Générer une description narrative de l'événement
  const getEventDescription = (): string => {
    // Si une description d'événement existe déjà, l'utiliser
    if (photo.event_description) {
      return photo.event_description;
    }

    // Sinon, générer une description narrative basée sur le contexte
    const parts: string[] = [];
    
    // Commencer par le contexte de la thématique si disponible
    if (theme) {
      if (theme.description) {
        parts.push(`Dans le cadre de ${theme.name}, ${theme.description.toLowerCase()}, cette photo capture un moment significatif de notre engagement.`);
      } else {
        parts.push(`Cette photo illustre notre engagement dans le cadre de ${theme.name.toLowerCase()}.`);
      }
    }
    
    // Ajouter le contexte temporel
    if (monthName && photo.year) {
      parts.push(`Capturée en ${monthName} ${photo.year}, cette image témoigne de nos activités et de notre dynamisme au sein de l'organisation.`);
    } else if (monthName) {
      parts.push(`Capturée en ${monthName}, cette image témoigne de nos activités et de notre dynamisme.`);
    } else if (photo.year) {
      parts.push(`Cette photo de ${photo.year} reflète notre engagement continu envers l'excellence.`);
    }
    
    // Ajouter le contexte de la scène
    if (photo.description) {
      const sceneLower = photo.description.toLowerCase();
      // Adapter le texte selon le type de scène
      if (sceneLower.includes('réunion') || sceneLower.includes('collaboration')) {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" met en lumière notre esprit d'équipe et notre approche collaborative.`);
      } else if (sceneLower.includes('réflexion') || sceneLower.includes('pensée')) {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" illustre notre engagement envers la réflexion stratégique et l'innovation.`);
      } else if (sceneLower.includes('entretien') || sceneLower.includes('embauche')) {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" témoigne de notre processus de recrutement et de développement des talents.`);
      } else {
        parts.push(`Cette scène de "${photo.description.toLowerCase()}" reflète notre engagement envers l'excellence et le professionnalisme dans tous nos projets.`);
      }
    }

    // Description par défaut si aucune information n'est disponible
    if (parts.length === 0) {
      return "Cette photo témoigne de nos activités et de notre engagement envers l'excellence dans tous nos projets et initiatives.";
    }

    return parts.join(' ');
  };

  const eventDescription = getEventDescription();

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card 
        className="flex flex-col gap-6 rounded-xl border shadow-sm overflow-hidden py-0 cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full"
        onClick={onClick}
      >
        <CardHeader className="p-3 pb-0">
          <div className="relative h-56 w-full rounded-lg overflow-hidden">
            <img
              src={imgSrc}
              alt={photo.description}
              className={cn(
                "h-56 w-full rounded-lg object-cover object-center transition-all duration-500 ease-in-out",
                "group-hover:scale-110",
                {
                  "opacity-0": isLoading,
                  "opacity-100": !isLoading,
                }
              )}
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              onError={handleError}
            />
            {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {photo.location && (
              <Badge 
                variant="outline"
                className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-odillon-teal text-odillon-teal"
              >
                📍 {photo.location}
              </Badge>
            )}
            {theme && (
              <Badge 
                className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent bg-secondary text-secondary-foreground"
                style={{ backgroundColor: theme.color + '20', color: theme.color, borderColor: theme.color + '40' }}
              >
                {theme.name}
              </Badge>
            )}
            {!photo.location && !theme && (
              <Badge 
                variant="outline"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-odillon-teal/30 text-odillon-teal/70 bg-odillon-teal/5"
              >
                <Camera className="h-3 w-3" />
                Photothèque
              </Badge>
            )}
          </div>
          <CardTitle className="font-semibold mb-2 text-xl">
            {photo.description}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {eventDescription}
          </CardDescription>
          {fullDate && (
            <p className="text-xs text-muted-foreground/80 mt-2">
              {fullDate}
            </p>
          )}
        </CardContent>
        {fullDate && (
          <CardFooter className="px-6 pt-0 flex items-center gap-3">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Photothèque Odillon</p>
              <p className="text-muted-foreground text-xs">{fullDate}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </m.div>
  );
};

// Filter Component
const FilterDropdown: React.FC<{
  label: string;
  icon: React.ReactNode;
  options: { value: string | number; label: string }[];
  selected: (string | number)[];
  onSelectionChange: (selected: (string | number)[]) => void;
}> = ({ label, icon, options, selected, onSelectionChange }) => {
  const [open, setOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setTimeout(() => setCommandInput(""), 200);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 border-odillon-teal/30 hover:border-odillon-teal hover:bg-odillon-teal/5"
        >
          {icon}
          {label}
          {selected.length > 0 && (
            <span className="ml-1 rounded-full bg-odillon-teal px-2 py-0.5 text-xs text-white">
              {selected.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <AnimateChangeInHeight>
          <Command>
            <CommandInput
              placeholder={`Rechercher ${label.toLowerCase()}...`}
              className="h-9"
              value={commandInput}
              onValueChange={setCommandInput}
            />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((option) =>
                    option.label.toLowerCase().includes(commandInput.toLowerCase())
                  )
                  .map((option) => {
                    const isSelected = selected.includes(option.value);
                    return (
                      <div
                        key={option.value}
                        className="flex gap-2 items-center cursor-pointer px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                        onClick={() => {
                          const newSelected = isSelected
                            ? selected.filter((s) => s !== option.value)
                            : [...selected, option.value];
                          onSelectionChange(newSelected);
                        }}
                      >
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            const newSelected = checked
                              ? [...selected, option.value]
                              : selected.filter((s) => s !== option.value);
                            onSelectionChange(newSelected);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="flex-1">{option.label}</span>
                      </div>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </AnimateChangeInHeight>
      </PopoverContent>
    </Popover>
  );
};

// Main Gallery Component
export default function PhotothequeePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    months: [],
  });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Fetch photos from API
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/photos?active=true');
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error('Erreur lors du chargement des photos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  // Préparer les options de filtres
  const themeOptions = MONTHLY_THEMES.map(theme => ({
    value: theme.id,
    label: theme.name
  }));

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2024, i).toLocaleDateString('fr-FR', { month: 'long' })
  }));

  // Filtrer les photos
  const filteredPhotos = photos.filter((photo) => {
    const themeMatch =
      filters.themes.length === 0 ||
      (photo.theme_id && filters.themes.includes(photo.theme_id));
    const monthMatch =
      filters.months.length === 0 ||
      (photo.month && filters.months.includes(photo.month));
    return themeMatch && monthMatch;
  });

  const hasActiveFilters = filters.themes.length > 0 || filters.months.length > 0;

  return (
    <>
      <HeaderPro />
      <main className="min-h-screen bg-white pt-[88px] md:pt-[104px]">
        {/* Hero Section with Background - Inspired by About Page */}
        <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-odillon-teal/5 via-white to-odillon-lime/5" />

            {/* Large circle patterns */}
            <div className="absolute -top-24 -right-24 w-96 h-96 border border-odillon-teal/10 rounded-full" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] border border-odillon-lime/10 rounded-full" />

            {/* Smaller decorative circles */}
            <div className="absolute top-1/4 right-1/3 w-32 h-32 border border-odillon-teal/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-odillon-lime/20 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

            {/* Simple grid overlay */}
            <div className="absolute inset-0 opacity-[0.15]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="phototheque-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-odillon-teal"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#phototheque-grid)" />
              </svg>
            </div>

            {/* Subtle dots pattern */}
            <div className="absolute inset-0 opacity-[0.08]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="phototheque-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-odillon-lime" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#phototheque-dots)" />
              </svg>
            </div>

            {/* Floating squares */}
            <div className="absolute top-1/3 left-1/4 w-20 h-20 border-2 border-odillon-teal/15 transform rotate-12 animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-odillon-lime/15 transform -rotate-12 animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />

            {/* Subtle light beams effect */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-odillon-teal/10 to-transparent" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-odillon-lime/10 to-transparent" />

            {/* Radial fade overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/30 to-white/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <FadeIn delay={0.1}>
                <Badge variant="odillon" className="mb-4 md:mb-6">
                  Photothèque
                </Badge>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Découvrez notre{" "}
                  <span className="bg-gradient-to-r from-odillon-teal to-odillon-lime bg-clip-text text-transparent">
                    collection de photos
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Illustrant nos activités, événements et campagnes de sensibilisation
                </p>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Blog-style Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto mb-12 text-center">
            <FadeIn delay={0.4}>
              <p className="text-odillon-teal mb-2 text-sm font-semibold">Notre Collection</p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <h2 className="my-4 text-3xl font-bold">Photothèque</h2>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                Découvrez notre collection de photos illustrant nos activités, événements et campagnes de sensibilisation
              </p>
            </FadeIn>
          </div>

          {/* Filters */}
          <div className="container mx-auto mb-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <FilterDropdown
                label="Thématique"
                icon={<Tag className="h-4 w-4" />}
                options={themeOptions}
                selected={filters.themes}
                onSelectionChange={(themes) =>
                  setFilters((prev) => ({ ...prev, themes: themes as string[] }))
                }
              />
              <FilterDropdown
                label="Mois"
                icon={<Calendar className="h-4 w-4" />}
                options={monthOptions}
                selected={filters.months}
                onSelectionChange={(months) =>
                  setFilters((prev) => ({ ...prev, months: months as number[] }))
                }
              />
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-odillon-teal hover:text-odillon-teal hover:bg-odillon-teal/10"
                  onClick={() => setFilters({ themes: [], months: [] })}
                >
                  Effacer les filtres
                </Button>
              )}
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="font-medium">{filteredPhotos.length}</span> photo{filteredPhotos.length > 1 ? 's' : ''}
              </div>
            </m.div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-odillon-teal border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Chargement des photos...</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && filteredPhotos.length > 0 && (
            <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPhotos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPhotos.length === 0 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-lg text-muted-foreground mb-2">
                {hasActiveFilters
                  ? "Aucune photo ne correspond à vos filtres"
                  : "Aucune photo disponible pour le moment"}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ themes: [], months: [] })}
                  className="mt-4"
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </m.div>
          )}
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      <Lightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}
