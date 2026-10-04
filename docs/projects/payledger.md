---
sidebar_position: 4
description: My income, payslips, taxes and paperwork, in a 100% local desktop app that I also drive with an agent.
status: active
kind: project
platforms: [windows]
stack: [Tauri 2, Rust, SQLite, React]
image: payledger.png
---

# PayLedger

Payslips, income, taxes and the paperwork that goes with them often end up scattered across PDFs, spreadsheets and
folders. PayLedger brings them together in a desktop app, and helps me prepare my tax return every year. Since this is
some of the most sensitive data there is, the starting rule is simple: **the app sends nothing anywhere**. No account,
no server, no sync.

The other idea of the project is that I hardly type anything myself: an AI agent reads the documents and fills the app
in for me, and I check. That is what makes the tool genuinely usable day to day.

The repository is private; this page describes how the app works, never what it contains.

## What PayLedger does

### Income

You first declare your activities: a job, a self-employed activity, a side project. For each job, one payslip per
month, with the amounts that matter (gross, net, taxable, tax withheld at source). Other income has its own tracking:
expected income stays "to be received", with its original currency, and only counts in the totals once received. Tax
and contribution payments complete the picture. For a self-employed activity, PayLedger keeps the receipts ledger,
printable or exportable as a spreadsheet-ready CSV.

### Tax return

Each tax year has its page. PayLedger automatically adds up the amounts to report in each box of the return, keeping
the lines I entered by hand. It reconciles the employer's annual statement with the sum of the payslips and flags the
slightest difference, lists the supporting documents expected for the year, then produces a summary page to print or
save as PDF. It prepares the figures; it does not compute the tax due and is no substitute for tax advice.

### Paperwork

Income comes with procedures: organisations with their identifiers, cases that last for months, deadlines not to
miss. Each procedure has its dated log, its documents and its links to the entries concerned (a refund, a payment).
Tasks have a due date, notes are written in Markdown, and reusable papers (ID, bank details…) have an expiry date that
triggers an alert before it passes.

### Documents

Every supporting document is copied into a vault managed by the app. It is stored there by its SHA-256 hash: a file is
only stored once, even when attached to a payslip, a procedure and a tax return. It is imported by drag and drop, the
app guesses its category and date from its name, and a viewer shows it without leaving PayLedger.

Around all that: a dashboard with a "to do" card, a timeline, a command palette (`Ctrl+K`) and a history of every
change, with its origin.

## With an agent

Filling in this kind of app by hand is exactly the job that gets put off: open a PDF, copy ten amounts without a
mistake, file the document, do it again next month. With an agent such as
[Claude Code](/tools/ai/coding/claude-code), entering data becomes one sentence, and all I do is check.

| I ask… | The agent… |
|---|---|
| "Here is my September payslip" | reads the PDF, enters the payslip with its amounts, imports and attaches the document, then shows me what it entered |
| "Prepare this year's tax return" | runs the preparation, checks the reconciliation with the employer's statement, lists missing documents and explains where each amount comes from |
| "I got a letter from such organisation" | creates or completes the procedure, adds the event to the log, attaches the scan and creates the task with its deadline |
| "How much tax was withheld this year?" | queries the database read-only and answers with the details |

The `payledger` CLI is built for this. All its commands answer in JSON; `payledger docs` prints a guide written for
agents (the data model, typical workflows, the rules), and `payledger schema` describes every command and its
arguments, so the agent does not have to guess. A read-only SQL query command lets it answer any question with no risk
of writing. There is no automatic PDF extraction in the app: the agent reads the document with its own tools, which
works with any payslip layout.

The guide sets a few rules, because a mistake here has consequences: confirm before any deletion, take a full export
before a series of writes, never round or make up an amount, and present the tax return preparation as a draft to
check. Every change made by the agent is marked as such in the history: I always know what came from it.

## How it is built

<Diagram
  name="payledger-architecture"
  alt="The desktop app and the CLI call the same Rust library, which writes to a SQLite file and the document vault; everything stays on the machine."
/>

All the logic lives in a Rust library, `payledger-core`: data access, tax return preparation, receipts ledger, export,
change log. The desktop app ([Tauri](/tools/dev/web-desktop/tauri) 2 and [React](/tools/dev/web-desktop/react)) and the
CLI are just two front doors to it: nothing can be done in one that cannot be done in the other. It is the same
organisation as [CortX](/projects/cortx), and it is what lets an agent do everything through the CLI. The CLI actually
ships with the app and is updated with it.

The data fits in **one SQLite file**. That choice is deliberate: no service to install, reliable transactions, and a
backup that comes down to copying a file. Documents sit next to it with relative paths: the whole folder moves from
one machine to another without breaking, and an environment variable points the app to another one, handy to try
something on a copy.

The CLI and the app work on the same database at the same time. The app watches the SQLite file: when the agent writes
while the app is open, it reloads its data by itself, and I see the payslip appear while the agent works.

## Backup and restore

An export produces a complete ZIP archive: a consistent copy of the database, one JSON file per table (readable
without PayLedger), the documents, and a manifest with every file's hash. Import offers three modes: replace, merge, or
a dry run to see what would change without writing anything, and it takes an automatic backup before starting.

## Privacy

The app itself sends nothing: no telemetry, no account, and its only network access is checking for its own updates, through a
[relay](/setup/tauri-updates) since the repository is private.
The data is not encrypted by PayLedger: the operating system's disk encryption protects it if the machine is stolen.

There is one exception, and it is intended: **whatever I show the agent goes through its conversation**. When Claude
reads a payslip or the result of a query, that information is sent to the model, like anything it is given to read.
That is the price of the help it brings, and I choose what it sees, request by request.

## Where it stands

PayLedger is at version 0.7 (October 2026) and only runs on Windows for now. It moves in waves, following the tax
year: the foundations in spring, the tax return in summer, paperwork and payment tracking in the autumn.
