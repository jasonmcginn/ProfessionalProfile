---
title: "In-house reporting instead of $300-an-hour consulting"
summary: "Made the case to build the Controller's reporting in-house with PHP and SQL instead of paying $300 an hour."
hook: "The Controller needed deeper reporting, and outside help ran about $300 an hour. I made the case to build it in-house instead."
layers: ["L8", "L7"]
accordion: "L7"
topics: []
status: "live"
visibility: "public"
---
<h2>The situation</h2>
<p>At Maritime Door &amp; Window, the Controller needed deeper reporting than what we had. Bringing in outside help to build those reports ran about $300 an hour, so I made the case to build it in-house instead.</p>
<h2>What I did</h2>
<p>I set up a web server and a separate SQL table so she had a safe, non-production copy of the data to work from. A query pulled a dataset wide enough to cover the many angles she wanted to report on into a temporary database, and from there I designed the reports in Crystal Reports.</p>
<p>I didn't strictly need the temp database for the reporting alone, nothing in that path changed any data. But other functions, the ones inventory managers used, did write data, and rather than keep two different habits, I ran everything through the temp database. Keeping one careful pattern everywhere meant data integrity was never something I had to think twice about.</p>
<h2>The result</h2>
<p>The win was in the business's own terms: the reporting got built, and the consulting bill didn't. And it got built the careful way, on a copy of the data, with integrity protected by default rather than only where it was strictly required.</p>
