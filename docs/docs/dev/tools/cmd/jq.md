---
origin: installed
category: dev
url: https://jqlang.github.io/jq/
description: Lightweight command-line JSON processor
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/jq.png
---

# jq

**[jq](https://jqlang.github.io/jq/)** is a command-line JSON processor — think `sed` or `awk`, but for structured data. It takes JSON as input, applies a filter expression, and outputs the result. This makes it essential for working with API responses, config files, or any JSON data from the terminal. Zero dependencies, single binary, MIT licensed.

## Installation

```powershell
scoop install jq
```

## Querying JSON

The simplest filter is `.` which pretty-prints and colorizes the input:
```powershell
cat data.json | jq '.'
curl -s https://api.example.com/users | jq '.'
```

Access fields with dot notation, iterate arrays with `.[]`, and chain filters with `|`:
```powershell
echo '{"name": "Alice", "age": 30}' | jq '.name'          # "Alice"
echo '{"name": "Alice", "age": 30}' | jq -r '.name'       # Alice (raw, no quotes)
cat users.json | jq '.[] | .name'                          # Every user's name
cat users.json | jq '.[0]'                                 # First element
```

## Filtering and transforming

Where jq really shines is combining filters. `select()` filters elements, `map()` transforms them, and you can reshape objects on the fly:
```powershell
cat users.json | jq '[.[] | select(.age > 25)]'           # Filter by condition
cat users.json | jq '[.[] | {name, email}]'               # Pick specific fields
cat data.json | jq '{key: .name, val: .score}'            # Reshape an object
cat data.json | jq 'sort_by(.name)'                       # Sort an array
cat data.json | jq 'group_by(.category) | map(length)'   # Count per category
```

## Useful flags and patterns

Use `-r` for raw output (no quotes) when piping to other commands. `-c` gives compact single-line output. `-s` slurps multiple inputs into an array. `//` provides default values (`.name // "unknown"`), and `?` suppresses errors on missing fields.

The [jq playground](https://jqplay.org/) is great for experimenting with queries interactively before using them in scripts. jq can also construct JSON from scratch with `jq -n '{name: "test", value: 42}'`.
