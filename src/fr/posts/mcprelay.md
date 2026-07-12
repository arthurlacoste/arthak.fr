---
title: "J'ai contourné ChatGPT pour coder à l'infini pour 20 $/mois"
date: 2026-07-08
excerpt: J’ai construit une passerelle MCP locale pour relier ChatGPT dans le navigateur à mon ordinateur et continuer à travailler quand les outils de code dédiés atteignent leurs limites.
slug: mcprelay
categories:
- Développement
- Intelligence artificielle
tags:
- MCP
- ChatGPT
- Codex
- open source
---

Je paie déjà vingt dollars par mois pour ChatGPT.

Donc, avant de reprendre un abonnement ailleurs, d’acheter des crédits ou de tester le nouveau truc à la mode, je regarde jusqu’où je peux pousser ce que j’ai déjà.

Le problème, c’est que Codex finit par atteindre ses limites. Je rencontre trop souvent la limite sur cinq heures, sans parler de la limite hebdomadaire.

J’ai essayé les modèles locaux. Sur mon Mac, avec Ollama, j’ai lancé `qwen3.5:35b-a3b-coding-nvfp4`. Quand les influenceurs du token expliquent que l’on peut faire de l’inférence en local, mon MacBook Pro M2 Max avec 64 Go de mémoire ne semble pas très content. Et pas seulement parce que c’est l’été.

J’ai aussi testé OpenCode avec Big Pickle, ce qui est apparemment un vrai nom de modèle, ainsi que [0xzr/freellmpool](https://github.com/0xzr/freellmpool) et [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi), qui agrègent les offres gratuites de plusieurs fournisseurs.

Mais au bout du compte, le meilleur modèle facilement disponible reste souvent celui que je paie déjà dans ChatGPT.

Le souci, c’est qu’il ne peut pas vraiment toucher ma machine.

Donc j’ai construit [MCPRelay](https://github.com/arthurlacoste/MCPRelay).

C’est une passerelle MCP locale. Elle permet à ChatGPT de lancer des commandes, lire des fichiers, prendre des captures d’écran, piloter un navigateur et utiliser plusieurs outils sur mon ordinateur.

MCPRelay ne me donne pas des tokens illimités. Il me permet surtout de mieux utiliser ce que je paie déjà, au lieu d’ajouter immédiatement une nouvelle facture.

[Voir MCPRelay sur GitHub](https://github.com/arthurlacoste/MCPRelay)
