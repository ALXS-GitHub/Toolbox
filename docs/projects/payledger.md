---
sidebar_position: 4
description: My income, payslips, taxes and paperwork, in a 100% local desktop app.
status: active
kind: project
platforms: [windows]
stack: [Tauri 2, Rust, SQLite, React]
image: payledger.png
---

# PayLedger

Payslips, income, taxes and the paperwork that goes with them often end up scattered across PDFs, spreadsheets and
folders. PayLedger brings them together in a desktop app, and helps me prepare my tax return every year. Since this is
some of the most sensitive data there is, the starting rule is simple: **everything stays on the machine**. No account,
no server, no sync.

The repository is private; this page describes how the app works, never what it contains.

## What PayLedger does

**Income.** Activities (employed or self-employed), monthly payslips with their amounts (gross, net, taxable, tax
withheld), other income with tracking of what is still to be received, and tax and contribution payments. For a
self-employed activity, a receipts ledger can be printed or exported as CSV.

**Tax return.** One page per tax year. PayLedger adds up the amounts to report in each box of the return, reconciles
the employer's annual statement with the sum of the payslips (and flags differences), lists the expected supporting
documents and produces a summary page to print. It prepares the figures; it does not compute the tax: it is not tax
advice.

**Paperwork.** Organisations, procedures with their dated log and documents, tasks and deadlines, notes, and reusable
papers (ID, bank details…) with an alert before they expire.

**Documents.** Every supporting document is copied into a vault managed by the app and stored by its SHA-256 hash: a
file is only stored once, even when attached to several items. A dashboard, a timeline and a history of every change
complete the picture.

## How it is built

<Diagram
  name="payledger-architecture"
  alt="The desktop app and the CLI call the same Rust library, which writes to a SQLite file and the document vault; everything stays on the machine."
/>

All the logic lives in a Rust library, `payledger-core`: data access, tax return computations, export, change log.
The desktop app ([Tauri](/tools/dev/web-desktop/tauri) 2 and [React](/tools/dev/web-desktop/react)) and the
`payledger` CLI are just two front doors to it: neither does anything the other cannot. It is the same organisation as
[CortX](/projects/cortx).

The data fits in **one SQLite file**. That choice is deliberate: no service to install, reliable transactions, and a
backup that comes down to copying a file. Documents sit next to it, in the vault, with relative paths: the whole thing
moves from one machine to another without breaking.

The CLI and the app can work on the same database at the same time. The app watches the SQLite file: when the CLI (or
an agent) writes to it, the app reloads its data by itself.

A full backup produces a ZIP archive: a consistent copy of the database, one JSON file per table, the documents, and a
manifest with every file's hash. Import offers a dry-run mode to check before writing, and takes an automatic backup
before each import.

## With an agent

The CLI is designed to be used by an AI agent: JSON output, a `schema` command that describes every command and its
arguments, a `docs` command that prints the usage guide for agents, and a read-only SQL query command. There is no
automatic payslip extraction: to enter one, the agent reads the PDF with its own tools, then calls the CLI with the
amounts. The guide gives it a few rules: confirm before any deletion, export before a series of writes, never round
or make up an amount.

## Privacy and limits

Nothing leaves the machine: no telemetry, no account, and the only network access is the app's update check. Every
change is logged with its source (interface, CLI or agent). The data is not encrypted by the app: the operating
system's disk encryption protects it if the machine is stolen. The app only runs on Windows for now.

## Where it stands

PayLedger is at version 0.7 (October 2026). It moves in waves, following the needs of the tax year.
