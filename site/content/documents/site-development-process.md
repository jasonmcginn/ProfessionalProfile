---
title: "The Site Development Process"
summary: "How a change to this site goes from an idea to production: the local loop, drafts, version control, the build check, versioned releases, rollback, and the guardrails around a public repository."
hook: "Every change to this site follows the same path: made and reviewed locally, committed as a restore point, checked by CI, and released under a version number, with a saved copy of every release and a way back from any of them."
layers: ["X3", "X2"]
accordion: ""
project: "living-portfolio"
topics: []
status: "live"
visibility: "public"
weight: 20
pdf: ""
links: [{label: "The deploy pipeline (GitHub Actions)", url: "https://github.com/jasonmcginn/ProfessionalProfile/actions"}, {label: "The commit history", url: "https://github.com/jasonmcginn/ProfessionalProfile/commits/main"}, {label: "Releases and saved copies", url: "https://github.com/jasonmcginn/ProfessionalProfile/releases"}, {label: "Release checklist (docs/releasing.md)", url: "https://github.com/jasonmcginn/ProfessionalProfile/blob/main/docs/releasing.md"}]
---

## 1. Purpose

This document describes exactly how this site is changed and shipped. It covers the day-to-day loop, version control, how a change is checked, how it goes live, and how it is undone. The same process would apply to any production web property: the site is small, but the discipline is the same.

## 2. The flow at a glance

1. **Change** files on my own machine.
2. **Review** them on a local copy of the site.
3. **Commit and push** to `main`. This runs an automated build check. **Nothing goes live.**
4. **Release** under a version number. **This is the only way anything goes live.**
5. **Roll back** to any earlier release if something breaks.

| Environment | Where | Purpose |
|---|---|---|
| Local | Hugo's development server on my machine | Every change is seen here first |
| Preview | A temporary Azure URL for each pull request | Review a change on a real, live page before release |
| Production | netstatedata.ca, on Azure Static Web Apps | Only published releases |

## 3. The local loop

Every change starts on a local copy of the site:

    hugo server -D --poll 700ms

- Hugo rebuilds the page the moment a file changes, so the edit-and-check cycle is almost instant.
- `--poll 700ms` makes Hugo check the files itself instead of waiting for the operating system to report changes. Without it, changes made by other tools are sometimes missed, and the page looks stale or broken when nothing is wrong.
- `-D` includes draft pages (section 4), which only ever appear locally.
- If something looks wrong, the first assumption is the environment, not the code: a stale server or a cached page. Restart the server and force a clean reload before looking for a real bug.

## 4. Drafts and page status

- **A draft** (`draft: true`) is left out of every build and every release. It can be committed and pushed safely and still never go live. Removing that one line is what publishes it.
- **A planned page** (`status: "planned"`) is still built and reachable by its address. It only stays out of the home page layer menu and shows greyed out in the library. Planned is a label, not a lock.
- Before every release, the checklist lists what is hidden: `git grep -l "draft: true" site/content`

## 5. Version control

- The whole site lives in Git, in a public repository.
- **Commits are restore points.** I commit in small, logical pieces, each with a message that says what changed, and commit a checkpoint before any larger or risky change. Work that is only saved on disk has no way back.
- **Pushed history is never rewritten.** A mistake is fixed with a new commit, so the record stays complete.
- The history is part of the proof: how the site has been built and changed over time is on display, not just the finished result.

## 6. The build check

Every push to `main` runs an automated check in GitHub Actions. It builds the site and the container image, and deploys nothing.

- Green means the change is safe to release.
- Red means it stops there. The failed step's log shows why, and the fix is made before any release.

The check has already earned its place: it caught a broken container base image before it ever reached a release.

## 7. Versioning

Releases are numbered `vMAJOR.MINOR.PATCH`, for example `v2.1.1`.

| Part | When it changes |
|---|---|
| Patch (`v2.1.1`, `v2.1.2`) | Every normal release of ongoing work. The default. |
| Minor (`v2.2.0`) | Only when I call a milestone release |
| Major (`v3.0.0`) | Only when I announce a major release |

Version 1 was the original single-page site, archived in its own repository. Version 2 is this site.

## 8. Releasing

Before a release, a short checklist is run on the local copy: the home page desktop and Start menu, the taskbar windows, the Start menu after leaving and returning from the game, the security challenge, the library and projects, a phone-width view, a read through every changed file for anything private, the drafts list, and a green build check.

Publishing a GitHub release then runs, in order:

1. Check that the release name is a valid version number.
2. Build the site from that exact version.
3. Save the built site as `site-<version>.zip` on the release. This is the saved copy.
4. Build the container image and scan it for known vulnerabilities.
5. Publish the image to the GitHub Container Registry as `<version>` and `latest`.
6. Deploy to production.

If any step fails, nothing goes live. Every release leaves two copies of exactly what went live: the zip of files, and the container image.

## 9. Rolling back

- A manual workflow puts any earlier release back live from its saved zip, with no rebuild. It does not depend on the current code, the theme, or the build tools.
- Because every release is a named point, comparing the last good release with the broken one shows exactly what changed: `git diff v2.1.0 v2.1.1`
- If the hosting itself is unavailable, any release can run anywhere Docker runs:

      docker run -p 8080:8080 ghcr.io/jasonmcginn/professionalprofile:<version>

## 10. Guardrails for a public repository

- **Nothing private is ever committed:** no credentials, keys, secrets or sensitive configuration. Deployment tokens live in GitHub's encrypted secrets, never in the code.
- **Every third-party build step is pinned to an exact version** (a commit, not a tag). In March 2026 the tags of a widely used security-scanner action were hijacked; a pinned reference cannot be swapped underneath the pipeline.
- **The container runs as a non-root user** on a current, supported web server base, and is scanned on every release.
- **Tools are pinned too.** The site is built with a fixed Hugo version, downloaded from its official release and checked against its published checksum.
- Generated output and local editor files are excluded from the repository, so only real source is tracked.

## 11. Lessons that shaped the process

| What happened | What changed |
|---|---|
| Pages looked broken when nothing was wrong | `--poll` on the dev server; restart and reload before debugging |
| A day of work had no restore point | Commit checkpoints before risky changes |
| Every push went straight to production | Only a release goes live; pushes only run the check |
| An unfinished page went live by its address | Drafts for anything not ready; a drafts check before each release |
| A broken base image would have shipped | The build check builds the image on every push |
| No way back from a bad deploy | A saved copy of every release, and a one-step rollback |

## 12. Links

- [The deploy pipeline (GitHub Actions)](https://github.com/jasonmcginn/ProfessionalProfile/actions)
- [The commit history](https://github.com/jasonmcginn/ProfessionalProfile/commits/main)
- [Releases and their saved copies](https://github.com/jasonmcginn/ProfessionalProfile/releases)
- [The release checklist](https://github.com/jasonmcginn/ProfessionalProfile/blob/main/docs/releasing.md)
