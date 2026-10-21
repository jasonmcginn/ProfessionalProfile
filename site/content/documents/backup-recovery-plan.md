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
- How much work I can afford to lose: one day (daily backup).
- How fast it must come back: as fast as possible with the tools in this plan. The fastest path is a full image restore from the local backup drive, booted from the Veeam recovery USB. The real time is measured at every monthly restore test, and that measured time becomes the target. [TBD: first measured restore time]

## 3. Why these choices: free on purpose

- Every tool in this plan is free. The goal was a working, tested plan at no software cost.
- For a company, I would buy licenses or dedicate resources (a separate backup server, offsite or cloud storage) where the business needs them. Section 10 shows what changes.

## 4. Backup design

- Tool: Veeam Agent for Microsoft Windows, Free edition, installed directly on the host. The simplest option: no backup server and no extra VM to maintain.
- Backs up the full host image (including the lab VMs and containers on it) and all files.
- Recovery USB created from Veeam, kept with the backup drive, and tested to boot.
- Schedule: once a day.
- Target: a dedicated drive that is not on the network, so ransomware on the network can't reach it.
- Retention: a professional timeline, capped by size. Veeam keeps daily restore points for a set period (starting at 8 weeks), and the plan keeps going back as far as the drive allows. Most of what I build is text, which compresses well, so the history can run long.
- When the backup drive reaches a set size, the oldest restore points are removed, but only after I'm warned and approve it. Veeam Agent Free can't do size-based cleanup, so the script handles the warning and the approval (section 8).
- Cloud services in use: the website (Azure Static Web Apps) and email (Microsoft 365).
  - Website: the source is in GitHub and in my local clone, and every release keeps a copy of the built site, so the site itself is already covered. What also needs saving is its configuration: the custom domain and its settings, exported or recorded through the portal and kept in the local backup.
  - Domain and DNS: the DNS records for web and mail are recorded and kept in the local backup, and updated whenever they change.
  - Email: Microsoft keeps the mailbox running, but that is not a backup of its contents. [Decide: method, for example a monthly export of the mailbox to a file that joins the regular file backup]

## 5. Protecting the backups themselves

- The backup drive is off the network.
- Encryption everywhere a backup can leave my hands:
  - Veeam backups are encrypted with a password.
  - The USMT profile capture is encrypted with a key.
  - Azure Blob storage encrypts data at rest, the storage account allows no public access, and the upload uses a key that can reach only the backup container.
- Where the keys live: in KeePass. The plan names where each key is kept, never the key itself.
- The key problem to avoid: if the only copy of the KeePass database is inside an encrypted backup, the keys are locked behind themselves. [Decide: where an extra copy of the KeePass database lives outside the backups, and how the master password is kept safe without the computer]
- Two places, each covering the other: a backup drive in the house, and a copy in the cloud. If the house is lost, the cloud copy remains. If the cloud is unavailable, the drive in the house remains.
- Copies: the host, the local backup drive, and the cloud copy. That is three copies, on two kinds of media (local disk and cloud storage), with one offsite and the local drive kept off the network.
- Cloud: Azure Blob storage, in its own storage account, with immutability turned on so a backup can't be changed or deleted before its retention ends.
- What goes to the cloud: my files and my user profile. The full host image stays local only, since it is large and only needed for a fast restore of this machine.
- Two recovery paths:
  - The host fails: restore the full image from the local drive. Fastest.
  - The house is lost: build a new PC, then restore my files and profile from the cloud. Slower, but nothing that matters is lost.
- Profile, in two layers:
  - Daily: files go to Blob with the script, the list of installed apps is saved with `winget export`, and settings come back through each app's own sync (VS Code, browser, Microsoft account).
  - Monthly: a full profile capture with Microsoft's User State Migration Tool (USMT, `scanstate`), at the restore test. It catches the settings the sync doesn't. The capture is encrypted, and is stored on the local drive and in Blob.
- Rebuilding a PC (the house-lost path):
  1. Install Windows and sign in.
  2. Reinstall apps with `winget import`, from the saved app list.
  3. Restore files from Blob.
  4. Restore the latest profile capture with USMT (`loadstate`).
  5. Sign in to VS Code, the browser and GitHub, and let settings sync.
  6. Open KeePass from the restored database and reconnect anything that needs keys.
