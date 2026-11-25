---
title: "Self Healing Network Example using AI Agents"
slug: "self-healing-network"
aliases: ["/projects/agent-lab/"]
summary: "NetState Core: an offline set of Docker containers that watch a network, rate what they find, and propose reversible fixes, while a person decides and runs each one."
hook: "A network that heals itself, but only on a person's say-so. Agents watch, rate what they find, and propose a fix with its undo. Nothing changes a machine on its own: a person decides, and the whole chain is on the record."
layers: ["X3", "X4"]
topics: []
status: "planned"
quiet: true
visibility: "public"
repo: ""
builds_on: []
related: []
weight: 20
evidence:
  - {title: "The loop runs end to end", desc: "A seeded problem detected, rated, a fix proposed with its undo, checked against policy, and run by hand, with the audit trail that records it.", file: ""}
  - {title: "Read-only, proven", desc: "A watching agent tries to change something and is refused, showing its access is limited to watching, even when a log line tries to tell it to act.", file: ""}
  - {title: "Ask it what happened", desc: "The local model answering a question from the live state of the network, with no data leaving the system.", file: ""}
phases:
  - {name: "The loop", desc: "Detect, rate, propose a reversible fix, check it against policy, brief the decision, then a person decides and runs it by hand. Recorded tamper-evidently at every step.", status: "running"}
  - {name: "The agents", desc: "A starting set split by job: watch and read logs, correlate and rate, propose a fix with its undo, gate it against policy, log everything. A probing agent generates real traffic for the others to catch.", status: "wave 1 built"}
  - {name: "The manager", desc: "A local AI model on top that you can ask what is going on, answering from the live state of the network. The model is swappable, and runs on my own hardware.", status: "built"}
  - {name: "Build, validate, deploy out", desc: "Use Core as a place to prove out services and rules (firewall, policy, runbooks) under the same watched, rated, recorded loop, then push the validated ones to a real network.", status: "planned"}
pdf: ""
links: []
---

<!-- Built from the private NetState Core project (NetStateData Systems - Core). PUBLIC-SAFE DRAFT, for Jason to verify. Deliberately left out: internal addressing, container/host names, manifest versions, file paths, and operational specifics. Honest depth is kept in project context, not stated on the page. Evidence not yet captured (file: "" placeholders). -->

<p class="tbd-note">[Draft from the NetState Core project. The system is built and running; the write-up and the evidence below are still being captured.]</p>

## What this is

NetState Core is a self-contained, offline self-healing network. It is a locked-down set of Docker containers that watch a managed network, detect problems, rate how serious they are, and propose fixes that can be undone. A person stays in the loop to decide and run each fix, and every step is recorded, so nothing is hidden.

It runs entirely on my own hardware. No logs or network data leave it, which is what lets it sit in places normal cloud security tooling can't go: air-gapped sites, regulated environments, or a small network you want watched without sending anything out.

## The loop

The whole design serves one cycle:

```text
  detect  ->  rate  ->  propose  ->  gate  ->  brief  ->  decide  ->  run
  (watch)   (how bad)  (fix+undo)  (policy)  (the view)  (a person)  (by hand)
                                                              |
                                                     recorded at every step
```

An agent spots something. Another rates how serious it is. A fix is proposed together with the exact steps to reverse it. The fix is checked against policy before anyone sees it. The decision is briefed in one view. Then a person decides, and runs the fix by hand. Nothing changes a managed machine on its own.

## What the agents do

<div class="cards2 c3">
<div><p class="k">Watch</p>A read-only agent reads the logs and reports what looks wrong. It can only watch, even when a log line tries to tell it to act.</div>
<div><p class="k">Rate and route</p>Findings are correlated and rated for severity, then turned into incidents and sent to the right place.</div>
<div><p class="k">Propose a fix</p>A fix is built from the event, as a runbook with the values filled in, and always with its reverse.</div>
<div><p class="k">Gate on policy</p>Every proposal is checked against policy before a person ever sees it. Nothing skips the gate.</div>
<div><p class="k">Brief the decision</p>At decision time, one view shows the incident, the fix, and the policy verdict together.</div>
<div><p class="k">Log everything</p>Every step and every decision is written to a single tamper-evident record. Nothing runs unlogged.</div>
<div><p class="k">Probe</p>A probing agent runs scans and exposure checks against the demo network, so there is real traffic for the others to catch. It only looks, never changes a target.</div>
<div><p class="k">Ask it</p>A local AI model sits on top as something you can talk to, answering from the live state of the network.</div>
<div><p class="k">Check the baseline</p>A decided baseline is captured once and watched for drift, so a change from the agreed state stands out.</div>
</div>

## Rules detect, AI judges

Simple checks don't need AI. Is the site up, is the service running, did the firewall just block someone: plain scripts answer those instantly and reliably, and there is nothing in them to trick. The AI is kept for what rules can't express: patterns, judgment, and explaining what happened in plain language. The order is deliberate: script, then rule, then a small local model, then a larger one, and only as a last resort anything external, gated and logged.

## How it's built

<div class="cards2">
<div><p class="k">Offline by construction</p>The management side has no way out. Core depends on nothing outside itself, and any path to the outside is explicit, logged, and controlled.</div>
<div><p class="k">Least privilege</p>Every agent gets only the access its job needs. The watchers watch and cannot change anything.</div>
<div><p class="k">Agents propose, a person acts</p>An approved fix is run by a person, by hand, and recorded. Autonomy is a deliberate future decision, not a default.</div>
<div><p class="k">Swappable, not locked in</p>The model and the engine behind the manager are replaced through small, defined seams. No single vendor or part is load-bearing.</div>
<div><p class="k">Tamper-evident record</p>Decisions are written to a hash-chained log, so the history of what was approved and run can be trusted.</div>
</div>

## Why I built it this way

The same rule I use for people applies to agents: least privilege, documented, and nothing changes without a check. Starting with watchers that can only read means the setup is proven, and the reports can be trusted, before anything is ever allowed to act. It also makes the audit log something more over time: a growing, human-labelled record of real security decisions, which is the raw material for measuring and improving the agents later.

## Who it's for

A small-business network guardian. A transparent, watched security gateway for a device or a small set of devices. Air-gapped and regulated environments where cloud tooling can't reach. Training and exercises for analysts. Change-safety and drift detection against a decided baseline. And, underneath all of it, a worked reference for building agentic systems that are safe by construction.

## Planned

[planned] Hook Core into real event and log sources, so it watches and heals a real network, not only its own demo one.

[planned] Sit inline as a device's firewall and gateway on a separate, logged path, with small wireless front-end devices bridged in, while the management side stays offline.

[planned] Use the audit log as a training signal: score the agents against seeded scenarios, tune the rules from real decisions, and improve the local model from the operator's own calls.
