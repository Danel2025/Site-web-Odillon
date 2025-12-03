import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// POST - Créer un nouveau message de contact
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation des champs requis
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Les champs nom, email, sujet et message sont obligatoires' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Pour les opérations publiques (formulaire de contact), utiliser le service role
    // pour contourner RLS, tout en gardant la validation côté serveur
    // C'est acceptable car c'est une opération publique et les données sont validées
    const supabase = await createClient()
    
    // Utiliser directement Supabase avec le service role pour cette opération publique
    // Note: La validation est faite côté serveur avant l'insertion
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    // Insérer le message dans la base de données
    const { data, error } = await serviceClient
      .from('contact_messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: body.phone?.trim() || null,
          company: body.company?.trim() || null,
          subject: subject.trim(),
          message: message.trim(),
          status: 'new'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de l\'insertion du message:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
        { status: 500 }
      )
    }

    // Envoyer un email de notification à l'administrateur
    // Note: L'envoi d'email est optionnel - si Resend n'est pas configuré, on continue quand même
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        // Import dynamique de Resend pour éviter les problèmes de résolution de module
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        // Fonction pour échapper les caractères HTML (sécurité XSS)
        const escapeHtml = (text: string) => {
          const map: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
          }
          return text.replace(/[&<>"']/g, (m) => map[m])
        }
        
        const safeName = escapeHtml(name)
        const safeEmail = escapeHtml(email)
        const safeSubject = escapeHtml(subject)
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
        const safePhone = body.phone ? escapeHtml(body.phone) : ''
        const safeCompany = body.company ? escapeHtml(body.company) : ''
        const safeDate = new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })
        
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #1A9B8E 0%, #0A1F2C 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
              </div>
              
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
                <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                  <h2 style="color: #1A9B8E; margin-top: 0; font-size: 18px; border-bottom: 2px solid #1A9B8E; padding-bottom: 10px;">
                    Informations de l'expéditeur
                  </h2>
                  <p style="margin: 10px 0;"><strong>Nom :</strong> ${safeName}</p>
                  <p style="margin: 10px 0;"><strong>Email :</strong> <a href="mailto:${safeEmail}" style="color: #1A9B8E;">${safeEmail}</a></p>
                  ${safePhone ? `<p style="margin: 10px 0;"><strong>Téléphone :</strong> <a href="tel:${safePhone}" style="color: #1A9B8E;">${safePhone}</a></p>` : ''}
                  ${safeCompany ? `<p style="margin: 10px 0;"><strong>Entreprise :</strong> ${safeCompany}</p>` : ''}
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                  <h2 style="color: #1A9B8E; margin-top: 0; font-size: 18px; border-bottom: 2px solid #1A9B8E; padding-bottom: 10px;">
                    Sujet
                  </h2>
                  <p style="margin: 0; font-size: 16px; font-weight: 600;">${safeSubject}</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 6px;">
                  <h2 style="color: #1A9B8E; margin-top: 0; font-size: 18px; border-bottom: 2px solid #1A9B8E; padding-bottom: 10px;">
                    Message
                  </h2>
                  <div style="white-space: pre-wrap; margin: 0; color: #374151;">${safeMessage}</div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
                  <p style="margin: 0;">Message reçu le ${safeDate}</p>
                  <p style="margin: 5px 0 0 0;">ID du message : ${data.id}</p>
                </div>
              </div>
            </body>
          </html>
        `

        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'Odillon <noreply@odillon.fr>',
          to: process.env.CONTACT_EMAIL || 'contact@odillon.fr',
          replyTo: email,
          subject: `Nouveau message de contact : ${safeSubject}`,
          html: emailHtml,
        })
      } catch (emailError) {
        // Log l'erreur mais ne bloque pas la réponse
        // Le message est déjà sauvegardé en base de données
        console.error('Erreur lors de l\'envoi de l\'email de notification:', emailError)
      }
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous recontacterons rapidement.',
        id: data.id
      },
      { status: 201 }
    )

  } catch (error: unknown) {
    console.error('Erreur serveur:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer plus tard.' },
      { status: 500 }
    )
  }
}

// GET - Récupérer les messages (pour l'admin, nécessite authentification)
export async function GET(request: Request) {
  const supabase = await createClient()

  // Vérifier l'authentification
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const limit = searchParams.get('limit')

  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  if (limit) {
    query = query.limit(parseInt(limit))
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ messages: data })
}
