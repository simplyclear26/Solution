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

    const email = session.customer_details?.email ?? ''
    const name  = (session.customer_details?.name ?? '').trim()

    // Extract custom fields
    const customFields = session.custom_fields ?? []
    const companyName  = customFields.find(f => f.key === 'company_name')?.text?.value ?? ''
    const abn          = customFields.find(f => f.key === 'abn')?.text?.value ?? ''

    const organisation = companyName || session.customer_details?.address?.city || ''

    if (!email) {
      console.error('No email found in session')
      return NextResponse.json({ error: 'No email' }, { status: 400 })
    }

    if (!name) {
      console.error('No name found in session')
      return NextResponse.json({ error: 'No name' }, { status: 400 })
    }

    try {
      const token = await createToken({
        email,
        name,
        organisation,
        stripeSessionId: session.id,
      })

      await sendMagicLink(email, name, token)
      await sendPurchaseNotification(name, email, organisation, abn, token)

      console.log(`Purchase processed for ${email} — token created`)
    } catch (err) {
      console.error('Error processing purchase:', err)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
