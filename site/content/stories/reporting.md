---
title: "In-house reporting instead of $300-an-hour consulting"
summary: "Made the case to build the Controller's reporting in-house with PHP and SQL instead of paying $300 an hour."
hook: "The Controller needed deeper reporting, and outside help ran about $300 an hour. I made the case to build it in-house instead."
layers: ["L8", "L7"]
accordion: "L7"
topics: []
status: "live"
visibility: "public"
service: "tools and automation"
glance:
  - {k: "where", v: "Maritime Door &amp; Window · Network Administrator · 2010 to 2012"}
  - {k: "problem", v: "Deeper Reporting, at About $300 an Hour for Outside Help"}
  - {k: "built", v: "Web Server · PHP · SQL · Temporary Database · Crystal Reports"}
  - {k: "result", v: "Reporting Built In-House, on a Safe Copy of the Data"}
related:
  - {kind: "Same employer", title: "Four hours down, one bad cable", text: "Racks built and rebuilt to a method, cables cut to length, tagged, and documented, so any fault traces end to end.", url: "/stories/rack-rebuilds/"}
  - {kind: "Related story", title: "Automating student account provisioning", text: "Scripting student account creation so running the network didn't eat the time I needed for teaching.", url: "/stories/provisioning/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Deeper reporting, at $300 an hour</h2>
<p class="lead">At Maritime Door &amp; Window, the Controller needed deeper reporting than what we had.</p>
<p>Bringing in outside help to build those reports ran about $300 an hour, so I made the case to build it in-house instead.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Build it on a copy, and keep one careful pattern</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>A safe copy to work from</h3>
</div>
<p>I set up a web server and a separate SQL table so she had a safe, non-production copy of the data to work from.</p>
<p>A query pulled a dataset wide enough to cover the many angles she wanted to report on into a temporary database, and from there I designed the reports in Crystal Reports.</p>
<p>I used PHP to select the report or data needed, SQL to get the data, and Crystal Reports to provide the information in reports.</p>
<ol class="flow" aria-label="How a report was produced, in order">
<li>PHP selects the report</li>
<li class="arrow" aria-hidden="true">→</li>
<li>SQL gets the data</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Crystal Reports presents it</li>
</ol>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>One habit everywhere</h3>
</div>
<p>I didn't strictly need the temp database for the reporting alone, nothing in that path changed any data. But other functions, the ones inventory managers used, did write data, and rather than keep two different habits, I ran everything through the temp database.</p>
<p>Keeping one careful pattern everywhere meant data integrity was never something I had to think twice about.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 the result</p>
<h2>The reporting got built, and the consulting bill didn't</h2>
<p class="lead">The win was in the business's own terms: the reporting got built, and the consulting bill didn't.</p>
<p>And it got built the careful way, on a copy of the data, with integrity protected by default rather than only where it was strictly required.</p>
</section>
