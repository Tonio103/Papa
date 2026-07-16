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
| `CONFIG.credits` | le texte de l'écran Crédits (menu ☰) |
| `SONG` (dans AudioFX) | la musique de fond : 4 pistes de 16 pas (basse, arpège, kick, charley) — remplace les fréquences pour changer le thème |
| `CONFIG.messagesInvader` | les 7 messages de l'invader entre les défis — c'est là que se joue l'histoire |
| `fragment` de chaque station | les 8 chiffres = le code final (actuellement 19982026) — mets une date à lui |
| `indice` de chaque station | les textes d'aide |
| `TARGETS` dans LV_02 | les 3 nombres cibles du binaire |
| `TARGET` dans LV_04 | le motif du Rubik |
| `TARGET_LEN` dans LV_05 | longueur du Simon (6 par défaut) |
| `SHAPES.portrait` + `PALETTES.portrait` | le portrait pixel de ton père (LV_08) — grille de lettres, une lettre = une couleur ; un visage 12×12 d'exemple montre le format |
| `LV03_IMGS` + `SPOTS` (LV_03) | remplace les 3 images provisoires par tes photos macro (base64, ~600px) et adapte les légendes |
| `RANKS` (dans `index.html`) | les 6 rangs du joueur et leurs seuils d'étoiles (RECRUE → MAÎTRE INVADER) affichés sur le tableau de bord du HUB et l'écran-titre |

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
