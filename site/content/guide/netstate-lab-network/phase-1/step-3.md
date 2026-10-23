---
title: "Watch the traffic: two views"
step: 3
weight: 4
time: "10 min"
goal: "See the same traffic two ways: the firewall's log and a packet capture."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

The firewall writes a line to a log for every new connection it passes. A packet capture records every packet on the wire. You'll use both for the rest of the lab.

### 1. Ping the server, then read the firewall log

{{< cmd >}}docker compose exec client-a ping -c 2 -W 2 10.10.20.10{{< /cmd >}}
{{< cmd >}}docker compose exec fw tail -n 3 /captures/fw.log{{< /cmd >}}

The log is also a plain file at `captures\fw.log` in the lab folder.

### 2. Start a packet capture on the firewall

This runs tcpdump on fw in the background, on both of its network cards, saving every ping packet to a file.

{{< cmd >}}docker compose exec -d fw tcpdump -i any -nn -U --immediate-mode -w /captures/step3.pcap icmp{{< /cmd >}}

### 3. Ping again, then stop the capture

{{< cmd >}}docker compose exec client-a ping -c 2 -W 2 10.10.20.10{{< /cmd >}}
{{< cmd >}}docker compose exec fw pkill tcpdump{{< /cmd >}}

### 4. Read the capture

{{< cmd >}}docker compose exec fw tcpdump -nn -r /captures/step3.pcap{{< /cmd >}}

## You should see

The log, one line per connection:

```
fw FW-NEW IN=lan OUT=dmz ... SRC=10.10.10.11 DST=10.10.20.10 ... PROTO=ICMP
```

The capture, four lines for each ping:

```
lan  In  IP 10.10.10.11 > 10.10.20.10: ICMP echo request
dmz  Out IP 10.10.10.11 > 10.10.20.10: ICMP echo request
dmz  In  IP 10.10.20.10 > 10.10.10.11: ICMP echo reply
lan  Out IP 10.10.20.10 > 10.10.10.11: ICMP echo reply
```

## What it means

The log is short: who talked to whom, and which way through the firewall (`IN=lan OUT=dmz`). It's what you search first in an incident. The capture is the full record: the request comes in on `lan` and goes out on `dmz`, and the reply comes back the other way. That's routing, seen directly.

The `.pcap` file in the `captures` folder also opens in Wireshark.
