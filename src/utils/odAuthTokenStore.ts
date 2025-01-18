import { KVNamespace } from '@cloudflare/workers-types'

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  const { ODL_KV } = process.env as unknown as { ODL_KV: KVNamespace }

  const accessToken = await ODL_KV.get('access_token')
  const refreshToken = await ODL_KV.get('refresh_token')

  return {
    accessToken,
    refreshToken,
  }
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
}): Promise<void> {
  const { ODL_KV } = process.env as unknown as { ODL_KV: KVNamespace }

  await ODL_KV.put('access_token', accessToken, { expirationTtl: accessTokenExpiry })
  await ODL_KV.put('refresh_token', refreshToken)
}
