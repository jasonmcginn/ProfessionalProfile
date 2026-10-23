---
title: "Move the web server to HTTPS"
step: 2
weight: 3
time: "15 min"
goal: "Give the web server a certificate, serve the login over HTTPS, and confirm the password no longer shows on the wire."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

In Phase 1 the web login crossed the wire in clear text. HTTPS wraps it in TLS, so a capture shows only encrypted bytes. You'll make a self-signed certificate for the lab; a real site would use one from a certificate authority.

### 1. Make a certificate on the server

The private key is written inside the server and never leaves it.

{{< cmd >}}docker compose exec server openssl req -x509 -newkey rsa:2048 -nodes -keyout /lab/tls/key.pem -out /lab/tls/cert.pem -days 365 -subj "/CN=server.lab"{{< /cmd >}}

The web server watches for that certificate and starts HTTPS on :443 within a second or two. Plain :80 then redirects there.

### 2. Open 443 at the firewall

{{< cmd >}}docker compose exec fw iptables -I FORWARD 5 -i lan -o dmz -p tcp --dport 443 -j ACCEPT{{< /cmd >}}

### 3. Capture a login over HTTPS

{{< cmd >}}docker compose exec -d fw tcpdump -i any -nn -U --immediate-mode -w /captures/https.pcap "tcp port 443"{{< /cmd >}}
{{< cmd >}}docker compose exec client-a curl -sk -o /dev/null -d "username=netstate&password=LabOnly-2026" https://10.10.20.10/login{{< /cmd >}}
{{< cmd >}}docker compose exec fw pkill tcpdump{{< /cmd >}}

### 4. Look for the password

{{< cmd >}}docker compose exec fw sh -c "tcpdump -r /captures/https.pcap -nn -A 2>/dev/null | grep -ac password="{{< /cmd >}}

### 5. Check that plain HTTP now redirects

{{< cmd >}}docker compose exec client-a curl -s -o /dev/null -w "%{http_code}\n" http://10.10.20.10/login{{< /cmd >}}

## You should see

- The password search: `0`. Nothing readable.
- The HTTP check: `301`, a redirect to HTTPS.

Compare with Phase 1, step 4, where the same search found the password in plain text.

## What it means

The login is the same; the wire is not. TLS encrypts everything after the first handshake, so a capture on the firewall shows only the server's certificate and then noise. The `-k` in curl tells it to accept a self-signed certificate, which a browser would warn about; a real certificate removes the warning.
