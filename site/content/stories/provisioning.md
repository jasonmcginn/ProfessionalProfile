---
title: "Automating student account provisioning"
summary: "Scripting student account creation so running the network didn't eat the time I needed for teaching."
hook: "Teaching filled half the day and the network filled the rest, so the repetitive parts had to script themselves."
layers: ["X3", "X1", "L8"]
accordion: "X3"
topics: []
status: "live"
visibility: "public"
service: "tools and automation"
glance:
  - {k: "where", v: "Eastern College · Instructor and Network Administrator · 2008 to 2010"}
  - {k: "problem", v: "30 to 90 New Student Accounts Every Month or Two"}
  - {k: "built", v: "Excel Formulas · VBA · Batch File · Word Mail Merge"}
  - {k: "result", v: "Accounts, Groups, OUs and Welcome Letters From One Pasted List"}
related:
  - {kind: "Related story", title: "Turning config tracking into handover documentation", text: "Turning the configuration log I kept through each migration into clean client handover documentation.", url: "/stories/config-docs/"}
  - {kind: "Related story", title: "Teaching networking by building it", text: "A three-lab progression I built on my own evenings so students learned networking by building it.", url: "/stories/iss-labs/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>A full day, and the same task every month</h2>
<p class="lead">When I taught at the college, the class only filled half my day. Rather than keep me part time, they hired me on full time and I ran the network in the afternoons.</p>
<p>That made for a full day, so I had to find time where I could, and I found it by automating the tasks I caught myself repeating every month.</p>
<p>The biggest one was accounts. Every month or two I had to create 30 to 90 new student accounts: repetitive, mundane work. I was getting good with Excel at the time, so I looked at the problem there first.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Four steps, from a list of names to day one</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Fix the input first</h3>
</div>
<p>The requests came in two different shapes: sometimes "firstname, lastname," sometimes "lastname, firstname."</p>
<p>Before writing a line of logic, I fixed the input: I asked the principal to always send the names the same way, lastname first. That was easy for her, and it made everything downstream predictable.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Build the engine in Excel</h3>
</div>
<p>From there I built the engine in Excel. The first two columns were left empty; I'd paste in the list of names and classes.</p>
<p>Formulas split first and last name into their own columns, generated a username and password for each student, matched the class to the right security group references in another column, and recorded when the class was due to finish.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Turn rows into commands</h3>
</div>
<p>A second tab turned each row into a Windows Server command to create the account. With a bit of VBA I exported that list to a text file and saved it as a .bat.</p>
<p>Running it, after a confirm prompt, created every user, assigned them to the security groups they needed, and moved each one into the correct OU so the right policies applied.</p>
</li>
<li>
<div class="part-h">
<span class="n">4</span><h3>Finish the onboarding</h3>
</div>
<p>To finish the onboarding, I built a Word document that mail-merged the same Excel data into "Welcome" letters, so each student had what they needed to log in on day one.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>Time back, and a teaching example</h2>
<p class="lead">It saved a huge amount of time.</p>
<p>It also made a great teaching example: my advanced Excel students who were curious about automation got to see a real, end-to-end one they could pick apart.</p>
</section>
