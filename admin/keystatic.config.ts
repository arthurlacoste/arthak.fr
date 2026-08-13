import { collection, config, fields, singleton } from '@keystatic/core'
import { rawMarkdownField } from './src/raw-markdown-field'

const content = fields.markdoc({ label: 'Content', extension: 'md' })
const rawContent = rawMarkdownField()

const pageSchema = {
  title: fields.text({ label: 'Title', validation: { isRequired: false } }),
  layout: fields.text({ label: 'Layout', validation: { isRequired: false } }),
  content,
}

const riverSchema = {
  title: fields.slug({ name: { label: 'Title' } }),
  subtitle: fields.text({ label: 'Subtitle', validation: { isRequired: false } }),
  author: fields.text({ label: 'Author', defaultValue: 'Arthur Lacoste' }),
  date: fields.date({ label: 'Date' }),
  updated: fields.date({ label: 'Updated', validation: { isRequired: false } }),
  layout: fields.text({ label: 'Layout', defaultValue: 'rivers' }),
  slug: fields.text({ label: 'Public slug' }),
  archive: fields.checkbox({ label: 'Archived', defaultValue: true }),
  categories: fields.array(fields.text({ label: 'Category' }), {
    label: 'Categories',
    itemLabel: (props) => props.value,
  }),
  tags: fields.array(fields.text({ label: 'Tag' }), {
    label: 'Tags',
    itemLabel: (props) => props.value,
  }),
  source: fields.text({ label: 'Source URL', validation: { isRequired: false } }),
  translation: fields.text({ label: 'Translation note', validation: { isRequired: false } }),
  content,
}

const mergeSchema = {
  title: fields.slug({ name: { label: 'Title' } }),
  layout: fields.text({ label: 'Layout', defaultValue: 'rivers' }),
  content: rawContent,
}

const rawPageSchema = {
  title: fields.text({ label: 'Title', validation: { isRequired: false } }),
  layout: fields.text({ label: 'Layout', validation: { isRequired: false } }),
  content: rawContent,
}

const postSchema = {
  title: fields.slug({
    name: { label: 'Title' },
  }),
  author: fields.text({ label: 'Author', defaultValue: 'art' }),
  date: fields.date({ label: 'Date' }),
  updated: fields.date({ label: 'Updated', validation: { isRequired: false } }),
  emoji: fields.text({ label: 'Emoji', validation: { isRequired: false } }),
  excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { isRequired: false } }),
  comments: fields.checkbox({ label: 'Comments', defaultValue: true }),
  archive: fields.ignored(),
  categories: fields.ignored(),
  header: fields.ignored(),
  layout: fields.ignored(),
  link: fields.ignored(),
  post_format: fields.ignored(),
  slug: fields.ignored(),
  tags: fields.ignored(),
  wordpress_id: fields.ignored(),
  content,
}

const contentFormat = { contentField: 'content' } as const

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'arthurlacoste',
      name: 'arthak.fr',
    },
  },
  collections: {
    posts: collection({
      label: 'English posts',
      slugField: 'title',
      path: 'src/posts/*',
      entryLayout: 'content',
      format: contentFormat,
      schema: postSchema,
    }),
    postsFr: collection({
      label: 'French posts',
      slugField: 'title',
      path: 'src/fr/posts/*',
      entryLayout: 'content',
      format: contentFormat,
      schema: postSchema,
    }),
    rivers: collection({
      label: 'English rivers',
      slugField: 'title',
      path: 'src/rivers/*',
      entryLayout: 'content',
      format: contentFormat,
      schema: riverSchema,
    }),
    riversFr: collection({
      label: 'French rivers',
      slugField: 'title',
      path: 'src/fr/rivers/*',
      entryLayout: 'content',
      format: contentFormat,
      schema: riverSchema,
    }),
    merge: collection({
      label: 'English merge',
      slugField: 'title',
      path: 'src/merge/*',
      entryLayout: 'content',
      format: contentFormat,
      schema: mergeSchema,
    }),
    mergeFr: collection({
      label: 'French merge',
      slugField: 'title',
      path: 'src/fr/merge/*',
      entryLayout: 'content',
      format: contentFormat,
      schema: mergeSchema,
    }),
  },
  singletons: {
    home: singleton({ label: 'English home', path: 'src/index', entryLayout: 'content', format: contentFormat, schema: pageSchema }),
    about: singleton({ label: 'English about', path: 'src/about', entryLayout: 'content', format: contentFormat, schema: rawPageSchema }),
    tools: singleton({ label: 'English tools', path: 'src/tools', entryLayout: 'content', format: contentFormat, schema: pageSchema }),
    homeFr: singleton({ label: 'French home', path: 'src/fr/index', entryLayout: 'content', format: contentFormat, schema: pageSchema }),
    aboutFr: singleton({ label: 'French about', path: 'src/fr/about', entryLayout: 'content', format: contentFormat, schema: rawPageSchema }),
    archivesFr: singleton({ label: 'French archives', path: 'src/fr/archives', entryLayout: 'content', format: contentFormat, schema: rawPageSchema }),
    toolsFr: singleton({ label: 'French tools', path: 'src/fr/tools', entryLayout: 'content', format: contentFormat, schema: pageSchema }),
    logbookFr: singleton({ label: 'French logbook', path: 'src/fr/logbook', entryLayout: 'content', format: contentFormat, schema: rawPageSchema }),
  },
})
