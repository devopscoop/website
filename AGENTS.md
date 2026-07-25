# AGENTS.md

Instructions for AI coding agents working in this repo. `CLAUDE.md` is a symlink to this file — edit `AGENTS.md` and leave the symlink in place.

## Commands

There is no package manager, test suite, or linter. The only build step is compiling the SCSS:

```shell
# Compile public/sass/ -> public/assets/css/ with a locally installed dart-sass
sass --no-source-map --style=compressed public/sass:public/assets/css

# Or compile inside the pinned dart-sass image. This validates the SCSS, but the
# output stays in the image — it is not written back to the working tree.
docker build -t website public/
```

To preview, serve `public/` over HTTP. Opening the markdown pages from `file://` does not work, because zero-md `fetch()`es the `.md` file.

## Architecture

A static site with no static-site generator. `public/` is both the site root and the GitLab Pages artifact path.

**The compiled CSS is committed, and nothing compiles it on deploy.** `.gitlab-ci.yml` publishes `public/` verbatim (its build script is `echo "doing nothing"`). Any edit under `public/sass/` must be compiled and the resulting `public/assets/css/main.css` committed in the same change, or the deployed site will not reflect it.

**Pages** are hand-written HTML at the root of `public/`, with no router and no shared includes:

- `index.html` — the plain landing page.
- `template-md.html` and `behringer.html` — identical shells that differ only in the `<zero-md src="./content/*.md">` path. To add a markdown page, copy one and point `src` at a new file in `public/content/`.

**Markdown renders client-side.** zero-md fetches the `.md` and renders it into a shadow root, with KaTeX and highlight.js loaded from CDN. Page-level `<link>` tags do not cross the shadow boundary, so the stylesheets are re-declared inside `<zero-md><template>` — that is why each markdown page links `main.css` twice. `_markdown.scss` styles that shadow content through `.markdown-body`.

**The fade-in is JS-gated.** The gradient backdrop (`#wrapper:before`) and `#highlight` both start at `opacity: 0`; `assets/js/main.js` adds a `.render` class to `#wrapper` and `#highlight`, which is what transitions them in. It looks both IDs up unconditionally, so a page that omits `main.js` — or that drops either ID — renders invisible.

**Cache busting** is the `?v=` query string on the `main.css` links; bump it when the CSS changes. The pages are currently out of sync — `index.html` is at `1.1.0`, the markdown pages at `1.2.0`.

**SCSS layout:** `main.scss` is the only entry point; `_reset.scss` and `_markdown.scss` are partials it imports.

## CI

- **GitLab** (`.gitlab-ci.yml`) is the deploy path: Pages publishes `public/` on the default branch only.
- **GitHub Actions** build and push a container image to ghcr.io and run the Claude review/mention workflows. Third-party actions are pinned to a commit SHA with a trailing `# vX.Y.Z` comment — pin any new ones the same way.

## Package manifests

This repo ships a `Brewfile` (macOS: `brew bundle`) and a `pkglist.txt` (Arch Linux) that install the local tools the repo uses. Keep them in sync with the code:

- When you add a build step, script, or tool a human runs locally, add the package to BOTH files, with a comment noting what uses it.
- When a tool stops being used, remove it from both files.
- CDN-delivered browser dependencies (zero-md, KaTeX, highlight.js) load at page view and do NOT belong in the manifests; neither do tools that only run inside `public/Dockerfile` or CI.
- Verify package names before adding them: `brew info <formula>` for Homebrew, and the official repos/AUR for Arch. If a package is AUR-only, note that in pkglist.txt's header instructions.
- Update the "Install required packages" section in README.md if the tool list changes.
