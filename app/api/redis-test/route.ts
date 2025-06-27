// app/api/redis-test/route.ts

import { NextResponse } from 'next/server'
import redis from '@/lib/redis'

export async function GET() {
  try {
    await redis.set('test-key', '👋 Hello from Redis')
    const value = await redis.get('test-key')

    return NextResponse.json({
      success: true,
      message: 'Redis is connected!',
      value,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Redis connection failed',
        error: (error as Error).message,
      },
      { status: 500 }
    )
  }
}
