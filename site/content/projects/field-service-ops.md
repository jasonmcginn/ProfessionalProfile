---
title: "Field Service Ops"
summary: "One app for a field technician's day: tickets, truck stock, cycle counts, shipping and the service manuals, offline."
hook: "Ticket management with product tracking for the field, in one app that works offline."
layers: ["X3", "L7"]
topics: []
status: "live"
quiet: true
visibility: "public"
builds_on: []
related: []
weight: 15
pdf: ""
links: []
---

<!-- Generic by Jason's choice (2026-11-25): no employer, parts program or carrier named. Stack and features confirmed from the app's own source (the FSOP project folder, Nov 2026). -->

## What this is

One app for a field technician's day, on the laptop and the phone: tickets, truck stock, cycle counts, shipping and the service manuals in one place, and it works with no signal. I built it for my own field work, to take the overhead of forms and templates out of the day.

## What it removes

The information a job needs used to be spread across several places, and some of it needed a connection I often don't have, out in no-signal areas. Inventory movements got forgotten, stock drifted, and excess built up, and all of that costs the team. A new part return or a stock adjustment meant filling out a form and typing the product codes in one by one. Now the app fills the form, builds the email ready to send, and keeps the whole thing tracked.

## What it does

<div class="cards2 c3">
<div>
<p class="k">Everything in one place, offline</p>
<p>Tickets, stock, counts, shipping and the manuals in a single app that works with no signal, so the day's information is there whether or not the area has a connection.</p>
</div>
<div>
<p class="k">Tickets from email</p>
<p>It reads a dedicated notifications folder. Rules match each notification by sender, subject or attachment and open or update the matching ticket, so the ticket exists before I touch it. Ticket lists import too.</p>
</div>
<div>
<p class="k">Barcode scanning</p>
<p>Parts go in and out by camera, and a full-truck count is a scan, not a typed list. The phone reads barcodes in about half a second.</p>
</div>
<div>
<p class="k">Guided cycle counts</p>
<p>It walks me through the count step by step, balances what's on the truck against the parts report, and flags anything that changes mid-count, so movements stop getting forgotten and the stock stays honest.</p>
</div>
<div>
<p class="k">Stock that follows demand</p>
<p>It keeps the history of how inventory gets used and reads the trend, then recommends what to keep on the truck and what to drop, so stock matches the work instead of piling up.</p>
</div>
<div>
<p class="k">Returns, shipping and ordering</p>
<p>Returns, stock adjustments, boxing parts up, shipping labels and ordering new supplies all run inside the app, with shipments tracked by the carrier instead of chased by hand.</p>
</div>
<div>
<p class="k">Plan the day</p>
<p>It plans the day's calls into a route, grouped by area and timed, and puts it on a map, so the driving is sorted before I leave.</p>
</div>
<div>
<p class="k">Service manuals, indexed</p>
<p>A built-in index over the service manuals makes the critical tables, memory locations and control codes, a search away, offline, without opening the heavy PDF or the manual program.</p>
</div>
<div>
<p class="k">A parts kit kept current</p>
<p>The same index reads the manuals for part details and updates the kit items, so the parts list tracks the equipment instead of going stale.</p>
</div>
</div>

## How it's built

<div class="cards2">
<div>
<p class="k">Zero-dependency server</p>
<p>The server is plain Node.js with no dependencies, serving one single-page app over HTTPS with its own certificate.</p>
</div>
<div>
<p class="k">Offline-first</p>
<p>Each device keeps its own copy of the data and merges its changes back when it can reach the server, so it works the same with no signal.</p>
</div>
<div>
<p class="k">Light footprint, runs anywhere</p>
<p>It runs in Docker, or as portable Node with no install and no admin rights, so it keeps a light footprint and runs even on a locked-down machine.</p>
</div>
<div>
<p class="k">Phone app, built in CI</p>
<p>The Android app is built from the same codebase and signed automatically in CI on every change.</p>
</div>
<div>
<p class="k">Encrypted, and documented</p>
<p>The data can be encrypted at rest behind a passphrase, and the build carries its own decisions log and walk-through guide.</p>
</div>
</div>

## See it

This one isn't published. Ask for a walk-through and I'll show it running.

<div class="actions"><a class="btn primary" href="mailto:JasonRMcGinn@proton.me?subject=Field%20Service%20Ops%20walk-through">ask for a walk-through</a></div>
