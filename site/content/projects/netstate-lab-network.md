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
custom_phases: true
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
  - {name: "Phase 1", url: "/guide/netstate-lab-network/phase-1/", desc: "Stand the network up and watch it in the open: read logins off the wire, lock the firewall down rule by rule, then find the one way around it.", status: "guide ready: 11 steps"}
  - {name: "Phase 2", url: "/guide/netstate-lab-network/phase-2/", desc: "Hide SSH and RDP behind a port knock so they vanish from the network, send the secret to open them, then see why a knock anyone can copy eventually breaks.", status: "in progress: steps 0 to 4"}
  - {name: "Phase 3", url: "/guide/netstate-lab-network/phase-3/", desc: "Close every weakness from Phase 1 by hand: drop Telnet, move the web login to HTTPS, switch SSH to keys, then prove each leak is shut.", status: "guide ready: 8 steps"}
  - {name: "Phase 4", url: "/guide/netstate-lab-network/phase-4/", desc: "Put the knock next to Single Packet Authorization under the same replay test, and watch the modern one hold where the knock gave way. WireGuard is covered as a read.", status: "guide ready: 5 steps"}
  - {name: "Phase 5", url: "/guide/netstate-lab-network/phase-5/", desc: "Shape the link on the firewall and measure what the clients feel: cap the bandwidth, add delay and jitter, then drop packets on purpose.", status: "guide ready: 4 steps"}
pdf: ""
links: []
---

## What this is

A complete little network you run on your own PC: a firewall between a LAN and a DMZ, two client machines and a server, all in Docker. You build it, attack it, fix it, and measure it, with one firewall at the centre of everything.

It's built for two readers. An employer can see how I design, secure and explain a network, end to end. Anyone learning can run the very same lab and follow along, because it's all here: the machines, the firewall rules, the written guide, and the commands to copy.

```text
   LAN 10.10.10.0/24                                  DMZ 10.10.20.0/24

   client-a  .11   authorized user  ──┐          ┌──  server  .10
                                      ├── fw ────┤    web · ssh
   client-b  .12   outsider        ──┘  .1   .1  └──  telnet · rdp

   Every packet between the LAN and the DMZ crosses fw. Nothing reaches the internet.
```

Everything that crosses the firewall is logged and captured, so every lesson ends in the packets, not in a claim.

## What to expect

The lab is built in **five phases**. Each one takes a single real problem, shows it on the wire, then changes something and shows the result the same way. A phase is a set of short pages: what to do, the exact commands to copy, what you should see, and what it means.

You need a Windows 10 or 11 PC with Docker Desktop and 8 GB of memory. No networking gear, no cloud account. One command brings the whole lab up, and Phase 1, step 0 sets up Docker from scratch.

One honest note up front: the port knock built in Phase 2 is one layer on a deny-all firewall, not a lock on its own. The lab shows plainly where it falls short and what replaced it. Nothing here is presented as more than it is.

Open a phase below to see its steps, or start at Phase 1.

## The phases

{{< lab-phases >}}

<div class="actions"><a class="btn primary" href="/guide/netstate-lab-network/phase-1/step-0/">start at Phase 1, step 0 &#8594;</a></div>
