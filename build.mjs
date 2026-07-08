import { marked } from 'marked'
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

// ─── Config ──────────────────────────────────────────────

const sourceDir = 'src'
const staticDir = 'static'
const outputDir = 'public'

const locale = {
  en: {
    lang: 'en',
    home: '/',
    posts: '/posts/',
    about: '/about/',
    tools: '/tools/',
    homeLabel: 'home',
    postsLabel: 'posts',
    aboutLabel: 'about',
    toolsLabel: 'tools',
    bio: 'Tattoo artist and maker in Grenoble, France.',
    text: "“I guess you guys aren't ready for that yet... But your kids are gonna love it.”",
  },
  fr: {
    lang: 'fr',
    home: '/fr/',
    posts: '/fr/posts/',
    about: '/fr/about/',
    tools: '/fr/tools/',
    homeLabel: 'accueil',
    postsLabel: 'articles',
    aboutLabel: 'à propos',
    toolsLabel: 'outils',
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
  if (!markdown.startsWith('---\n')) return [{}, markdown]

  const end = markdown.indexOf('\n---\n', 4)
  if (end === -1) return [{}, markdown]

  const frontmatter = markdown.slice(4, end).trim().split('\n')
  const data = {}

  for (const line of frontmatter) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    data[key] = value
  }

  return [data, markdown.slice(end + 5).trimStart()]
}

export const stripFrontmatter = markdown => parseFrontmatter(markdown)[1]

export const getTitle = markdown => markdown.match(/^#\s+(.+)$/m)?.[1] ?? 'arthak'

const formatDate = date => date || ''

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
    date: data.date || '',
    excerpt: data.excerpt || firstParagraph || '',
    url: getPostUrl(file),
  }
}

const renderPostsIndex = async isFrench => {
  const prefix = isFrench ? 'fr/posts/' : 'posts/'
  const files = (await listMarkdownFiles())
    .filter(file => file.startsWith(prefix))
    .filter(file => file !== 'posts.md' && file !== 'fr/posts.md')

  const posts = await Promise.all(files.map(getPostMeta))
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title))

  const l = locale[isFrench ? 'fr' : 'en']
  const title = isFrench ? 'Articles' : 'Posts'

  const items = posts.length
    ? posts.map(post => `- **[${post.title}](${post.url})**  \n  ${post.date ? `${formatDate(post.date)}. ` : ''}${post.excerpt}`).join('\n\n')
    : isFrench ? 'Aucun article pour le moment.' : 'No posts yet.'

  return `# ${title}\n\n${items}\n`
}

// ─── Template ────────────────────────────────────────────

let _layout = null

export const renderPage = async (title, html, file = 'index.md') => {
  if (!_layout) {
    _layout = await readFile('_layouts/default.html', 'utf8')
  }

  const isFrench = file.startsWith('fr/')
  const l = locale[isFrench ? 'fr' : 'en']
  const alternateL = locale[isFrench ? 'en' : 'fr']

  return _layout
    .replace('{{lang}}', l.lang)
    .replace('{{title}}', escapeHtml(title))
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
    .replace('{{tools_href}}', l.tools)
    .replace('{{home_label}}', l.homeLabel)
    .replace('{{posts_label}}', l.postsLabel)
    .replace('{{about_label}}', l.aboutLabel)
    .replace('{{tools_label}}', l.toolsLabel)
    .replace('{{bio}}', l.bio)
    .replace('{{text}}', l.text)
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
    let body = marked(bodyMarkdown)

    if ((file.startsWith('posts/') || file.startsWith('fr/posts/')) && !body.startsWith('<h1>')) {
      body = `<h1>${escapeHtml(title)}</h1>\n${body}`
    }

    const page = await renderPage(title, body, file)
    const outputPath = getOutputPath(file)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, page)
  }

  for (const [file, isFrench] of [['posts.md', false], ['fr/posts.md', true]]) {
    const markdown = await renderPostsIndex(isFrench)
    const title = getTitle(markdown)
    const body = marked(markdown)
    const page = await renderPage(title, body, file)
    const outputPath = getOutputPath(file)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, page)
  }

  await writeFile(path.join(outputDir, 'style.css'), await readFile('style.css', 'utf8'))
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  await buildSite()
}
