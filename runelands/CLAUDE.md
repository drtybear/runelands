# rune. (nom de code Runelands) — jeu mobile d'exploration sportive

## Contexte essentiel

- Le porteur du projet **ne sait pas coder** : toujours expliquer les choix en français simple, proposer avant d'imposer, et donner des instructions de test pas à pas (quoi lancer, quoi regarder sur le téléphone).
- Concept complet dans `docs/concept.md` (à lire avant toute décision de design).
- Prototype HTML jouable dans `prototype/rune.html` (bêta v0.4) : c'est la **référence fonctionnelle** — le comportement attendu de l'appli mobile. Le reproduire puis le dépasser.

## Le jeu en bref

Jeu d'exploration et de conquête alimenté par les vraies activités physiques (à pied d'abord : course, marche, rando ; vélo en phase 2). Le joueur incarne un explorateur : ses sorties capturent des hexagones (~0,5 km), révèlent des lieux réels d'OpenStreetMap (runes du Futhark à collectionner ×24, vestiges, sanctuaires = sommets/grottes/cascades/points de vue), donnent XP/niveaux/titres, du butin d'équipement (5 emplacements, 4 raretés), et alimentent la guerre de territoires entre régions françaises (Bretagne, Bourgogne, Jura…).

## Décisions actées (ne pas remettre en cause sans demander)

- Pas de village/château à gérer : personnage nomade, exploration au centre.
- Aucune mécanique punitive : on ne perd jamais rien d'acquis. La régularité donne un bonus « Élan » (×1,0 → ×1,5) qui retombe simplement à zéro.
- POI réels = contenu principal ; découvertes procédurales déterministes en secours (zones vides / hors ligne).
- Détection par proximité : un POI se découvre si le parcours traverse son hexagone ou un hexagone voisin.
- 100 % free-to-play, cosmétiques uniquement (plus tard), jamais de pay-to-win ni de pub.
- Nom : famille « Rune » (Runelands / Runeseeker / Runewild) — vérifier marques avant de trancher.
- Direction artistique : palette papier/parchemin, typo display runique lisible (MedievalSharp ou équivalent, réf. maillots Norvège CdM 2026), texte courant en Hanken Grotesk. Style de carte « Ancienne » (patine sépia) en option.

## Stack cible (appli mobile)

- **React Native + Expo** (choisi ; PAS Unity — appli carte/GPS, pas jeu 3D).
- Cartes : MapLibre React Native (ou react-native-maps) + tuiles OSM.
- Grille : H3 (h3-js) — remplacer la grille hexagonale maison du prototype.
- GPS : expo-location, y compris suivi en arrière-plan (mode Aventure).
- POI : Overpass API pour le prototype ; à terme, POI servis par notre backend.
- Backend (phase ultérieure) : à discuter — PostgreSQL/PostGIS pressenti ; import Strava via API + webhooks.
- État local : commencer 100 % local (AsyncStorage/SQLite), comme le prototype.

## Règles de travail

- Une fonctionnalité à la fois ; à chaque étape, l'appli doit rester lançable et testable dans Expo Go.
- Reprendre les barèmes du prototype (XP : course 15/km, rando 12, marche 8 ; D+ 1 XP/10 m ; hexagone 2 XP ; rune 25 / vestige 60 / sanctuaire 150 ; butin : commun 60 % / rare 28 % / épique 10 % / légendaire 2 %).
- Textes de l'interface en français, ton chaleureux et aventureux (voir prototype).
- Vie privée dès le départ : jamais de trace GPS exposée à autrui (hexagones agrégés seulement), zone privée autour du domicile prévue, données sur l'appareil tant qu'il n'y a pas de backend.
- Anti-triche prévu dès l'import d'activités : vitesses max par sport, refus des activités sans trace GPS.
- Respecter les conditions d'utilisation de Strava et d'Overpass (usage modéré, pas de martelage de requêtes).

## Prochaines étapes suggérées (dans l'ordre)

1. Initialiser le projet Expo, écran carte avec MapLibre centré sur la position.
2. Porter la grille hexagonale en H3 + capture d'hexagones depuis un tracé.
3. Mode Aventure (suivi GPS en arrière-plan) + découvertes en direct.
4. Import GPX, puis personnage/XP/carnet/équipement (reprendre le prototype).
5. Plus tard : backend, comptes, Strava, régions partagées.
