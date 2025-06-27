
// lib/redis.ts
declare global {
  var redisClientConnected: boolean | undefined
}

import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL
})

redis.on('error', (err) => console.error('Redis error:', err))

// Connect only once (Next.js hot reload safe)
if (!globalThis.redisClientConnected) {
  redis.connect()
  globalThis.redisClientConnected = true
}

export default redis


