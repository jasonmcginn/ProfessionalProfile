---
title: "The NetState Lab Network (Docker Compose)"
summary: "The whole lab network, a firewall, two clients and a server, brought up on one machine with a single command."
hook: ""
layers: ["L4", "L3", "X2"]
accordion: "L4"
project: "netstate-lab-network"
topics: []
status: "planned"
visibility: "public"
weight: 10
image: ""
pull: ""
run: ""
repo: ""
pdf: ""
links: []
---
<p class="tbd-note">[Placeholder: the repo and images are not published yet.]</p>
<p>Intent: one <code>docker compose up</code> starts the four containers on isolated internal networks, so no traffic can bypass the firewall. Images build in GitHub Actions and publish to ghcr.io.</p>
