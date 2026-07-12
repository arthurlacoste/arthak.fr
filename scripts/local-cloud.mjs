import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { watch } from 'node:fs'
import path from 'node:path'
import { buildSite } from '../build.mjs'
import { getDirectoryRedirect } from './trailing-slash.mjs'

const port = Number(process.env.PORT || 4173)
const publicDir = path.resolve('public')
const watched = ['src', 'static', '_layouts', 'style.css', 'build.mjs']
const clients = new Set()
let building = false
let pending = false
let timer = null

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.ico', 'image/x-icon'],
])

const liveReloadScript = `
<script>
  new EventSource('/__reload').addEventListener('reload', () => location.reload())
</script>`

async function buildAndReload(reason = 'initial') {
  if (building) {
    pending = true
    return
  }

  building = true

  try {
    await buildSite()
    console.log(`[local:cloud] built: ${reason}`)
    for (const client of clients) client.write('event: reload\ndata: reload\n\n')
  } catch (error) {
    console.error('[local:cloud] build failed')
    console.error(error)
  } finally {
    building = false
    if (pending) {
      pending = false
      await buildAndReload('pending change')
    }
  }
}

function scheduleBuild(reason) {
  clearTimeout(timer)
  timer = setTimeout(() => buildAndReload(reason), 120)
}

function safePublicPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const cleanPath = decoded === '/' ? '/index.html' : decoded
  const requested = path.resolve(publicDir, `.${cleanPath}`)

  if (!requested.startsWith(publicDir)) return null
  return requested
}

async function resolveFile(filePath) {
  try {
    const info = await stat(filePath)
    if (info.isDirectory()) return path.join(filePath, 'index.html')
    return filePath
  } catch {
    if (filePath.endsWith('.html')) return filePath
    return `${filePath}.html`
  }
}

const server = createServer(async (request, response) => {
  if (request.url === '/__reload') {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })
    response.write('\n')
    clients.add(response)
    request.on('close', () => clients.delete(response))
    return
  }

  const directoryRedirect = await getDirectoryRedirect(request.url || '/', publicDir)
  if (directoryRedirect) {
    response.writeHead(301, { Location: directoryRedirect })
    response.end()
    return
  }

  const safePath = safePublicPath(request.url || '/')
  if (!safePath) {
    response.writeHead(400)
    response.end('Bad request')
    return
  }

  const filePath = await resolveFile(safePath)

  try {
    let body = await readFile(filePath)
    const ext = path.extname(filePath)
    const contentType = mimeTypes.get(ext) || 'application/octet-stream'

    if (ext === '.html') {
      body = Buffer.from(body.toString('utf8').replace('</body>', `${liveReloadScript}\n</body>`))
    }

    response.writeHead(200, { 'Content-Type': contentType })
    response.end(body)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

await buildAndReload()

for (const item of watched) {
  watch(item, { recursive: true }, (_event, filename) => {
    if (!filename) return
    if (String(filename).includes('public')) return
    scheduleBuild(`${item}/${filename}`)
  })
}

server.listen(port, () => {
  console.log(`[local:cloud] http://localhost:${port}`)
  console.log(`[local:cloud] watching ${watched.join(', ')}`)
})
