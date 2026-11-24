---
title: "Ransomware, first thing in the morning"
summary: "A newly onboarded client, a call at 8 a.m. that the files were encrypted. Contained, traced, recovered from the night-before backup, then I closed the holes that let it in."
hook: "A newly onboarded client, a network that wasn't in good shape, and a call at 8&nbsp;a.m. that the files were encrypted."
layers: ["X4", "X1"]
accordion: "X4"
topics: []
status: "live"
featured: true
featorder: 1
visibility: "public"
service: "level 3 escalations"
glance:
  - {k: "where", v: "A Newly Onboarded Managed Services Client"}
  - {k: "problem", v: "Ransomware: Three Computers and the Network Files Encrypted"}
  - {k: "restored", v: "From the Night-Before Backup, in About 6 to 8 Hours"}
  - {k: "result", v: "No Ransom Paid · Root Cause Fixed by Group Policy"}
related:
  - {kind: "Related document", title: "Backup and recovery plan", text: "A ransomware-ready backup and recovery plan for a single work and lab host, built entirely on free tools, with a side-by-side of what changes in a production environment.", url: "/documents/backup-recovery-plan/"}
  - {kind: "Related story", title: "A zero-downtime server refresh", text: "New ESXi host, RAID 10, fresh VMs, domain-controller cutover by promote/demote, backups test-restored before anything old was retired.", url: "/stories/server-refresh/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>A call that the data was encrypted</h2>
<p class="lead">I had just taken this client on as-is, and their network wasn't in good shape.</p>
<p>One morning I got the call: a computer was prompting for a code and saying the data was encrypted.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Contain it, trace it, clean it, bring it back</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Contain it</h3>
</div>
<p>I stopped the user right away and had her go around and get everyone to shut their computers off. The network had been hit with ransomware. While she did that, I logged into the server, made quick copies of the Event Viewer logs, and shut it down.</p>
<p>Then I got in the car and drove to the site, calling the managers and my team on the way so everyone who needed to know was in the loop.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Trace it</h3>
</div>
<p>On site, I unplugged the reported computer from the network, then turned it back on to see what was there. I went to the server logs I'd copied and saw a massive list of login attempts against one user account, ending in a successful login. I lined that login time up against the system logs, and that's where the damage started.</p>
<p>I narrowed it to the 3 computers that had been on that morning. The server was spared: that user wasn't allowed to log into it, so it denied the access. The network files that account could reach were encrypted.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Clean it</h3>
</div>
<p>I imaged the infected machines to investigate later, then reinstalled Windows to get them running, since they had no desktop images at the time.</p>
<p>I looked up the ransomware, listed the processes and files it touched and how it worked, and ran full scans on every computer and server while they were off the network.</p>
</li>
<li>
<div class="part-h">
<span class="n">4</span><h3>Bring it back</h3>
</div>
<p>Then I brought them back one at a time, critical systems first, and double-checked each with an online scanner before I trusted it.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>Back the same day, and no ransom paid</h2>
<p class="lead">Using the backup from the night before, I restored the files. Because it hit first thing, only a few files made that morning were lost. Everything was back in about 6 to 8 hours, and no ransom was paid.</p>
<p>Then I fixed the root cause.</p>
<div class="cards2">
<div>
<p class="k">Passwords</p>
<p>The account's password was literally its own username, so I enforced complex passwords by Group Policy.</p>
</div>
<div>
<p class="k">File shares</p>
<p>I rebuilt the file-share security with proper groups so people only had access to what they needed.</p>
</div>
</div>
</section>
