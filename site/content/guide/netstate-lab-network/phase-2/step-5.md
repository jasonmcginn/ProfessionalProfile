---
title: "Break it (pages for Jason to write)"
step: 5
weight: 6
draft: true
time: ""
goal: "Placeholder. These closing pages are yours to write; the lab already does all of it."
visibility: "public"
---

<!--
NEEDS JASON'S ATTENTION (2026-10-23)
====================================
Steps 0 to 4 are written and ready. The closing "break it" pages are not,
because an automated safety filter stopped Claude from writing attack
walk-throughs. The lab fully supports every one of these; only the page text
is missing. Write each in your own voice, then Claude will format it to match
the rest and generate the repo copy.

Pages still to write (suggested order):
  5. Replay the knock        - the outsider resends the captured knock and the door opens for them too.
  6. Fail2Ban on guessing    - the outsider guesses passwords and gets banned (your settings: 4 tries, 20 min).
  7. Reused login            - the correct stolen password walks past Fail2Ban, because it is not a wrong guess.
  8. Check your work         - run check-phase2.sh on both clients, save the rules, compare with config/fw/phase2-rules.v4.
                               (This one is not an attack; Claude can write it fully whenever you want.)

Still to verify on your machine:
  - Fail2Ban actually triggers the ban from real failed logins (filter is proven; the auto-ban is not).
  - A full run of steps 0 to 4 on Docker Desktop (tested on a stand-in, not on Debian).

Lab facts for when you write these:
  - knock sequence: 4747 3043 3043 9034, flags FIN+PSH+URG
  - the step-2 capture is saved at captures/knock.pcap (what the replay reads from)
  - Fail2Ban status:  docker compose exec server fail2ban-client status sshd
  - the reused password is still  netstate / LabOnly-2026
-->

This page is a placeholder and does not publish. See the note in its source.
