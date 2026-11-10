# Expert count notes — sp14_img18 (*Listeria monocytogenes*) — Strategy B

## Strategy pivot
Strategy A scored the **full** expert colony set (**N = 172**) → GTFA `172, 1.7E7`. Dual Grok retest **FAILED FAILURE_BAR**: models correctly excluded the mid-right bubble/foam cluster but bare-undercounted colonies (`140` / `157`). Strategy B scores the **isolated-only** subset so that full-plate-like answers are **wrong isolation/merge binding** (interpretive), not bare undercount of the same target set.

**Why not Nbubble GTFA (directions 1/3):** the mid-right condensation cluster is real and has **0** expert CFU boxes, but discrete ring count is not clean for OPEN_ENDED GTFA — wall-sharing honeycomb cells, mixed micro-foam vs resolvable rings, descriptions ranging from “several” major rings to “dozens.” Isolation subset has annotation-backed integer GT.

## Full expert colony count (context; not Strategy B GTFA)
**N_all = 172** discrete colony annotations (Makrai et al. expert bounding boxes in `annot_tab.csv`).

| Check | Value |
|-------|------:|
| `images.xls` CFUs for `sp14_img18.jpg` | 172 |
| CSV rows for this `image_name` | 172 |
| UL / UR / LL / LR (centroid quadrants) | 35 / 37 / 55 / 45 |

**Bubble/foam cluster:** mid-right sector; **0** expert CFU boxes on the translucent ring objects (correct exclusion).

## Isolated-only ground truth (Strategy B scored count)
**Definition (matches prompt):** a colony is isolated iff its margin does not touch any other colony’s margin (no shared contact; no resolvable connecting waist). Members of touching pairs/chains/multi-lobed groups contribute **0**.

**Expert proxy from annotations:** approximate each colony as a circle with diameter = mean bbox side (`r = 0.25 × (bbox_w + bbox_h)`); mark contact when distance between centers ≤ `r₁ + r₂` (circle margins touch).

| Quantity | Value |
|----------|------:|
| Isolated colonies | **79** |
| Colonies in ≥1 contact | **93** |
| Total | **172** |

## Assay parameters (task-authored; not from paper CFU/mL)
- Dilution plated: **10⁻⁴** → dilution factor **10⁴**
- Volume plated: **100 µL = 0.1 mL**
- Formula (solver-supplied; **not** pasted in the prompt): `CFU/mL = (N × 10⁴) / 0.1 = N × 10⁵`

## GTFA (structured)
- Raw: `79 × 10⁵ = 7.9 × 10⁶`
- **GTFA:** **`79, 7.9E6`** (integer isolated colony count + two-sig-fig E-notation CFU/mL)

Pass only if the model’s reported structured answer equals **`79, 7.9E6`** (CFU letter-case / `×10^` equivalents OK; isolated count must be exactly **79**).

Illustrative wrong structured answers:

| N used | Meaning | Structured example |
|-------:|---------|--------------------|
| 172 | Full set; failed isolation filter | `172, 1.7E7` (fail) |
| 93 | Contact-involved only; inverted category | `93, 9.3E6` (fail) |
| 140 | Strategy A Grok 4.6-class full-plate undercount | `140, 1.4E7` (fail — wrong binding) |
| 157 | Strategy A Grok 4.7-class full-plate undercount | `157, 1.6E7` (fail — wrong binding) |
| 79 | Correct isolated | **`79, 7.9E6` (GTFA)** |

## Expected visual failure modes (for model tests)
1. **Wrong isolation binding (primary):** report full-plate-like N (`172` / `157` / `140`) instead of isolated **79**
2. **Artifact-as-colony:** count mid-right bubble/foam (or rim glare) as additional isolated CFU
3. **Inverted contact category:** report contact-involved **93** instead of isolated **79**
4. **Calc traps (distractors only):** omit `/0.1` → `79, 7.9E5`; use 10⁵ factor → `79, 7.9E7`

**FAILURE_BAR note:** Intended scored failures are (1)–(3) — image **misinterpretation** (wrong isolation/merge binding / wrong element identity). Strategy A’s bare undercount of the full 172 set is **not** the failure claim.
