# Project Assets Checklist

Track approved final assets for the Featured Products section.

## App Icons

- [ ] DayPilot approved app icon — **placeholder generated**
- [x] Bookmarked approved app icon
- [x] Gridlock approved app icon
- [x] Shuchu approved app icon
- [x] Avryo approved app icon

## DayPilot Screenshots

- [ ] DayPilot calendar dashboard screenshot (production)
- [ ] DayPilot team scheduling screenshot (production)
- [ ] DayPilot AI assistant screenshot (production)
- [ ] DayPilot workflow automation screenshot (production)

## Bookmarked Screenshots

- [ ] Bookmarked dashboard screenshot (production) — **blocked: simulator build error (`PlatformConstants` not found)**
- [ ] Bookmarked book-details screenshot (production)
- [ ] Bookmarked book club / community screenshot (production)
- [ ] Bookmarked events / messaging screenshot (production)

## Gridlock Screenshots

- [ ] Gridlock inventory screenshot (production) — **blocked: simulator build error (`PlatformConstants` not found)**
- [ ] Gridlock record-details screenshot (production)
- [ ] Gridlock loadout organizer screenshot (production)
- [ ] Gridlock bill-of-sale preview screenshot (production)

## Shuchu Screenshots

- [x] Shuchu login / onboarding screenshot (production) — `screenshot-01` captured from iOS simulator
- [ ] Shuchu Today dashboard screenshot (production)
- [ ] Shuchu goals screenshot (production)
- [ ] Shuchu task details screenshot (production)
- [ ] Shuchu progress / insights screenshot (production)

## Avryo Screenshots

- [x] Avryo net-worth dashboard screenshot (production) — `screenshot-01` captured from iOS simulator
- [ ] Avryo account overview screenshot (production)
- [ ] Avryo spending breakdown screenshot (production)
- [ ] Avryo AI insights screenshot (production)

## Notes

- DayPilot icon and screenshots are **Concept UI** placeholders until production assets are captured from https://www.daypilot.co.
- `screenshot-02` through `screenshot-04` for Shuchu and Avryo remain **Concept UI** placeholders until additional simulator screens are captured.
- Bookmarked and Gridlock simulator builds currently crash on launch with a React Native `PlatformConstants` TurboModule error — placeholders retained.
- Capture script: `scripts/process-simulator-screenshots.mjs` (processes raw PNGs from `tmp-screenshots/`).
- Do not display sensitive serial numbers, private owner information, or real financial account data in public screenshots.
