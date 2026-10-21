---
title: "Backup & recovery plan"
summary: "A ransomware-ready backup and recovery plan for my lab host, built to cost nothing, with what changes for a production environment. Grounded in current CISA and NIST guidance."
hook: ""
layers: ["X4"]
accordion: "X4"
project: ""
topics: []
status: "planned"
visibility: "public"
pdf: ""
links: []
---

<p class="tbd-note">[Draft outline: Jason's decisions as notes, to be written up in his voice. Not final text.]</p>

## 1. Who this plan is for

- The host machine: my daily work system, which is also the development and lab system (it runs the lab VMs and containers).
- Everything on it is in scope.

## 2. What we protect, and how fast it must come back

- All user-generated files.
- A full host image, for bare-metal recovery if the machine is lost.
- The Azure side: saved through the web portal, plus a local copy kept in the local backup.
- How much work I can afford to lose: one day (daily backup).
- How fast it must come back: [TBD]

## 3. Why these choices: free on purpose

- Every tool in this plan is free. The goal was a working, tested plan at no software cost.
- For a company, I would buy licenses or dedicate resources (a separate backup server, offsite or cloud storage) where the business needs them. Section 9 shows what changes.

## 4. Backup design

- Tool: Veeam Agent for Microsoft Windows, Free edition, installed directly on the host. The simplest option: no backup server and no extra VM to maintain.
- Backs up the full host image (including the lab VMs and containers on it) and all files.
- Recovery USB created from Veeam, kept with the backup drive, and tested to boot.
- Schedule: once a day.
- Target: a dedicated drive that is not on the network, so ransomware on the network can't reach it.
- Retention: many weeks. Most files are text and compress well, so long retention is cheap. [TBD: number of weeks]
- Azure: export through the portal, and keep a copy in the local backup. [TBD: what is in Azure, and how each piece is exported]

## 5. Protecting the backups themselves

- The backup drive is off the network.
- [TBD: encryption of backups, and where the encryption password, BitLocker recovery key and KeePass master password are kept]
- [TBD: offsite copy. With only one backup drive in the house, a fire or theft takes the host and the backup together. Name this risk, or add a second drive kept elsewhere.]

## 6. Testing restores

- [TBD: schedule, for example monthly file restores and a quarterly bare-metal restore to a spare disk or VM]
- Each test is recorded. The records are this plan's evidence.

## 7. Automation

- A script once the framework is set. [TBD: what it does, for example checking that last night's backup ran, recording restore tests, exporting the Azure side]

## 8. When ransomware hits

- [TBD: the runbook, drawn from the ransomware recovery story: isolate, preserve logs, trace, clean, restore from the last good backup, fix the root cause]

## 9. How production differs

This plan is a smaller version of what a company would run. The method is the same; the choices scale with the risk and the budget.

| | My lab (free) | Enterprise |
|---|---|---|
| Who sets the targets | Me: one day of work lost is acceptable | The business owner, in writing, per system |
| Backup tool | Veeam Agent Free on one machine | Central backup server (for example Veeam Backup & Replication), application-aware for SQL, AD and email |
| Where the backup server runs | No server: the agent runs on the host it protects | Its own machine, outside the environment it protects |
| Schedule | Once a day | Set per system, often several times a day for critical data |
| Copies | Original + one drive off the network [+ offsite: TBD] | 3-2-1-1-0: three copies, two kinds of media, one offsite, one offline or unchangeable, zero errors on restore tests |
| Unchangeable copy | The drive is off the network | Immutable storage (hardened repository or locked cloud storage) |
| Retention | Many weeks [TBD: number] | Set by policy, legal and insurance requirements |
| Restore testing | Manual, on a schedule, recorded | Automated and verified, with reports |
| Access | My own account | Separate backup admin accounts with MFA, kept apart from the main domain |
| Cloud | Azure saved through the portal + a local copy | Native cloud backup for VMs and databases, plus M365 backup |
| Monitoring | A script checks that last night's backup ran [TBD] | Alerts to an on-call team, failures tracked to closure |
| Cost | Free | Licensed and budgeted |

## 10. References

- NIST IR 8374 Rev. 1, *Ransomware Risk Management: A Cybersecurity Framework 2.0 Community Profile* (June 2026): https://csrc.nist.gov/pubs/ir/8374/r1/final
- CISA #StopRansomware Guide (latest found: May 2023 update) [verify current version before publishing]
- Veeam Agent for Microsoft Windows, product editions: https://helpcenter.veeam.com/docs/agentforwindows/userguide/license_editions.html
