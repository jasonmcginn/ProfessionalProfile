---
title: "Knock"
step: 2
weight: 3
time: "15 min"
goal: "Turn on the knock, send it from client-a, and watch the door open for client-a only."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

The knock is built on the logging you learned in Phase 1. One firewall rule logs any packet with the knock's odd flags going to the knock ports. The watcher reads that log, and opens the door when the sequence is right.

### 1. Log the knock packets

Insert this as rule 5, before the drop-log rule. `--tcp-flags ALL FIN,PSH,URG` matches packets with exactly those three flags set and no others, a combination no real connection ever uses.

{{< cmd >}}docker compose exec fw iptables -I FORWARD 5 -i lan -o dmz -p tcp --tcp-flags ALL FIN,PSH,URG -m multiport --dports 4747,3043,9034 -j NFLOG --nflog-prefix FW-KNOCK --nflog-group 1{{< /cmd >}}

### 2. Start the watcher

{{< cmd >}}docker compose exec fw knock-watcher start{{< /cmd >}}

### 3. Start a capture of the knock packets

{{< cmd >}}docker compose exec -d fw tcpdump -i lan -nn -U --immediate-mode -w /captures/knock.pcap "tcp[tcpflags] & (tcp-fin|tcp-push|tcp-urg) == (tcp-fin|tcp-push|tcp-urg)"{{< /cmd >}}

### 4. Knock from client-a

The `knock` command sends one packet per port and prints each one.

{{< cmd >}}docker compose exec client-a knock 10.10.20.10 4747 3043 3043 9034{{< /cmd >}}

### 5. Read what the watcher saw

{{< cmd >}}docker compose exec fw tail -n 5 /captures/knock.log{{< /cmd >}}

### 6. Scan again, from both clients

Do this within 60 seconds of the knock, while the door is open.

{{< cmd >}}docker compose exec client-a nmap -n -Pn -p 22,3389 10.10.20.10{{< /cmd >}}
{{< cmd >}}docker compose exec client-b nmap -n -Pn -p 22,3389 10.10.20.10{{< /cmd >}}

### 7. Sign in from client-a

Knock again first if the 60 seconds have passed. Then sign in (password `LabOnly-2026`) and stay signed in for the next step's test, or type `exit`.

{{< cmd >}}docker compose exec client-a ssh netstate@10.10.20.10{{< /cmd >}}

### 8. Stop the capture

You'll use it in step 5.

{{< cmd >}}docker compose exec fw pkill tcpdump{{< /cmd >}}

## You should see

The watcher's log:

```
10.10.10.11: knock 1 of 4 (port 4747)
10.10.10.11: knock 2 of 4 (port 3043)
10.10.10.11: knock 3 of 4 (port 3043)
10.10.10.11: knock 4 of 4 (port 9034)
10.10.10.11: DOOR OPEN to ports 22,3389 for 60s
```

- client-a's scan: `22/tcp open` and `3389/tcp open`.
- client-b's scan, at the same moment: both still `filtered`.
- About a minute later, in the watcher's log: `10.10.10.11: door closed (sessions already open stay up)`.

To see the door itself, list fw's rules during the 60 seconds: rule 3 is `ACCEPT ... 10.10.10.11 ... multiport dports 22,3389 ... /* knock door */`.

## What it means

The knock opened the door for one address only. The outsider, scanning at the same moment, still sees nothing. That's the strength of the design: the services are invisible until the right pattern arrives, and only to whoever sent it.
