---
title: "How this site is built"
summary: "What the site is made of: the toolchain and architecture, how the content is organized, how the domain is set up, and how the work is split between me and AI. Development and releases have their own document."
project: "living-portfolio"
weight: 10
aliases: ["/docs/devprocess/"]
---

<div class="wrap story">
<a class="backlink mono" href="/">← back</a>
<p class="story-where mono">// how this site is built</p>
<h1>How this site is built</h1>
<p class="hook">This page is a profile, and also a working piece of infrastructure. Here is what it is made of: the toolchain behind it, how the content is organized, and how the domain is set up.</p>
<p class="mono series-nav">Part of <a href="/projects/living-portfolio/">The Living Portfolio</a></p>
<div class="doc-toc">
<p class="toc-h">On this page</p>
<ol>
<li><a href="#toolchain">The toolchain</a></li>
<li><a href="#workflow">The workflow</a></li>
<li><a href="#content">How the content is organized</a></li>
<li><a href="#domain">The domain, external and internal</a></li>
<li><a href="#development">How it is developed and released</a></li>
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
<tr><td>Git and GitHub</td><td>Version control and CI</td><td>The public repo is part of the proof; Actions checks every push and deploys each release</td></tr>
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

<h2 id="development">How it is developed and released</h2>
<p>Every change follows the same path: made and reviewed on a local copy, committed as a restore point, checked automatically, and released under a version number. Only a release goes live, every release keeps a saved copy of exactly what was published, and any earlier release can be put back live in one step.</p>
<p>The full process, from the local loop to versioning, releases, rollback and the guardrails around a public repository, is in its own document: <a href="/documents/site-development-process/">The Site Development Process</a>.</p>
<p class="mono">See it in action: <a href="https://github.com/jasonmcginn/ProfessionalProfile/actions" target="_blank" rel="noopener">the deploy pipeline</a> &middot; <a href="https://github.com/jasonmcginn/ProfessionalProfile/commits/main" target="_blank" rel="noopener">the commit history</a> &middot; <a href="https://github.com/jasonmcginn/ProfessionalProfile/releases" target="_blank" rel="noopener">releases</a></p>

<h2 id="ai">What I directed, what the AI built</h2>
<p>This mirrors how I work with AI everywhere: I set the vision and make every judgment call; the AI drafts and implements; I review, change, and keep versions.</p>
<p><strong>My direction:</strong> the structure and page order, which stories are told, the wording and voice, every factual claim, and what stays private.</p>
<p><strong>What the AI did:</strong> drafting from my notes, building the templates and styling, generating the diagrams, and proposing options that I accepted, rejected, or redirected. Nothing reaches the site without my review.</p>
</div>
</div>
