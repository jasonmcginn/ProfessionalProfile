---
title: "Check your work, and save it as code"
step: 7
weight: 8
time: "10 min"
goal: "Confirm every leak is closed, then save the firewall rules so Phase 3 starts the same way every time."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

### 1. Run the Phase 3 check

{{< cmd >}}docker compose exec client-a sh /lab/tests/check-phase3.sh{{< /cmd >}}

### 2. Save your firewall rules

Phase 3 adds the HTTPS rule to the firewall. Save the rules to a file.

{{< cmd >}}docker compose exec fw sh -c "iptables-save -t filter > /captures/my-rules.v4"{{< /cmd >}}

### 3. Compare with the answer key

{{< cmd >}}docker compose exec fw sh -c "grep -- '^-A' /lab/config/fw/phase3-rules.v4 > /tmp/key; grep -- '^-A' /captures/my-rules.v4 | diff /tmp/key - && echo MATCH"{{< /cmd >}}

## You should see

- The check: `7 passed, 0 failed`.
- The compare: `MATCH`.

## What it means

The firewall change is in a file (`config/fw/phase3-rules.v4`), next to Phase 1's. The service fixes, removing Telnet, the certificate, the SSH key, the web login, are steps a build script would run, not one-off typing. That's the shape of the whole lab: every change lives as code, so it can be rebuilt, reviewed and checked.

## Phase 3 done

The leaks are shut: no Telnet, an encrypted web login, SSH on keys, and a separate login for each service. Phase 4 puts the legacy port knock next to the modern ways of doing the same job.
