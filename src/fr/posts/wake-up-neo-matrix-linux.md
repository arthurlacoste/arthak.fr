---

author: art
date: 2006-04-16
updated: 2026-07-12
layout: post
slug: wake-up-neo-matrix-linux
title: En 2006, je voulais reproduire « Wake up, Neo » dans un terminal Linux
archive: true
categories:
- Parcours
- Développement
tags:
- linux
- bash
- matrix
- apprentissage
---

![Matrix Wake up](https://archives.irz.fr/wp-content/uploads/2010/02/matrix-wake-up.jpg)


Quand j’étais gamin, je cherchais à comprendre le hacking sous toutes ses formes.

À l’époque, les forums mélangeaient curiosité technique, défis idiots, tutoriels bien ficelés et pratiques franchement douteuses.

Il y avait des disclaimers pour expliquer les règles de chaque team, des méthodes pour attaquer une boîte mail, des chevaux de Troie à installer sur l’ordinateur des copains, et beaucoup de bruit autour de tout ça.

Ce n’était pas toujours très malin.

Mais c’est aussi comme ça que j’ai appris une partie des rudiments de l’informatique.

En bricolant.

En cassant des choses.

En essayant de comprendre pourquoi elles cassaient.

Et un très bon exemple, c'est le fameux  « Wake up, Neo » de *Matrix*.

L’idée était simple : reproduire dans un terminal cette scène culte où l’écran se réveille tout seul et affiche lentement :

> Wake up, Neo
> The Matrix has you
> Follow the white rabbit
> Knock, knock, Neo

Une image parle mieux :

![Animation Wake up Neo](https://archives.irz.fr/wp-content/uploads/2009/02/wakeup.gif)

Un matin, alors que je travaillais sur un serveur Debian avec PuTTY, j’ai eu envie de reprendre cette vieille idée.

Le but était surtout de créer un petit effet animé. Effacer l’écran, écrire chaque phrase caractère par caractère, attendre un peu, puis passer à la suivante.

Rien de très utile.

Donc évidemment indispensable.

## Version actuelle du script

Le script original mélangeait `sh` et Bash, et certains caractères avaient été cassés par l’import WordPress.

Voici une version fonctionnelle :

```bash
#!/usr/bin/env bash

type_slowly() {
  local text="$1"
  local pause_after="$2"
  local pause_clear="$3"
  local i

  printf '\n'

  for ((i = 0; i < ${#text}; i++)); do
    printf '%s' "${text:i:1}"
    sleep 0.1
  done

  sleep "$pause_after"
  clear
  sleep "$pause_clear"
}

matrix() {
  clear
  type_slowly "Wake up, Neo..." 2 1
  type_slowly "The Matrix has you" 3 1
  type_slowly "Follow the white rabbit." 2 2
  type_slowly "Knock, knock, Neo." 4 3
}

matrix
```

Enregistre-le dans un fichier :

```bash
wake-up-neo.sh
```

Rends-le exécutable :

```bash
chmod +x wake-up-neo.sh
```

Puis lance-le :

```bash
./wake-up-neo.sh
```

Le script fonctionne avec Bash sur Linux et macOS.
