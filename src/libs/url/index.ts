import { Nullable } from "@hazae41/option"

export function urlOf(hrefOrUrl: string | URL, search: Record<string, Nullable<any>> = {}) {
  const url = new URL(hrefOrUrl, location.href)

  for (const key in search)
    if (search[key] == null)
      url.searchParams.delete(key)
    else
      url.searchParams.set(key, search[key])

  return url
}


export function pathOf(pathOrUrl: string | URL) {
  const url = new URL(pathOrUrl, location.href)
  return url.pathname + url.search + url.hash
}
