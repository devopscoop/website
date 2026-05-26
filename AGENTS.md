# AGENTS.md — devops.coop website

## Stack

Vanilla HTML/CSS/JS. No framework, no package manager, no build step. Files in `public/` are served as-is.

## Dev server

```sh
python -m http.server 5000 --directory public --bind 0.0.0.0
```

## Remotes

| remote     | URL                                     |
| ---------- | --------------------------------------- |
| `origin`   | git@gitlab.com:devopscoop/website.git   |
| `github`   | git@github.com:devopscoop/website.git   |
| `codeberg` | git@codeberg.org:devopscoop/website.git |

Default branch is `main`; current HEAD is `launch`.

## CI

- **GitHub Actions** (`.github/workflows/docker-build-push.yml`): Build & push multi-platform Docker image to `ghcr.io/devopscoop/website` on push/PR to `main`.
- **GitLab CI** (`.gitlab-ci.yml`): Deploys `public/` to GitLab Pages.
- **Codeberg**: No CI configured.

## Key files

| Path                             | Purpose                                                                    |
| -------------------------------- | -------------------------------------------------------------------------- |
| `public/index.html`              | Home page (entrypoint)                                                     |
| `public/join.html`               | Membership page                                                            |
| `public/get-started.html`        | Getting-started page                                                       |
| `public/assets/css/style.css`    | All styles                                                                 |
| `public/assets/js/components.js` | Client-side fetch of `components/header.html` and `components/footer.html` |
| `public/assets/js/gradient.js`   | Mouse-follow gradient background                                           |
| `public/Dockerfile`              | **BROKEN** — expects `sass/` dir that does not exist                       |
| `replit.md`                      | Old README (keep in sync if you update this file)                          |

## Gotchas

- **No build, test, lint, format, or typecheck tooling** exists.
- **Docker build is broken**: `Dockerfile` references `./sass` but no `sass/` directory exists. The real CSS is hand-written.
- **Header/footer are loaded client-side** via `fetch()` in `components.js`. Pages require JS for navigation; there is no server-side include.
- **No `.env` or environment variables** are used anywhere.
- **Dependabot** config exists but is a placeholder — empty ecosystem, does nothing.

## Agent rules

- **Never force push** under any circumstances.
- **Do not commit, merge, or push** without asking for consent first.
- **Do not add build/test/lint/format tooling** without asking.
