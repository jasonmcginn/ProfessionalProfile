---
title: "The NetState Lab Network (Docker Compose)"
summary: "The whole lab in one Compose file: the network (a firewall, two clients and a server) by default, and the AI agents from agent-lab and agent-workflow when you ask for them."
hook: ""
layers: ["L4", "L3", "X2", "X3"]
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

<p class="tbd-note">[Placeholder: the repo and images are not published yet. The network part runs today; the agent parts are planned.]</p>

One Compose file runs the whole lab. What starts depends on what you ask for:

| Command | What starts |
|---|---|
| `docker compose up -d` | The network: fw, client-a, client-b and server. Nothing else. |
| `docker compose --profile agents up -d` | The network, plus the local model runtime and the monitor agent from agent-lab |
| `docker compose --profile workflow up -d` | All of the above, plus the agent team and orchestrator from agent-workflow |

The network starts on its own because most of the lab doesn't need the agents, and the local model is a large download that is heavy on the processor. The agents join the same networks the lab already uses, each with only the access its role needs; the monitor is read-only.

Containers have no route out of the lab, and every packet between the LAN and the DMZ crosses the firewall. Images build in GitHub Actions and publish to ghcr.io.
