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
---
<h2>The situation</h2>
      <p>I had just taken this client on as-is, and their network wasn't in good shape. One morning I got the call: a computer was prompting for a code and saying the data was encrypted.</p>
      <h2>What I did</h2>
      <p>I stopped the user right away and had her go around and get everyone to shut their computers off. The network had been hit with ransomware. While she did that, I logged into the server, made quick copies of the Event Viewer logs, and shut it down. Then I got in the car and drove to the site, calling the managers and my team on the way so everyone who needed to know was in the loop.</p>
      <p>On site, I unplugged the reported computer and turned it back on to see what was there. I went to the server logs I'd copied and saw a massive list of login attempts against one user account, ending in a successful login. I lined that login time up against the system logs, and that's where the damage started. I narrowed it to the 3 computers that had been on that morning. The server was spared: that user wasn't allowed to log into it, so it denied the access. The network files that account could reach were encrypted.</p>
      <p>I imaged the infected machines to investigate later, then reinstalled Windows to get them running, since they had no desktop images at the time. I looked up the ransomware, listed the processes and files it touched and how it worked, and ran full scans on every computer and server while they were off the network. Then I brought them back one at a time, critical systems first, and double-checked each with an online scanner before I trusted it.</p>
      <h2>The result</h2>
      <p>Using the backup from the night before, I restored the files. Because it hit first thing, only a few files made that morning were lost. Everything was back in about 6 to 8 hours, and no ransom was paid. Then I fixed the root cause: the account's password was literally its own username, so I enforced complex passwords by Group Policy, and I rebuilt the file-share security with proper groups so people only had access to what they needed.</p>
