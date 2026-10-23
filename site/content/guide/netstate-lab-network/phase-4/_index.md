---
title: "Phase 4: modern remote access"
short: "lab network · phase 4"
project: "netstate-lab-network"
hook: "The legacy knock had one weakness: anyone who saw it could replay it. This phase puts it next to Single Packet Authorization, which can't be replayed, and measures the difference in the lab."
coming: "Phase 5: traffic shaping"
next_phase: "/guide/netstate-lab-network/phase-5/"
layers: ["L3", "L4", "L7"]
visibility: "public"
---

Phase 2 hid SSH behind a port knock and then broke it: the knock carries no secret, so a captured copy, resent, opens the door for anyone. This phase keeps the same test and tries a modern answer, Single Packet Authorization (SPA), which fixes exactly that.

WireGuard, a third approach, is covered as a read at the end; it needs kernel support this container lab doesn't have, so its behaviour is described, not run here.

Every result on these pages comes from the lab. Nothing is claimed that wasn't measured.

**You need:** Phase 2 finished (the knock in place). The SPA tool, `fwknop`, is already in the images.

<!-- Draft. Example wording, for Jason to reword. -->
