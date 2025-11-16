import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Met à jour la session Supabase et protège les routes admin
 * 
 * Bonnes pratiques :
 * - Vérifie l'authentification pour les routes /admin/* (sauf /admin/login)
 * - Met à jour les cookies de session automatiquement
 * - Redirige vers /admin/login si non authentifié
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Mettre à jour la session
  const { data: { user } } = await supabase.auth.getUser()

  // Protéger les routes admin (sauf /admin/login)
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && !user) {
    // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à /admin/login, rediriger vers /admin/photos
  if (isLoginPage && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/photos'
    return NextResponse.redirect(url)
  }

  return response
}

