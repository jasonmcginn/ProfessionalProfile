---
title: "A site-to-site VPN, tested offline before it went live"
summary: "Connected two sites with an IPsec tunnel on a Cisco router, built and tested offline before it went live."
hook: "Two offices, one tunnel. I built the site-to-site VPN and proved it worked offline before it ever went live."
layers: ["L3", "L5-6", "X3", "L8"]
accordion: "L5-6"
topics: []
status: "live"
visibility: "public"
service: "migrations and projects"
glance:
  - {k: "where", v: "Imvescor · Network Administrator · 2014 to 2017"}
  - {k: "problem", v: "Two Sites to Connect, Moncton and Montreal"}
  - {k: "built", v: "IPsec Tunnel · Cisco Router · Scripted and Tested in GNS3"}
  - {k: "result", v: "The Tunnel Came Up on the First Try"}
related:
  - {kind: "What happened next", title: "When an expired certificate took the VPN down", text: "A site-to-site VPN dropped with nothing misconfigured; the certificate behind it had quietly expired.", url: "/stories/cert-expiry/"}
  - {kind: "Same instinct, years later", title: "Azure foundations for Dynamics 365 migrations", text: "The Azure infrastructure behind Dynamics 365 migrations at Thinkmax, a fresh foundation built per client.", url: "/stories/azure-foundations/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Two offices, one tunnel</h2>
<p class="lead">At Imvescor, I needed to connect our network to another site in Montreal, so I built a site-to-site VPN between them: an IPsec tunnel on a Cisco router, configured from the console.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Prove it offline, then deploy in a planned window</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Prove it in an emulator</h3>
</div>
<p>I didn't want to find out whether it worked in production. So I scripted the whole configuration offline and tested it first in an emulator, GNS3, standing up both ends and proving the tunnel came up and traffic passed before any of it touched real equipment.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Deploy after hours, with the far end</h3>
</div>
<p>When I was confident, I deployed it after hours, working with a colleague on the Montreal end so we could bring it up together, test every connection from both sides, and keep any downtime to a minimum.</p>
<p>The tunnel came up on the first try.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Two small fixes</h3>
</div>
<p>The two small fixes were on either side of it: at first, traffic wasn't reaching Montreal's internal network because I hadn't set the route quite right, and once I corrected that it started to flow.</p>
<p>A few services still weren't reachable after that, and I traced it to a firewall rule on the Moncton side and opened the path.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 what I take from it</p>
<h2>Config as code, before it was a common phrase</h2>
<p class="lead">What I like about this one is that it was config-as-code before "infrastructure as code" was a common phrase. I built and proved the whole thing in an emulator, rolled it out in a planned window, and verified it with the far end.</p>
<p>It's how I still work:</p>
<ol class="flow" aria-label="How I still work, in order">
<li>Plan the change</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Prove it offline</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Deploy in a controlled window</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Confirm it from both sides</li>
</ol>
</section>
