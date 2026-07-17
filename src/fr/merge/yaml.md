---
title: "Introduction au YAML"
layout: rivers
---

# Introduction au YAML

YAML est un langage de sérialisation de données conçu pour être lisible par les humains. Il est surtout utilisé pour les fichiers de configuration, mais il peut représenter les mêmes structures de base que JSON : des associations, des séquences et des valeurs scalaires.

Cette page est une version condensée et actualisée de mon ancien guide [Introduction to YAML](https://github.com/arthurlacoste/Introduction-To-YAML). Elle couvre YAML 1.2 et la révision actuelle 1.2.2 de la spécification.

<div class="yaml-course" data-yaml-course>
  <section class="course-dashboard" aria-label="Progression du cours YAML">
    <div class="course-dashboard__top"><div><strong data-score>0.0 / 10</strong><span class="course-level" data-level>🥔 Parseur patate</span></div><span data-progress-text>0/30 questions</span></div>
    <progress data-course-progress value="0" max="30">0%</progress>
    <div class="course-dashboard__stats"><span data-streak>🔥 série de 0</span><span data-stars>☆☆☆☆☆☆☆☆☆☆ 0/10 chapitres parfaits</span><label class="timer-switch"><input type="checkbox" data-timer-toggle> Chronomètre</label><span data-timer>Chronomètre désactivé</span></div>
    <div class="course-actions"><button class="course-button" type="button" data-retry-wrong hidden>Réessayer les mauvaises réponses</button><button class="course-button" type="button" data-reset-course>Réinitialiser le cours</button></div>
  </section>
</div>

## Les bases

Un fichier YAML est un simple texte Unicode. Utilisez UTF-8. Indentez avec des espaces, jamais avec des tabulations. La profondeur d’indentation est libre, mais tous les éléments d’un même niveau doivent être alignés.

Les commentaires commencent par `#`, sauf lorsque ce caractère se trouve dans une chaîne entre guillemets.

```yaml
# Cette ligne est ignorée
debug: false # Cette partie est également ignorée
name: '#pas-un-commentaire'
```

YAML est sensible aux espaces. Deux espaces par niveau constituent une convention courante : le fichier reste lisible sans devenir trop large lorsque les structures sont profondément imbriquées.

<section class="yaml-quiz" data-quiz="1">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Les bases</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c1q1" data-explanation="Les tabulations ne peuvent pas servir à l’indentation. Des espaces cohérents définissent la structure.">
    <legend>1. Quelle indentation faut-il utiliser en YAML ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Uniquement des tabulations</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Des espaces cohérents</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">N’importe quel mélange de tabulations et d’espaces</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c1q2" data-explanation="Un dièse dans une chaîne entre guillemets fait partie des données, ce n’est pas un commentaire.">
    <legend>2. Quand le caractère # commence-t-il un commentaire ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Toujours</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Uniquement au début d’un fichier</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="true">En dehors d’une valeur scalaire entre guillemets</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c1q3" data-explanation="UTF-8 est le choix par défaut pour assurer l’interopérabilité des textes YAML.">
    <legend>3. Quel encodage faut-il utiliser par défaut ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">UTF-8</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">ASCII uniquement</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Latin-1</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Associations

Les associations relient des clés à des valeurs. Elles sont comparables aux objets en JSON, aux dictionnaires en Python ou aux tableaux associatifs en PHP.

```yaml
project: arthak.fr
public: true
port: 8080
```

Les associations imbriquées sont créées grâce à l’indentation :

```yaml
server:
  host: 127.0.0.1
  port: 8080
  tls:
    enabled: false
```

Il existe également une syntaxe compacte, dite « flow » :

```yaml
server: { host: 127.0.0.1, port: 8080 }
```

Utilisez la syntaxe en blocs pour la plupart des configurations. La syntaxe flow est utile pour les valeurs courtes qui tiennent naturellement sur une seule ligne.

<section class="yaml-quiz" data-quiz="2">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Associations</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c2q1" data-explanation="Les associations relient des clés uniques à des valeurs.">
    <legend>1. À quoi ressemble le plus une association YAML ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Une file ordonnée</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Un objet clé-valeur</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Un flux binaire</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c2q2" data-explanation="Un deux-points suivi d’un espace associe la clé à la valeur.">
    <legend>2. Quelle entrée d’association est correctement écrite ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">port=8080</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">port: 8080</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">port -> 8080</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c2q3" data-explanation="Les clés indentées appartiennent au nœud parent de l’association.">
    <legend>3. Que crée ici l’indentation de host sous server ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Une association imbriquée</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Un bloc de commentaires</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Un second document</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Séquences

Les séquences sont des listes ordonnées. Chaque élément commence par un tiret suivi d’un espace.

```yaml
languages:
  - French
  - English
  - YAML
```

Une séquence peut contenir des associations :

```yaml
services:
  - name: website
    port: 8080
  - name: api
    port: 3000
```

Elle peut également utiliser la syntaxe flow compacte :

```yaml
languages: [French, English, YAML]
```

<section class="yaml-quiz" data-quiz="3">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Séquences</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c3q1" data-explanation="Les éléments d’une séquence en blocs commencent par un tiret suivi d’un espace.">
    <legend>1. Comment commence un élément de séquence en blocs ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Par un tiret et un espace</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Par un deux-points</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Par une esperluette</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c3q2" data-explanation="Les collections YAML peuvent être imbriquées librement.">
    <legend>2. Une séquence peut-elle contenir des associations ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Non</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Uniquement en JSON</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="true">Oui</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c3q3" data-explanation="Les crochets représentent une séquence en syntaxe flow.">
    <legend>3. Quelle est la syntaxe d’une séquence flow ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">{a, b, c}</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">[a, b, c]</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">(a, b, c)</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Valeurs scalaires et guillemets

Une valeur scalaire est une valeur unique : une chaîne, un nombre, un booléen, une valeur nulle, une date ou toute autre valeur reconnue par le parseur.

```yaml
name: Arthak
age: 37
enabled: true
empty: null
```

Placez les chaînes entre guillemets lorsque leur type peut être ambigu ou lorsqu’elles contiennent des caractères ayant une signification syntaxique.

```yaml
version: '1.0'
answer: 'true'
channel: '#general'
time: '12:30'
```

Les apostrophes conservent la plupart des caractères littéralement. Pour inclure une apostrophe, doublez-la :

```yaml
message: 'C''est du YAML valide'
```

Les guillemets doubles prennent en charge les séquences d’échappement comme `\n`, `\t` et les échappements Unicode.

```yaml
message: "Première ligne\nDeuxième ligne"
```

### YAML 1.1 contre YAML 1.2

Les anciens parseurs YAML 1.1 peuvent interpréter des valeurs comme `yes`, `no`, `on` et `off` comme des booléens. YAML 1.2 limite les booléens de son schéma principal à `true` et `false`.

Pour une configuration portable, utilisez `true` et `false`, et placez entre guillemets les mots qui doivent rester des chaînes.

```yaml
legacy_answer: 'yes'
modern_answer: true
```

<section class="yaml-quiz" data-quiz="4">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Valeurs scalaires et guillemets</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c4q1" data-explanation="Les guillemets empêchent l’interprétation implicite en booléen.">
    <legend>1. Pourquoi placer une valeur comme true entre guillemets ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Pour la forcer à rester une chaîne</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Pour la transformer en nombre</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Pour créer une ancre</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c4q2" data-explanation="Dans une valeur YAML entre apostrophes, une apostrophe est représentée en la doublant.">
    <legend>2. Comment inclure une apostrophe dans une valeur déjà entourée d’apostrophes ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">En l’échappant avec une barre oblique inverse</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">En doublant l’apostrophe</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">C’est impossible</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c4q3" data-explanation="Le schéma principal de YAML 1.2 utilise true et false.">
    <legend>3. Quelles valeurs sont des booléens YAML 1.2 portables ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">yes et no</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">on et off</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="true">true et false</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Chaînes multilignes

Utilisez `|` lorsque les retours à la ligne ont une importance :

```yaml
description: |
  Première ligne.
  Deuxième ligne.
```

Utilisez `>` lorsque plusieurs lignes doivent devenir un seul paragraphe :

```yaml
description: >
  Ce texte est écrit sur plusieurs lignes
  mais il est normalement chargé comme un seul paragraphe.
```

Les indicateurs de chomping contrôlent les retours à la ligne finaux :

```yaml
keep_all: |+
  Text

strip_all: |-
  Text
```

`+` conserve les retours à la ligne finaux. `-` les supprime. Sans indicateur, YAML conserve un unique retour à la ligne final.

<section class="yaml-quiz" data-quiz="5">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Chaînes multilignes</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c5q1" data-explanation="Les valeurs scalaires littérales en blocs conservent les retours à la ligne.">
    <legend>1. Que conserve la valeur scalaire en bloc `|` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Les retours à la ligne</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Uniquement les espaces</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Les commentaires</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c5q2" data-explanation="Les valeurs scalaires repliées transforment la plupart des retours à la ligne en espaces.">
    <legend>2. Que fait normalement `>` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Il chiffre la valeur</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Il replie les lignes en un paragraphe</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Il crée une balise</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c5q3" data-explanation="L’indicateur de chomping « strip » supprime les retours à la ligne finaux.">
    <legend>3. Que fait l’indicateur de chomping `-` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Il supprime les retours à la ligne finaux</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Il ajoute une indentation</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Il commence une liste</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Plusieurs documents

Un flux YAML peut contenir plusieurs documents. Trois tirets commencent un nouveau document. Trois points peuvent terminer explicitement un document.

```yaml
---
name: first
---
name: second
...
```

De nombreux outils attendent exactement un document par fichier. N’utilisez donc les flux que lorsque l’application qui les consomme indique clairement les prendre en charge.

<section class="yaml-quiz" data-quiz="6">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Plusieurs documents</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c6q1" data-explanation="Trois tirets constituent le marqueur de début d’un document.">
    <legend>1. Quel marqueur commence un document ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">---</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">+++</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">***</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c6q2" data-explanation="Trois points constituent le marqueur de fin d’un document.">
    <legend>2. Quel marqueur termine explicitement un document ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">:::</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">...</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">///</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c6q3" data-explanation="De nombreuses applications attendent exactement un document par fichier.">
    <legend>3. Peut-on supposer que tous les consommateurs YAML acceptent les flux ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Oui</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Non</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Uniquement les navigateurs</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Ancres, alias et clés de fusion

Les ancres marquent des nœuds réutilisables avec `&`. Les alias y font référence avec `*`.

```yaml
defaults: &defaults
  retries: 3
  timeout: 10

production:
  settings: *defaults
```

La syntaxe des clés de fusion est largement implémentée et souvent utilisée pour étendre des associations :

```yaml
defaults: &defaults
  retries: 3
  timeout: 10

production:
  <<: *defaults
  timeout: 30
```

Les ancres et les alias font partie de YAML. La clé de fusion `<<` vient d’un type indépendant du langage défini pour YAML 1.1 et ne fait pas partie de la spécification principale de YAML 1.2. Sa prise en charge varie selon les parseurs. Préférez une configuration explicite lorsque l’interopérabilité est importante.

<section class="yaml-quiz" data-quiz="7">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Ancres, alias et clés de fusion</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c7q1" data-explanation="Une esperluette introduit le nom d’une ancre.">
    <legend>1. Quel symbole définit une ancre ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">&</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">*</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">!</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c7q2" data-explanation="Un astérisque introduit un alias.">
    <legend>2. Quel symbole référence une ancre ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">#</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">*</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">%</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c7q3" data-explanation="Les clés de fusion sont largement prises en charge, mais ne font pas partie de la spécification principale de YAML 1.2.">
    <legend>3. La syntaxe `<<` est-elle garantie par la spécification principale de YAML 1.2 ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Oui</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Non</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Uniquement pour les chaînes</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Balises et types explicites

Les balises identifient le type d’un nœud. Les balises standard commencent par `!!`.

```yaml
integer: 123
string: !!str 123
float: !!float 123
```

Les applications peuvent définir des balises personnalisées :

```yaml
release: !version 2.4.0
```

Les balises personnalisées dépendent de l’application. Un parseur YAML générique peut les conserver ou les rejeter s’il ne sait pas construire l’objet cible.

<section class="yaml-quiz" data-quiz="8">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Balises et types explicites</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c8q1" data-explanation="La balise standard de chaîne demande la création d’une chaîne.">
    <legend>1. Que demande `!!str` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Un type chaîne</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Un flux</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Une séquence</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c8q2" data-explanation="Les balises commençant par un seul point d’exclamation sont généralement locales et propres à l’application.">
    <legend>2. Que représente `!version` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Un commentaire</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Une balise propre à l’application</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Une fin de document</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c8q3" data-explanation="Un parseur générique peut conserver, rejeter ou laisser sans résolution les balises personnalisées.">
    <legend>3. Tous les parseurs doivent-ils comprendre les balises personnalisées ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Oui</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Non</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Uniquement en YAML 1.1</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Les variables n’existent pas en YAML

YAML ne possède aucun système natif de variables ou d’interpolation.

Cette syntaxe n’a de sens que si l’application qui charge le fichier l’implémente :

```yaml
home: ${HOME}
```

Les variables d’environnement, les templates, les inclusions et les expressions appartiennent aux outils construits autour de YAML, pas à YAML lui-même. Docker Compose, GitHub Actions, Ansible, Helm et d’autres systèmes ajoutent chacun leur propre sémantique.

Ne supposez pas qu’une fonctionnalité prise en charge par un outil basé sur YAML existe dans un autre.

<section class="yaml-quiz" data-quiz="9">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Les variables n’existent pas en YAML</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c9q1" data-explanation="L’interpolation relève de l’application qui charge le YAML.">
    <legend>1. YAML interpole-t-il lui-même `${HOME}` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Oui</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Non</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Uniquement sous Linux</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c9q2" data-explanation="GitHub Actions ajoute son propre langage d’expressions.">
    <legend>2. Qui définit les expressions dans un fichier YAML GitHub Actions ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">La spécification YAML</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">GitHub Actions</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Le navigateur</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c9q3" data-explanation="Chaque outil ajoute une sémantique différente autour du modèle de données YAML.">
    <legend>3. Peut-on supposer que les templates se comportent de la même manière dans tous les outils YAML ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Oui</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Non</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Uniquement avec des ancres</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Erreurs courantes

### Tabulations

Les tabulations ne constituent pas une indentation valide. Configurez votre éditeur pour insérer des espaces.

### Espace manquant après un deux-points

```yaml
# Incorrect ou interprété de façon inattendue
port:8080

# Correct
port: 8080
```

### Commentaires involontaires

```yaml
# La valeur devient « dark »
theme: dark # experimental

# Le dièse fait partie de la valeur
channel: '#design'
```

### Clés dupliquées

```yaml
port: 8080
port: 3000
```

Les clés d’une association doivent être uniques. Certains parseurs rejettent les doublons, tandis que d’autres conservent silencieusement une seule valeur. Traitez les doublons comme des erreurs.

### Faire confiance aux types implicites

Placez entre guillemets les identifiants, versions, dates et valeurs commençant par des zéros lorsqu’ils doivent rester des chaînes.

```yaml
postal_code: '01230'
release: '2026-07-17'
version: '1.20'
```

### Analyser dangereusement du YAML non fiable

Certaines bibliothèques peuvent construire des objets applicatifs à partir de balises. Lorsque vous chargez du contenu non fiable, utilisez le mode de chargement sécurisé du parseur et désactivez la construction arbitraire d’objets.

<section class="yaml-quiz" data-quiz="10">
  <div class="quiz-lock" data-quiz-lock hidden>🔒 Terminez le quiz du chapitre précédent pour déverrouiller celui-ci.</div>
  <h3>Quiz du chapitre · Erreurs courantes</h3>
  <p class="quiz-intro">Choisissez une réponse pour chaque question. Le résultat est immédiat.</p>
  <fieldset class="quiz-question" data-question="c10q1" data-explanation="Le comportement des parseurs varie : les doublons ne sont donc pas sûrs et doivent être rejetés.">
    <legend>1. Comment faut-il traiter les clés dupliquées dans une association ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Un remplacement sans risque</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Une erreur</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Une liste</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c10q2" data-explanation="Les guillemets empêchent une interprétation numérique indésirable.">
    <legend>2. Comment conserver l’identifiant `01230` ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="true">Le placer entre guillemets</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="false">Ajouter une tabulation</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Le préfixer avec #</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
  <fieldset class="quiz-question" data-question="c10q3" data-explanation="Le chargement sécurisé empêche la construction dangereuse d’objets applicatifs à partir de balises.">
    <legend>3. Comment faut-il charger du YAML non fiable ?</legend><div class="quiz-answers">
      <button class="quiz-answer" type="button" data-answer="0" data-correct="false">Avec une construction arbitraire d’objets</button>
      <button class="quiz-answer" type="button" data-answer="1" data-correct="true">Avec les fonctions de chargement sécurisé</button>
      <button class="quiz-answer" type="button" data-answer="2" data-correct="false">Comme du code exécutable</button>
    </div><p class="quiz-feedback" data-feedback hidden aria-live="polite"></p>
  </fieldset>
</section>

## Valider avec le véritable consommateur

Un fichier peut être un YAML valide tout en étant invalide pour l’application qui l’utilise.

La validation comporte trois niveaux :

1. **Syntaxe :** un parseur YAML peut-il le lire ?
2. **Schéma :** contient-il les clés et les types de valeurs attendus ?
3. **Application :** l’outil cible accepte-t-il les options et la sémantique utilisées ?

Utilisez le même parseur et la même version en développement, dans les tests et en production. Ajoutez une validation de schéma lorsque la configuration devient suffisamment importante pour pouvoir casser un déploiement.

## YAML ou autre chose ?

Utilisez YAML lorsque des humains modifient régulièrement une configuration structurée et que les commentaires sont utiles.

Utilisez JSON lorsque l’interopérabilité stricte, une syntaxe plus réduite ou les outils natifs du navigateur sont prioritaires.

Utilisez TOML pour des configurations relativement peu imbriquées, lorsque les types explicites et une analyse prévisible sont prioritaires.

Utilisez un langage de programmation lorsque la configuration nécessite des conditions complexes, des boucles, des imports ou de la logique réutilisable. Recréer un langage dans YAML rend généralement le système plus difficile à comprendre.

## Liste de vérification pratique

- Enregistrer en UTF-8.
- Indenter uniquement avec des espaces.
- Conserver une indentation cohérente.
- Préférer les associations et séquences en blocs.
- Placer les chaînes ambiguës entre guillemets.
- Utiliser `true`, `false` et `null` pour des valeurs de base portables.
- Éviter les clés dupliquées.
- Ne pas attendre de YAML qu’il fournisse lui-même des variables ou des templates.
- Vérifier la prise en charge des ancres, des clés de fusion et des balises par le parseur cible.
- Valider la syntaxe, le schéma et le comportement de l’application.
- Utiliser un chargement sécurisé pour les entrées non fiables.

<section class="course-result" data-final-result hidden>
  <span class="course-result__icon" data-result-icon>🏁</span>
  <h2 data-result-title>Cours terminé</h2>
  <p class="course-result__score"><span data-result-score>0.0</span> / 10</p>
  <p data-result-detail></p>
  <div class="course-actions"><button class="course-button" type="button" data-share-score>Partager le score</button></div>
  <section class="leaderboard-submit" data-leaderboard-submit>
    <h3>Rejoindre le classement</h3>
    <p>Choisissez un nom public. Seul votre meilleur résultat est conservé dans ce navigateur.</p>
    <form data-score-form>
      <label for="yaml-player-name">Nom dans le classement</label>
      <div class="leaderboard-submit__row">
        <input id="yaml-player-name" name="playerName" maxlength="24" autocomplete="nickname" required data-player-name>
        <button class="course-button" type="submit" data-submit-score>Envoyer le score</button>
      </div>
      <div class="turnstile-box"><div class="cf-turnstile" data-sitekey="0x4AAAAAAD4HkbtTwFl2eb_E" data-theme="auto"></div></div>
      <p class="leaderboard-status" data-leaderboard-status aria-live="polite"></p>
    </form>
  </section>
  <section class="leaderboard" data-leaderboard>
    <div class="leaderboard__heading">
      <h3>Classement</h3>
      <select data-leaderboard-period aria-label="Période du classement">
        <option value="all">Depuis toujours</option>
        <option value="month">Ce mois-ci</option>
        <option value="week">Cette semaine</option>
        <option value="today">Aujourd’hui</option>
      </select>
    </div>
    <ol data-leaderboard-list><li>Chargement…</li></ol>
  </section>
</section>

## Sources et lectures complémentaires

- [Spécification YAML 1.2.2](https://yaml.org/spec/1.2.2/)
- [Index des ressources YAML](https://yaml.org/spec/1.2.2/ext/resources/)
- [Suite de tests YAML](https://github.com/yaml/yaml-test-suite)
- [Dépôt original Introduction to YAML](https://github.com/arthurlacoste/Introduction-To-YAML)
- [Organisation YAML sur GitHub](https://github.com/yaml)
