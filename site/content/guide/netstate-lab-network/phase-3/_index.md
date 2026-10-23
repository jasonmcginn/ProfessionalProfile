---
title: "Phase 3: fix the leaks"
short: "lab network · phase 3"
project: "netstate-lab-network"
hook: "Every weakness Phase 1 exposed gets closed: Telnet gone, the web login encrypted, SSH on keys instead of passwords. Then the old leaks are checked again, and they're shut."
coming: "Phase 4: modern remote access"
layers: ["L3", "L4", "L7"]
visibility: "public"
---

Phase 1 showed the leaks: a login readable over Telnet, a password readable over plain HTTP, and one password that opened every door. This phase closes each one, by hand, and then confirms it's closed.

Nothing here is baked into the lab. You do the hardening, the same way you'd do it on a real host.

**You need:** Phase 1 finished (its firewall loaded). Phase 2 isn't required.

<!-- Draft. Example wording, for Jason to reword. -->
