import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Layout admin avec protection côté serveur
 * Vérifie l'authentification avant de rendre les pages admin
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
  // Note: Le middleware gère déjà la redirection, mais cette vérification
  // ajoute une couche de sécurité supplémentaire côté serveur
  if (!user) {
    redirect('/admin/login')
  }

  return <>{children}</>
}

