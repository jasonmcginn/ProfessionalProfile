---
title: "Ransomware, first thing in the morning"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">Operations &amp; Resilience · Identity &amp; Policy</p>
    <h1>Ransomware, first thing in the morning</h1>
    <p class="hook">A newly onboarded client, a network that wasn't in good shape, and a call at 8&nbsp;a.m. that the files were encrypted.</p>
    <div class="story-body">
      <h2>The situation</h2>
      <p>I had just taken this client on as-is, and their network wasn't in good shape. One morning I got the call: a computer was prompting for a code and saying the data was encrypted.</p>
      <h2>What I did</h2>
      <p>I stopped the user right away and had her go around and get everyone to shut their computers off - the network was hit with ransomware. While she did that, I logged into the server, made quick copies of the Event Viewer logs, and shut it down. Then I got in the car and drove to site, calling the managers and my team on the way so everyone who needed to know was in the loop.</p>
      <p>On site, I unplugged the reported computer and turned it back on to see what was there. I went to the server logs I'd copied and saw a massive list of login attempts - it hit a user called "mary" and got a successful login. I lined the log time up against the system logs, and that's where it started making the mess. I narrowed it to the 3 computers that had been on that morning. The server was spared: that user wasn't allowed to log into it, so it denied the access. The network files Mary had access to were encrypted.</p>
      <p>I imaged the infected machines to investigate later, then reinstalled Windows to get them running - they had no desktop images at the time. I looked up the ransomware, listed the processes and files it touches and how it worked, and ran full scans on every computer and server while they were off the network. Then I brought them back one at a time, critical systems first, and double-checked each with an online scanner before I trusted it.</p>
      <h2>The result</h2>
      <p>Using the backup from the night before, I restored the files. Because it hit first thing, only a few files made that morning were lost - everything back in about 6 to 8 hours, and no ransom paid. Then I fixed the root cause: the password was literally "mary", so I enforced complex passwords by Group Policy, and I rebuilt the file-share security with proper groups so people only had access to what they needed.</p>
    </div>
    <div class="digdeeper">
      <h3>// dig deeper</h3>
      <div class="dd-links">
        <a class="dd mono ddsoon"><span class="ic">▸</span> Incident response: full write-up (coming soon)</a>
        <a class="dd mono ddsoon"><span class="ic">▸</span> Hardening: the GPO + permissions changes (coming soon)</a>
        <a class="dd mono ddsoon"><span class="ic">▸</span> Backup &amp; recovery plan (ransomware-ready) (coming soon)</a>
      </div>
      <div class="dd-layers">Related layers: <a href="/#layers">Operations &amp; Resilience</a><a href="/#layers">Identity &amp; Policy</a><a href="/#layers">Platforms</a></div>
    </div>
  </div>
