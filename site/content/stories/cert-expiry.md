---
title: "When an expired certificate took the VPN down"
summary: "A site-to-site VPN dropped with nothing misconfigured; the certificate behind it had quietly expired."
hook: "The VPN just dropped one day, and nothing was misconfigured. Time had simply run out on a certificate."
layers: ["L5-6", "L3", "L8"]
accordion: "L5-6"
topics: []
status: "live"
visibility: "public"
service: "level 3 escalations"
glance:
  - {k: "problem", v: "A Site-to-Site VPN Dropped, With Nothing Misconfigured"}
  - {k: "cause", v: "The Certificate Behind It Had Expired"}
  - {k: "fix", v: "A New Certificate, Created and Installed"}
  - {k: "now", v: "ADCS Auto-Enrollment · Azure Key Vault · Alerts Before Expiry"}
related:
  - {kind: "Related story", title: "A site-to-site VPN, tested offline before it went live", text: "Connected two sites with an IPsec tunnel on a Cisco router, built and tested offline before it went live.", url: "/stories/vpn-montreal/"}
  - {kind: "Related story", title: "Dropped calls, found in the firewall logs", text: "The network side of a municipal VoIP rollout: a dedicated voice VLAN, WatchGuard rules, and a fault found in the logs.", url: "/stories/voip/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Nothing was broken. Time had run out.</h2>
<p class="lead">I was running the site-to-site VPN I'd built, and one day it just dropped.</p>
<p>When I went looking, the cause was simple and easy to miss: the certificate behind it had expired. Nothing had been misconfigured; time had just run out on it.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>A simple fix, and a lesson that stuck</h2>
<p class="lead">The fix itself was straightforward: create a new certificate, install it, and the service came back.</p>
<p>But the lesson stuck: certificates expire, and when they do they can take a service down quietly, with no warning and no obvious error pointing at the real cause.</p>
</section>
<section>
<p class="sec-label">// 03 what changed after</p>
<h2>Certificates that renew themselves</h2>
<p>That outage is why I handle certificates differently now. In the roles since, I've moved to automated certificate management.</p>
<div class="cards2">
<div>
<p class="k">Internal</p>
<p>Internal certificates issued and renewed automatically through ADCS auto-enrollment via Group Policy.</p>
</div>
<div>
<p class="k">Cloud</p>
<p>Others managed in Azure Key Vault.</p>
</div>
<div>
<p class="k">Backstop</p>
<p>An alert well before expiry, so a certificate can't quietly take a service down the way this one did.</p>
</div>
</div>
</section>
