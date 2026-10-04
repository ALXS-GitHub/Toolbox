---
sidebar_position: 9
description: Letting the agent use a website for me, with two ways of driving Chrome.
---

# The browser

Some tasks happen on a website: filling in an online procedure, fetching information behind a sign-in, checking how
an app I am building renders. Claude Code can drive Chrome in two ways, and I keep both because they are not useful
at the same moments.

## The Claude extension for Chrome

It is the first choice. The official extension connects Claude Code to the Chrome I already use, with my open
sessions: the agent opens a tab, reads the page, clicks, fills in fields, takes screenshots. It is installed once from
the Chrome Web Store, and Claude Code finds it on its own as long as Chrome is open.

## A CLI through the debug port

When the extension is not connected, or for a more mechanical task, a skill goes through a small CLI that drives
Chrome through its debug port (the CDP protocol). Chrome must then have been started with
`--remote-debugging-port=9222`; if the port does not answer, the instruction is to tell me rather than retry in a
loop.

```bash
dev-browser --connect http://localhost:9222 <<'EOF'
  const pages = await browser.listPages();
  console.log(JSON.stringify(pages, null, 2));
EOF
```

The agent writes a short script, run in an isolated JavaScript sandbox: no Node, no modules, no network access outside
the browser, only what it takes to save a screenshot or a file. The API is close to Puppeteer: list tabs, navigate,
click, read the DOM, take a screenshot.

## I stay in control

In both cases the rule is the same: the agent prepares, I approve. It can fill in an administrative form, but it
clicks no irreversible button (confirm, sign, send, pay): I do that myself after reviewing. It never types a
password, a card number or an authentication code. A sign-in
to do, a code received by text message, a verification step: it leaves those to me.
