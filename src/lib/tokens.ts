// Magic link token management
// Tokens are stored in Upstash Redis with 90-day expiry
// Each token is tied to a customer's email and purchase

import { v4 as uuidv4 } from 'uuid'

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL!
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
const EXPIRY_SECONDS = 60 * 60 * 24 * 90 // 90 days

interface TokenData {
  email: string
  name: string
  organisation?: string
  stripeSessionId: string
  createdAt: string
  expiresAt: string
}

async function redisCommand(command: string[]): Promise<unknown> {
  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([command]),
  })
  const data = await res.json()
  return data[0]?.result
}

export async function createToken(data: Omit<TokenData, 'createdAt' | 'expiresAt'>): Promise<string> {
  const token = uuidv4()
  const now = new Date()
  const expires = new Date(now.getTime() + EXPIRY_SECONDS * 1000)

  const payload: TokenData = {
    ...data,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  }

  // Store in Redis with expiry
  await fetch(`${UPSTASH_URL}/set/token:${token}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: JSON.stringify(payload),
      ex: EXPIRY_SECONDS,
    }),
  })

  return token
}

export async function validateToken(token: string): Promise<TokenData | null> {
  try {
    const res = await fetch(`${UPSTASH_URL}/get/token:${token}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
    })
    const data = await res.json()
    if (!data.result) return null
    return JSON.parse(data.result) as TokenData
  } catch {
    return null
  }
}

export async function deleteToken(token: string): Promise<void> {
  await fetch(`${UPSTASH_URL}/del/token:${token}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
  })
}
