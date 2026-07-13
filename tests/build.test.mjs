import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { getOutputName, getOutputPath, getTitle, parseFrontmatter, renderPage, buildPostsPages, buildToc, addHeadingIds, renderLatestPosts, renderMarkdown } from '../build.mjs'
import { getDirectoryRedirect } from '../scripts/trailing-slash.mjs'

test('extracts first markdown h1 as title', () => {
  assert.equal(getTitle('# arthak\n\ncontent'), 'arthak')
})

test('maps markdown files to html output', () => {
  assert.equal(getOutputName('index.md'), 'index.html')
  assert.equal(getOutputName('fr/index.md'), 'fr/index.html')
  assert.equal(getOutputName('about.md'), 'about/index.html')
  assert.equal(getOutputName('posts/premier-signal.md'), 'posts/premier-signal/index.html')
})

test('redirects published directories to their trailing-slash URL', async () => {
  const cwd = process.cwd()

  assert.equal(await getDirectoryRedirect('/posts?source=test', cwd), null)
  assert.equal(await getDirectoryRedirect('/tests?source=test', cwd), '/tests/?source=test')
  assert.equal(await getDirectoryRedirect('/tests/', cwd), null)
  assert.equal(await getDirectoryRedirect('/missing', cwd), null)
})

test('renders simple page shell', async () => {
  const page = await renderPage('test', '<h1>test</h1>')

  assert.match(page, /<aside class="bio">/)
  assert.match(page, /<article class="content">/)
  assert.doesNotMatch(page, /arthak ascii logo/)
})

test('bio logo links to localized home and floats on interaction', async () => {
  const fs = await import('node:fs/promises')
  const english = await renderPage('Home', '<h1>Home</h1>')
  const french = await renderPage('Accueil', '<h1>Accueil</h1>', 'fr/index.md')
  const css = await fs.readFile('style.css', 'utf8')

  assert.match(english, /class="avatar-link" href="\/" aria-label="home"/)
  assert.match(french, /class="avatar-link" href="\/fr\/" aria-label="accueil"/)
  assert.match(css, /\.avatar-link:hover,\.avatar-link:focus-visible\{animation:avatar-float/)
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/)
})

