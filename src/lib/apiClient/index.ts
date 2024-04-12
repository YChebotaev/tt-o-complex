export * from './createApiClient'
import { createApiClient } from './createApiClient'

export type ApiClient = ReturnType<typeof createApiClient>
