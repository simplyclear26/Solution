import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solution.simplyclear.work'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        name: name ?? '',
      },
      success_url: `${appUrl}/access?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?cancelled=true`,
      billing_address_collection: 'required',
      custom_text: {
        submit: {
          message: 'Your assessment link will be emailed to you immediately after payment. Includes a 60-minute debrief call with a Simply Clear practitioner.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
