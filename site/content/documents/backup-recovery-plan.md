---
title: "Backup & recovery plan"
summary: "A ransomware-ready backup and recovery plan for a single work and lab host, built entirely on free tools, with a side-by-side of what changes in a production environment."
hook: "A full backup and recovery plan for one machine: three layers on three schedules, two locations that cover each other, encrypted throughout, tested monthly, and sized from measured growth. Built on free tools, and mapped to what a company would do differently."
layers: ["X4"]
accordion: "X4"
project: ""
topics: []
status: "live"
featured: true
featorder: 2
visibility: "public"
pdf: ""
links: []
---

<p class="tbd-note">[Draft for review. Items marked TBD are measured after the tools are installed; items marked verify are confirmed during the first test cycle.]</p>

<p class="mono">Owner: Jason R. McGinn &middot; Version 0.1 (draft) &middot; 2026-10-21 &middot; Reviewed monthly, at the restore test</p>

## 1. Purpose and scope

This plan defines how one host is backed up, how it is recovered, and how both are proven to work.

The host is a daily work system that is also the development and lab system. It runs the lab virtual machines and containers. Everything on the host is in scope, along with the cloud services it depends on:

- the website, hosted on Azure Static Web Apps
- email, on Microsoft 365
- the domain and its DNS records

The plan is a smaller version of what a company would run. The method is the same; the choices scale with the risk and the budget. Section 13 compares the two.

## 2. Recovery objectives

**Recovery point objective (RPO):** the most data that can be lost, measured in time. **Recovery time objective (RTO):** how long recovery may take.

| Layer | What it holds | Backed up | RPO |
|---|---|---|---|
| Full image | The whole host: system, installed apps, lab VMs and containers | Monthly | 1 month |
| Profile | The user profile with its settings | Weekly | 1 week |
| User files | Every file in the user profile | Daily | 1 day |

- Anything installed or configured after the last image is reinstalled after a restore.
- **RTO:** as fast as the tools in this plan allow. The fastest path is a full image restore from the local backup drive (section 8). The time is measured at every monthly restore test, and the measured time becomes the target. First measured time: [TBD]

## 3. Design principles

1. **Layers, from biggest to smallest.** Each layer has its own tool and schedule, and recovery stacks newer layers on top of older ones.
2. **Two locations that cover each other.** A backup drive in the house and a copy in the cloud. If the house is lost, the cloud copy remains. If the cloud is unavailable, the house copy remains.
3. **Encrypted wherever a backup can leave the host.**
4. **Nothing is trusted until it is restored.** Restores are tested and timed every month.
5. **Sized from measured growth,** not estimates.
6. **Free on purpose.** Every tool is free, from a reputable source, and free of ads or bundled extras. In a company, licenses and dedicated resources would be bought where the business needs them (section 13).

## 4. Components

| Layer | Tool | Schedule | Stored on |
|---|---|---|---|
| Full image | Veeam Agent for Microsoft Windows, Free edition | Monthly | Local backup drive |
| Profile | Microsoft User State Migration Tool (USMT, `scanstate`), from the Windows Assessment and Deployment Kit | Weekly | Local backup drive and Azure Blob |
| User files | restic (free, open source) | Daily | Local backup drive and Azure Blob |
| Mailbox | PowerShell with the Microsoft Graph API | [TBD: schedule] | Joins the user files backup |
| Website and DNS configuration | Recorded through the portals | On every change | Joins the user files backup |
| Automation, logs and reports | PowerShell script | Daily, weekly, monthly tasks | Local, with reports |

**Veeam Agent Free** images the running system, including the lab VMs and containers, with no backup server or extra VM to maintain. A Veeam recovery USB is created, kept with the backup drive, and tested to boot. If the Free edition cannot schedule a monthly job, the script starts it on the first of each month with `Veeam.EndPoint.Manager.exe /backup`. [verify]

**USMT** captures the whole profile with its settings, so it can be restored onto a rebuilt PC with `loadstate`. The capture is encrypted.

**restic** encrypts everything (AES-256), keeps one deduplicated snapshot per run, and writes to two repositories: one on the local backup drive and one in Azure Blob. It reads open files through Windows Volume Shadow Copy (`--use-fs-snapshot`) and can verify its own repositories (`restic check`).

**The mailbox** is exported by a script using the Microsoft Graph API. Microsoft keeps the mailbox running, but that is not a backup of its contents. The script runs under an app registration allowed to read only this mailbox, so it cannot reach anything else.

**The website's content** is already covered: the source is in GitHub and in the local clone, and every release keeps a copy of the built site. What is added here is its configuration (the custom domain and its settings) and the DNS records for web and mail, recorded and kept with the user files whenever they change.

