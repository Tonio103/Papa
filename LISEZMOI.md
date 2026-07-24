# L'INVASION DES VANS — mode d'emploi du pack

## Contenu

- `index.html` — le jeu complet (7 défis jouables sur 8)
- `sw.js` — service worker : le jeu fonctionne hors-ligne après une première visite
- `manifest.json` + `icon-192.png` + `icon-512.png` — installation sur l'écran d'accueil
- `qr-codes.html` — planche imprimable des 10 QR codes

## Déployer (10 minutes)

Le plus simple : **Netlify Drop** (https://app.netlify.com/drop) → glisse le dossier entier → tu obtiens une URL HTTPS. Alternative : GitHub → nouveau dépôt → « uploading an existing file » → glisse les 5 fichiers → Settings → Pages → branche main → l'URL apparaît.

⚠ Un simple fichier ouvert en local (`file://`) ne suffit pas : la caméra et le service worker exigent HTTPS.

## Préparer le hors-ligne (à faire AVANT le jour J)

1. Sur le téléphone qui servira au jeu, ouvre l'URL **avec du réseau** — le service worker met tout en cache (page, polices, jsQR).
2. « Ajouter à l'écran d'accueil » : le jeu devient une appli plein écran.
3. **Test en mode avion** : ferme tout, coupe le réseau, rouvre depuis l'icône. Tout doit marcher sauf la caméra si le navigateur redemande la permission — d'où le secours par saisie manuelle du code, toujours disponible.
4. Si tu modifies le jeu après coup : incrémente `invasion-v1` → `invasion-v2` dans `sw.js`, sinon les téléphones garderont l'ancienne version en cache.

## Imprimer les QR

Ouvre `qr-codes.html` (réseau conseillé pour les polices ; les QR eux-mêmes se génèrent sans réseau), bouton Imprimer. 13 cartes aux couleurs du jeu : les 8 pièces avec leur invader pixel, les 2 balises coop LV_07A/LV_07B (loin l'une de l'autre), et les 3 mini-balises spotting LV_03A/B/C (à cacher aux endroits de tes photos). Le code en clair sous chaque QR est le plan B (saisie manuelle). Plastifie ou couvre d'adhésif transparent.

## Le code secret (dans le jeu)

Tape `ULYSSE` dans la saisie manuelle du scanner : ça débloque la **prochaine pièce non flashée**, avec l'animation normale. C'est le plan C si un QR est perdu ou arraché — à répéter autant de fois que nécessaire. Le mot se change dans `CONFIG.codeTriche`.

## Tester le jeu sans rien poser

Ajoute `?triche=1` à l'URL : barre rouge en bas avec un bouton ⚡ par station (flash sans caméra), TOUT, RESET. Les boutons INDICE/PASSER apparaissent en 2 s au lieu de 4/7 min.

## Ce qui reste à personnaliser (tout est dans `index.html`)

| Où | Quoi |
|---|---|
| `CONFIG.joueur` | le prénom affiché dans l'intro |
| `CONFIG.messageVictoire` | le texte de fin |
| `CONFIG.codeTriche` | le mot secret qui débloque un flash (défaut : ULYSSE) |
| `CONFIG.codeReset` | le code secret de remise à zéro tapé dans le scanner (défaut : 0000) |
| `CONFIG.map.spots` | coordonnées GPS réelles des pièces pour le radar chaud/froid (réglables sur place en `?triche=1`) |
| `CONFIG.credits` | le texte de l'écran Crédits (menu ☰) |
| `SONG` (dans AudioFX) | la musique de fond : 4 pistes de 16 pas (basse, arpège, kick, charley) — remplace les fréquences pour changer le thème |
| `CONFIG.messagesInvader` | les 7 messages de l'invader entre les défis — c'est là que se joue l'histoire |
| `fragment` de chaque station | les 8 chiffres = le code final (actuellement 19982026) — mets une date à lui |
| `indice` de chaque station | les textes d'aide |
| `TARGETS` dans LV_02 | les 3 nombres cibles du binaire |
| `TARGET` dans LV_04 | le motif du Rubik |
| `DIST_GOAL` + `RUNGS` dans LV_06 | longueur de la course de la Cavale et hauteur de l'échelle |
| `TARGET_LEN` dans LV_05 | longueur du Simon (6 par défaut) |
| `SHAPES.portrait` + `PALETTES.portrait` | le portrait pixel de ton père (LV_08, peint au pochoir) — grille de lettres, une lettre = une couleur ; un visage 12×12 d'exemple montre le format. `LAYER_NAMES` (dans LV_08) nomme chaque couche de couleur |
| `LV03_IMGS` + `SPOTS` (LV_03) | remplace les 3 images provisoires par tes photos macro (base64, ~600px) et adapte les légendes |
| `RANKS` (dans `index.html`) | les 6 rangs du joueur et leurs seuils d'étoiles (RECRUE → MAÎTRE INVADER) affichés sur le tableau de bord du HUB et l'écran-titre |

## Nouveautés (v79) — passe « fin prêt » : relecture + finitions

Grande relecture de tout le jeu pour qu'il soit prêt à offrir :

- **Chasse aux bugs** : tous les écrans (accueil, cinématique, repaire, radar, carnet, tableau, réglages, scanner, victoire) et les 8 défis + les 6 jeux d'arcade passés au crible en automatique. **Zéro erreur** dans le code du jeu. (Les seules alertes viennent du chargement de jsQR/polices quand il n'y a pas de réseau — et le jeu bascule alors proprement sur la saisie manuelle du code : c'est prévu.)
- **LV_02 · Le Binaire** : l'addition en direct porte maintenant seule le détail « reste 1 / trop ! », et l'étiquette de ligne est épurée (plus de chevauchement quand on dépasse la cible).
- **Relecture des textes** : transmissions, victoire, succès, consignes des mini-jeux — tout est cohérent et sans faute.
- **Commentaire du code final** remis à jour (les 8 chiffres composent une date qui lui parle).

**Il reste 2 choses à faire SUR PLACE avant le jour J** (impossibles à faire d'ici) :
1. **Enregistrer les positions GPS** des pièces : ouvre le jeu avec `?triche=1`, va dans **Radar**, place-toi à chaque cachette et « Enregistrer la pièce ici », puis « Copier les spots » → colle le résultat dans `CONFIG.map.spots`. Tant que c'est vide, le radar reste muet (le reste du jeu marche).
2. **3 photos macro** pour le défi **Spotting (LV_03)** : remplace `LV03_IMGS` par tes gros plans des détails à retrouver.

## Nouveautés (v78) — les 4 énigmes gagnent une « prime de maîtrise »

Deuxième passe sur les mêmes défis à réflexion : chacun récompense désormais la *manière* de gagner, sans jamais durcir la note. **Toutes ces primes sont du panache pur — les 3★ restent atteignables tranquillement, en tâtonnant, sans course.** C'est une carotte pour ceux qui foncent, jamais une contrainte pour Papa.

- **LV_01 · La Palette** — **« MAIN SÛRE »** : si chaque touche a fait mouche (autant de coups que de blocs, zéro erreur, zéro aperçu), une gerbe de confettis et un flash spécial saluent le sans-faute.
- **LV_02 · Le Binaire** — **« SANS FAUTE »** : décoder les trois lignes en 3★, sans coup de pouce et **sans jamais dépasser la cible**, déclenche un flash bleu et une pluie de confettis en plus. Nouveau aussi : une **addition en direct** sous les valeurs (« 4 + 2 = 6 → 6 ») montre la somme se construire pendant qu'on lève les blocs — pile la consigne « additionne-les », rendue visible et pédagogique.
- **LV_04 · Rubikcubisme** — **chrono + « ÉCLAIR »** : un chronomètre s'affiche dès la fin du mélange (⏱, et ⚡ vert tant qu'on reste dans les temps au PAR). Résoudre au PAR **sous 15 s** allume un éclair et double les confettis. Le chrono n'ajoute **aucune** étoile : les 3★ s'obtiennent au nombre de coups, à ton rythme.
- **LV_05 · Le Simon** — **manche bonus « à l'envers »** : la séquence complète réussie, un bouton propose de la **rejouer à l'envers, de mémoire**. Réussie → 3★ « MÉMOIRE INVERSÉE ». Ratée → aucune punition, on garde les étoiles déjà acquises (ou on termine directement).

Tout est testé (rendu, interaction, victoire, mode « à l'envers ») : zéro erreur console. Les défis physiques (Spotting, Coop) et les jeux d'action déjà riches (Cavale, Pochoir) restent inchangés.

## Nouveautés (v68) — les 4 défis « réflexion » approfondis

Grosse passe sur les mini-jeux à énigme (~290 lignes), avec de vraies aides pour Papa et plus de feedback :

- **LV_01 · La Palette** : à côté du MODÈLE, une 2ᵉ pièce 3D **« TON ŒUVRE »** se reconstruit en direct pendant que tu poses les blocs. Boutons **Annuler / Recommencer / Aperçu** (montre le modèle sur le plateau), interrupteur **Miroir** (pose en symétrie — les invaders sont symétriques), jauge « X/Y blocs », et tour d'honneur de ta pièce à la fin.
- **LV_02 · Le Binaire** : **pense-bête des valeurs** (8·4·2·1) toujours visible, bouton **« Montrer les blocs »** (surligne la bonne combinaison de la ligne active), indication **« +X à ajouter / trop ! »** en direct, et une **tour 3D « cible vs toi »** pour visualiser la hauteur à atteindre.
- **LV_04 · Rubikcubisme** : bouton **Annuler le coup** (vrai take-back), bouton **Conseil** (fait briller une ligne/colonne encore mal placée), et compteur **« X/9 en place »**.
- **LV_05 · Le Simon** : bouton **« Revoir »** (2 fois) pour réécouter, **barre de lecture** qui suit la séquence puis ta saisie, compteur d'erreurs, **meilleur niveau** enregistré, et onde lumineuse sur chaque pad.

Les aides (aperçu, conseil, revoir…) coûtent l'étoile parfaite, pour garder le défi. Tout est testé (rendu, interaction, victoire), zéro erreur console. Les défis physiques (Spotting, Coop) et les jeux d'action déjà riches (Cavale, Pochoir) sont laissés tels quels pour ne rien casser.

## Nouveautés (v67) — 6ᵉ jeu d'arcade « Traversée »

Un nouveau jeu complet dans la borne : **🚦 Traversée**, un Frogger maison où l'invader traverse les rues des Vans.

- **But** : atteindre le mur d'**ARRIVÉE** en haut. **▲** pour avancer, **◀ ▶** pour te décaler (ou glisse sur l'écran). Chaque traversée rapporte des points.
- **Circulation variée** : voitures, **camions** (longs), **motos** (rapides), **voies rapides** (liseré rouge) et **voies ferrées** avec un **train télégraphié** (⚠ avant qu'il déboule).
- **Bonus & pouvoirs** sur les terre-pleins : 🎨 points, ★ jackpot, ♥ vie, 🛡 bouclier, ⏳ ralenti, ❄ stop.
- **Score malin** : enchaîne les traversées **sans te faire toucher** pour un multiplicateur, gagne une **prime de rapidité** et une **vie bonus** tous les 5, et un point de **frôlement** quand tu esquives de justesse.
- **Ne traîne pas** : un **drone rôdeur** finit par fondre sur toi si tu restes trop longtemps sur place.
- Ambiance : pluie de nuit, phares, flaques, vignette, jauge de progression, cœurs de vie. Records (traversées **et** meilleure série) au Tableau de bord, deux nouveaux succès (**Roi de la rue**, **Sans un accroc**).

Vérifié par un auto-joueur (esquive le trafic et les trains) : jusqu'à ~60 traversées, aucune erreur. La borne compte désormais **6 jeux**.

## Nouveautés (v66) — « Vol de Nuit » prend de la profondeur

Le 5ᵉ jeu d'arcade devient un vrai petit jeu de score avec bonus, pouvoirs et ennemis :

- **🎨 Bombes de peinture** à attraper dans les trous → des points (avec un **combo** : plus tu en enchaînes, plus elles rapportent).
- **Pouvoirs** : **🛡 Bouclier** (encaisse un choc), **⏳ Ralenti** (les murs ralentissent), **✦ Points ×2** (double la marque un moment).
- **Bonus de frôlement** : passer au ras d'un bord rapporte un point de plus (« FRÔLÉ ! »).
- **Difficulté qui monte en paliers** : d'abord de simples murs, puis des **trous qui montent et descendent**, puis des **drones-sentinelles** à esquiver (annoncés par un chevron rouge sur le bord).
- Détails : traînée derrière l'invader, particules, textes flottants (+points), éclair tous les 10 points.
- Nouveau succès **Bombeur** (20 bombes en un seul vol). Le record reste affiché au Tableau de bord.

## Nouveautés (v65) — vibrations : bouton « Tester » + secours iPhone durci

Rappel important : **iPhone/Safari ne fournit AUCUNE API de vibration web** (contrairement à Android). Le jeu tente un secours « best-effort » via un interrupteur système caché — mais sur iPhone ça ne marche **que** si :
1. **Réglages iOS › Sons & retour haptique › Retour haptique système** est **activé** ;
2. le téléphone **n'est pas en mode économie d'énergie** ;
3. c'est déclenché par un **vrai appui** (les vibrations automatiques en plein jeu, elles, ne peuvent pas se déclencher sur iPhone).

Nouveautés de cette version :
- **Bouton « Tester »** dans Réglages, à côté du toggle Vibrations : un appui direct = le meilleur moyen de savoir si ton téléphone répond.
- Secours iPhone **durci** : l'interrupteur haptique est maintenant réellement rendu (Safari ignorait un contrôle en `opacity:0`), et la fonction est exposée de façon fiable même si Safari refuse de réassigner `navigator.vibrate`.
- Texte d'aide adapté quand on est sur iPhone (rappelle le réglage iOS à activer).

## Nouveautés (v64) — 5ᵉ jeu d'arcade « Vol de Nuit »

- Nouveau jeu dans la **borne d'arcade** : **🌙 Vol de Nuit** — un « flappy » maison. L'invader s'évade au-dessus des Vans endormis : **touche l'écran** (ou le bouton VOLER) pour un coup d'aile, et faufile-toi entre les murs tagués. Score = murs franchis, record sauvegardé, difficulté qui monte doucement. Ambiance nuit : lune, étoiles, ville en silhouette.
- Accessible depuis la borne (bouton **Vol de Nuit** dans chaque jeu), record affiché sur le **Tableau de bord**, et nouveau succès **Noctambule** (franchir 15 murs).
- **Correction** : les menus des jeux d'arcade **Casse-Tag, Serpent et Pong** n'étaient pas centrés (calque mal positionné) — ils s'affichent maintenant correctement en plein écran, comme « Les Vans Defense ».

## Nouveautés (v63) — passe complète sur les interfaces

Même langage « atelier de tag » appliqué à **tous les écrans**, avec des composants plus lisibles et plus vivants :

- **Flash / Scanner** : le cadre caméra devient un vrai **viseur à équerres** cyan (coins de ciblage animés), et le champ de saisie manuelle est repensé en **plaque pochoir** sprayée (le bouton OK ne déborde plus).
- **Radar** : la lunette passe d'un rond vide à un **vrai scope** — cercles concentriques, réticule en croix, couronne de graduations, bordure verte lumineuse, et l'état affiché en **puce** (● RADAR COUPÉ).
- **Code final** : cadenas avec halo, **8 cases-chiffres en pochoir**, et un **clavier béton** (touches détourées, effacer en rose, valider en cyan).
- **Transmission de l'invader** : moniteur **scotché au mur**, barres de signal qui grésillent.
- **Menu 3D, Tableau de bord, Carnet, Réglages, Victoire** : panneaux béton cohérents, **KPI dorés** qui ressortent, barres de stats qui se remplissent à l'ouverture, tuiles de victoire encadrées, étiquettes scotchées.
- **Partout** : fondu de défilement en bas des écrans longs, **focus clavier visible** (accessibilité), transitions d'entrée un peu plus posées, boutons secondaires plus lisibles.

## Nouveautés (v62) — accueil vivant + une vraie cinématique

- **Écran d'accueil** : la ville prend vie. Sur les toits du premier plan, un **artiste à capuche bombe un invader en boucle** (tesselle par tesselle, halo qui grandit, jet de peinture), pendant qu'il **pleut**, que la **poussière lumineuse monte**, que **deux réverbères** réchauffent la scène et qu'un **chat de gouttière** veille. Le texte d'intro raconte enfin une histoire (« cette nuit, 8 pièces ont été posées… PAPA, à toi de jouer »).
- **Cinématique** : nouveau plan **« LA TOURNÉE »** — la caméra longe un mur sans fin où les **8 vraies pièces du jeu s'allument une à une, avec le nom de leur défi** (La Palette, Le Binaire… Le Pochoir), tandis que l'artiste court de toit en toit. On « vend » la chasse à venir.
- **Nuit vivante** partout : poussière de peinture qui monte, **voiture** dont les phares balaient le mur, **chat**, **enseigne néon** qui grésille, **antenne** au phare rouge clignotant.
- **Radar** enrichi : chaque écho porte désormais le **nom du lieu-défi**, avec triangulation et **réticule de verrouillage** doré.
- **Aube** : rayons de soleil levant entre les immeubles, et l'artiste qui **s'éloigne dans la lumière**, sa tournée finie.
- **Final** repensé : les **six invaders se matérialisent en arc** dans une onde de choc et un jaillissement d'hyperespace, avant le tampon « AGENT [prénom] · LA CHASSE COMMENCE ».

## Nouveautés (v61) — accueil : projecteurs d'invasion

- L'écran d'accueil gagne en intensité : **deux projecteurs** (cyan et rose) **balaient le ciel** depuis la ville, et un **halo lumineux** entoure l'escadron d'invaders. Le grand vide sombre au milieu est enfin rempli — vraie ambiance « la nuit de l'invasion ».

## Nouveautés (v60) — accueil et cinématique peaufinés

- **Écran d'accueil** : après sa révélation « au spray », le titre **respire** doucement (léger flottement + pulsation), et le bouton **Commencer** pulse discrètement pour attirer l'œil.
- **Cinématique** : le plan du tag (l'artiste qui peint sa pièce) était un peu vide — un **projecteur cyan** met maintenant en valeur la mosaïque, en s'intensifiant à mesure qu'elle se peint. Le moment fort ressort bien mieux.

## Nouveautés (v59) — repaire réorganisé

- Avec toutes les nouvelles features, le bas du repaire s'allongeait. Les 4 utilitaires (**Carnet, Tableau, Arcade, Réglages**) sont maintenant en **grille 2×2** compacte, sous les deux gros boutons (Tournée, Défi du jour). Plus lisible, plus « appli », moins de défilement.

## Nouveautés (v58) — vibrations sur iPhone (secours)

- **Important** : sur iPhone, Safari **ne supporte pas** l'API de vibration standard du web (`navigator.vibrate`) — c'est pour ça qu'aucune vibration ne s'est jamais déclenchée. C'est une limite d'Apple, pas du jeu (ça marche nativement sur Android).
- **Secours ajouté** : sur iOS 17.4+, le jeu tente désormais un **léger retour haptique** via un interrupteur `<input switch>` caché, sur les moments clés (flash, réussite, erreur…). C'est du best-effort : selon le modèle et la version d'iOS, ça donne une petite tape ou rien. Le réglage « Vibrations » le pilote.

## Nouveautés (v57) — 4e jeu d'arcade : Pong Invader + partage du poster

- **🏓 Pong Invader** : un pong contre l'IA (ta raquette en bas, l'IA en haut, premier à 7). La balle **accélère** à chaque échange, angle selon l'endroit touché ; **nombre de victoires** sauvegardé. La salle d'arcade compte désormais **4 jeux**.
- **Partager le poster** : le poster souvenir peut être envoyé directement via le **partage natif** du téléphone (Messages, WhatsApp, Mail…) en plus de l'enregistrement.

## Nouveautés (v56) — écran Réglages

- **⚙ Réglages** au repaire : **vibrations** on/off (toutes les vibrations passent par ce réglage), **animations réduites** (coupe les décors animés = confort + batterie, réappliqué au démarrage), **difficulté de la borne** (3 ou 5 vies), **remise à zéro des records d'arcade** (double-clic de sécurité), et **revoir le tutoriel**. Tout est sauvegardé.
- Le tableau de bord affiche aussi la **série du Défi du jour**.

## Nouveautés (v55) — le Défi du jour (avec série)

- **🎯 Défi du jour** : chaque jour, un des 6 défis est tiré **de la date** (le même pour toute la journée). Le relever fait grimper une **série** (streak 🔥) qui repart à zéro si on saute un jour. Un rendez-vous quotidien pour la forme, sans toucher aux points ni aux étoiles. Débloqué quand les 6 défis « partout » sont finis ; le bouton du repaire affiche la série en cours et « ✓ fait » une fois relevé.

## Nouveautés (v54) — médailles chrono + mode Survie

- **Médailles chrono** : chaque défi rapporte une médaille selon ton **meilleur temps** — 🥇 or (≤ 40 s), 🥈 argent (≤ 75 s), 🥉 bronze (terminé). Elles complètent les étoiles (précision) par la vitesse. Visibles au **carnet**, sur le **poster** et dans un bloc dédié du **tableau de bord** (compte par métal + détail). Nouveau succès **🥇 Chasseur d'or** (3 médailles d'or).
- **Mode Survie** de la borne : des vagues **sans fin** de plus en plus rapides, record dédié. La campagne « 8 vagues + boss » reste dispo à part.
- Nouveau succès **🕹 Roi de l'arcade** (1000 pts à un jeu de la borne).

## Nouveautés (v53) — 3e jeu d'arcade : Serpent Invader

- **🐍 Serpent Invader** : un snake où un serpent-invader mange les pièces et s'allonge, accélère, et meurt s'il touche un mur ou sa queue. **Bonus doré** clignotant qui vaut gros, record sauvegardé. Contrôle au **glissé** ou aux flèches ◀▲▼▶.
- La salle d'arcade compte donc **3 jeux** : on passe de l'un à l'autre depuis n'importe quel menu.
- Le sprite d'invader plat est désormais **partagé** par les 3 jeux (mis en cache une fois).

## Nouveautés (v52) — 2e jeu d'arcade + tableau de bord

- **🧱 Casse-Tag** : un deuxième jeu dans la borne, un **casse-briques** où une bille renvoyée par une raquette-bombe détruit un mur en forme d'invader. 3 murs (crab, squid, octo), bonus **raquette large** et **multi-bille**, record sauvegardé. On bascule entre les deux jeux depuis le menu de la borne.
- **📊 Tableau de bord** : un écran de stats complet — progression (pièces, défis, étoiles, sans-faute, complétion), **barres de tes meilleurs temps** par défi, records de la salle d'arcade (Les Vans Defense, Casse-Tag, Tournée) + temps de chasse, et la liste des succès.

## Nouveautés (v51) — LA BORNE D'ARCADE + LE CARNET DE CHASSE

Deux grosses features rejouables, débloquées au repaire.

### 🕹 La Borne d'arcade « Les Vans Defense »
Un vrai **Space Invaders** jouable (débloqué dès la 1ʳᵉ pièce trouvée) :
- **8 vagues** aux couleurs des pièces + un **boss final** avec barre de vie
- **Boucliers destructibles**, **soucoupe mystère** (bonus 50→300 pts), **multiplicateur de combo** (série de kills)
- **Bonus qui tombent** : triple-tir, tir rapide, gel des ennemis, vie, et **bombe** (nettoie l'écran / rase une rangée)
- **3 vies**, **pause**, **table des records à 3 lettres** (initiales)
- Commandes tactiles : ◀ TIR ▶ ou glissé/tap directement sur le terrain

### 📖 Le Carnet de chasse
Le journal de l'invasion, une fiche par pièce :
- **Date et heure réelles** de capture et de réussite, nombre de tentatives, **record perso** par défi, étoiles, et une **anecdote** sur-mesure
- **Rejouer un défi en entraînement** (record perso à battre, sans toucher aux points)
- **Poster souvenir** généré en grande image **téléchargeable** (PNG) : titre graffiti, les 8 invaders, stats

### ⏱ Tournée : temps intermédiaires
La Tournée affiche désormais le **split de chaque défi** avec le **delta vs ton meilleur run** (vert si plus rapide, rouge sinon), et les meilleurs splits sont sauvegardés.

## Nouveautés (v50) — LA TOURNÉE DE L'ARTISTE (mode contre-la-montre)

Le jeu continue de vivre APRÈS la chasse : un vrai mode rejouable.

- **Débloquée automatiquement** quand les 6 défis « jouables partout » sont finis (Palette, Binaire, Rubik, Simon, Cavale, Pochoir — le Spotting et la Coop restent liés aux balises posées en ville). Un bouton **🏁 La Tournée de l'artiste** apparaît alors au repaire.
- **On enchaîne les 6 défis d'affilée**, chrono global affiché en direct dans le titre (« ⏱ 1:23 · 3/6 — Le Simon »), sans indices ni passer.
- **Record sauvegardé** : l'écran de fin affiche le temps, célèbre un **★ RECORD ! ★** (tampon rose rayonnant, confettis, vibrations), et le bouton du repaire affiche le record à battre.
- **« ↻ La refaire »** immédiat, **« ✕ Abandonner »** disponible à tout moment, et un nouveau succès **🏁 La Tournée**.
- En mode `?triche=1`, un bouton « ⚡ défi suivant » permet de prévisualiser l'enchaînement.

## Nouveautés (v49) — finitions street art partout

- **Toast de succès en sticker** : bord pochoir jaune en pointillés, grain béton, léger travers, nom du succès au marqueur — et une **vibration** au déblocage.
- **Panneaux du menu** (Succès, Transmissions, Crédits, Sauvegarde) : affiche béton avec cadre pochoir, cohérente avec le reste.
- **Indice de défi griffonné au marqueur** (jaune, léger travers).
- Robustesse : `Menu3D.stop()` ne plante plus s'il est appelé avant tout démarrage du menu.

## Nouveautés (v48) — la capture de pièce fait CLIC-CLAC

- **Éclair de flash photo** : scanner un QR déclenche un **éclair blanc plein écran** avec vibration — comme la vraie app Flash Invaders.
- **La carte de capture claque** en arrivant (zoom + halo à la couleur de la pièce qui se résorbe).
- **Confettis** à la révélation de l'invader, en plus du boom et du compteur de points.

## Nouveautés (v47) — la machine à sous du fragment + titre sprayé

- **Révélation du fragment façon machine à sous** : après un défi, le chiffre **roule en gris** (avec cliquetis), ralentit, puis **claque en or** avec un rebond, une vibration et « chiffre **n°X** du code final » — on sait ce qu'on a gagné ET où il se place.
- **Le titre de l'écran d'accueil se « spraye »** : révélation saccadée de gauche à droite, comme un coup de bombe à travers un pochoir.

## Nouveautés (v46) — graphisme, gameplay et animations

- **L'écran de défi devient l'affiche de la station** : cadre pochoir et titre marqueur **à la couleur de la pièce** (jaune pour le Binaire, rose pour le Spotting…), fond béton grainé — chaque défi a son identité.
- **Tampon PARFAIT** : réussir un défi avec 3★ déclenche un tampon rose **« ★ SANS FAUTE ! ★ »** plus gros, qui rayonne, avec rafale de vibrations.
- **Rejouer rapporte** : un défi fini sans les 3★ affiche une invitation **« ↻ rejouer »** sur sa carte, et améliorer son score donne **+5 pts par étoile gagnée**.
- **Pastilles de quête vivantes** : une pastille qui vient d'être validée fait un **bond** à l'arrivée sur le repaire.

## Nouveautés (v45) — grosse passe sur les mini-jeux

- **Le Binaire (LV_02)** : les lignes se décodent désormais **dans l'ordre** (les suivantes attendent, assombries — fini la confusion), le **dépassement s'affiche en rouge** avec secousse et vibration, et une **jauge d'étoiles en direct** (★★★ → ★) montre le temps qui file. Verrouillage d'une ligne = vibration + pop.
- **Le Simon (LV_05)** : chaque pad porte un **symbole gravé** (▲ ● ■ ✦) — on peut suivre la séquence même sans bien distinguer les couleurs (daltonisme, plein soleil). Vibrations : petite tape par bonne note, triple secousse sur erreur.
- **Rubikcubisme (LV_04)** : la **ligne jouée s'illumine** un instant (on voit enfin son coup sur le cube), et le compteur affiche en direct **les étoiles en jeu** (« COUPS : 5 · PAR : 8 · ★★★ »). Vibration par coup, rafale à la résolution.
- **La Coop (LV_07)** : au premier scan, gros « **FONCE !** » + le statut **nomme la balise manquante** ; sous 10 s, un bip + une pulsation par seconde (au lieu de 5 bips/s).
- Testé de bout en bout : partie complète de Simon gagnée, verrouillages du Binaire, coup de Rubik, scénario Coop A→B — zéro erreur.

## Nouveautés (v44) — titres plus lisibles + typo de secours

- **Petits titres d'écran** (« LE CODE FINAL », « FLASH RÉUSSI ! », « DERNIER FLASH ») : agrandis et ombre de spray réduite — à cette taille l'ombre pleine dédoublait le texte sur le sous-titre.
- **Polices de secours soignées** : si les polices web ne sont pas encore en cache (tout premier lancement sans réseau), le jeu retombe sur des polices système proches de l'esprit (Marker Felt / Chalkboard SE sur iPhone pour le côté marqueur, Arial Black pour les titres) au lieu d'un serif cassé.

## Nouveautés (v43) — le message final en note taguée

- L'écran de victoire présente désormais le message d'anniversaire comme un **mot manuscrit scotché sur le mur** : grain béton, cadre jaune au pochoir, bout de scotch, léger travers et coulures de peinture jaunes. Le texte (« L'invader, c'était moi… Joyeux anniversaire, Papa ») reste intact, juste bien mis en valeur.

## Nouveautés (v42) — éclaboussures de bombe sur le mur

- Le mur de béton porte maintenant de **vieilles éclaboussures de spray** (cyan, rose, violet, orange) en fond, très discrètes. Les écrans un peu vides (radar, scanner, transmission) ressemblent enfin à un vrai mur tagué plutôt qu'à du béton nu. Formes générées en SVG, hors-ligne, sans impact sur les commandes.

## Nouveautés (v41) — coulures de peinture

- Les deux cartes du repaire (fiche agent, quête) laissent maintenant **dégouliner de la peinture** de leur bord bas — coulures cyan et roses avec un léger halo néon, comme du spray frais. Détail signature de la direction street art.

## Nouveautés (v40) — direction artistique STREET ART (refonte graphiste)

Le jeu prend l'univers de son histoire : l'invader-artiste qui tague Les Vans.

- **Mur de béton** : fond sombre grainé (texture générée, marche hors-ligne) avec des **auréoles de bombe** colorées dans les coins, à la place de la grille synthwave.
- **Typo tag** : le titre passe en **graffiti** (Bangers) avec ombre de spray décalée ; les intertitres et titres de défis en **marqueur** (Permanent Marker).
- **Cartes = affiches collées** : contour découpé au pochoir (cyan / rose), léger travers, ombre franche, petit bout de **scotch** en haut.
- **Boutons = stickers** : contour noir + ombre nette, façon autocollant sprayé.
- **Barre d'onglets** : bande de béton, onglet actif avec une **tache de bombe** derrière.
- **Pellicule de grain** sur tout l'écran pour unifier le rendu « affiche ».

## Nouveautés (v39) — barre d'onglets façon appli (navigation claire)

- Fini les gros boutons empilés au milieu du repaire : la navigation passe par une **barre d'onglets fixée en bas**, avec icône + libellé, comme dans l'appli Flash Invaders.
- **5 onglets** : 🏠 **Repaire** (galerie, rang, quête) · ⌖ **Flash** (scanner caméra) · 📡 **Radar** (chaud-froid) · 🔑 **Code** (le code final) · ☰ **Menu** (réglages, aide, sauvegarde).
- L'onglet actif est **surligné en cyan** avec un petit trait lumineux. La barre **disparaît** pendant l'intro, les défis, le flash et la victoire (plein écran).
- Le tutoriel Squiddy pointe désormais directement sur les onglets.

## Nouveautés (v38) — économie de batterie (chasse toute une journée)

- **Le GPS haute précision est coupé dès qu'on quitte le radar** (retour au hub, ouverture d'un défi…) — avant, il pouvait continuer à tourner en fond.
- **Écran verrouillé / appli en arrière-plan** : le GPS **et** le flux caméra sont **automatiquement coupés**, puis **relancés au retour dans l'appli** exactement dans l'état où on les avait laissés. C'est le plus gros gain d'autonomie pour une chasse qui dure des heures.

## Nouveautés (v37) — le tableau de bord repensé (vrai look de jeu vidéo)

- **Fiche agent héroïque** : nom d'agent, **rang actuel ▸ rang suivant** (RECRUE ▸ ÉCLAIREUR…), **jauge d'XP** propre (sans texte qui se chevauche), **pastille de rang** (R2, R3…) sur le badge, et « Encore X ★ pour [rang suivant] » (ou « ✦ Rang maximum atteint »).
- **Bandeau de quête lisible** : titre « ◈ LA CHASSE » + compteur **X/8**, une rangée de **8 pastilles numérotées** (✓ quand le défi est réussi, le numéro sinon ; états cyan « en cours » / or « terminé »), et une **bannière d'objectif** claire (⚡ prochain défi / 🎯 en cours / 🔒 terminé).
- **Galerie plus vivante** : les silhouettes des pièces non débloquées sont teintées à leur couleur, plus lisibles.

## Nouveautés (v36) — tutoriel façon vrai jeu vidéo

- **Visite guidée du HUB au premier lancement** (après la cinématique) : un guide mascotte, **Squiddy**, présente le jeu en 8 étapes avec des **coach marks** — un projecteur cyan éclaire l'élément expliqué (fiche agent, ligne d'objectif, code final, galerie, bouton Flasher, Radar, Code final) pendant que le reste s'assombrit, une main pointe la cible, bulle de dialogue + points de progression + « Suivant ▶ ».
- **Passable** à tout moment (« Passer ✕ »), joué **une seule fois** (mémorisé), et **rejouable** via le menu ☰ → COMMENT JOUER.

