---
title: "Getting signal into a metal building"
summary: "Got network signal into a metal concrete-plant building where running cable wasn't an option, with a wireless bridge."
hook: "A terminal inside a metal concrete plant needed network, and neither outside signal nor a cable run could reach it."
layers: ["L1", "L2", "L8"]
accordion: "L2"
topics: []
status: "live"
visibility: "public"
---
<h2>The situation</h2>
<p>A construction company needed network access at a terminal inside their concrete mixing plant, but the plant was a metal building. Signal didn't get in from outside, and running a network cable out to it wasn't really an option.</p>
<h2>What I did</h2>
<p>So I built a point-to-point wireless bridge: a link from the main site over to the outside of the plant, then wired from there to an access point inside that broadcast coverage through the building. The gear was Ubiquiti.</p>
<p>After it went in, one office in the plant had trouble staying connected. Rather than just add another access point, I did a proper site survey. I used a laptop running signal-strength software alongside the equipment's management portal, so I could compare two views: what a client device actually saw, and what the access point reported. Using the building's fire-exit maps as a floor plan, I walked the plant noting dead spots and how placement changed things, and found the access point simply belonged in a different office for better coverage. I moved it there.</p>
<p>Then I kept watching. I monitored the signal through the management portal after the change, to confirm the coverage held and that no extra hardware was needed.</p>
<h2>The result</h2>
<p>A physical constraint, a metal building with no good cable path, was solved with the right link design, then verified with real data instead of throwing another device at it.</p>
<p>Once it was running, I documented the configuration and marked the access point's location on those same maps, so anyone coming after me could manage it easily.</p>
