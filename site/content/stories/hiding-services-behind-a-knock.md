---
title: "Hiding my services behind a port knock"
summary: "How I took RDP and SSH off the internet and hid them behind a knock of invalid TCP flags, and used it as my real remote access."
hook: ""
layers: ["L4", "L3"]
accordion: "L4"
project: "netstate-lab-network"
topics: []
status: "planned"
visibility: "public"
weight: 10
---
<p class="tbd-note">[Placeholder: Jason writes this story first.]</p>
<p>Intent: the problem that started the project. Why the services needed hiding, why a knock, how the TCP-flag sequence worked, what it opened, for how long, and how it closed again.</p>
<!-- Jason's raw notes (2026-10-20), to be written up in his voice:
- I connected to my machines with RDP (and SSH). Learned it was insecure, kept going deeper until I heard of port knocking.
- Knocking was already a concept, but I took it further. I actually used this setup as my remote access and left RDP and SSH off the internet.
- The knock: invalid TCP flags sent to specified ports. Within a 1 minute window, the log entries had to arrive in a specific order.
- On a valid knock, RDP and SSH opened only to the IP the knock came from. The opening lasted 5 minutes; an established session stayed up until disconnected.
- Idle longer than 15 minutes dropped the connection.
-->
