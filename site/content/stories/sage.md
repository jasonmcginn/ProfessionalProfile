---
title: "Running Sage without handing out admin"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Identity &amp; Policy · Platforms · Application · People</p>
    <h1>Running Sage without handing out admin</h1>
    <div class="story-body">
      <p>The Information Systems Specialist students needed to run Sage as part of the program, but there was a catch: Sage wanted local administrator rights to run properly, and there was no way I was giving students admin on the lab machines.</p>
      <p>So instead of guessing, I watched. I set Sage up in a lab and monitored exactly what it did when it ran, the files it touched and the network it used, until I knew precisely which folders and ports it actually needed.</p>
      <p>Then I granted only that. I built a Group Policy that pushed the specific folder and registry permissions a standard user needed to run the client fully, and nothing more. The students got a working Sage as ordinary users, with no administrator access to the machine.</p>
      <p>The lab server itself ran in a virtual machine, so I could reset it to a clean state after every class.</p>
      <p>It is least privilege done the hard way, and the right way: reverse-engineer what the application truly requires, then open up exactly that, instead of taking the lazy path of handing out admin. Figure out the need, enforce it through policy, keep the environment clean.</p>
    </div>
  </div>
