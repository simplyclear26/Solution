import { NextRequest, NextResponse } from 'next/server'
import { validateToken } from '@/lib/tokens'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ valid: false, error: 'No token provided' }, { status: 400 })
  }

  const data = await validateToken(token)

  if (!data) {
    return NextResponse.json({ valid: false, error: 'Invalid or expired token' }, { status: 401 })
  }

  return NextResponse.json({
    valid: true,
    email: data.email,
    name: data.name,
    organisation: data.organisation,
    expiresAt: data.expiresAt,
  })
}
