---
origin: installed
category: dev
url: https://www.7-zip.org/
description: Multi-format file archiver with high compression ratios
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/7zip.png
---

# 7-Zip

**[7-Zip](https://www.7-zip.org/)** is a free, open-source file archiver. Its native 7z format uses LZMA2 compression and typically achieves 30–70% better compression than ZIP on equivalent data. Beyond 7z, it can pack and unpack ZIP, TAR, GZIP, XZ, BZIP2, WIM, and Zstandard, and extract from 20+ read-only formats including RAR, ISO, DMG, CAB, MSI, and NTFS images.

On Windows it integrates into the right-click context menu for quick GUI operations, but the real power lives in the `7z` CLI.

## Installation

```powershell
scoop install 7zip
```

## CLI usage

Create and extract:
```powershell
7z a archive.7z folder/         # Create 7z archive from a folder
7z a -mx=9 archive.7z folder/   # Maximum compression
7z a archive.zip folder/        # Create ZIP instead
7z x archive.7z                 # Extract preserving directory structure
7z e archive.7z                 # Extract flat (all files into current dir)
```

Inspect and verify:
```powershell
7z l archive.7z                 # List contents
7z t archive.7z                 # Test integrity
7z x archive.7z "*.txt"         # Extract only .txt files
```

Encryption:
```powershell
7z a -p archive.7z folder/      # Password-protected archive (prompts for password)
7z a -p -mhe=on archive.7z folder/  # Also encrypts the file listing
```

The main flags to remember: `a` (add), `x` (extract with paths), `e` (extract flat), `l` (list), `t` (test), `-mx=N` (compression 0–9), `-p` (password). Free and open-source under LGPL.
