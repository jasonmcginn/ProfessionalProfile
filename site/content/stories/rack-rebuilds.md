---
title: "Four hours down, one bad cable"
---

<div class="wrap story">
    <a class="backlink mono" href="/">← back to home</a>
    <p class="story-where mono">// Physical · Data Link · People</p>
    <h1>Four hours down, one bad cable</h1>
    <div class="story-body">
      <p>Across my network admin roles, and later for managed-service clients, I built or rebuilt a lot of racks: two from scratch and half a dozen more rebuilt from whatever I inherited. The constant was the method: cables cut to length, tagged, and every run documented. A rack isn't finished when it works; it's finished when the next person can understand it. Then I'd go office to office and document each run the rest of the way, from the wall port through the switch to the device.</p>
      <p>The clearest example was at Maritime Door &amp; Window, a small manufacturer where I was new on the job. What brought it to a head was an outage: about four hours, caused by a switching loop. Someone had plugged a cable into a switch at both ends, and back then, without managed switches, there was nothing to catch it.</p>
      <p>I found it the hard way, and methodically. I unplugged sets of cables until the outage stopped, then plugged them back one at a time until the loop took the network down again. That narrowed it to a single port. I left it unplugged and walked office to office, looking for the switch with no link light on its backbone. As I went, I untangled and cleaned up each office's wiring, tagging and documenting the endpoints, and that's how I found it: a cable plugged into the switch at both ends. I pulled it, and the outage was gone. I kept going, office by office, until the whole network was cleaned up and documented.</p>
      <p>The rack in the closet was its own problem: wires run in from other locations, little unmanaged switches dropped in just to reach the main switch, and nothing written down. So I proposed the rebuild, and the time for it, to my boss, and did it on a weekend to avoid downtime. Every cable was mapped to the switch or endpoint it served. I came back early Monday to confirm people could log in and every resource was available before anyone arrived.</p>
      <p>The budget for managed switches wasn't there yet, so I closed the gap with people and paper first: I showed the staff what not to plug in where, and documented everything with tags and physical locations, so if it happened again I could find the port and know the exact switch from the sheet. When the managed switches did come, I set the root bridge, disabled every unused port, and made enabling a port a documented step.</p>
      <p>The point was never tidiness. It made the network knowable. After that I could walk into any office, know which port a problem came from, test it, and tell within minutes whether the fault was the endpoint or the cable back to the switch.</p>
    </div>
  </div>
