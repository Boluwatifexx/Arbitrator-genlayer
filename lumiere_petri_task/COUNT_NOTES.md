# Expert count notes — sp14_img18 (*Listeria monocytogenes*)

## Ground-truth count
**N = 172** discrete colony annotations (Makrai et al. expert bounding boxes in `annot_tab.csv`).

Independent consistency checks:
- Metadata sheet `images.xls` lists **172** CFUs for `sp14_img18.jpg`
- CSV contains **172** rows for this `image_name`
- Quadrant partition by colony centroid (image coords; UL/UR/LL/LR):

| Quadrant | Count |
|----------|------:|
| Upper-left (UL) | 35 |
| Upper-right (UR) | 37 |
| Lower-left (LL) | 55 |
| Lower-right (LR) | 45 |
| **Total** | **172** |

Approx. touching pairs (bbox-circle proximity): on the order of **~50–95** depending on radius scale — dense contact structure, especially lower field.
Colonies with centroid in outer 10% rim band: **~22**
**Bubble/foam cluster:** mid-right sector; **0** expert CFU boxes on the translucent ring objects (correct exclusion).

## Assay parameters (task-authored; not from paper CFU/mL)
- Dilution plated: **10⁻⁴** → dilution factor **10⁴**
- Volume plated: **100 µL = 0.1 mL**
- Formula (solver-supplied; **not** pasted in the prompt): `CFU/mL = (N × 10⁴) / 0.1 = N × 10⁵`

## GTFA (structured)
- Raw: `172 × 10⁵ = 1.72 × 10⁷`
- **GTFA:** **`172, 1.7E7`** (integer colony count + two-sig-fig E-notation CFU/mL)

Pass only if the model’s reported structured answer equals **`172, 1.7E7`** (CFU letter-case / `×10^` equivalents OK; colony count must be exactly **172**).

Illustrative CFU rounding for wrong counts (not pass criteria under structured GTFA):

| N | CFU/mL | Rounded CFU | Structured example |
|--:|--------|-------------|--------------------|
| 155 | 1.55E7 | 1.6E7 | `155, 1.6E7` (fail) |
| 172 | 1.72E7 | 1.7E7 | **`172, 1.7E7` (GTFA)** |
| 185 | 1.85E7 | 1.9E7 | `185, 1.9E7` (fail — bubble artifact bind) |
| 205 | 2.05E7 | 2.1E7 | `205, 2.1E7` (fail — merge over-split) |

## Expected visual failure modes (for model tests)
1. **Artifact-as-colony (primary):** counting mid-right condensation bubble/foam cluster → N≈180–195 → e.g. `185, 1.9E7`
2. **Wrong merge binding:** over-segmenting multi-lobed lower-field clusters → N≈200+ → e.g. `205, 2.1E7`
3. **Rim-glare false positives:** specular pinpoints counted as rim CFU
4. **Calc traps (distractors only):** omit `/0.1` → `172, 1.7E6`; use 10⁵ factor → `172, 1.7E8`

**FAILURE_BAR note:** Intended scored failures are (1)–(3) — image **misinterpretation** (wrong element identity / wrong merge binding). Bare undercount without those interpretive errors is **not** the failure claim (that was why Bordetella `sp06_img22` was rejected).
