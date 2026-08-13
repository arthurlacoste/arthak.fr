import { defineMiddleware } from 'astro:middleware'
import { env } from 'cloudflare:workers'

export const onRequest = defineMiddleware(async (context, next) => {
  const runtime = context.locals.runtime
  Object.defineProperty(runtime, 'env', { configurable: true, value: env })
  return next()
})
