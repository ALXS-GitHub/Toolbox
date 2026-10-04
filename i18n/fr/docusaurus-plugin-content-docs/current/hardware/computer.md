---
description: "Mon PC fixe, monté en 2026 : un Ryzen 7 9800X3D et une RX 9070 XT, pour coder la journée et jouer le soir."
status: active
kind: hardware
image: icons/pc-case.svg
sidebar_position: 1
---

# Mon PC

Mon ordinateur principal est un PC fixe que j'ai assemblé à l'été 2026, pour remplacer mon
[ancien portable](/archive/hardware/asus-tuf-f17). Il sert à tout : développer la journée — compiler du Rust, faire
tourner plusieurs serveurs de dev et des agents en parallèle — et jouer le soir, surtout à des jeux compétitifs en
1440p sur un écran 240 Hz.

## La configuration

| Pièce | Modèle |
|---|---|
| **Processeur** | AMD Ryzen 7 9800X3D (8 cœurs, 16 threads) |
| **Carte graphique** | Gigabyte Radeon RX 9070 XT Gaming OC ICE, 16 Go |
| **Carte mère** | Gigabyte B850 AORUS ELITE WIFI7 ICE |
| **Mémoire** | 32 Go DDR5-6000 CL30 (2 × 16 Go Kingston Fury Beast, profil EXPO) |
| **Stockage** | Samsung 990 EVO Plus, 2 To NVMe, et un SSD externe Crucial X10 Pro de 2 To |
| **Refroidissement** | Thermalright Peerless Assassin 120 SE ARGB |
| **Boîtier** | Lian Li LANCOOL 217 INF |
| **Alimentation** | Corsair RM850e, 850 W |

Pas de carte son, de carte réseau ni de lecteur : la carte mère fournit l'audio, l'Ethernet 2,5 Gb, le Wi-Fi 7 et le
Bluetooth. L'ensemble est blanc, des composants au boîtier.

## Les choix

- **Le 9800X3D** et son grand cache L3 empilé (la technologie *3D V-Cache*) : c'est le processeur le plus rapide en jeu,
  et ses 8 cœurs suffisent largement à mes compilations. En 1440p, c'est de toute façon la carte graphique qui limite.
- **La RX 9070 XT** : le meilleur rapport performance/prix pour jouer en 1440p à haute fréquence.
- **32 Go de DDR5-6000 CL30** : la fréquence idéale pour ce processeur, avec des latences basses.
- **Un boîtier pensé pour la circulation d'air** et un ventirad à double tour : le 9800X3D reste frais et silencieux
  sans watercooling.
- **Une carte mère B850** plutôt qu'une X870 : tout ce qu'il faut (Wi-Fi 7, trois emplacements M.2, USB-C en façade),
  sans payer pour l'overclocking.

## Autour

- **Écrans** : un 27" 240 Hz pour jouer et coder, et un second 27" en appoint — voir [Mes écrans](/hardware/monitors).
- **Périphériques** : [clavier](/hardware/accessories/keyboard), [souris](/hardware/accessories/mouse) et
  [casque](/hardware/accessories/headset).
- **Système** : Windows 11, avec mon environnement remonté à partir de [CortX](/projects/cortx) et de mon
  [harness Claude Code](/setup/claude-code/new-machine).
