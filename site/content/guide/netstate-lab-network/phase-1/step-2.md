---
title: "Find your way around"
step: 2
weight: 3
time: "10 min"
goal: "See what's running, step inside a machine, and start, stop or reset the lab."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. -->

```
   LAN 10.10.10.0/24                     DMZ 10.10.20.0/24

   client-a  .11  ──┐                ┌──  server  .10
                    ├── fw .1 / .1 ──┤
   client-b  .12  ──┘
```

client-a is the authorized user, client-b is the outsider, and the server is the public-facing host.

### 1. See what's running

{{< cmd >}}docker compose ps{{< /cmd >}}

All four machines should show as **Up**.

### 2. Step inside a machine

This opens a shell on client-a, as if you'd sat down at its keyboard. The prompt changes to `root@client-a:/#`. (If it freezes, you're probably in PowerShell ISE: use Terminal instead. [How this was tracked down.](/guide/netstate-lab-network/troubleshooting-frozen-shell/))

{{< cmd >}}docker compose exec client-a bash{{< /cmd >}}

Look at its address and its routes:

{{< cmd >}}ip -br addr{{< /cmd >}}
{{< cmd >}}ip route{{< /cmd >}}

Then leave and go back to PowerShell:

{{< cmd >}}exit{{< /cmd >}}

### 3. Run one command without stepping inside

Most of this guide works this way: `docker compose exec`, the machine's name, then the command.

{{< cmd >}}docker compose exec fw ip -br addr{{< /cmd >}}

### 4. Read a machine's start-up log

{{< cmd >}}docker compose logs server{{< /cmd >}}

## You should see

Inside client-a, one address on the LAN and one route to the DMZ, through fw:

```
eth0@if10        UP             10.10.10.11/24
10.10.20.0/24 via 10.10.10.1 dev eth0
```

On fw, one network card on each side, named after the network it's on:

```
dmz@if8          UP             10.10.20.1/24
lan@if9          UP             10.10.10.1/24
```

The numbers after `@if` will be different on your PC.

<!-- screenshot: nav-02-inside-client-a.png -->

## Handy commands

| To | Run |
|---|---|
| Stop the lab, keep everything | `docker compose stop` |
| Start it again | `docker compose start` |
| Reset every machine to a clean start | `docker compose down`, then `docker compose up -d` |
| Remove the lab completely | See [below](#remove-the-lab-completely) |
| Rebuild after the lab files change | `docker compose up -d --build` |

Docker Desktop does the same: open **Containers > netstate-lab**, click a machine, and use the **Logs** or **Exec** tab.

## Remove the lab completely

When you're done with the lab, this removes every trace of it from your PC. Run the first command from the lab folder.

**1. Remove the machines, their networks and the lab's images:**

{{< cmd >}}docker compose down --rmi all --volumes --remove-orphans{{< /cmd >}}

**2. Remove the Debian base image the lab was built from.** Skip this if other projects on your PC use it; Docker will say so and leave it alone.

{{< cmd >}}docker image rm debian:trixie-slim{{< /cmd >}}

**3. Clear Docker's build cache.** This frees the space used while building. It clears the cache for every project, which only means other projects build a little slower next time.

{{< cmd >}}docker builder prune -f{{< /cmd >}}

**4. Delete the lab folder,** including your captures and logs:

{{< cmd >}}Set-Location C:\Labs{{< /cmd >}}
{{< cmd >}}Remove-Item -Recurse -Force C:\Labs\netstate-lab-network{{< /cmd >}}

To check nothing is left, these should list nothing from the lab:

{{< cmd >}}docker ps -a --filter "name=netstate-lab"{{< /cmd >}}
{{< cmd >}}docker images "netstate-lab/*"{{< /cmd >}}
{{< cmd >}}docker network ls --filter "name=netstate-lab"{{< /cmd >}}

Docker Desktop, WSL and Git stay installed. Uninstall them from **Windows Settings > Apps** if you no longer need them.
