# Design System Master File: Минутка (warm)

> **LOGIC:** When building a page, read this file first. If `design-system/minutka-warm/pages/<page>.md` exists, its rules override this file.

**Project:** Минутка, a small city hotel (10 rooms, Грозный)
**Source of truth:** the owner's 20 answers (below). The `ui-ux-pro-max` generator proposed a navy and gold "Liquid Glass" hotel look; the owner rejected it, so the generated file was replaced. Typography, palette family and checklists come from the skill's searches (`typography`, `google-fonts`, `color`, `ux`).

## Owner's decisions

| Topic | Decision |
|---|---|
| Mood | Light, warm, cozy; calm and minimal like Apple |
| Colour | Warm palette; light and dark theme with a visitor toggle |
| Shape | Strongly rounded corners (cards, buttons, photos) |
| Type | Rounded, friendly sans (Nunito) |
| First screen | Full-screen photograph, floating pill navigation |
| Booking | One button opens a dialog; on phones the button is always visible (sticky bar) |
| Rooms | Grid of cards |
| Sections | Rooms, services, about, photo gallery, FAQ, contacts |
| Photos | In neat rounded frames |
| Motion | Lively: reveal on scroll, soft parallax, hover lifts; always off under reduced motion |
| Tone | Warm, homely |
| Contacts | Phone and address, map, WhatsApp and Telegram, feedback form; footer leads with the contacts |
| Audience | Business travellers (Wi-Fi, location, front desk first) |
| Languages | Russian, English, Chechen (Chechen texts are not written yet, its switch stays hidden until they exist) |
| Data | Demonstration data until the owner supplies the real texts |

## Tokens

Light / dark pairs are in `styles.css` (`:root` and `[data-theme="dark"]`). Contrast was checked: every text pair is 5:1 or better.

| Role | Light | Dark |
|---|---|---|
| Background | `#FFF8EE` | `#1B1410` |
| Background 2 | `#F6EAD8` | `#241B15` |
| Surface | `#FFFFFF` | `#2B211A` |
| Ink | `#2B1F16` | `#FBEEDD` |
| Muted | `#6A584A` | `#C9B5A2` |
| Accent (buttons, links) | `#B04A1B` | `#F09660` |
| Text on accent | `#FFFFFF` | `#2A150A` |
| Honey (highlights) | `#E9A93A` | `#F0B552` |
| Sage (success) | `#4C7A56` | `#8FC49A` |
| Line | `#E7D6BF` | `#3B2E25` |

- Radii: 16 / 24 / 32 / 44 and pill. Shadows are soft and warm (brown, never grey).
- Font: Nunito 400 to 800, self-hosted (`fonts/nunito-*.woff2`), Cyrillic and Latin.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

## Motion

- Reveal on scroll: 450 ms, 16 px rise, 60 ms stagger; the hero image drifts slowly on scroll.
- Hover: lift 4 px, photo zoom 1.04 inside its frame. Transform and opacity only.
- `prefers-reduced-motion: reduce` turns all of it off; content is visible without scripting.

## Rules from the skill's checklist

- Icons are one SVG set (Lucide style), never emoji. Every clickable element has `cursor: pointer` and a visible focus ring.
- Text contrast 4.5:1 or better in both themes. Touch targets 44 px or more.
- Responsive at 375, 768, 1024, 1440; no horizontal scroll; nothing hidden behind the fixed navigation.
- Nothing invented: no reviews, no metrics, no claims the owner did not give. A form that is not wired says so instead of printing a success.
