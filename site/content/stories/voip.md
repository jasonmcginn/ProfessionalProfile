---
title: "Dropped calls, found in the firewall logs"
summary: "The network side of a municipal VoIP rollout: a dedicated voice VLAN, WatchGuard rules, and a fault found in the logs."
hook: "A municipal VoIP rollout where the calls kept dropping. The answer wasn't the phones; it was in the firewall logs."
layers: ["L2", "L3", "L4", "L7"]
accordion: "L3"
topics: []
status: "live"
visibility: "public"
service: "level 3 escalations"
glance:
  - {k: "where", v: "A Municipal Government's New VoIP Phone System"}
  - {k: "problem", v: "Calls Dropping During Go-Live Testing"}
  - {k: "cause", v: "Port 5061, SIP Over TLS, Denied at the Firewall"}
  - {k: "fix", v: "Opened 5061 on the WatchGuard, and the Calls Held"}
related:
  - {kind: "Related story", title: "Keeping the streaming, fixing the network", text: "Hunted a mystery slowdown to streaming eating the bandwidth, then fixed it with QoS instead of more pipe.", url: "/stories/qos/"}
  - {kind: "Related story", title: "When an expired certificate took the VPN down", text: "A site-to-site VPN dropped with nothing misconfigured; the certificate behind it had quietly expired.", url: "/stories/cert-expiry/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>A new phone system, and its network side</h2>
<p class="lead">A municipal government was moving to a new VoIP phone system, and I handled the network side of the rollout.</p>
<p>I modified the existing VLAN setup to carry the new phones on their own voice VLAN, and configured the WatchGuard firewall to pass the traffic the phones needed.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Rule out the easy answer, then read the logs</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Check the obvious suspect</h3>
</div>
<p>During go-live testing, calls were dropping. My first suspect was bandwidth, so that is where I started. I checked whether the network had the capacity to carry the calls cleanly, and it did. With the easy answer ruled out, I dug deeper.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Read the firewall logs</h3>
</div>
<p>The answer was in the firewall logs. The phones used SIP for call signaling, and while port 5060 (plain SIP) was open, 5061 (SIP over TLS, the encrypted signaling) was being denied. That was the dropped calls.</p>
<p>I opened 5061 on the WatchGuard, and the calls held.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 what I take from it</p>
<h2>I don't stop at the obvious cause</h2>
<p class="lead">Bandwidth was my first suspect, and it checked out, but the real fault was a single blocked port, and the logs pointed right to it.</p>
</section>
