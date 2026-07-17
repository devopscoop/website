# website

Static website. The site source lives under `public/` (also the GitLab Pages artifact path). Markdown pages are rendered client-side (zero-md, KaTeX, highlight.js via CDN), so there is no static-site generator — the only build step is compiling the SCSS in `public/sass/` to `public/assets/css/`, which `public/Dockerfile` does with dart-sass (pinned to 1.70.0).

## Install required packages

This repo ships package manifests that install the local tools it uses (`sass` from dart-sass, `docker`, `git`):

- macOS, using [Homebrew](https://brew.sh/) and the `Brewfile`:

  ```shell
  brew bundle
  ```

- Arch Linux, using the `pkglist.txt` (all packages are in the official repos):

  ```shell
  grep -vE '^(#|$)' pkglist.txt | sudo pacman -S --needed -
  ```

On other operating systems, install the tools listed above manually.

## Building the CSS

Either build the image, which compiles the SCSS inside it:

```shell
docker build -t website public/
```

or compile directly with a locally installed dart-sass:

```shell
sass --no-source-map --style=compressed public/sass:public/assets/css
```
