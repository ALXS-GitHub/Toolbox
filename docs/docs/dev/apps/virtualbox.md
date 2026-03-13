---
origin: installed
category: dev
url: https://www.virtualbox.org/
description: Open-source virtualization platform for running virtual machines
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/virtualbox.png
---

# VirtualBox

Need to test something on Ubuntu without leaving Windows? Want an isolated environment to experiment with a database migration before running it in production? That is exactly what **[VirtualBox](https://www.virtualbox.org/)** is for. It is a free, open-source hypervisor by Oracle that lets you run full operating systems inside virtual machines on your existing hardware.

## Creating a VM

The process is straightforward: click **New**, give the VM a name, pick the OS type, and allocate some RAM and disk space. Then mount an ISO in the storage settings, boot the VM, and install the OS as you normally would. Within a few minutes you have a running system that is completely isolated from your host.

VirtualBox supports Windows, Linux, Solaris, and many other guest operating systems. Networking is flexible -- NAT for basic internet access, bridged mode to make the VM appear as a separate machine on your network, or host-only and internal modes for isolated lab setups. Snapshots let you freeze the entire VM state at any point and roll back later, which is invaluable when you are about to try something risky.

## Why Guest Additions matter

After installing a guest OS, the first thing you should do is install **Guest Additions** (Devices > Insert Guest Additions CD image). Without them, the experience is rough -- the display runs at a fixed resolution, the mouse behaves awkwardly, and there is no shared clipboard. Guest Additions install paravirtualized drivers that unlock auto-resizing displays, seamless mouse integration, shared folders between host and guest, drag-and-drop file transfer, and significantly better graphics performance. It is the difference between a usable VM and a frustrating one.

## The Extension Pack

Separately from Guest Additions, the **Extension Pack** (free for personal and educational use) adds USB 2.0/3.0 passthrough, disk encryption, Remote Desktop access, and NVMe support. Download it from [virtualbox.org](https://www.virtualbox.org/wiki/Downloads) and install it through File > Preferences > Extensions.

For best performance, make sure VT-x (Intel) or AMD-V is enabled in your BIOS, and be generous with RAM and CPU allocation -- a starved VM is a slow VM.
