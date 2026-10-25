# Nihal Yadav — Portfolio

Personal site: https://portfolio-n-5uz6.vercel.app

## Stack

- Next.js 16 (App Router, statically prerendered) + React 19
- TypeScript
- Tailwind CSS v4
- `motion` for scroll reveals (respects reduced-motion)
- `next-themes` for light/dark mode
- Generated Open Graph image, sitemap, robots.txt and JSON-LD for SEO

## Editing content

All text on the site lives in [`client/src/content/site.ts`](client/src/content/site.ts):
experience, projects, skills, achievements, education and links.
Edit that file and redeploy; no component changes needed.

## Run locally

```bash
cd client
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Vercel, with the project's root directory set to `client`.
`client/vercel.json` pins the framework to Next.js.
