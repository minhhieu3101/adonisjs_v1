
import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),

  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Env.schema.number(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Env.schema.number(),

  CACHE_ACCESS_TOKEN_TTL: Env.schema.number(),
  CACHE_REFRESH_TOKEN_TTL: Env.schema.number(),

  CLOUDINARY_API_KEY: Env.schema.string(),
  CLOUDINARY_API_SECRET : Env.schema.string(),
  CLOUDINARY_CLOUD_NAME : Env.schema.string()
})
