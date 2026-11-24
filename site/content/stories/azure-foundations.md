---
title: "Azure foundations for Dynamics 365 migrations"
summary: "The Azure infrastructure behind Dynamics 365 migrations at Thinkmax, a fresh foundation built per client."
hook: "A fresh Azure foundation under every Dynamics 365 migration, built to be the ground the whole project stood on."
layers: ["L3", "X1", "X2", "X3"]
accordion: "X1"
topics: []
status: "live"
visibility: "public"
service: "technical discovery and solution design"
glance:
  - {k: "where", v: "Thinkmax · Infrastructure Consultant · 2021 to 2023"}
  - {k: "scale", v: "Around a Dozen Client Migrations"}
  - {k: "moved", v: "Older Dynamics, Most Often Dynamics AX 2012 · to Dynamics 365 on Azure"}
  - {k: "built", v: "Virtual Networks · Peering · ExpressRoute and VPN · SQL and Data Lake · ARM Templates"}
  - {k: "secured", v: "Separate Tenants · Network Security Groups · Restricted Remote Access · Conditional Access"}
related:
  - {kind: "Next story", title: "Turning config tracking into handover documentation", text: "How the build log from these migrations became the client's handover guide.", url: "/stories/config-docs/"}
  - {kind: "Same instinct, years earlier", title: "A site-to-site VPN, tested offline before it went live", text: "Prototype first, then go live: the VPN I scripted in an emulator before the real cutover.", url: "/stories/vpn-montreal/"}
  - {kind: "Portfolio", title: "Back to what I take on", text: "Six services, each with its own story like this one.", url: "/#services"}
---
<section>
<p class="sec-label">// 01 the situation</p>
<h2>Every migration needed its own ground to stand on</h2>
<p class="lead">At Thinkmax, I built the Azure infrastructure behind our Dynamics 365 migration projects, a fresh foundation for each client.</p>
<p>Each one started with discovery: the client's technical leads, hands-on access and their own documentation. From that I wrote the infrastructure plan and estimated the hours for each phase.</p>
</section>
<section>
<p class="sec-label">// 02 what I did</p>
<h2>Four parts, the same on every build</h2>
<ol class="parts">
<li>
<div class="part-h">
<span class="n">1</span><h3>Keep every environment apart</h3>
</div>
<p>Every environment was separated by design. I used virtual networks to keep dev, test, and prod apart, configured peering between them where they needed to talk, and locked them down with network security groups.</p>
<p>The infrastructure was also separated by tenant: everything up to pre-production on one, pre-production on its own, and production on its own.</p>
<p>Remote access was restricted the same way: I only allowed connections from specific locations, my office IP, for example, rather than leaving management open.</p>
</li>
<li>
<div class="part-h">
<span class="n">2</span><h3>A secure path into the client's network</h3>
</div>
<p>Each migration also needed a secure path into the client's own network. Most of the time that was ExpressRoute; where it wasn't, a VPN. I configured the Azure side of those connections myself, with access into the client networks.</p>
</li>
<li>
<div class="part-h">
<span class="n">3</span><h3>By hand first, then as code</h3>
</div>
<p>The way I built it mattered as much as what I built. I'd stand each piece up by hand first, get it approved, and then codify it in ARM templates.</p>
<p>With working templates in hand, I could reuse them to make each next client's build easier and keep it consistent. Prototype, sign-off, then infrastructure as code.</p>
</li>
<li>
<div class="part-h">
<span class="n">4</span><h3>Mirror the client, then migrate</h3>
</div>
<p>The migrations themselves were mostly off older Dynamics instances, Dynamics AX 2012 most often. I'd create database servers and Data Lake solutions that mirrored the client's, stand up a replica environment for the development team to work from, and then use the same approach to build test and prod.</p>
<p>Working alongside a data modeler, we moved the data between databases while keeping its integrity and security intact the whole way through.</p>
</li>
</ol>
</section>
<section>
<p class="sec-label">// 03 one project, start to finish</p>
<h2>Five environments for a healthcare enterprise</h2>
<p>For a healthcare enterprise with over 800 employees, I built the environments for a custom Dynamics 365 deployment, including the migration from Dynamics AX 2012.</p>
<ol class="flow tenants" aria-label="Environments, grouped by tenant, in the order they were built">
<li class="tenant">
<span class="k">Tenant 1</span><span class="flow-in"><span class="step">Development</span><span class="arrow" aria-hidden="true">→</span><span class="step">Test</span><span class="arrow" aria-hidden="true">→</span><span class="step">QA</span></span>
</li>
<li class="arrow" aria-hidden="true">→</li>
<li class="tenant">
<span class="k">Tenant 2</span><span class="step">Pre-Production</span></li>
<li class="arrow" aria-hidden="true">→</li>
<li class="tenant">
<span class="k">Tenant 3</span><span class="step">Production</span></li>
</ol>
<div class="cards2">
<div>
<p class="k">Access</p>
<h3>Each group saw only its part</h3>
<p>I used Azure AD Conditional Access to limit each group to what it needed.</p>
</div>
<div>
<p class="k">Estimates</p>
<h3>Changes agreed before the work</h3>
<p>When new needs came up, I estimated the change, got approval, and kept the work close to the approved hours.</p>
</div>
<div>
<p class="k">Handover</p>
<h3>Documentation from the build log</h3>
<p>I was the only technician who automated the handover documentation, using a Word template fed from an Excel build log.</p>
</div>
</div>
</section>
<section>
<p class="sec-label">// 04 the result</p>
<h2>A dozen foundations, each one easier than the last</h2>
<p class="lead">Across my time there I did this for around a dozen client migrations, each with its own Azure foundation and its own ExpressRoute or VPN into the client.</p>
<p>It is the work that maps most directly to where I'm headed: discovery, a plan, an estimate, a build and a handover, on VNets, peering, NSGs and hybrid connectivity.</p>
</section>
