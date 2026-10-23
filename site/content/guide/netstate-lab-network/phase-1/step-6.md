---
title: "Lock it down"
step: 6
weight: 7
time: "10 min"
goal: "Switch the firewall from allow-everything to deny-everything, watch it all break, and read the drops in the log."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

Until now, fw has passed everything and only logged it. A real firewall starts from the opposite end: block everything, then open only what's needed. That's called **deny-all**. You'll type the rules yourself, one at a time.

If you've rebuilt the lab since step 5, rebuild once more first, so the machines have the tools this part of the guide uses: `docker compose up -d --build`.

### 1. Look at fw's rules now

Rules are read top to bottom. The **policy** is what happens to traffic that no rule decides.

{{< cmd >}}docker compose exec fw iptables -L FORWARD -n --line-numbers{{< /cmd >}}

One rule (log every new connection) and `policy ACCEPT`: everything is allowed.

### 2. Log what gets dropped

Add a rule at the end that logs anything still undecided, with the label `FW-DROP`, so you can see what the firewall blocks.

{{< cmd >}}docker compose exec fw iptables -A FORWARD -j NFLOG --nflog-prefix FW-DROP --nflog-group 1{{< /cmd >}}

### 3. Deny everything

{{< cmd >}}docker compose exec fw iptables -P FORWARD DROP{{< /cmd >}}

### 4. Watch it break

{{< cmd >}}docker compose exec client-a ping -c 2 -W 2 10.10.20.10{{< /cmd >}}
{{< cmd >}}docker compose exec client-a curl -s -m 5 http://10.10.20.10/{{< /cmd >}}

### 5. Read the drops

{{< cmd >}}docker compose exec fw sh -c "grep FW-DROP /captures/fw.log | tail -n 2"{{< /cmd >}}

### 6. Let replies through

Add a **stateful** rule as rule 2: traffic that belongs to a conversation fw has already allowed (the replies) can pass. On its own it opens nothing new; it means that in step 7 you only have to allow each conversation in one direction.

{{< cmd >}}docker compose exec fw iptables -I FORWARD 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT{{< /cmd >}}
{{< cmd >}}docker compose exec fw iptables -L FORWARD -n --line-numbers{{< /cmd >}}

## You should see

- Ping: `100% packet loss`. curl: nothing, then it gives up after 5 seconds.
- The drop log: `FW-DROP IN=lan OUT=dmz ... SRC=10.10.10.11 DST=10.10.20.10 ... PROTO=TCP ... DPT=80`, the blocked web request and its port.
- The rules, with `policy DROP`:

```
Chain FORWARD (policy DROP)
num  target     prot opt source       destination
1    NFLOG      ...                                ctstate NEW nflog-prefix FW-NEW
2    ACCEPT     ...                                ctstate RELATED,ESTABLISHED
3    NFLOG      ...                                nflog-prefix FW-DROP
```

## What it means

Nothing gets through now unless a rule allows it, and every blocked attempt is written down with its source, destination and port. That's the starting point for every firewall worth having: decide what's allowed, not what's blocked.
