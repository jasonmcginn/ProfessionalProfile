---
title: "The NetState Lab Network"
summary: "A firewall between a LAN and a DMZ, on one PC. Five phases: see what crosses the wire, a legacy port knock, fix the leaks, modern remote access, traffic shaping."
hook: "Services on the internet get scanned all day. I once took my own remote access off the internet and hid it behind a port knock. This lab rebuilds that design, puts it next to what replaced it, and lets the captures show the difference."
layers: ["L4", "L3", "L7"]
topics: []
status: "planned"
visibility: "public"
repo: "https://github.com/jasonmcginn/netstate-lab-network"
repo_published: true
builds_on: ["living-portfolio"]
related: []
weight: 10
evidence:
  - {title: "Phase 1 results: the open network", desc: "Which logins can be read off the wire, and what changes when the firewall locks down.", file: ""}
  - {title: "Phase 2 results: the legacy port knock", desc: "The knock working, then broken by a replayed capture.", file: ""}
  - {title: "Phase 3 results: fixing the leaks", desc: "The Phase 1 attacks, rerun and failing.", file: ""}
  - {title: "Phase 4 results: modern remote access", desc: "The legacy port knock and Single Packet Authorization under the same replay test; WireGuard described.", file: ""}
  - {title: "Phase 5 results: traffic shaping", desc: "Before and after measurements from the clients.", file: ""}
phases:
  - {name: "Phase 1", url: "/guide/netstate-lab-network/phase-1/", desc: "Watch the open network, sign in three ways, lock it down, find the way around it.", status: "guide ready: 11 steps"}
  - {name: "Phase 2", url: "/guide/netstate-lab-network/phase-2/", desc: "Hide SSH and RDP behind the legacy port knock, watch it work, then break it.", status: "in progress: steps 0 to 4"}
  - {name: "Phase 3", url: "/guide/netstate-lab-network/phase-3/", desc: "Remove Telnet, add keys and HTTPS, then recheck the Phase 1 leaks.", status: "guide ready: 8 steps"}
  - {name: "Phase 4", url: "/guide/netstate-lab-network/phase-4/", desc: "The legacy port knock against Single Packet Authorization, same replay test; WireGuard as a read.", status: "guide ready: 5 steps"}
  - {name: "Phase 5", url: "/guide/netstate-lab-network/phase-5/", desc: "Shape the link on the firewall: bandwidth, delay and loss, and measure it.", status: "guide ready: 4 steps"}
pdf: ""
links: []
---

## What it is

A firewall between a LAN and a DMZ, running on one PC with one command. Everything that crosses the firewall is logged and captured, so the proof is in the packets.

```text
   LAN 10.10.10.0/24                                  DMZ 10.10.20.0/24

   client-a  .11   authorized user  ──┐          ┌──  server  .10
                                      ├── fw ────┤    web :80   telnet :23
   client-b  .12   outsider        ──┘  .1   .1  └──  ssh :22   (rdp later)

   Every packet between the LAN and the DMZ crosses fw. Nothing reaches the internet.
```

## Why

Each phase takes one real problem, shows it on the wire, then fixes it and shows the fix the same way.

## Walk the lab

The lab is built in five phases. Each phase is a short set of pages: what to do, the exact commands to copy, what you should see, and what it means. Work a phase from top to bottom, then move to the next.

New here? Start at **Phase 1, step 0**. It sets up Docker on Windows and starts the lab from scratch.

1. **[Phase 1: firewall and protocols on the wire](/guide/netstate-lab-network/phase-1/).** Watch an open network, read logins off the wire, lock the firewall down, and find the way around it. *Guide ready: 11 steps.*
2. **[Phase 2: Legacy Port Knocking Test](/guide/netstate-lab-network/phase-2/).** Hide SSH and RDP behind the port knock, watch it work, then break it. *In progress.*
3. **[Phase 3: fix the leaks](/guide/netstate-lab-network/phase-3/).** Remove Telnet, add SSH keys and HTTPS, then recheck the Phase 1 leaks and show them shut. *Guide ready.*
4. **[Phase 4: modern remote access](/guide/netstate-lab-network/phase-4/).** The legacy port knock against Single Packet Authorization, under the same replay test; WireGuard covered as a read. *Guide ready.*
5. **[Phase 5: traffic shaping](/guide/netstate-lab-network/phase-5/).** Shape the link on the firewall: bandwidth (measured), plus delay and loss. *Guide ready.*

<a class="btn primary" href="/guide/netstate-lab-network/phase-1/step-0/">start at Phase 1, step 0 &#8594;</a>

<!--after-pieces-->

## The honest framing

Port knocking is one layer on a deny-all firewall, not a lock on its own. The results show where the legacy design falls short.
