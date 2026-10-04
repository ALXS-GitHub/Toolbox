---
description: KPop music games
status: paused
kind: project
image: k_games.png
---

# K-Games

K-Games (private repository) is a game project focused on KPop music games, providing an interactive platform for fans to enjoy their favorite music through fun mini-games.

The games you can play include Versus songs battles and blind tests.

For now this project is private and only accessible to my friends.

## Installation

First make sure to contact me, and I will provide a desktop installer for the application. (Quick note, the installer is built with [Tauri](../tools/dev/web-desktop/tauri.md)). Once you have the installer, simply run it and follow the on-screen instructions to complete the installation.

## Usage

In order to use the application, I have to be connected (as I am the only person with access to the code, and especially the backend). I should then run the backend server and websocket backend.

It is very important that the backend server is running because there is no offline mode available.

Then in order for other users to connect, we need a way to make our computers communicate. This can be done using [Radmin VPN](../archive/system/radmin-vpn.md). Also the host need to make sure that the firewall is configured to allow connections on the necessary ports (the ports used by the backend and websocket).

Users should be able to connect by specifying the host's IP address of the host and the port number inside the application settings.

Once all of this is done, the users are able to play, either on solo mode or in multiplayer mode.