# Keystatic admin

This is a separate Astro app for editing the Markdown content used by the main
static site. It does not replace `build.mjs` or the GitHub Pages workflow.

For local development, create `.env` with the Keystatic GitHub variables, then
run from this directory:

```bash
npm install
npm run dev
```

Open <http://localhost:4321/keystatic>.

The deployed app uses GitHub storage and commits changes to the repository.
The production URL is `https://edit.arthak.fr`.

Required variables: `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and
`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.

Cloudflare deployment:

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

The Worker is named `arthak-keystatic-admin` and uses the custom domain
`edit.arthak.fr`.
