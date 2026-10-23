---
title: "WireGuard, for comparison (a read)"
step: 4
weight: 5
time: "5 min read"
goal: "Understand a third approach the lab doesn't run: a VPN that answers nothing it doesn't recognise."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. Not run in this lab: WireGuard needs kernel support the container lab doesn't have. -->

Knocking and SPA both open a normal service for a moment. WireGuard takes a different line: it builds an encrypted tunnel, and the service only ever listens inside it. This page describes what it would do; it isn't run in the lab, because WireGuard needs kernel support the containers don't have.

### How it works

- Each side has a key pair. The firewall is configured with the public keys of the peers it will talk to, and nothing else.
- WireGuard listens on one UDP port. When a packet arrives, it checks whether it's signed by a known key. If not, it is silently dropped: no reply, no error, nothing. To anyone scanning, the port looks dead.
- Once a valid peer is recognised, an encrypted tunnel comes up, and SSH (and anything else) runs inside it. The services are never exposed on the open network at all.

### How it compares

- **Like SPA,** an onlooker sees only encrypted UDP, and a replayed packet gets nowhere: WireGuard has its own anti-replay.
- **Unlike the knock and SPA,** the service isn't opened on the public side for a window. It only exists inside the tunnel, so there's no open port to catch even during use.
- **The cost** is that every client needs a key and a tunnel configured in advance; SPA and the knock need nothing installed on the far side beyond the client tool.

## What it means

The knock hides a door and opens it on a signal. SPA does the same with an unforgeable signal. WireGuard removes the public door entirely and puts the room behind a tunnel. Each is stronger than the last, and each asks a little more setup. In a production build of this network, WireGuard is the one that would carry real remote access; the knock and SPA are here to show the path the idea took.

**Running it for real:** on a host with WireGuard kernel support (a normal Linux box, or WSL2 with the module), this is where the lab's WireGuard checkpoint would go. `[TBD: Jason to add lab results when run on supporting hardware.]`
