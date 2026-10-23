---
title: "Cap the bandwidth"
step: 1
weight: 2
time: "10 min"
goal: "Limit the link to a slow speed and measure the drop, the one shaping this lab verifies with real numbers."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

Bandwidth limiting uses `tbf` (token bucket filter). It's available on essentially any Linux host, so this is the step with measured results.

### 1. Add a 5 Mbit cap on the firewall

This shapes traffic leaving the firewall toward the server (the `dmz` side).

{{< cmd >}}docker compose exec fw tc qdisc add dev dmz root tbf rate 5mbit burst 32kbit latency 400ms{{< /cmd >}}

### 2. Measure again

{{< cmd >}}docker compose exec client-a iperf3 -c 10.10.20.10 -t 4{{< /cmd >}}

### 3. Remove the cap and confirm it recovers

{{< cmd >}}docker compose exec fw tc qdisc del dev dmz root{{< /cmd >}}
{{< cmd >}}docker compose exec client-a iperf3 -c 10.10.20.10 -t 4{{< /cmd >}}

## You should see

The throughput falls to about the cap you set, then returns to full speed when you remove it. In the lab:

```
before:  ~13000 Mbits/sec
5mbit cap:   ~4.5 Mbits/sec
after:   ~13000 Mbits/sec
```

(Your baseline will differ; the capped figure will sit just under 5 Mbit/s whatever it is.)

## What it means

The firewall held the traffic to the rate you set, no matter how fast the two machines could actually talk. This is how you test an application the way a user on a slow connection would meet it, a branch office on a thin link, a phone on mobile data, without leaving your desk. Change `5mbit` to `1mbit` or `256kbit` and measure again.
