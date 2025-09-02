---
origin: installed
category: desktop
url: https://www.radmin-vpn.com/
location: 
description: Free virtual LAN tool to create/join secure VPN networks for games & remote access
use_state: sometimes
sidebar_custom_props:
  image: /images/radmin_vpn.png
---

# Radmin VPN

[Radmin VPN](https://www.radmin-vpn.com/) is a free VPN application that lets you create a virtual LAN over the internet. Machines that join the same Radmin VPN network see each other as if they were on the same local network, which is especially handy for older games that only support LAN play, simple file sharing, or lightweight remote access scenarios.

## What It Does

- Creates a virtual network adapter with a private address.
- Allows you to create password‑protected networks hosted via Radmin infrastructure (no port forwarding required).
- Enables LAN discovery/broadcast for many games and tools that rely on local network presence.

## Quick Usage

1. Install and launch Radmin VPN.
2. Choose: Create Network or Join Network.
    - Create: Give it a Network Name + Password (share both with trusted friends).
    - Join: Enter the host's Network Name + Password.
3. Once connected, you see a list of peers with their virtual IP addresses and status.
4. Start your game/application and choose its LAN / Local Network option. Peers should appear as if they were on the same physical network.
5. (Optional) Right‑click a peer to Copy IP for direct connections (e.g., some games let you enter an IP manually).

## Typical Use Cases

### General Use Cases

- Play older or LAN‑only multiplayer games over the internet.
- Simple ad‑hoc virtual LAN for quick file sharing or testing.
- Lightweight alternative when you only need a flat layer‑2 style presence (without configuring a full site‑to‑site VPN).

### Personal Use Cases

- Playing Rocket League Workshop maps in multiplayer.
- Connecting to [K-Games](/docs/projects/k_games) servers for my friends.

## Tips & Notes

- Keep networks small and only share credentials with people you trust.
- Disable/exit Radmin VPN when not needed (adds an extra network adapter which some apps might prefer/route through).

## Limitations

- Not intended for high‑performance or large enterprise networking.
- No granular ACLs—security is mainly by network password.
- Traffic goes over the public internet; don’t rely on it for sensitive corporate data without additional encryption layers.

That’s all you generally need: create or join, launch the game/app, and select LAN.