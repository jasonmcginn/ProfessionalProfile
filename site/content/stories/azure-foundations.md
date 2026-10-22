---
title: "Azure foundations for Dynamics 365 migrations"
summary: "The Azure infrastructure behind Dynamics 365 migrations at Thinkmax, a fresh foundation built per client."
hook: "A fresh Azure foundation under every Dynamics 365 migration, built to be the ground the whole project stood on."
layers: ["L3", "X1", "X2", "X3"]
accordion: "X1"
topics: []
status: "live"
visibility: "public"
---
<h2>The situation</h2>
<p>At Thinkmax, I built the Azure infrastructure behind our Dynamics 365 migration projects, a fresh foundation for each client.</p>
<h2>What I did</h2>
<p>Every environment was separated by design. I used virtual networks to keep dev, test, and prod apart, configured peering between them where they needed to talk, and locked them down with network security groups. Remote access was restricted the same way: I only allowed connections from specific locations, my office IP, for example, rather than leaving management open.</p>
<p>Each migration also needed a secure path into the client's own network. Most of the time that was ExpressRoute; where it wasn't, a VPN. I configured the Azure side of those connections myself, with access into the client networks.</p>
<p>The way I built it mattered as much as what I built. I'd stand each piece up by hand first, get it approved, and then codify it in ARM templates. With working templates in hand, I could reuse them to make each next client's build easier and keep it consistent. Prototype, sign-off, then infrastructure as code, the same instinct I'd had years earlier scripting a VPN in an emulator before it went live.</p>
<p>The migrations themselves were mostly off older Dynamics instances, Dynamics 2012 most often. I'd create database servers and Data Lake solutions that mirrored the client's, stand up a replica environment for the development team to work from, and then use the same approach to build test and prod. Working alongside a data modeler, we moved the data between databases while keeping its integrity and security intact the whole way through.</p>
<h2>The result</h2>
<p>Across my time there I did this for around a dozen client migrations, each with its own Azure foundation and its own ExpressRoute or VPN into the client. It is the work that maps most directly to where I'm headed: VNets, peering, NSGs, and hybrid connectivity, the core of the Azure Administrator path I'm on.</p>
