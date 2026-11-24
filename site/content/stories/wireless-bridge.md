---
title: "Getting signal into a metal building"
summary: "Got network signal into a metal concrete-plant building where running cable wasn't an option, with a wireless bridge."
hook: "A terminal inside a metal concrete plant needed network, and neither outside signal nor a cable run could reach it."
layers: ["L1", "L2", "L8"]
accordion: "L2"
topics: []
status: "live"
visibility: "public"
service: "infrastructure management"
glance:
  - {k: "where", v: "A Construction Company's Concrete Mixing Plant"}
  - {k: "problem", v: "A Metal Building, With No Signal and No Cable Path"}
  - {k: "built", v: "Point-to-Point Wireless Bridge · Ubiquiti · Site Survey"}
  - {k: "result", v: "Coverage Confirmed With Real Data, and No Extra Hardware"}
related:
  - {kind: "Related story", title: "Four hours down, one bad cable", text: "Racks built and rebuilt to a method, cables cut to length, tagged, and documented, so any fault traces end to end.", url: "/stories/rack-rebuilds/"}
  - {kind: "Related story", title: "Proving WEP wasn't protecting us", text: "Rather than just flag it, I proved our WEP wireless was crackable to make the case for replacing it.", url: "/stories/wep/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>A metal building, and no way to run cable</h2>
<p class="lead">A construction company needed network access at a terminal inside their concrete mixing plant, but the plant was a metal building.</p>
<p>Signal didn't get in from outside, and running a network cable out to it wasn't really an option.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Bridge it, survey it, then keep watching</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Build the bridge</h3>
</div>
<p>So I built a point-to-point wireless bridge: a link from the main site over to the outside of the plant, then wired from there to an access point inside that broadcast coverage through the building. The gear was Ubiquiti.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Survey before adding hardware</h3>
</div>
<p>After it went in, one office in the plant had trouble staying connected. Rather than just add another access point, I did a proper site survey. I used a laptop running signal-strength software alongside the equipment's management portal, so I could compare two views: what a client device actually saw, and what the access point reported.</p>
<p>Using the building's fire-exit maps as a floor plan, I walked the plant noting dead spots and how placement changed things, and found the access point simply belonged in a different office for better coverage. I moved it there.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Keep watching</h3>
</div>
<p>Then I kept watching. I monitored the signal through the management portal after the change, to confirm the coverage held and that no extra hardware was needed.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>Solved with the right design, then verified</h2>
<p class="lead">A physical constraint, a metal building with no good cable path, was solved with the right link design, then verified with real data instead of throwing another device at it.</p>
<p>Once it was running, I documented the configuration and marked the access point's location on those same maps, so anyone coming after me could manage it easily.</p>
</section>