## 5. Storage and copies

| Copy | Location | Holds | Role |
|---|---|---|---|
| 1 | The host | Live data | Production |
| 2 | Local backup drive, not shared on the network | Image, profile, files | The fast copy |
| 3 | Azure Blob, in its own storage account, immutable | Profile, files | The safe copy |

- **Immutable** means a backup in the cloud cannot be changed or deleted before its lock period ends, even with the account's own credentials.
- The full image stays local only. It is large and is only needed for a fast restore of this host. If the local drive is lost, recovery uses the cloud path (section 8).
- The local drive stays connected for the daily file backups, so ransomware on the host could reach it. It is the fast copy, not the safe one; the immutable cloud copy is the one that cannot be changed.

## 6. Retention

The starting point follows the grandfather-father-son pattern: recent backups kept daily, older ones weekly, the oldest monthly.

| Layer | Starting retention |
|---|---|
| Full image | 3 monthly images |
| Profile | 8 weekly captures |
| User files | 8 weeks of daily snapshots |

- The history must always reach back further than the time it would take to notice a problem, such as ransomware or a corrupted file.
- Most of the data is text, which compresses well, so the history is kept as far back as the drive allows.
- The starting numbers are adjusted once the capacity analysis (section 11) shows real sizes.
- **Removal is never silent.** Neither Veeam Agent Free nor restic removes backups by size, so the script warns when the drive reaches 70% full and, at 85%, proposes which oldest restore points to remove. Nothing is deleted until it is approved. Old file snapshots are removed with restic's own retention (`restic forget`).
- The cloud lock period and restic's cleanup (`restic prune`) are set so they do not conflict. [verify]

## 7. Security and key management

**Encryption**

- Veeam images are encrypted with a password.
- USMT profile captures are encrypted with a key.
- restic encrypts every repository, local and cloud.
- Azure Blob encrypts data at rest. The storage account allows no public access, and the backup credential can reach only the backup container.

**Keys**

- All keys are kept in KeePass. This plan names where each key is kept, never the key itself.
- To avoid locking the keys inside the backups they protect, the recovery keys are kept apart, in a separate, small KeePass database that holds only:
  - the backup encryption passwords and keys
  - the BitLocker recovery key
  - what is needed to reach the cloud copy
- Copies of the recovery database are kept in a fire safe in the house, outside the backups, and with the cloud backup.
- Its master password is memorized, with a written reminder in the fire safe.
- Azure MFA backup codes are kept in the fire safe, so the cloud copy can be reached if the house and its devices are lost.

## 8. Recovery procedures

Restore from the biggest layer to the smallest, each newer layer on top of the one before. After ransomware, "latest" always means the latest copy from before the infection (section 9).

**A. The image is usable** (the host failed; the local backup drive is fine). Fastest path.

1. Boot the host from the Veeam recovery USB and restore the latest image.
2. Restore the latest profile capture, only if it is newer than the image.
3. Restore the user files backed up after the image, from restic.
4. Open KeePass and reconnect anything that needs keys.

**B. The image is not usable** (the local backup drive is lost or damaged, for example with the house).

1. Install Windows on the host or a new PC, and sign in.
2. Sign in to Azure (MFA backup codes are in the fire safe if needed).
3. Restore the latest profile capture from Azure Blob with USMT (`loadstate`).
4. Restore the newest user files from the cloud restic repository.
5. Reinstall apps as they are needed.
6. Open KeePass and reconnect anything that needs keys.

## 9. Ransomware response

Based on a real recovery (see the story "Ransomware, first thing in the morning"), scaled to one host.

1. **Stop.** Disconnect the host from the network and power down anything else that may be affected.
2. **Preserve.** Copy the logs before shutting down, so the cause can be traced.
3. **Protect the backups.** Disconnect the local backup drive. Do not connect the host to the cloud copy until the host is clean.
4. **Trace.** Find when and how it got in, and which files it touched. This sets the infection date.
5. **Rebuild.** Restore the last image taken before the infection date (procedure 8A).
6. **Check.** Scan the restored system while it is still off the network.
7. **Restore.** Bring back the profile and files from the last clean snapshots before the infection date.
8. **Fix the root cause,** so the same way in is closed, then reconnect.
9. **Record it:** what happened, what was lost, how long recovery took against the measured target, and what changes.

## 10. Testing

| When | Test | Recorded |
|---|---|---|
| Monthly, after the new image | Restore the full image to a spare disk or a VM from the recovery USB, timed from start to a working desktop | Restore time (becomes the RTO) |
| Monthly | Restore a few files from the local repository and open them | Pass or fail |
| Monthly | Restore a few files from the cloud repository | Pass or fail |
| Weekly | `restic check` on both repositories | Pass or fail |
| Quarterly | Full rebuild on a VM using procedure 8B | Rebuild time, issues found |

