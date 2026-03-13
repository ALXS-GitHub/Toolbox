---
origin: installed
category: dev
url: https://sqlitebrowser.org/
description: A high quality, visual, open source tool to create, design, and edit database files compatible with SQLite.
use_state: not used anymore
os: Windows
sidebar_custom_props:
    image: /images/db_browser_sqlite.png
---

# DB Browser for SQLite

**[DB Browser for SQLite](https://sqlitebrowser.org/)** makes SQLite databases visible. Instead of writing queries just to see what is inside a `.db` file, you open it and start browsing. The entire interface is organized around three tabs, each serving a distinct purpose.

**Database Structure** gives you the schema at a glance -- tables, indexes, views, and triggers laid out in a tree. You can create, rename, or modify any of these through the GUI without writing DDL by hand, which is especially useful when prototyping a schema or inspecting an unfamiliar database from a mobile app or Electron project.

**Browse Data** is the tab you will spend the most time in. It presents each table as a spreadsheet where you can sort, filter, add, edit, and delete records inline. For quick data inspection or manual corrections, this is faster than any SQL query.

**Execute SQL** is a proper query editor with syntax highlighting and full command logging. Results appear in a table below the editor, and here is where DB Browser reveals a surprisingly useful trick: you can plot graphs directly from query results. Need a quick bar chart or scatter plot from your data? No need to export to a spreadsheet -- just run the query and plot it in place.

The application also supports SQLCipher, which means you can open and work with encrypted SQLite databases -- the kind commonly found in iOS and Android apps that store sensitive data locally.

DB Browser is available for Windows, macOS, and Linux from [sqlitebrowser.org](https://sqlitebrowser.org/dl/). It handles CSV and SQL dump imports, exports to CSV, JSON, or SQL, and covers the full range of what you would want from a visual database tool for SQLite.
