# AGENTS.md

Instructions for AI coding agents working in this repo.

## Package manifests

This repo ships a `Brewfile` (macOS: `brew bundle`) and a `pkglist.txt` (Arch Linux) that install the local tools the repo uses. Keep them in sync with the code:

- When you add a build step, script, or tool a human runs locally, add the package to BOTH files, with a comment noting what uses it.
- When a tool stops being used, remove it from both files.
- CDN-delivered browser dependencies (zero-md, KaTeX, highlight.js) load at page view and do NOT belong in the manifests; neither do tools that only run inside `public/Dockerfile` or CI.
- Verify package names before adding them: `brew info <formula>` for Homebrew, and the official repos/AUR for Arch. If a package is AUR-only, note that in pkglist.txt's header instructions.
- Update the "Install required packages" section in README.md if the tool list changes.
