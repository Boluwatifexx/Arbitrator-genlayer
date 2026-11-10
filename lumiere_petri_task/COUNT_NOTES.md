# Expert count notes — sp14_img18 (*Listeria monocytogenes*) — Strategy B

## Strategy pivot
Strategy A scored the **full** expert colony set (**N = 172**) → GTFA `172, 1.7E7`. Dual Grok retest **FAILED FAILURE_BAR**: models correctly excluded the mid-right bubble/foam cluster but bare-undercounted colonies (`140` / `157`).

Strategy B scores a **three-field** answer forcing identity + isolation:
**GTFA `11, 79, 7.9E6`** = (Nbubble, N_isolated, CFU from isolated).

## Bubble/foam artifacts (Nbubble = 11)
**Location:** mid-right compact translucent-ring / condensation-bubble/foam cluster.

**Counting rule (matches prompt):**
- Count each resolvable closed translucent ring with a non-opaque center (agar visible through the interior)
- Touching / wall-sharing rings with distinct centers count separately
- Do **not** count: opaque colonies abutting the cluster (two green-boxed colonies sit immediately to the right in the annotation overlay); rim glare; scratches; debris; unresolved foam grain finer than a closed outline

**Expert rationale:**
- Makrai `annot_tab.csv` / `images.xls`: **0** CFU boxes on the translucent ring objects (correct non-colony class)
- Visual expert enumeration of resolvable closed rings in the mid-right cluster at task-image resolution → **11** discrete bubble/foam artifacts
- Two opaque colonies abut the cluster’s right margin and are **not** included in Nbubble

## Full expert colony count (context; not the Strategy B colony field)
**N_all = 172** (CSV rows / `images.xls` / UL35+UR37+LL55+LR45).

## Isolated-only ground truth (N_isolated = 79)
**Definition (matches prompt):** colony is isolated iff its margin does not touch any other colony’s margin. Members of touching pairs/chains/multi-lobed groups contribute **0**.

**Expert proxy from annotations:** circle with diameter = mean bbox side (`r = 0.25 × (bbox_w + bbox_h)`); contact when distance between centers ≤ `r₁ + r₂`.

| Quantity | Value |
|----------|------:|
| Isolated colonies | **79** |
| Colonies in ≥1 contact | **93** |
| Total | **172** |

## Assay parameters (task-authored)
- Dilution plated: **10⁻⁴** → factor **10⁴**
- Volume plated: **100 µL = 0.1 mL**
- Formula (not pasted in prompt): `CFU/mL = (N_isolated × 10⁴) / 0.1 = N_isolated × 10⁵`

## GTFA
- `79 × 10⁵ = 7.9 × 10⁶`
- **GTFA:** **`11, 79, 7.9E6`**

## Expected failure modes
1. **Wrong Nbubble (identity / foam binding):** `0` (missed artifact class), `1` (whole patch as one), inflated (include abutting colonies / micro-grain)
2. **Wrong isolation binding:** second field `172` / `157` / `140` (full-plate / Strategy A answers)
3. **Calc trap (distractor only):** `11, 79, 7.9E5`

**FAILURE_BAR note:** Intended failures are (1)–(2) — image misinterpretation. Strategy A bare undercount of the full 172 set is no longer the scored claim.
