---
title: "A site-to-site VPN, tested offline before it went live"
summary: "Connected two sites with an IPsec tunnel on a Cisco router, built and tested offline before it went live."
hook: "Two offices, one tunnel. I built the site-to-site VPN and proved it worked offline before it ever went live."
layers: ["L3", "L5-6", "X3", "L8"]
accordion: "L5-6"
topics: []
status: "live"
visibility: "public"
---
<p>At Imvescor, I needed to connect our network to another site in Montreal, so I built a site-to-site VPN between them: an IPsec tunnel on a Cisco router, configured from the console.</p>
      <p>I didn't want to find out whether it worked in production. So I scripted the whole configuration offline and tested it first in an emulator, GNS3, standing up both ends and proving the tunnel came up and traffic passed before any of it touched real equipment.</p>
      <p>When I was confident, I deployed it after hours, working with a colleague on the Montreal end so we could bring it up together, test every connection from both sides, and keep any downtime to a minimum. The tunnel came up on the first try. The two small fixes were on either side of it: at first, traffic wasn't reaching Montreal's internal network because I hadn't set the route quite right, and once I corrected that it started to flow. A few services still weren't reachable after that, and I traced it to a firewall rule on the Moncton side and opened the path.</p>
      <p>What I like about this one is that it was config-as-code before "infrastructure as code" was a common phrase. I built and proved the whole thing in an emulator, rolled it out in a planned window, and verified it with the far end. It's how I still work: plan the change, prove it offline, deploy in a controlled window, and confirm it from both sides.</p>
