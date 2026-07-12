import { marked } from 'marked'
import { parseDocument } from 'yaml'
import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

// ─── Config ──────────────────────────────────────────────

const sourceDir = 'src'
const staticDir = 'static'
const outputDir = 'public'

const getCssVersion = async () => {
  const css = await readFile('style.css')
  return createHash('sha256').update(css).digest('hex').slice(0, 12)
}

const locale = {
  en: {
    lang: 'en',
    home: '/',
    posts: '/posts/',
    about: '/about/',
    homeLabel: 'home',
    postsLabel: 'posts',
    aboutLabel: 'about',
    bio: 'Tattoo artist and maker in Grenoble, France.',
    text: "“I guess you guys aren't ready for that yet... But your kids are gonna love it.”",
  },
  fr: {
    lang: 'fr',
    home: '/fr/',
    posts: '/fr/posts/',
    about: '/fr/about/',
    homeLabel: 'accueil',
    postsLabel: 'articles',
    aboutLabel: 'à propos',
    bio: 'Tatoueur, dev et maker à Grenoble.',
    text: "« Je suppose que vous n'êtes pas encore prêts pour ça… Mais vos enfants vont adorer. »",
  },
}

// ─── Helpers ─────────────────────────────────────────────

const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

export const parseFrontmatter = markdown => {
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/)
  if (!match) return [{}, markdown]

  const document = parseDocument(match[1], {
    prettyErrors: false,
    strict: false,
    uniqueKeys: false,
  })
  const data = document.toJS() || {}
  return [data, markdown.slice(match[0].length)]
}

export const stripFrontmatter = markdown => parseFrontmatter(markdown)[1]

export const getTitle = markdown => markdown.match(/^#\s+(.+)$/m)?.[1] ?? 'arthak'

export const renderMarkdown = markdown => {
  const definitions = new Map()
  const withoutDefinitions = markdown.replace(/^\[\^([^\]]+)\]:\s+(.+)$/gm, (_, id, text) => {
    definitions.set(id, text.trim())
    return ''
  })

  const used = []
  const withReferences = withoutDefinitions.replace(/\[\^([^\]]+)\]/g, (reference, id) => {
    if (!definitions.has(id)) return reference
    if (!used.includes(id)) used.push(id)
    const number = used.indexOf(id) + 1
    return '<sup class="footnote-ref" id="fnref-' + id + '"><a href="#fn-' + id + '" aria-label="Footnote ' + number + '">' + number + '</a></sup>'
  })

  const body = marked(withReferences)
  if (!used.length) return body

  const notes = used.map((id, index) => {
    const content = marked.parseInline(definitions.get(id))
    return '<li id="fn-' + id + '"><span class="footnote-number">' + (index + 1) + '</span><div>' + content + ' <a class="footnote-backref" href="#fnref-' + id + '" aria-label="Back to reference">↩</a></div></li>'
  }).join('\n')

  return body + '<section class="footnotes" aria-label="Footnotes"><ol>\n' + notes + '\n</ol></section>\n'
}

const formatDate = date => {
  if (!date) return ''
  if (date instanceof Date) return date.toISOString().slice(0, 10)
  return String(date).slice(0, 10)
}

// ─── URL helpers ─────────────────────────────────────────

export const getOutputName = file => {
  if (file === 'index.md') return 'index.html'
  if (file === 'fr/index.md') return 'fr/index.html'
  if (file === 'posts.md') return 'posts/index.html'
  if (file === 'fr/posts.md') return 'fr/posts/index.html'
  const withoutExt = file.replace(/\.md$/, '')
  return `${withoutExt}/index.html`
}

export const getOutputPath = file => path.join(outputDir, getOutputName(file))

const getUrl = file => {
  const name = getOutputName(file)
  if (name === 'index.html') return '/'
  if (name === 'fr/index.html') return '/fr/'
  if (name.endsWith('/index.html')) return '/' + name.slice(0, -10)
  return '/' + name
}

