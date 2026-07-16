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

Ouvre `qr-codes.html` (avec réseau), bouton Imprimer. 13 cartes : les 8 stations, les 2 balises coop LV_07A/LV_07B (loin l'une de l'autre), et les 3 mini-balises spotting LV_03A/B/C (à cacher aux endroits de tes photos). Le code en clair sous chaque QR est le plan B (saisie manuelle). Plastifie ou couvre d'adhésif transparent.

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
