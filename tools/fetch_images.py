#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lädt für jede Station zwei Fotos von Wikimedia Commons (Commons-API),
prüft die Lizenz (nur CC0 / CC BY / CC BY-SA / Public Domain), verkleinert
(Hintergrund max. 2000 px, Detail max. 1200 px), speichert als WebP in /images
und schreibt credits.json + js/credits.js.

Benutzung (Python 3.8+, benötigt Pillow: pip install pillow):

    python3 tools/fetch_images.py                 # alle fehlenden Bilder holen
    python3 tools/fetch_images.py --force         # alle Bilder neu holen
    python3 tools/fetch_images.py --only koeln    # nur eine Station
    python3 tools/fetch_images.py --candidates 6  # pro Bild 6 Kandidaten in images/_kandidaten/ ablegen

Danach images/_kontaktbogen.html im Browser öffnen und jedes Bild prüfen.
Passt ein Bild nicht: in image-picks.json den exakten Commons-Dateinamen
eintragen (z. B. "koeln.bg": "File:Koelner Dom bei Nacht.jpg") und das Skript
noch einmal ausführen.
"""
import argparse
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow fehlt:  pip install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "images")
PICKS_FILE = os.path.join(ROOT, "image-picks.json")
API = "https://commons.wikimedia.org/w/api.php"
UA = "MeineReiseSchulprojekt/1.0 (Schulpraesentation; Kontakt via GitHub raresd12/proint)"

# Suchbegriffe pro Bild. bg = breites Hintergrundbild, detail = Detailfoto.
# Reihenfolge = Priorität. Das erste Suchergebnis mit freier Lizenz und
# ausreichender Größe wird genommen (Featured/Quality-Bilder zuerst).
PLAN = [
    ("hero",          "bg",     ["Bastei Elbsandsteingebirge panorama sunrise", "Basteiaussicht Elbe Nebel"]),
    ("koeln",         "bg",     ["Kölner Dom Hohenzollernbrücke Rhein Nacht", "Cologne Cathedral Hohenzollern Bridge"]),
    ("koeln",         "detail", ["Kölner Dom Westfassade Türme", "Cologne Cathedral facade towers"]),
    ("bremen",        "bg",     ["Bremen Marktplatz Rathaus Roland", "Bremen Rathaus Marktplatz"]),
    ("bremen",        "detail", ["Bremer Stadtmusikanten Marcks Bronze", "Bremen Town Musicians statue"]),
    ("hamburg",       "bg",     ["Elbphilharmonie Hamburg Hafen", "Elbphilharmonie Hamburg night"]),
    ("hamburg",       "detail", ["Elbphilharmonie Plaza", "Elbphilharmonie Rolltreppe Tube"]),
    ("ruegen",        "bg",     ["Seebrücke Sellin Sonnenaufgang", "Sellin Pier Rügen"]),
    ("ruegen",        "detail", ["Seebrücke Sellin Brückenhaus", "Sellin Seebrücke Tauchgondel"]),
    ("berlin",        "bg",     ["Reichstagsgebäude Berlin Kuppel Abend", "Reichstag building Berlin dome"]),
    ("berlin",        "detail", ["Reichstagskuppel innen Rampe", "Reichstag dome interior ramp"]),
    ("bastei",        "bg",     ["Basteibrücke Sächsische Schweiz", "Bastei Bridge Saxon Switzerland"]),
    ("bastei",        "detail", ["Basteibrücke Felsen Detail", "Bastei bridge arches sandstone"]),
    ("erfurt",        "bg",     ["Krämerbrücke Erfurt Gera", "Krämerbrücke Erfurt Häuser"]),
    ("erfurt",        "detail", ["Krämerbrücke Erfurt Fachwerk Läden", "Krämerbrücke Erfurt street"]),
    ("frankfurt",     "bg",     ["Frankfurt Skyline Nacht Main", "Frankfurt am Main skyline night"]),
    ("frankfurt",     "detail", ["Main Tower Frankfurt Aussichtsplattform", "Commerzbank Tower Frankfurt"]),
    ("tuebingen",     "bg",     ["Tübingen Neckarfront Stocherkahn", "Tübingen Neckar Hölderlinturm"]),
    ("tuebingen",     "detail", ["Stocherkahn Tübingen Neckar", "Stocherkahnrennen Tübingen"]),
    ("rheinfall",     "bg",     ["Rheinfall Schaffhausen Schloss Laufen", "Rhine Falls Neuhausen panorama"]),
    ("rheinfall",     "detail", ["Rheinfall Felsen Boot", "Rhine Falls rock boat"]),
    ("bern",          "bg",     ["Bern Altstadt Aare Luftaufnahme", "Bern old town Aare panorama"]),
    ("bern",          "detail", ["Zytglogge Bern", "Zytglogge Bern astronomische Uhr"]),
    ("muenchen",      "bg",     ["Marienplatz München Neues Rathaus", "Munich Marienplatz Neues Rathaus"]),
    ("muenchen",      "detail", ["Lenbachhaus München", "Lenbachhaus Munich building"]),
    ("grossglockner", "bg",     ["Großglockner Hochalpenstraße Kehren", "Grossglockner High Alpine Road panorama"]),
    ("grossglockner", "detail", ["Großglockner Pasterze Kaiser-Franz-Josefs-Höhe", "Grossglockner glacier Pasterze"]),
    ("graz",          "bg",     ["Graz Schlossberg Uhrturm Altstadt Dächer", "Graz old town Schlossberg panorama"]),
    ("graz",          "detail", ["Kunsthaus Graz Friendly Alien", "Kunsthaus Graz Mur"]),
]
NR = {"hero": 0, "koeln": 1, "bremen": 2, "hamburg": 3, "ruegen": 4, "berlin": 5, "bastei": 6, "erfurt": 7,
      "frankfurt": 8, "tuebingen": 9, "rheinfall": 10, "bern": 11, "muenchen": 12, "grossglockner": 13, "graz": 14}
MAXW = {"bg": 2000, "detail": 1200}
MINW = {"bg": 1600, "detail": 900}
ALLOWED = re.compile(r"^(cc0|cc[- ]by(-sa)?(\s|-|$)|public domain|pd)", re.I)
BAD_TITLE = re.compile(r"(map|karte|plan|logo|wappen|coat of arms|stamp|briefmarke|poster|postcard|postkarte|drawing|zeichnung|gemälde|painting|panorama\s*360|equirect)", re.I)


def api(params):
    params = dict(params, format="json", formatversion="2")
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except Exception as e:  # Netz-/Serverfehler: kurz warten, erneut versuchen
            if attempt == 3:
                raise
            time.sleep(2 * (attempt + 1))


def fetch_bytes(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()


def license_ok(meta):
    short = strip_html(meta.get("LicenseShortName", {}).get("value", ""))
    lic = strip_html(meta.get("License", {}).get("value", ""))
    text = short or lic
    if not text:
        return None
    if re.search(r"(nc|nd)\b", text, re.I) and "cc" in text.lower():
        return None
    if ALLOWED.search(text) or lic.lower().startswith("pd") or lic.lower().startswith("cc0"):
        return text
    return None


def candidates(query, kind, limit=25):
    """Liste passender Commons-Dateien mit Lizenz und Thumb-URL."""
    data = api({
        "action": "query", "generator": "search", "gsrnamespace": 6, "gsrlimit": limit,
        "gsrsearch": query + " filemime:image/jpeg -intitle:map -intitle:Karte",
        "prop": "imageinfo", "iiprop": "url|size|extmetadata|mime",
        "iiurlwidth": MAXW[kind], "iiextmetadatafilter": "LicenseShortName|License|Artist|ImageDescription|Assessments|LicenseUrl|Credit|ObjectName",
    })
    out = []
    for page in data.get("query", {}).get("pages", []):
        ii = (page.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {})
        title = page.get("title", "")
        if BAD_TITLE.search(title):
            continue
        lic = license_ok(meta)
        if not lic:
            continue
        w, h = ii.get("width", 0), ii.get("height", 0)
        if w < MINW[kind] or h < 500:
            continue
        ratio = w / float(h)
        if kind == "bg" and ratio < 1.15:      # Hintergrund: Querformat
            continue
        if kind == "detail" and ratio > 2.2:   # Detail: kein extremes Panorama
            continue
        assessed = bool(strip_html(meta.get("Assessments", {}).get("value", "")))
        score = (3 if assessed else 0) + min(w, 6000) / 6000.0
        out.append({
            "title": title, "url": ii.get("descriptionurl") or ii.get("descriptionshorturl"),
            "thumb": ii.get("thumburl") or ii.get("url"), "w": w, "h": h, "score": score,
            "autor": strip_html(meta.get("Artist", {}).get("value", "")) or "unbekannt",
            "lizenz": lic, "lizenzUrl": strip_html(meta.get("LicenseUrl", {}).get("value", "")),
        })
    out.sort(key=lambda c: -c["score"])
    return out


def info_for_title(title, kind):
    data = api({"action": "query", "titles": title, "prop": "imageinfo",
                "iiprop": "url|size|extmetadata|mime", "iiurlwidth": MAXW[kind],
                "iiextmetadatafilter": "LicenseShortName|License|Artist|Assessments|LicenseUrl"})
    pages = data.get("query", {}).get("pages", [])
    if not pages or pages[0].get("missing"):
        return None
    page = pages[0]
    ii = (page.get("imageinfo") or [{}])[0]
    meta = ii.get("extmetadata", {})
    lic = license_ok(meta)
    if not lic:
        print("   ! Lizenz nicht frei:", title, strip_html(meta.get("LicenseShortName", {}).get("value", "")))
        return None
    return {"title": page["title"], "url": ii.get("descriptionurl"), "thumb": ii.get("thumburl") or ii.get("url"),
            "w": ii.get("width", 0), "h": ii.get("height", 0), "score": 99,
            "autor": strip_html(meta.get("Artist", {}).get("value", "")) or "unbekannt",
            "lizenz": lic, "lizenzUrl": strip_html(meta.get("LicenseUrl", {}).get("value", ""))}


def save_webp(raw, path, maxw, quality=82):
    im = Image.open(io.BytesIO(raw))
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(path, "WEBP", quality=quality, method=6)
    return im.size


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--only", help="nur diese Station (z. B. koeln)")
    ap.add_argument("--candidates", type=int, default=0, help="N Kandidaten pro Bild zusätzlich speichern")
    args = ap.parse_args()

    os.makedirs(IMG_DIR, exist_ok=True)
    picks = {}
    if os.path.exists(PICKS_FILE):
        with open(PICKS_FILE, encoding="utf-8") as f:
            picks = json.load(f)
    credits_path = os.path.join(ROOT, "credits.json")
    credits = {}
    if os.path.exists(credits_path):
        with open(credits_path, encoding="utf-8") as f:
            for c in json.load(f):
                credits[c["key"] + "." + c["art"]] = c

    fehlt = []
    for key, kind, queries in PLAN:
        if args.only and key != args.only:
            continue
        fname = "%02d-%s-%s.webp" % (NR[key], key, kind)
        path = os.path.join(IMG_DIR, fname)
        ck = key + "." + kind
        if os.path.exists(path) and not args.force and ck in credits and not args.candidates:
            print("=", fname, "(vorhanden)")
            continue
        print(">", fname)
        chosen = None
        if picks.get(ck):
            chosen = info_for_title(picks[ck], kind)
            if chosen:
                print("   Auswahl aus image-picks.json:", chosen["title"])
        cands = []
        if not chosen:
            for q in queries:
                cands = candidates(q, kind)
                if cands:
                    break
            if not cands:
                print("   ! nichts Passendes gefunden für", key, kind)
                fehlt.append(fname)
                continue
            chosen = cands[0]
        if args.candidates and cands:
            cdir = os.path.join(IMG_DIR, "_kandidaten")
            os.makedirs(cdir, exist_ok=True)
            for i, c in enumerate(cands[: args.candidates]):
                try:
                    raw = fetch_bytes(c["thumb"])
                    save_webp(raw, os.path.join(cdir, "%s-%s-%d.webp" % (key, kind, i + 1)), 900, 70)
                    print("   Kandidat %d: %s | %s | %s" % (i + 1, c["title"], c["autor"], c["lizenz"]))
                except Exception as e:
                    print("   Kandidat %d fehlgeschlagen: %s" % (i + 1, e))
        try:
            raw = fetch_bytes(chosen["thumb"])
            size = save_webp(raw, path, MAXW[kind])
        except Exception as e:
            print("   ! Download fehlgeschlagen:", e)
            fehlt.append(fname)
            continue
        print("   OK %dx%d | %s | %s | %s" % (size[0], size[1], chosen["title"], chosen["autor"], chosen["lizenz"]))
        credits[ck] = {
            "key": key, "art": kind, "datei": "images/" + fname, "titel": chosen["title"].replace("File:", ""),
            "autor": chosen["autor"], "lizenz": chosen["lizenz"], "lizenzUrl": chosen["lizenzUrl"], "quelle": chosen["url"],
        }
        time.sleep(0.5)  # Commons nicht überlasten

    order = {k: i for i, (k, _, _) in enumerate([(p[0] + "." + p[1], 0, 0) for p in PLAN])}
    rows = sorted(credits.values(), key=lambda c: order.get(c["key"] + "." + c["art"], 999))
    with open(credits_path, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    with open(os.path.join(ROOT, "js", "credits.js"), "w", encoding="utf-8") as f:
        f.write("/* Bildnachweise – automatisch erzeugt von tools/fetch_images.py */\n")
        f.write("window.BILDNACHWEISE = " + json.dumps(rows, ensure_ascii=False, indent=2) + ";\n")

    # Kontaktbogen zum schnellen Prüfen im Browser
    with open(os.path.join(IMG_DIR, "_kontaktbogen.html"), "w", encoding="utf-8") as f:
        f.write("<!doctype html><meta charset=utf-8><title>Kontaktbogen</title>"
                "<style>body{font:14px system-ui;background:#111;color:#eee;padding:20px}"
                ".g{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px}"
                "figure{margin:0;background:#222;padding:8px}img{width:100%;height:240px;object-fit:cover}"
                "figcaption{font-size:12px;line-height:1.4}</style><h1>Bilder prüfen</h1><div class=g>")
        for c in rows:
            f.write('<figure><img src="../%s"><figcaption><b>%s</b><br>%s<br>%s · %s</figcaption></figure>'
                    % (c["datei"], c["datei"], c["titel"], c["autor"], c["lizenz"]))
        f.write("</div>")

    print("\ncredits.json und js/credits.js geschrieben (%d Einträge)." % len(rows))
    if fehlt:
        print("FEHLT:", ", ".join(fehlt))


if __name__ == "__main__":
    main()
