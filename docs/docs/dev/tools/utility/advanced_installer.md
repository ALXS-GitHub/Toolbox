---
origin: installed
category: dev
url: https://www.advancedinstaller.com/
description: Professional Windows installer authoring tool
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/advanced_installer.png
---

# Advanced Installer

[Advanced Installer](https://www.advancedinstaller.com/) is a GUI-based tool for building Windows installers. It produces MSI, MSIX, and App-V packages without writing WiX XML or InstallShield scripts by hand. You design the installer visually -- files, registry entries, services, shortcuts, prerequisites -- and Advanced Installer generates the underlying Windows Installer database.

## What it covers

The project editor is organized into views that map to installer concerns:

- **Files and Folders** -- define what gets installed and where.
- **Registry** -- create, modify, or delete registry keys during installation.
- **Services** -- install and configure Windows services with start type, recovery actions, and dependencies.
- **Custom Actions** -- run scripts, executables, or PowerShell at specific points in the install sequence.
- **Prerequisites** -- bundle or detect dependencies like .NET runtimes, Visual C++ redistributables, or SQL Server.
- **Dialogs** -- customize the installer UI with a drag-and-drop dialog editor.

It also handles upgrades, patches, silent install parameters, and digital signing of the output package.

## Editions

The **free edition** covers basic MSI creation and is sufficient for simple desktop applications. Professional and Enterprise editions unlock MSIX packaging, IIS configuration, App-V builds, custom prerequisite logic, and the command-line build interface for CI/CD integration. A project created in the free edition can be upgraded later without rebuilding from scratch.
