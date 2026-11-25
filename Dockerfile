# syntax=docker/dockerfile:1
# Build this site into static files with Hugo, then serve them with nginx.
#   docker build -t netstatedata .
#   docker run -p 8080:8080 netstatedata   ->  http://localhost:8080
# Or pull a published release instead of building:
#   docker run -p 8080:8080 ghcr.io/jasonmcginn/professionalprofile:latest

# --- Stage 1: build the static site ---
# Hugo comes from its official GitHub release, pinned to the version the site
# is developed and deployed with, and checked against the published SHA-256
# checksum before it runs. (A third-party Hugo image was used here before; its
# tag for this version did not exist, which broke the build.)
FROM debian:trixie-slim AS build
ARG HUGO_VERSION=0.168.0
ARG HUGO_SHA256_AMD64=787f100057328824f38c6ad7c87ff10d6451ae0a7bc39cedaad0dd2bcde17e53
ARG HUGO_SHA256_ARM64=b975ba150a464f57115bdf6cbf6638224906461fdcf863821ec983f8602a442c
ARG TARGETARCH=amd64
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates curl \
 && rm -rf /var/lib/apt/lists/*
RUN set -eu; \
    case "$TARGETARCH" in \
      amd64) SUM="$HUGO_SHA256_AMD64" ;; \
      arm64) SUM="$HUGO_SHA256_ARM64" ;; \
      *) echo "unsupported architecture: $TARGETARCH" >&2; exit 1 ;; \
    esac; \
    FILE="hugo_extended_${HUGO_VERSION}_linux-${TARGETARCH}.tar.gz"; \
    curl -fsSL -o "/tmp/$FILE" "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/$FILE"; \
    echo "$SUM  /tmp/$FILE" | sha256sum -c -; \
    tar -xzf "/tmp/$FILE" -C /usr/local/bin hugo; \
    rm "/tmp/$FILE"; \
    hugo version
WORKDIR /src
COPY site/ ./
# baseURL "/" makes asset links root-relative so it works on any host/port.
ARG HUGO_BASEURL="/"
RUN hugo --minify --baseURL "${HUGO_BASEURL}"

# --- Stage 2: serve with a normal web server ---
# nginx stable line, unprivileged build: runs as a non-root user (uid 101)
# and listens on 8080, since non-root processes can't bind port 80.
# The image is published as nginx/nginx-unprivileged. The older
# nginxinc/nginx-unprivileged name stopped receiving updates at 1.30.6, which
# left this image on an nginx with known critical issues (release v2.4.1).
FROM nginx/nginx-unprivileged:1.30-alpine
# The base image is rebuilt weekly. Pick up any Alpine security fixes published
# since then, leaving nginx itself to the base image (its packages come from
# nginx.org, and Alpine's own nginx build must not replace them).
USER root
RUN apk upgrade --no-cache $(apk info 2>/dev/null | grep -v '^nginx') \
 && nginx -v
USER 101
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/public /usr/share/nginx/html
EXPOSE 8080
