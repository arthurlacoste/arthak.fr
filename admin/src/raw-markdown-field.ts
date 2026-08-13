import { fields } from '@keystatic/core'
import type { ContentFormField } from '@keystatic/core'

const decoder = new TextDecoder()
const encoder = new TextEncoder()

export function rawMarkdownField(label = 'Content'): ContentFormField<string, string, string> {
  const input = fields.text({ label, multiline: true })

  return {
    kind: 'form',
    formKind: 'content',
    contentExtension: '.md',
    defaultValue: () => '',
    parse: (_value, { content }) => content ? decoder.decode(content) : '',
    serialize: (value) => ({
      value: undefined,
      content: encoder.encode(value),
      other: new Map(),
      external: new Map(),
    }),
    validate: (value) => value,
    reader: { parse: (_value, { content }) => content ? decoder.decode(content) : '' },
    Input: input.Input,
  }
}
