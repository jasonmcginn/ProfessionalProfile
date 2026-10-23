---
title: "SSH on keys, not passwords"
step: 3
weight: 4
time: "15 min"
goal: "Give client-a an SSH key, trust it on the server, and turn password logins off."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

A password can be guessed, reused or read off the wire. An SSH key can't be any of those. You'll give client-a a key, install it on the server, then turn password logins off, so a password is no longer accepted at all.

### 1. Make a key on client-a

{{< cmd >}}docker compose exec client-a ssh-keygen -t ed25519 -N "" -f /root/.ssh/id_ed25519{{< /cmd >}}

### 2. Install the public key on the server

`ssh-copy-id` copies the public half to the server. It asks for the password one last time, while password logins are still on.

{{< cmd >}}docker compose exec client-a ssh-copy-id -o StrictHostKeyChecking=no netstate@10.10.20.10{{< /cmd >}}

### 3. Sign in with the key, no password

{{< cmd >}}docker compose exec client-a ssh netstate@10.10.20.10 hostname{{< /cmd >}}

### 4. Turn password logins off

{{< cmd >}}docker compose exec server sh -c "printf 'PasswordAuthentication no\nPubkeyAuthentication yes\nPermitRootLogin no\n' > /etc/ssh/sshd_config.d/lab.conf && pkill -HUP sshd"{{< /cmd >}}

### 5. Confirm a password is refused

{{< cmd >}}docker compose exec client-a ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no netstate@10.10.20.10 true{{< /cmd >}}

## You should see

- Step 3: `server`. The key works, and it didn't ask for a password.
- Step 5: `Permission denied (publickey)`. The server won't take a password at all.

## What it means

The server now trusts a key that only client-a holds, and it accepts nothing else. This is what finally closes Phase 1's reuse: a password read off the wire, or guessed, is useless here, because the server stopped accepting passwords. The key never crosses the wire, so a capture can't catch it.

Next, each service gets its own login, then every Phase 1 leak is rechecked and shut.
