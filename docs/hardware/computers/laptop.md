---
url: https://www.asus.com/uk/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-f17/
description: 17.3" gaming laptop with i7-11800H and RTX 3060
sidebar_custom_props:
    image: /images/asus_tuf_f17.png
---

# ASUS TUF Gaming F17 FX706HM

This is my main computer, the machine that runs everything. It is a 17.3-inch laptop that pulls double duty as a development workstation during the day and a gaming rig in the evening, and it has held up well in both roles since becoming my daily driver.

## Under the Hood

At the center is an Intel Core i7-11800H, an 8-core, 16-thread processor clocked at 2.3 GHz base with boost up to 4.6 GHz. For compiling Rust workspaces, running Docker containers, and spinning up dev servers in parallel, the thread count matters more than raw clock speed, and the 11800H delivers. Graphics come from a dual setup: an NVIDIA GeForce RTX 3060 Laptop GPU with 6 GB of GDDR6 handles gaming and GPU-accelerated tasks, while Intel UHD Graphics takes over during lighter workloads to save battery. The machine shipped with 16 GB of RAM across two 8 GB Samsung DDR4 sticks running at 3200 MHz, enough for most workflows, though heavy multitasking with multiple IDE instances and a browser full of tabs does push it.

Storage is an SK Hynix BC711 1TB NVMe drive on PCIe 3.0, rated at 3000 MB/s sequential read and 2500 MB/s write. Boot times are fast, project loads are fast, and there has been no reason to swap it out. The single terabyte fills up slower than you would expect when most work lives in code repositories rather than media files.

## The Display and Connectivity

The screen is an AU Optronics B173HAN04.9 panel, a 17.3" Full HD IPS display at 1920x1080 running 144 Hz. The size is the reason this laptop was chosen over 15-inch alternatives: having more vertical space for a terminal below the editor, or fitting two documents side by side without squinting, makes a tangible difference during long coding sessions. The 144 Hz refresh rate is smooth enough for competitive shooters without chasing the diminishing returns of higher-end panels.

Networking covers both scenarios well. Intel Wi-Fi 6 AX201 with 160 MHz channel width handles wireless, while a Realtek PCIe Gigabit Ethernet port is there for situations where latency matters or large transfers need to happen. The port selection is generous for a laptop: one USB-C 3.2 port with Thunderbolt 4 and DisplayPort 1.4 alt mode, three USB-A 3.2 ports, HDMI 2.0b, an RJ-45 jack, and a 3.5mm audio combo. Plugging in an external monitor, a wired mouse, and a USB microphone simultaneously has never required a dock or a hub.

## Built to Survive

The TUF line carries MIL-STD-810H certification, which means ASUS tested it against military-grade durability standards for drops, vibrations, humidity, and temperature extremes. Whether that matters day-to-day is debatable, but it does translate to a chassis that feels solid rather than flexy, and a hinge that still holds the screen at the right angle after years of daily open-close cycles.

The laptop runs Windows 11 Home (Build 26200), which has been stable enough to never seriously consider switching. Between WSL for Linux workflows and the native Windows ecosystem for everything else, it covers the ground that needs covering.

## Specs

| Component | Details |
|---|---|
| **CPU** | Intel Core i7-11800H (8 cores / 16 threads, 2.3–4.6 GHz) |
| **GPU** | NVIDIA GeForce RTX 3060 Laptop (6 GB GDDR6) + Intel UHD |
| **RAM** | 16 GB DDR4 3200 MHz (2x 8 GB Samsung) |
| **Storage** | SK Hynix BC711 1 TB NVMe PCIe 3.0 (3000 / 2500 MB/s) |
| **Display** | 17.3" FHD IPS 144 Hz (AU Optronics B173HAN04.9) |
| **WiFi** | Intel Wi-Fi 6 AX201 160 MHz |
| **Ethernet** | Realtek PCIe Gigabit |
| **Ports** | 1x USB-C 3.2 (TB4 / DP 1.4), 3x USB-A 3.2, HDMI 2.0b, RJ-45, 3.5 mm |
| **OS** | Windows 11 Home |
| **Certification** | MIL-STD-810H |
