---
title: "Hide"
step: 1
weight: 2
time: "5 min"
goal: "Close SSH for everyone, so the server's remote access disappears from the network."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

In Phase 1, client-a had a permanent rule for SSH. A permanent rule is a permanent target: anyone who can reach client-a's address can try it. The legacy design removes it.

### 1. Find the SSH rule

{{< cmd >}}docker compose exec fw iptables -L FORWARD -n --line-numbers{{< /cmd >}}

It's rule 5: `ACCEPT ... 10.10.10.11 ... tcp dpt:22`.

### 2. Delete it

{{< cmd >}}docker compose exec fw iptables -D FORWARD 5{{< /cmd >}}

RDP never had a rule, so it's already closed.

### 3. Scan from both clients

{{< cmd >}}docker compose exec client-a nmap -n -Pn -p 22,3389 10.10.20.10{{< /cmd >}}
{{< cmd >}}docker compose exec client-b nmap -n -Pn -p 22,3389 10.10.20.10{{< /cmd >}}

## You should see

From both clients:

```
22/tcp   filtered ssh
3389/tcp filtered ms-wbt-server
```

## What it means

**Filtered** means the firewall gave no answer at all. To a scanner, there's nothing there to attack. But client-a, the authorized user, is locked out too. The knock is how it gets back in.
