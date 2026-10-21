---
title: "knock-lab"
summary: "A small containerized network, a firewall between two clients and a server, built to capture and compare traffic and to test port knocking from 2010 against its modern replacements."
hook: "Services exposed to the internet get scanned all day. Around 2010 I took my own remote access (RDP and SSH) off the internet and hid it behind a port knock. This lab rebuilds that design, puts it next to what replaced it, and runs the same tests against each one so the differences show up in the captures."
layers: ["L4", "L3", "L7"]
topics: []
status: "planned"
visibility: "public"
repo: "https://github.com/jasonmcginn/knock-lab"
builds_on: []
related: []
weight: 10
evidence:
  - {title: "Outsider scan", desc: "nmap output from the outsider client against the firewall, for each method.", file: ""}
  - {title: "The knock on the wire", desc: "A packet capture from the firewall showing the knock arrive and the port open for one IP.", file: ""}
  - {title: "Replay attempt", desc: "The outsider replays a captured knock against each method. The results fill the comparison table.", file: ""}
  - {title: "HTTP in the clear", desc: "A capture of a login over plain HTTP, with the credentials readable in the packets.", file: ""}
  - {title: "Terminal recording", desc: "A recorded session of the authorized client knocking and connecting, for readers who won't run the lab.", file: ""}
phases:
  - {name: "v1", desc: "Topology, deny-all firewall, open web server (HTTP), the 2010 knock recreated, captures on both clients and the firewall.", status: "planned"}
  - {name: "v2", desc: "Single Packet Authorization (fwknop) and WireGuard added, same test set run against all three.", status: "planned"}
  - {name: "v3", desc: "Traffic shaping on the firewall (tc netem for latency and loss, iperf3 for load).", status: "planned"}
pdf: ""
links: []
---

<p class="tbd-note">[Placeholder: this project is being built. The layout and intent are set; the content, code and evidence are not written yet.]</p>

## What it is

A small network that runs on one machine with a single `docker compose up`. A firewall sits between a LAN with two clients and a DMZ with a server. One client knows how to get in, the other is an outsider who scans and gets nothing. The web server is open to everyone, the way a real DMZ serves the public, while remote access (RDP and SSH) stays hidden behind the knock. Everything that crosses the firewall is captured, so the proof is in the packets, not in my description of them.

The lab is also a base network. Later projects run on top of it, so its web traffic, logs and captures become the material they work with.

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

## What it compares

The same tests run against three ways of hiding a service. The empty cells fill in from the lab's own captures, never from a prediction.

| Test | 2010 knock | SPA (fwknop) | WireGuard |
|---|---|---|---|
| Outsider scan | [result] | [result] | [result] |
| Authorized client gets in | [result] | [result] | [result] |
| Outsider replays a captured knock | [result] | [result] | [result] |
| What the firewall capture shows | [capture] | [capture] | [capture] |

## HTTP on the wire

The web server answers plain HTTP on purpose. A capture of a login over HTTP shows the request, headers and credentials in clear text, which is the clearest way to show why the web moved to HTTPS. [Decide: add HTTPS on :443 for a side-by-side capture, here or in a later phase.]

## The honest framing

Port knocking is one layer on top of a deny-all firewall, not a lock on its own. The 2010 design is shown with its year, and the lab shows plainly where it falls short and why the field moved on.