Every test is logged. The log is this plan's evidence.

## 11. Capacity planning

Backup storage is sized from measured growth, the same way backup resources are planned for a company.

**Measure** for 2 to 4 weeks, through at least one monthly image:

- size of the protected data on the host
- size of each monthly image after compression
- size of each weekly profile capture
- size of each daily file snapshot
- free space on the backup drive and in Blob

**Calculate:**

- compression ratio = backup size / protected data size
- growth per layer: images per month, profile captures per week, files per day
- space needed = (images kept x image size) + (captures kept x capture size) + (days kept x daily size), plus 25% headroom
- days until the drive reaches 70%, at the current growth rate

**Results:** [TBD: measured numbers, growth chart, and the drive size they point to]

The forecast is repeated every month at the restore test, since growth changes as the work changes.

## 12. Automation

A PowerShell script runs the scheduled tasks and keeps a log of every run.

- **Daily:** run the restic backup to both repositories, confirm success, record sizes, update the growth forecast, and write a short report (what was backed up, how much, how long, any errors).
- **Weekly:** run the USMT capture and store it locally and in Blob; run `restic check`.
- **Monthly:** confirm the Veeam image ran, or start it; prompt for the restore test.
- **Mailbox:** run the Graph export on its schedule and add it to the file backup.
- **Capacity:** warn at 70% full with days remaining; propose removals at 85%, removed only on approval.
- **Configuration:** copy the website and DNS records to the backup when they change.
- **Testing:** record each restore test in the log.

## 13. Lab versus production

| | This lab (free) | Production |
|---|---|---|
| Who sets the targets | The owner of the host | The business owner, in writing, per system |
| Backup tools | Free tools, one per layer: Veeam Agent Free, USMT, restic | A central backup server (for example Veeam Backup & Replication), application-aware for SQL, AD and email |
| Where the backup software runs | On the host it protects | On its own server, outside the environment it protects |
| Schedule | Image monthly, profile weekly, files daily | Set per system, often several times a day for critical data |
| Copies | Host, local drive and immutable cloud copy | 3-2-1-1-0: three copies, two kinds of media, one offsite, one offline or immutable, zero errors on restore tests |
| Immutable copy | Azure Blob for profile and files | Hardened repository or locked cloud storage for every system |
| Retention | Grandfather-father-son start, capped by drive size, removal only on approval | Set by policy, legal and insurance requirements |
| Restore testing | Manual, monthly, timed and logged | Automated and verified, with reports |
| Access | One account | Separate backup admin accounts with MFA, kept apart from the main domain |
| User profiles | Monthly image, weekly USMT capture, daily files | OneDrive Known Folder Move, Intune and Autopilot to rebuild devices, USMT for migrations |
| Mail | Scheduled Graph export | Dedicated Microsoft 365 backup |
| Capacity | Measured growth on one host, forecast monthly | Growth tracked across all systems, storage budgeted ahead |
| Monitoring | A script with warnings and reports | Alerts to an on-call team, failures tracked to closure |
| Cost | Free | Licensed and budgeted |

## 14. Accepted risks and limits

- **The full image has no offsite copy.** If the local drive is lost, recovery uses procedure 8B, which is slower and needs apps reinstalled. Accepted for a lab to keep cloud storage small.
- **The local drive is reachable while connected.** The immutable cloud copy covers this for profile and files; the image depends on the drive surviving.
- **Up to a month of system changes** can be lost, since the image is monthly. Files and settings are protected daily and weekly.
- **Backup software runs on the host it protects.** If the host is lost, recovery starts from the recovery USB and the cloud, not from a backup server.

## 15. References

- [NIST IR 8374 Rev. 1, *Ransomware Risk Management: A Cybersecurity Framework 2.0 Community Profile* (June 2026)](https://csrc.nist.gov/pubs/ir/8374/r1/final)
- CISA #StopRansomware Guide (latest found: May 2023 update) [verify current version before publishing]
- [Veeam Agent for Microsoft Windows, product editions](https://helpcenter.veeam.com/docs/agentforwindows/userguide/license_editions.html)
- [Veeam Agent for Microsoft Windows, starting a backup from the command line](https://helpcenter.veeam.com/docs/agentforwindows/userguide/backup_cmd.html)
- [restic documentation](https://restic.readthedocs.io/)
- [Microsoft Learn, User State Migration Tool overview](https://learn.microsoft.com/windows/deployment/usmt/usmt-overview)
- [Microsoft Learn, Azure Storage data protection best practices](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/blobs/recovery/data-protection-backup-recovery)
