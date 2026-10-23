---
title: "Services on the wire"
step: 4
weight: 5
time: "15 min"
goal: "Sign in to the server three ways, web, Telnet and SSH, and see which passwords can be read off the wire."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

The server runs three services, all with the same lab-only login. It's public on purpose; never reuse it anywhere real.

| User | Password |
|---|---|
| `netstate` | `LabOnly-2026` |

### 1. See what's open

nmap knocks on the server's ports and lists the ones that answer.

{{< cmd >}}docker compose exec client-a nmap -n 10.10.20.10{{< /cmd >}}

### 2. Start a capture of the three services

{{< cmd >}}docker compose exec -d fw tcpdump -i any -nn -U --immediate-mode -w /captures/step4.pcap "tcp port 80 or tcp port 23 or tcp port 22"{{< /cmd >}}

### 3. Sign in to the web page

This sends the login form the way a browser would, over plain HTTP. The page answers `Signed in.`

{{< cmd >}}docker compose exec client-a curl -s -d "username=netstate&password=LabOnly-2026" http://10.10.20.10/login{{< /cmd >}}

### 4. Sign in with Telnet

Type the username and password when asked, run `whoami`, then type `exit`.

{{< cmd >}}docker compose exec client-a telnet 10.10.20.10{{< /cmd >}}

### 5. Sign in with SSH

The first time, type `yes` to trust the server's key. Then the password, `whoami`, and `exit`.

{{< cmd >}}docker compose exec client-a ssh netstate@10.10.20.10{{< /cmd >}}

### 6. Stop the capture and look for the password

{{< cmd >}}docker compose exec fw pkill tcpdump{{< /cmd >}}
{{< cmd >}}docker compose exec fw sh -c "tcpdump -r /captures/step4.pcap -nn -A 2>/dev/null | grep -a password="{{< /cmd >}}

### 7. Read the Telnet login in Wireshark

Telnet sends each key you press as its own packet, so it's easiest to read in Wireshark, which puts them back together. Open `captures\step4.pcap` from the lab folder, type `telnet` in the filter bar, then right-click any packet and choose **Follow > TCP Stream**.

<!-- screenshot: step4-wireshark-telnet.png -->

## You should see

- nmap: ports **22** (ssh), **23** (telnet) and **80** (http) open.
- The web search: `username=netstate&password=LabOnly-2026`, in plain text (twice, because the capture sees it on both sides of fw).
- Wireshark: your Telnet username, password and every command you typed.
- SSH: nothing readable at all.

## What it means

The firewall saw all three logins, and two of them it could read. The web form and Telnet send everything as typed, so anyone who can capture the traffic, on a firewall, a switch or shared Wi-Fi, gets the password. SSH carries the same login encrypted. HTTPS does the same for the web page; that comes in Phase 3.

Next, step 5 shows why it matters that all three use the same password.
