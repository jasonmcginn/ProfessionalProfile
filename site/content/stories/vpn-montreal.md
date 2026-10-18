---
title: "A site-to-site VPN, tested offline before it went live"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Network · Session / Presentation · Automation &amp; AI · People</p>
    <h1>A site-to-site VPN, tested offline before it went live</h1>
    <div class="story-body">
      <p>At Imvescor, I needed to connect our network to another site in Montreal, so I built a site-to-site VPN between them: an IPsec tunnel on a Cisco router, configured from the console.</p>
      <p>I didn't want to find out whether it worked in production. So I scripted the whole configuration offline and tested it first in an emulator, GNS3, standing up both ends and proving the tunnel came up and traffic passed before any of it touched real equipment.</p>
      <p>When I was confident, I deployed it after hours, working with a colleague on the Montreal end so we could bring it up together, test every connection from both sides, and keep any downtime to a minimum. The tunnel came up on the first try. The two small fixes were on either side of it: at first, traffic wasn't reaching Montreal's internal network because I hadn't set the route quite right, and once I corrected that it started to flow. A few services still weren't reachable after that, and I traced it to a firewall rule on the Moncton side and opened the path.</p>
      <p>What I like about this one is that it was config-as-code before "infrastructure as code" was a common phrase. I built and proved the whole thing in an emulator, rolled it out in a planned window, and verified it with the far end. It's how I still work: plan the change, prove it offline, deploy in a controlled window, and confirm it from both sides.</p>
    </div>
  </div>