const getAlternateUrl = file => {
  if (file === 'index.md') return '/fr/'
  if (file === 'fr/index.md') return '/'
  if (file === 'posts.md') return '/fr/posts/'
  if (file === 'fr/posts.md') return '/posts/'
  if (file.startsWith('fr/')) return getUrl(file.replace(/^fr\//, ''))
  return '/fr' + getUrl(file)
}

const getPostUrl = file => getUrl(file)

// ─── Data ────────────────────────────────────────────────

const getPostMeta = async file => {
  const markdown = await readFile(path.join(sourceDir, file), 'utf8')
  const [data, body] = parseFrontmatter(markdown)
  const title = data.title || getTitle(body)
  const firstParagraph = body
    .split('\n\n')
    .find(block => !block.trim().startsWith('#'))
    ?.replace(/\n/g, ' ')
    ?.replace(/[#*_`[\]()]/g, '')
    ?.trim()

  return {
    file,
    title,
    date: formatDate(data.date),
    updated: data.updated || '',
    excerpt: data.excerpt || firstParagraph || '',
    url: getPostUrl(file),
  }
}

const POSTS_PER_PAGE = 80

const stripHtml = value => value
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;/gi, "'")
  .replace(/&nbsp;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const truncate = (text, limit = 180) => {
  if (text.length <= limit) return text
  const cut = text.slice(0, limit + 1)
  return `${cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : limit).trim()}…`
}

const formatDateFr = iso => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`
}

const formatMonthYearFr = iso => {
  if (!iso) return ''
  const [y, m] = iso.split('-')
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  return `${months[Number(m) - 1]} ${y}`
}

const formatMonthYear = iso => {
  if (!iso) return ''
  const [y, m] = iso.split('-')
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[Number(m) - 1]} ${y}`
}

const postLine = (post, isFrench) => {
  const date = isFrench ? formatDateFr(post.date) : formatDate(post.date)
  return `<div class="post-item"><span class="post-date">${date}</span><a href="${post.url}">${escapeHtml(post.title)}</a></div>`
}

const paginationNav = (page, totalPages, baseUrl) => {
  if (totalPages <= 1) return ''
  const links = []
  if (page > 1) {
    const prev = page === 2 ? baseUrl : `${baseUrl}page/${page - 1}/`
    links.push(`[← Articles précédents](${prev})`)
  }
  links.push(`${page} / ${totalPages}`)
  if (page < totalPages) {
    links.push(`[Articles suivants →](${baseUrl}page/${page + 1}/)`)
  }
  return links.join(' &nbsp;·&nbsp; ')
}

export const buildPostsPages = async isFrench => {
  const prefix = isFrench ? 'fr/posts/' : 'posts/'
  const files = (await listMarkdownFiles())
    .filter(file => file.startsWith(prefix))
    .filter(file => file !== 'posts.md' && file !== 'fr/posts.md')

  const posts = await Promise.all(files.map(getPostMeta))
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title))

  const title = isFrench ? 'Articles' : 'Posts'
  const baseUrl = isFrench ? '/fr/posts/' : '/posts/'

  if (!posts.length) {
    return [{
      page: 1,
      totalPages: 1,
      markdown: `# ${title}\n\n${isFrench ? 'Aucun article pour le moment.' : 'No posts yet.'}\n`,
      outputPath: isFrench ? 'public/fr/posts/index.html' : 'public/posts/index.html',
    }]
  }

  const pages = []
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  for (let i = 0; i < totalPages; i++) {
    const slice = posts.slice(i * POSTS_PER_PAGE, (i + 1) * POSTS_PER_PAGE)
    const items = slice.map(post => postLine(post, isFrench)).join('\n')
    const nav = paginationNav(i + 1, totalPages, baseUrl)
    const heading = i === 0 ? `# ${title}\n\n` : ''
    const markdown = `${heading}<div class="posts-list">\n${items}\n</div>\n\n${nav}\n`
    const outputPath = i === 0
      ? (isFrench ? 'public/fr/posts/index.html' : 'public/posts/index.html')
      : (isFrench ? `public/fr/posts/page/${i + 1}/index.html` : `public/posts/page/${i + 1}/index.html`)

    pages.push({ page: i + 1, totalPages, markdown, outputPath })
  }

  return pages
}

// ─── Template ────────────────────────────────────────────

let _layouts = {}
let _baseLayout
let _topbar

const getBaseLayout = async () => {
  if (!_baseLayout) _baseLayout = await readFile('_layouts/base.html', 'utf8')
  return _baseLayout
}

const getTopbar = async () => {
  if (!_topbar) _topbar = await readFile('_includes/topbar.html', 'utf8')
  return _topbar
}

const getLayout = async name => {
  if (name === 'post') name = 'default'

  if (typeof name !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/i.test(name)) {
    throw new Error(`Invalid layout name: ${String(name)}`)
  }

  if (!_layouts[name]) {
    try {
      _layouts[name] = await readFile(`_layouts/${name}.html`, 'utf8')
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Layout "${name}" not found: _layouts/${name}.html`)
      }
      throw error
    }
  }
  return _layouts[name]
}

const headingSlug = value => value
  .replace(/<[^>]+>/g, '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

export const addHeadingIds = html => {
  const counts = new Map()

  return html.replace(/<h([23])(\s[^>]*)?>(.*?)<\/h\1>/gi, (heading, level, attributes = '', content) => {
    if (/\sid="[^"]+"/i.test(attributes)) return heading

    const base = headingSlug(content) || 'section'
    const count = (counts.get(base) || 0) + 1
    counts.set(base, count)
    const id = count === 1 ? base : `${base}-${count}`
    return `<h${level}${attributes} id="${id}">${content}</h${level}>`
  })
}

export const buildToc = html => {
  const headings = []
  const re = /<h([23])\s*(?:id="([^"]*)")?[^>]*>(.*?)<\/h\1>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const level = Number(m[1])
    const id = m[2] || headingSlug(m[3])
    const text = m[3].replace(/<[^>]+>/g, '')
    headings.push({ level, id, text })
  }
  if (!headings.length) return ''
  let currentSection = '__root__'
  const subsectionCounts = new Map()
  for (const heading of headings) {
    if (heading.level === 2) currentSection = heading.id
    if (heading.level === 3) {
      subsectionCounts.set(currentSection, (subsectionCounts.get(currentSection) || 0) + 1)
    }
  }

  currentSection = '__root__'
  const visibleHeadings = headings.filter(heading => {
    if (heading.level === 2) {
      currentSection = heading.id
      return true
    }
    return (subsectionCounts.get(currentSection) || 0) <= 3
  })

  const items = visibleHeadings.map(h => {
    const indent = h.level === 3 ? ' class="toc-sub"' : ''
    return `<li${indent}><a href="#${h.id}">${h.text}</a></li>`
  })
  return `<ul>\n${items.join('\n')}\n</ul>`
}

export const renderPage = async (title, html, file = 'index.md', { layout = 'default', toc = '' } = {}) => {
  const baseLayout = await getBaseLayout()
  const pageLayout = await getLayout(layout)
  const topbar = await getTopbar()
  const cssVersion = await getCssVersion()

  const isFrench = file.startsWith('fr/')
  const l = locale[isFrench ? 'fr' : 'en']
  const alternateL = locale[isFrench ? 'en' : 'fr']

  return baseLayout
    .replace('{{page}}', pageLayout)
    .replace('{{topbar}}', topbar)
    .replace('{{lang}}', l.lang)
    .replace('{{title}}', escapeHtml(title))
    .replace('{{css_version}}', cssVersion)
    .replace('{{canonical}}', getUrl(file))
    .replace('{{alternate_hreflang}}', alternateL.lang)
    .replace('{{alternate_href}}', getAlternateUrl(file))
    .replace('{{en_href}}', isFrench ? getAlternateUrl(file) : getUrl(file))
    .replace('{{en_class}}', isFrench ? '' : 'active')
    .replace('{{fr_href}}', isFrench ? getUrl(file) : getAlternateUrl(file))
    .replace('{{fr_class}}', isFrench ? 'active' : '')
    .replace('{{home_href}}', l.home)
    .replace('{{posts_href}}', l.posts)
    .replace('{{about_href}}', l.about)
    .replace('{{home_label}}', l.homeLabel)
    .replace('{{posts_label}}', l.postsLabel)
    .replace('{{about_label}}', l.aboutLabel)
    .replace('{{bio}}', l.bio)
    .replace('{{text}}', l.text)
    .replace('{{toc}}', toc)
    .replace('{{content}}', html)
}

// ─── Build ───────────────────────────────────────────────

export async function listMarkdownFiles(dir = sourceDir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(prefix, entry.name)

    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(fullPath, relativePath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relativePath)
    }
  }

  return files.sort()
}

export async function buildSite() {
  await rm(outputDir, { recursive: true, force: true })
  await mkdir(outputDir, { recursive: true })
  await cp(staticDir, outputDir, { recursive: true, force: true })

  const markdownFiles = await listMarkdownFiles()

  for (const file of markdownFiles) {
    if (file === 'posts.md' || file === 'fr/posts.md') continue

    const markdown = await readFile(path.join(sourceDir, file), 'utf8')
    const [data, bodyMarkdown] = parseFrontmatter(markdown)
    const title = data.title || getTitle(bodyMarkdown)
    const layout = data.layout || 'default'
    let body = renderMarkdown(bodyMarkdown)

    if ((file.startsWith('posts/') || file.startsWith('fr/posts/')) && !body.startsWith('<h1>')) {
      const postIsFrench = file.startsWith('fr/')
      const dateStr = formatDate(data.date)
      const dateLabel = postIsFrench ? formatDateFr(dateStr) : dateStr
      const updatedStr = data.updated
        ? postIsFrench ? ` (mise à jour ${formatMonthYearFr(data.updated)})` : ` (updated ${formatMonthYear(data.updated)})`
        : ''
      body = `<h1>${escapeHtml(title)}</h1>\n<p class="post-date"><time datetime="${dateStr}">${escapeHtml(dateLabel)}</time>${updatedStr}</p>\n${body}`
    }

    if (layout !== 'default') body = addHeadingIds(body)
    const toc = layout === 'default' ? '' : buildToc(body)
    const page = await renderPage(title, body, file, { layout, toc })
    const outputPath = getOutputPath(file)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, page)
  }

  for (const isFrench of [false, true]) {
    const pages = await buildPostsPages(isFrench)
    for (const { markdown, outputPath } of pages) {
      const title = getTitle(markdown)
      const body = marked(markdown)
      const page = await renderPage(title, body, isFrench ? 'fr/posts.md' : 'posts.md')
      await mkdir(path.dirname(outputPath), { recursive: true })
      await writeFile(outputPath, page)
    }
  }

  await writeFile(path.join(outputDir, 'style.css'), await readFile('style.css', 'utf8'))
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  await buildSite()
}
