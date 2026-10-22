---
title: "The NetState Lab Network: routing check"
summary: "Five pass/fail checks that prove traffic between the LAN and the DMZ crosses the firewall, and only the firewall."
hook: "A firewall only protects the paths that go through it. This script proves the lab has one path, and catches it when someone adds a second."
layers: ["L3"]
accordion: "L3"
project: "netstate-lab-network"
topics: []
status: "live"
visibility: "public"
weight: 15
language: "Bash (POSIX sh)"
repo: ""
run: "docker compose exec client-a sh /lab/tests/check-routing.sh"
pdf: ""
links: []
---

The first thing the lab has to prove is that the firewall is in the path. Not that it has rules, that every packet between the two networks actually crosses it. This script checks that from a client, reports PASS or FAIL for each check, and changes nothing.

## What it checks

| Check | What it proves |
|---|---|
| Route to the DMZ goes via fw | The client sends DMZ traffic to the firewall, not anywhere else |
| No default route | The lab has no way out to the internet |
| Server answers | The path through the firewall works end to end |
| First hop is fw | A traceroute confirms the firewall is the first router the traffic meets |
| Internet unreachable | Nothing inside the lab can reach outside it |

## Run it

From the lab folder, with the lab running:

```
docker compose up -d --build
docker compose exec client-a sh /lab/tests/check-routing.sh
```

A healthy lab reports `5 passed, 0 failed` and exits 0, so the same check can run in CI.

## When it fails on purpose

Phase 1 includes a lesson where two commands route traffic around the firewall through Docker's own gateway. The server still answers with the firewall closed, and the firewall's counters don't move. This script is one of the three things that give it away: the route and first-hop checks fail.

## The script

```sh
#!/bin/sh
# Session one check: run inside client-a.
#   docker compose exec client-a sh /lab/tests/check-routing.sh
# Reports PASS or FAIL for each check. Changes nothing.

SERVER=10.10.20.10
FW=10.10.10.1
pass=0; fail=0
ok()  { echo "PASS  $1"; pass=$((pass+1)); }
bad() { echo "FAIL  $1"; fail=$((fail+1)); }

ip route | grep -q "10.10.20.0/24 via $FW" \
  && ok "route to the DMZ goes via fw ($FW)" \
  || bad "route to the DMZ goes via fw ($FW)"

ip route | grep -q '^default' \
  && bad "no default route (no way out of the lab)" \
  || ok  "no default route (no way out of the lab)"

ping -c 2 -W 2 "$SERVER" >/dev/null 2>&1 \
  && ok "server ($SERVER) answers" \
  || bad "server ($SERVER) answers"

first=$(traceroute -n -m 2 -w 2 "$SERVER" 2>/dev/null | awk 'NR==2{print $2}')
[ "$first" = "$FW" ] \
  && ok "first hop to the server is fw ($first)" \
  || bad "first hop to the server is fw (got: ${first:-nothing})"

ping -c 1 -W 2 1.1.1.1 >/dev/null 2>&1 \
  && bad "internet unreachable" \
  || ok  "internet unreachable"

echo "---"
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
```
