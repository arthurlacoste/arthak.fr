---

title: 20€ pour des tokens illimités ? Comment bypass Codex sans payer plus cher
date: 2026-07-08
excerpt: J’ai construit ça parce que je tombais tout le temps sur un problème moderne très chiant. J’étais en train de coder, avec Codex ou un autre outil IA de dev, et puis la limite arrivait.
---

J’ai construit ça parce que je tombais tout le temps sur un problème moderne très chiant.

J’étais en train de coder, avec Codex ou un autre outil IA de dev, et puis la limite arrivait.

Pas de manière dramatique. Pas d’explosion. Juste ce petit mur silencieux où le produit te dit, en gros : ok, tu as eu assez d’aide pour aujourd’hui.

Ce qui est plutôt juste, j’imagine. Les serveurs coûtent de l’argent. Les GPU ne tournent pas à l’amitié. Je comprends.

Mais mon projet est toujours ouvert. Mon terminal est toujours là. Mon navigateur est toujours connecté. Le bug est toujours assis dans un coin, à me regarder comme un chat mouillé.

Donc je voulais un fallback.

Pas un faux truc “employé IA autonome”. Pas une plateforme d’agents avec une odeur de startup, une page pricing et un cube lumineux.

Juste un pont bête et utile entre ChatGPT normal dans le navigateur et mon vrai ordinateur.

