---
title: J'ai fait ce jeu il y a seize ans
date: 2026-07-12
emoji: 🎮
excerpt: Le premier jeu de mon frère m’a fait repenser au Pong que j’avais codé en 2009, puis à tout ce qui a changé dans notre manière de développer avec l’IA.
---

La [sortie récente](https://maxyull.github.io/black-desert-idle/) du jeu de mon petit frère m’a fait repenser à mon premier jeu vidéo.

Pas vraiment à son gameplay, ni à ses graphismes.

Plutôt à la manière dont il l’a construit.

Mon frère n’a jamais été développeur. Il commence pourtant directement avec un vrai jeu HTML dans le navigateur, fabriqué avec Claude Code.

Sa première version fonctionne.

Elle tient aussi dans un seul fichier HTML de 10 000 lignes.

Et quelque part, c’est assez logique. Il demande à l’IA de faire un jeu, donc elle fait un jeu. Elle ne s’arrête pas forcément au milieu pour lui expliquer qu’il faudrait découper les responsabilités, créer plusieurs fichiers, ajouter des tests et penser à la personne  ou à l’agent qui va regarder son code ensuite.

Le résultat arrive avant la structure.

## Mon premier Pong

J’ai passé une bonne partie de mon enfance à jouer aux jeux vidéo. Ils ont occupé énormément de place dans ma vie jusqu’à mes seize ou dix-sept ans. Pokémon, Warioland, Kirby, pour ne citz qu'eux !

Quand j’ai commencé le développement, je voulais faire des jeux.

Mon premier, c’était [Pong](https://arthurlacoste.github.io/pong-x/). Enfin, ma version de Pong.

C’était en 2009.

Je suis à la fois fier et légèrement honteux quand je relis le code. Fier parce que j’ai réussi à fabriquer quelque chose qui fonctionnait. Honteux parce que j’ai passé un nombre assez absurde de nuits sur quelques lignes de JavaScript, avec des calculs redondants, des collisions fragiles et une organisation qui ressemblait davantage à une fouille archéologique qu’à un projet logiciel.

Mais je me souviens très bien de l’endroit où j’ai écrit ce code.

J’étais dans ma chambre étudiante, en première année de BTS informatique, persuadé que j’allais pouvoir refaire le monde en développant des outils.

Spoiler : ce n’est pas exactement ce qui s’est passé.

Seize ans plus tard, je me suis posé une question assez simple : combien de temps me faudrait-il aujourd’hui pour refaire Pong ?

Quelques minutes.

Peut-être même moins si je ne compte pas le temps passé à hésiter sur le prompt.

[Voir Pong 2026](https://arthurlacoste.github.io/pong-2026/)

<iframe
  class="embedded-game"
  src="https://arthurlacoste.github.io/pong-2026/"
  title="Pong 2026"
  width="100%"
  height="600"
  loading="lazy"
  allowfullscreen>
</iframe>

La nouvelle version fonctionne mieux. Elle utilise des fonctions JavaScript qui n’existaient pas, ou que je ne connaissais pas à l’époque. Les calculs sont plus simples. Les collisions sont moins bancales.

Mais ce n’est presque plus ça qui m’impressionne.

## L’IA ne donne plus seulement des réponses

Il n’y a encore pas si longtemps, même accompagné par une IA, un bug complexe pouvait me prendre une semaine.

Le modèle proposait une correction. Je modifiais le fichier. Je lançais les tests. Je copiais l’erreur. Je revenais dans le chat. Puis on recommençait.

L’IA réfléchissait.

Moi, je faisais la boucle.

Avec les harness, en 2026, la différence ne vient pas seulement de modèles plus intelligents. Elle vient surtout de ce qu’ils peuvent faire autour.

Lire le dépôt. Lancer une commande. Modifier plusieurs fichiers. Ouvrir le navigateur. Regarder ce qui casse. Lire les logs. Revenir en arrière. Tester autre chose.

Un agent peut rester dans le problème.

Il peut se tromper vingt fois dans la journée sans me demander de jouer au facteur entre le terminal, le navigateur et la conversation.

L’IA n’a pas supprimé les bugs.

Elle a surtout comprimé le temps entre deux tentatives.

C’est comme ça qu’une tâche qui pouvait prendre une semaine peut parfois tenir dans une journée.

Il y a aussi un autre changement que je trouve presque aussi important : l’exploration d’une codebase.

Avant, quand on arrivait sur un projet qu’on connaissait mal, surtout avec du code spaghetti, on passait beaucoup de temps à faire l’enquête. Suivre les imports. Chercher les appels de fonctions. Comprendre où une donnée entre, où elle ressort et pourquoi une modification dans un coin casse quelque chose à l’autre bout.

Aujourd’hui, on peut demander à une IA quels fichiers participent à une fonctionnalité, où une valeur est calculée, ce qui déclenche un comportement ou quels tests couvrent une partie du projet.

En quelques minutes, elle produit une première carte.

L’enquête n’a pas complètement disparu, mais elle est devenue beaucoup plus courte.

## Le code arrive avant la structure

Le jeu de mon frère montre aussi la limite de cette accélération.

Sa première version fonctionne, mais elle tient dans un seul fichier HTML de 10 000 lignes. Pour un humain, ce n’est déjà pas très agréable. Pour un autre agent, ce n’est pas idéal non plus : il faut retrouver la logique du jeu, l’interface et les données au milieu d’un énorme bloc.

Un harness, c’est justement tout ce qui entoure le modèle pour lui permettre de travailler : l’accès au dépôt, au terminal, aux tests, au navigateur et aux règles du projet.

Mais même avec un bon harness, il faut encore préparer le terrain. Des fichiers courts, un README, quelques conventions et des tests permettent à l’agent suivant de comprendre rapidement le projet et de vérifier qu’il ne casse rien.

Avant, on apprenait souvent cette structure en écrivant lentement beaucoup de code.

Aujourd’hui, on peut produire 10 000 lignes avant même de savoir pourquoi il faudrait les découper.

C’est aussi ce qui m’a plu dans cette histoire. Mon frère aime les jeux vidéo. Moi, je passe beaucoup trop de temps à réfléchir au développement agentique. Son projet nous a donné une raison de nous poser ensemble, de parler de ce qui nous passionne et d’échanger sur la manière de rendre son jeu plus facile à faire évoluer.

Et si moi aussi je refaisais un autre jeu ?
