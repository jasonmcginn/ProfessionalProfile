---
title: "Shape, measure, restore"
step: 3
weight: 4
time: "5 min"
goal: "Pull the phase together: the firewall can pass, block, or shape, and every change is one command away."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

### 1. Confirm the link is clean

{{< cmd >}}docker compose exec fw tc qdisc show dev dmz{{< /cmd >}}
{{< cmd >}}docker compose exec client-a ping -c 3 10.10.20.10{{< /cmd >}}

`tc qdisc show` should report the default, with no `tbf` or `netem`.

### 2. Put the firewall back

If you added the iperf3 rule in step 0, reload the clean firewall.

{{< cmd >}}docker compose exec fw sh -c "iptables-restore < /lab/config/fw/phase1-rules.v4"{{< /cmd >}}

## What it means

Across five phases, the firewall has gone from passing everything to blocking by purpose, hiding services behind a secret, forcing every leak shut, and now shaping the link itself. It passes, blocks, and shapes, and every one of those is a rule or a command you can read, change, and put back.

## The lab, end to end

- **Phase 1** showed what crosses an open network, then locked it down.
- **Phase 2** hid a service behind the legacy port knock, and broke it.
- **Phase 3** closed every leak and proved it.
- **Phase 4** put the knock next to Single Packet Authorization.
- **Phase 5** shaped the link and measured it.

That's the whole network: built, attacked, fixed, and measured, all on one machine, all as code.
