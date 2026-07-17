# Brewfile for website
#
# Installs every CLI tool used or referenced by this repo.
# Usage: brew bundle

# dart-sass (`sass`) - compiles public/sass/*.scss to public/assets/css/.
# public/Dockerfile pins DART_SASS_VERSION=1.70.0; Homebrew installs latest.
brew "dart-sass"

# colima + Docker CLI - running the documented build via public/Dockerfile.
# colima provides the Docker engine in a lightweight VM; run `colima start`
# before building. (Alternative: the docker-desktop cask.)
brew "colima"
brew "docker"

# git - cloning and contributing
brew "git"
