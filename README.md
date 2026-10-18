# ProfessionalProfile

Source for **www.netstatedata.ca**, the single source of truth for Jason R. McGinn's
professional profile. The public repo and its build are part of the proof.

## Layout

| Path    | What it holds                                                      |
|---------|--------------------------------------------------------------------|
| `site/` | The website: a Hugo project (custom theme, built from Markdown).   |
| `docs/` | Write-ups and build notes linked from the site.                    |

Runnable code and container examples live in their own repositories and are linked
from the relevant pages with run-it-yourself instructions.

## Build

Hugo (extended not required yet). From `site/`:

    hugo server    # local preview at http://localhost:1313
    hugo           # production build into site/public/

Deploys to Azure Static Web Apps via GitHub Actions on push to `main`.
