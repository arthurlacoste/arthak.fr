---
author: Arthur Lacoste
date: 2017-12-01
updated: 2026-07-13
layout: rivers
slug: vivre-sans-voiture
title: Vivre sans voiture
subtitle: Essai sur les alternatives à l’automobile
archive: true
categories:
  - Essai
  - Mobilité
tags:
  - vivre sans voiture
  - vélo
  - mobilité
  - écologie
source: https://github.com/arthurlacoste/vivre-sans-voiture
---

# Vivre sans voiture

*Essai sur les alternatives à l’automobile*

Par Arthur Lacoste.

> Version réunie depuis le [dépôt original du livre](https://github.com/arthurlacoste/vivre-sans-voiture), révision `7c18609`.


## Avant-propos

> «&nbsp;Il y a deux portes. Derrière la porte numéro 1, il y a une pièce capitonnée, avec une voiture à essence traditionnelle. Derrière la porte numéro 2, il y a une pièce identique, capitonnée, avec une voiture électrique. Les deux véhicules tournent à plein régime. Je veux que vous décidiez d’une porte à ouvrir pour entrer dans la pièce et fermer la porte derrière vous. Vous devez rester dans cette pièce pendant une heure. Vous ne pouvez pas couper le moteur. Vous n’aurez pas de masque à gaz. Je présume que vous prendrez la porte numéro 2, avec la voiture électrique, pas vrai&nbsp;? La porte numéro 1 est un choix fatal. Qui voudrait respirer ces fumées&nbsp;?
>
> C’est le choix que le monde fait aujourd’hui.&nbsp;»
>
> <cite>Arnold Schwarzenegger</cite>

### Note à l’attention des premiers lecteurs et correcteurs

Bonjour,

Tout d’abord, je tiens par avance à vous remercier pour le temps que vous allez mettre à ma disposition pour la lecture, correction et appréciation de mon travail.

La présente version n’est aucunement une version finale, mais un document en cours de travail. Certaines parties ne sont pas encore assez développées, et certaines sont encore dans mon esprit (ou perdues dans mon calepin entre deux dessins).

L’idée de cet ouvrage est d’aborder — tout en les vulgarisant — des concepts de mobilité appliquée à notre quotidien pour promouvoir l’utilisation d’alternatives à la voiture à essence, et ce en vue d’une publication.

Ce projet ne comporte pas d’enjeux financiers (pour le moment en tout cas) en ce qui me concerne, mais simplement un désir d’épanouissement personnel.

J’attire votre attention sur les points suivants&nbsp;:

* notions qui sembleraient encore floues pour vous après leurs lectures,
* anecdotes hors contexte (même si elles sont quasiment toutes authentiques),
* d’autres points qui sont trop mis en avant selon vous,
* et la structure même du document (découpe des chapitres),
* fautes d’orthographe (mon correcteur me dit qu’il y en a plus de 300, mais il semble essoufflé).

N’hésitez pas à proposer d'éventuels changements en venant en discuter dans l'espace dédié, dans [le dépôt Git du projet](https://github.com/arthurlacoste/vivre-sans-voiture/issues)[^1].

J’essaye et je trouve qu’il est important d’aborder en surface certaines notions d’écologie et d’économie qui me semblent en lien direct avec cette problématique.

Merci,

Arthur

### Ce livre mord, il est Open Source&nbsp;!

Cet essai est open source et à visé collaborative. C'est-à-dire que vous pouvez disposer et réutiliser ce qui fait la matière du livre, selon les termes de la licence que j'ai choisie.

Il est placé plus précisément sous licence CC-BY 4.0, vous pouvez voir les détails de cette licence sur [cette page](https://github.com/arthurlacoste/vivre-sans-voiture/blob/master/licence.md)[^0-1]. Pour résumer il est possible de partager (copier, distribuer et communiquer le matériel par tous moyens et sous tous formats) et adapter (remixer, transformer et créer à partir du matériel pour toute utilisation, y compris commerciale. La seule contrainte est celle de l'attribution&nbsp;: vous devez créditer l'ouvrage, intégrer un lien vers la licence et indiquer si des modifications ont été effectuées à l'ouvrage. Vous devez indiquer ces informations par tous les moyens raisonnables, sans toutefois suggérer que l'offrant vous soutient ou soutient la façon dont vous avez utilisé son ouvrage.


### Un livre évolutif

Il est important de comprendre qu'au lieu d'être un simple livre, cet ouvrage est vivant, évolutif. Je souhaite qu'il puisse vivre au gré de vos propositions. Qu'il s'enrichisse avec vos témoignages, vos histoires. Je ne souhaite pas qu'il devienne saturé, illisible. Je caresse l'espoir qu'il puisse rester concis et abordable, voir vulgarisant et permettant d'animer un débat avec vos proches, votre famille.

**Vous pouvez donc éditer chaque page de ce livre&nbsp;!** En effet, en bas de chaque page de la version en ligne comporte un lien "éditer cette page". Vous pouvez donc proposer des changements en direct, et voir le livre en vivre, en perpétuelle évolution. Les versions pdf et liseuses seront mises à jour automatiquement si les modifications sont prises en compte.

[^0-1]: https://sansvoiture.fr/licence

[^1]: https://github.com/arthurlacoste/vivre-sans-voiture/issues

## Introduction

À travers les âges, l’homme a su créer des dizaines de moyens de transport différents, en investissant la terre à cheval, les airs en avion, ou la mer en bateau, en défiant les éléments et trouvant des solutions pour parcourir et explorer chaque recoin de notre charmante planète. Le transport permet le voyage, de s’évader au présent et de conquérir des terres à l’autre bout du monde. Le transport permet aussi plus simplement de se rendre d’un point A à un point B, de se déplacer au quotidien pour travailler, aller faire ses courses et vivre, tout simplement.

Je n’ai pas l’âme d’un cycliste&nbsp;: je n’ai jamais aimé les habits moulants, à part lorsque j’étais gamin, habillé en super héros. J’avais une nette préférence pour Spider-Man si vous voulez tout savoir. Lorsque j’ai commencé à pratiquer le vélo au quotidien, le mot cycliste sonnait assez mal dans mon esprit. J’imaginais les sportifs du tour de France, tout de jersey vêtu. Et je n’ai jamais été un grand fan des évènements sportifs&nbsp;: pour moi le sport ça ne se regarde pas, ça se vit&nbsp;! Heureusement pour moi, il n’y a nullement besoin de porter des vêtements moches pour pratiquer le vélo.

Dans le paragraphe précédent, je vous ai parlé de vélo, mais cet ouvrage évoque en réalité une multitude de choix. La solution du vélo coule de source, car elle s’est imposée, autant dans mes recherches que dans la pratique quotidienne de milliers d’êtres humains. En réalité, il y en a pour tous les goûts&nbsp;: vous le découvrirez bien assez tôt&nbsp;!

Si vous avez l’habitude d’utiliser une voiture, vous allez avoir sans aucun doute beaucoup de mal à changer vos habitudes. Vous n'en avez peut-être pas envie. Vous allez vous poser beaucoup de questions. Comment vais-je faire mes courses&nbsp;? Je ne vais plus pouvoir emmener mes enfants à l’école&nbsp;? Comment aller travailler sans arriver en sueur&nbsp;? Oui, je réponds à toutes ces questions.

Je ne dis pas que le choix est toujours facile au quotidien. Mais année après année, j’ai toujours pu me débrouiller à aller là où je voulais. J’ai essayé des dizaines de moyens de locomotions, du plus élémentaire au plus farfelu. J’ai parcouru des centaines de kilomètres en vélo, roller, skateboard, train, avion, covoiturage, et d’autres moyens que j’oublie très certainement.

### À qui est dédié cet ouvrage&nbsp;?

Ce livre s’adresse à tous. Si vous êtes curieux de découvrir des modes de transport alternatif, ou que vous souhaitez vous émanciper de votre véhicule, trouver un nouveau moyen de vous déplacer, ou peut-être payer moins cher vos déplacements quotidiens.

Si vous êtes un pilote dans l’âme ou que la vitesse est importante pour vous, ce livre n’est peut-être pas fait pour vous. Cet ouvrage met essentiellement en exergue les modes actifs[^2], car ils représentent une alternative concrète et rationnelle. Cependant, ces dernières années, des versions électriques de voitures et de motos sont sorties, et pourraient correspondre à votre soif de sensations.

Si vous avez déjà votre permis de conduire, mais que vous cherchez d’autres solutions, ce livre vous est tout particulièrement dédié. Si vous êtes «&nbsp;piéton&nbsp;» et que vous hésitez à passer le permis, ou que vous cherchez un moyen écoresponsable de vous déplacer, mais que certaines situations vous laissent perplexe. Comment aller faire mes courses sans voiture&nbsp;? Comment déménager&nbsp;? Partir en vacances&nbsp;? Toutes ces questions ont une réponse dans les pages qui suivent.

Si vous êtes déjà un acteur du changement, vous n’avez peut-être pas besoin de parcourir ce livre, car vous appliquez sans doute déjà les conseils et astuces prodigués dans ce livre&nbsp;: offrez ce livre à une personne éveillée, ou en passe de le devenir.

Si vous êtes en difficulté financière, vous émanciper du poids financier d’une (ou plusieurs&nbsp;!) voiture vous permettra de sortir la tête de l’eau. Croyez-moi, cela peut faire la différence à la fin du mois.

[^2]:  Les modes actifs sont des moyens de transport non motorisés. [Voir le lexique](#modes-actifs)

### Qui suis-je&nbsp;?

Considérez-moi comme un simple citoyen du monde. Je ne suis ni urbaniste, ni économiste, ni architecte. Mais alors, quelle est ma légitimité pour vous proposer cet ouvrage&nbsp;? Il me semble que mon expertise (même si le mot semble quelque peu présomptueux) provienne de ma simple expérience, approfondie (mais pas trop) par une étude documentaire.

Issu de la génération Y, je suis né avec une souris dans les mains. Élevé à la Game Boy, j’écrivais déjà des nouvelles avec ma petite sœur quand j’avais 12 ans. Après avoir écrit quelques pièces de théâtre pour les troupes dans lesquelles je jouais, j’ai continué l’écriture, en rédigeant de nombreux articles[^3] sur internet.  

J’ai étudié dans un premier temps la Comptabilité  et Finances des Entreprises, pour finir par me passionner pour le Développement d’applications web. Mon parcours professionnel m’a amené à devenir un consultant formateur, souvent lié aux pratiques informatiques. Aujourd’hui, je travaille à mon compte, mais je ne sais pas de quoi demain sera fait. Et vous&nbsp;?

[^3]: Voir mon blog [irz.fr](https://irz.fr)

### Mon expérience

Ce livre n’est pas un guide théorique&nbsp;: je vis depuis près de 10 ans sans voiture et à vrai dire, je n’ai jamais possédé d’automobile de toute ma vie.

Je ne dis pas que je n’y ai jamais songé. J’ai passé quelques mois en compagnie d’un scooter, mais pour faire suite à de nombreuses déconvenues (entre réparations, pleins, considérations écologiques et autres pannes inopinées), j’ai décidé d’arrêter les frais. Il s’agit du seul véhicule à base d’énergie fossile jamais eu en ma possession.

Je ne dis pas que c’est facile&nbsp;: vous découvrirez à travers ce livre que choisir le bon moyen de transport dans la bonne situation est plus délicat qu’il n’y paraît, et que délaisser le réflexe de prendre son automobile dans chaque situation nécessite de revoir ses automatismes, ancrés en nous.

À vrai dire, pour chaque situation de la vie courante, il y a une (voire plusieurs) solution, qui vous permet de vous passer d’un véhicule nécessitant de l’essence.

Cependant, je n’ai pas toujours été fier d’être un piéton. Je ne l’ai pas toujours assumé comme je l’assume aujourd’hui et auparavant, plutôt que de le vivre comme une fierté, je le vivais comme un poids. Je me suis senti sous pression, forcé de passer le permis sans jamais en avoir envie. Je vous en reparlerai aussi plus longuement.

Vivre sans voiture s’inscrit dans une démarche de consommation responsable, d’écomobilité. Mais ce n’est pas que ça. Aujourd’hui plus que jamais, il semble primordial de songer au futur de notre planète. Et la voiture alimentée par les énergies fossiles n’en fait pas partie. Ce n’est qu’une question d’années avant que tout le monde prenne conscience du besoin pour nous de changer de rythme de vie.

Oui, ça se passe aujourd’hui, pas demain. Alors, commençons tout de suite&nbsp;!

## Pourquoi vivre sans voiture ?

> «&nbsp;L’homme civilisé a construit des voitures, mais il a perdu l’usage de ses pieds.&nbsp;»
>
> <cite>Ralph Waldo Emerson</cite>

Au fil des années, l’usage de la voiture s’est démocratisé jusqu’à devenir incontournable. Tout est conçu et pensé voiture&nbsp;: les paysages ont été profondément marqués, les villes ont été repensées pour éviter la congestion. Les infrastructures routières ont été mises en place et privilégiées jusqu’aux années 1980.

D’un point de vue énergétique, la voiture est pourtant le véhicule le moins efficace. 83 % du trafic se fait en voiture, et elle représente 35 % des émissions de CO2\. Reconsidérer la place des automobiles dans notre quotidien est urgent. Il est nécessaire de revenir en arrière, mais en sommes-nous capables&nbsp;?

Ce qu’il faut bien comprendre, c’est que l’industrie automobile n’a aucun intérêt à voir d’autres moyens de transport se démocratiser. Comme le dit si bien Mikael Colville-Andersen «&nbsp;Le vélo est une menace réelle et immédiate pour la dominance de la culture automobile dans nos villes&nbsp;». Et au-delà de l’industrie automobile, c’est tout un pan de l’économie moderne qui dépend exclusivement de la filière automobile.

Une voiture pèse en moyenne 1247 kg&nbsp;: c’est un monstre de métal. Son volume est d’ailleurs totalement disproportionné quand on sait qu’elle transporte en moyenne seulement 1,2 personne et reste garé 90 % du temps. En plus d’être lourde, elle est bruyante, polluante. Elle va à une vitesse vertigineuse. Et elle tue&nbsp;: 1,3 million de personnes meurent d’un accident de voiture dans le monde chaque année[^2-1].

Vous avez digéré l'ensemble des chiffres que vous venez de lire&nbsp;? Votre esprit n'est pas trop embrumé&nbsp;? Promis, j'essaierai de ne pas faire fondre davantage votre cerveau dans les chapitres suivant&nbsp;!

[^2-1]: Rapport OMS de situation sur la sécurité routière 2015


### La problématique de la sédentarité

La sédentarité est l’un des plus grands fléaux de notre société moderne. Enfant, nous passons des mois entiers, voire des années entre un landau et une poussette. Une fois adultes, nous passons notre temps assis dans notre voiture ou dans les transports en commun, nous travaillons assis à notre bureau, et nous finissons assis, le soir, devant un poste de télévision (ou devant notre ordinateur).

L’être humain n’a jamais été aussi immobile que ces dernières décennies. L’évolution de notre comportement se traduit par des conséquences directes&nbsp;: surpoids, obésité, accroissement des maladies cardio-vasculaires, diabète, augmentation des risques de cancer du côlon, d’hypertension artérielle, d’ostéoporose, de troubles lipidiques, de dépression et d’anxiété[^2-2].

Et lorsque l’on se rend compte que des poignées d’amour ou que notre petit ventre à bière commence à pousser, on se remet en question. Pour pallier à ces problématiques tout en conservant notre hygiène de vie démesurément paradoxale, nous nous inscrivons à des salles de sports, ou nous nous entassons en sueur pour faire du cardio ou du renforcement musculaire. Nous faisons un régime, pour perdre quelques kilos.

Mais la solution n’est ni un régime miracle ni une pratique du sport à outrance. Une des solutions est de penser au fond du problème&nbsp;: son mode de vie. Il faut tout simplement être actif au quotidien. Notre corps n’est pas une simple marionnette que l’on déplace avec nous parce qu’on n’a pas le choix. Il faudrait donc envisager arrêter de choisir des raccourcis "passifs" pour ne pas avoir à nous fatiguer.

Donc, pour que notre corps ne soit pas un spectateur dans notre propre vie, je recommanderai de changer totalement notre mode de fonctionnement. Mais peut être que notre job de bureau - pour ceux qui travaillent dans un bureau - nous plaît et je vous comprends&nbsp;: je passe moi-même quotidiennement de longues heures face à mon écran, et même si des solutions telles que le standing desk (des bureaux rehaussés pour travailler debout) existent et permettent de brûler quelques calories de plus qu'en restant assis, il convient cependant de se pencher sur nos déplacements quotidiens.

Se déplacer en utilisant la marche, le vélo ou tout autre moyen de traction à la force de notre sueur comporte l’avantage de fusionner le temps des déplacements et celui d'un éventuel abonnement à la salle de sport. Oui, je suis en train de vous expliquer qu'il est possible de gagner du temps en abandonnant sa voiture&nbsp;!

[^2-2]: OMS, «&nbsp;[La sédentarité, une cause majeure de maladies et d'incapacités](http://www.who.int/mediacentre/news/releases/release23/fr/)&nbsp;»

### Une question économique

#### Le prix de l’automobile

Avoir une voiture, c’est un peu comme être en colocation. Au début, vous cherchez une (ou plusieurs personnes) avec qui vous allez devoir vous entendre. Une fois la perle rare trouvée, vous emménagez dans cet appartement. Vous avez pensé à tout, et c’est génial, vous allez pouvoir rogner sur le prix du loyer et faire des économies d’échelle en faisant des courses communes, diviser les charges d’électricité, d’eau et d’Internet.

Au bout de quelques mois, vous vous rendez compte que tout n’est pas aussi beau que sur le papier. L’un des colocataires est parti avec 3 loyers de retard, et celui qui reste prend des douches d’une demi-heure et laisse toujours les lumières allumées. Le comble&nbsp;: il ne trie pas, ne composte pas, et il laisse ses poils dans le lavabo de la salle de bains&nbsp;!

Vous devez vous dire que j’ai été traumatisé de mes expériences de colocation pour en parler ainsi, mais non&nbsp;! La réalité est là&nbsp;: il est difficile d’estimer le coût annuel de l’automobile du fait de sa fragmentation. L’entretien, les réparations, l’essence, le crédit et l’assurance sont autant de postes variables qu’il n’est pas évident de budgétiser.

Cependant, la moyenne des dépenses annuelles liée à une voiture me procure un petit frisson dans le bas de la nuque. 3300 € par an. Cette somme me semble folle, pas vous&nbsp;? Je crois que même avec un super vélo (électrique ou pas), une carte dans l'atelier de réparation de vélo du coin, des déplacements fréquents en train et un abonnement pour les transports en commun, vous avez encore de la réserve pour vous prendre un aller-retour en classe éco pour le Costa Rica&nbsp;!

Dans ces 3300 €, comptez 1500 € pour le carburant, 620 € d’assurance, 460 € pour l’entretien du véhicule, et 720 € de dépenses diverses (comme le remboursement du crédit ou les places de parking).

Lorsqu’un ménage se rend compte du coût qu’occasionne son budget voiture, il va chercher à rogner sur tel ou tel poste avec un véhicule qui consomme moins, éviter les réparations. En évitant les réparations, vous ne ferez que retarder l’inévitable, et vous mettez en péril votre vie (et celle des autres usagers). J’ai une autre solution pour vous&nbsp;: vendez votre voiture&nbsp;!

#### La décroissance

Ces dernières années, une tendance a commencé à se dessiner autour de la simplicité volontaire. Selon cette conception de la vie, il semble primordial de ralentir le rythme effréné et sans fin de cette course à la consommation. La réalité est pourtant simple&nbsp;: nous sommes en train de nous rendre compte progressivement que de nombreux modèles actuels ne fonctionnent pas. Les industries, qui disposent d’une force de pouvoir et de persuasion n’ont aucun intérêt à promouvoir la décroissance.

Et pourtant&nbsp;! Certains rouages essentiels de notre société moderne ne fonctionnent pas. Les initiatives de l’État se multiplient, mais restent encore marginales lorsque l’on se rend compte du chemin qu'il reste à parcourir. Sans compter une majorité de sceptiques, pour qui la décroissance résonne comme un retour à l’âge des cavernes.

Non, revenir en arrière est normal lorsque quelque chose ne fonctionne pas. Mais à grand coup de renfort publicitaire et de lobbies, on peut faire avaler n’importe quelle couleuvre à une population crédule.

#### Crédit à la consommation

«&nbsp;En 1926, plus de 30 % des ménages américains disposent de cette coûteuse invention qu’est la voiture. Les deux tiers sont achetés à crédit&nbsp;»[^2-6]. Aujourd’hui, les choses n’ont pas vraiment changé. Près de 75 % des voitures sont achetées à crédit en France. Un constat édifiant pour moi, d’autant plus que cette pratique est dans les mœurs, depuis le début.

«&nbsp;Soixante-deux mille quatre cents répétitions font une vérité.&nbsp;»[^2-3] La voiture est imprimée dans la rétine à grands coups de spots publicitaires, d’offres alléchantes, et d’avantages indéniables. On nous vend une machine de téléportation, un moyen facile de nous rendre loin, vite. Une sensation de liberté. Mais où se situe la liberté, lorsque votre véhicule vous oblige à travailler et rembourser des mensualités de crédit pour vous payer ce style de vie&nbsp;?

Le crédit est un poison, il nous permet d’acheter des biens dont nous n’avons pas les moyens à l’instant T. Nous utilisons notre «&nbsp;argent futur&nbsp;» pour financer notre vie présente, sans parler des intérêts. Dans le cadre d’un investissement immobilier, cela se justifie aisément. Dans le cas de la consommation, cela est tout bonnement une aberration. Mais notre économie est entièrement conçue sur le crédit, qui est lui-même une pierre angulaire dans le mécanisme de création monétaire&nbsp;!

Le matraquage publicitaire nous propose d’acheter toujours plus, plus cher. Vous voulez profiter de la vie à 100 à l’heure&nbsp;? Ce n’est pas avec un crédit que vous allez le faire. Car c’est par définition une dette. En ce qui me concerne, lorsque je dois de l’argent à quelqu’un, j’y pense tous les jours. La seule manière de me débarrasser de cette pensée est de rembourser la personne en question.

Je me souviens de cette fois ou ma sœur m’avait vendu son frigo il y a quelques années, je n’avais pas l’argent sur moi lorsqu’elle me l’a amené, et chaque jour je pensais à ce frigo qui ne m’appartenait pas encore. Si je peux vous donner un conseil&nbsp;: ne contractez jamais de crédit à la consommation, fuyez-les comme la peste. Si vous êtes déjà “contaminé”, évertuez-vous à vous en débarrasser. Prenez un deuxième job, vendez vos objets de valeur, gagnez des années et remboursez ce satané crédit.

J’ai cette amie, Mélanie, qui a payé sa voiture 13 000 €. Mélanie ne roule pas sur l’or, elle a donc pris un crédit à la consommation de 6 ans pour rembourser sa magnifique voiture. Du fait de ce crédit et de ses faibles revenus, elle n’a même pas de quoi se faire plaisir chaque mois. Et comble de l’ironie, elle va à son travail en tram, car il lui revient moins cher d’utiliser les transports en commun plutôt que sa voiture, grâce au remboursement de la  moitié de son abonnement par le travail.

J’ai envie de vous épargner une autre histoire, celle de Béatrice, qui a eu un accident avant même d’avoir terminé de rembourser son crédit. Résultat&nbsp;? Elle avait un crédit à payer, et pas de voiture à utiliser.

Voici typiquement des exemples aberrants, des situations qui - je l'espère - ne vous arriveront jamais, mais qui ne semblent pas si exceptionnelles lorsque je tends un peu l'oreille, écoutant mes amis, connaissances, ou famille.

[^2-6]: Fressoz J.-B., Bonneuil C., (2013). «&nbsp;L'évènement anthropocène, la Terre, l'histoire et nous&nbsp;»
[^2-3]: Huxley A., (1931). «&nbsp;Le meilleur des mondes&nbsp;»

### Une démarche écologique

#### Les énergies fossiles

Les énergies fossiles sont utilisées dans de nombreux domaines du quotidien tels que le chauffage, l’électricité et le transport. La problématique est la suivante&nbsp;: en utilisant à outrance des énergies fossiles, nous accélérons le réchauffement global de la planète, provoquant un genre de désordre cosmique&nbsp;!

Voici quelques exemples&nbsp;:

*   Une perturbation de l’écosystème, avec de nombreuses espèces en voie d’extinction. Je sais, vous vous dites peut-être que tant que les espèces en questions ne sont pas l’homme, ça n’a aucune importance. Mais il n’y a pas que ça.
*   Des phénomènes météorologiques tels que d’extrêmes vagues de chaleur et la sécheresse des sols. Là déjà vous pouvez être concernés. Imaginez, vous tombez le mauvais jour, vous oubliez votre bouteille d’eau salvatrice. Oui, notre vie ne tient qu’à un fil.
*   Une production agricole en baisse.
*   Une montée du niveau de l’océan.

Dans l’industrie agroalimentaire, le pet des vaches est lui aussi responsable du réchauffement climatique. Oui moi aussi je me suis marré la première fois qu’on m’en a parlé. Et puis j’ai réalisé qu’effectivement, le méthane contenu dans les flatulences bovines participait au réchauffement climatique. Ils représentent par exemple en France près de 5 % des émanations de dioxyde de carbone, soit l’équivalent de 15 millions de voitures. Oui, péter n’est pas seulement désagréable pour nos narines, c’est aussi mauvais pour la planète.

#### Impact environnemental

L’impact environnemental de l’automobile sur Terre est multiple. C’est d’ailleurs incroyable que l’on utilise encore la voiture après avoir pris conscience de l’ensemble de ses aspects néfastes. Sans doute est-ce une preuve de la propension de l’homme à s’autodétruire.

Tout d’abord, une voiture est bruyante. Qui n’a jamais vu ces murs de pierre aux abords des périphériques afin de contenir un minimum le bruit&nbsp;? Une amie dispose d’un appartement avec vue sur la rocade (le périphérique de Grenoble), et je peux vous le dire&nbsp;: heureusement qu’elle a un bon double vitrage&nbsp;! Et sa superbe terrasse, sur laquelle elle pourrait boire son café du matin n’est jamais utilisée. Et je la comprends. Avec autant de bruit et de poussière de bon matin, qui en aurait envie&nbsp;?

On parle beaucoup des morts humaines, et c’est normal, on se sent directement concerné lorsque l’on pense que ceci pourrait aussi nous arriver. Mais au-delà des morts humaines, il y a les morts animales. Ce que l’on nomme l’effet roadkill représente aux États-Unis près de 253 000 animaux par an, dont 90 % sont des cerfs[^2-4]. En France parmis la grande faune, ce sont principalement les chevreuils, sangliers et hérissons qui sont touchés. La raison de ces collisions&nbsp;? La fragmentation de l’habitat naturel des animaux par les routes, qui coupent littéralement en deux l’espace de vie des animaux. En parlant des hérissons, cette espèce disparaît peu à peu&nbsp;: leur population baisse de 5 % par an[^2-5], et serait menacée d’extinction en 2025.

Pour éviter cet impact direct sur la biodiversité, des passages piétons pour animaux sont parfois mis en place comme à Presles en Isère, ou un passage dédié aux crapauds a été installé par une association locale. Dans d’autres villes, ce sont des routes entières qui sont fermées pendant des périodes de migration ou d’hibernation, comme le tunnel du Bois Clair qui est fermé une partie de l’année pour préserver des espèces protégées de chauves-souris.

En parlant du tunnel du Bois Clair, il fait partie d'une route sobrement nomé la voie verte : une boucle de plus de 100 kilomètres au coeur de la Bourgogne du sud. Si jamais vous souhaiter faire du cyclotourisme, je vous conseille vivement cette voie que j'ai eu le plaisir de parcourir.

[^2-4]: Hart-Schmidt B., «&nbsp;[Roadside eats](http://index.truman.edu/pdf/2010-2011/february24/page9.pdf)&nbsp;»

[^2-5]: Nicolson, Adam (2006) «&nbsp;[Where have all our hedgehogs gone?](https://www.theguardian.com/environment/2006/jan/17/g2.ruralaffairs)&nbsp;» The Guardian Tuesday, 17 janvier 2006.

### Le permis de conduire

Ah les années permis&nbsp;! Moi aussi je suis passé par là, et je peux vous dire que ce n’était pas une partie de plaisir. Que ce soit le permis B pour la voiture ou le permis moto, ce petit bout de papier rose ne s’obtient pas si facilement. Ce n’est pas tant sa couleur qui me dérange, quoique l’on puisse s’interroger sur l’énergumène qui a pensé à cette étrange couleur.

En France, le permis de conduire est cher, très cher, comptez plus de 1600 € pour le premier passage. Déjà que le prix du forfait minimum est incroyablement prohibitif, il faut en général compter sur un prix bien supérieur si l’auto-école chez qui vous allez tente de vous arnaquer.

Mais le problème, ce n’est pas vraiment l’auto-école. D’année en année, l’examen du permis de conduire est devenu de plus en plus difficile, si bien que seulement la moitié des élèves obtiennent l’examen pratique du premier coup. Et là, les heures accumulées font s’envoler le prix du fameux sésame&nbsp;: 2200 € en moyenne.

## Êtes-vous citadin ou campagnard ?

Je suis profondément citadin. J’ai toujours apprécié la ville, habiter et vivre non loin du centre. C’est ancré en moi. La proximité des commerces, des cinémas, des bars, de tout. Les distances sont bien plus courtes, tout est concentré et accessible dans une surface réduite.

La vie rurale n’est pas moins intéressante, le rythme est moins soutenu, les distances bien que rallongées entre chaque acteur, laissent une douce sensation de paisibilité. Un air pur lorsque vous n’habitez pas trop près d’un troupeau de vaches et un silence. Un vrai silence qui n’existe pas en ville, ou peu importe l’heure du jour ou de la nuit, il se passe toujours quelque chose. Et dans ce murmure incessant, le silence n'existe pas.

Les milieux ruraux et urbains possèdent chacun des avantages et inconvénients.

### Vivre à la campagne

Pour bien comprendre les problématiques spécifiques aux déplacements ruraux, j’ai pris une décision drastique. Plutôt que de me baser uniquement sur des chiffres, statistiques, et autres publications peu digestes, j’ai choisi de partir vivre plusieurs mois à la campagne.

Oui, imaginez moi, citadin jusqu’au bout des ongles, quitter mon appartement au centre de Grenoble pour une maison en colocation. Imaginez-moi enfin sans le moindre vis à vis, entre un terrain agricole et une pléthore de bovins. À vrai dire, cela tombait bien&nbsp;: mes deux sœurs s’étaient mises en tête de faire une colocation. J’ai donc rejoint le projet de mes sœurs pour faire partie de cette aventure. Au programme&nbsp;: un magnifique jardin, une proximité avec la famille accrue et bien entendu des distances démultipliées entre les commerces, logements et des amis disséminés entre plusieurs patelins.

Le plus gros point noir en ce qui me concerne&nbsp;: la gare la plus proche est à une dizaine de kilomètres, cela va rendre un peu plus complexe mes allées et venues. C’est d’ailleurs l’une des raisons qui m’ont poussé à choisir un vélo à assistance électrique (plus communément appelé VAE), pour mes déplacements quotidiens. Moi, tricher&nbsp;? Jamais&nbsp;!

L’offre en transport en commun n’est pas totalement mauvaise, mais elle est coûteuse et ne répond de manière générale qu’à un segment du voyage à effectuer.

Si vous n’avez pas des milliers d’euros à dépenser dans un VAE, la réponse peut se trouver dans le co-voiturage, de nombreux pendulaires effectuent un trajet aller retour quotidien de la campagne vers la ville.

#### Comment se positionner sur la route en vélo&nbsp;?

Qui dit campagne, dit grands axes sans piste cyclable. Et c’est bien dommage. Alors en attendant que les municipalités fassent évoluer cette situation, votre comportement sur de grands axes (nationaux ou départementaux) peut vous aider à ne pas vous faire de frayeur lorsque vous enfourchez votre 2 roues. En effet, votre positionnement sur la voie donne un message implicite à tout véhicule en capacité de vous doubler.

Si vous mordez la ligne de droite, ou que vous êtes carrément à droite de la voie, vous donnez un signal aux autres&nbsp;: vous pouvez me doubler. Ce message, bien que correct, ne vous servira pas pour autant. En effet, les voitures auront tendance à vous doubler sans pour autant marquer une distance latérale correcte. C’est effectivement la meilleure manière de vous faire les plus belles frayeurs&nbsp;! Le mieux pour vous et de vous positionner au milieux de votre voie, voir à peine plus à droite que le centre, afin de forcer les véhicules à changer de voie pour vous doubler. Bien entendu, en fonction de la situation, vous pourrez toujours vous rabattre sur la droite.

Légalement, pour doubler un vélo, la distance latérale doit osciller entre 1 mètre si vous êtes en ville et 1,5 mètre hors agglomération. Mais ces dispositions légales ne sont quasiment jamais respectées&nbsp;: trop rares sont les automobilistes à se soucier de ce “détail”, d’autant plus que ces infractions ne sont que rarement réprimandées par les forces de l’ordre. Mais que voulez vous, j’ai toujours rêvé de finir ma vie écrasé par une voiture.

Dans son livre «&nbsp;Bike Snob&nbsp;», Eben Weiss parle en détail de ce que l'on pourrait qualifier de «&nbsp;mémoire des trajets&nbsp;». Certains axes ne disposent pas de piste cyclable, et je sais bien qu’il y a une peur de se faire écraser sur une départementale dans l’inconscient collectif. Et c’est justifié. En plus de votre comportement qui peut vous aider comme expliqué dans les paragraphes précédents, la régularité de vos trajets permettra aux automobilistes de penser à vous. Je m’explique&nbsp;: si vous faites régulièrement le même trajet, les automobilistes qui font le même trajet à la même heure vont progressivement vous intégrer mentalement, jour après jour. Ils prendront conscience sur le long terme de votre présence, pour mieux vous éviter.

#### Conclusion

Je pense que vivre dans la simplicité nécessite de créer ou intégrer une petite communauté où chacun s’entraide et à un rôle a jouer. En tout cas, il est facilité. La colocation «&nbsp;en famille&nbsp;» en est un bon exemple, même si des modèles de petites communautés avec différents foyers interconnectés et partageant des valeurs communes semblent propices à un épanouissement général, voire une synergie.

### Vivre en ville

En ville, les trajets de 5 kilomètres et moins sont aussi rapides en vélo qu’en voiture, voire encore plus rapide à bicyclette.

Comme je vous en ai parlé dans le chapitre d’introduction, je suis né avec une souris dans la main. Alors, comme tout jeune de ma génération qui se respecte, j’ai expérimenté les sites de rencontres. Quel rapport avec une vie sans voiture&nbsp;? C’est assez simple. Lorsque j’ai souhaité faire mes premières rencontres en ligne, j’ai toujours essayé de ne pas le mettre en avant, d’éviter le sujet.

J’avais la chance d’habiter dans le centre de Grenoble&nbsp;: je n’avais pas vraiment besoin de véhicule pour un rendez-vous, mis à part un vélo, mes pattes ou les transports en commun. Mais je n’étais pas forcément très à l’aise avec ça car quoi qu’on en dise la voiture est — dans le monde des apparences et du superficiel — l’un des éléments essentiels de la panoplie du mec parfait, qui va avec le job à temps plein en CDI et les tablettes de chocolat.

Oui, les préjugés ont la vie dure&nbsp;! Depuis ce temps-là, j’ai pris conscience que ma manière de fonctionner n’était pas si marginale, qu’elle était en réalité l’un des fondements de ma manière de penser, et que je voyais le monde différemment en partie en n’étant qu’un simple piéton.

#### Au cœur de Copenhague

Au Danemark, la capitale du pays est pleine de surprises. À l’époque, le grand bassin au cœur du quartier de Nyhavn accueillait les navires. Bordée de maisons multicolores, l’ambiance est grisante. S’il est toujours possible de se déplacer par la voie de la mer, ce n’est pas pour ses bateaux que Copenhague est le plus connu.

##### Des chiffres à donner le tournis

Je ne pouvais pas écrire un livre à propos de la vie sans voiture sans évoquer la capitale du vélo. Ancrées dans la culture de la ville, les pistes cyclables font partie intégrante du paysage. C’est dans les années 1980 que la municipalité de Copenhague intègre les premières pistes cyclables. Aujourd’hui, avec 1200 km de pistes cyclables, dont 1000 km totalement séparés des routes, Copenhague accapare la première place du classement des villes idéalement conçues pour les déplacements à vélo.

Comme nous le dit Mikael Colville-Andersen&nbsp;: «&nbsp;Regardez toutes les études qu’on a ici sur les avantages du vélo. Elles nous montrent qu’à court terme, on économise des coûts dans le système de santé ou bien parce qu’il y a moins de retard au travail&nbsp;». Les conséquences de l’utilisation du vélo sont nombreuses&nbsp;: une ville moins congestionnée, un coût annuel dérisoire.

Une des premières choses qui m’a marqué, c’est la taille des pistes cyclables sur certaines avenues&nbsp;: l’équivalent d’une double voie de voiture réservée aux cyclistes, lorsque dans la même rue il n’y a qu’une simple voie pour les voitures. En donnant davantage d’espaces aux vélos et en scindant les différents modes de déplacements, les cyclistes ont repris possession d’une partie de la chaussée. Car le cycliste a besoin de se sentir en sécurité, sans quoi il choisira à terme un autre moyen de transport. Quel meilleur moyen pour les industriels et lobbies d’utiliser la peur comme levier&nbsp;?

L’un des objectifs de la ville de Copenhague est d’atteindre 50 % de personnes transportées à vélo dans les trajets domicile-travail. Et c’est bien parti&nbsp;!

##### Des initiatives pratiques

Je me suis rapidement rendu compte qu’il y a des détails qui font la différence&nbsp;: de petites installations astucieuses qui facilitent le quotidien des cyclistes. Sur certaines pistes, une série de diodes s’allument pour vous indiquer que vous êtes synchronisé avec le feu vert, et que vous pouvez pousser à fond sur les pédales&nbsp;! Il y a des poubelles inclinées, dont l’angle a été spécialement étudié pour que vous puissiez faire un panier sans vous rater. Astucieux&nbsp;!

Les vélos du service de location de la ville de Copenhague sont beaucoup plus intéressants que nos homologues français&nbsp;: ils intègrent un système GPS et une assistance électrique pour 4 € de l’heure.

Un autre mode de fonctionnement très étonnant concerne les vélos mal stationnés. Plutôt que de donner une amende aux cyclistes, les vélos sont déplacés dans un garage à vélo. Les chaînes sont graissées, les pneus regonflés, et un petit mot est apposé sur le vélo, indiquant aux cyclistes d’utiliser les parkings prévus à cet effet.

## Comment vivre sans voiture ?

Vous n’êtes toujours pas convaincu des bienfaits d’une vie sans voiture&nbsp;? Alors ce chapitre est fait pour vous. Je vais vous proposer situation après situation, des solutions à chaque circonstance a laquelle vous pourriez être confronté dans votre quotidien.

Théoriquement, c’est assez simple. Dans la plupart des cas, il s’agit de se mouvoir d’un point A à un point B. Généralement, vous revenez même au point A après être allé au point B. L’essentiel est de définir vos trajets les plus fréquents, et de trouver le mode de transport le plus adapté à la distance qui vous sépare de vos différents trajets.

### L’intermodalité&nbsp;: un enjeu majeur

Mathieu est un mec génial. Très urbain, il vit dans le huitième arrondissement de Lyon avec sa femme. En plus de faire un très bon café à la roumaine (oui, sa femme est née là-bas), d’être un guitariste hors pair (non ce n’est pas la jalousie, mais malgré toute ma bonne volonté je ne saurais l’égaler), il est un psychologue d'exception. Oui, ceci à son importance, car la dernière fois que j’étais chez lui, en sortant son vélo de son garage, je me suis rendu compte que la marque de son vélo était «&nbsp;Foldingue&nbsp;».

Quel est le comble pour un psy&nbsp;? C’est d’avoir un vélo Foldingue.

Trêves de blagues douteuses&nbsp;! Il est aussi un très bon exemple d’intermodalité&nbsp;: il mêle en effet vélo et train pour se rendre à son travail chaque jour de la semaine. Voici ce qui se cache derrière le mot intermodalité&nbsp;: utiliser et mélanger plusieurs moyens de transport pour un seul et même trajet. Et quelque part, on peut dire qu'on est tous _un peu_ intermodaux. Ne serait-ce que lorsque vous sortez du tram, ou venez de garer votre voiture&nbsp;: vous faites toujours au moins quelques pas avec vos pieds.

#### La SNCF comme fer de lance

Alors que les transports en train devraient représenter un atout dans le concept d’intermodalité, la réalité est tout autre. Ces dernières années en France, les solutions pour passer du train au vélo ont été rendues plus complexes.

Premier constat&nbsp;: le prix du supplément «&nbsp;vélo&nbsp;» sur les trajets nationaux SNCF. C’est tout simplement une aberration et frein à l’interopérabilité selon moi.

En 2014, la SNCF a déployé une flotte entière de nouveaux trains&nbsp;: les Régiolis. Ces trains sont une totale régression concernant les espaces vélo, et sont en contradiction totale avec les principes de l’intermodalité. Auparavant, les anciennes rames permettaient de stocker un nombre conséquent de vélos avec un système de crochets suspendus.

Au lieu de ça, les Régiolis disposent d’un espace réduit et mal pensé où il est possible de poser son vélo, où l’ensemble des vélos est entassé et attaché par une seule et unique sangle. Il est donc beaucoup moins commode pour un usager de retirer son vélo du tas.

L’alternative en place est d’utiliser des box en gare qui sont le plus souvent gratuites dans les gares rurales, mais qui sont parfois payantes dans les grandes agglomérations.


### Décortiquons chaque trajet

#### Travail et loisirs

Aller travailler est sans doute le trajet le plus significatif de tous, car il est généralement effectué quotidiennement. Tous les jours, 5 jours par semaine&nbsp;! La distance domicile-travail moyenne est de 25,9 km en France. Pour la moitié des salariés, la distance est inférieure à 7,9 km.

J’ai une vision assez particulière du travail. Après des années passées en CDI dans un bureau, ce que je pensais être ma carrière selon moi, je travaille maintenant comme consultant de ma propre vie. Qu’est-ce qui me fait plaisir au quotidien&nbsp;? Aujourd’hui, je suis assis à la terrasse d’un café, et j’écris ce livre. C’est mon travail aujourd’hui. Je ne sais pas encore ce que je ferai demain. Je peux profiter de chaque journée et de chaque instant que la vie me réserve.

J’appelle donc travail non seulement la définition que l’on peut trouver dans le dictionnaire&nbsp;: «&nbsp;Activité professionnelle régulière et rémunérée&nbsp;», mais aussi cette autre définition (qui est aussi dans le dictionnaire, mais que l’on a tendance à oublier)&nbsp;: «&nbsp;Activité de l’homme appliquée à la production, à la création, à l’entretien de quelque chose&nbsp;». A savoir, ce qui vous fait vibrer. Cette catégorie englobe donc le travail au sens traditionnel du terme, mais aussi vos loisirs et autres activités, ou vos trajets à l'école si vous êtes étudiant.

Tout d’abord, analysez la situation actuelle&nbsp;: combien de temps cela vous prend d’aller de votre domicile à votre travail&nbsp;? Est-ce que cette situation vous convient&nbsp;? Si vous habitez en ville, il vous sera facile de passer de la voiture au vélo ou aux transports en commun, et si votre trajet en vélo n’excède pas les 25 minutes, c’est gagné&nbsp;! Vous pouvez aussi vérifier si un site de covoiturage ne propose pas un automobiliste qui effectue les mêmes trajets que vous.

Si vous avez l’habitude de faire de grands trajets en voiture et que vous êtes en campagne, il va falloir réfléchir et changer vos habitudes. Si votre ville de départ et celle de destination sont bien desservies par un train, songez à alterner entre train et vélo&nbsp;: il s’agit d’un des combos les plus efficaces.

Si ces propositions ne sont pas valables pour vous, il est peut-être temps de déménager. Trouvez un logement plus proche de votre travail&nbsp;: vous passerez moins de temps sur la route, et davantage de temps avec votre famille, vos amis, ou votre chien&nbsp;!

##### La distance psychologique

Il y a quelques jours, je discutais avec une amie qui réfléchissait depuis un moment à aller travailler en vélo. Elle voulait enfin «&nbsp;sauter le pas&nbsp;»&nbsp;! J’étais très content pour elle, car pour moi, c’est l’un des trajets les plus fréquents et sur lequel il me semble intéressant de faire ses premières armes. Il est aussi possible de commencer par de petits trajets de loisirs.

Cependant, après quelques échanges, je me suis rendu compte que la distance qui sépare son domicile de son bureau est de 15 km. 30 kilomètres aller-retour&nbsp;! Si vous êtes un cycliste professionnel, vous allez me dire que vous faites 70 km par sortie en moyenne. Mais tout le monde n’est pas surhumain, comme vous.

Il est important de comprendre que pour tenir ce challenge sur du long terme, il faut que la distance psychologique soit adaptée. 15 km c’est avant tout de la sueur, de la fatigue et un temps non négligeable passé sur son deux roues.

Il faut vous poser les bonnes questions&nbsp;: serais-je capable de tenir dans le temps, à faire une heure de trajet matinal&nbsp;? Est-ce que vous avez une douche à votre bureau&nbsp;? Est-ce qu’il y a de grosses montées&nbsp;?

Ne visez pas trop haut&nbsp;! Ou alors, dans ce cas-là, utilisez un vélo à assistance électrique. C’est d’ailleurs ce que je lui ai conseillé.

##### Travailler chez soi

Le télétravail est de plus en plus répandu. La réalité est que vous n’avez besoin d’aucun moyen de transport. Si c’est à votre compte, vous avez sans doute quelques déplacements professionnels à honorer, mais la marche à suivre est la même que n’importe quel voyage.

#### Emmener ses enfants à l’école

Comment ça, vous n’avez pas d’enfants&nbsp;? Qu’attendez-vous&nbsp;? Reproduisez-vous&nbsp;!

Dans la majorité des cas, les enfants sont dans une école «&nbsp;de secteur&nbsp;», non loin de votre logement principal. Si vous vivez dans un milieu urbain, le vélo est tout indiqué pour cela, que ce soit avec un porte-bébé à l’arrière ou — si vous avez plusieurs enfants — un vélo cargo. Le trajet matinal avec votre enfant peut être ludique&nbsp;: s’il a l’âge et sait faire du vélo, pourquoi ne pas faire la trajet en vélo en sa compagnie&nbsp;?

#### Faire ses courses

Non, vous n’avez pas besoin de voiture pour faire vos courses&nbsp;! Enlevez-vous ça de la tête&nbsp;! En Inde, des artisans transportent des dizaines de kilos de matériaux avec un simple vélo chaque jour. Tout est une question d’outil adapté à votre besoin.

En ce qui me concerne, j’ai un vélo avec des sacoches attachées à mon porte-bagage. Il m’arrive d’ajouter à ça un sac de randonnée. Vous pouvez aussi accrocher une simple cagette de bois à votre porte-bagage ou un panier à votre guidon, cela fait très bien l’affaire. Conseil&nbsp;: gardez toujours quelques tendeurs à portée de main, si vous faites trop de courses, vous pourrez toujours attacher votre sac.

Pour une personne seule, les sacoches suffisent, mais comment faire quand vous avez une famille de 4, 5 voir davantage de bouches à nourrir&nbsp;? Encore une fois, une simple remorque attachée à votre vélo fera l’affaire&nbsp;!

Dans tous les cas, vous penserez vos courses différemment en les faisant à bicyclette&nbsp;: prenez l’essentiel, tenez-vous-en à votre liste pour éviter le superflu, et tout devrait se passer correctement.

Si vous disposez d’une supérette en bas de chez vous, c’est idéal&nbsp;! Au cas où il vous manquerait un ingrédient, vous pouvez même y aller à pied.

Dans un autre registre, certaines enseignes vous proposent de vous livrer directement vos courses à domicile, et certains sites peuvent vous envoyer de manière programmée certains articles de consommation courante. Internet regorge de produits de qualité et il est possible d’obtenir tout ce que vous pourriez trouver dans le commerce, et même plus&nbsp;! J’aurais pu vous conseiller de vous faire livrer plutôt que d’aller faire vos courses en voiture, ce ne serait en réalité que déplacer le problème. Selon l’Ademe, «&nbsp;50 % du gazole consommé en ville l’est pour le transport de marchandises&nbsp;». Autant dire que passer une commande par Internet revient à faire des centaines de kilomètres en camion aux produits que vous commandez.

Essayez plutôt de penser local&nbsp;: réduisez au maximum le trajet entre le lieu de conception du produit et votre placard. Plus la distance est courte, plus l’indice carbone de l’objet en question sera pauvre. L’idéal est de produire soi-même sa nourriture, mais tout le monde n’a pas le temps ou l’espace nécessaire. Une autre solution&nbsp;: Les AMAP (Association pour le Maintien d’une Agriculture Paysanne), qui proposent généralement des paniers hebdomadaires ou mensuels avec des fruits et légumes de saison, et parfois même de la viande locale&nbsp;!

#### Partir en vacances

Il est illusoire de penser que vous avez besoin d’un véhicule pour partir en vacances. Lorsque vous vous rendez dans un lieu paradisiaque, est-ce que vous allez garer votre voiture dans l’avion et ressortir avec&nbsp;? Non.

La majorité des destinations outre-mer vous permettent d’aller où vous voulez sans avoir à louer un véhicule, il y a toujours quelque chose à faire à quelques pas de votre hôtel. Si ce n’est pas le cas, préparer votre voyage comme il se doit en vérifiant les alternatives à votre disposition sur place.

Pour les vacances régionales ou nationales&nbsp;: prenez le train ou un covoiturage et votre vélo, c’est l’idéal. Lorsque vous (ou votre conjoint) faites plusieurs heures de voiture pour aller jusqu’à la destination de votre choix, vous finissez le trajet fatigué, énervé, excédé. En plus du temps passé à conduire, vous êtes à bout et allez utiliser votre première journée de vacances à vous reposer. N’oubliez pas que dans un voyage, le trajet est presque plus important que la destination.

Il y a quelques années, j’ai passé avec ma compagne un fabuleux week-end au château le Martinet, à Violès. Sur notre route, après avoir pris le train, nous avons visité la ville d’Orange et son fabuleux théâtre antique. Pour rejoindre le château, nous sommes allés jusqu’à la ville de Violès en car. Cependant, faute d’avoir planifié notre trajet, nous n’avions pas anticipé que la distance entre l’arrêt de car et le château prenait environ 1 heure. Nous étions au bout du rouleau, après avoir marché toute la journée, mais nous avons tout de même trouvé la force de nous mouvoir jusqu’à notre chambre. Une fois arrivé, notre hôte nous a expliqué qu’elle aurait pu venir nous chercher en ville, plutôt que de faire toute cette route à pied. Cependant, nous avons tout de suite pu apprécier notre chambre à sa juste valeur, et rater le petit déjeuner du lendemain matin. Cela ne nous a pas empêchés de nous balader tout au long de la journée le lendemain.

#### Aller voir sa famille

L’avantage en allant voir sa famille, c’est que vous pouvez demander à ce qu’on vous récupère au train. Si la gare n’est pas très loin, vous pouvez aussi embarquer et poursuivre votre périple en vélo.

#### Déménagement

Transporter de lourdes ou volumineuses charges peut être source de nœuds dans votre cerveau. Vous allez effectivement devoir utiliser un véhicule motorisé, de préférence à 4 roues, pour transporter toute votre vie. Mais dans une grande majorité des cas, vous aurez besoin d’un véhicule plus grand qu’une simple voiture&nbsp;: une camionnette est tout indiquée. Dans ce cas, voici les solutions qui s’offrent à vous&nbsp;:

* Si vous avez le permis, vous pouvez louer pour la journée un véhicule utilitaire pour quelques dizaines d’euros.
* Si vous n’avez pas le permis, vous pouvez demander à un ami qu’il vous aide dans votre déménagement en conduisant votre location.
* Si vous n’avez pas d’ami (c’est triste, mais ça arrive), vous pouvez faire appel à un service de déménagement, qui s’occupe de transporter d’un point A à un point B toutes vos affaires. Dans le service est même inclus l’emballage de vos biens selon les contrats.

La plupart du temps, lorsque j’achète du mobilier, je me fais livrer directement à domicile, la plupart des enseignes proposent ce service. Cependant, il arrive parfois qu’un ami vienne m’aider, lorsque certains appareils ne sont livrés qu’au pied de votre immeuble, ou proposent un tarif prohibitif pour transporter votre appareil jusqu’à votre palier. À ce moment-là, un échange de bons procédés, je troque mes connaissances en informatique contre des biceps musclés.

Les coursiers en vélo permettent maintenant de déplacer de lourdes charges&nbsp;: certains transportent aisément des lave-vaisselles et autres objets très encombrants sur leurs cargos bike, ou en utilisant une remorque à un vélo.

#### Intempéries

Des lunettes de ski couvrent mes yeux. Mes gants, qui ont déjà été mis à rude épreuve ces derniers jours sont prêts à me protéger des intempéries. Un pantalon de pluie un peu moche - toujours moins que le lycra - fait office de protection, à l'épreuve de la moindre goutte de pluie ou de chaque flocon de neige.

Je sors de chez moi envahi en quelques secondes par un froid glacial. Quelques minutes après avoir chevauché mon destrier, mon corps se réchauffe enfin.

## Quel moyen de transport utiliser ?

Il serait simple de "sauter" directement de la voiture au vélo, car on ne va pas se mentir, le choix  du deux roues devient presque une évidence lorsque l'on a épuisé le stock des moyens mécaniques ou électriques de se déplacer.

Et pourtant, on peut considérer chaque trajet, chaque destination ou chaque voyage d'une manière unique. Tout comme manger, boire ou respirer, se déplacer est presque vital, c'est au minimum un acte indispensable à notre survie. Au lieu de le subir, autant choisir ses armes, autant se passer de la nécessité pour mêler l'utile à l'agréable.

J'ai évoqué précédemment les bienfaits des modes actifs sur le corps. Mais chaque pas ou chaque coup de pédale est un choix que vous faites, un vote pour privilégier un mode de déplacement.

Le chapitre suivant va évoquer les différents moyens de vous déplacer sans avoir recours à un moyen de transport personnel utilisant une énergie fossile. Cette rubrique est loin d’être exhaustive, et elle inclut aussi des services.

### Auto-stop

Pointez votre pouce en direction de la ou vous voulez aller, ou indiquez votre destination avec un feutre épais sur un gros bout de carton. Vous n’avez plus qu’à espérer que quelqu’un s’arrête. Si cette pratique est populaire en milieu rural, elle n’est pas vraiment usitée en ville.

Notez que la décision de la part d’un automobiliste de prendre un autostoppeur se fait en quelques secondes. Alors évitez de faire peur pour accroître vos chances d’être pris. Pour cela, rien de plus simple&nbsp;: munissez-vous de votre plus beau sourire et d’une bonne dose de patience. Car oui, le stop n’est pas une science exacte.

Il y a quelques années, j’ai été pris en stop par un chauffeur de taxi. Il était en direction d’une course, et semblait sympathique. Je lui ai quand même demandé s’il comptait me faire payer la course, car je n’avais pas un sou en poche. Non, il était tout simplement de bonne humeur.

Dans le doute, munissez-vous d’une bombe lacrymogène ou d’une batte de baseball (bien que ce soit moins pratique à transporter&nbsp;: la matraque télescopique semble plus indiquée), on ne sait jamais sur qui l’on peut tomber.

### Autopartage

L’autopartage prend généralement la forme d’une organisation mettant à disposition une flotte de véhicules pouvant être utilisée par les clients le temps de leurs déplacements. Dès que le véhicule n’est plus utilisé, une autre personne peut l’utiliser.

### Covoiturage

Le covoiturage a été pensé pour proposer un désencombrement des routes, et partager les frais liés au déplacement et à l’entretien de la voiture. Bien que le but initial ne soit pas de gagner de l’argent pour le conducteur, une voiture «&nbsp;remplie&nbsp;» peut aisément lui rembourser intégralement son voyage.

J’ai souvenir d’une connaissance, Gilbert, qui au détour d’une conversation m’a confié qu’en plus de se faire rembourser intégralement ses déplacements par son entreprise, puisqu’il s’agissait de déplacements professionnels en tant que commercial, il publiait des annonces de covoiturage et arrondissait ainsi ses fins de mois avec près de 300 € de bénéfices. Cela pourrait vous donner des idées si vous êtes conducteur, mais il ne me semble pas que ce soit légal.

Cependant, si vous êtes conducteur et que vous faites un trajet conséquent (à partir d’une vingtaine de minutes) et fréquent, mettez une annonce en ligne. À la fin du mois, les sommes accumulées peuvent vite représenter une petite fortune.

### Marche

Aucun accessoire n’est nécessaire, vous ne dépendez de rien ni personne, et cela ne coûte rien. À part si vous êtes culs-de-jatte, mais ceci est une autre histoire. Si vous êtes pressé, vous pouvez même courir (à condition de ne pas être chargé comme une mule). L’OMS recommande de marcher au moins 10 000 pas chaque jour&nbsp;: ceci représente environ 6 km. Alors, n’hésitez pas et profitez chaque jour de ce petit moment de détente pour déconnecter.

L’endroit où vous habitez se prête — ou pas — à la marche à pied, en fonction de la distance entre chez vous et les commerces alentour, ou de l’endroit ou vous travaillez. En effet, un piéton habitant en centre-ville est plus mobile qu’un automobiliste en agglomération. Le piéton n’a qu’à faire quelques pas pour rejoindre les commerces de son quartier. En matière de mobilité, il est important de comprendre que ce n’est pas la distance qui compte, mais le temps que l’on met à la parcourir.

### Mobilité ludique

Le point commun des transports ludique&nbsp;: un faible encombrement qui permet de les transporter à la main lorsque vous êtes arrivé à destination, et ils sont amusants à utiliser. Enfin, lorsque vous savez en faire&nbsp;! De plus, ces moyens sont très intéressants et pratiques à utiliser dans une optique d’intermodalité, ou pour de très courts trajets, car ils ne prennent quasiment pas de place et peuvent être stockés aisément dans un casier, le coin d’une pièce et sont acceptés dans les transports en commun.

Pour les aficionados de l'une de ses pratiques, ne considérez pas que cette catégorisation soit une insulte. Je suis moi-même un fervent pratiquant de skate et de roller.

#### Board

Le skate est le moyen de transport le moins encombrant, qu’il s’agisse d’un cruiser, d’un longboard, ou du traditionnel skateboard pour aller tâter la rampe, vous lui trouverez toujours une place chez vous ou dans vos déplacements, à l’abri, et ne vous la ferez donc jamais voler.

Le skateboard «&nbsp;à figure&nbsp;» n’est pas la planche la plus adaptée au transport. À cause de ses petites roues, la moindre aspérité dans le bitume peut venir à bout des meilleurs skateurs. Mais si vous n’avez que ça sous la main ou que vous voulez faire quelques figures de temps en temps, il est tout indiqué.

Le longboard est, comme son nom l’indique, grand et lourd (surtout dans sa version en bois), mais il est le plus maniable. Avec de grosses roues, vous pourrez sans soucis passer les trottoirs sans vous reprendre.

Le cruiser, un des premiers modèles de board qui est redevenue à la mode, est en générale petite, maniable, et très légère. Vous pouvez en trouver des neuves dans n’importe quel magasin de sport pour moins de 50 €.

Le plus gros avantage à utiliser une planche c’est que, du fait de sa petite taille, vous pourrez mixer l’usage de votre board avec du covoiturage ou les transports en commun. C’est un avantage incomparable face au vélo&nbsp;: les bus ne les acceptent pas en général, surtout lorsqu’il n’y a pas de soute à disposition, et il faut pour le covoiturage un matériel spécifique (porte-vélo), ce qui n’est pas toujours le cas.

Adapté aux trajets courts (moins de 10 minutes), pour aller acheter le pain par exemple, ou pour finir un trajet en bus (comme vu dans le paragraphe précédent), il n’est cependant pas des plus confortables, et vous devrez souvent passer en mode marche, entre les trottoirs et autres routes inadaptées.

J’ai toujours une planche, un petit cruiser en plastique, mais je vous avoue que je l’utilise en général qu’une fois par mois. Je crois que si je l’ai encore, c’est par nostalgie de toutes mes années passées sur un skate.

#### Rollers

Si vous songez sérieusement à utiliser le roller dans votre quotidien, choisissez une bonne paire de rollers de randonnée, avec au moins des roues de 90 millimètres.

Le principal problème du roller est qu’il n’est que toléré, ou que vous en fassiez. Sur le trottoir, il est autorisé, mais vous devez faire attention aux piétons, cela va de soi. Sur les pistes cyclables, les vélos sont prioritaires. Sur la route, je vous conseille de faire très attention&nbsp;: les mouvements amples du patinage peuvent surprendre l’automobiliste.

Et n’oubliez pas&nbsp;: une simple mamie contrariée peut vous envoyer son sac à main en pleine figure si elle est de mauvaise humeur. Oui, j’en ai déjà fait les frais.

#### Trottinette

Alors qu'elle avait été pensée et distribuée en premier lieu comme un jouet pour enfant, la trottinette s'est imposé en ville comme un outil de choix pour les trajets "ultra court". Facile à prendre en main et transportable, elle a connu un renouveau considérable dans sa version à assistance électrique.

#### Hoverboard

Non, je ne vais pas parler de la célèbre planche rose aux pieds de Marty McFly dans Retour vers le Futur. Il s’agit plutôt d’un genre de segway, sans le bras sur lequel poser vos mains. Utilisant le principe gyrostatique, il vous suffit de déplacer votre poids à l’avant sur l’un des côtés de la planche pour avancer à droite ou à gauche.

### Train

Le train et moi, ça a toujours été intense. Quand j’étais au lycée, j’avais une petite amie que j’allais voir en train de temps à autre. Lorsque j’ai commencé mes études supérieures, j’ai en parallèle commencé à l’utiliser régulièrement, le week-end généralement pour rentrer voir mes parents.

Je n’ai pas très envie de rentrer dans le débat de la ponctualité des trains, mais les faits sont là&nbsp;!

Concernant la réservation, je vous suggère d'essayer le service de Trainline[^5-6] (autrefois Capitaine Train), qui propose une interface ergonomique et très bien pensée pour vos achats de billets en ligne. Des applications sont bien entendu disponibles pour smartphones.

[^5-6]: https://trainline.fr

### Transports en commun

J’ai utilisé pendant des années les transports en commun, surtout entre 2 achats de vélo (oui, mes vélos ont une étrange propension à disparaître), ou lorsque l’hiver était rude et que ma motivation à monter à vélo disparaissait soudainement.

L’avantage indéniable des transports en commun, c’est cette capacité à couvrir (en fonction des régions et agglomérations) de grandes surfaces avec un seul abonnement, par l’interconnexion de bus, tram, métro, ainsi que la fréquence des passages, adaptés aux heures d’affluence. De plus, vous pouvez finir votre nuit ou prendre du temps pour lire pendant votre voyage.

Le saviez-vous&nbsp;? Avoir sa voiture revient en moyenne 20 fois plus cher qu’un abonnement annuel aux transports en commun.

### Vélo

«&nbsp;Ce cheval de bois et d’acier comble un vide dans l’existence moderne ; il ne répond pas seulement à des besoins, mais à des aspirations.&nbsp;» [^5-7]

Si je ne devais en garder qu’un, ce serait le vélo. Je me suis demandé pendant un moment pourquoi la petite reine surpassait tous les autres moyens de transport. C’est en réalité d’une simplicité enfantine&nbsp;: pour la même énergie fournie, le vélo permet d’aller 2 à 3 fois plus vite. Sans vous fatiguer, vous pouvez parcourir de nombreux kilomètres.

Disons que l’on peut aller plus loin, plus vite, tout en étant à échelle humaine&nbsp;: vous vous tractez à la force de vos mollets, sur un appareil léger et peu encombrant. Et comme la marche, vous avez une vitesse qui vous permet d’observer ce qui se passe autour de vous et de vous arrêter rapidement pour apprécier votre environnement.

#### Cargo Bike

L’autre jour, j’écoutais une émission de radio. Un plombier avait décidé de faire ses dépannages en vélo. Son appareil de prédilection&nbsp;? Un cargo bike. Avec cet appareil, il est possible de charger de grandes quantités de matériel, de faire vos courses, d’emmener vos enfants à l’école.

Les initiatives d’artisans et entrepreneurs montant un business bâti autour du transport ou dépannage en cargo bike se multiplient.

Une alternative un peu moins chère que le cargo bike (qui est un peu onéreux), c’est d’ajouter une remorque à votre vélo. Il existe des dizaines de modèles, vous trouverez sans aucun doute celui qui vous conviendra. Les prix commencent aux alentours de 100 €, et peuvent s’envoler à plusieurs milliers d’euros.

#### Vélo à assistance électrique

Je suis un inconditionnel du vélo électrique, aussi appelé VAE. J’en ai déjà parlé précédemment, et en ce qui me concerne, c’est une réelle alternative qui se présente lorsque vos trajets réguliers sont un peu trop longs pour être fait avec un vélo classique. Il vous permet d’aller plus vite, tout en conservant une allure raisonnable. Il vous permet de gravir les côtes les plus ardues sans la moindre difficulté, sans sueur. Tout comme les vélos, vous n’avez pas d’obligation de souscrire à une assurance pour rouler avec.

Lors d’un de mes trajets en VAE, un autochtone m’a clairement fait comprendre qu’il n’était pas convaincu de la pertinence écologique de cette solution, car l'électricité est produite en grande majorité par des centrales nucléaires. Et il n’a pas tord&nbsp;! En effet, 75% de l’électricité est conçu dans des centrales nucléaires,  et seulement 15% par des énergies renouvelables (éoliennes, photovoltaïque, hydraulique)[^5-8]. Pour faire pencher la balance en faveur des énergies vertes, il convient de prendre un abonnement d’électricité auprès de fournisseurs dédiés, qui investissent dans des sources d’énergie non nucléaire, tel que Planète Oui ou Enercoop.

Il existe des modèles de e-bikes proposant une vitesse jusqu’à 45 km/h, mais ceux-ci sortent du cadre de la réglementation des VAE, ils sont dans la même catégorie que les scooters.

### Voiture électrique

Bien que la couverture de ce livre soit illustrée par une Tesla et que la première citation de ce livre - celle de Schwarzenegger - évoque une dualité entre voiture électrique et voiture à essence, ceci ne veut pas dire que j'adhère complètement au concept de la voiture « nucléaire » (voir le chapitre sur le [vélo à assistance électrique](#velo-assistance-electrique)). S’il est vrai que sur le plan écologique cette alternative semble être de bien meilleur augure, d’autres éléments, tel que la congestion - dû au volume du véhicule - est rarement prise en compte, pour privilégier un certain confort : climatisation, autoradio ou encore siège éjectable avec jetpack et parachute intégré.

[^5-7]: Le Vélocipède illustré, 1869

[^5-8]: EDF, (2013). «&nbsp;[Électricité en france&nbsp;: les différentes sources d'énergie](https://web.archive.org/web/20140703015148/https://www.lenergieenquestions.fr/wp-content/uploads/2013/05/source-production-%C3%A9lectricit%C3%A91.pdf)&nbsp;»

## Conclusion

J'ai la chance de n'avoir jamais connu de bouchons en tant que conducteur. Vous savez, lorsque vous partez dans le sud en même temps que tout le monde, que la route se congestionne, et que vous ne pouvez plus parcourir que quelques mètres en une heure. Vous vous faites la réflexion que vous iriez plus vite à pied, a marcher sur le bas-côté de la route avec vos bagages.

J'ai conscience que mes reflexion ne seront pas partagées par tous, mais à mon sens, le trajet est souvent bien plus important que la destination.

Au cours de cet ouvrage, j’ai dessiné les contours de ma vision et de mes espoirs pour les transports dans le futur. Le recul de la voiture au profit du vélo et des piétons, la manière dont sont pensées les villes et leurs influences directes sur nos choix de déplacement au quotidien.

J’ai abordé en surface des notions qu’il vous faudra approfondir, voire vous approprier pour peut-être mieux comprendre leurs importances. Je peux citer entre autres la décroissance, la consommation, le crédit et le développement durable. Tous ces concepts sont liés et forment un ensemble que je vous conseille d’appréhender.

Je ne sais pas si mon quotidien sans voiture compense d’autres choix moins réfléchis dans la balance de la vie, comme mon régime alimentaire carnassier ou mes prédispositions générationnelles à abuser de la technologie.

Vivre sans voiture est une autre manière de «&nbsp;vivre local&nbsp;», à l’heure où vous pouvez traverser le globe en seulement quelques heures, un avion de ligne avoisinant en moyenne les 500 km/h.

Est-ce que vous êtes prêt à changer vos habitudes&nbsp;? Non, je crois que ce n’est pas la bonne question. Est-ce que vous voulez gagner de l’argent, sans avoir besoin de rogner sur votre budget&nbsp;? Est-ce que vous êtes prêt à être plus en forme au quotidien, sans avoir à abuser du sport&nbsp;? Est-ce que vous voulez participer avec moi à rendre ce monde meilleur&nbsp;?

S’il y a une de ces questions auquel vous répondez «&nbsp;oui&nbsp;», vendez votre voiture, et commencez à changer votre quotidien.

## Lexique

### Autosolisme

Lorsqu'un automobiliste circule seul dans sa voiture.


### Décroissance

Concept selon lequel la croissance économique constitue davantage une source de nuisances que de bienfaits pour l’humanité.

La question de la décroissance est abordé dans le chapitre *[Une question économique](#une-question-economique)*.


### Intermodalité

Utilisation de plusieurs modes de transport au cours d’un même déplacement.

### Lignes de désir

Lors d’aménagements urbains, les paysagistes voient régulièrement se dessiner des “lignes de désir”. Il s’agit d’une érosion du sol créé par le passage répété de piétons, cyclistes, ou animaux souhaitant se déplacer d’un point A à un point B par le plus court (ou le plus simple) chemin. Ceci indique un aménagement inapproprié, voir gênant, de l'environnement urbain.

### Modes actifs

Les modes actifs sont des moyens de transport non motorisés. Ils peuvent cependant être mécanisés. Par exemple, la marche et le vélo sont des modes actifs.

### Pendulaires

Personne qui effectue des déplacements quotidiens entre un centre-ville et une périphérie urbaine.

### Vélotaff

Aller au travail en vélo.

## Remerciements

Je tiens à remercier toutes les personnes qui se reconnaîtrons dans ce livre, celles que j'ai dérangé avec mes questions étranges, et les autres, qui lisent.

La première préversion à été révisé en premier lieu par Lucie et Valérie Lacoste.

## Bibliographie

#### Documentaires
- Andersen K., (2014). «&nbsp;COWSPIRACY: The Sustainability Secret&nbsp;»
- Radio-Canada Info, (01/09/2015). «&nbsp;[Copenhague&nbsp;: le paradis du vélo](https://www.youtube.com/watch?v=7qxv3DwqZsA)&nbsp;»

#### Livres et études
- Bergeron R., (1999). «&nbsp;Le Livre Noir de l’automobile&nbsp;»
- Weiss E., (2010). «&nbsp;Bike Snob&nbsp;: Chroniques d’un fou du vélo&nbsp;»
- Robert M., (2005). «&nbsp;[Pour en finir avec la société de l’automobile](http://www.worldcarfree.net/resources/freesources/pour_en_finir.pdf)&nbsp;»
- Ipcc, (2013). «&nbsp;Climate Change 2013: The Physical Science Basis&nbsp;»
- Fressoz J.-B., Bonneuil C., (2013). «&nbsp;L'évènement anthropocène, la Terre, l'histoire et nous&nbsp;»
- OMS, (2015). «&nbsp;[Rapport OMS de situation sur la sécurité routière 2015](http://www.who.int/violence_injury_prevention/road_safety_status/2015/fr/)&nbsp;»
- Lesclide R., (1869). «&nbsp;Manuel du vélocipède&nbsp;»
- Huxley A., (1931). «&nbsp;Le meilleur des mondes&nbsp;»

#### Articles
- Chauveau L., (2013). «&nbsp;[Les vaches françaises émettent autant de gaz en un an que 15 millions de voitures&nbsp;!](http://www.sciencesetavenir.fr/nature-environnement/20130222.OBS9788/les-vaches-francaises-emettent-autant-de-gaz-en-un-an-que-15-millions-de-voitures.html)&nbsp;», Sciences et Avenir [en ligne], (page consultée le 12/05/2016)
- Cloutier J-S., (2015). «&nbsp;Copenhague&nbsp;: le paradis du vélo&nbsp;», [Radio-Canada Info](https://www.google.com/url?q=https://www.youtube.com/channel/UClxaaAzHu1B5EoTtBYea7ig&sa=D&ust=1509634949906000&usg=AFQjCNE6nYhS6H6vnBv6XAyc2Ybsjuz5kQ) [en ligne]
- France Nature Environnement, 2009\. «&nbsp;[La livraison de marchandises en ville](http://intranet.ariege-expansion.com/123/actu_1232267.pdf)&nbsp;» [en ligne], (page consultée le 12/05/2016), p. 3
- Lafon C., (2014). «&nbsp;[Transport&nbsp;: pourquoi le Danemark est le roi du vélo](http://maplanete.blogs.sudouest.fr/archive/2014/11/29/le-danemark-roi-du-velo-1029725.html)&nbsp;» Sud Ouest [en ligne], (page consultée le 12/05/2016)
- Le Monde.fr, (2015). «&nbsp;[Les villes européennes qui ont ou vont bannir les voitures des centres-villes](http://www.lemonde.fr/pollution/article/2015/10/22/tour-d-europe-des-futurs-et-actuels-centres-villes-sans-voiture_4795189_1652666.html#UFgiyvwVKhmMxA4i.99)&nbsp;» Le Monde [en ligne], (page consultée le 11/05/2016)
- Le Point.fr, (2013). «&nbsp;[Permis de conduire&nbsp;: la grande supercherie](http://www.lepoint.fr/automobile/securite/a-quand-un-permis-de-conduire-pour-tous-27-06-2013-1686458_657.php)&nbsp;» Le Point [en ligne], (page consultée le 11/05/2016)
- Haentjens J., Lemoine S., «&nbsp;Eco-urbanisme&nbsp;: défis planétaires, solutions urbaines&nbsp;»
- Hart-Schmidt B., «&nbsp;[Roadside eats](http://index.truman.edu/pdf/2010-2011/february24/page9.pdf)&nbsp;»,
- Latribune.fr. «&nbsp;[Les Français recourent toujours largement au crédit pour acheter leur voiture](http://www.latribune.fr/vos-finances/banques-credit/credit-auto-moto/20101007trib000556639/les-francais-recourent-toujours-largement-au-credit-pour-acheter-leur-voiture.html)&nbsp;»
- Europe 1, (25/09/2015). «&nbsp;[Mais comment peut-on vivre sans voiture&nbsp;?](http://www.europe1.fr/emissions/allo-jean-michel/mais-comment-peut-on-vivre-sans-voiture-allo-jean-michel-25092015-2520309)&nbsp;»
- Ruscio L., (19/08/2014). «&nbsp;[Les nouveaux trains Régiolis à rebours des déplacements intermodaux](http://www.rue89strasbourg.com/trains-regiolis-velos-ter-alsace-70916)&nbsp;»
- OMS, (04/04/2002). «&nbsp;[La sédentarité, une cause majeure de maladies et d&#039;incapacités](http://www.who.int/mediacentre/news/releases/release23/fr/)&nbsp;»
- Nicolson A., (17/01/2006). «&nbsp;[Where have all our hedgehogs gone?](https://www.theguardian.com/environment/2006/jan/17/g2.ruralaffairs)&nbsp;»
- EDF, (2013). «&nbsp;[Électricité en france&nbsp;: les différentes sources d'énergie](https://web.archive.org/web/20140703015148/https://www.lenergieenquestions.fr/wp-content/uploads/2013/05/source-production-%C3%A9lectricit%C3%A91.pdf)&nbsp;»
