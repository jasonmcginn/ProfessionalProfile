---
title: "Automating student account provisioning"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Automation &amp; AI · Identity &amp; Policy · People</p>
    <h1>Automating student account provisioning</h1>
    <div class="story-body">
      <p>When I taught at the college, the class only filled half my day. Rather than keep me part time, they hired me on full time and I ran the network in the afternoons. That made for a full day, so I had to find time where I could, and I found it by automating the tasks I caught myself repeating every month.</p>
      <p>The biggest one was accounts. Every month or two I had to create 30 to 90 new student accounts, repetitive, mundane work. I was getting good with Excel at the time, so I looked at the problem there first.</p>
      <p>The requests came in two different shapes: sometimes "firstname, lastname," sometimes "lastname, firstname." Before writing a line of logic, I fixed the input: I asked the principal to always send the names the same way, lastname first. That was easy for her, and it made everything downstream predictable.</p>
      <p>From there I built the engine in Excel. The first two columns were left empty; I'd paste in the list of names and classes. Formulas split first and last name into their own columns, generated a username and password for each student, matched the class to the right security group references in another column, and recorded when the class was due to finish.</p>
      <p>A second tab turned each row into a Windows Server command to create the account. With a bit of VBA I exported that list to a text file and saved it as a .bat. Running it, after a confirm prompt, created every user, assigned them to the security groups they needed, and moved each one into the correct OU so the right policies applied.</p>
      <p>To finish the onboarding, I built a Word document that mail-merged the same Excel data into "Welcome" letters, so each student had what they needed to log in on day one.</p>
      <p>It saved a huge amount of time. It also made a great teaching example: my advanced Excel students who were curious about automation got to see a real, end-to-end one they could pick apart.</p>
    </div>
  </div>
