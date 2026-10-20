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
aliases: ["/docs/kindergarten/"]
pdf: ""
links: []
---
<p>A friend of mine teaches a kindergarten class of 21. Every session she logs each child in herself, typing a complex password twenty-one times, because the kids don't know their letters yet and can't type a password on their own. The teaching time disappears before the lesson even starts. I wrote her a short technical proposal to take that load off.</p>
      <p>The proposal: give each child a USB security key and a short PIN. Plug in, type the PIN, done. IT sets everything up in advance, so the teacher never types a password or a setup code, and the classroom devices are locked to approved apps and sites.</p>
      <p>Why that option over the easy one: the passwords become long and random, and nobody needs to know them, since a key alone isn't enough without its PIN. It uses tools the school may already own (Entra, Intune and Defender, if the students qualify for A3). The obvious alternative, one shared class password, is simpler but lets any child sign in as any other, with no record of who did what.</p>
      <p>What the proposal works through, end to end: policy first (confirm the student licensing before designing anything); identity (Entra FIDO2 passkeys, scripted key registration, a Temporary Access Pass fallback, a Conditional Access device filter); device lockdown (kiosk mode, an Edge allow-list with SafeSearch, Defender web filtering); the mixed fleet (a shared iPad via Apple School Manager and Intune); physical security (BitLocker, a firmware password, no USB boot, a locked cart); and the people side (built around the teacher's actual day, with clear teacher-vs-IT roles and a lost-key procedure).</p>
      <p>It's two pages, summary first, with cited Microsoft references and a costed options table. It was reviewed with the teacher and is a live piece of work, the same client as the Word mail-merge automation I built for her class, so together they show ongoing support rather than a one-off.</p>
