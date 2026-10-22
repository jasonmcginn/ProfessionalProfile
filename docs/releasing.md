# Releasing netstatedata.ca

Only a published GitHub Release goes live. Pushing to `main` builds and checks
the site but deploys nothing. Every release is saved twice: the built site as
`site-<tag>.zip` on the release, and a container image on ghcr.io.

## Version numbers

`vMAJOR.MINOR.PATCH`, for example `v2.1.1`. Jason decides every MINOR and MAJOR step.

- **PATCH** (`v2.1.1`, `v2.1.2`, ...): the default. Every time changes are published during normal work, the last number goes up.
- **MINOR** (`v2.2.0`): only when Jason calls a milestone release. The last number goes back to 0.
- **MAJOR** (`v3.0.0`): only when Jason announces a major release.

## Before a release

Run `hugo server` locally, hard-refresh, and check:

- [ ] Production build is clean: `hugo --minify --source site`
- [ ] Home page: XP desktop, Start button and menu open and close
- [ ] Taskbar: open two windows, raise and minimize each from its button
- [ ] Start menu still works after playing Tetris and coming back
- [ ] Log on: the CTF runs to the flag, `tetris` replay works
- [ ] Library, Projects, and one page of each type open
- [ ] Phone width (390px): normal navigation, no sideways scroll
- [ ] Every changed file read once; nothing private in the diff
- [ ] Drafts checked: `git grep -l "draft: true" site/content` lists only pages meant to stay hidden
- [ ] Last push to `main` shows a green "Build check" in Actions

## Release

1. Commit and push to `main`. Wait for the green build check.
2. GitHub -> Releases -> Draft a new release.
3. Tag: the next version (for example `v2.1.1`), target `main`.
4. Notes: one line per change.
5. Publish. The Release workflow builds, saves, scans, and deploys.
6. Check the live site, then the release page for `site-<tag>.zip`.

If the image scan finds a fixable HIGH or CRITICAL issue, the release stops
before anything goes live. Fix the Dockerfile, then re-run the workflow.

## Roll back

Actions -> "Roll back to a release" -> Run workflow -> enter the tag.
The saved zip from that release goes back live, with no rebuild.

Then find the cause with `git diff <good-tag> <bad-tag>`.

## Run a release anywhere (if hosting is down)

    docker run -p 8080:8080 ghcr.io/jasonmcginn/professionalprofile:v2.1.0

## One-time setup

After the first release, set the `professionalprofile` package to **Public**
in GitHub (Profile -> Packages -> professionalprofile -> Package settings).
