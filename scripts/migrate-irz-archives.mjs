import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseDocument } from 'yaml'

const DEFAULT_SOURCE = '/Users/art/dev/old-static-irz-old/_posts'
const DEFAULT_DEST = '/Users/art/Dropbox/dev/arthak.fr'
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

export const splitFrontmatter = source => {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/)
  if (!match) return { raw: '', data: {}, body: source }

  const document = parseDocument(match[1], { prettyErrors: false, strict: false, uniqueKeys: false })
  const data = document.toJS() || {}
  return { raw: match[0], yaml: match[1], data, body: source.slice(match[0].length) }
}

export const cleanSlug = value => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/le28099(?=[a-z])/gi, 'l')
  .replace(/(?:8217|28099)/g, '')
  .replace(/[_]+/g, '-')
  .replace(/[^a-zA-Z0-9-]+/g, '-')
  .replace(/-{2,}/g, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase()

export const plainText = body => body
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/\{%[\s\S]*?%\}/g, ' ')
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[#*_`>|~]/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&#8217;|&rsquo;/gi, '’')
  .replace(/\s+/g, ' ')
  .trim()

export const makeExcerpt = (data, body, limit = 180) => {
  const source = plainText(String(data.excerpt || '')) || plainText(body)
  if (source.length <= limit) return source
  const cut = source.slice(0, limit + 1)
  return `${cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : limit).trim()}…`
}

export const displayTitle = (data, body, fallbackSlug) => {
  const title = plainText(String(data.title || ''))
  if (title && title.toLowerCase() !== 'no content found') return title

  const heading = body.match(/^#{1,3}\s+(.+)$/m)?.[1]
  if (heading) return plainText(heading)

  const text = plainText(body)
  if (text) return text.split(/[.!?]/, 1)[0].slice(0, 90).trim()

  return fallbackSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}

export const replaceMediaUrls = source => source
  .replace(/https?:\/\/static\.irz\.fr\//gi, 'https://archives.irz.fr/wp-content/uploads/')
  .replace(/\/\/static\.irz\.fr\//gi, 'https://archives.irz.fr/wp-content/uploads/')

const dateFrom = (data, filename) => {
  const fromName = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/)
  const raw = data.date instanceof Date ? data.date.toISOString() : String(data.date || '')
  const fromData = raw.match(/(\d{4})-(\d{2})-(\d{2})/)
  const parts = fromData || fromName
  if (!parts) throw new Error(`Date introuvable pour ${filename}`)
  return { iso: `${parts[1]}-${parts[2]}-${parts[3]}`, year: parts[1], month: Number(parts[2]), day: Number(parts[3]) }
}

const oldUrlFrom = (data, date, originalSlug) => {
  const link = String(data.link || '').trim()
  if (link && /^https?:\/\//.test(link)) return link
  return `https://archives.irz.fr/${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}/${originalSlug}/`
}

const scoreReview = ({ body, title, imageCount, wordCount }) => {
  const reasons = []
  if (!plainText(body)) reasons.push('contenu vide ou uniquement composé d’un embed inutilisable')
  if (title.toLowerCase() === 'no content found') reasons.push('titre perdu')
  if (wordCount < 15) reasons.push(`contenu très court: ${wordCount} mots`)
  if (imageCount > 0 && wordCount === 0) reasons.push('publication uniquement visuelle')
  return reasons
}

export async function migrate({ source = DEFAULT_SOURCE, destination = DEFAULT_DEST } = {}) {
  const sourceFiles = (await readdir(source)).filter(name => name.endsWith('.markdown')).sort()
  const postsRoot = path.join(destination, 'src/fr/posts')
  const records = []
  const usedPaths = new Map()

  for (const filename of sourceFiles) {
    const input = await readFile(path.join(source, filename), 'utf8')
    const { data, body } = splitFrontmatter(input)
    const date = dateFrom(data, filename)
    const filenameSlug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.markdown$/, '')
    const originalSlug = String(data.slug || filenameSlug)
    const baseSlug = cleanSlug(originalSlug) || cleanSlug(filenameSlug) || `post-${date.iso}`
    let slug = baseSlug
    let collision = 2
    while (usedPaths.has(`${date.year}/${slug}`)) slug = `${baseSlug}-${collision++}`
    usedPaths.set(`${date.year}/${slug}`, filename)

    const migrated = replaceMediaUrls(input)
    const output = path.join(postsRoot, date.year, `${slug}.md`)
    await mkdir(path.dirname(output), { recursive: true })
    await writeFile(output, migrated)

    const title = displayTitle(data, body, slug)
    const excerpt = makeExcerpt(data, body)
    const words = plainText(body).match(/[\p{L}\p{N}’'-]+/gu) || []
    const images = [...migrated.matchAll(/https:\/\/archives\.irz\.fr\/wp-content\/uploads\/[^\s)'"<>]+/gi)].map(match => match[0].replace(/[.,;:]$/, ''))
    const url = `/fr/posts/${date.year}/${slug}/`

    records.push({
      source: filename,
      oldUrl: oldUrlFrom(data, date, originalSlug),
      destination: path.relative(destination, output),
      url,
      date: date.iso,
      year: date.year,
      slug,
      originalSlug,
      title,
      excerpt,
      wordCount: words.length,
      imageCount: images.length,
      images: [...new Set(images)],
      reviewReasons: scoreReview({ body, title: String(data.title || ''), imageCount: images.length, wordCount: words.length }),
    })
  }

  records.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'fr'))
  await mkdir(path.join(destination, 'data'), { recursive: true })
  await writeFile(path.join(destination, 'data/irz-archive-manifest.json'), `${JSON.stringify(records, null, 2)}\n`)

  const redirects = ['old_url,new_url,status', ...records.map(record => `${record.oldUrl},https://arthak.fr${record.url},301`)]
  await writeFile(path.join(destination, 'data/irz-redirects.csv'), `${redirects.join('\n')}\n`)

  const archive = ['---', 'title: Archives IRZ', '---', '', '# Archives IRZ', '', 'Billets publiés sur IRZ entre 2006 et 2017.', '']
  for (const year of [...new Set(records.map(record => record.year))].sort().reverse()) {
    archive.push(`## <a id="${year}"></a>${year}`, '')
    for (const record of records.filter(item => item.year === year)) {
      const label = `${record.day || Number(record.date.slice(8, 10))} ${MONTHS[Number(record.date.slice(5, 7)) - 1]}, ${record.title}${record.excerpt ? `, ${record.excerpt}` : ''}`
      archive.push(`- [${label.replace(/\]/g, '\\]')}](${record.url})`)
    }
    archive.push('')
  }
  await writeFile(path.join(destination, 'src/fr/archives.md'), `${archive.join('\n')}\n`)

  const review = ['# Rapport de revue des archives IRZ', '', `Articles analysés : ${records.length}`, '', 'Aucun billet n’a été supprimé automatiquement.', '']
  const candidates = records.filter(record => record.reviewReasons.length)
  review.push(`## Candidats à examiner (${candidates.length})`, '')
  for (const record of candidates) {
    review.push(`- **${record.date}, ${record.title}**`, `  - Source : \`${record.source}\``, `  - URL : ${record.url}`, `  - Raisons : ${record.reviewReasons.join('; ')}`)
  }
  await writeFile(path.join(destination, 'data/irz-review.md'), `${review.join('\n')}\n`)

  return records
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isMain) {
  const records = await migrate()
  console.log(`Migrés: ${records.length}`)
  console.log(`À examiner: ${records.filter(record => record.reviewReasons.length).length}`)
}
