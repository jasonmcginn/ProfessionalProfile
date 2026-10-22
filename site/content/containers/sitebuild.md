---
title: "This site itself (Hugo + Azure)"
summary: "The site you're reading, packaged to run in any web server: a Hugo build served by nginx in a container. Open source, build it and run it yourself."
hook: "The site you're reading, packaged to run anywhere: Hugo builds it to static files and nginx serves them from a container, so you can run the whole thing on your own machine with one command."
layers: ["X3"]
accordion: "X3"
project: "living-portfolio"
topics: []
status: "live"
visibility: "public"
image: "ghcr.io/jasonmcginn/professionalprofile (nginx unprivileged, multi-stage build from hugomods/hugo)"
pull: "docker pull ghcr.io/jasonmcginn/professionalprofile:latest"
run: "docker run -p 8080:8080 ghcr.io/jasonmcginn/professionalprofile:latest"
repo: "https://github.com/jasonmcginn/ProfessionalProfile"
pdf: ""
links: [{label: "How this site is built", url: "/docs/buildlog/"}]
---

This website is one of the projects. Everything you're reading is a static site I build from plain Markdown, and the repository ships with a Dockerfile, so you can build it and serve it from a normal web server on your own machine, exactly as it runs in production.

## The stack

- **Hugo** builds the site. Every page starts as Markdown, and the design is a custom terminal theme I wrote by hand, not an off-the-shelf template.
- **A typed content model** drives everything you see. Each object on the site, whether a story, a document, a script, or a container like this one, is a single tagged Markdown file. The layer accordion on the home page, the library, and the "dig deeper" links all generate themselves from those tags, so adding one file makes an object appear everywhere it belongs.
- **Docker + nginx** package it to run anywhere. A multi-stage build compiles the site with Hugo, then copies the static output into a small nginx image that runs as a non-root user and serves it on port 8080.
- **Azure Static Web Apps** hosts the live site on a global CDN, with free TLS and the custom domain bound to it.
- **GitHub Actions** ties it together. A push to `main` only builds and checks the site. It goes live when I publish a release: Actions builds it, saves a copy of the built site with the release, scans and publishes this container image, then deploys. Pull requests each get their own temporary preview URL, so a change can be reviewed live before it reaches the real site.

## Run it in a container

Every release is published as an image on the GitHub Container Registry, so you can run it without cloning or building anything. nginx serves the site on port 8080:

Then open `http://localhost:8080`. To run a specific release, replace `latest` with its version, for example `v2.1.0`. To build it yourself instead, run `docker build -t netstatedata .` from the repository root; the build runs Hugo inside the image, so you only need Docker.

## Or run the source directly

If you'd rather work on the content, clone the repository, install Hugo (the extended build), and run `hugo server` from the `site/` folder, then open `http://localhost:1313`.

## Why it's here

The repository is public on purpose. The structure, the Dockerfile, the commit history, and the deployment pipeline are part of the proof: they show how I lay out a project, make it portable, automate its delivery, and keep both the design and the infrastructure documented. For the full walkthrough of the toolchain, the workflow, and how the domain is set up, see the write-up linked below.
