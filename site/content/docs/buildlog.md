---
title: "How this site is built"
summary: "What the site is made of and how I work on it: the toolchain and architecture, the domain setup, the local loop, version control, previews, guardrails for a public repo, and rollback."
project: "this-site"
weight: 10
aliases: ["/docs/devprocess/"]
---

<div class="wrap story">
<a class="backlink mono" href="/">← back</a>
<p class="story-where mono">// how this site is built</p>
<h1>How this site is built</h1>
<p class="hook">This page is a profile, and also a working piece of infrastructure. Here is what it is made of, the toolchain and how the domain is set up, and then how I actually work on it: making a change, checking it, and shipping it safely to production.</p>
<p class="mono series-nav">Part of <a href="/projects/this-site/">This site, as a project</a></p>
<div class="doc-toc">
<p class="toc-h">On this page</p>
<ol>
<li><a href="#toolchain">The toolchain</a></li>
<li><a href="#workflow">The workflow</a></li>
<li><a href="#content">How the content is organized</a></li>
<li><a href="#domain">The domain, external and internal</a></li>
<li><a href="#loop">The local loop</a></li>
<li><a href="#versioning">Version control and checkpoints</a></li>
<li><a href="#shipping">Shipping: preview and production</a></li>
<li><a href="#guardrails">Guardrails for a public repo</a></li>
<li><a href="#rollback">When something needs undoing</a></li>
<li><a href="#ai">What I directed, what the AI built</a></li>
</ol>
</div>
<div class="story-body">
<h2 id="toolchain">The toolchain</h2>
<p>Five tools, each doing one job well. My notes flow left to right, from where I write them to where anyone can read them.</p>
<svg class="diagram diagram-h" viewBox="0 0 700 120" role="img" aria-label="Toolchain: Obsidian to Claude to Hugo to GitHub to Azure">
<defs><marker id="tl" markerWidth="9" markerHeight="9" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-soft)"/></marker></defs>
<rect x="8" y="40" width="120" height="58" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="68" y="66" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">Obsidian</text>
<text x="68" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink-soft)">notes / source</text>
<rect x="148" y="40" width="120" height="58" rx="9" fill="var(--panel-2)" stroke="var(--accent)"/>
<text x="208" y="66" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">Claude</text>
<text x="208" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink-soft)">draft + build</text>
<rect x="288" y="40" width="120" height="58" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="348" y="66" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">Hugo</text>
<text x="348" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink-soft)">generate</text>
<rect x="428" y="40" width="120" height="58" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="488" y="66" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">GitHub</text>
<text x="488" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink-soft)">version + CI</text>
<rect x="568" y="40" width="120" height="58" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="628" y="66" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">Azure</text>
<text x="628" y="84" text-anchor="middle" font-size="10.5" fill="var(--ink-soft)">host + TLS</text>
<line x1="128" y1="69" x2="148" y2="69" stroke="var(--ink-soft)" marker-end="url(#tl)"/>
<line x1="268" y1="69" x2="288" y2="69" stroke="var(--ink-soft)" marker-end="url(#tl)"/>
<line x1="408" y1="69" x2="428" y2="69" stroke="var(--ink-soft)" marker-end="url(#tl)"/>
<line x1="548" y1="69" x2="568" y2="69" stroke="var(--ink-soft)" marker-end="url(#tl)"/>
</svg>
<table>
<thead><tr><th>Tool</th><th>Role</th><th>Why this one</th></tr></thead>
<tbody>
<tr><td>Obsidian</td><td>My notes vault, the single source of truth</td><td>Plain Markdown I already live in; everything starts here and nothing drifts from it</td></tr>
<tr><td>Claude</td><td>Drafting and building, under my direction</td><td>I set the vision and make the calls; it drafts from my notes, builds, and I review and correct</td></tr>
<tr><td>Hugo</td><td>Static site generator</td><td>Markdown-first, one fast binary, no runtime or database to maintain</td></tr>
<tr><td>Git and GitHub</td><td>Version control and CI</td><td>The public repo is part of the proof; Actions builds and deploys on every push</td></tr>
<tr><td>Azure Static Web Apps</td><td>Hosting</td><td>Free managed TLS, a custom domain, and a deploy triggered straight from the repo</td></tr>
</tbody>
</table>
<h2 id="workflow">The workflow</h2>
<p>Everything moves one direction, from a note to a deployed page. I write in the vault, draft and build with Claude, review and correct, then Hugo generates the static site. I preview it locally, commit from my own machine, and when a set of changes is ready I publish a release, which GitHub Actions deploys to Azure. Because the repository is public, the build itself is on display.</p>
<p>The same repository also packages the site as <a href="/containers/sitebuild/">a container</a>. A multi-stage Dockerfile builds it with Hugo and serves the result from nginx, and every release publishes that image to the GitHub Container Registry, scanned for vulnerabilities first. Anyone can pull it and run this exact site with a single <code>docker run</code>, no build step required.</p>
<svg class="diagram diagram-v" viewBox="0 0 340 390" role="img" aria-label="Workflow from writing a note to deploying a page">
<defs><marker id="wf" markerWidth="9" markerHeight="9" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-soft)"/></marker></defs>
<rect x="20" y="8" width="300" height="40" rx="8" fill="var(--panel-2)" stroke="var(--accent)"/>
<text x="170" y="33" text-anchor="middle" font-size="12.5" fill="var(--ink)">Write in Obsidian</text>
<line x1="170" y1="48" x2="170" y2="68" stroke="var(--ink-soft)" marker-end="url(#wf)"/>
<rect x="20" y="70" width="300" height="40" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="170" y="95" text-anchor="middle" font-size="12.5" fill="var(--ink)">Draft and build with Claude</text>
<line x1="170" y1="110" x2="170" y2="130" stroke="var(--ink-soft)" marker-end="url(#wf)"/>
<rect x="20" y="132" width="300" height="40" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="170" y="157" text-anchor="middle" font-size="12.5" fill="var(--ink)">Review and correct</text>
<line x1="170" y1="172" x2="170" y2="192" stroke="var(--ink-soft)" marker-end="url(#wf)"/>
<rect x="20" y="194" width="300" height="40" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="170" y="219" text-anchor="middle" font-size="12.5" fill="var(--ink)">Build with Hugo, preview locally</text>
<line x1="170" y1="234" x2="170" y2="254" stroke="var(--ink-soft)" marker-end="url(#wf)"/>
<rect x="20" y="256" width="300" height="40" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="170" y="281" text-anchor="middle" font-size="12.5" fill="var(--ink)">Commit from my machine to GitHub</text>
<line x1="170" y1="296" x2="170" y2="316" stroke="var(--ink-soft)" marker-end="url(#wf)"/>
<rect x="20" y="318" width="300" height="40" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="170" y="343" text-anchor="middle" font-size="12.5" fill="var(--ink)">Publish a release: Actions deploys to Azure</text>
</svg>
<h2 id="content">How the content is organized</h2>
<p>The content is organized the way the site reads: by layer. Every story, document, script, and container is tagged with the part of the stack it belongs to, mapped to the OSI model plus the domains that cut across it. Hugo turns those tagged Markdown files into the real pages you can open, so growing the library is just adding a file in the right place.</p>
<h2 id="domain">The domain, external and internal</h2>
<p>NetState Data runs as a small hybrid environment, the same shape I would run for an organization: a public cloud side and a private internal side, joined together.</p>
<svg class="diagram diagram-h" viewBox="0 0 680 196" role="img" aria-label="Domain: external public cloud and internal on-prem lab, joined hybrid">
<rect x="8" y="26" width="300" height="150" rx="12" fill="none" stroke="var(--line)" stroke-dasharray="5 5"/>
<text x="158" y="47" text-anchor="middle" font-size="11" fill="var(--accent)" font-family="monospace">EXTERNAL &middot; public cloud</text>
<rect x="38" y="62" width="240" height="38" rx="8" fill="var(--panel-2)" stroke="var(--accent)"/>
<text x="158" y="86" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">netstatedata.ca</text>
<text x="158" y="128" text-anchor="middle" font-size="11" fill="var(--ink-soft)">Azure Static Web Apps, HTTPS</text>
<text x="158" y="147" text-anchor="middle" font-size="11" fill="var(--ink-soft)">Microsoft 365 email</text>
<rect x="372" y="26" width="300" height="150" rx="12" fill="none" stroke="var(--line)" stroke-dasharray="5 5"/>
<text x="522" y="47" text-anchor="middle" font-size="11" fill="var(--accent)" font-family="monospace">INTERNAL &middot; on-prem lab</text>
<rect x="402" y="62" width="240" height="38" rx="8" fill="var(--panel-2)" stroke="var(--line)"/>
<text x="522" y="86" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink)">NetStateData.Local</text>
<text x="522" y="128" text-anchor="middle" font-size="11" fill="var(--ink-soft)">VMs: domain controller</text>
<text x="522" y="147" text-anchor="middle" font-size="11" fill="var(--ink-soft)">+ internal services</text>
<line x1="310" y1="101" x2="370" y2="101" stroke="var(--ink-soft)"/>
<polygon points="316,97 310,101 316,105" fill="var(--ink-soft)"/>
<polygon points="364,97 370,101 364,105" fill="var(--ink-soft)"/>
<text x="340" y="93" text-anchor="middle" font-size="10.5" fill="var(--accent)" font-family="monospace">hybrid</text>
</svg>
<p><strong>External</strong> is for the web and public viewing. netstatedata.ca lives in the cloud on Azure, served over HTTPS, with email on Microsoft 365. It is what you are reading now.</p>
<p><strong>Internal</strong> is a NetStateData.Local domain running on virtual machines: a domain controller and the internal services behind it. It is hybrid-joined to the cloud, so identity and policy reach across both sides, the way a real hybrid environment works.</p>

