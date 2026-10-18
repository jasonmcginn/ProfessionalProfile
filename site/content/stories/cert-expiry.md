---
title: "When an expired certificate took the VPN down"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Session / Presentation · Network · People</p>
    <h1>When an expired certificate took the VPN down</h1>
    <div class="story-body">
      <p>I was running the site-to-site VPN I'd built, and one day it just dropped. When I went looking, the cause was simple and easy to miss: the certificate behind it had expired. Nothing had been misconfigured; time had just run out on it.</p>
      <p>The fix itself was straightforward, create a new certificate and install it, and the service came back. But the lesson stuck: certificates expire, and when they do they can take a service down quietly, with no warning and no obvious error pointing at the real cause.</p>
      <p>That outage is why I handle certificates differently now. In the roles since, I moved to automated certificate management: internal certificates issued and renewed automatically through ADCS auto-enrollment via Group Policy, and others managed in Azure Key Vault, with an alert well before expiry as a backstop, so a certificate can't quietly take a service down the way this one did.</p>
    </div>
  </div>
