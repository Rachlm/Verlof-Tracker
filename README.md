# Verlof-Tracker

Personal leave tracker (Verlof, ADV, TVT) — replaces the "Weekly agenda" Excel.
Single-file PWA, hosted on GitHub Pages. All data stays on the phone.

## Deploy
1. Create a public repo `Verlof-Tracker` and upload: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `README.md`.
2. Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
3. Open `https://rachlm.github.io/Verlof-Tracker/` on the phone → Share → Add to Home Screen.

## First run
Tap **Import backup file** and choose `leave-history.json`.
Do **not** put that file (or any exported backup) in this repo — the repo is public.

## How the balance works
- The last **BCS check** is the reference. BCS deducts days as soon as they are booked,
  so the app subtracts only what you planned *after* that check.
- On 1 January the yearly hours (Settings, default 216h Verlof + 104h ADV) are added.
- Do a BCS check now and then; a red value shows where app and BCS disagree.

## Rules built in
- Weekends never count. Holidays filled automatically: New Year, Easter Monday, King's Day,
  Ascension, Whit Monday, Christmas, Boxing Day (no Good Friday, no Liberation Day).
- Days before 1 Feb 2023 are not tracked.
- A day can be split, e.g. 4:00 Verlof + 4:00 TVT.
