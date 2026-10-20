# syntax=docker/dockerfile:1
# Build this site into static files with Hugo, then serve them with nginx.
#   docker build -t netstatedata .
#   docker run -p 8080:80 netstatedata   ->  http://localhost:8080

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
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/public /usr/share/nginx/html
EXPOSE 80
