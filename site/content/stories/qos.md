---
title: "Keeping the streaming, fixing the network"
summary: "Hunted a mystery slowdown to streaming eating the bandwidth, then fixed it with QoS instead of more pipe."
hook: "A business couldn't reach its own resources and nothing obvious was wrong, so I watched the traffic until the cause showed itself."
layers: ["L4", "L8"]
accordion: "L4"
topics: []
status: "live"
visibility: "public"
service: "technical discovery"
glance:
  - {k: "problem", v: "A Business Having Trouble Reaching Its Network Resources"}
  - {k: "cause", v: "Streaming Services Eating the Bandwidth"}
  - {k: "fix", v: "QoS, With Streaming Prioritized Lower"}
  - {k: "result", v: "Business Traffic First, and the Staff Kept Their Streaming"}
related:
  - {kind: "Related story", title: "Dropped calls, found in the firewall logs", text: "The network side of a municipal VoIP rollout: a dedicated voice VLAN, WatchGuard rules, and a fault found in the logs.", url: "/stories/voip/"}
  - {kind: "Related story", title: "Getting signal into a metal building", text: "Got network signal into a metal concrete-plant building where running cable wasn't an option, with a wireless bridge.", url: "/stories/wireless-bridge/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Nothing obvious, so I watched the traffic</h2>
<p class="lead">A business was having trouble getting to its network resources. Nothing obvious pointed to the cause, so I watched the traffic for a few hours to see what was actually happening.</p>
<p>The bottleneck was streaming services eating the bandwidth.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Put streaming in its place, without taking it away</h2>
<p class="lead">The easy fix would have been to block streaming, but the staff were clear they wanted to keep it (it made for a better working day), and the manager agreed.</p>
<p>So rather than take it away, I used QoS to put it in its place: I prioritized streaming lower, so the file transfers and network resources people needed for their work went first, and left streaming to use what was left.</p>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>Two problems at once, both solved</h2>
<p class="lead">Business traffic got the priority it needed, and the staff kept the streaming they wanted.</p>
<p>It's the kind of problem that's really two problems at once, a Layer 4 one and a people one.</p>
<ol class="flow" aria-label="How it was worked, in order">
<li>Diagnosed with real traffic data</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Respected what the people wanted</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Got the manager's call</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Enforced it with QoS</li>
</ol>
</section>
