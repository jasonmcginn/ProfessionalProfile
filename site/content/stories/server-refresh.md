---
title: "A zero-downtime server refresh"
summary: "New ESXi host, RAID 10, fresh VMs, domain-controller cutover by promote/demote, backups test-restored before anything old was retired."
hook: "A client's aging systems needed replacing. I handled the refresh end to end, new hardware to retired machines, without taking them down."
layers: ["X2", "X1", "L1", "L8"]
accordion: "X2"
topics: []
status: "live"
featured: true
featorder: 2
visibility: "public"
---
<h2>The situation</h2>
<p>A client needed to replace aging systems, so I researched and bought a new server to run VMware ESXi. I handled the refresh end to end, from advising on the hardware to retiring the old machines.</p>
<h2>What I did</h2>
<p>I started by laying out the options. I gave them the hardware choices and a deployment plan, they picked the path, and I built it. For storage I set up RAID 10, mirrored so the data stayed intact if a drive failed, and striped so reads and writes were faster, a deliberate choice for both integrity and speed rather than a default.</p>
<p>On the new host I stood up ESXi, built fresh virtual servers on it, and joined them to the domain. The careful part was the cutover, because these were domain controllers and I wasn't willing to risk downtime. So I overlapped the old and new: I promoted the new servers and let them run alongside the originals for a while, confirmed everything worked, and tested the backups by actually restoring from them before I trusted anything. Only then did I demote the old servers one at a time, until the old systems were offline and the new ones were carrying the load in their place.</p>
<h2>The result</h2>
<p>Nothing went down during the move. The old physical systems were retired, the new virtual ones were live, and the backups had been proven by a real test restore before the cutover, not just assumed to work. Advise, plan, deploy, migrate, verify, decommission, the whole lifecycle, in the order that keeps a business running.</p>
