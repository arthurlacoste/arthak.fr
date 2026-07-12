import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cleanSlug, displayTitle, makeExcerpt, replaceMediaUrls, splitFrontmatter } from '../scripts/migrate-irz-archives.mjs'

test('cleans legacy encoding and underscores from slugs', () => {
  assert.equal(cleanSlug('le28099erreur_de_code-de-la-semaine'), 'lerreur-de-code-de-la-semaine')
  assert.equal(cleanSlug('voilà-l’été'), 'voila-l-ete')
})

test('parses real YAML values containing colons', () => {
  const source = `---\ntitle: "Test : valeur"\ntags:\n  - dev\n  - web\n---\nBody`
  const { data, body } = splitFrontmatter(source)
  assert.equal(data.title, 'Test : valeur')
  assert.deepEqual(data.tags, ['dev', 'web'])
  assert.equal(body, 'Body')
})

test('rebuilds missing display title from body', () => {
  assert.equal(displayTitle({ title: 'No Content Found' }, 'Une tasse jaune sur mon bureau.', 'fallback'), 'Une tasse jaune sur mon bureau')
})

test('uses excerpt before generated body preview', () => {
  assert.equal(makeExcerpt({ excerpt: 'Résumé existant' }, 'Corps ignoré'), 'Résumé existant')
})

test('rewrites legacy media host', () => {
  assert.equal(
    replaceMediaUrls('https://static.irz.fr/2013/03/image.jpg'),
    'https://archives.irz.fr/wp-content/uploads/2013/03/image.jpg',
  )
})
