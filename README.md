# Otterly Clean! — A charity:water Awareness Game

A casual web-based clicker game where you play as a tank keeper at an aquarium, responsible for keeping Otto the sea otter healthy and happy by maintaining the cleanliness of his water enclosure. Built as a charity:water campus awareness prototype.

---

## Screens

### Start Screen
- charity:water horizontal logo badge
- "Otterly Clean!" title with "Keep Otto's Water Clean" subtitle
- Animated Otto hero image (gentle floating bounce)
- Full-width **Start Shift** button
- Reward hint: *"Earn points to unlock campus rewards"*

### Gameplay Screen
- **Top bar** — countdown timer (left), weather indicator (center), live score counter (right); all three columns align to the same width as the left panel below for visual continuity
- **Left panel** — Otto's sprite in a rounded-square container, speech bubble, medicine count (pill icon), trash collected count (can icon)
- **Play area** — split into an upper air zone and a lower pool zone separated by an animated organic water-surface wave
- **Bottom bar** — "Water Cleanliness" label with live percentage (left/right aligned), and a full-width row of 10 jerry can icons below

### Score Screen
- "Shift Complete!" heading with a randomly selected end-of-shift message
- Otto's status message reflecting how he felt during the shift
- Score summary box: water cleanliness tier, trash removed, water quality points, trash bonus, session total, lifetime points
- **Start Another Shift** button

---

## Game Logic

### Timer
- 1-minute countdown displayed as `MM:SS`
- When it reaches `00:00` the shift ends and the score screen appears

### Scoring
- **+10 points** for every trash item clicked
- **Water quality points** at end of shift: 500 / 250 / 100 / 0 based on cleanliness tier
- **Trash bonus** at end of shift: +50 / +150 / +300 / +500 based on pieces removed
- Maximum of **1,000 points** per perfect shift

### Water Cleanliness & Otto's Health
Each cleanliness tier changes the pool color, Otto's sprite, and triggers a random speech bubble:

| Cleanliness | Pool Color | Otto Sprite | Mood |
|---|---|---|---|
| 80–100% | Blue gradient | `otter_v1.png` | Happy, floating on back |
| 50–79% | Light green gradient | `otter_v2.png` | Tired, uneasy |
| 20–49% | Dark green gradient | `otter_v3.png` | Sick — ⚠ warning banner flashes |
| Below 20% | Brown gradient | `otter_v4.png` | Critical — rescue team called |

All pool colors use a top-to-bottom gradient (lighter near the surface, deeper at the bottom).

### Win / Lose Messages
- 5 win messages (cleanliness ≥ 80%) randomly selected at shift end
- 5 lose messages (cleanliness < 80%) randomly selected at shift end

---

## Visual Design

### Brand Palette
| Token | Hex |
|---|---|
| Yellow | `#FFC907` |
| Navy | `#003366` |
| Black | `#1A1A1A` |
| Steel Blue | `#77A8BB` |
| Cream | `#FFF7E1` |
| Rust | `#BF6C46` |
| Gray | `#CBCCD1` |

- **Fonts:** Avenir, Proxima Nova, Arial (fallback)
- **Body background:** `#1A1A1A` (dark) with a warm yellow glow behind each card
- **Game card:** max-width 760px, height `calc(100vh - 48px)`, max-height 780px, `border-radius: 28px`

### Play Area Details
- **Water surface** — animated SVG wave using `::after` on the pool zone; the cream air-zone color flows into a wavy edge above the navy pool
- **Pool gradient** — `#2E9DF7` (surface) → `#003366` (deep)
- **Sea vegetation** — `veg1.png` anchored to the left corner, `veg2.png` and `veg3.png` clustered in the right corner, all growing from the pool floor
- **Trash items** — `bag.png`, `bottle.png`, `can.png` float with a bob animation; clicking removes them

### Responsive Layout
- **≥ 541px** — Otto panel on the left, play area on the right (side by side)
- **≤ 540px** — layout reflows to: top bar → full-width play area → horizontal Otto strip (sprite + speech bubble + counts) → cleanliness bar. Pool objects and vegetation scale down proportionally.

---

## File Structure

```
charity-water-game-prototype/
├── index.html       — All three screens (start, game, score)
├── style.css        — Full styling including responsive media query
├── script.js        — Game state, timer, scoring, Otto state logic
└── img/
    ├── otter_v1.png – otter_v4.png   Otto sprites (happy → critical)
    ├── otter_ic.png                  Otto icon (start/score screens)
    ├── bag.png                       Trash — plastic bag
    ├── bottle.png                    Trash — water bottle
    ├── can.png                       Trash — crushed can
    ├── veg1.png – veg3.png           Sea vegetation
    ├── pill.png                      Medicine counter icon
    ├── water-can.png                 Jerry can (cleanliness bar)
    ├── cw_logo.png                   charity:water square logo
    └── cw_logo_horizontal.png        charity:water horizontal logo
```

---

## Try The Game!

https://quynhtruong1303.github.io/charity-water-game-prototype/

