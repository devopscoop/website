# devops.coop website

Static HTML/CSS/JS website for [devops.coop](https://devops.coop) — a cooperative building opinionated infrastructure as code repositories based on FOSS.

## Quick start

```sh
git clone git@gitlab.com:devopscoop/website.git
cd website
python -m http.server 5000 --directory public --bind 0.0.0.0
```

Open http://localhost:5000.

## Development workflow

1. **Check out a branch** — branch from `main` for new work.
2. **Make changes** — edit files in `public/`. No build step, no compilation.
3. **Preview locally** — run the dev server and refresh the browser. For auto-reload, use a tool like [`live-server`](https://www.npmjs.com/package/live-server): `npx live-server public`.
4. **Commit and push** — open a pull/merge request against `main`.
   - Mirrored to [GitLab](https://gitlab.com/devopscoop/website), [GitHub](https://github.com/devopscoop/website), and [Codeberg](https://codeberg.org/devopscoop/website). Use whichever platform you prefer.

## Deploy

- **GitLab Pages** — auto-deploys `public/` on push to `main` (`.gitlab-ci.yml`).
- **Docker** — `Dockerfile` at repo root builds an nginx image serving `public/`. GitHub Actions builds and pushes to `ghcr.io/devopscoop/website` on push/PR to `main`.

## Project structure

```
public/            → Document root
├── index.html     → Home page
├── join.html      → Membership page
├── get-started.html
├── assets/
│   ├── css/style.css
│   ├── img/
│   └── js/
│       ├── components.js   → Loads header/footer via fetch
│       └── gradient.js     → Mouse-follow gradient
└── components/
    ├── header.html
    └── footer.html
```

The header and footer are loaded client-side by `components.js`. JavaScript is required for navigation.

## Keep in sync

If you update this file, also update [`replit.md`](replit.md) — it contains the same information for the Replit environment.
