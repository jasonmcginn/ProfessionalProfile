---
title: "The NetState Lab Network"
summary: "A small containerized network built in three phases: a baseline with my 2010 port knock, the same tests rerun with modern access tools, and traffic shaping, each with written-up results."
hook: "Services exposed to the internet get scanned all day. Around 2010 I took my own remote access (RDP and SSH) off the internet and hid it behind a port knock. This lab rebuilds that design, puts it next to what replaced it, and runs the same tests against each one so the differences show up in the captures."
layers: ["L4", "L3", "L7"]
topics: []
status: "planned"
visibility: "public"
repo: "https://github.com/jasonmcginn/netstate-lab-network"
builds_on: ["living-portfolio"]
related: []
weight: 10
evidence:
  - {title: "Phase 1 results: the baseline", desc: "The network as built, tested: what the outsider's scan finds, how the authorized client gets in, what the firewall capture shows, and plain HTTP read off the wire. Every later phase is measured against this.", file: ""}
  - {title: "Phase 2 results: modern tools against the baseline", desc: "The same tests rerun with the newer access methods in place, including a replay of a captured knock, side by side with the baseline.", file: ""}
  - {title: "Phase 3 results: traffic shaping", desc: "Latency, loss and load applied on the firewall, with before and after measurements of what the clients experience.", file: ""}
phases:
  - {name: "Phase 1", desc: "Build the network and get a baseline: topology, deny-all firewall, open web server, the 2010 knock recreated, captures everywhere. Test it and write up the results.", status: "planned"}
  - {name: "Phase 2", desc: "Change the tools: swap in modern access methods (for example single packet authorization) and rerun the same tests. Write up the results against the baseline.", status: "planned"}
  - {name: "Phase 3", desc: "Demonstrate traffic shaping on the firewall, measure its effect, and write up the results.", status: "planned"}
pdf: ""
links: []
---

<p class="tbd-note">[Placeholder: the structure is set; technical details, code and results come next.]</p>

## What it is

A small network that runs on one machine with a single `docker compose up`. A firewall sits between a LAN with two clients and a DMZ with a server. One client knows how to get in, the other is an outsider who scans and gets nothing. The web server is open to everyone, the way a real DMZ serves the public, while remote access (RDP and SSH) stays hidden behind the knock. Everything that crosses the firewall is captured, so the proof is in the packets, not in my description of them.

```text
   LAN 10.10.10.0/24                          DMZ 10.10.20.0/24
  +------------------+                      +----------------------+
  | client-a         |                      | server               |
  | authorized       |---+              +---| web :80 (open)       |
  | knock, rdp, ssh  |   |  +--------+  |   | rdp :3389, ssh :22   |
  | curl, tcpdump    |   +--| fw     |--+   | closed until knocked |
  +------------------+   |  |deny-all|      +----------------------+
  +------------------+   |  |knock   |
  | client-b         |---+  |shaping |
  | outsider         |      |tcpdump |
  | nmap, scans      |      +--------+
  | tcpdump          |
  +------------------+
```

## How it is structured

Three phases. Each one is built, tested, and written up with its results, and each is measured against the first.

**Phase 1: build the network and get a baseline.** Stand up the network, lock the firewall to deny-all, open the web server, and recreate my 2010 knock. Then test it: what an outsider can see, how the authorized client gets in, and what crosses the wire. Those results are the baseline.

**Phase 2: change the tools and test again.** Replace the 2010 knock with modern access methods, such as single packet authorization, and run the same tests. The results sit side by side with the baseline, so the differences are measured, not claimed.

| Test | 2010 knock (baseline) | Modern methods |
|---|---|---|
| Outsider scan | [result] | [result] |
| Authorized client gets in | [result] | [result] |
| Outsider replays a captured knock | [result] | [result] |
| What the firewall capture shows | [capture] | [capture] |

**Phase 3: demonstrate traffic shaping.** Shape the traffic on the firewall, adding latency, loss and load, and show the effect on the clients with before and after results.

[TBD: technical details for each phase are decided once the structure is approved.]

<!--after-pieces-->

## Where it leads

This network is the base for the next project. The agents in agent-lab run on top of it, so its traffic, logs, captures and results become the material they watch and learn from.

## The honest framing

Port knocking is one layer on top of a deny-all firewall, not a lock on its own. The 2010 design is shown with its year, and the results show plainly where it falls short and why the field moved on.
