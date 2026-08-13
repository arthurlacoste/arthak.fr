import { config, fields, collection } from '@keystatic/core'

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
  content: fields.mdx({ label: 'Content' }),
}

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
      path: '../src/posts/*',
      format: { contentField: 'content' },
      schema: postSchema,
    }),
    postsFr: collection({
      label: 'French posts',
      slugField: 'title',
      path: '../src/fr/posts/*',
      format: { contentField: 'content' },
      schema: postSchema,
    }),
  },
})
