---
title: "Phase 5: traffic shaping"
short: "lab network · phase 5"
project: "netstate-lab-network"
hook: "A firewall doesn't only pass or block traffic; it can slow it, drop it, or cap it. This phase shapes the link and measures what the clients feel."
coming: ""
layers: ["L3", "L4"]
visibility: "public"
---

Everything so far has been pass or block. Real links are messier: they add delay, lose packets, and run out of bandwidth. The firewall can recreate all three on purpose, which is how you test how an application behaves on a bad connection without waiting for a bad day.

The tool is `tc` (traffic control) on the firewall. Two parts:

- **Bandwidth limiting** uses `tbf`, and it's shown here with real before-and-after numbers from the lab.
- **Delay and loss** use `netem`, a kernel feature not every host has. Where it's available (most desktop Linux and WSL2), the commands are here; the numbers are yours to read, because a measurement only means something from your own run.

**You need:** Phase 1 finished. `iperf3` (the throughput tool) is in the images.

<!-- Draft. Example wording, for Jason to reword. -->
