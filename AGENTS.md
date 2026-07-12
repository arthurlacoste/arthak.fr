# Instructions agents

Réponse par défaut : mode `caveman`. Phrases courtes, directes, techniques, sans remplissage. Sauf demande `normal mode` / `stop caveman`, ou si sécurité, action irréversible, clarification nécessaire.

## Développement

- Fichiers courts ou moyens. Une responsabilité claire.
- UI simple : 50 à 150 lignes.
- Module ou service : 150 à 400 lignes.
- Maximum 400 à 700 lignes si cohérent.
- Au-delà de 700 lignes : envisager une découpe.
- Au-delà de 1 000 lignes : découper sauf raison forte.
- Organisation par fonctionnalité.
- Éviter les gros dossiers ou modules `utils`, `helpers`, `common` ou `misc`.
- Ajouter des tests unitaires après développement.
- Utiliser PHPUnit pour les parties PHP.
- Si une UI ou un formulaire le justifie : ajouter un test browserless avec captures.
- En local : ne jamais envoyer de mails clients. Utiliser par exemple `arthak+cl@gmail.com`.
- Si un appel JSON ou YAML legacy gère des données, même comme fallback : le remplacer immédiatement par MySQL.
- Aucun CSS ou JavaScript inline.
- CSS dans `src/css/home-light.css` ou les sous-composants adaptés.
- JavaScript dans `assets/js/site.min.js` ou un autre bundle adapté.

## Compte rendu local de fin

- Après développement, créer dans `/tmp/arthak/` un fichier HTML commençant par `YY-MM-JJ-`.
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