C’est devenu [MCPRelay](https://github.com/arthurlacoste/MCPRelay).

C’est une gateway MCP locale, gratuite et open source. Tu la lances sur ta machine, tu l’exposes à un client MCP, et d’un coup ChatGPT peut faire de vraies choses en local, au lieu de te suggérer poliment des commandes que tu vas copier-coller comme un stagiaire fatigué.

Il peut lancer des commandes shell.

Il peut inspecter des fichiers.

Il peut prendre des captures d’écran.

Il peut utiliser de l’automatisation navigateur.

Il peut cliquer, taper, scroller, bouger la souris.

Il peut partager des fichiers locaux via des liens publics temporaires.

Il supporte OAuth.

Il log les conversations et les appels d’outils.

En gros, ça permet à ChatGPT normal de devenir une surface de contrôle pour ton ordinateur.

Et oui, la version marrante, c’est le mode YOLO.

Parfois, je n’ai pas envie d’un échange prudent où l’assistant dit “tu peux lancer cette commande”, puis je la lance, je colle le résultat, j’attends, je lance une autre commande, je recolle, et je deviens lentement un câble USB avec une dépression.

Parfois, j’ai juste envie de dire : check le repo, lance les tests, inspecte l’erreur, ouvre le navigateur, regarde la page, tente le fix, dis-moi ce qui s’est passé.

Pas pour toujours. Pas sans sécurité. Pas avec accès à mon compte bancaire et à mes souvenirs d’enfance.

Juste sur ma machine, pour mon workflow dev, avec des outils que je peux voir et contrôler.

Il y a un truc bizarrement pratique à utiliser l’app web normale de ChatGPT comme ça.

Parce que quand les tokens Codex sont cramés, ou quand je ne suis pas dans le bon environnement, ou quand je veux juste continuer depuis le navigateur, j’ai encore un assistant qui fonctionne. Le modèle est déjà là. La conversation est déjà là. Il me manquait juste un moyen de le connecter à la machine.

C’était ça, le bout manquant.

Un pont local.

ChatGPT d’un côté.

Mon ordinateur de l’autre.

Moins de cérémonie au milieu.

La partie navigateur compte beaucoup aussi. Une grosse partie du dev, ce n’est pas juste “lis ce fichier”. C’est une app locale qui tourne dans Chrome. Un dashboard. Une session déjà connectée. Un état UI bizarre. Un panneau de réglages. Une page qui casse seulement après avoir cliqué sur le troisième bouton débile.

Essayer de décrire ça en texte, c’est horrible.

C’est comme expliquer un stencil de tatouage au téléphone.

“Oui, la ligne est mauvaise, mais pas cette ligne, l’autre ligne, celle à côté du truc.”

Non.

Prends une capture. Clique sur le bouton. Lis ce qui a changé. Continue.

C’est ce genre de workflow que je voulais.

Pas parfait. Juste moins stupide.

J’ai aussi ajouté quelques petits helpers navigateur pour ChatGPT lui-même. Auto-send des prompts depuis les paramètres d’URL. Auto-ouverture de la dernière conversation. Auto-approbation des cartes d’action MCP. Ce sont des micro-fonctions, mais les micro-clics répétés, c’est comme ça que le logiciel finit par te manger l’âme. Donc je les ai automatisés.

Et oui, j’ai essayé d’autres routes avant d’arriver là.

J’ai essayé des modèles locaux. J’ai lancé `qwen3.5:35b-a3b-coding-nvfp4` sur Ollama. Respectueusement : tu es trop con, frérot. Je dis ça avec amour. Gros nom de modèle, mais s’il te plaît, arrête de casser mes projets.

J’ai essayé OpenCode avec Big Pickle, qui est apparemment un vrai nom de modèle. Enfin, je sais que c’est un alias. Sérieusement, il faut qu’on parle du naming dans cet écosystème. Quelqu’un, quelque part, a vu “Big Pickle” et s’est dit : oui, on ship ça. Domaine incroyable. Rien à dire. Beaucoup à dire.

J’ai aussi joué avec [0xzr/freellmpool](https://github.com/0xzr/freellmpool), qui est une idée vraiment maligne : récupérer les free tiers de plein de providers et router à travers eux. Très hacker. Très raton laveur avec des clés API. Je respecte.

Mais après tout ça, je reste quand même globalement coincé avec un plan ChatGPT à 20 $.

Et honnêtement, ça va.

Le problème, ce n’est pas seulement “quel modèle est le plus intelligent”.

Le problème, c’est le workflow.

Si l’assistant ne peut pas toucher ma machine, je reste le pont. Je reste celui qui copie les logs, colle les fichiers, décrit l’état du navigateur, lance les commandes, approuve les trucs, déplace des petits bouts de contexte comme un ouvrier d’entrepôt triste payé en tokens.

Donc `MCPRelay`, c’est ma manière de rendre le plan à 20 $ plus utile.

Pas infini.

Pas magique.

Juste plus connecté.

Le projet n’est volontairement pas poli comme une landing page SaaS.

C’est un outil local. Il a ce petit côté garage un peu dangereux. Certaines parties sont propres. D’autres tiennent au scotch. Mais c’est du scotch utile, et honnêtement la moitié d’internet tient déjà sur du scotch structurel.

Le point important : c’est gratuit et open source.

Pas de mur d’abonnement.

Pas de “contact sales”.

Pas de “crédits agent”.

Pas de promesse magique où ton repo devient conscient et ship des features pendant que tu dors.

Juste une gateway MCP locale que tu peux lancer, modifier, casser, réparer, fork, et utiliser comme tu veux.

Je pense que ce genre de chose va devenir plus courant.

Pas parce que tout le monde veut un énorme agent autonome. En vrai, je pense que la plupart des gens ne veulent pas ça. Ils veulent quelque chose de plus chiant. Et de plus utile.

Ils veulent que l’assistant puisse toucher l’ordinateur.

Lancer la commande.

Voir l’écran.

Ouvrir le fichier.

Cliquer sur le truc.

Faire un retour.

Le futur, ce n’est peut-être pas un gros agent qui fait tout.

C’est peut-être plutôt plein de petits ponts entre la fenêtre de chat et la réalité bordélique de ta machine.

C’est ça, `MCPRelay`, pour moi.

Un pont.

Un pont un peu imprudent.

Un pont “ok vas-y fais-le, mais s’il te plaît ne brûle pas la maison”.

Et honnêtement, c’est exactement l’énergie que je voulais.

Je suis curieux de voir si d’autres personnes construisent des setups MCP locaux similaires, surtout autour de ChatGPT normal dans le navigateur. Parce qu’à partir du moment où tu arrêtes de voir le chat comme une zone de texte et que tu commences à le voir comme une télécommande pour ta propre machine, tout le workflow devient différent.

https://github.com/arthurlacoste/MCPRelay
