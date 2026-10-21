# syntax=docker/dockerfile:1
# Build this site into static files with Hugo, then serve them with nginx.
#   docker build -t netstatedata .
#   docker run -p 8080:8080 netstatedata   ->  http://localhost:8080
# Or pull a published release instead of building:
#   docker run -p 8080:8080 ghcr.io/jasonmcginn/professionalprofile:latest

# --- Stage 1: build the static site ---
# Pinned to the Hugo version the site is developed with. If this tag is ever
# unavailable, use hugomods/hugo:exts (latest extended) instead.
FROM hugomods/hugo:exts-0.168.0 AS build
WORKDIR /src
COPY site/ ./
# baseURL "/" makes asset links root-relative so it works on any host/port.
ARG HUGO_BASEURL="/"
RUN hugo --minify --baseURL "${HUGO_BASEURL}"

# --- Stage 2: serve with a normal web server ---
# nginx stable line, unprivileged build: runs as a non-root user (uid 101)
# and listens on 8080, since non-root processes can't bind port 80.
FROM nginxinc/nginx-unprivileged:1.30-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/public /usr/share/nginx/html
EXPOSE 8080
