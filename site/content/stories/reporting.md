---
title: "In-house reporting instead of $300-an-hour consulting"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// People · Application</p>
    <h1>In-house reporting instead of $300-an-hour consulting</h1>
    <div class="story-body">
      <p>At Maritime Door &amp; Window, the Controller needed deeper reporting than what we had. Bringing in outside help to build those reports ran about $300 an hour, so I made the case to build it in-house instead.</p>
      <p>I set up a web server and a separate SQL table so he had a safe, non-production copy of the data to work from. A query pulled a dataset wide enough to cover the many angles she wanted to report on into a temporary database, and from there I designed the reports in Crystal Reports.</p>
      <p>I didn't strictly need the temp database for the reporting alone, nothing in that path changed any data. But other functions, the ones inventory managers used, did write data, and rather than keep two different habits, I ran everything through the temp database. Keeping one careful pattern everywhere meant data integrity was never something I had to think twice about.</p>
      <p>The win was in the business's own terms: the reporting got built, and the consulting bill didn't. And it got built the careful way, on a copy of the data, with integrity protected by default rather than only where it was strictly required.</p>
    </div>
  </div>
