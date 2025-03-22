import axios from 'redaxios'

import { getAccessToken } from '.'
import apiConfig from '../../../config/api.config'
import siteConfig from '../../../config/site.config'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const ID_PATTERN = /^[a-zA-Z0-9]+$/
const RESP_HEADERS = {
  'content-type': 'application/json',
  'Cache-Control': apiConfig.cacheControlHeader,
}

function createNullResponse() {
  return new NextResponse(JSON.stringify(null), {
    headers: RESP_HEADERS,
  })
}

export default async function handler(req: NextRequest): Promise<Response> {
  // Get access token from storage
  const accessToken = await getAccessToken()

  // Get item details (specifically, its path) by its unique ID in OneDrive
  const { id = '' } = Object.fromEntries(req.nextUrl.searchParams)

  if (!id || !ID_PATTERN.test(id)) {
    // ID contains characters other than letters and numbers
    return new Response(JSON.stringify({ error: 'Invalid driveItem ID.' }), { status: 400 })
  }

  const itemApi = `${apiConfig.driveApi}/items/${id}`
  try {
    const { data } = await axios.get(itemApi, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        select: 'id,name,parentReference,file,folder',
      },
    })

    // Check if the item is under baseDirectory
    const basePrefix = `/drive/root:${siteConfig.baseDirectory}`
    if (!data.parentReference.path.startsWith(basePrefix)) {
      createNullResponse()
    }

    // Remove baseDirectory
    data.parentReference.path = data.parentReference.path.replace(siteConfig.baseDirectory, '')

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: RESP_HEADERS,
    })
  } catch (error: any) {
    if (error?.status === 404) {
      createNullResponse()
    }

    return new Response(JSON.stringify({ error: error?.data ?? 'Internal server error.' }), {
      status: error?.status ?? 500,
    })
  }
}
