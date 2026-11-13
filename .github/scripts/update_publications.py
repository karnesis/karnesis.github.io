#!/usr/bin/env python3
"""Regenerate _data/citations.csv from the INSPIRE-HEP API.

The output keeps the Google Scholar CSV layout that _includes/publications
expects: Authors,Title,Publication,Volume,Number,Pages,Year,Publisher, with
authors as "Last, First; " (first 10 only, trailing "; " always present).

Usage: python3 update_publications.py [output.csv]
"""
import csv
import html
import json
import re
import sys
import time
import urllib.request

AUTHOR_RECID = 1905896  # https://inspirehep.net/authors/1905896
MAX_AUTHORS = 10
API = "https://inspirehep.net/api"
FIELDS = ",".join([
    "titles", "authors.full_name", "publication_info", "arxiv_eprints",
    "earliest_date", "document_type", "control_number",
])
HEADER = ["Authors", "Title", "Publication", "Volume", "Number", "Pages", "Year", "Publisher"]


def get_json(url, retries=3):
    req = urllib.request.Request(url, headers={"Accept": "application/json",
                                               "User-Agent": "karnesis.github.io publications updater"})
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(5 * (attempt + 1))


def fetch_records():
    records, page = [], 1
    while True:
        url = (f"{API}/literature?q=authors.recid:{AUTHOR_RECID}"
               f"&size=250&page={page}&sort=mostrecent&fields={FIELDS}")
        data = get_json(url)["hits"]
        records += [h["metadata"] for h in data["hits"]]
        if len(records) >= data["total"] or not data["hits"]:
            return records
        page += 1


_journals = {}


def journal_info(ref):
    """Return (full title, publisher) for an INSPIRE journal $ref, cached."""
    if ref not in _journals:
        try:
            m = get_json(ref + "?fields=journal_title,short_title,publisher")["metadata"]
            title = m.get("journal_title", {}).get("title") or m.get("short_title", "")
            publisher = (m.get("publisher") or [""])[0]
        except Exception:
            title, publisher = "", ""
        _journals[ref] = (title, publisher)
    return _journals[ref]


def clean_title(t):
    t = re.sub(r"<[^>]+>", "", t)          # MathML / HTML tags
    t = html.unescape(t).replace("$", "")
    return re.sub(r"\s+", " ", t).strip()


def to_row(m):
    authors = [a["full_name"] for a in m.get("authors", [])[:MAX_AUTHORS]]
    authors_field = "".join(f"{a}; " for a in authors)

    pubs = [p for p in m.get("publication_info", []) if p.get("material") != "erratum"]
    journal = next((p for p in pubs if p.get("journal_title")), None)
    arxiv = (m.get("arxiv_eprints") or [{}])[0].get("value")

    publication = volume = number = pages = publisher = ""
    year = ""
    if journal:
        ref = journal.get("journal_record", {}).get("$ref")
        full, publisher = journal_info(ref) if ref else ("", "")
        publication = full or journal["journal_title"]
        volume = journal.get("journal_volume", "")
        number = journal.get("journal_issue", "")
        if journal.get("artid"):
            pages = journal["artid"]
        elif journal.get("page_start"):
            pages = journal["page_start"] + (f"-{journal['page_end']}" if journal.get("page_end") else "")
        year = str(journal.get("year", ""))
    elif arxiv:
        publication = f"arXiv preprint arXiv:{arxiv}"
    elif "thesis" in m.get("document_type", []):
        publication = "PhD thesis"

    if not year:
        year = next((str(p["year"]) for p in pubs if p.get("year")), "") or m.get("earliest_date", "")[:4]

    return {
        "Authors": authors_field,
        "Title": clean_title(m["titles"][0]["title"]),
        "Publication": publication,
        "Volume": volume,
        "Number": number,
        "Pages": pages,
        "Year": year,
        "Publisher": publisher,
        "_date": m.get("earliest_date", year),
    }


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "_data/citations.csv"
    records = fetch_records()
    if len(records) < 10:  # guard against a broken/empty API response wiping the list
        sys.exit(f"Only {len(records)} records returned; refusing to overwrite {out}")
    rows = sorted((to_row(m) for m in records), key=lambda r: (r["Year"], r["_date"]), reverse=True)
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=HEADER, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"Wrote {len(rows)} publications to {out}")


if __name__ == "__main__":
    main()
