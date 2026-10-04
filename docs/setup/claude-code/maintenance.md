---
sidebar_position: 10
description: What to redo after a change, and the small periodic review.
---

# Maintenance

A harness wears out like anything else: Claude Code evolves, settings get renamed, files pile up, examples age. This
page gathers the loops to follow after a change, then the review I do from time to time to keep everything clean.

## After changing a skill

A changed skill is only done once its examples are brought up to date and its copy is sent to claude.ai:

1. run the skill's script on its examples again (`render.py` or `build.py`) and look at the screenshots it produces;
2. commit, which goes through the [hook](/setup/claude-code/guardrails);
3. `skills.ps1 pack <skill>`, then replace the version on claude.ai (see [claude.ai](/setup/claude-code/claude-ai)).

## After changing the common design

A change in `_design` affects four skills at once:

```powershell
python skills/_design/scripts/build.py           # checks, then copies into each skill
python skills/_design/scripts/build.py --check   # later: reports an outdated copy
```

Then come each skill's examples, to bring up to date one by one, and a `pack` of the four skills. The design version
goes up with every change: a document produced earlier still carries the old one, so you know it can be regenerated.

## The periodic review

From time to time, and with every major Claude Code release, I go over a few points:

- **Settings.** A key renamed or deprecated by Claude Code, a setting that became the default: the file stays short if
  it only holds what matters.
- **Denied connectors.** A new connector added on claude.ai that duplicates a CLI joins the list; an abandoned CLI
  leaves it.
- **Project permissions.** Permissions granted along the way pile up in each project; remove the ones no longer used.
- **Leftovers.** Skill trash folders, old mod development folders, backup files: none of them gets into the
  repository thanks to the allow-list, but the folder is better kept readable.
- **The hook.** If Claude Code creates a new state folder, it joins the list of folders the hook rejects, on top of
  the allow-list.
- **Skill descriptions.** A skill that triggers wrongly, or not enough, is almost always fixed in its description (see
  [Skills](/setup/claude-code/skills)).
