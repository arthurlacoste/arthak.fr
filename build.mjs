import { marked } from 'marked'
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceDir = 'src'
const staticDir = 'static'
const outputDir = 'public'

const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

export const getTitle = markdown => markdown.match(/^#\s+(.+)$/m)?.[1] ?? 'arthak'

export const getOutputName = file => file === 'index.md'
  ? 'index.html'
  : file.replace(/\.md$/, '.html')

export const getOutputPath = file => path.join(outputDir, getOutputName(file))

const getUrl = file => {
  const name = getOutputName(file)
  if (name === 'index.html') return '/'
  if (name === 'fr/index.html') return '/fr/'
  return '/' + name
}

const getAlternateUrl = file => {
  if (file === 'index.md') return '/fr/'
  if (file === 'fr/index.md') return '/'
  if (file.startsWith('fr/')) return '/' + getOutputName(file.replace(/^fr\//, ''))
  return '/fr/' + getOutputName(file)
}


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

const formatDate = date => date || ''

const getPostUrl = file => '/' + getOutputName(file)

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

  const title = isFrench ? 'Articles' : 'Posts'
  const intro = isFrench
    ? 'Notes courtes. Markdown brut. HTML généré.'
    : 'Short notes. Raw Markdown. Generated HTML.'

  const items = posts.length
    ? posts.map(post => `- **[${post.title}](${post.url})**  \n  ${post.date ? `${formatDate(post.date)}. ` : ''}${post.excerpt}`).join('\n\n')
    : isFrench ? 'Aucun article pour le moment.' : 'No posts yet.'

  return `# ${title}\n\n${intro}\n\n${items}\n`
}

export const renderPage = (title, html, file = 'index.md') => {
  const isFrench = file.startsWith('fr/')
  const lang = isFrench ? 'fr' : 'en'
  const homeHref = isFrench ? '/fr/' : '/'
  const postsHref = isFrench ? '/fr/posts.html' : '/posts.html'
  const aboutHref = isFrench ? '/fr/about.html' : '/about.html'
  const bio = isFrench
    ? 'Tatoueur et développeur web à Grenoble.'
    : 'Tattoo artist and maker in Grenoble, France.'
  const text = isFrench
    ? 'tatoueur au Studio Pixel. Je construis aussi des objets, des outils et des systèmes visuels.'
    : 'I make tattoos at Studio Pixel. I also build objects, tools and visual systems.'
  const homeLabel = isFrench ? 'accueil' : 'home'
  const postsLabel = isFrench ? 'articles' : 'posts'
  const aboutLabel = isFrench ? 'à propos' : 'about'

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="canonical" href="${getUrl(file)}">
  <link rel="alternate" hreflang="${isFrench ? 'en' : 'fr'}" href="${getAlternateUrl(file)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amarante&family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
  <link rel="icon" href="/favicon.webp" type="image/webp">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="topbar">
    <div class="top-language-switch" aria-label="Language switch">
      <a href="${isFrench ? getAlternateUrl(file) : getUrl(file)}" class="${isFrench ? '' : 'active'}">EN</a>
      <a href="${isFrench ? getUrl(file) : getAlternateUrl(file)}" class="${isFrench ? 'active' : ''}">FR</a>
    </div>
    <nav class="top-nav" aria-label="Navigation principale">
      <a href="${homeHref}">${homeLabel}</a>
      <a href="${aboutHref}">${aboutLabel}</a>
    </nav>
  </header>
  <main class="shell">
    <aside class="bio">
      <img class="avatar" src="/assets/img/me-arthak.webp" alt="Arthak">
      <pre class="ascii-name" aria-label="Arthak">Arthak</pre>
      <p class="location">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>
        <span>Grenoble, France</span>
      </p>
      <p class="intro">${bio}</p>
      <p>${text}</p>
    </aside>
    <article class="content">
      ${html}
    </article>
  </main>
</body>
</html>`
}

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
    const body = marked(bodyMarkdown)
    const page = renderPage(title, body, file)
    const outputPath = getOutputPath(file)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, page)
  }

  for (const [file, isFrench] of [['posts.md', false], ['fr/posts.md', true]]) {
    const markdown = await renderPostsIndex(isFrench)
    const title = getTitle(markdown)
    const body = marked(markdown)
    const page = renderPage(title, body, file)
    const outputPath = getOutputPath(file)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, page)
  }

  await writeFile(path.join(outputDir, 'style.css'), await readFile('style.css', 'utf8'))
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  await buildSite()
}
