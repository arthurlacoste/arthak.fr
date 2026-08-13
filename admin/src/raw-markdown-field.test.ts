import { describe, expect, it } from 'vitest'
import { rawMarkdownField } from './raw-markdown-field'

describe('rawMarkdownField', () => {
  it('preserves Markdown containing legacy HTML', () => {
    const field = rawMarkdownField()
    const source = '# Title\n\n<div><input checked></div>'
    const value = field.parse(undefined, {
      content: new TextEncoder().encode(source),
      external: new Map(),
      other: new Map(),
      slug: undefined,
    })

    expect(value).toBe(source)
    expect(new TextDecoder().decode(field.serialize(value, { slug: undefined }).content)).toBe(source)
  })
})
