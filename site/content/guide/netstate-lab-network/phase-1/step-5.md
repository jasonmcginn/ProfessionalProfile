---
title: "One password, three doors"
step: 5
weight: 6
time: "10 min"
goal: "Use the password read off the wire to walk through the one door that was encrypted, and see what the logs make of it."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

In step 4, SSH kept the password safe on the wire. But the web page and Telnet gave it away, and all three use the same password. Now you're the outsider, **client-b**, and you have it.

If you've rebuilt or updated the lab since step 4, rebuild first so the server keeps a login log: `docker compose up -d --build`.

### 1. Take the password off the wire

The step 4 capture is still in the `captures` folder. Read the password out of it, the way anyone with that capture could:

{{< cmd >}}docker compose exec fw sh -c "tcpdump -r /captures/step4.pcap -nn -A 2>/dev/null | grep -a password="{{< /cmd >}}

### 2. Sign in to SSH as the outsider

From client-b this time. Type `yes` to trust the key, then the stolen password. Run `whoami` and `hostname`, then `exit`.

{{< cmd >}}docker compose exec client-b ssh netstate@10.10.20.10{{< /cmd >}}

### 3. Try the web page too

{{< cmd >}}docker compose exec client-b curl -s -d "username=netstate&password=LabOnly-2026" http://10.10.20.10/login{{< /cmd >}}

### 4. Read the server's login log

The server records every SSH sign-in in `/var/log/auth.log`.

{{< cmd >}}docker compose exec server grep Accepted /var/log/auth.log{{< /cmd >}}

### 5. Read the firewall's log for client-b

{{< cmd >}}docker compose exec fw sh -c "grep SRC=10.10.10.12 /captures/fw.log | tail -n 3"{{< /cmd >}}

## You should see

- SSH from client-b: `netstate` and `server`. You're in.
- The web page: `Signed in.`
- The server's log, your step 4 login from client-a and the outsider's from client-b, side by side (port numbers will differ):

```
Accepted password for netstate from 10.10.10.11 port 51544 ssh2
Accepted password for netstate from 10.10.10.12 port 39884 ssh2
```

- The firewall's log: `IN=lan OUT=dmz SRC=10.10.10.12 DST=10.10.20.10 ... DPT=22`, a normal connection to SSH.

## What it means

SSH did its job: the password never crossed the wire in clear. It didn't matter, because the same password leaked through the other two doors. Encryption protects a password in transit; it can't protect one that's reused.

Look at the server's log again. Both lines say `Accepted password`. The only difference is the address, and you only know `.12` is the outsider because you have the map. To the server and the firewall, a stolen password is a valid login. That's why the fixes are unique passwords and keys instead of passwords, which Phase 3 puts in place. A second sign-in factor would stop it too. Fail2Ban, in Phase 2, catches password guessing but not this: there's nothing to catch when the password is right.
