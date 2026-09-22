# Meine Reise durch die deutschsprachigen Länder

One-Page-Website (Scroll-Storytelling) für eine Präsentation im Deutschunterricht.
Autor: Rares Duca, 18 Jahre. Alle Texte auf Deutsch, Niveau A2.

- Statische Seite, kein Build-Schritt: `index.html` direkt öffnen (auch per `file://`, ohne Internet).
- Bibliotheken liegen lokal in `vendor/` (GSAP 3.15 + ScrollTrigger, Lenis 1.3), Schriften in `fonts/fonts.css` (als data-URI eingebettet, ebenfalls offline).
- Präsentationsmodus: Pfeiltasten, Leertaste, Bild ab/auf (Clicker) springen von Sektion zu Sektion; Pos1/Ende an den Anfang/ans Ende.

## Bilder holen

Die Fotos kommen von Wikimedia Commons (nur freie Lizenzen). Sie werden nicht per Hand
gesucht, sondern mit einem Skript geladen, verkleinert und als WebP gespeichert:

```bash
pip install pillow
python3 tools/fetch_images.py            # holt 29 Bilder nach images/
```

Danach `images/_kontaktbogen.html` im Browser öffnen und jedes Foto prüfen.
Passt eines nicht, den exakten Commons-Dateinamen in `image-picks.json` eintragen
(z. B. `"koeln.bg": "File:Kölner Dom nachts.jpg"`) und das Skript erneut starten.
Mit `--candidates 6` legt das Skript pro Bild sechs Alternativen in `images/_kandidaten/` ab.

Das Skript schreibt `credits.json` und `js/credits.js`; daraus baut die Seite die Sektion „Bildnachweise“.

## Lokal testen

```bash
npx http-server -p 8080 .
```

## Deploy

Netlify: `netlify.toml` veröffentlicht das Repo-Root und setzt Cache-Header für `/images`, `/vendor`, `/fonts`.
