import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { getOutputName, getOutputPath, getTitle, parseFrontmatter, renderPage, buildPostsPages, buildToc, addHeadingIds } from '../build.mjs'
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

test('home archive links stay canonical and localized', async () => {
  const fs = await import('node:fs/promises')
  const english = await fs.readFile('src/index.md', 'utf8')
  const french = await fs.readFile('src/fr/index.md', 'utf8')

  assert.match(english, /\[IRZ\]\(\/posts\/\)/)
  assert.match(english, /\[Vakarm\]\(\/rivers\/vakarm\/\)/)
  assert.match(french, /\[IRZ\]\(\/fr\/posts\/\)/)
  assert.match(french, /\[Vakarm\]\(\/fr\/rivers\/vakarm\/\)/)
  assert.doesNotMatch(french, /\[IRZ\]\(\/posts\/?\)/)
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
  assert.match(first.markdown, /<div class="posts-list">/)
  assert.match(first.markdown, /<a href="\/fr\/posts\/.*">.*<\/a>/)
  assert.equal(first.outputPath, 'public/fr/posts/index.html')
})

test('pagination: 80 posts per page', async () => {
  const pages = await buildPostsPages(true)
  for (let i = 0; i < pages.length - 1; i++) {
    const lines = pages[i].markdown.split('\n').filter(l => l.includes('<div class="post-item">'))
    assert.equal(lines.length, 80)
  }
  const last = pages[pages.length - 1]
  const lastLines = last.markdown.split('\n').filter(l => l.includes('<div class="post-item">'))
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
