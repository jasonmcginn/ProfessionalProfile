---
title: "Remove Telnet"
step: 1
weight: 2
time: "5 min"
goal: "Take the plain-text Telnet service off the server for good."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

Telnet sends everything in clear text (Phase 1, step 4). The fix is not to configure it more carefully; it's to remove it. SSH does the same job, encrypted.

### 1. Stop the Telnet service

Telnet runs from `inetd` on the server. Stop it.

{{< cmd >}}docker compose exec server pkill inetd{{< /cmd >}}

### 2. Confirm it's gone

{{< cmd >}}docker compose exec server ss -ltn{{< /cmd >}}
{{< cmd >}}docker compose exec client-a nmap -n -p 23 10.10.20.10{{< /cmd >}}

## You should see

- `ss` no longer lists a listener on `:23`.
- nmap: `23/tcp closed telnet` (or `filtered`, since the firewall also blocks it).

## What it means

The service is off, so there's nothing to connect to even from the server itself. This is defence in depth: the firewall already blocked Telnet after Phase 1's lockdown, and now the service is gone too. The cleanest way to secure a protocol you don't need is to remove it.
