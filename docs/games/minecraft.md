---
origin: installed
category: gaming
url: https://www.minecraft.net/
description: Sandbox game of building and exploration
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/minecraft.png
---

# Minecraft

Minecraft is the quintessential sandbox game -- a procedurally generated world made of blocks where you decide what to do. There is no mandatory storyline. You mine resources, craft tools, build structures, and explore an essentially infinite world. It has sold over 300 million copies and remains one of the most played games in the world, with a community that spans from casual builders to competitive speedrunners.

## Gameplay Modes

### Survival

The core experience. You start with nothing, punch trees, craft a pickaxe, and work your way up from a dirt hut to a fortress. Hunger, health, and hostile mobs at night keep the pressure on. The loose progression path goes: wood tools, stone, iron, diamond, netherite. There is an optional "final boss" (the Ender Dragon) but most of the game is about the journey.

### Creative

Unlimited resources, flight, no health bar. This is the mode for building without constraints. Useful for prototyping redstone contraptions, designing large builds, or just messing around.

### Hardcore

Survival on hard difficulty with one life. Death deletes the world (or converts it to spectator mode). Not for the faint-hearted, but it makes every decision feel meaningful.

### Adventure

Designed for custom maps. Players cannot break or place blocks unless the map creator allows it through specific tool tags. Used mainly by map makers and server communities.

## Java vs Bedrock Edition

This is the most common source of confusion for new players.

| Feature | Java Edition | Bedrock Edition |
|---|---|---|
| Platform | PC only (Windows, Mac, Linux) | Windows, consoles, mobile |
| Modding | Extensive (Forge, Fabric, NeoForge) | Limited (add-ons, marketplace) |
| Redstone | Quasi-connectivity, more quirks | Simpler, fewer exploits |
| Servers | Self-hosted, community servers | Realms, featured servers |
| Performance | Needs optimization mods | Generally better out of the box |
| Combat | 1.9+ attack cooldown system | Spam-click (pre-1.9 style) |

If you want mods and technical play, Java is the way to go. If you want cross-platform play with friends on consoles or mobile, Bedrock is the choice. Buying through the Microsoft Store or minecraft.net now gives you both editions on PC.

## Modding Ecosystem

Minecraft's modding scene is one of the largest in gaming. The main mod loaders are:

- **Forge / NeoForge** -- The veteran loader. Most large content mods (Create, Mekanism, Botania) target Forge. NeoForge is a community fork that continues active development.
- **Fabric** -- Lightweight and fast-updating. Preferred for performance mods (Sodium, Lithium, Iris) and utility mods. Tends to update to new Minecraft versions faster than Forge.

Mods are primarily found on [CurseForge](/games/mods/curseforge) and Modrinth. Modpack launchers like **Prism Launcher** (open-source) or the CurseForge app handle installation and dependency management.

### Essential Performance Mods (Fabric)

- **Sodium** -- Massive rendering performance boost, far better than OptiFine
- **Lithium** -- Server/game logic optimization
- **Iris** -- Shader support compatible with Sodium (uses OptiFine shader packs)

## Shaders and Resource Packs

**Shaders** transform the visual experience with dynamic lighting, shadows, reflective water, and volumetric fog. Popular shader packs include Complementary Shaders, BSL, and Sildur's Vibrant. On Fabric, use Iris as the shader loader. On Forge, OptiFine is the traditional option.

**Resource packs** (formerly texture packs) change block and item textures without mods. Faithful keeps the vanilla style at higher resolution. Patrix and NAPP go for photorealism. Resource packs are installed by dropping them into the `resourcepacks` folder.

## Useful Keybinds

| Key | Action |
|---|---|
| **F3** | Debug screen (coordinates, FPS, biome, light level) |
| **F3 + G** | Show chunk borders |
| **F3 + B** | Show hitboxes |
| **F3 + A** | Reload chunks |
| **F5** | Toggle camera perspective (first/third person) |
| **F2** | Screenshot |
| **Tab** | Player list (multiplayer) |

The F3 debug screen is indispensable -- it shows your exact coordinates, the direction you face, the biome, light level, and memory usage.

## Multiplayer and Servers

Minecraft multiplayer ranges from small private servers to massive networks with thousands of concurrent players. Notable server types:

- **Hypixel** -- The largest Java server. Minigames like Bedwars, Skyblock, and SMP.
- **Survival Multiplayer (SMP)** -- Vanilla or lightly modded shared worlds.
- **Anarchy servers** (2b2t) -- No rules, no resets.
- **Realms** -- Official subscription service for small private servers (up to 10 players). Simple but limited.

For self-hosting, the vanilla server jar is free. For better performance and plugin support, use **Paper** or **Purpur** (forks of Spigot/Bukkit).
