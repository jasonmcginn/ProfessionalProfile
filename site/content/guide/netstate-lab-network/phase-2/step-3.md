---
title: "One packet by hand"
step: 3
weight: 4
time: "10 min"
goal: "Craft one knock packet yourself, and see exactly what makes it different from normal traffic."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

The `knock` command is a convenience. Underneath, each knock is one TCP packet built by `hping3`, a tool that lets you set every field yourself.

### 1. Watch the wire

{{< cmd >}}docker compose exec -d fw tcpdump -i lan -nn -v -U --immediate-mode -w /captures/hand.pcap "tcp port 4747"{{< /cmd >}}

### 2. Send the first knock by hand

`-F -P -U` set the FIN, PSH and URG flags; `-p 4747` is the port; `-c 1` sends one packet.

{{< cmd >}}docker compose exec client-a hping3 -c 1 -F -P -U -p 4747 10.10.20.10{{< /cmd >}}

### 3. Read the packet

{{< cmd >}}docker compose exec fw pkill tcpdump{{< /cmd >}}
{{< cmd >}}docker compose exec fw tcpdump -nn -v -r /captures/hand.pcap{{< /cmd >}}

### 4. See what the watcher made of it

{{< cmd >}}docker compose exec fw tail -n 2 /captures/knock.log{{< /cmd >}}

### 5. Compare it with a normal connection

A normal connection always starts with a single SYN flag. Watch one:

{{< cmd >}}docker compose exec client-a curl -s -o /dev/null http://10.10.20.10/{{< /cmd >}}
{{< cmd >}}docker compose exec fw sh -c "grep FW-NEW /captures/fw.log | tail -n 1"{{< /cmd >}}

## You should see

- hping3: `FPU set`, then `100% packet loss`. Nothing answers; the firewall drops it, as it should.
- The capture: `Flags [FPU]`, FIN, PSH and URG together, on port 4747.
- The watcher: `knock 1 of 4 (port 4747)`. If you don't send the other three within 30 seconds, the next knock starts over.
- The normal connection's log line ends in `SYN`.

## What it means

A knock packet is just a TCP packet with a flag combination that never happens in real traffic: FIN (finish), PSH (push) and URG (urgent) all at once, with no connection behind it. That's what makes it easy for the firewall to pick out, and also what makes it easy for anyone watching the wire to spot.
