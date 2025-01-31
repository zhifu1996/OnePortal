import { NextRequest } from 'next/server'
import CryptoJS from 'crypto-js'

import apiConfig from '../../../config/api.config'

export const runtime = 'edge'

export default async function handler(req: NextRequest): Promise<Response> {
  const { text = '' } = Object.fromEntries(req.nextUrl.searchParams)

  if (text === '') {
    return new Response('Token not found', { status: 400 })
  }

  const encryptedToken = CryptoJS.AES.encrypt(text, apiConfig.aesKey).toString()
  return new Response(encryptedToken, { status: 200 })
}
