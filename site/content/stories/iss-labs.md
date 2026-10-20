---
title: "Teaching networking by building it"
summary: "A three-lab progression I built on my own evenings so students learned networking by building it."
hook: "Students knew the textbook but not how a network really behaves, so I had them build one, on my own evenings."
layers: ["L8", "L2", "L3", "L4"]
accordion: "L4"
topics: []
status: "live"
visibility: "public"
---
<p>The students in the Information Systems Specialist program knew the book, but not how technology actually behaves in the real world. So on my own evenings I built a three-lab progression that had them build a network, connect it to others, and then watch it work.</p>
      <p>The first lab was the same for every group: a small network of three machines, one running Windows Server as a domain controller and two as clients, with a router in front standing in as their internet connection. With three groups that meant three separate networks, each with its own domain controller and two clients, so everyone had somewhere to practice logins and test policy. Each network ran on its own subnet, so later, when they connected, it was always clear which traffic belonged to which group.</p>
      <p>The second lab opened those networks up to each other. Each group had to offer a service to the "public" side, the other groups' networks, and to do it they had to collaborate: agree on IP addresses and tell each other exactly which ports and resources to open. One group ran DNS, one ran a web service, one hosted a VPN. Then everyone verified and established a basic connection to each service. Suddenly it wasn't a toy, it was several real networks that had to interoperate.</p>
      <p>The third lab put Wireshark and nmap in their hands and had them watch their own traffic. The web group captured web traffic and watched their page get delivered. The DNS group saw the lookups come in. The VPN group watched their traffic go by encrypted, and could see plainly how it differed from the web traffic in the clear. To finish, all three groups shared what they'd found with the others, so each one understood not just its own piece but how the whole thing fit together.</p>
      <p>It was never an official part of the curriculum, so I couldn't put a grade on it, but every piece was aimed at the exam questions they'd face, and it gave them a hands-on way in, for the exam and for the real world.</p>
