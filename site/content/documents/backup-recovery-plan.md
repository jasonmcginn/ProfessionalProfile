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
- My user profile, so it can be backed up and restored onto a rebuilt PC (method in section 4).
- A full host image, for bare-metal recovery if the machine is lost.
- The Azure side: saved through the web portal, plus a local copy kept in the local backup.
- How much I can afford to lose, by layer:
  - user files: at most one day (backed up daily)
  - profile settings: at most one week (captured weekly)
  - the system and installed apps: at most one month (imaged monthly). Anything installed since the last image is reinstalled.
- How fast it must come back: as fast as possible with the tools in this plan. The fastest path is a full image restore from the local backup drive, booted from the Veeam recovery USB. The real time is measured at every monthly restore test (the image, then the profile and files on top), and that measured time becomes the target. [TBD: first measured restore time]

## 3. Why these choices: free on purpose

- Every tool in this plan is free, from a reputable source, and free of ads or bundled extras. The goal was a working, tested plan at no software cost.
- For a company, I would buy licenses or dedicate resources (a separate backup server, offsite or cloud storage) where the business needs them. Section 10 shows what changes.

## 4. Backup design

- Tools, one per layer:
  - Image: Veeam Agent for Microsoft Windows, Free edition, installed directly on the host. It images the running system on a schedule, with no backup server or extra VM to maintain.
  - Profile: Microsoft's User State Migration Tool (USMT), free with the Windows Assessment and Deployment Kit.
  - Files: restic, a free, open-source backup tool. It encrypts everything (AES-256), keeps one deduplicated snapshot per day, writes to the local drive and directly to Azure Blob, handles retention, and can verify its own backups (`restic check`). On Windows it reads open files through Volume Shadow Copy (`--use-fs-snapshot`).
- Backs up the full host image, including the lab VMs and containers on it.
- Recovery USB created from Veeam, kept with the backup drive, and tested to boot.
- Schedule, one layer per rhythm:
  - full image: monthly (Veeam) [verify that Agent Free can schedule monthly; if not, the script starts the Veeam job on the first of each month with `Veeam.EndPoint.Manager.exe /backup`]
  - profile capture: weekly (USMT, by the script)
  - user files: daily (by the script)
- Target: a dedicated drive that is not on the network, so ransomware on the network can't reach it.
- Retention: a professional timeline, capped by size. The plan starts by keeping [TBD: for example 3 monthly images, 8 weekly profile captures and 8 weeks of daily files], and keeps going back as far as the drive allows. Most of what I build is text, which compresses well, so the history can run long.
- When the backup drive reaches a set size, the oldest restore points are removed, but only after I'm warned and approve it. Neither Veeam Agent Free nor restic removes backups by size, so the script handles the warning and the approval (section 8). Removal of old file snapshots uses restic's own retention (`restic forget`).
- Cloud services in use: the website (Azure Static Web Apps) and email (Microsoft 365).
  - Website: the source is in GitHub and in my local clone, and every release keeps a copy of the built site, so the site itself is already covered. What also needs saving is its configuration: the custom domain and its settings, exported or recorded through the portal and kept in the local backup.
  - Domain and DNS: the DNS records for web and mail are recorded and kept in the local backup, and updated whenever they change.
  - Email: Microsoft keeps the mailbox running, but that is not a backup of its contents. The mailbox is exported to a file on a schedule, and the export joins the regular file backup (local drive and Blob). The export is automated by the script. (section 8)

## 5. Protecting the backups themselves

- The backup drive is off the network.
- Encryption everywhere a backup can leave my hands:
  - Veeam backups are encrypted with a password.
  - The USMT profile capture is encrypted with a key.
  - Azure Blob storage encrypts data at rest, the storage account allows no public access, and the upload uses a key that can reach only the backup container.
