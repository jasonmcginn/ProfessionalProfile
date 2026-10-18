---
title: "A zero-downtime server refresh"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Platforms · Identity &amp; Policy · Physical · People</p>
    <h1>A zero-downtime server refresh</h1>
    <div class="story-body">
      <p>A client needed to replace aging systems, I researched and bought a new server to run VMware ESXi. I handled the refresh end to end, from advising on the hardware to retiring the old machines.</p>
      <p>I started by laying out the options. I gave them the hardware choices and a deployment plan, they picked the path, and I built it. For storage I set up RAID 10, mirrored so the data stayed intact if a drive failed, and striped so reads and writes were faster, a deliberate choice for both integrity and speed rather than a default.</p>
      <p>On the new host I stood up ESXi, built fresh virtual servers on it, and joined them to the domain. The careful part was the cutover, because these were domain controllers and I wasn't willing to risk downtime. So I overlapped the old and new: I promoted the new servers and let them run alongside the originals for a while, confirmed everything worked, and tested the backups by actually restoring from them before I trusted anything. Only then did I demote the old servers one at a time, until the old systems were offline and the new ones were carrying the load in their place.</p>
      <p>Nothing went down during the move. The old physical systems were retired, the new virtual ones were live, and the backups had been proven by a real test restore before the cutover, not just assumed to work. Advise, plan, deploy, migrate, verify, decommission, the whole lifecycle, in the order that keeps a business running.</p>
    </div>
  </div>
