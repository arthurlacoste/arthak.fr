---
author: art
date: 2017-06-02
updated: 2026-07-12
layout: post
slug: jekyll-liquid
title: "Liquid : quand une contrainte devient un langage"
archive: true
categories:
  - Développement
tags:
  - Jekyll
  - Liquid
  - GitHub Pages
  - contraintes
---

Quand je construis un site "static", avec Jekyll sur GitHub Pages, je finis toujours par vouloir faire quelque chose qui n’est pas prévu. Au départ, tout va bien : quelques fichiers Markdown, des layouts, des données en YAML et un dépôt qui se transforme gratuitement en site statique. Merci Micorosft

Puis arrive la petite fonctionnalité en plus.

Jekyll permet normalement d’écrire des plugins en Ruby.C'est la toute sa puissance. Mais GitHub Pages génère les sites en mode sécurisé. Les plugins ne sont -pour la plupart - pas autorisés. 

Aujourd’hui, ça marche avec GitHub Actions, mais je ne suis pas sur que ça existait vraiment à l'époque.

Dans caisse à outil, il n'y avait qu'un trésor : Liquid.

Liquid permet d’afficher des variables, de parcourir des listes, de poser des conditions et de transformer des valeurs avec des filtres. Ce n’est pas vraiment un langage de programmation complet. Il manque plein de choses, parfois volontairement, parfois juste pour nous faire perdre une demi-journée sur une boucle qui aurait pris trois lignes ailleurs.

Mais il y en a suffisamment.

Et si on sait prendre son mal en patience, on peut faire une sorte de plugin sans plugin.

Ce n’est pas toujours très beau. Certaines contournement ressemblent à un meuble IKEA qui a subi 3 déménagement,  avec trois vis différentes, une cale en carton et  l'espoir que personne ne viendra regarder de près. Mais ça fonctionne. Le site reste statique, le dépôt reste compatible avec GitHub Pages et je n’ai pas besoin de sortir de l’environnement prévu.

Ce qui est assez drôle, c’est que Liquid ne vient pas de Jekyll. Shopify (ce mastodonte du e-commerce) le crée en Ruby et l’utilise en production depuis 2006 comme moteur de ses thèmes. Il permet aux boutiques d’afficher leurs produits, leurs collections, leurs prix et leurs contenus sans donner aux créateurs de thèmes un accès libre au code qui tourne derrière la plateforme.

Le problème ressemble beaucoup à celui de GitHub Pages. Shopify veut laisser des milliers de personnes personnaliser leurs boutiques, mais ne veut évidemment pas leur permettre d’exécuter n’importe quoi sur ses serveurs. Liquid devient donc cette couche intermédiaire : assez souple pour construire des interfaces très différentes, mais suffisamment limitée pour rester contrôlable.

Et c’est probablement là que Liquid se démocratise vraiment. Pas seulement comme un petit moteur de templates utilisé dans un générateur de blogs, mais comme l’outil qui fait tourner une immense quantité de boutiques en ligne. Le même principe sert à générer une page d’article statique dans Jekyll ou une fiche produit dynamique dans Shopify : des données d’un côté, un template de l’autre, et une couche de logique entre les deux.

Liquid est frustrant précisément parce qu’il n’essaie pas de tout faire. Il ne donne pas l’accès à la machine. Il donne une ouverture suffisamment grande pour modifier le résultat sans pouvoir démonter tout le système.

Avec le recul, c’est une mécanique que je retrouve souvent dans mes projets. Une plateforme impose une limite, alors je commence par chercher ce qu’elle permet encore. Puis je pousse cette petite ouverture jusqu’à ce qu’elle devienne presque une fonctionnalité complète.

Ce n’est pas forcément la meilleure manière de développer. Parfois, il faudrait simplement choisir un autre outil.

Mais il y a quelque chose de très satisfaisant à prendre une contrainte au sérieux, puis à découvrir qu’elle laisse quand même assez de place pour construire autre chose.
