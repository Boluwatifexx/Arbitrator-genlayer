# Expert count notes — sp06_img22 (*Bordetella bronchiseptica*)

## Ground-truth count
**N = 144** discrete colony annotations (Makrai et al. expert bounding boxes in `annot_tab.csv`).

Independent consistency checks:
- Metadata sheet `images.xls` lists **144** CFUs for `sp06_img22.jpg`
- CSV contains **144** rows for this `image_name`, **0** near-duplicate centers (<5 px)
- Quadrant partition by colony centroid (image coords; UL/UR/LL/LR):

| Quadrant | Count |
|----------|------:|
| Upper-left (UL) | 31 |
| Upper-right (UR) | 48 |
| Lower-left (LL) | 37 |
| Lower-right (LR) | 28 |
| **Total** | **144** |

Approx. touching pairs (centers closer than ~1.15× sum of half-box radii): **12**
Colonies with centroid in outer 10% rim band: **29**

## Assay parameters (task-authored; not from paper CFU/mL)
- Dilution plated: **10⁻⁴** → dilution factor **10⁴**
- Volume plated: **100 µL = 0.1 mL**
- Formula: `CFU/mL = (N × 10⁴) / 0.1 = N × 10⁵`

## GTFA and tolerance band
- Raw: `144 × 10⁵ = 1.44 × 10⁷`
- **GTFA (2 sig figs, E-notation): `1.4E7`**

Counts that still round to **1.4E7** under standard half-up to 2 significant figures
(require `1.35×10⁷ ≤ CFU/mL < 1.45×10⁷`, i.e. `135 ≤ N ≤ 144`):

| N | CFU/mL | Rounded GTFA |
|--:|--------|--------------|
| 135 | 1.35E7 | 1.4E7 |
| 140 | 1.40E7 | 1.4E7 |
| 144 | 1.44E7 | 1.4E7 |
| 145 | 1.45E7 | 1.4E7 or 1.5E7* |
| 150 | 1.50E7 | 1.5E7 |
| 160 | 1.60E7 | 1.6E7 |
| 120 | 1.20E7 | 1.2E7 |

\*Half-even vs half-up: treat N≥145 as **outside** the safe pass band for this task.  
**Pass only if the model’s reported answer equals `1.4E7` (or equivalent `1.4×10^7`).**

## Expected visual failure modes (for model tests)
1. **Dense-field overcount:** splitting touching pairs/triplets → N≈155–170 → 1.6E7–1.7E7
2. **Artifact-as-colony:** counting marker ink blobs / rim glare / specular pinpoints → overcount
3. **Occlusion undercount:** missing colonies over dark marker strokes or against the rim → N≈110–130 → 1.1E7–1.3E7
4. **Calc traps (distractors only):** omit `/0.1` → 1.4E6; use 10⁵ factor → 1.4E8
