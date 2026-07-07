import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getOutputName, getOutputPath, getTitle, parseFrontmatter, renderPage } from '../build.mjs'

test('extracts first markdown h1 as title', () => {
  assert.equal(getTitle('# arthak\n\ncontent'), 'arthak')
})

test('maps markdown files to html output', () => {
  assert.equal(getOutputName('index.md'), 'index.html')
  assert.equal(getOutputName('about.md'), 'about.html')
  assert.equal(getOutputName('posts/premier-signal.md'), 'posts/premier-signal.html')
})

test('renders simple page shell', () => {
  const page = renderPage('test', '<h1>test</h1>')

  assert.match(page, /<aside class="bio">/)
  assert.match(page, /<article class="content">/)
  assert.doesNotMatch(page, /arthak ascii logo/)
})


test('keeps nested post output under public posts folder', () => {
  assert.equal(getOutputPath('posts/premier-signal.md'), 'public/posts/premier-signal.html')
})

test('does not render posts nav link yet', () => {
  const page = renderPage('test', '<h1>test</h1>')

  assert.doesNotMatch(page, /href="\/posts.html"/)
})


test('renders favicon link', () => {
  const page = renderPage('test', '<h1>test</h1>')

  assert.match(page, /href="\/favicon\.webp"/)
  assert.match(page, /type="image\/webp"/)
})


test('home contains project categories and language toggle', async () => {
  const fs = await import('node:fs/promises')
  const markdown = await fs.readFile('src/index.md', 'utf8')

  assert.doesNotMatch(markdown, /data-lang-button/)
  assert.match(markdown, /Cellophane & Vaseline/)
  assert.match(markdown, /Winegold/)
  assert.match(markdown, /MCPRelay/)
})


test('french home output path is nested index', () => {
  assert.equal(getOutputPath('fr/index.md'), 'public/fr/index.html')
})

test('french page renders translated navigation', () => {
  const page = renderPage('Projets', '<h1>Projets</h1>', 'fr/index.md')

  assert.match(page, /<html lang="fr">/)
  assert.doesNotMatch(page, /href="\/fr\/posts\.html">articles/)
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


test('card images are clickable and copied', async () => {
  const fs = await import('node:fs/promises')
  const markdown = await fs.readFile('src/index.md', 'utf8')
  const css = await fs.readFile('style.css', 'utf8')

  assert.match(markdown, /card-image-link/)
  assert.match(markdown, /cellophane-et-vaseline\.webp/)
  assert.match(markdown, /arthak-tattoo\.webp/)
  assert.match(markdown, /studio-pixel\.webp/)
  assert.match(css, /\.card-image/)
})

test('posts index source files are generated at build time', async () => {
  const fs = await import('node:fs/promises')

  await assert.rejects(fs.access('src/posts.md'))
  await assert.rejects(fs.access('src/fr/posts.md'))
})

test('frontmatter parser extracts metadata and body', async () => {
  const fs = await import('node:fs/promises')
  const markdown = await fs.readFile('src/fr/posts/26-07-07-pong.md', 'utf8')
  const [data, body] = parseFrontmatter(markdown)

  assert.equal(data.title, 'Pong 2009')
  assert.equal(data.date, '2026-07-07')
  assert.doesNotMatch(body, /title: Pong 2009/)
  assert.match(body, /sortie/)
})
