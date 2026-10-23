---
title: "Troubleshooting example: the frozen shell"
layout: "note"
kind: "troubleshooting example"
back: "/guide/netstate-lab-network/phase-1"
hook: "A real problem from building this lab: stepping inside a machine froze, and then every Docker command froze with it. Here's how it was narrowed down, one test at a time."
visibility: "public"
---

<!-- Draft. Example wording, for Jason to reword. Real event, 2026-10-22. -->

## The symptom

In step 2, this command printed nothing and never returned:

{{< cmd >}}docker compose exec client-a bash{{< /cmd >}}

No prompt, no error. Ctrl + C didn't free it. Only restarting the container did.

## Narrowing it down

Each test was chosen to rule one thing in or out.

| Test | Result | What it told us |
|---|---|---|
| Press Enter, type `hostname` | Nothing | Not just a hidden prompt; the session really was stuck |
| `docker compose exec client-a hostname` (no interactive terminal) | Hung too | It wasn't only interactive sessions. Docker's exec itself was stuck |
| `wsl --shutdown`, restart Docker Desktop, `docker compose up -d`, then the same `hostname` command | Worked | Docker was healthy again; the earlier stuck session had jammed it |
| `docker compose exec client-a bash` again, same window | Hung | The interactive session was the trigger, every time |
| Update Docker Desktop (4.95.0 to 4.96.3), then `bash` in the regular Command Prompt | Worked | Something about the window or the old version was the cause |

## The cause

The commands were being run in **PowerShell ISE**. ISE looks like a terminal but isn't one: it can't hand the keyboard to an interactive program like `bash`, `telnet` or `ssh`, so the session waits forever. The same window had also been showing Docker's normal progress messages as red `NativeCommandError` text, an early clue that was easy to dismiss.

## The fix

Use **Terminal** (or the regular Windows PowerShell or Command Prompt), never ISE. If Docker is already stuck:

{{< cmd >}}wsl --shutdown{{< /cmd >}}

Then start Docker Desktop, wait for **Engine running**, and from the lab folder:

{{< cmd >}}docker compose up -d{{< /cmd >}}

## What to take from it

- **Test the simplest thing first.** A one-line command with no terminal (`hostname`) separated "Docker is broken" from "interactive sessions are broken".
- **One stuck session can jam everything after it.** Reset before drawing conclusions from the next test.
- **Change one thing at a time.** Here, Docker was updated and the window changed back to back, so strictly either could be the fix. The check that settles it: run `bash` once more in ISE on the new version. (Not run yet, so treat the cause as very likely, not proven.)
- **Odd warnings are clues.** The red text was the first sign the window was wrong.
