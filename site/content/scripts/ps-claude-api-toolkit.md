---
title: "PowerShell Claude API toolkit"
summary: "Call the Claude API from PowerShell with the key kept in KeePass, never on disk or on the command line."
hook: "A PowerShell toolkit for calling Anthropic's Claude API, with the key held in KeePass and kept out of the script, the command line, and the output."
layers: ["X3"]
accordion: "X3"
topics: []
status: "live"
visibility: "public"
language: "PowerShell"
repo: "https://github.com/jasonmcginn/ps-claude-api-toolkit"
run: ".\\Invoke-Claude-API-01.ps1 -Prompt \"Hello\""
pdf: ""
links: []
---

I wrote this toolkit to make calling Anthropic's Claude API simple and safe from Windows. The API key lives in a KeePass vault, and it is never stored in the script, typed on the command line, written to disk, or returned to the caller.

## Three ways to use it

- **As a script**, at the keyboard: `.\Invoke-Claude-API-01.ps1 -Prompt "Hello"` sends the prompt, prints the reply and the token usage, and ends with an exit code.
- **As a function**, from other PowerShell scripts: dot-source it and call `Invoke-Claude -Prompt "Hello"`, which returns an object carrying the reply text, model, token counts and an estimated cost. Several prompts can be piped through a single vault unlock.
- **From another program** (Python, C#, a batch file): run it with `-Json` and standard output carries exactly one JSON object, while status messages and the password prompt stay on standard error.

## How the key stays safe

The KeePass master password is asked for on each run and discarded the moment the vault opens; the API key exists in plain text only for the instant of the call. There is deliberately no way to pass the password as a plain command-line argument, since other programs on the machine can read those. A caller that already has it can hand it over as a SecureString, through standard input, or from an environment variable that is then cleared.

## What it records

Every call, successful or failed, adds one row to a usage CSV: time, model, label, token counts, estimated cost, response time and more, with the prompt and reply text never recorded. A companion script, `Get-ClaudeUsage-Report01.ps1`, turns that log into reports, and `Get-ClaudeBilling-Report01.ps1` summarizes spend. Errors go to a separate log, with anything shaped like a key masked as a safety net.

Built for Windows PowerShell 5.1 and PowerShell 7+, using the PoshKeePass module.
