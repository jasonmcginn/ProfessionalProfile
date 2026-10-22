---
title: "Dropped calls, found in the firewall logs"
summary: "The network side of a municipal VoIP rollout: a dedicated voice VLAN, WatchGuard rules, and a fault found in the logs."
hook: "A municipal VoIP rollout where the calls kept dropping. The answer wasn't the phones; it was in the firewall logs."
layers: ["L2", "L3", "L4", "L7"]
accordion: "L3"
topics: []
status: "live"
visibility: "public"
---
<h2>The situation</h2>
<p>A municipal government was moving to a new VoIP phone system, and I handled the network side of the rollout. I modified the existing VLAN setup to carry the new phones on their own voice VLAN, and configured the WatchGuard firewall to pass the traffic the phones needed.</p>
<h2>What I did</h2>
<p>During go-live testing, calls were dropping. My first suspect was bandwidth, so that is where I started. I checked whether the network had the capacity to carry the calls cleanly, and it did. With the easy answer ruled out, I dug deeper.</p>
<p>The answer was in the firewall logs. The phones used SIP for call signaling, and while port 5060 (plain SIP) was open, 5061 (SIP over TLS, the encrypted signaling) was being denied. That was the dropped calls. I opened 5061 on the WatchGuard, and the calls held.</p>
<h2>What I take from it</h2>
<p>What I take from it: I don't stop at the obvious cause. Bandwidth was my first suspect, and it checked out, but the real fault was a single blocked port, and the logs pointed right to it.</p>
