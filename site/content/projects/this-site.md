---
title: "This site"
summary: "netstatedata.ca as a working piece of infrastructure: written in Markdown, built with Hugo, versioned on GitHub, deployed by GitHub Actions to Azure, and packaged to run in a container."
hook: "This site is a profile, and it is also a working piece of infrastructure that I build, run and ship myself. Here it is in pieces: how it is built, how I work on it, how you can run it yourself, and the source behind all of it."
layers: ["L7", "X2", "X3"]
topics: []
status: "live"
visibility: "public"
repo: "https://github.com/jasonmcginn/ProfessionalProfile"
builds_on: []
related: []
weight: 5
aliases: ["/docs/project/"]
evidence:
  - {title: "The live site", desc: "What you're reading, served from Azure Static Web Apps on its own domain.", file: "https://www.netstatedata.ca/"}
  - {title: "The deploy pipeline", desc: "Every GitHub Actions run that built and shipped the site.", file: "https://github.com/jasonmcginn/ProfessionalProfile/actions"}
  - {title: "The commit history", desc: "Every change to the site, in order, with its message.", file: "https://github.com/jasonmcginn/ProfessionalProfile/commits/main"}
phases:
  - {name: "v1", desc: "Single-page site (one HTML file) in the wwwprofile repo, deployed to Azure Static Web Apps.", status: "archived"}
  - {name: "v2", desc: "Hugo multi-page site with a typed content model, library, projects and the XP desktop homepage, deployed from ProfessionalProfile.", status: "live"}
pdf: ""
links: []
---
