---
title: "How this site is developed"
---

<div class="wrap story">
<a class="backlink mono" href="/">← back</a>
<p class="story-where mono">// how this site is developed</p>
<h1>How this site is developed</h1>
<p class="hook">A companion to how this site is built. Where that page covers what the site is made of, this one covers how I actually work on it: the day-to-day loop of making a change, checking it, and shipping it safely to production.</p>
<p class="mono series-nav">Part of <a href="/docs/project/">This site, as a project</a></p>
<div class="doc-toc">
<p class="toc-h">On this page</p>
<ol>
<li><a href="#loop">The local loop</a></li>
<li><a href="#versioning">Version control and checkpoints</a></li>
<li><a href="#shipping">Shipping: preview and production</a></li>
<li><a href="#guardrails">Guardrails for a public repo</a></li>
<li><a href="#rollback">When something needs undoing</a></li>
</ol>
</div>
<div class="story-body">

<h2 id="loop">The local loop</h2>
<p>Every change starts the same way: a local copy of the site running on my own machine, so I can see the result before anyone else does. Hugo serves the site locally and rebuilds it the moment a file changes, which makes the edit-and-check cycle almost instant.</p>
<p>The working rhythm is small and repeatable. I make one change, let it rebuild, and look at it in the browser. I draft and refine with an AI assistant, but I review every change locally myself, and I am the one who commits and ships. If something ever looks wrong, my first assumption is the environment, not the code: a stale local server or a cached page in the browser explains most surprises, so I restart the server and force a clean reload before I go looking for a real bug. It is a small discipline that saves a lot of time chasing problems that were never there.</p>

<h2 id="versioning">Version control and checkpoints</h2>
<p>The whole site lives in Git, in a public repository. I commit in small, logical pieces, each with a message that says what changed and why. The habit I care about most is committing a checkpoint before any larger or experimental change, because a commit is a point I can always return to. Work that is only saved on disk has no safety net; work that is committed does.</p>
<p>That history is also part of the proof. Because the repository is public, the way the site is built and changed over time is on display, not just the finished result.</p>

<h2 id="shipping">Shipping: preview and production</h2>
<p>Deployment is automated. A push to the main branch triggers a build and a deploy with no manual steps, and the site is live a minute or two later. Pull requests get their own preview deployment on a separate URL, so a change can be reviewed on a real, live page before it ever reaches production. Larger changes go through that preview step; small, confident fixes can go straight to main.</p>
<p>The one rule I hold to here is to pick a single lane and stay in it: either review through a pull request or push directly, but not both at once on the same change, so the main branch has one clear source of truth.</p>

<h2 id="guardrails">Guardrails for a public repo</h2>
<p>A public repository means discipline about what goes into it. Nothing private ever lands in the repo, from the first commit on: no credentials, keys, secrets, or sensitive configuration. Deployment tokens and infrastructure settings live in the hosting platform and the CI system, never in the code. Generated output and local editor files are ignored by the repository entirely, so only real source is tracked.</p>
<p>Before each commit I take a short pass: confirm the production build is clean, read through every changed file so nothing unexpected slips in, and check that nothing private is about to become public.</p>

<h2 id="rollback">When something needs undoing</h2>
<p>Mistakes are a normal part of shipping, so the process assumes them. A bad change can be reverted into a clean new commit that undoes it while preserving the full history, or the branch can be reset to a known-good point. For anything risky, I keep a separate snapshot of the working state first. The goal is simple: there is always a way back, and getting back is never dramatic.</p>

</div>
</div>
