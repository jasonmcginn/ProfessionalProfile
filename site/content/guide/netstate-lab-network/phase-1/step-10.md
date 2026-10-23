---
title: "Check your work, and save it as code"
step: 10
weight: 11
time: "10 min"
goal: "Prove Phase 1's policy is in place, save the rules to a file, compare them with the answer key, and load them back."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

Everything you've typed lives only in fw's memory. Restart fw and it's gone. In this step you prove the policy works, save it as a file, and load it back, the way rules are kept in real life: as code, under version control.

### 1. Check both clients

{{< cmd >}}docker compose exec client-a sh /lab/tests/check-phase1.sh{{< /cmd >}}
{{< cmd >}}docker compose exec client-b sh /lab/tests/check-phase1.sh{{< /cmd >}}

### 2. Save your rules to a file

`-t filter` saves just the firewall rules (Docker keeps some rules of its own in other tables). The file lands in your `captures` folder.

{{< cmd >}}docker compose exec fw sh -c "iptables-save -t filter > /captures/my-rules.v4"{{< /cmd >}}

### 3. Compare them with the answer key

The answer key is in the lab folder at `config\fw\phase1-rules.v4`, with a comment on every rule. This compares just the rules, line by line:

{{< cmd >}}docker compose exec fw sh -c "grep -- '^-A' /lab/config/fw/phase1-rules.v4 > /tmp/key; grep -- '^-A' /captures/my-rules.v4 | diff /tmp/key - && echo MATCH"{{< /cmd >}}

### 4. Lose them

Restart fw, and look at its rules:

{{< cmd >}}docker compose restart fw{{< /cmd >}}
{{< cmd >}}docker compose exec fw iptables -S FORWARD{{< /cmd >}}

### 5. Load them back from the file

{{< cmd >}}docker compose exec fw sh -c "iptables-restore < /lab/config/fw/phase1-rules.v4"{{< /cmd >}}
{{< cmd >}}docker compose exec client-a sh /lab/tests/check-phase1.sh{{< /cmd >}}
{{< cmd >}}docker compose exec client-b sh /lab/tests/check-phase1.sh{{< /cmd >}}

## You should see

- Both checks: `6 passed, 0 failed`.
- The compare: `MATCH`. If not, `diff` shows the lines that differ: `<` is the answer key, `>` is yours.
- After the restart: `-P FORWARD ACCEPT`. fw is wide open again.
- After loading the file: both checks pass again.

## What it means

Typed rules are lost on a restart; a file isn't. With the rules in a file, the firewall can be rebuilt in one command, reviewed before it changes, and compared against what it should be. That's **configuration as code**, and it's how Phase 2 starts: from this file.

## Phase 1 done

You've watched an open network, read passwords off the wire, reused one, locked the firewall down, opened it for purpose, gone around it, and found blocks in three different firewalls. Phase 2 hides SSH behind a port knock.
