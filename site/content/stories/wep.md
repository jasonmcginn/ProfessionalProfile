---
title: "Proving WEP wasn't protecting us"
summary: "Rather than just flag it, I proved our WEP wireless was crackable to make the case for replacing it."
hook: "Our wireless still ran on WEP. Instead of just raising a flag, I set out to prove how easily it could be broken."
layers: ["L2", "L4", "X1"]
accordion: "L2"
topics: []
status: "live"
visibility: "public"
service: "technical discovery"
glance:
  - {k: "problem", v: "A Company Wireless Network Still Running on WEP"}
  - {k: "approach", v: "Authorized, Capture-Only Assessment · Separate Lab Demonstration"}
  - {k: "tools", v: "A Linux Laptop and Standard Wireless Tools"}
  - {k: "result", v: "The Network Was Moved to WPA2"}
related:
  - {kind: "Related story", title: "Getting signal into a metal building", text: "Got network signal into a metal concrete-plant building where running cable wasn't an option, with a wireless bridge.", url: "/stories/wireless-bridge/"}
  - {kind: "Related story", title: "Running Sage without handing out admin", text: "An app that demanded local admin, students who couldn't have it. I monitored exactly what it needed and granted only that by Group Policy.", url: "/stories/sage/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Wireless still running on WEP</h2>
<p class="lead">A company I worked for still ran its wireless network on WEP.</p>
<p>I'd been learning about wireless security on my own and knew WEP's encryption had been broken years earlier, so rather than just raise a flag, I set out to prove the risk on our own network and make the case for an upgrade.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Permission first, then proof without harm</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Get permission</h3>
</div>
<p>I got permission before I touched anything. This was an authorized, internal assessment, and I wanted it done right.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>Capture only, on the live network</h3>
</div>
<p>On the live network I kept strictly to capturing and analysing traffic, no injection, nothing disruptive, using a Linux laptop and standard wireless tools.</p>
<p>That was enough to show the problem plainly: WEP's weaknesses let the key be recovered from captured traffic, which meant the "encryption" protecting the network wasn't really protecting anything.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>Make it land for non-technical people</h3>
</div>
<p>To make the risk land for non-technical people, I built a separate, harmless demonstration entirely in my own lab, never on the live network. Over an unencrypted connection I showed how traffic in the clear could be tampered with in transit, flipping the images on a web page as they were delivered.</p>
<p>Seeing a page visibly altered in front of them made the abstract idea of "weak encryption" concrete in a way a written warning never could.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>The network was moved to WPA2</h2>
<p class="lead">I turned self-taught knowledge into a real, safe risk assessment, and made the case by showing rather than telling.</p>
<ol class="flow" aria-label="The approach, in order">
<li>Find the weakness</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Prove it without causing harm</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Recommend the fix</li>
</ol>
</section>