## Nouveautés (v35) — personnalisation : code final, portrait, sauvegarde

- **Code final = la date de naissance de Papa (27/07/1975)** → les 8 fragments donnent `27071975`.
- **Portrait refait** (15×19, d'après photo) : cheveux argentés, **lunettes rondes nettes**, barbe très légère, grand sourire avec dents, veste noire zippée — nettement plus ressemblant. Le vieux tag du mur du Pochoir affiche désormais **1975**.
- **Sauvegarde / restauration** (menu ☰ → SAUVEGARDE) : la partie est déjà gardée automatiquement, mais on peut copier un **code de secours** (à s'envoyer par SMS/mail) et **restaurer** la partie sur un autre téléphone. Testé : export → restauration → état correct.

## Nouveautés (v34) — le RADAR CHAUD-FROID (remplace la mini-carte)

- La carte dessinée a été remplacée par un **radar chaud/froid au GPS**, bien plus utile pour une chasse : bouton « 📡 Radar chaud-froid » sur le HUB. Le radar vise **la pièce non flashée la plus proche** et affiche la température : **GLACIAL → FROID → TIÈDE → CHAUD → BRÛLANT → C'EST LÀ ! FOUILLE !**, avec la distance approximative et des **bips façon compteur Geiger qui accélèrent** en approchant (+ petites vibrations). Aucune carte, aucun réseau : GPS pur, fiable hors-ligne.
- **À FAIRE PAR TOI (réglage des spots)** : ouvre le jeu en `?triche=1` → Radar → active-le → va PHYSIQUEMENT à l'endroit d'une pièce → choisis son numéro dans les pastilles → « 📌 Enregistrer la pièce ici ». Répète pour les 8. Puis « ⎘ Copier les spots » et colle le résultat dans `CONFIG.map.spots` (ou envoie-le à Claude). Sans spots réglés, le radar l'indique honnêtement.

## Nouveautés (v32) — la planche de balises redessinée

- **`qr-codes.html` refaite aux couleurs du jeu** : 13 cartes imprimables avec l'**invader pixel** de chaque pièce dans sa couleur, bandeau titre en typo d'affiche, badge de points, **QR au cadre coloré**, code en toutes lettres, guides de découpe en pointillés, liseré assorti. Les balises Coop (🤝) et Spotting (🔍) ont leurs cartes dédiées avec les consignes de pose imprimées dessus.
- **Plus aucun CDN pour les QR** : la bibliothèque de génération est **embarquée dans la page** (MIT) — la planche fonctionne même sans réseau, et les QR ont une zone de silence de 4 modules pour un scan fiable.
- **Validé** : les 13 QR générés ont été décodés avec jsQR (la bibliothèque exacte du scanner du jeu) — 13/13 corrects.

## Nouveautés (v31) — l'écran de capture en carte de collection

- **« FLASH RÉUSSI ! » devient une carte à collectionner** : la pièce 3D trône sur des **rayons lumineux rotatifs** teintés à sa couleur, dans une carte au bord assorti, avec un badge doré « **PIÈCE n/8** » et le nom de la pièce dans sa couleur. Ce moment revient 8 fois — c'est maintenant un petit événement à chaque fois.
- La typo d'affiche **Bungee** s'applique aussi aux tampons de fin de défi, au « PRÊT ?/GO ! » et aux badges — cohérence d'enseigne partout.
- **Bug réglé** : un vieil effet « letterbox » posait une bande noire qui masquait le titre de l'écran de capture — supprimé.

## Nouveautés (v30) — direction artistique + LE VRAI PORTRAIT

- **Le portrait du Pochoir est maintenant le vrai** : dessiné d'après photo (14×16) — cheveux argent, lunettes rondes (dont les verres clignent à la fin), barbe poivre et sel, veste noire zippée, grand sourire. 8 couches à peindre à la bombe.
- **Écran titre recomposé** : le bouton JOUER est **toujours visible** (plus jamais coupé par la barre Safari), le texte console est compact et lisible, la table des valeurs qui encombrait la scène 3D a été retirée.
- **Direction artistique « affiche »** : police display **Bungee** (enseigne/street-art) sur tous les grands titres, dégradé **coucher synthwave** (or→corail→magenta→violet) assorti à l'horizon du sol, fini les ombres cyan/magenta qui salissaient les titres.
- **Boutons refondus** : pilules au dégradé coucher-de-soleil pour l'action principale, cyan pour la secondaire, verre dépoli pour le reste — une vraie hiérarchie visuelle cohérente avec le titre.
- **Galerie** : les cartes sont légèrement inclinées comme des **stickers posés à la main** sur un mur.

## Nouveautés (v29) — LE DÉFI ULTIME : se flasher soi-même

- Après le code final et l'ouverture du cadenas, le jeu annonce qu'il manque **UNE pièce au tableau : l'invader lui-même**. La **caméra frontale** s'ouvre et son visage apparaît **pixelisé en mosaïque vivante** (il devient littéralement une pièce d'invader), avec viseur doré et ligne de balayage. Bouton « ⌖ Me flasher » → compte à rebours **3-2-1** → flash blanc, « **INVADER IDENTIFIÉ ✓** », confettis → victoire.
- **Incassable le jour J** : si la caméra refuse (permission, mode avion), un message l'indique aussitôt et un bouton de secours (« C'est bien moi — parole d'invader ») apparaît — il s'affiche de toute façon après 7 secondes. Aucune reconnaissance faciale, aucun réseau : ça marche à tous les coups.

## Nouveautés (v28) — transmissions refaites + mini-jeux plein écran

- **Les messages de l'invader** ne sont plus un simple texte : ils arrivent dans une **émission pirate** — carte sombre bordée de magenta avec scanlines de vieux tube, **● REC** qui clignote, numéro de **SIGNAL**, barres d'onde animées, et le **visage de l'invader** qui tourne en 3D avec des à-coups de glitch au-dessus du texte tapé.
- **Mini-jeux en PLEIN ÉCRAN** : l'écran de défi occupe désormais tout le téléphone (marges minimales, boîte étirée). La Cavale et le Pochoir calculent leur toile sur la taille réelle de l'écran — sur iPhone 13 la course fait presque toute la hauteur, et la découpe du pochoir est nettement plus grande.

## Nouveautés (v27) — arrière-plans enrichis

- **Sol synthwave** de retour et sublimé : une **grille en perspective** qui défile en bas de tous les écrans, avec un **horizon lumineux** (halo rose/violet) et des lignes **teintées du magenta (horizon) au cyan (près de toi)**, rendues en **lumière additive** pour un glow premium. Ça donne enfin un vrai « lieu » et de la profondeur à la scène.
- **Fond plus profond** : dégradé de nuit retravaillé avec un **halo violet/cyan** qui monte du bas, en écho à l'horizon.
- (Rappel v26 : nébuleuses colorées + étoiles teintées dans le champ d'étoiles.)

## Nouveautés (v26) — graphismes & textures enrichis

- **Pièces 3D plus « premium »** : chaque cube du moteur voxel reçoit maintenant une **glaçure céramique** (dégradé clair→ombre), une **lumière du ciel** sur les faces tournées vers le haut et un **contraste** plus marqué — les squids/crabes/cœurs paraissent vernis et lisent mieux le volume. Visible partout (galerie du hub, flash de capture, victoire, menu).
- **Fond étoilé enrichi** : de discrètes **nébuleuses colorées** (rose/cyan/violet) pré-rendues, des **étoiles teintées** de plusieurs couleurs, et quelques **étoiles brillantes qui scintillent en croix**.
- **Mosaïques 2D plus réalistes** : les tesselles ont un **émail** (dégradé), un **joint sombre** (grout) qui les détache, et un **reflet spéculaire** net.

## Nouveautés (v25) — écran de victoire en récap célébratoire

- L'écran de fin passe d'une simple liste de texte à un **vrai tableau de fin** : les 8 pièces qui explosent en vedette, une **carte cadeau** (🎁) qui met en avant le message d'anniversaire, un **bandeau « RANG ATTEINT »**, et des **tuiles de statistiques** (Score ✦ record, Étoiles ★/24, Succès /8, Durée de la chasse).
- Deux **boutons** : « ↻ Revoir l'intro » (rejoue la cinématique puis re-fête) et « ← Retour au repaire » (revenir au hub pour rejouer les défis).

## Nouveautés (v24) — écran du code final repensé

- **Le code final devient un vrai moment** : un **cadenas doré** (qui s'ouvre à la réussite) surmonte huit **molettes** qui se remplissent en or, avec un **clavier numérique** arcade (⌫ pour effacer, ✓ qui s'illumine dès les 8 chiffres saisis). Fini les minuscules cases et le grand vide — la saisie est claire, tactile et satisfaisante sur mobile. Le clavier physique marche toujours (chiffres, Retour arrière, Entrée).
- Titre « LE CODE FINAL » nettoyé (or, lisible), message ACCÈS REFUSÉ qui efface la saisie pour réessayer, DÉVERROUILLÉ + cadenas ouvert avant la victoire.

## Nouveautés (v23) — La Cavale : glissade + échelle repensée

- **Glissade dans le sprint** : de nouvelles **poutres à hauteur de tête** (rayées jaune/noir, télégraphiées « ▼ GLISSE ») qu'on ne peut PAS sauter — il faut **glisser dessous**. Tape en **haut** de l'écran = saut, tape en **bas** ou **glisse vers le bas** = glissade (au clavier : ↓ ou S). Glisser sous une poutre au ras rapporte « GLISSÉ ! +1 » et des bombes au sol.
- **Échelle plus longue et plus fun** : la partie échelle dure maintenant plus longtemps que la course (42 barreaux). On peut **se déplacer à gauche/droite** (glissé ↔ ou flèches) entre les rails pour **esquiver les débris qui tombent** (télégraphiés par un ▼ rouge en haut) et **récupérer des bombes** placées sur un rail. Le projecteur de l'hélico (fige-toi !) reste, mais on peut esquiver latéralement pendant qu'on est figé.
- La course de rue est un peu plus courte, pour que le gros du défi se joue en hauteur.

## Nouveautés (v22) — cinématique de cinéma + écrans à encoche

- **Cinématique nettement enrichie** : bandes noires de cinéma qui entrent/sortent, léger **travelling/zoom « Ken Burns »** sur chaque plan, **fondus au noir** entre les plans (vrais « cuts »), **pluie fine** sur les scènes de nuit, **vignette** et **grain de pellicule** argentique, sous-titres en fondu doux. Tout reste dessiné au canvas, sans image externe.
- **Adapté aux téléphones à encoche (iPhone 13, Pixel…)** : `viewport-fit=cover` + zones sûres (`env(safe-area-inset-*)`) sur tous les écrans, le HUD, la barre de triche, le cadre et le bouton « Passer ». Plus rien ne passe sous l'encoche ni sous la barre d'accueil.

## Nouveautés (v21) — reprendre / recommencer + fin du cache bloqué

- **Écran-titre intelligent** : si aucune partie n'existe, un seul bouton « ▶ Commencer l'aventure » (qui lance la cinématique). Si une partie est en cours, deux boutons : « ▶ Reprendre ma partie » (droit au HUB) et « ✦ Nouvelle partie (voir l'intro) » qui, après **double confirmation**, efface tout et rejoue la cinématique depuis zéro.
- **Code secret de remise à zéro** : tape `CONFIG.codeReset` (défaut **`0000`**) dans la saisie manuelle du scanner. Première saisie = avertissement, deuxième saisie = tout est effacé et le jeu redémarre au début (cinématique comprise). Se change dans `CONFIG.codeReset`.
- **Fin du « je ne vois pas les nouveautés »** : le service worker passe en **réseau-d'abord pour le jeu** (`index.html`). Dès qu'il y a du réseau, on obtient TOUJOURS la dernière version (cinématique, La Cavale, Le Pochoir…) ; le cache ne sert plus qu'en secours hors-ligne. ⚠ Après une mise à jour, il peut falloir **recharger une fois de plus** (ou fermer/rouvrir l'appli) le temps que l'ancien service worker cède la place au nouveau.

## Nouveautés (v20) — cinématique d'intro

- **Une vraie cinématique de ~75 secondes** se joue au premier « Appuyer pour démarrer », en 6 plans entièrement dessinés : la nuit aux Vans (panorama, lune, ville), l'artiste qui arrive sous le réverbère, la pose de la pièce tesselle par tesselle (avec pschitts et signature), l'aube sur trois mosaïques, le radar qui capte les 8 signaux, et le carton de mission « AGENT PAPA ».
- Sous-titres, bandes cinéma, bruitages synchronisés ; la musique de chasse tourne dessous.
- **Passable** après 3,5 s (bouton « Passer ► » en haut à droite) ; jouée une seule fois (mémorisé), puis revisible via le menu ☰ → **REVOIR L'INTRO**, ou le bouton CINÉ de la barre de triche.
- Respecte « mouvement réduit » (la cinématique est sautée, l'intro machine à écrire raconte déjà l'histoire).

## Nouveautés (v19) — habillage général

- **Écran titre** : l'escadron survole maintenant une **ville en contre-jour** (fenêtres allumées, parallaxe douce avec la caméra), des **étoiles filantes** traversent le ciel, et un badge doré « ✦ ÉDITION LES VANS ✦ » signe le jeu sous le logo.
- **HUB** : l'accueil suit l'heure (« Bonsoir, agent Papa »), et une ligne sous la barre de quête affiche **toujours le prochain objectif** (défi en attente, prochaine pièce à trouver, ou code final). Les pièces non trouvées apparaissent en **silhouette dans l'ombre** au lieu d'un simple « ??? ».
- **Scanner** : une **ligne de balayage** cyan parcourt l'image caméra — on voit que ça cherche.

## Nouveautés (v18) — polish « comme un vrai jeu »

- **La Cavale, mise en scène** : jalons de rythme annoncés (« ÇA S'ACCÉLÈRE ! », « DERNIÈRE LIGNE DROITE ! »), voiture de patrouille qui traverse en silhouette au premier plan avec gyrophare qui teinte la scène, pigeons qui picorent et s'envolent au passage, nuages devant la lune, écharpe et traînée **dorées** à partir du combo ×5, fanion cyan qui flotte au sommet de l'échelle.
- **L'échelle** : alerte sonore quand le faisceau entre sur l'échelle, faisceau à phase continue (jamais de téléportation).
- **Assistance invisible** (façon Nintendo) : après des échecs répétés, le jeu s'adoucit sans le dire — écarts entre obstacles élargis, vitesse maximale plafonnée, projecteur ralenti. Personne ne reste bloqué, personne ne s'en aperçoit.
- **Le Pochoir** : nuancier des couches (pastilles de couleur qui s'allument), et après la révélation la pièce **prend vie** — les yeux clignent, puis l'artiste signe « A. » à la bombe en bas à droite.

## Nouveautés (v17) — la Cavale et le Pochoir

- **LV_06 « La Cavale »** (remplace l'Arcade) : la pièce est posée, il faut fuir ! Course de nuit dans la rue — un appui = un saut, appui long = saut plus haut, avec « jump buffer » (un appui juste avant l'atterrissage part quand même). Les obstacles naissent **hors écran** et l'écart entre eux est calibré sur le temps de réaction (≥ 1 s), jamais sur le hasard seul : on les voit toujours venir de loin. Les bombes de peinture à ramasser sont souvent en cloche au-dessus des obstacles : sauter rapporte. Au bout de la rue, **l'échelle** : on tape pour grimper, barreau par barreau, mais il faut se figer quand le projecteur de l'hélicoptère balaie le mur. 3★ = pas touché une seule fois.
- **LV_08 « Le Pochoir »** (remplace le Portrait) : le final se peint comme une vraie pièce de street art. On secoue la bombe, puis on peint couche par couche (cheveux, peau, yeux…) à travers un pochoir posé sur le mur — la peinture ne se dépose **que dans les découpes**. À la fin, le pochoir se soulève et révèle le portrait aux bords nets, coulures comprises.
- **Graphismes** : les deux défis sont rendus en haute densité (net sur Retina), avec ciel étoilé, lune, immeubles en parallaxe, réverbères, mur de briques, hélicoptère et projecteur volumétrique.

## Nouveautés « game feel » (v16)

- **Tableau de bord joueur** (haut du HUB) : badge voxel, rang qui évolue avec les étoiles gagnées, barre d'XP vers le rang suivant, total ★/24. Le rang gagné s'affiche aussi sur l'écran-titre au relancement (continuité entre sessions).
- **Montée de rang** : quand on franchit un palier, bandeau « NOUVEAU RANG », halo doré sur la carte, confettis et jingle dédié.
- **HUD** : compteur d'étoiles ajouté à côté du nombre de pièces.
- **Sound design étendu** : sons de navigation / validation / retour dans les menus, jingle de montée de rang, et un **thème musical de victoire** en majeur qui tourne en boucle sur l'écran de fin.
- **Écran de victoire** : récapitulatif enrichi (score, rang, ★/24, succès débloqués, durée).

## Checklist du jour J

- [ ] Téléphone chargé + batterie externe
- [ ] Jeu testé en mode avion la veille
- [ ] Partie remise à zéro (`?triche=1` → RESET) après tes tests
- [ ] QR posés (gaffer amovible / aimants — accord des commerçants)
- [ ] Un run à blanc complet fait par TOI, en marchant, en vrai
- [ ] Le cadenas réglé sur le code final, le cadeau dans la boîte
- [ ] Tout récupérer le soir même
