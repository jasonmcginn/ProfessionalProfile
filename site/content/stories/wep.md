---
title: "Proving WEP wasn't protecting us"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Data Link · Transport · Identity &amp; Policy</p>
    <h1>Proving WEP wasn't protecting us</h1>
    <div class="story-body">
      <p>A company I worked for still ran its wireless network on WEP. I'd been learning about wireless security on my own and knew WEP's encryption had been broken years earlier, so rather than just raise a flag, I set out to prove the risk on our own network and make the case for an upgrade.</p>
      <p>I got permission before I touched anything. This was an authorized, internal assessment, and I wanted it done right. On the live network I kept strictly to capturing and analysing traffic, no injection, nothing disruptive, using a Linux laptop and standard wireless tools. That was enough to show the problem plainly: WEP's weaknesses let the key be recovered from captured traffic, which meant the "encryption" protecting the network wasn't really protecting anything.</p>
      <p>To make the risk land for non-technical people, I built a separate, harmless demonstration entirely in my own lab, never on the live network. Over an unencrypted connection I showed how traffic in the clear could be tampered with in transit, flipping the images on a web page as they were delivered. Seeing a page visibly altered in front of them made the abstract idea of "weak encryption" concrete in a way a written warning never could.</p>
      <p>I turned self-taught knowledge into a real, safe risk assessment, and I made the case by showing rather than telling: find the weakness, prove it without causing harm, recommend the fix. It made the case with a live demonstration instead of a theoretical warning, and the network was moved to WPA2.</p>
    </div>
  </div>
