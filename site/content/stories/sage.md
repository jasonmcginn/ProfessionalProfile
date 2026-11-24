---
title: "Running Sage without handing out admin"
summary: "An app that demanded local admin, students who couldn't have it. I monitored exactly what it needed and granted only that by Group Policy."
hook: "An app that insisted on local admin, and students who could never have it. So I found exactly what it needed, and granted only that."
layers: ["X1", "X2", "L7", "L8"]
accordion: "X1"
topics: []
status: "live"
featured: true
featorder: 3
visibility: "public"
service: "solution design"
glance:
  - {k: "where", v: "Eastern College · Instructor and Network Administrator · 2008 to 2010"}
  - {k: "problem", v: "Sage Wanted Local Administrator Rights to Run"}
  - {k: "fix", v: "A Group Policy Granting Only the Folders and Registry Keys It Needed"}
  - {k: "result", v: "A Working Sage for Ordinary Users, With No Admin Access"}
related:
  - {kind: "Why it matters", title: "Ransomware, first thing in the morning", text: "A newly onboarded client, a call at 8 a.m. that the files were encrypted. Contained, traced, recovered from the night-before backup, then I closed the holes that let it in.", url: "/stories/ransomware/"}
  - {kind: "Same classroom", title: "Teaching networking by building it", text: "A three-lab progression I built on my own evenings so students learned networking by building it.", url: "/stories/iss-labs/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>An app that wanted admin, and students who couldn't have it</h2>
<p class="lead">The Information Systems Specialist students needed to run Sage as part of the program, but there was a catch.</p>
<p>Sage wanted local administrator rights to run properly, and there was no way I was giving students admin on the lab machines.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Watch first, then grant only that</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Watch what it really needs</h3>
</div>
<p>So instead of guessing, I watched. I set Sage up in a lab and monitored exactly what it did when it ran, the files it touched and the network it used, until I knew precisely which folders and ports it actually needed.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Grant only that</h3>
</div>
<p>Then I granted only that. I built a Group Policy that pushed the specific folder and registry permissions a standard user needed to run the client fully, and nothing more.</p>
<p>The students got a working Sage as ordinary users, with no administrator access to the machine.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Keep the environment clean</h3>
</div>
<p>The lab server itself ran in a virtual machine, so I could reset it to a clean state after every class.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 what I take from it</p>
<h2>Least privilege, done the hard way</h2>
<p class="lead">It is least privilege done the hard way, and the right way: reverse-engineer what the application truly requires, then open up exactly that, instead of taking the lazy path of handing out admin.</p>
<ol class="flow" aria-label="The approach, in order">
<li>Figure out the need</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Enforce it through policy</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Keep the environment clean</li>
</ol>
</section>
