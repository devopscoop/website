# DevOps.coop Static Website

## Overview
A static website for devops.coop with the tagline "innovate and iterate" - providing opinionated technology solutions via open source implementations.

## Project Structure
- `public/` - Static website files served to users
  - `index.html` - Main landing page
  - `behringer.html` - Additional page
  - `template-md.html` - Markdown template
  - `assets/` - Static assets (CSS, JS, images)
  - `sass/` - SCSS source files
  - `content/` - Markdown content files
- `LICENSE` - Project license

## Technology Stack
- **Frontend**: Static HTML, CSS, JavaScript
- **CSS Preprocessing**: Dart Sass (SCSS)
- **Server**: Python HTTP server (development)

## Development
The website is served using Python's built-in HTTP server on port 5000.

### SASS Compilation
The original project used Docker with Dart Sass to compile SCSS. The compiled CSS is already included in `public/assets/css/`.

## Deployment
Configured as a static site deployment serving the `public/` directory.
