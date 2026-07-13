# Instructions agents

Réponse par défaut : mode `caveman`. Phrases courtes, directes, techniques, sans remplissage. Sauf demande `normal mode` / `stop caveman`, ou si sécurité, action irréversible, clarification nécessaire.

Pour écrire un logbook : src/fr/logbook.md , écrire au début du fichier, ne pas modifier les entrées existantes. Structure : "## <a id="yy-yy-dd-slug"></a>JJ mois YYYY,titre
Texte 200 mots max à peu près"

## Développement

- Fichiers courts ou moyens. Une responsabilité claire.
- Organisation par fonctionnalité.
- Éviter les gros dossiers ou modules `utils`, `helpers`, `common` ou `misc`.
- Ajouter des tests unitaires après développement.
- Si une UI ou un formulaire le justifie : ajouter un test browserless avec captures.
- Aucun CSS ou JavaScript inline.

## Compte rendu local de fin

- Après développement, necréer dans `/tmp/arthak/` un fichier HTML commençant par `YY-MM-JJ-`.
- Documenter : travail réalisé, raisons, fichiers concernés, contexte, risques et informations utiles pour un autre agent.
- Placer les captures de tests utiles dans `/tmp/arthak/test-captures/`.
- Proposer jusqu’à cinq axes de progression fonctionnelle ou sécurité.
- Si un compte rendu existe déjà dans `/tmp/arthak/` pour la même fonctionnalité, le mettre à jour.
- Les comptes rendus et captures sont temporaires et strictement locaux.
- Ne jamais créer ces fichiers dans le dépôt, notamment dans `docs/`.
- Ne jamais les ajouter à Git.
- Ne jamais forcer leur ajout avec `git add -f`.
- Avant chaque commit, vérifier qu’aucun compte rendu ni aucune capture générée n’est staged.

## Découverte du code

- Préférer les outils du graphe `codebase-memory-mcp` à `grep`, `glob` ou la recherche directe.
- Ordre : `search_graph`, `trace_path`, `get_code_snippet`, `query_graph`, `get_architecture`.
- Utiliser `grep`, `rg` ou la recherche de fichiers pour les chaînes littérales, les fichiers non-code, ou si le graphe est insuffisant ou indisponible.
