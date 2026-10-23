---
title: "Start from Phase 1's end"
step: 0
weight: 1
time: "5 min"
goal: "Rebuild the lab, load Phase 1's firewall, and confirm the leaks are still open so the fixes have a clear before and after."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

### 1. Rebuild and load the Phase 1 firewall

{{< cmd >}}docker compose up -d --build{{< /cmd >}}
{{< cmd >}}docker compose exec fw sh -c "iptables-restore < /lab/config/fw/phase1-rules.v4"{{< /cmd >}}

### 2. Clear the server's old SSH key on the clients

The rebuilt server has a fresh key; clear the remembered one so the clients don't refuse it.

{{< cmd >}}docker compose exec client-a ssh-keygen -R 10.10.20.10{{< /cmd >}}

### 3. See what's still open

{{< cmd >}}docker compose exec client-a nmap -n -p 22,23,80 10.10.20.10{{< /cmd >}}

## You should see

```
22/tcp open  ssh
23/tcp open  telnet
80/tcp open  http
```

Telnet answers, the web is plain HTTP, and SSH takes a password. Those are the three leaks from Phase 1. By the end of this phase, all three are shut.

## What it means

You're starting from a working, Phase-1 network with its known weaknesses in place. Each step closes one, and the last step checks they stay closed.
