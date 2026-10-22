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
---
<h2>The situation</h2>
<p>The Information Systems Specialist students needed to run Sage as part of the program, but there was a catch: Sage wanted local administrator rights to run properly, and there was no way I was giving students admin on the lab machines.</p>
<h2>What I did</h2>
<p>So instead of guessing, I watched. I set Sage up in a lab and monitored exactly what it did when it ran, the files it touched and the network it used, until I knew precisely which folders and ports it actually needed.</p>
<p>Then I granted only that. I built a Group Policy that pushed the specific folder and registry permissions a standard user needed to run the client fully, and nothing more. The students got a working Sage as ordinary users, with no administrator access to the machine.</p>
<p>The lab server itself ran in a virtual machine, so I could reset it to a clean state after every class.</p>
<h2>What I take from it</h2>
<p>It is least privilege done the hard way, and the right way: reverse-engineer what the application truly requires, then open up exactly that, instead of taking the lazy path of handing out admin. Figure out the need, enforce it through policy, keep the environment clean.</p>
