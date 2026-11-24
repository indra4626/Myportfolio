# Indra Hembram Portfolio

Single-page React portfolio built with Vite.

## Run locally

Requires Node.js 22.12 or newer.

1. Install dependencies with `npm ci`.
2. Start the development server with `npm run dev`.
3. Create a production build with `npm run build`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the app and deploys `dist/` when changes are pushed to `main`. In the repository settings, set Pages to use **GitHub Actions** as its source.

The Vite configuration applies the `/Myportfolio/` base path in GitHub Actions builds. The source assets are kept in `assets/`; replace `profile.webp`, `icon.png`, or `resume.pdf` there to update the portfolio media.
