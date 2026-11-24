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
service: "migrations and projects"
glance:
  - {k: "where", v: "A Managed Services Client"}
  - {k: "problem", v: "Aging Systems That Needed Replacing"}
  - {k: "built", v: "VMware ESXi Host · RAID 10 · New Virtual Domain Controllers"}
  - {k: "result", v: "Nothing Went Down · Backups Proven by a Real Test Restore"}
related:
  - {kind: "Why tested backups matter", title: "Ransomware, first thing in the morning", text: "A newly onboarded client, a call at 8 a.m. that the files were encrypted. Contained, traced, recovered from the night-before backup, then I closed the holes that let it in.", url: "/stories/ransomware/"}
  - {kind: "Related story", title: "Azure foundations for Dynamics 365 migrations", text: "The Azure infrastructure behind Dynamics 365 migrations at Thinkmax, a fresh foundation built per client.", url: "/stories/azure-foundations/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Aging systems, replaced end to end</h2>
<p class="lead">A client needed to replace aging systems, so I researched and bought a new server to run VMware ESXi.</p>
<p>I handled the refresh end to end, from advising on the hardware to retiring the old machines.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Options first, then a careful cutover</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Lay out the options</h3>
</div>
<p>I started by laying out the options. I gave them the hardware choices and a deployment plan, they picked the path, and I built it.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Storage chosen on purpose</h3>
</div>
<p>For storage I set up RAID 10, mirrored so the data stayed intact if a drive failed, and striped so reads and writes were faster, a deliberate choice for both integrity and speed rather than a default.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Build the new host</h3>
</div>
<p>On the new host I stood up ESXi, built fresh virtual servers on it, and joined them to the domain.</p>
</li>
<li>
<div class="part-h">
<span class="n">4</span><h3>Overlap the old and the new</h3>
</div>
<p>The careful part was the cutover, because these were domain controllers and I wasn't willing to risk downtime. So I overlapped the old and new: I promoted the new servers and let them run alongside the originals for a while, confirmed everything worked, and tested the backups by actually restoring from them before I trusted anything.</p>
<p>Only then did I demote the old servers one at a time, until the old systems were offline and the new ones were carrying the load in their place.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>Nothing went down during the move</h2>
<p class="lead">The old physical systems were retired, the new virtual ones were live, and the backups had been proven by a real test restore before the cutover, not just assumed to work.</p>
<p>The whole lifecycle, in the order that keeps a business running:</p>
<ol class="flow" aria-label="The lifecycle, in order">
<li>Advise</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Plan</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Deploy</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Migrate</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Verify</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Decommission</li>
</ol>
</section>
