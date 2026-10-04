---
sidebar_position: 2
description: PowerShell 7, un profil presque vide, et CortX qui génère le reste — prompt, alias, intégrations.
---

# Le terminal sous Windows

Mon environnement de terminal tient en peu de fichiers. Le profil PowerShell ne fait presque rien lui-même : il délègue
à [CortX](/projects/cortx), qui génère au démarrage tout ce qui donne au shell sa forme — le prompt, les alias, les
intégrations des outils. Le même ensemble d'alias existe ainsi pour PowerShell, bash, zsh et fish, et je ne le modifie
qu'à un seul endroit.

<Diagram
  name="windows-shell"
  alt="Le $PROFILE charge user_profile.ps1, qui exécute cortx init powershell ; le script généré installe le prompt, les alias et fonctions, zoxide et l'intégration au terminal CortX."
/>

## PowerShell 7

J'utilise **PowerShell 7**, installé avec [Scoop](/tools/dev/terminal/scoop), et plus du tout Windows PowerShell 5.1,
qui n'a même pas de profil. La version 7 est multiplateforme, plus rapide, et c'est celle que visent mes scripts — la
[statusline](/setup/claude-code/statusline) de Claude Code comprise.

## La chaîne du profil

Le fichier que PowerShell charge (`$PROFILE`, dans `Documents\PowerShell`) ne contient qu'une ligne : il charge
`~\.config\powershell\user_profile.ps1` s'il existe. Ce second fichier vit dans un petit dépôt de configuration privé,
avec mes thèmes de prompt et mes scripts. Il règle ce qui est propre à PowerShell, puis passe la main à CortX :

```powershell
# ~\.config\powershell\user_profile.ps1 (extraits)
[Console]::OutputEncoding = [Text.Encoding]::UTF8
Set-PSReadLineOption -EditMode Emacs -BellStyle None
Set-PSReadLineOption -PredictionSource History -PredictionViewStyle ListView   # si la console le permet
Set-PSReadLineKeyHandler -Key Ctrl+h -ScriptBlock { Switch-HistoryMode }      # liste ↔ suggestion en ligne

& cortx init powershell | Out-String | Invoke-Expression
```

La prédiction de PSReadLine propose les commandes de l'historique pendant la frappe. Elle n'est activée que si la
console sait l'afficher : dans un script, ou quand un agent lance PowerShell, elle provoquerait des erreurs.

## Ce que génère CortX

`cortx init powershell` produit, à chaque ouverture de terminal, un script complet à partir de la configuration que je
gère dans CortX :

- **le prompt** : posh-git, puis [Oh My Posh](/tools/dev/terminal/oh-my-posh) avec mon thème et sa palette de
  couleurs ;
- **[zoxide](/tools/dev/cli/zoxide)**, pour les commandes `z` et `zi` ;
- **les alias et fonctions** (tableau ci-dessous) ;
- **l'intégration au terminal de CortX** : quand le shell tourne dans ce terminal, il lui signale le dossier courant et
  le début et la fin de chaque commande, ce qui permet d'afficher les commandes en blocs et de notifier la fin des plus
  longues. Elle ne s'active que dans ce terminal.

| Alias | Rôle |
|---|---|
| `ls`, `ll`, `la`, `lt` | [eza](/tools/dev/cli/eza) : icônes, dossiers d'abord ; détaillé, fichiers cachés, arbre |
| `y` | [yazi](/tools/dev/cli/yazi), puis se placer dans le dernier dossier visité |
| `lg` | [lazygit](/tools/dev/cli/lazygit) |
| `gs`, `gp`, `gl` | `git status`, `git push`, `git log --oneline -20` |
| `vim` | [Neovim](/setup/neovim) |
| `c` | ouvrir le dossier dans VS Code |
| `cc` | [Claude Code](/setup/claude-code) sans demande de confirmation |
| `dc`, `py` | `docker compose`, `python` |
| `which`, `touch`, `less` | leurs équivalents Unix |
| `omp-theme`, `omp-color` | changer de thème de prompt, ou seulement de palette |

### Thèmes et palettes

Mon thème de prompt sépare la mise en page des couleurs : les segments (dossier, branche git, version de Node, heure,
code de sortie) font référence à des noms de couleurs, et une **palette** leur donne leur valeur. J'en ai une vingtaine
(Dracula, Nord, Rosé Pine, Tokyo Night…). `omp-theme` choisit un thème dans une liste filtrable, `omp-color` change
seulement la palette, et le choix est mémorisé pour les prochains terminaux.

### Des scripts accessibles partout

Mes petits scripts — convertir une image, retirer un fond, afficher une arborescence, zipper un dossier avec des
exclusions — sont déclarés dans CortX comme scripts globaux. Écrits en Python, ils s'exécutent avec
[uv](/tools/dev/runtimes/uv), sans environnement à préparer, et se lancent avec `cortx <script>` depuis n'importe quel
dossier. `cortx my_help` affiche l'aide-mémoire de mes commandes et raccourcis.

## Le terminal

Mon terminal, c'est **celui de [CortX](/projects/cortx)**, que j'ai écrit pour remplacer [Warp](/tools/dev/terminal/warp) :
des onglets en barre latérale, les commandes affichées en blocs, des suggestions tirées de l'historique, une
notification quand une longue commande se termine, et des sessions qui reviennent comme je les ai laissées, chaque
onglet dans son dossier. Il utilise la police Hack Nerd Font et un thème sombre assorti à la palette de mon prompt.
[Windows Terminal](/tools/dev/terminal/windows-terminal) reste configuré en secours (PowerShell 7 par défaut, même
police).

## Sur une nouvelle machine

1. Installer Scoop, puis PowerShell 7, Git, CortX et les outils de la ligne de commande.
2. Cloner le dépôt de configuration dans `~\.config\powershell`.
3. Écrire dans `$PROFILE` la ligne qui charge `user_profile.ps1`.
4. Restaurer les données de CortX (sa sauvegarde git) : les alias et scripts reviennent avec elles.

L'inventaire des outils à réinstaller est tenu par CortX lui-même, avec la méthode d'installation de chacun.
