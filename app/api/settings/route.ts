import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Récupérer les paramètres du site
export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "main")
      .single()

    if (error) {
      console.error("Erreur lors de la récupération des paramètres:", error)
      // Retourner les valeurs par défaut en cas d'erreur
      return NextResponse.json({
        settings: {
          id: "main",
          show_videos_section: true,
          show_photos_section: true
        }
      })
    }

    return NextResponse.json({ settings: data || {
      id: "main",
      show_videos_section: true,
      show_photos_section: true
    }})
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des paramètres" },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour les paramètres du site
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Vérifier l'authentification
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const { show_videos_section, show_photos_section } = body

    // Valider les données
    if (typeof show_videos_section !== "boolean" && show_videos_section !== undefined) {
      return NextResponse.json(
        { error: "show_videos_section doit être un booléen" },
        { status: 400 }
      )
    }

    if (typeof show_photos_section !== "boolean" && show_photos_section !== undefined) {
      return NextResponse.json(
        { error: "show_photos_section doit être un booléen" },
        { status: 400 }
      )
    }

    // Construire l'objet de mise à jour
    const updateData: Record<string, boolean> = {}
    if (show_videos_section !== undefined) {
      updateData.show_videos_section = show_videos_section
    }
    if (show_photos_section !== undefined) {
      updateData.show_photos_section = show_photos_section
    }

    // Mettre à jour les paramètres
    const { data, error } = await supabase
      .from("site_settings")
      .update(updateData)
      .eq("id", "main")
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la mise à jour:", error)
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour des paramètres" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: "Paramètres mis à jour avec succès",
      settings: data 
    })
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des paramètres" },
      { status: 500 }
    )
  }
}
