---
title: "Passwordless logins for a kindergarten class"
summary: "A teacher logging a class of twenty-one five-year-olds in by hand, every session. I worked it end to end and wrote it up: policy first, then identity, devices, and the people, a proposal they could act on."
layers: ["X1", "L8", "L1"]
accordion: "X1"
topics: []
status: "live"
featured: true
featorder: 1
visibility: "public"
pdf: ""
links: []
hook: "A teacher logging a class of twenty-one five-year-olds in by hand, every session."
service: "solution design"
glance:
  - {k: "where", v: "A Kindergarten Class of 21"}
  - {k: "problem", v: "The Teacher Types a Complex Password Twenty-One Times, Every Session"}
  - {k: "proposal", v: "A USB Security Key and a Short PIN for Each Child"}
  - {k: "built on", v: "Entra · Intune · Defender, If the Students Qualify for A3"}
  - {k: "document", v: "Two Pages · Summary First · Reviewed with the Teacher"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Twenty-one passwords before the lesson starts</h2>
<p class="lead">A friend of mine teaches a kindergarten class of 21.</p>
<p>Every session she logs each child in herself, typing a complex password twenty-one times, because the kids don't know their letters yet and can't type a password on their own.</p>
<p>The teaching time disappears before the lesson even starts. I wrote her a short technical proposal to take that load off.</p>
</section>
<section>
<p class="sec-label">// 02 the proposal</p>
<h2>A key and a PIN for each child</h2>
<p class="lead">The proposal: give each child a USB security key and a short PIN.</p>
<ol class="flow" aria-label="How a child signs in, in order">
<li>Plug in</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Type the PIN</li>
<li class="arrow" aria-hidden="true">→</li>
<li>Done</li>
</ol>
<p>IT sets everything up in advance, so the teacher never types a password or a setup code, and the classroom devices are locked to approved apps and sites.</p>
<div class="cards2">
<div>
<p class="k">Why that option</p>
<p>The passwords become long and random, and nobody needs to know them, since a key alone isn't enough without its PIN.</p>
</div>
<div>
<p class="k">What it runs on</p>
<p>It uses tools the school may already own (Entra, Intune and Defender, if the students qualify for A3).</p>
</div>
<div>
<p class="k">The easy alternative</p>
<p>The obvious alternative, one shared class password, is simpler but lets any child sign in as any other, with no record of who did what.</p>
</div>
</div>
</section>
<section>
<p class="sec-label">// 03 what it works through</p>
<h2>End to end, policy first</h2>
<div class="cards2 c3">
<div>
<p class="k">1 · Policy first</p>
<p>Confirm the student licensing before designing anything.</p>
</div>
<div>
<p class="k">2 · Identity</p>
<p>Entra FIDO2 passkeys, scripted key registration, a Temporary Access Pass fallback, a Conditional Access device filter.</p>
</div>
<div>
<p class="k">3 · Device lockdown</p>
<p>Kiosk mode, an Edge allow-list with SafeSearch, Defender web filtering.</p>
</div>
<div>
<p class="k">4 · The mixed fleet</p>
<p>A shared iPad via Apple School Manager and Intune.</p>
</div>
<div>
<p class="k">5 · Physical security</p>
<p>BitLocker, a firmware password, no USB boot, a locked cart.</p>
</div>
<div>
<p class="k">6 · The people side</p>
<p>Built around the teacher's actual day, with clear teacher-vs-IT roles and a lost-key procedure.</p>
</div>
</div>
</section>
<section>
<p class="sec-label">// 04 the document</p>
<h2>Two pages, summary first</h2>
<p class="lead">It's two pages, summary first, with cited Microsoft references and a costed options table.</p>
<p>It was reviewed with the teacher and is a live piece of work, the same client as the Word mail-merge automation I built for her class, so together they show ongoing support rather than a one-off.</p>
</section>
