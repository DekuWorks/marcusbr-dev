# Project Assets Checklist

Track approved final assets for the Featured Products section.

## App Icons

- [x] Bookmarked approved app icon
- [x] Gridlock approved app icon
- [x] Shuchu approved app icon
- [x] Avryo approved app icon

## Bookmarked Screenshots

- [ ] Bookmarked dashboard screenshot (production) — **blocked: missing `babel-preset-expo` in mobile app; Metro bundle fails**
- [ ] Bookmarked book-details screenshot (production)
- [ ] Bookmarked book club / community screenshot (production)
- [ ] Bookmarked events / messaging screenshot (production)

## Gridlock Screenshots

- [x] Gridlock sign-in screenshot (production) — `screenshot-01` captured from iOS simulator
- [x] Gridlock welcome landing screenshot (production) — `screenshot-02` captured from iOS simulator
- [ ] Gridlock inventory dashboard screenshot (production) — **blocked: requires authenticated session**
- [ ] Gridlock loadout organizer screenshot (production) — concept placeholder retained
- [ ] Gridlock bill-of-sale preview screenshot (production) — concept placeholder retained

## Shuchu Screenshots

- [x] Shuchu Today home dashboard screenshot (production) — `screenshot-01`
- [x] Shuchu focus session hub screenshot (production) — `screenshot-02`
- [x] Shuchu tasks list screenshot (production) — `screenshot-03`
- [x] Shuchu insights screen screenshot (production) — `screenshot-04`

## Avryo Screenshots

- [x] Avryo net-worth dashboard screenshot (production) — `screenshot-01`
- [x] Avryo Hub accounts screen screenshot (production) — `screenshot-02`
- [x] Avryo activity transactions screenshot (production) — `screenshot-03`
- [x] Avryo AI assistant screenshot (production) — `screenshot-04`

## Notes

- Shuchu and Avryo now use four production simulator captures each (`conceptUI: false`).
- Gridlock has two production auth/onboarding screens; `screenshot-03` and `screenshot-04` remain concept UI until login credentials are available for simulator capture.
- Bookmarked mobile simulator builds fail on Metro (`babel-preset-expo` missing); concept placeholders retained.
- Capture script: `scripts/process-simulator-screenshots.mjs` (processes raw PNGs from `tmp-screenshots/`).
- Do not display sensitive serial numbers, private owner information, or real financial account data in public screenshots.
