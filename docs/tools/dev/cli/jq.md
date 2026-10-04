---
description: "Read, filter and transform JSON on the command line."
url: "https://jqlang.org/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: jq.png
---

# jq

jq is to JSON what `grep` and `sed` are to text: it reads JSON, applies a filter and prints the result. Since all my
recent tools answer in JSON (`--json` in the [Zorg](/projects/zorg/agents), [CortX](/projects/cortx) or `gh` CLIs), it
is the tool that extracts exactly what is needed.

## How I use it

```bash
cortx project list --json | jq -r '.[].name'               # one value per line, no quotes
gh pr list --json number,title | jq '.[] | select(.title | test("fix"))'
jq '.dependencies | keys' package.json                     # an object's keys
jq '[.[] | {name, version}]' data.json                     # keep only some fields
```

Filters chain with `|`: `.field` reads a field, `.[]` walks an array, `select()` filters, `map()` transforms. `-r`
prints raw values, `-c` compact one-line JSON, and `.field // "default"` provides a fallback.

To work out a complicated filter, the [online playground](https://play.jqlang.org/) is more comfortable than the
terminal.

AI agents use it a lot: they often pipe a large JSON answer through `| jq` to boil it down before reading it.
