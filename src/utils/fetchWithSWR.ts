import axios from 'axios'

import useSWRInfinite from 'swr/infinite'

import type { OdAPIResponse } from '@/types'

import { getStoredToken } from './protectedRouteHandler'

// Common axios fetch function for use with useSWR
export async function fetcher([url, pass]: [url: string, pass?: string]): Promise<any> {
  try {
    if (!pass) pass = ''
    return (
      await (pass
        ? axios.get(url, {
            headers: { 'opt-auth-pass': pass },
          })
        : axios.get(url))
    ).data
  } catch (err: any) {
    throw { status: err.response.status, message: err.response.data }
  }
}

/**
 * Paging with useSWRInfinite + protected token support
 * @param path Current query directory path
 * @returns useSWRInfinite API
 */
export function useProtectedSWRInfinite(path: string = '') {
  const pass = getStoredToken(path)

  /**
   * Next page infinite loading for useSWR
   * @param pageIndex The index of this paging collection
   * @param previousPageData Previous page information
   * @returns API to the next page
   */
  function getNextKey(pageIndex: number, previousPageData: OdAPIResponse): (string | null)[] | null {
    // Reached the end of the collection
    if (previousPageData && !previousPageData.folder) return null

    // First page with no prevPageData
    if (pageIndex === 0) return [`/api?path=${path}`, pass]

    // Add nextPage token to API endpoint
    return [`/api?path=${path}&next=${previousPageData.next}`, pass]
  }

  // Disable auto-revalidate, these options are equivalent to useSWRImmutable
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  const revalidationOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  }
  return useSWRInfinite(getNextKey, fetcher, revalidationOptions)
}
