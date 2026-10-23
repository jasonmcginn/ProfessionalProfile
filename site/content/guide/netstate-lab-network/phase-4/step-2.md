---
title: "The replay test"
step: 2
weight: 3
time: "10 min"
goal: "Resend a captured SPA packet and confirm the door stays shut, the test the knock failed."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

In Phase 2, a captured knock, resent by the outsider, opened the door, because the knock is just a pattern with no secret. SPA is built to pass this exact test. Here you confirm it does.

### 1. Send an SPA packet and keep a copy

`-B` saves the exact packet that's sent.

{{< cmd >}}docker compose exec client-a fwknop -A tcp/22 -N 10.10.20.10:22 -a 10.10.10.11 -D 10.10.10.1 -B /tmp/spa.pkt --key-base64-rijndael PASTE_KEY_BASE64 --key-base64-hmac PASTE_HMAC_KEY_BASE64{{< /cmd >}}

### 2. Wait for the door to close

The access lasts 30 seconds. Wait it out, then confirm SSH is shut again.

{{< cmd >}}docker compose exec client-a sh -c "sleep 32; nmap -n -Pn -p 22 10.10.20.10"{{< /cmd >}}

### 3. Resend the exact same packet

{{< cmd >}}docker compose exec client-a bash -c "cat /tmp/spa.pkt > /dev/udp/10.10.10.1/62201"{{< /cmd >}}

### 4. Check the door

{{< cmd >}}docker compose exec client-a nmap -n -Pn -p 22 10.10.20.10{{< /cmd >}}

### 5. Confirm a fresh packet still works

{{< cmd >}}docker compose exec client-a fwknop -A tcp/22 -N 10.10.20.10:22 -a 10.10.10.11 -D 10.10.10.1 --key-base64-rijndael PASTE_KEY_BASE64 --key-base64-hmac PASTE_HMAC_KEY_BASE64{{< /cmd >}}
{{< cmd >}}docker compose exec client-a nmap -n -Pn -p 22 10.10.20.10{{< /cmd >}}

## You should see

- After the wait: `22/tcp filtered`. The door closed.
- After the replay: still `filtered`. The resent packet did nothing.
- After a fresh packet: `22/tcp open`. A new, valid packet still works.

## What it means

The firewall remembers every SPA packet it has accepted and refuses a repeat. A new packet is different every time, because it's encrypted with a changing value and signed, so a copied one is recognised and dropped. The knock failed this test; SPA passes it. That one difference is why SPA replaced knocking.
