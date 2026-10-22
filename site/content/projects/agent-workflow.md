---
title: "agent-workflow"
summary: "A junior admin team of local AI agents, each with one job, that finds problems, explains them and routes them to the right person. The agents change nothing; a person decides every action."
hook: "One agent that watches is a start. This project gives the lab a team: agents that alert, troubleshoot, communicate and write code, working together in one orchestrated workflow, with a person approving anything that changes the system."
layers: ["X3", "X4"]
topics: []
status: "planned"
visibility: "public"
repo: ""
builds_on: ["agent-lab"]
related: []
weight: 30
evidence:
  - {title: "An event, end to end", desc: "One problem followed through the whole workflow: detected, alerted, diagnosed, a fix proposed and approved, the result confirmed and reported.", file: ""}
  - {title: "The approval gate", desc: "A proposed change waiting for a person's approval, and the log showing nothing ran before it was given.", file: ""}
  - {title: "The report", desc: "The plain-language message the communicator sends about what happened and what was done.", file: ""}
phases:
  - {name: "v1", desc: "Triage and alerts: a ban checked against the firewall log for an earlier port scan, then routed by severity to the Network Administrator or escalated to the IT Coordinator, with evidence prepared by a script.", status: "planned"}
  - {name: "v2", desc: "Response scripts: reviewed scripts a person runs, such as extra logging on a source address that expires on its own, and a verified unlock for a real user who locked themselves out.", status: "planned"}
  - {name: "v3", desc: "Vulnerability agent: service and application versions checked against known vulnerabilities, ranked by severity, and fixed through a reviewed release.", status: "planned"}
  - {name: "v4", desc: "Respond and \"What would AI do?!\": the person sees the evidence first and asks for the AI's recommendation only if they want it, then agrees or disagrees.", status: "planned"}
  - {name: "v5", desc: "Troubleshoot: diagnoses a problem and proposes a fix; a person approves before anything runs.", status: "planned"}
  - {name: "v6", desc: "Coder and orchestration: proposed code changes, and the agents tied together into one workflow, every step logged.", status: "planned"}
pdf: ""
links: []
---

<p class="tbd-note">[Placeholder: this project is being planned. The roles and intent are set; the content, code and evidence are not written yet. Name is provisional.]</p>

## What it is

The agents from agent-lab grow into a team. Each one has a single job and only the access that job needs, and an orchestrator ties them into one workflow.

| Agent | Job | Access |
|---|---|---|
| Monitor (from agent-lab) | Watches the lab and flags what looks wrong | Read-only |
| Triage | Gathers the evidence, decides how serious it is and who needs to know | Read-only, changes nothing |
| Vulnerability | Checks versions against known vulnerabilities and ranks the risk | Read-only, changes nothing |
| Troubleshooter | Diagnoses the problem and proposes a fix | Proposes only; a person approves before anything runs |
| Communicator | Explains what happened and what was done, in plain language, to the right person | Sends messages, changes nothing |
| Coder | Writes or changes scripts when a fix needs code | Proposes only; a person approves before anything runs |
| Orchestrator | Moves each event through the workflow, in order | Coordinates the agents, every step logged |
| More later | [TBD] | [TBD] |

## Why the roles are split

Splitting the roles means the agent that watches can't act, and no agent that acts can act alone. The workflow follows my usual pattern: diagnose (monitor and troubleshooter), propose (troubleshooter and coder), verify (a person approves, the monitor confirms), and communicate.

## Tools

[TBD: orchestration, and how the agents pass work to each other.]
