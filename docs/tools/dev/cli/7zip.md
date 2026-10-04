---
description: "Compress and extract every archive format, from the right-click menu or the command line."
url: "https://www.7-zip.org/"
status: active
kind: app
platforms: [windows]
image: 7zip.png
---

# 7-Zip

7-Zip opens just about every archive format (zip, 7z, tar, gz, rar, iso…) and creates 7z archives much more compact
than zip. On Windows it adds itself to the right-click menu, and its `7z` command is used in scripts.

## How I use it

Most of the time, it is a right-click to extract. On the command line:

```powershell
7z x archive.7z                  # extract, keeping the folder structure
7z a archive.7z folder/          # create an archive
7z a -mx=9 archive.7z folder/    # maximum compression
7z l archive.zip                 # list contents without extracting
7z a -p -mhe=on secret.7z folder/    # encrypt, including the file list
```

To zip a project folder without its `node_modules` and other useless files, I rather use a [CortX](/projects/cortx)
global script, `zip_it`, which handles exclusions.
