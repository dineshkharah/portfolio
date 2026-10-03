# Portfolio

A one page portfolio site for Dinesh Kharah, built with Next.js and Tailwind CSS. Every page is generated as static HTML at build time, so there is no server, no database and no client side data fetching. Deployed to Vercel at https://dineshkharah.vercel.app.

## Running it

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000 and reloads as you edit.

To build the production version and serve it the way Vercel will:

```bash
npm run build
npm start
```

## Where things live

All the text on the page sits in one file, `src/content/site.js`. Edit that by hand to change any wording, add a project, or update a link. A content change needs nothing else.

| Path | What it holds |
|---|---|
| `src/content/site.js` | every piece of text on the page |
| `src/app/page.js` | the page itself, section by section |
| `src/app/layout.js` | the html shell and the page metadata |
| `src/app/globals.css` | design tokens and the type scale |
| `public/` | resume pdf, favicon, social share image |

## After deploy

Ideas and fixes parked during the build, to pick up once the site is live.

Nothing yet.
