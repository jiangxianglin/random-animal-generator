"""Replace placeholder / known-bad animal image URLs with Wikimedia Commons thumbs."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[1] / "lib" / "animals-data.json"
UA = "RandomAnimalGenerator/1.0 (image-repair; local script)"

# Curated full-subject replacements for known wrong/cropped/broken URLs
MANUAL: dict[str, str] = {
    "Peacock": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Indian_Peafowl_Mating_display.jpg/1280px-Indian_Peafowl_Mating_display.jpg",
    "Northern Cardinal": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Cardinalis_cardinalis_male_CM.jpg/1280px-Cardinalis_cardinalis_male_CM.jpg",
    "Herring Gull": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Larus_argentatus_argyrogenis_MHNT.jpg/1280px-Larus_argentatus_argyrogenis_MHNT.jpg",
    "Atlas Moth": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Attacus_atlas_MHNT_CUT_2013_3_14.jpg/1280px-Attacus_atlas_MHNT_CUT_2013_3_14.jpg",
}

# Extra fallbacks if Commons search fails (scientificName -> URL)
FALLBACK_BY_SCI: dict[str, str] = {
    "Ornithorhynchus anatinus": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Platypus_in_creek.jpg/1280px-Platypus_in_creek.jpg",
    "Apteryx australis": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Apteryx_mantelli_-Kiwi_-Totara_Park.jpg/1280px-Apteryx_mantelli_-Kiwi_-Totara_Park.jpg",
}


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def commons_thumb(query: str) -> str | None:
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": "6",
        "gsrlimit": "8",
        "prop": "imageinfo",
        "iiprop": "url|mime",
        "iiurlwidth": "1280",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    try:
        data = fetch_json(url)
    except Exception as exc:  # noqa: BLE001
        print(f"  search failed for {query!r}: {exc}")
        return None

    pages = (data.get("query") or {}).get("pages") or {}
    for page in pages.values():
        infos = page.get("imageinfo") or []
        if not infos:
            continue
        info = infos[0]
        mime = (info.get("mime") or "").lower()
        if not mime.startswith("image/"):
            continue
        if "svg" in mime:
            continue
        thumb = info.get("thumburl") or info.get("url")
        if thumb:
            return thumb
    return None


def url_ok(url: str) -> bool:
    try:
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": UA, "Range": "bytes=0-1023"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            code = resp.status
            ctype = (resp.headers.get("Content-Type") or "").lower()
            return code < 400 and ("image" in ctype or "octet-stream" in ctype)
    except Exception:  # noqa: BLE001
        return False


def needs_fix(animal: dict) -> bool:
    url = animal.get("imageUrl") or ""
    name = animal.get("commonName") or ""
    if name in MANUAL:
        return True
    if "placehold.co" in url:
        return True
    return False


def main() -> None:
    animals = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    updated = 0
    failed: list[str] = []

    for animal in animals:
        if not needs_fix(animal):
            continue

        name = animal["commonName"]
        sci = animal.get("scientificName") or ""
        print(f"Fixing {name} ({sci})...")

        new_url = MANUAL.get(name)
        if new_url and not url_ok(new_url):
            print(f"  manual URL failed, searching Commons...")
            new_url = None

        if not new_url:
            new_url = commons_thumb(f'{sci} filetype:bitmap') or commons_thumb(sci)

        if not new_url:
            new_url = FALLBACK_BY_SCI.get(sci)

        if not new_url:
            # last try: common name
            new_url = commons_thumb(name)

        if not new_url:
            failed.append(name)
            print("  FAILED")
            continue

        if animal["imageUrl"] != new_url:
            animal["imageUrl"] = new_url
            updated += 1
            print(f"  -> {new_url[:100]}")
        else:
            print("  (unchanged)")

        time.sleep(0.35)

    DATA_PATH.write_text(json.dumps(animals, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\nUpdated {updated} animals. Failed: {failed or 'none'}")
    print(f"Remaining placeholders: {sum(1 for a in animals if 'placehold.co' in a.get('imageUrl', ''))}")


if __name__ == "__main__":
    main()
