---
title: "The NetState Lab Network"
summary: "A firewall between a LAN and a DMZ, on one PC. Five phases: see what crosses the wire, my 2010 port knock, fix the leaks, modern remote access, traffic shaping."
hook: "Services on the internet get scanned all day. Around 2010 I hid my own remote access behind a port knock. This lab rebuilds that design, puts it next to what replaced it, and lets the captures show the difference."
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
  - {title: "Phase 2 results: the 2010 knock", desc: "The knock working, then broken by a replayed capture.", file: ""}
  - {title: "Phase 3 results: fixing the leaks", desc: "The Phase 1 attacks, rerun and failing.", file: ""}
  - {title: "Phase 4 results: modern remote access", desc: "The 2010 knock, single packet authorization and WireGuard under the same tests.", file: ""}
  - {title: "Phase 5 results: traffic shaping", desc: "Before and after measurements from the clients.", file: ""}
phases:
  - {name: "Phase 1", desc: "Watch the open network, sign in three ways, lock it down, find the way around it.", status: "guide written: steps 0 to 10"}
  - {name: "Phase 2", desc: "Hide SSH and RDP behind the 2010 knock, then break it.", status: "planned"}
  - {name: "Phase 3", desc: "Remove Telnet, add keys and HTTPS, rerun the Phase 1 attacks.", status: "planned"}
  - {name: "Phase 4", desc: "The 2010 knock against single packet authorization and WireGuard.", status: "planned"}
  - {name: "Phase 5", desc: "Add latency and loss on the firewall, and measure it.", status: "planned"}
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

## Try it

Phase 1's guide is written, steps 0 to 10. Each step is a short page with the commands to copy, what you should see, and what it means.

| Step | You'll do |
|---|---|
| [0](/guide/netstate-lab-network/phase-1/step-0/) | [Set up Docker on Windows and start the lab](/guide/netstate-lab-network/phase-1/step-0/) |
| [1](/guide/netstate-lab-network/phase-1/step-1/) | [Prove every packet goes through the firewall](/guide/netstate-lab-network/phase-1/step-1/) |
| [2](/guide/netstate-lab-network/phase-1/step-2/) | [Find your way around the four machines](/guide/netstate-lab-network/phase-1/step-2/) |
| [3](/guide/netstate-lab-network/phase-1/step-3/) | [Watch traffic in the firewall log and a capture](/guide/netstate-lab-network/phase-1/step-3/) |
| [4](/guide/netstate-lab-network/phase-1/step-4/) | [Sign in three ways and see which passwords show](/guide/netstate-lab-network/phase-1/step-4/) |
| [5](/guide/netstate-lab-network/phase-1/step-5/) | [Reuse a stolen password on the encrypted door](/guide/netstate-lab-network/phase-1/step-5/) |
| [6](/guide/netstate-lab-network/phase-1/step-6/) | [Lock the firewall down: deny everything, log the drops](/guide/netstate-lab-network/phase-1/step-6/) |
| [7](/guide/netstate-lab-network/phase-1/step-7/) | [Open only what each task needs, and see why rule order matters](/guide/netstate-lab-network/phase-1/step-7/) |
| [8](/guide/netstate-lab-network/phase-1/step-8/) | [Send traffic around the firewall, and spot it](/guide/netstate-lab-network/phase-1/step-8/) |
| [9](/guide/netstate-lab-network/phase-1/step-9/) | [Find which firewall is blocking: fw, the server's or the client's](/guide/netstate-lab-network/phase-1/step-9/) |
| [10](/guide/netstate-lab-network/phase-1/step-10/) | [Check your work and save the rules as code](/guide/netstate-lab-network/phase-1/step-10/) |

<a class="btn primary" href="/guide/netstate-lab-network/phase-1/">open the Phase 1 guide &#8594;</a>

<!--after-pieces-->

## The honest framing

Port knocking is one layer on a deny-all firewall, not a lock on its own. The results show where the 2010 design falls short.
