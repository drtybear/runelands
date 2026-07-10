# Document de Concept — « Runelands » (nom de code)
*Jeu mobile d'exploration et de conquête sportive — v0.3, juillet 2026*

---

## 1. Vision

**Un jeu d'exploration et de conquête de territoires alimenté exclusivement par tes vraies activités physiques.**

Tu incarnes un explorateur. Chaque sortie réelle le fait progresser, lui fait découvrir des points d'intérêt du monde réel et récolter du loot (boucle solo), tout en alimentant la guerre de territoires de ta région (boucle multi). L'effort physique est la seule ressource du jeu : impossible de progresser depuis son canapé.

**Pitch en une phrase :** tes kilomètres deviennent une aventure — explore le monde réel, découvre ses trésors, conquiers-le pour ta région.

**Décisions de design fondatrices :**
- Pas de village/château à gérer (modèle Run An Empire, jugé creux et sédentaire) → un **personnage nomade** centré sur l'**exploration**.
- Aucune mécanique punitive : on ne perd jamais rien d'acquis (voir « Élan », §4).
- **Périmètre v1 : activités à pied** (course, marche, randonnée). Le vélo arrive en phase 2 (équilibrage spécifique : vitesses et distances 3 à 5× supérieures, taille d'hexagones à adapter).

---

## 2. Public cible

- **Cœur de cible :** sportif régulier (3 à 5 sorties/semaine), utilisateur de Strava ou d'une montre GPS, 20-45 ans, qui a fait le tour de la motivation "segments/KOM" et cherche un but différent de la compétition pure.
- **Cible secondaire :** sportif occasionnel qui a besoin d'une motivation ludique pour être régulier ; marcheur/randonneur.
- **Extension phase 2 :** cyclistes (communauté massive, sans équivalent gamifié).

---

## 3. Références et différenciation

| Référence | Ce qu'on reprend | Ce qu'on fait différemment |
|---|---|---|
| **Run An Empire** | Capture d'hexagones (~0,5 km) par le passage réel, intégration Strava | Exploration/POI au lieu du village idle, clans régionaux, extension multi-sports |
| **Lords & Knights** | Carte multi partagée, alliances, batailles asynchrones, points de contrôle | Pas de château : les points de contrôle sont des lieux réels (sanctuaires) |
| **Strava** | Sérieux des données, import automatique, culture sportive | Couche de jeu et de collectif par-dessus |
| **Geocaching / Pokédex** | Plaisir de la découverte et de la collection de lieux | Intégré à la pratique sportive réelle |

**Différenciateurs clés :**
1. **Exploration du monde réel** — les POI d'OpenStreetMap (sommets, cols, monuments…) sont le contenu du jeu : quasi infini, gratuit, et le jeu pousse vers les plus beaux endroits.
2. **Clans régionaux** — identité forte, rivalités naturelles, rétention par le collectif.
3. **Positionnement sportif sérieux** — données réelles, zéro triche tolérée, pas de pay-to-win.
4. **Multi-sports à terme** (vélo phase 2, autres ensuite).

---

## 4. Boucle solo — L'Explorateur

### Le personnage
- Création : avatar, nom, choix du clan régional.
- **XP** à chaque activité importée (distance, dénivelé valorisé).
- **Niveaux** : débloquent slots d'équipement, capacités, titres.
- **Équipement** : items lootés sur les POI ou échangés en boutique, bonus légers (ex. « Chaussures du pèlerin : +10 % de loot en rando »).

### L'Élan (régularité — 100 % carotte)
- La régularité fait monter une jauge d'**Élan** qui booste les gains (XP, loot, influence).
- L'inactivité fait simplement retomber l'Élan — **on ne perd jamais rien d'acquis**. On perd un bonus, pas un progrès.
- **Mode repos/blessure** déclarable qui gèle l'Élan.

### Les points d'intérêt (le cœur du jeu)
1. **POI réels (OpenStreetMap)** : sommets, cols, points de vue, lacs, monuments, chapelles… Les atteindre = **découverte** : loot (rareté selon difficulté d'accès), XP bonus, entrée au carnet.
2. **Découvertes générées** : hexagones jamais visités contenant ruines, caches, **runes** à ramasser — récompense les nouveaux itinéraires plutôt que la répétition.
3. **Quêtes** : hebdomadaires renouvelées (« explore 15 nouveaux hexagones », « atteins 2 POI inédits », « 800 m de D+ cette semaine ») et **expéditions** longues.

### Le carnet d'exploration
- Journal de toutes les découvertes, collections (« les 7 sommets du Morvan », « toutes les runes de Bourgogne »), heatmap personnelle.
- C'est le "Pokédex" du jeu : complétion, fierté, partage.

### ❓ Question ouverte — « Explorer » vs « Conquérir »
Faut-il que la marche du quotidien (balade en ville, 10 000 pas) compte ?
- **Option A (séparation)** : tout déplacement à pied permet d'*explorer* (ramasser runes, découvrir POI, remplir le carnet) mais seule la vraie sortie sportive permet de *conquérir* (XP pleine + influence territoriale).
  - Pour : engagement quotidien (on ouvre l'appli même sans entraînement), positionnement sportif protégé, triche sur la marche sans intérêt.
  - Contre : deux régimes à expliquer, frontière "vraie sortie / balade" à définir (durée ? allure ? intention ?).
- **Option B (tout compte)** : toute activité donne XP et influence, pondérée par l'effort.
  - Pour : simplicité, une seule règle.
  - Contre : dilution du positionnement sportif, la carte peut être "farmée" en marchant.
- **Statut : à trancher pendant la bêta** — le MVP peut démarrer en option B simple (pondération par allure) et basculer en A si la carte se fait farmer.

---

## 5. Boucle multi — La Guerre des Régions

### La carte
- Monde réel recouvert d'**hexagones** (grille H3, ~0,5 km), chacun neutre ou contrôlé par un clan. Carte unique et partagée.

### Les clans — ⚠️ à affiner
Le principe est acté, la structure reste ouverte. Exigence posée : **un clan doit apporter quelque chose de réel**, pas juste un drapeau décoratif. Piste privilégiée — structure à deux étages :
- **La Région** (Bretagne, Bourgogne, Jura, Flandres…) : la grande faction. Identité, couleurs, guerre de territoires, classement de saison. Choisie librement à la création.
- **La Compagnie** : le vrai club (5 à 50 personnes), au sein d'une région. Défis partagés, entraide, chat, objectifs communs — c'est là que naît le lien social réel et la rétention.

### Conquête et défense
- Passer dans un hexagone y dépose de l'**influence** pour sa région ; l'influence cumulée détermine le contrôle.
- Niveau et équipement amplifient l'influence déposée — **la progression solo nourrit le multi**.
- Les hexagones contrôlés génèrent des bonus passifs pour les membres.

### Les sanctuaires
- Les POI majeurs (grands sommets, monuments emblématiques) sont des **points de contrôle disputés** : le contrôle se gagne par visites et influence cumulée, et donne un bonus régional.
- Effet narratif fort : les régions se disputent le Mont Ventoux ou la Pointe du Raz.

### Saisons
- Cycles de 6 à 12 semaines : classement des régions, récompenses cosmétiques et titres, remise à zéro partielle. Évite la carte figée, crée des rendez-vous.

---

## 6. Monétisation

- **100 % free-to-play**, aucun avantage de gameplay achetable — non négociable.
- Plus tard : cosmétiques (avatar, bannières, styles de carnet), éventuel pass de saison cosmétique.
- Jamais de pub intrusive, de pay-to-win, ni de vente de données.

---

## 7. Architecture technique et plan de mitigation des risques

### Briques
| Brique | Choix pressenti | Remarques |
|---|---|---|
| Import d'activités | **API Strava** (webhooks) | ~80 % de la cible. Voir mitigation dépendance ci-dessous. |
| Grille territoriale | **H3 (Uber, open source)** | Standard, performant. |
| Cartes & POI | **MapLibre + OpenStreetMap** | Gratuit ; OSM fournit les POI = le contenu du jeu. |
| App mobile | **Flutter** ou **React Native** | Un seul code iOS + Android. |
| Backend | API + **PostgreSQL/PostGIS** | Asynchrone, pas de temps réel → simple et peu coûteux. |

### Anti-triche — 4 lignes de défense empilées
1. **Filtres physiologiques à l'import** : vitesse max par sport (segments de "course" > ~25 km/h signalés), accélérations impossibles, téléportations GPS, cohérence dénivelé/temps. Présence de fréquence cardiaque/cadence = gage d'authenticité.
2. **Refus des activités saisies manuellement** (sans trace GPS) — marquées comme telles dans l'API Strava. Filtre gratuit qui élimine la triche paresseuse.
3. **Plafonds** : XP et influence maximales par jour → borne les dégâts et réduit l'intérêt de tricher.
4. **Social** : signalement communautaire + score de confiance progressif (un compte neuf pèse moins qu'un compte ancien et régulier).

### Dépendance Strava — parade architecturale
- Le backend ne connaît qu'un **format d'activité normalisé interne** (trace, durée, distance, D+, sport) ; Strava n'est qu'un *connecteur*. Ajouter Garmin, Apple Health/Health Connect ou l'import GPX/FIT (**prévu phase 2 — sortie de secours universelle**) = un connecteur de plus, zéro impact sur le jeu.
- Respect scrupuleux des conditions Strava (suppression des données à la déconnexion, pas de mélange d'affichage avec d'autres sources) — ne jamais leur donner de raison de couper.
- Chaque activité est immédiatement convertie en **données de jeu** (hexagones, influence, découvertes) qui nous appartiennent : même si la source disparaît, la carte reste.

### Vie privée — 3 règles
1. **Jamais de trace GPS visible** par les autres joueurs : uniquement des hexagones agrégés (500 m ne révèlent pas une adresse).
2. **Zone privée** configurable autour du domicile : rien n'y est publié.
3. **Délai de publication** de quelques heures sur l'influence : impossible de suivre quelqu'un en quasi-temps réel.
Plus : pseudonyme par défaut, hébergement UE, RGPD (minimisation, droit à l'effacement).

### Qualité des POI
- OSM est inégal (excellent en montagne/zones touristiques, pauvre en campagne profonde). Prévoir une **curation** (types de POI retenus, scoring d'intérêt) et à terme des ajouts communautaires modérés.

---

## 8. MVP — Version 1 minimale

**Objectif : valider la boucle « sortie réelle → hexagones + découvertes → satisfaction ».**

1. Compte + connexion Strava (import auto des activités **à pied** : course, marche, rando).
2. Carte hexagonale (une ou deux régions de France).
3. Les sorties colorent les hexagones ; **POI réels visibles et découvrables** (marquage découvert/non découvert + XP).
4. Carnet d'exploration basique (liste des découvertes, compteurs).
5. Choix d'une région + carte des territoires par région — la simple visualisation « la Bretagne possède 12 000 hexagones » crée déjà l'émulation.
6. Anti-triche niveau 1 et 2 (filtres physiologiques + refus des activités manuelles).

**Hors MVP :** vélo, loot/items, boutique, Élan, sanctuaires, saisons, quêtes générées, compagnies, personnalisation d'avatar.

**Validation :** 30 à 100 bêta-testeurs (clubs de course/rando locaux, communautés Strava régionales) pendant 4 à 6 semaines. Métrique clé : les gens font-ils des sorties *à cause du jeu* (nouveaux itinéraires, sorties en plus, POI visés) ?

---

## 9. Roadmap indicative

| Phase | Contenu | Durée indicative |
|---|---|---|
| **0. Prototype** | Connexion Strava + carte hexagonale qui se colorie + POI affichés | 4–8 semaines |
| **1. MVP bêta** | MVP ci-dessus, bêta fermée régionale (à pied uniquement) | 2–3 mois |
| **2. Solo + sources** | XP/niveaux, loot, équipement, Élan, carnet complet, quêtes, **import GPX + vélo** | 3–4 mois |
| **3. Multi** | Influence, conquête/défense, sanctuaires, compagnies, première saison | 3–4 mois |
| **4. Ouverture** | Lancement public France, cosmétiques, autres sources de données | — |

---

## 10. Risques principaux

1. **Masse critique** — lancement concentré sur 1–2 régions, partenariats clubs, boucle solo satisfaisante même seul.
2. **Triche** — plan en 4 couches (§7), dès le jour 1.
3. **Dépendance API tierces** — architecture en connecteurs + import GPX phase 2 (§7).
4. **Scope creep** — MVP brutal, une boucle à la fois.
5. **Équilibrage inter-sports** — repoussé en phase 2 avec le vélo ; à itérer avec les données de bêta.
6. **Qualité des POI OSM** — curation nécessaire (§7).

---

## 11. Nom — famille « Rune » (actée)

Le mot *rune* contient *run*, sans crier « jeu de course uniquement », et fournit tout l'univers visuel : runes à découvrir sur les POI, pierres gravées, sanctuaires, cartes anciennes.

Candidats : **Runelands** (nom de code actuel) · **Runeseeker** · **Runewild** · **Runes & Routes**

*À faire avant de trancher définitivement : vérifier marques (INPI/EUIPO), domaines et disponibilité sur les stores.*

---

## 12. Questions ouvertes (backlog de design)

| # | Question | Statut |
|---|---|---|
| 1 | Séparation « explorer / conquérir » (la marche quotidienne compte-t-elle pleinement ?) | À trancher pendant la bêta (§4) |
| 2 | Structure des clans : Région seule ou Région + Compagnie ? Quels apports concrets ? | À affiner (§5) |
| 3 | Taille des hexagones (0,5 km ? adaptatif urbain/rural ?) | À tester en prototype |
| 4 | Barèmes XP course vs marche vs rando (le D+ compense-t-il l'allure ?) | À itérer en bêta |
| 5 | Nom définitif | Après vérif marques/domaines |