<h2 id="loop">The local loop</h2>
<p>Every change starts the same way: a local copy of the site running on my own machine, so I can see the result before anyone else does. Hugo serves the site locally and rebuilds it the moment a file changes, which makes the edit-and-check cycle almost instant.</p>
<p>The working rhythm is small and repeatable. I make one change, let it rebuild, and look at it in the browser. I draft and refine with an AI assistant, but I review every change locally myself, and I am the one who commits and ships. If something ever looks wrong, my first assumption is the environment, not the code: a stale local server or a cached page in the browser explains most surprises, so I restart the server and force a clean reload before I go looking for a real bug. It is a small discipline that saves a lot of time chasing problems that were never there.</p>

<h2 id="versioning">Version control and checkpoints</h2>
<p>The whole site lives in Git, in a public repository. I commit in small, logical pieces, each with a message that says what changed and why. The habit I care about most is committing a checkpoint before any larger or experimental change, because a commit is a point I can always return to. Work that is only saved on disk has no safety net; work that is committed does.</p>
<p>That history is also part of the proof. Because the repository is public, the way the site is built and changed over time is on display, not just the finished result.</p>

<h2 id="shipping">Shipping: preview and production</h2>
<p>Only a release goes live. A push to the main branch builds and checks the site but deploys nothing. When a set of changes is ready, I run through a short checklist and publish a release with a version number, like v2.1.0. That one step builds the site, saves a copy of exactly what is going live with the release, publishes the container image, and deploys to production. Pull requests get their own preview deployment on a separate URL, so a change can be reviewed on a real, live page before it is released.</p>
<p>The one rule I hold to here is to pick a single lane and stay in it: either review through a pull request or push directly, but not both at once on the same change, so the main branch has one clear source of truth.</p>