test('bio logo delays navigation during departure animation', async () => {
  const fs = await import('node:fs/promises')
  const page = await renderPage('Home', '<h1>Home</h1>')
  const script = await fs.readFile('static/assets/js/site.min.js', 'utf8')
  const css = await fs.readFile('style.css', 'utf8')

  assert.match(page, /<script src="\/assets\/js\/site\.min\.js\?v=[a-f0-9]+" defer><\/script>/)
  assert.match(script, /e\.preventDefault\(\)/)
  assert.match(script, /setTimeout\(\(\)=>location\.assign\(t\.href\),500\)/)
  assert.doesNotMatch(script, /avatar-travel-x|avatar-arc-y/)
  assert.match(css, /animation:avatar-depart-float \.5s cubic-bezier\(\.45,0,\.55,1\)/)
  assert.match(css, /\.avatar-link--departing \.avatar\{animation:avatar-depart-spin \.5s linear/)
  assert.match(css, /to\{transform:rotate\(360deg\)\}/)
  assert.match(css, /@keyframes avatar-depart/)
})


test('keeps nested post output under public posts folder', () => {
  assert.equal(getOutputPath('posts/premier-signal.md'), 'public/posts/premier-signal/index.html')
})

test('renders posts and about nav links', async () => {
  const page = await renderPage('test', '<h1>test</h1>')

  assert.match(page, /href="\/about\/"/)
  assert.match(page, /href="\/posts\/"/)
  assert.doesNotMatch(page, /href="\/tools\/"/)
})

test('base skeleton wraps page layouts and shared topbar', async () => {
  const fs = await import('node:fs/promises')
  const topbar = await fs.readFile('_includes/topbar.html', 'utf8')
  const baseLayout = await fs.readFile('_layouts/base.html', 'utf8')
  const defaultLayout = await fs.readFile('_layouts/default.html', 'utf8')
  const riversLayout = await fs.readFile('_layouts/rivers.html', 'utf8')
  const defaultPage = await renderPage('Default', '<h1>Default</h1>')
  const riversPage = await renderPage('Rivers', '<h1>Rivers</h1>', 'rivers/test.md', { layout: 'rivers' })

  assert.match(baseLayout, /<!doctype html>/)
  assert.match(baseLayout, /\{\{topbar\}\}/)
  assert.match(baseLayout, /\{\{page\}\}/)
  assert.doesNotMatch(defaultLayout, /<!doctype html>/)
  assert.doesNotMatch(riversLayout, /<!doctype html>/)
  assert.match(topbar, /<header class="topbar">/)
  assert.match(defaultPage, /<header class="topbar">/)
  assert.match(riversPage, /<header class="topbar">/)
})

test('renders social links and larger topbar click targets', async () => {
  const fs = await import('node:fs/promises')
  const page = await renderPage('Home', '<h1>Home</h1>')
  const css = await fs.readFile('style.css', 'utf8')

  assert.match(page, /<footer class="social-footer">/)
  assert.match(page, /href="https:\/\/x\.com\/arthak_ttt"/)
  assert.match(page, /href="https:\/\/www\.instagram\.com\/arthak\/"/)
  assert.match(page, /href="https:\/\/www\.youtube\.com\/@arthakpixel"/)
  assert.match(page, /href="https:\/\/github\.com\/arthurlacoste"/)
  assert.doesNotMatch(page, /linkedin/i)
  assert.match(page, /Twitter<\/a>[\s\S]*GitHub<\/a>[\s\S]*YouTube<\/a>[\s\S]*Instagram<\/a>/)
  assert.match(css, /\.top-language-switch a,\.top-nav a\{padding:10px 8px;margin:-10px -8px\}/)
  assert.match(css, /\.social-footer\{position:fixed;left:max\(24px,calc\(\(100vw - 1360px\)\/2\)\);bottom:24px/)
  assert.match(css, /\.social-links a\{margin-left:-14px;padding:4px 28px 4px 14px/)
  assert.match(css, /@media\(max-width:1219px\)\{\.social-footer\{position:static/)
})


test('renders favicon link', async () => {
  const page = await renderPage('test', '<h1>test</h1>')

  assert.match(page, /href="\/favicon\.webp"/)
  assert.match(page, /type="image\/webp"/)
})

test('versions the local stylesheet from its content hash', async () => {
  const fs = await import('node:fs/promises')
  const css = await fs.readFile('style.css')
  const version = createHash('sha256').update(css).digest('hex').slice(0, 12)
  const page = await renderPage('test', '<h1>test</h1>')

  assert.match(page, new RegExp(`href="/style\\.css\\?v=${version}"`))
})


test('home contains project categories and language toggle', async () => {
  const fs = await import('node:fs/promises')
  const markdown = await fs.readFile('src/index.md', 'utf8')

  assert.doesNotMatch(markdown, /data-lang-button/)
  assert.match(markdown, /Cellophane & Vaseline/)
  assert.match(markdown, /Winegold/)
  assert.match(markdown, /MCPRelay/)
})

test('home river links stay canonical and localized', async () => {
  const fs = await import('node:fs/promises')
  const english = await fs.readFile('src/index.md', 'utf8')
  const french = await fs.readFile('src/fr/index.md', 'utf8')

  assert.match(english, /\[Vakarm\]\(\/rivers\/vakarm\/\)/)
  assert.match(english, /\[Living without a car\]\(\/rivers\/vivre-sans-voiture\/\)/)
  assert.match(french, /\[Vakarm\]\(\/fr\/rivers\/vakarm\/\)/)
  assert.match(french, /\[Vivre sans voiture\]\(\/fr\/rivers\/vivre-sans-voiture\/\)/)
})


test('french home output path is nested index', () => {
  assert.equal(getOutputPath('fr/index.md'), 'public/fr/index.html')
})

test('french page renders translated navigation', async () => {
  const page = await renderPage('Projets', '<h1>Projets</h1>', 'fr/index.md')

  assert.match(page, /<html lang="fr">/)
  assert.match(page, /href="\/fr\/">accueil/)
  assert.match(page, /href="\/fr\/about\/">à propos/)
  assert.match(page, /href="\/fr\/posts\/">articles/)
  assert.doesNotMatch(page, /href="\/fr\/tools\/"/)
  assert.match(page, /class="active">FR/)
  assert.match(page, /Grenoble, France/)
  assert.match(page, /class="ascii-name"/)
})


test('card links have no underline css', async () => {
  const fs = await import('node:fs/promises')
  const css = await fs.readFile('style.css', 'utf8')

  assert.match(css, /\.content li a\{text-decoration:none\}/)
  assert.match(css, /\.topbar\{/ )
  assert.doesNotMatch(css, /font-weight:500/)
})


test('home page uses simple list style', async () => {
  const fs = await import('node:fs/promises')
  const markdown = await fs.readFile('src/index.md', 'utf8')
  const css = await fs.readFile('style.css', 'utf8')

  assert.doesNotMatch(markdown, /card-image-link/)
  assert.doesNotMatch(css, /\.card-image/)
  assert.match(markdown, /\[Cellophane & Vaseline\]/)
  assert.match(markdown, /\[Tattooing\]/)
  assert.match(markdown, /\[Studio Pixel\]/)
})

test('English home renders five latest English posts', async () => {
  const latestPosts = await renderLatestPosts(false)
  const items = latestPosts.match(/<li>/g) || []

  assert.equal(items.length, 5)
  assert.match(latestPosts, /<ul class="home-posts">/)
  assert.match(latestPosts, /<li>🎮 <strong><a href="\/posts\/pong\//)
  assert.match(latestPosts, /<li>🤖 <strong><a href="\/posts\/mcprelay\//)
  assert.match(latestPosts, /<li>🥕 <strong><a href="\/posts\/douze-kilos-de-carottes\//)
  assert.match(latestPosts, /<\/a><\/strong> — \d{4}-\d{2}-\d{2}<\/li>/)
  assert.doesNotMatch(latestPosts, /href="\/fr\/posts\//)
})

test('posts index source files are generated at build time', async () => {
  const fs = await import('node:fs/promises')

  await assert.rejects(fs.access('src/posts.md'))
  await assert.rejects(fs.access('src/fr/posts.md'))
})

test('frontmatter parser extracts metadata and body', () => {
  const markdown = `---
title: Pong 2009
date: 2026-07-07
excerpt: Le jeu de mon frère
---

La sortie récente du jeu

C'était en 2009.
`

  const [data, body] = parseFrontmatter(markdown)

  assert.equal(data.title, 'Pong 2009')
  assert.equal(data.date, '2026-07-07')
  assert.equal(data.excerpt, 'Le jeu de mon frère')
  assert.doesNotMatch(body, /title: Pong 2009/)
  assert.match(body, /sortie/)
})

test('pong has matching French and English source pages', async () => {
  const fs = await import('node:fs/promises')
  const french = await fs.readFile('src/fr/posts/pong.md', 'utf8')
  const english = await fs.readFile('src/posts/pong.md', 'utf8')

  assert.match(french, /title: J'ai fait ce jeu/)
  assert.match(english, /title: I Made This Game Sixteen Years Ago/)
  assert.match(english, /https:\/\/arthurlacoste\.github\.io\/pong-2026\//)
  assert.doesNotMatch(english, /style=/)
})

test('French bike road trip has one valid front matter block', async () => {
  const fs = await import('node:fs/promises')
  const markdown = await fs.readFile('src/fr/posts/premier-roadtrip-velo.md', 'utf8')
  const [data, body] = parseFrontmatter(markdown)

  assert.equal(data.title, 'Mon premier road trip à vélo')
  assert.equal(data.updated, '2026-07-12')
  assert.deepEqual(data.categories, ['Parcours'])
  assert.deepEqual(data.tags, ['vélo', 'voyage', 'VAE', 'improvisation'])
  assert.doesNotMatch(body, /^---/)
  assert.doesNotMatch(body, /^author:/m)
})


test('french posts index returns paginated pages with title links', async () => {
  const pages = await buildPostsPages(true)
  assert.ok(pages.length > 0)
  const first = pages[0]
  assert.match(first.markdown, /^# Articles/)
  assert.match(first.markdown, /<ul class="posts-list">/)
  assert.match(first.markdown, /<li>🎮 <strong><a href="\/fr\/posts\/pong\/">.*<\/a><\/strong> — 12 juillet 2026<\/li>/)
  assert.equal(first.outputPath, 'public/fr/posts/index.html')
})

test('pagination: 80 posts per page', async () => {
  const pages = await buildPostsPages(true)
  for (let i = 0; i < pages.length - 1; i++) {
    const lines = pages[i].markdown.split('\n').filter(l => l.includes('<li>'))
    assert.equal(lines.length, 80)
  }
  const last = pages[pages.length - 1]
  const lastLines = last.markdown.split('\n').filter(l => l.includes('<li>'))
  assert.ok(lastLines.length <= 80)
  assert.ok(lastLines.length > 0)
})

test('pagination: page 1 has no /page/1/ in output path', async () => {
  const pages = await buildPostsPages(true)
  assert.equal(pages[0].outputPath, 'public/fr/posts/index.html')
  assert.doesNotMatch(pages[0].outputPath, /page\/1/)
})

test('pagination: page 2+ uses /page/N/ path', async () => {
  const pages = await buildPostsPages(true)
  if (pages.length > 1) {
    assert.match(pages[1].outputPath, /page\/2\/index\.html/)
  }
  if (pages.length > 2) {
    assert.match(pages[2].outputPath, /page\/3\/index\.html/)
  }
})

test('pagination: navigation links between pages', async () => {
  const pages = await buildPostsPages(true)
  if (pages.length > 1) {
    assert.match(pages[0].markdown, /Articles suivants/)
    assert.doesNotMatch(pages[0].markdown, /Articles précédents/)
    assert.match(pages[pages.length - 1].markdown, /Articles précédents/)
    assert.doesNotMatch(pages[pages.length - 1].markdown, /Articles suivants/)
  }
})

test('pagination: page indicator shows current/total', async () => {
  const pages = await buildPostsPages(true)
  if (pages.length > 1) {
    assert.match(pages[0].markdown, /1 \/ \d+/)
    assert.match(pages[1].markdown, /2 \/ \d+/)
  }
})

test('pagination: single page has no nav when all posts fit', async () => {
  const pages = await buildPostsPages(false)
  if (pages.length === 1) {
    assert.doesNotMatch(pages[0].markdown, /Articles précédents/)
    assert.doesNotMatch(pages[0].markdown, /Articles suivants/)
    assert.doesNotMatch(pages[0].markdown, /\d+ \/ \d+/)
  }
})

test('rivers layout has no bio and uses toc', async () => {
  const page = await renderPage('VAKARM', '<h1>VAKARM</h1>', 'fr/rivers/vakarm.md', {
    layout: 'rivers',
    toc: '<ul><li><a href="#acte-1">ACTE 1</a></li></ul>',
  })

  assert.doesNotMatch(page, /<aside class="bio">/)
  assert.match(page, /class="rivers-shell"/)
  assert.match(page, /class="rivers-toc"/)
  assert.match(page, /class="rivers-content"/)
  assert.match(page, /#acte-1/)
})

test('frontmatter layout selects its matching template', async () => {
  const [data] = parseFrontmatter('---\nlayout: rivers\n---\n# Test')
  const page = await renderPage('Test', '<h1>Test</h1>', 'custom.md', { layout: data.layout })

  assert.match(page, /class="rivers-shell"/)
})

test('undefined and legacy post layouts keep the default template', async () => {
  const defaultPage = await renderPage('Test', '<h1>Test</h1>', 'custom.md')
  const legacyPostPage = await renderPage('Test', '<h1>Test</h1>', 'custom.md', { layout: 'post' })

  assert.match(defaultPage, /<aside class="bio">/)
  assert.match(legacyPostPage, /<aside class="bio">/)
})

test('rejects unsafe or missing layout names', async () => {
  await assert.rejects(
    renderPage('Test', '<h1>Test</h1>', 'custom.md', { layout: '../secret' }),
    /Invalid layout name/,
  )
  await assert.rejects(
    renderPage('Test', '<h1>Test</h1>', 'custom.md', { layout: 'missing-layout' }),
    /Layout "missing-layout" not found/,
  )
})

test('buildToc extracts h2 and h3 headings', () => {
  const html = '<h2 id="acte-1">ACTE 1</h2><h3 id="scene-1">Scène 1</h3><h2 id="acte-2">ACTE 2</h2>'
  const toc = buildToc(html)

  assert.match(toc, /#acte-1/)
  assert.match(toc, /#scene-1/)
  assert.match(toc, /#acte-2/)
  assert.match(toc, /class="toc-sub"/)
})

test('buildToc keeps h3 entries when a section has five', () => {
  const html = '<h2 id="dense">Dense</h2><h3 id="one">One</h3><h3 id="two">Two</h3><h3 id="three">Three</h3><h3 id="four">Four</h3><h3 id="five">Five</h3>'
  const toc = buildToc(html)

  assert.match(toc, /href="#dense"/)
  assert.match(toc, /href="#one"/)
  assert.match(toc, /href="#five"/)
})

test('buildToc hides h3 entries when a section has more than five', () => {
  const html = '<h2 id="dense">Dense</h2><h3 id="one">One</h3><h3 id="two">Two</h3><h3 id="three">Three</h3><h3 id="four">Four</h3><h3 id="five">Five</h3><h3 id="six">Six</h3><h2 id="short">Short</h2><h3 id="kept">Kept</h3>'
  const toc = buildToc(html)

  assert.match(toc, /href="#dense"/)
  assert.doesNotMatch(toc, /href="#one"/)
  assert.doesNotMatch(toc, /href="#six"/)
  assert.match(toc, /href="#short"/)
  assert.match(toc, /href="#kept"/)
})

test('adds unique ids used by rivers toc links', () => {
  const html = addHeadingIds('<h2>ACTE 1</h2><h3>Scène 1</h3><h3>Scène 1</h3>')
  const toc = buildToc(html)

  assert.match(html, /<h2 id="acte-1">/)
  assert.match(html, /<h3 id="scene-1">/)
  assert.match(html, /<h3 id="scene-1-2">/)
  assert.match(toc, /href="#scene-1-2"/)
})

test('rivers page renders without tools in nav', async () => {
  const page = await renderPage('VAKARM', '<h1>VAKARM</h1>', 'fr/rivers/vakarm.md', {
    layout: 'rivers',
    toc: '',
  })

  assert.doesNotMatch(page, /href="\/fr\/tools\/"/)
  assert.doesNotMatch(page, /outils/)
})

test('Vivre sans voiture is assembled as one complete French river', async () => {
  const markdown = await readFile('src/fr/rivers/vivre-sans-voiture.md', 'utf8')
  const [data, body] = parseFrontmatter(markdown)

  assert.equal(data.layout, 'rivers')
  assert.equal(data.title, 'Vivre sans voiture')
  assert.match(body, /^## Avant-propos$/m)
  assert.match(body, /^## Introduction$/m)
  assert.match(body, /^## Pourquoi vivre sans voiture \?$/m)
  assert.match(body, /^## Êtes-vous citadin ou campagnard \?$/m)
  assert.match(body, /^## Comment vivre sans voiture \?$/m)
  assert.match(body, /^## Quel moyen de transport utiliser \?$/m)
  assert.match(body, /^## Conclusion$/m)
  assert.match(body, /^## Lexique$/m)
  assert.match(body, /^## Remerciements$/m)
  assert.match(body, /^## Bibliographie$/m)
  assert.match(body, /1,19&nbsp;million/)
  assert.match(body, /95&nbsp;% de la production était bas-carbone/)
  assert.match(body, /«&nbsp;quasi menacé&nbsp;»/)
  assert.match(body, /^#### Sources historiques conservées$/m)
  assert.match(body, /web\.archive\.org\/web\/20130310001543\/http:\/\/index\.truman/)
  assert.doesNotMatch(body, /\]\(http:\/\/(?:index\.truman|intranet\.ariege|www\.who\.int\/(?:mediacentre|violence_injury_prevention))/)
  assert.doesNotMatch(body, /blob\/master\/licence\.md/)
  assert.doesNotMatch(body, /\]\(\/(?:lexique|[0-9]-)/)
})

test('Vivre sans voiture has a complete English river', async () => {
  const markdown = await readFile('src/rivers/vivre-sans-voiture.md', 'utf8')
  const [data, body] = parseFrontmatter(markdown)

  assert.equal(data.layout, 'rivers')
  assert.equal(data.title, 'Living without a car')
  assert.match(body, /^## Foreword$/m)
  assert.match(body, /^## Introduction$/m)
  assert.match(body, /^## Why live without a car\?$/m)
  assert.match(body, /^## Conclusion$/m)
  assert.match(body, /^## Lexicon$/m)
  assert.match(body, /^## Bibliography$/m)
  assert.match(body, /1\.19 million deaths/)
  assert.match(body, /95% of production was low-carbon/)
  assert.match(body, /“Near Threatened”/)
  assert.match(body, /^#### Preserved historical sources$/m)
  assert.match(body, /web\.archive\.org\/web\/20130310001543\/http:\/\/index\.truman/)
  assert.doesNotMatch(body, /\]\(http:\/\/(?:index\.truman|intranet\.ariege|www\.who\.int\/(?:mediacentre|violence_injury_prevention))/)
  assert.doesNotMatch(body, /blob\/master\/licence\.md/)
  assert.doesNotMatch(body, /\]\(#(?:modes-actifs|une-question-economique)\)/)
})


test('renders magazine footnotes with backlinks', () => {
  const html = renderMarkdown('A claim.[^1]\n\n[^1]: A note with a [link](https://example.com).')

  assert.match(html, /class="footnote-ref"/)
  assert.match(html, /href="#fn-1"/)
  assert.match(html, /class="footnotes"/)
  assert.match(html, /id="fn-1"/)
  assert.match(html, /href="#fnref-1"/)
  assert.match(html, /<a href="https:\/\/example.com">link<\/a>/)
  assert.doesNotMatch(html, /\[\^1\]:/)
})

test('leaves unknown footnote references untouched', () => {
  assert.match(renderMarkdown('Missing[^404]'), /\[\^404\]/)
})
