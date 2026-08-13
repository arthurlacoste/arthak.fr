import { fields } from '@keystatic/core'
import type { ContentFormField, FormFieldInputProps } from '@keystatic/core'
import { ActionButton, ButtonGroup } from '@keystar/ui/button'
import { Flex } from '@keystar/ui/layout'
import { TextArea } from '@keystar/ui/text-field'
import { createElement, useState } from 'react'

const decoder = new TextDecoder()
const encoder = new TextEncoder()

type MarkdownValue = {
  raw: string
  rich: unknown | null
}

export function rawMarkdownField(label = 'Content'): ContentFormField<MarkdownValue, MarkdownValue, string> {
  const richField = fields.markdoc({ label, extension: 'md' })

  const parseRich = (raw: string) => {
    try {
      return richField.parse(undefined, {
        content: encoder.encode(raw),
        external: new Map(),
        other: new Map(),
        slug: undefined,
      })
    } catch {
      return null
    }
  }

  function Input(props: FormFieldInputProps<MarkdownValue>) {
    const [mode, setMode] = useState<'visual' | 'source'>(props.value.rich ? 'visual' : 'source')
    const visualAvailable = props.value.rich !== null

    const showVisual = () => {
      const rich = props.value.rich ?? parseRich(props.value.raw)
      if (!rich) return
      if (rich !== props.value.rich) props.onChange({ ...props.value, rich })
      setMode('visual')
    }

    const controls = createElement(ButtonGroup, null,
      createElement(ActionButton, {
        isDisabled: !visualAvailable,
        isSelected: mode === 'visual',
        onPress: showVisual,
      }, 'Visual'),
      createElement(ActionButton, {
        isSelected: mode === 'source',
        onPress: () => setMode('source'),
      }, 'Source Markdown'),
    )

    const editor = mode === 'visual' && props.value.rich
      ? createElement(richField.Input as never, {
          ...props,
          value: props.value.rich,
          onChange: (rich: unknown) => {
            const serialized = richField.serialize(rich as never, { slug: undefined })
            props.onChange({ raw: decoder.decode(serialized.content), rich })
          },
        })
      : createElement(TextArea, {
          'aria-label': label,
          autoFocus: props.autoFocus,
          label,
          minHeight: 'scale.3000',
          onChange: (raw: string) => props.onChange({ raw, rich: null }),
          value: props.value.raw,
        })

    return createElement(Flex, { direction: 'column', gap: 'regular' }, controls, editor)
  }

  return {
    kind: 'form',
    formKind: 'content',
    contentExtension: '.md',
    defaultValue: () => ({ raw: '', rich: parseRich('') }),
    parse: (_value, { content }) => {
      const raw = content ? decoder.decode(content) : ''
      return { raw, rich: parseRich(raw) }
    },
    serialize: (value) => ({
      value: undefined,
      content: encoder.encode(value.raw),
      other: new Map(),
      external: new Map(),
    }),
    validate: (value) => value,
    reader: { parse: (_value, { content }) => content ? decoder.decode(content) : '' },
    Input,
  }
}
