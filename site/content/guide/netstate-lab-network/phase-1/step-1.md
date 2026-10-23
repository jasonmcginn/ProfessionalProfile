---
title: "Prove the path"
step: 1
weight: 2
time: "5 min"
goal: "Prove every packet between the LAN and the DMZ goes through the firewall, and only the firewall."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

The lab has two networks: a LAN with two clients and a DMZ with a server. The firewall, **fw**, sits between them. Before anything else, prove it really is in the path, because a firewall only protects traffic that goes through it.

### 1. Run the routing check

This script runs on client-a and checks five things: its route to the DMZ goes via fw, there's no other way out, the server answers, the first hop is fw, and the internet is unreachable.

{{< cmd >}}docker compose exec client-a sh /lab/tests/check-routing.sh{{< /cmd >}}

### 2. Close the firewall and ping the server

`FORWARD DROP` tells fw to stop passing traffic between the networks.

{{< cmd >}}docker compose exec fw iptables -P FORWARD DROP{{< /cmd >}}
{{< cmd >}}docker compose exec client-a ping -c 2 -W 2 10.10.20.10{{< /cmd >}}

### 3. Open it again and ping

{{< cmd >}}docker compose exec fw iptables -P FORWARD ACCEPT{{< /cmd >}}
{{< cmd >}}docker compose exec client-a ping -c 2 -W 2 10.10.20.10{{< /cmd >}}

## You should see

The check ends with:

```
5 passed, 0 failed
```

The first ping fails with `100% packet loss`. The second gets replies.

## What it means

Closing fw cut the client off from the server, and opening it brought it back. So fw is the only way between the two networks, and everything you see from here on crosses it. Nothing in the lab can reach the internet, so all the traffic is yours.
