---
title: "Keeping the streaming, fixing the network"
summary: "Hunted a mystery slowdown to streaming eating the bandwidth, then fixed it with QoS instead of more pipe."
hook: "A business couldn't reach its own resources and nothing obvious was wrong, so I watched the traffic until the cause showed itself."
layers: ["L4", "L8"]
accordion: "L4"
topics: []
status: "live"
visibility: "public"
---
<p>A business was having trouble getting to its network resources. Nothing obvious pointed to the cause, so I watched the traffic for a few hours to see what was actually happening. The bottleneck was streaming services eating the bandwidth.</p>
      <p>The easy fix would have been to block streaming, but the staff were clear they wanted to keep it, it made for a better working day, and the manager agreed. So rather than take it away, I used QoS to put it in its place: I prioritized streaming lower, so the file transfers and network resources people needed for their work went first, and left streaming to use what was left.</p>
      <p>Business traffic got the priority it needed, and the staff kept the streaming they wanted. It's the kind of problem that's really two problems at once, a Layer 4 one and a people one. I diagnosed the technical side with real traffic data, respected what the people actually wanted, got the manager's call on it, and enforced that decision with QoS.</p>
