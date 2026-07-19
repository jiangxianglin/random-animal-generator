"""Unify animal images to iNaturalist wild field photos (research-grade preferred)."""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[1] / "lib" / "animals-data.json"
UA = "RandomAnimalGenerator/1.0 (https://www.randomanimalgenerator.online; image-unify)"


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def to_large(url: str | None) -> str | None:
    if not url:
        return None
    # iNaturalist size variants
    for size in ("square", "small", "medium", "thumb"):
        if f"/{size}." in url:
            return url.replace(f"/{size}.", "/large.")
    return url


def observation_photo(scientific_name: str) -> str | None:
    params = {
        "taxon_name": scientific_name,
        "photos": "true",
        "quality_grade": "research",
        "per_page": "5",
        "order_by": "votes",
        "order": "desc",
    }
    url = "https://api.inaturalist.org/v1/observations?" + urllib.parse.urlencode(params)
    try:
        data = fetch_json(url)
    except Exception:  # noqa: BLE001
        return None

    for obs in data.get("results") or []:
        photos = obs.get("photos") or []
        for photo in photos:
            candidate = to_large(photo.get("url") or photo.get("large_url") or photo.get("medium_url"))
            if candidate and "inaturalist" in candidate:
                return candidate
    return None


def taxon_photo(scientific_name: str) -> str | None:
    params = {"q": scientific_name, "rank": "species,genus,family", "per_page": "8"}
    url = "https://api.inaturalist.org/v1/taxa?" + urllib.parse.urlencode(params)
    try:
        data = fetch_json(url)
    except Exception:  # noqa: BLE001
        return None

    results = data.get("results") or []
    sci_lower = scientific_name.lower()

    # Prefer exact scientific name match
    ordered = sorted(
        results,
        key=lambda t: (
            0 if (t.get("name") or "").lower() == sci_lower else 1,
            0 if t.get("default_photo") else 1,
        ),
    )

    for taxon in ordered:
        photo = taxon.get("default_photo") or {}
        candidate = to_large(photo.get("medium_url") or photo.get("url") or photo.get("square_url"))
        if candidate and "inaturalist" in candidate:
            return candidate
    return None


def resolve_photo(animal: dict) -> str | None:
    sci = (animal.get("scientificName") or "").strip()
    common = (animal.get("commonName") or "").strip()

    photo = observation_photo(sci) if sci else None
    if photo:
        return photo

    time.sleep(0.25)
    photo = taxon_photo(sci) if sci else None
    if photo:
        return photo

    if common:
        time.sleep(0.25)
        photo = observation_photo(common) or taxon_photo(common)
        if photo:
            return photo

    return None


def main() -> None:
    animals = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    updated = 0
    failed: list[str] = []

    for index, animal in enumerate(animals, start=1):
        name = animal["commonName"]
        print(f"[{index}/{len(animals)}] {name}...", end=" ", flush=True)
        try:
            photo = resolve_photo(animal)
        except urllib.error.HTTPError as exc:
            print(f"HTTP {exc.code}")
            failed.append(name)
            time.sleep(1.5)
            continue
        except Exception as exc:  # noqa: BLE001
            print(f"ERR {exc}")
            failed.append(name)
            time.sleep(1.0)
            continue

        if not photo:
            print("FAILED")
            failed.append(name)
        else:
            if animal.get("imageUrl") != photo:
                animal["imageUrl"] = photo
                updated += 1
            print(photo.split("/")[-2] if "/photos/" in photo else photo[:60])

        time.sleep(0.45)

    DATA_PATH.write_text(json.dumps(animals, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    inat = sum(1 for a in animals if "inaturalist" in (a.get("imageUrl") or ""))
    print(f"\nUpdated {updated}. iNaturalist coverage {inat}/{len(animals)}.")
    print(f"Failed ({len(failed)}): {failed or 'none'}")


if __name__ == "__main__":
    main()