- Where the keys live: in KeePass. The plan names where each key is kept, never the key itself.
- The key problem to avoid: if the only copy of the keys is inside an encrypted backup, the keys are locked behind themselves. So the recovery keys are kept apart:
  - A separate, small KeePass database holds only the recovery keys (backup encryption passwords, the BitLocker recovery key, the profile capture key, and what's needed to reach the cloud copy).
  - A copy of that recovery database is kept in a fire safe in the house, outside the backups, and another copy is stored with the offsite (cloud) backup.
  - Its master password is memorized, with a written reminder kept in the fire safe that only I can turn into the real password.
  - Signing in to Azure without my devices: MFA backup codes are kept in the fire safe, so the cloud copy can still be reached if the house and its devices are lost.
- Two places, each covering the other: a backup drive in the house, and a copy in the cloud. If the house is lost, the cloud copy remains. If the cloud is unavailable, the drive in the house remains.
- Copies: the host, the local backup drive, and the cloud copy. That is three copies, on two kinds of media (local disk and cloud storage), with one offsite and the local drive kept off the network.
- Cloud: Azure Blob storage, in its own storage account, with immutability turned on so a backup can't be changed or deleted before its retention ends.
- What goes to the cloud: my files and my user profile. The full host image stays local only, since it is large and only needed for a fast restore of this machine.
- Three layers, from the whole machine down to the files:
  1. Full image: the whole host, kept locally (monthly, Veeam).
  2. Profile, as a whole: my user profile with its settings, captured with Microsoft's User State Migration Tool (USMT, `scanstate`). Encrypted, stored on the local drive and in Blob. Weekly.
  3. User files: every file in my profile, daily, by the script, to both places, so the house and the cloud each hold a copy. restic keeps two repositories, one on the local drive and one in Blob, each with a snapshot for every day.
- Apps are not tracked separately. The full image covers them for this machine; on a rebuilt PC they are reinstalled as needed.
- Recovery order: restore the layers from the biggest to the smallest, each newer layer on top of the one before.
  - **The image is usable** (the host failed, and the local backup drive is fine). Fastest:
    1. Re-image the host from the latest backup image, booted from the Veeam recovery USB.
    2. Restore the profile capture, only if it is newer than the image.
    3. Restore any user files backed up after the image.
  - **The image is not usable** (the backup drive is lost or damaged, for example with the house):
    1. Install Windows on the host or a new PC, and sign in.
    2. Restore the latest profile capture from Blob with USMT (`loadstate`).
    3. Restore the newest user files from Blob on top of it.
    4. Reinstall apps as they're needed.
  - Either way, finish by opening KeePass and reconnecting anything that needs keys.
  - After ransomware, "latest" means the latest copy from before the infection (section 9).
- How files get to Blob: restic writes directly to the Blob container, so no separate upload step is needed. The container's version history and immutability keep older copies locked. Each run's output is saved to a log, and the script turns it into a short report (what was backed up, how much, how long, any errors). [verify in testing: set Blob's lock period and restic's retention so restic's cleanup (`prune`) doesn't conflict with the lock]

## 6. Testing restores

- Every month:
  - restore a few files from the latest local backup and open them
  - restore the full host image to a spare disk or a VM, booted from the Veeam recovery USB, and time it from start to a working desktop
  - restore a few files from the cloud copy, to prove that path works too
- Every quarter: test a full rebuild on a VM, using the rebuild steps in section 4.
- The measured restore time is recorded and becomes the recovery target in section 2.
- Each test is recorded. The records are this plan's evidence.

## 7. Capacity and data growth

Size the backup storage from measured growth, not a guess, the same way I would plan backup resources for a company.

- Measure for 2 to 4 weeks (and through at least one monthly image):
  - size of the protected data on the host
  - size of each monthly image (after Veeam's compression)
  - size of each weekly profile capture
  - size of each daily file backup
  - free space on the backup drive and in Blob
- Work out:
  - compression ratio = backup size / protected data size
  - average growth per layer: images per month, profile captures per week, files per day
  - space needed = (images kept x image size) + (profile captures kept x capture size) + (days of files kept x daily size), plus 25% headroom
  - days until the drive reaches its limit, at the current growth rate
- Results: [TBD: measured numbers, a growth chart, and the drive size they point to]
- Repeat the forecast every month, at the restore test, since growth changes as the work changes.

## 8. Automation

A script, once the framework is set:

- Each day: back up user files to the local drive and to Blob, confirm it worked, record the sizes to a log, and update the growth forecast.
- Each week: run the USMT profile capture, then store it locally and in Blob.
- Each month: confirm the Veeam image ran (or start it), then prompt me for the restore test.
- Warn me when the drive reaches 70% full, with how many days are left at the current growth rate.
- At 85%, propose which oldest restore points to remove. Nothing is deleted until I approve it.
- Record each restore test, so the log doubles as the plan's evidence.
- Keep each restic run's log and report, and run `restic check` weekly to confirm both repositories are intact.
- Export the mailbox on a schedule with PowerShell and the Microsoft Graph API, and add the export to the file backup. An app registration is allowed to read only my mailbox, so the script can't reach anything else.
- Copy the domain and DNS records to the backup whenever they change.

## 9. When ransomware hits

Drawn from a real recovery I led (see the story "Ransomware, first thing in the morning"), scaled to one host:

1. Stop: disconnect the host from the network and power down anything else that may be affected.
2. Preserve: copy the logs before shutting down, so the cause can be traced later.
3. Protect the backups: confirm the backup drive was not connected, or disconnect it now. Do not connect the host to the cloud copy until the host is clean.
4. Trace: find when and how it got in, and which files it touched.
5. Rebuild: restore the host image from the last backup taken before the infection, booted from the recovery USB.
6. Check: scan the restored system while it is still off the network, then reconnect.
7. Restore files: bring back anything newer from the last clean restore point.
8. Fix the root cause, so the same way in is closed.
9. Record it: what happened, what was lost, how long recovery took against the measured target, and what changes.

## 10. How production differs

This plan is a smaller version of what a company would run. The method is the same; the choices scale with the risk and the budget.

| | My lab (free) | Enterprise |
|---|---|---|
| Who sets the targets | Me: one day of work lost is acceptable, recovery as fast as the tools allow | The business owner, in writing, per system |
| Backup tools | Free tools, one per layer: Veeam Agent Free (image), USMT (profile), restic (files) | Central backup server (for example Veeam Backup & Replication), application-aware for SQL, AD and email |
| Where the backup server runs | No server: the agent runs on the host it protects | Its own machine, outside the environment it protects |
| Schedule | Image monthly, profile weekly, files daily | Set per system, often several times a day for critical data |
| Copies | Host + local backup drive + a cloud copy, each place covering the other | 3-2-1-1-0: three copies, two kinds of media, one offsite, one offline or unchangeable, zero errors on restore tests |
| Unchangeable copy | The drive is off the network | Immutable storage (hardened repository or locked cloud storage) |
| Retention | A timeline capped by drive size, with a warning before old restore points are removed | Set by policy, legal and insurance requirements |
| Restore testing | Manual, monthly, timed and recorded | Automated and verified, with reports |
| Access | My own account | Separate backup admin accounts with MFA, kept apart from the main domain |
| Cloud | Files and profile to immutable Azure Blob; Azure resources saved through the portal + a local copy | Native cloud backup for VMs and databases, plus M365 backup |
| Capacity | Measured growth on one host, forecast every month | Growth tracked across all systems, storage budgeted ahead |
| User profile | Full image monthly (local), USMT profile capture weekly, user files daily (local and cloud) | OneDrive Known Folder Move, Intune/Autopilot rebuilds the PC, USMT for migrations |
| Monitoring | A script checks that last night's backup ran and warns before the drive fills | Alerts to an on-call team, failures tracked to closure |
| Cost | Free | Licensed and budgeted |

## 11. References

- NIST IR 8374 Rev. 1, *Ransomware Risk Management: A Cybersecurity Framework 2.0 Community Profile* (June 2026): https://csrc.nist.gov/pubs/ir/8374/r1/final
- CISA #StopRansomware Guide (latest found: May 2023 update) [verify current version before publishing]
- Veeam Agent for Microsoft Windows, product editions: https://helpcenter.veeam.com/docs/agentforwindows/userguide/license_editions.html
- restic documentation: https://restic.readthedocs.io/
- Microsoft Learn, User State Migration Tool overview: https://learn.microsoft.com/windows/deployment/usmt/usmt-overview
