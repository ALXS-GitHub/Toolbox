---
sidebar_position: 4
description: Comment rien de personnel ne quitte la machine, même par erreur.
---

# Garde-fous

Le dossier de Claude Code contient des choses qui ne doivent jamais en sortir : les identifiants de connexion,
l'historique des conversations, les transcriptions, la mémoire. Versionner la configuration dans ce même dossier
n'est raisonnable que si une fausse manœuvre ne peut pas les embarquer. Trois barrières s'en chargent, chacune
rattrapant ce que la précédente aurait laissé passer.

<Diagram
  name="harness-commit"
  alt="Les fichiers modifiés passent la liste blanche à git add, le hook pre-commit au commit, puis sont signés et poussés en SSH vers le dépôt privé ; le hook bloque le commit en cas de problème."
/>

## 1. Une liste blanche plutôt qu'une liste noire

Le `.gitignore` commence par tout ignorer (`/*`), puis autorise un par un les fichiers du dépôt : les réglages, le
`CLAUDE.md` global, la statusline, les scripts, le dossier des skills. Un nouveau fichier créé par Claude Code, une
transcription, un cache ou un fichier d'identifiants est donc ignoré d'office : il faudrait l'ajouter exprès à la
liste pour qu'il entre.

En dessous, quelques motifs défensifs s'appliquent même dans les dossiers autorisés : tout fichier dont le nom
contient `token`, `secret`, `password` ou `credential`, les `.env`, les clés et les fichiers `*.local.*`. C'est pour
cette raison que le fichier de variables du [design commun](/setup/claude-code/design) s'appelle `variables.json` et
pas `tokens.json`.

## 2. Un hook avant chaque commit

Le hook `pre-commit` relit chaque fichier indexé et bloque le commit au moindre doute. Il fait quatre contrôles :

| Contrôle | Ce qui est bloqué |
|---|---|
| Noms et dossiers | les fichiers d'identifiants ou de config MCP, les `.env`, les clés, et tout ce qui vient d'un dossier d'état (projets, sessions, caches, plugins…) |
| Motifs de secrets | les clés d'API connues (Anthropic, OpenAI, GitHub, Slack, AWS, Google), les JWT, les clés privées, les webhooks, les chaînes de connexion avec mot de passe, `token = …` |
| Adresses e-mail | toute adresse autre que la mienne et les adresses techniques (`noreply`, `example.com`) |
| Réglages | les clés de `settings.json` faites pour porter des secrets (`env`, `apiKeyHelper`, `mcpServers`…) |

Quand il bloque, il affiche le fichier, la ligne et la raison. Il ne lit pas son propre contenu (il contient les
motifs qu'il cherche) et, pour les fichiers binaires, seul le nom est contrôlé. Le contourner avec `--no-verify`
reste possible, mais seulement après avoir relu le diff à la main.

Le hook est versionné avec le reste, et c'est le script d'installation qui l'active avec
`git config core.hooksPath .githooks`. Sur une nouvelle machine, il est donc en place avant le premier commit.

## 3. Des commits signés, un push par SSH

Chaque commit est signé avec une clé SSH qui vit dans mon gestionnaire de mots de passe, jamais sur le disque. Git
l'utilise à travers l'agent SSH du gestionnaire (`gpg.format = ssh`, `commit.gpgsign = true`), qui demande mon
autorisation avant d'utiliser la clé ; le push passe par le même agent. Sans le gestionnaire déverrouillé, aucun
commit ne peut être signé ni poussé, et GitHub affiche chaque commit comme vérifié.

## Pourquoi trois barrières

Chacune couvre un angle mort des autres. La liste blanche empêche les fichiers d'entrer sans qu'on y pense, mais pas
un secret collé dans un fichier autorisé : c'est le rôle du hook. Le hook rattrape ce qu'il reconnaît, mais un
commit fait par erreur reste un commit : comme la signature et le push passent par le gestionnaire de mots de
passe, rien ne part sans moi. Le même principe sert à ce site, public : un contrôle refuse au build toute adresse, tout chemin personnel
et tout lien vers un dépôt privé.
