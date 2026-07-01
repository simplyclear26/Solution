import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createToken } from '@/lib/tokens'
import { sendMagicLink, sendPurchaseNotification } from '@/lib/emails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const email        = session.customer_email ?? session.customer_details?.email ?? ''
    const name         = (session.metadata?.name ?? session.customer_details?.name ?? 'there').trim()
    const organisation = session.customer_details?.address?.city ?? ''

    if (!email) {
      console.error('No email found in session')
      return NextResponse.json({ error: 'No email' }, { status: 400 })
    }

    try {
      // Create a unique 90-day access token
      const token = await createToken({
        email,
        name,
        organisation,
        stripeSessionId: session.id,
      })

      // Send magic link to customer
      await sendMagicLink(email, name, token)

      // Send notification to Simply Clear
      await sendPurchaseNotification(name, email, organisation, token)

      console.log(`Purchase processed for ${email} — token created`)
    } catch (err) {
      console.error('Error processing purchase:', err)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

// Required for Stripe webhook — disable body parsing
