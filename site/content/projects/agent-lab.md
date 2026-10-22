---
title: "agent-lab"
summary: "Local AI models running on my own hardware inside the knock-lab network, with a first agent that watches the network read-only and reports what it sees."
hook: "AI agents are only useful in operations if you can trust what they do. This lab sets up local models next to the network lab and starts with one agent that can only watch, so trust is earned before anything can act."
layers: ["X3", "X4"]
topics: []
status: "planned"
visibility: "public"
repo: ""
builds_on: ["knock-lab"]
related: []
weight: 20
evidence:
  - {title: "The models run locally", desc: "The model runtime answering inside the lab, with no logs or network data leaving it.", file: ""}
  - {title: "The monitor catches an event", desc: "The monitor spots a problem in the knock-lab network and reports it, with the log lines it saw.", file: ""}
  - {title: "Read-only, proven", desc: "The monitor tries to change something and is refused, showing its access is limited to watching.", file: ""}
phases:
  - {name: "v1", desc: "Local model runtime set up in the lab, next to the knock-lab network.", status: "planned"}
  - {name: "v2", desc: "Monitor agent: read-only access to knock-lab's logs, captures and web server. It watches and reports, and cannot change anything.", status: "planned"}
pdf: ""
links: []
---

<p class="tbd-note">[Placeholder: this project is being planned. The intent is set; the content, code and evidence are not written yet. Name is provisional.]</p>

## What it is

Local AI models running on my own hardware, so no logs or network data leave the lab, and a first agent that works on the knock-lab network.

| Agent | Job | Access |
|---|---|---|
| Monitor | Watches knock-lab's logs, captures and web server, and flags what looks wrong | Read-only |

## Why start with one agent

The same rule I use for people applies to agents: least privilege, documented, and nothing changes without a check. The first agent can only watch. Once the setup is proven and the monitor's reports can be trusted, the next project adds agents that alert, troubleshoot, communicate and write code, and ties them together into one workflow.

## Tools

[TBD: model runtime and how the monitor reads the lab's logs and captures.]