<h2 id="guardrails">Guardrails for a public repo</h2>
<p>A public repository means discipline about what goes into it. Nothing private ever lands in the repo, from the first commit on: no credentials, keys, secrets, or sensitive configuration. Deployment tokens and infrastructure settings live in the hosting platform and the CI system, never in the code. Generated output and local editor files are ignored by the repository entirely, so only real source is tracked.</p>
<p>Before each commit I take a short pass: confirm the production build is clean, read through every changed file so nothing unexpected slips in, and check that nothing private is about to become public.</p>

<h2 id="rollback">When something needs undoing</h2>
<p>Mistakes are a normal part of shipping, so the process assumes them. If a release breaks something, one manual workflow puts any earlier release back live from its saved copy, with no rebuild, so it does not depend on the current code or tools. Because every release is a named point, comparing the last good release to the broken one shows exactly what changed. In the code, a bad change can be reverted into a clean new commit that undoes it while preserving the full history. For anything risky, I keep a separate snapshot of the working state first. The goal is simple: there is always a way back, and getting back is never dramatic.</p>

<h2 id="ai">What I directed, what the AI built</h2>
<p>This mirrors how I work with AI everywhere: I set the vision and make every judgment call; the AI drafts and implements; I review, change, and keep versions.</p>
<p><strong>My direction:</strong> the structure and page order, which stories are told, the wording and voice, every factual claim, and what stays private.</p>
<p><strong>What the AI did:</strong> drafting from my notes, building the templates and styling, generating the diagrams, and proposing options that I accepted, rejected, or redirected. Nothing reaches the site without my review.</p>
</div>
</div>
