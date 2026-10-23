---
title: "Phase 2: Legacy Port Knocking Test"
short: "lab network · phase 2"
project: "netstate-lab-network"
hook: "A legacy remote-access technique: hide SSH and RDP behind a port knock, so they are invisible until you send a secret pattern of packets. Here you rebuild it, watch it work, then break it."
coming: "Phase 3: fix the leaks"
layers: ["L3", "L4", "L7"]
visibility: "public"
---

A **port knock** keeps a service hidden until you send a secret pattern of packets. This one is a faithful recreation of a legacy design: the firewall logs odd-looking packets, a watcher reads the log, and when one address sends the right sequence in time, SSH and RDP open for that address only, for a few minutes.

Then you break it. Knocking is one layer on top of a deny-all firewall, not a lock on its own, and this phase shows exactly where it falls short.

**You need:** Phase 1 finished, or at least its answer key loaded (step 0 does that).

<!-- Draft. Example wording, for Jason to reword. -->
