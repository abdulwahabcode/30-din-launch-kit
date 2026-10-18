#!/usr/bin/env python3
"""Generate access codes for 30-Din Business Launch Kit.

Usage:
    python3 tools/generate-codes.py [count] [plain_output]

- Creates `count` unique codes like LDK-7X4K-9Q2M (default 100).
- Writes data/codes.json with SHA-256 hashes (this file IS pushed to the site).
- Writes plain codes to plain_output (default: codes-plain.txt) — KEEP PRIVATE,
  never push to GitHub. Send one code per buyer on WhatsApp.

To add more codes later: run again with --append to ADD to existing codes.json
instead of replacing it.
"""
import hashlib, json, os, secrets, sys

ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"  # no I, L, O, 0, 1 (confusing)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CODES_JSON = os.path.join(BASE, "data", "codes.json")

def make_code():
    return "LDK-" + "-".join("".join(secrets.choice(ALPHABET) for _ in range(4)) for _ in range(2))

def norm(code):
    return "".join(c for c in code.upper() if c.isalnum())

def sha(code):
    return hashlib.sha256(norm(code).encode()).hexdigest()

def main():
    count = 100
    plain_out = os.path.join(BASE, "codes-plain.txt")
    append = False
    for a in sys.argv[1:]:
        if a == "--append":
            append = True
        elif a.isdigit():
            count = int(a)
        else:
            plain_out = a

    existing = set()
    if append and os.path.exists(CODES_JSON):
        existing = set(json.load(open(CODES_JSON, encoding="utf-8")).get("hashes", []))

    codes, hashes = [], list(existing)
    seen = set(hashes)
    while len(codes) < count:
        c = make_code()
        h = sha(c)
        if h in seen:
            continue
        seen.add(h)
        codes.append(c)
        hashes.append(h)

    os.makedirs(os.path.dirname(CODES_JSON), exist_ok=True)
    json.dump({"version": 1, "hashes": hashes}, open(CODES_JSON, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    mode = "a" if append else "w"
    with open(plain_out, mode, encoding="utf-8") as f:
        for c in codes:
            f.write(c + "\n")

    print(f"Done: {len(codes)} new codes ({len(hashes)} total in codes.json)")
    print(f"Plain codes -> {plain_out}  (KEEP PRIVATE, never push to GitHub)")
    print(f"Hashed file -> {CODES_JSON}  (push this to the site)")

if __name__ == "__main__":
    main()