- [TBD: an app inventory. List the installed apps, then decide for each one which configuration is kept and how]
- How files get to Blob: AzCopy, Microsoft's free command-line tool, run by the script. It uploads only what changed. The container's version history and immutability keep every older copy locked. Each run writes a log and a short report (what was uploaded, how much, how long, any errors). Veeam Agent Free allows one job, used for the full image, and can't send directly to cloud storage, which is why a separate upload is needed.

## 6. Testing restores

- Every month:
  - restore a few files from the latest local backup and open them
  - restore the full host image to a spare disk or a VM, booted from the Veeam recovery USB, and time it from start to a working desktop
  - restore a few files from the cloud copy, to prove that path works too
  - take the monthly USMT profile capture
- Every quarter: test a full rebuild on a VM, using the rebuild steps in section 4.
- The measured restore time is recorded and becomes the recovery target in section 2.
- Each test is recorded. The records are this plan's evidence.

## 7. Capacity and data growth

Size the backup storage from measured growth, not a guess, the same way I would plan backup resources for a company.

- Measure for 2 to 4 weeks:
  - size of the protected data on the host
  - size of the first full backup (after Veeam's compression)
  - size of each daily incremental backup
  - free space on the backup drive
- Work out:
  - compression ratio = backup size / protected data size
  - average daily growth = average incremental size
  - space needed = full backup + (daily growth x days kept), plus 25% headroom
  - days until the drive reaches its limit, at the current growth rate
- Results: [TBD: measured numbers, a growth chart, and the drive size they point to]
- Repeat the forecast every month, at the restore test, since growth changes as the work changes.

## 8. Automation

A script, once the framework is set:

- Each day: confirm last night's backup ran, record the backup and drive sizes to a log, and update the growth forecast.
- Warn me when the drive reaches 70% full, with how many days are left at the current growth rate.
- At 85%, propose which oldest restore points to remove. Nothing is deleted until I approve it.
- Save the installed-app list (`winget export`) with the files.
- Monthly: run the USMT profile capture and upload it.
- Record each restore test, so the log doubles as the plan's evidence.
- Run the AzCopy upload, and keep its log and report.
- [TBD: the mailbox export and the domain/DNS record copy, once the method is decided]

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
| Backup tool | Veeam Agent Free on one machine | Central backup server (for example Veeam Backup & Replication), application-aware for SQL, AD and email |
| Where the backup server runs | No server: the agent runs on the host it protects | Its own machine, outside the environment it protects |
| Schedule | Once a day | Set per system, often several times a day for critical data |
| Copies | Host + local backup drive + a cloud copy, each place covering the other | 3-2-1-1-0: three copies, two kinds of media, one offsite, one offline or unchangeable, zero errors on restore tests |
| Unchangeable copy | The drive is off the network | Immutable storage (hardened repository or locked cloud storage) |
| Retention | A timeline capped by drive size, with a warning before old restore points are removed | Set by policy, legal and insurance requirements |
| Restore testing | Manual, monthly, timed and recorded | Automated and verified, with reports |
| Access | My own account | Separate backup admin accounts with MFA, kept apart from the main domain |
| Cloud | Files and profile to immutable Azure Blob; Azure resources saved through the portal + a local copy | Native cloud backup for VMs and databases, plus M365 backup |
| Capacity | Measured growth on one host, forecast every month | Growth tracked across all systems, storage budgeted ahead |
| User profile | App list + app sync daily, USMT capture monthly | OneDrive Known Folder Move, Intune/Autopilot rebuilds the PC, USMT for migrations |
| Monitoring | A script checks that last night's backup ran and warns before the drive fills | Alerts to an on-call team, failures tracked to closure |
| Cost | Free | Licensed and budgeted |

## 11. References

- NIST IR 8374 Rev. 1, *Ransomware Risk Management: A Cybersecurity Framework 2.0 Community Profile* (June 2026): https://csrc.nist.gov/pubs/ir/8374/r1/final
- CISA #StopRansomware Guide (latest found: May 2023 update) [verify current version before publishing]
- Veeam Agent for Microsoft Windows, product editions: https://helpcenter.veeam.com/docs/agentforwindows/userguide/license_editions.html
