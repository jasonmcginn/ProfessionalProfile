---
title: "The NetState Lab Network"
summary: "A small containerized network built in five phases: protocols on the wire, my 2010 port knock, fixing the leaks, modern remote access, and traffic shaping, each with written-up results."
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
  - {title: "Phase 1 results: the open network", desc: "What crosses the firewall when nothing is blocked: the same login over Telnet and SSH, a login read off the wire and reused, the network locked down and opened for purpose, and host firewalls troubleshot. Every later phase is measured against this.", file: ""}
  - {title: "Phase 2 results: the 2010 knock", desc: "SSH and RDP hidden behind the knock, then broken: a captured knock replayed by the outsider, password guessing banned, and reused credentials walking past the ban.", file: ""}
  - {title: "Phase 3 results: fixing the leaks", desc: "The Phase 1 attacks run again after Telnet is removed, keys and unique credentials are in place and the web server moves to HTTPS.", file: ""}
  - {title: "Phase 4 results: modern remote access", desc: "The same tests as Phase 2 against single packet authorization and WireGuard, side by side with the 2010 knock.", file: ""}
  - {title: "Phase 5 results: traffic shaping", desc: "Latency, loss and load applied on the firewall, with before and after measurements of what the clients experience.", file: ""}
phases:
  - {name: "Phase 1", desc: "Firewall and protocols on the wire: watch the open network, lock it down, open only what each task needs, and troubleshoot host firewalls.", status: "planned"}
  - {name: "Phase 2", desc: "The 2010 knock: hide SSH and RDP behind it, watch the timers work, then break it.", status: "planned"}
  - {name: "Phase 3", desc: "Fix the leaks: remove Telnet, use keys and unique credentials, move the web server to HTTPS, and rerun the Phase 1 attacks.", status: "planned"}
  - {name: "Phase 4", desc: "Modern remote access: the 2010 knock against single packet authorization and WireGuard, under the same tests.", status: "planned"}
  - {name: "Phase 5", desc: "Traffic shaping on the firewall, measured, with results.", status: "planned"}
pdf: ""
links: []
---

<p class="tbd-note">[Placeholder: the structure is set; technical details, code and results come next.]</p>

## What it is

A small network that runs on one machine with a single `docker compose up`. A firewall sits between a LAN with two clients and a DMZ with a server. One client knows how to get in, the other is an outsider who scans and gets nothing. The web server is open to everyone, the way a real DMZ serves the public. Remote access (SSH and RDP) starts open, then moves behind the knock in Phase 2. Everything that crosses the firewall is captured, so the proof is in the packets, not in my description of them.

```text
   LAN 10.10.10.0/24                          DMZ 10.10.20.0/24
  +------------------+                      +----------------------+
  | client-a         |                      | server               |
  | authorized       |---+              +---| web :80 (open)       |
  | knock, rdp, ssh  |   |  +--------+  |   | telnet :23, ssh :22  |
  | curl, tcpdump    |   +--| fw     |--+   | rdp :3389            |
  +------------------+   |  |deny-all|      +----------------------+
  +------------------+   |  |knock   |
  | client-b         |---+  |shaping |
  | outsider         |      |tcpdump |
  | nmap, scans      |      +--------+
  | tcpdump          |
  +------------------+
```

## How it is structured

Five phases. Each one starts from a checkpoint, a saved copy of the lab exactly where the previous phase leaves you, so you can start at any phase, reset when stuck, or compare your work against it. Each phase ends with its results written up.

**Phase 1: firewall and protocols on the wire.** Everything starts open, with the firewall logging every connection. Watch what crosses it: the same login over Telnet and SSH, one readable on the wire and one not. Lock it down and watch everything break, then open only what each task needs. Finish by troubleshooting host firewalls on the server and client, because the gateway isn't the only firewall in the path.

**Phase 2: the 2010 knock.** Hide SSH and RDP behind my 2010 knock design, recreated and dated. Knock, watch the door open for one address, watch the timers close it. Then break it: the outsider replays a captured knock and gets the door open too.

**Phase 3: fix the leaks.** Remove Telnet, move to keys and unique credentials, and put the web server on HTTPS. Then run the Phase 1 attacks again and show them failing.

**Phase 4: modern remote access.** Run the Phase 2 tests against single packet authorization and WireGuard, side by side with the 2010 knock, so the differences are measured, not claimed.

| Test | 2010 knock | Single packet authorization | WireGuard |
|---|---|---|---|
| Outsider scan | [result] | [result] | [result] |
| Authorized client gets in | [result] | [result] | [result] |
| Outsider replays a captured packet | [result] | [result] | [result] |
| What the firewall capture shows | [capture] | [capture] | [capture] |

**Phase 5: traffic shaping.** Shape the traffic on the firewall, adding latency, loss and load, and show the effect on the clients with before and after results.

Everything is configuration as code: the firewall rules live in files, a change goes through review, and the guide's settings tables update from the same files.

<!--after-pieces-->

## Where it leads

This network is the base for the next project. The agents in agent-lab run on top of it, so its traffic, logs, captures and results become the material they watch and learn from.

## The honest framing

Port knocking is one layer on top of a deny-all firewall, not a lock on its own. The 2010 design is shown with its year, and the results show plainly where it falls short and why the field moved on.
