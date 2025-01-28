import { KVNamespace } from '@cloudflare/workers-types'

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  const { OPT_KV } = process.env as unknown as { OPT_KV: KVNamespace }

  const accessToken = await OPT_KV.get('access_token')
  const refreshToken = await OPT_KV.get('refresh_token')

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
  const { OPT_KV } = process.env as unknown as { OPT_KV: KVNamespace }

  await OPT_KV.put('access_token', accessToken, { expirationTtl: accessTokenExpiry })
  await OPT_KV.put('refresh_token', refreshToken)
}
