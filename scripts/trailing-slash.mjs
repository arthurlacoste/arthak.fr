import { stat } from 'node:fs/promises'
import path from 'node:path'

export async function getDirectoryRedirect(requestUrl, publicDir) {
  const url = new URL(requestUrl, 'http://localhost')

  if (url.pathname === '/' || url.pathname.endsWith('/')) return null

  const directory = path.resolve(publicDir, `.${decodeURIComponent(url.pathname)}`)
  if (!directory.startsWith(`${path.resolve(publicDir)}${path.sep}`)) return null

  try {
    if (!(await stat(directory)).isDirectory()) return null
  } catch {
    return null
  }

  return `${url.pathname}/${url.search}`
}
