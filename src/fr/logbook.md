# Journal de bord

## <a id="2026-07-11-winegold"></a>11 juillet 2026, Winegold entre Homebrew et les skills IA

Aujourd’hui, ma réflexion autour de Winegold s’est précisée. Je veux construire quelque chose à mi-chemin entre Homebrew et les skills d’agents IA.

Homebrew sert surtout à installer des applications complètes. Les skills sont plutôt de petites briques spécialisées et réutilisables. Winegold se placerait entre les deux : des recettes autonomes capables de lancer des scripts et des automatisations à partir d’un simple glisser-déposer.

L’idée n’est donc pas seulement de créer un gestionnaire de scripts, mais une collection de petits composants réutilisables, faciles à installer et à déclencher, avec juste assez de structure pour ressembler à de vraies fonctionnalités.

## <a id="2026-07-11-fnac-return"></a>11 juillet 2026, Dix euros pour une erreur

Je voulais acheter une souris verticale à la Fnac pour améliorer mon confort, mais je me suis trompé de modèle. J’ai acheté une souris à 100 euros qui n’était finalement pas verticale.

Je suis retourné au magasin pour la rendre et en prendre une autre. J’ai alors découvert que la Fnac appliquait une décote sur le produit retourné. J’ai perdu dix euros dans l’opération.

Sur le moment, je pensais que ce n’était pas légal. J’ai découvert qu’en fait le droit légal de rétractation de quatorze jours concerne les achats à distance. Pour un achat effectué directement en magasin, le retour dépend de la politique commerciale du vendeur.

Source : [Service Public, droit de rétractation pour un achat à distance](https://www.service-public.gouv.fr/particuliers/vosdroits/F10485).

## <a id="2026-07-11-local-saint-laurent"></a>11 juillet 2026, Le local rue Saint-Laurent

Je devais visiter un local rue Saint-Laurent, sur les quais de Grenoble, mais je n’ai pas réussi à trouver un créneau commun avec l’agent immobilier. Il avait très peu de disponibilités et m’a expliqué qu’au vu du prix, le bien risquait de partir très vite. Environ 50 000 euros pour plus de 100 mètres carrés, avec déjà six visites prévues.

Je suis quand même allé voir le local de l’extérieur, à travers la vitrine. Je réfléchis maintenant à faire directement une offre au prix. Si personne n’a encore fait de proposition, cela me permettrait peut-être de passer devant les autres.

Ma principale hésitation est la présence d’un autre salon de tatouage dans la même rue. Mais si je commence à éliminer chaque emplacement où il existe déjà un tatoueur, il ne restera plus beaucoup de rues à Grenoble. Ce n’est probablement pas une raison suffisante pour laisser passer une bonne opportunité.

## <a id="2026-07-10-open-source-business"></a>10 juillet 2026, Open source et modèle économique

L’open source n’est pas incompatible avec une entreprise importante, ni même avec une multinationale. PostHog, Gumroad et Odoo publient une partie importante de leur code tout en vendant des services, de l’hébergement, du support ou des fonctions supplémentaires.

Cela confirme qu’un projet peut rester ouvert sans renoncer à construire une vraie entreprise autour. Le code peut être accessible, tandis que la valeur économique vient de l’exécution, de l’infrastructure, de l’accompagnement et de l’écosystème.

Gumroad semble même maintenant largement automatisé et géré avec l’aide d’un agent Hermès. À vérifier plus précisément, mais l’idée est intéressante : une petite structure, beaucoup d’automatisation et un produit open source capable de continuer à générer du revenu.

Sources : [PostHog sur GitHub](https://github.com/PostHog/posthog), [Odoo Community et Enterprise](https://github.com/odoo/odoo), [Gumroad sur GitHub](https://github.com/antiwork/gumroad).

## <a id="2026-07-10-apple-foundation-models"></a>10 juillet 2026, Les Foundation Models d’Apple ne sont pas des agents

Aujourd’hui, j’ai découvert un truc assez absurde avec les Foundation Models d’Apple. Pour pouvoir les utiliser, la langue de macOS et celle de Siri doivent être toutes les deux réglées en anglais. Si l’une des deux ne correspond pas, les modèles ne sont tout simplement pas disponibles.

C’est assez débile qu’une technologie aussi avancée puisse être bloquée par un détail de configuration aussi invisible.

Leur petite fenêtre de contexte confirme aussi qu’ils ne sont pas faits pour piloter un gros agent de développement. Leur place semble plutôt être dans de petites tâches ciblées : résumer un texte, produire un JSON, choisir une action ou ajouter un peu d’intelligence à un script Winegold.