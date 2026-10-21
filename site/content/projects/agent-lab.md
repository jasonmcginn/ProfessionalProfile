---
title: "agent-lab"
summary: "Local AI agents with separate jobs, a monitor, a fixer and a communicator, running on my own hardware and working on the knock-lab network."
hook: "AI agents are only useful in operations if you can trust what they do. This lab gives each agent one job, runs them on local models, and puts a person in the loop before anything changes."
layers: ["X3", "X4"]
topics: []
status: "planned"
visibility: "public"
repo: ""
builds_on: ["knock-lab"]
related: []
weight: 20
evidence:
  - {title: "The monitor catches an event", desc: "The monitor spots a problem in the knock-lab network and raises it, with the log lines it saw.", file: ""}
  - {title: "The fixer proposes, a person approves", desc: "The fixer's proposed change, the approval, and the result, shown in order.", file: ""}
  - {title: "The communicator reports", desc: "The plain-language message the communicator sends about what happened and what was done.", file: ""}
phases:
  - {name: "v1", desc: "Monitor only: read-only access to knock-lab logs and captures. It watches and reports, it cannot change anything.", status: "planned"}
  - {name: "v2", desc: "Communicator: turns the monitor's findings into a clear message for a person.", status: "planned"}
  - {name: "v3", desc: "Fixer: proposes changes, a person approves each one before it runs, and every action is logged.", status: "planned"}
pdf: ""
links: []
---

<p class="tbd-note">[Placeholder: this project is being planned. The roles and intent are set; the content, code and evidence are not written yet. Name is provisional.]</p>

## What it is

A set of AI agents running on local models on my own hardware, so no logs or network data leave the lab. Each agent has one job and only the access that job needs:

| Agent | Job | Access |
|---|---|---|
| Monitor | Watches knock-lab's logs, captures and web server, and flags what looks wrong | Read-only |
| Fixer | Proposes a fix for what the monitor found | Proposes only; a person approves before anything runs |
| Communicator | Explains what happened and what was done, in plain language | Sends messages, changes nothing |
| More later | [TBD] | [TBD] |

## Why the roles are split

The same rule I use for people applies to agents: least privilege, documented, and nothing changes without a check. Splitting the roles means the agent that watches can't act, and the agent that acts can't act alone. It follows my usual pattern: diagnose (monitor), propose (fixer), verify (a person approves and the monitor confirms), and communicate.

## Tools

[TBD: model runtime, orchestration and how agents talk to each other.]
