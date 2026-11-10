# Project Lumière — Petri Dishes & Culture Plates (Microbiology)

Paste-ready task package for Lumiere / Project Lumière.

**Strategy:** **B** — pivoted from Strategy A on the same *Listeria monocytogenes* `sp14_img18` plate. Strategy A (`172, 1.7E7` all-colony tally) failed FAILURE_BAR: Grok 4.6/`140, 1.4E7` and Grok 4.7/`157, 1.6E7` correctly excluded the mid-right bubble/foam cluster but bare-undercounted true colonies (same FAILURE_BAR_NOT_MET pattern as Bordetella). Strategy B redesigns the **question** into a **two-category identity + isolated-subset** structured answer so scored failure is **wrong artifact identity / wrong bubble binding** and/or **wrong isolation/merge binding**, not bare undercount of the full correctly recognized set. **Not** `sp10_img14` / 2.8E7.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| **Assay type** | Petri Dishes & Culture Plates (Microbiology) |
| **Image file** | `plate_image.jpg` (also `sp14_img18_listeria_plate.jpg`) |
| **Artifact copy** | `/opt/cursor/artifacts/sp14_img18_listeria_plate.jpg` |
| **Dataset image ID** | `sp14_img18.jpg` (*Listeria monocytogenes*; **not** `sp10_img14`, **not** `sp06_img22`) |
| **Dataset title** | Annotated dataset for deep-learning-based bacterial colony detection |
| **Dataset DOI** | https://doi.org/10.6084/m9.figshare.22022540.v3 |
| **Paper** | Makrai et al., *Scientific Data* (2023) https://doi.org/10.1038/s41597-023-02404-8 |
| **Dataset license** | **CC BY 4.0** (verified via Figshare article API `license.name`) |
| **Paper license** | CC BY 4.0 (Open Access) |
| **Image type** | Real laboratory photograph of an incubated blood agar plate |
| **Long edge** | 2000 px (resized from 2480×2487; JPEG; ~853 KB) |
| **Annotations on task image** | None (raw plate photo only) |
| **Preprints / NC / ND / paywall** | None — peer-reviewed OA + CC BY dataset |

See also: `PROVENANCE.md`, `COUNT_NOTES.md`.

---

## 2. Prompt (≤2000 characters)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Listeria monocytogenes suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. In the mid-right agar field, count the discrete condensation-bubble/foam artifacts that form the compact translucent-ring cluster. Count each resolvable closed translucent ring with a non-opaque center (agar visible through the interior) as one artifact. When rings touch or share a wall, count them as separate artifacts if distinct ring centers are resolvable. Do not count opaque colonies that abut this cluster, rim glare on the plastic wall, scratches, debris, or unresolved foam grain finer than a closed outline.
2. Separately, identify candidate colonies whose centers lie on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). Exclude all non-colony artifacts from step 1 and other condensation bubbles/foam, optical reflections/rim glare, scratches, and debris. From those candidates, count ONLY isolated colonies: a colony contributes iff its margin does not touch any other colony's margin (no shared contact point; no resolvable connecting waist/notch). Colonies in a touching pair, chain, or multi-lobed contact group are excluded entirely (count none of their members). Fully fused single-center masses with no resolvable waist contribute 0 to the isolated tally.
3. From the isolated colony count only, compute the viable count (CFU/mL) of the original undiluted culture. Round CFU/mL to two significant figures in E-notation.

Final answer format (exactly): <integer bubble/foam count>, <integer isolated colony count>, <CFU/mL in E-notation>
Example style (not the answer): 9, 120, 1.2E7
```

**Character count:** 1868 (under 2000).

**Design notes:** Forced **two-category identity** (Nbubble) + **isolated-subset** colony tally + CFU from isolated count only. Organism/medium/dilution/volume factual; no colony-appearance color cues; no pasted CFU formula. Bubble rules require classifying the mid-right translucent-ring cluster as non-colony and enumerating resolvable rings. Isolation rules force contact/merge binding. No explicit MC; implied answer space ≫10.

---

## 3. GTFA (Ground-Truth Final Answer)

**`11, 79, 7.9E6`**

Accepted equivalents only if all three fields are preserved:
- Bubble/foam count must be the integer **`11`**
- Isolated colony count must be the integer **`79`**
- CFU/mL may normalize as `7.9E6`, `7.9e6`, `7.9×10^6`, or `7.9 x 10^6` → treat as `7.9E6`
- Separators: comma+space preferred; comma without space acceptable if all three fields parse unambiguously

---

## 4. Answer format

- Short structured text: **`<Nbubble>, <N_isolated>, <CFU/mL in E-notation with two significant figures>`**
- Example style in the prompt (fake, not GTFA): `9, 120, 1.2E7`
- Case-insensitive for the E-notation letter (`E` / `e`)
- No units string required in the scored answer
- No multi-sentence explanation in the scored field

---

## 5. Golden solution

1. **Mid-right bubble/foam identity tally.** Locate the compact translucent-ring condensation-bubble/foam cluster in the mid-right agar field. Count each resolvable closed translucent ring with a non-opaque center (agar visible through the interior). Touching/wall-sharing rings with distinct centers count separately. Do **not** count the two opaque colonies that abut the cluster’s right edge, rim glare, scratches, debris, or unresolved foam grain. Expert visual enumeration of resolvable closed rings → **Nbubble = 11**. (0 expert CFU boxes fall on these translucent objects.)
2. **Candidate colonies + artifact exclusion.** Identify colonies with centers on/inside agar (including rim-adjacent when center is on agar). Exclude all bubble/foam artifacts from step 1 and other non-colony artifacts.
3. **Isolated-only filter.** Keep a colony only if its margin does not touch any other colony. Members of touching pairs/chains/multi-lobed groups contribute 0. Fully fused single-center masses contribute 0.
4. **Expert isolated count.** From Makrai annotations (172 boxes): circle proxy with diameter = mean bbox side; contact when centers are within r₁+r₂ → **N_isolated = 79** (93 colonies participate in ≥1 contact). Full quadrant context UL 35 + UR 37 + LL 55 + LR 45 = 172 is background only.
5. **CFU/mL from isolated count only.** With 100 µL (= 0.1 mL) of the 10⁻⁴ dilution: `CFU/mL = (79 × 10⁴) / 0.1 = 7.9 × 10⁶` → two sig figs `7.9E6`.
6. **Structured report:** **`11, 79, 7.9E6`**.

---

## 6. References

1. Makrai, L. et al. Annotated dataset for deep-learning-based bacterial colony detection. *Scientific Data* **10**, 448 (2023). https://doi.org/10.1038/s41597-023-02404-8
2. Makrai, L. et al. Dataset on Figshare (CC BY 4.0). https://doi.org/10.6084/m9.figshare.22022540.v3
3. Standard plate-count relation (solver-supplied; not pasted in the prompt): `CFU/mL = (colonies × dilution factor) / volume plated (mL)`.

---

## 7. Image description (≥200 words; descriptive, non-spoilers)

```
The image is a top-down color laboratory photograph of a single circular plastic Petri dish resting on a dark, matte surface. The dish nearly fills the frame; no scale bar, printed ruler, UI chrome, or secondary dishes appear. Overhead lighting illuminates the plate with mild left–right unevenness: the left half of the agar sits under a soft darker shadow, while the right half is brighter and more translucent. Specular highlights run along the clear plastic rim, with elongated bright arcs especially along the right and upper-right inner wall, plus small glints on raised colony surfaces.

The culture medium is an opaque to semi-opaque reddish-brown blood agar forming a moist, slightly reflective plane. Surface texture includes faint inoculation streaks and soft tonal gradients that do not themselves look like discrete raised colonies. Along portions of the agar–plastic junction, minute trapped features and rim meniscus glints are visible.

Many small microbial colonies appear as opaque cream to off-white, roughly circular, convex raised dots scattered across all quadrants. Sizes are broadly similar, with a minority of slightly smaller pinpoints. Distribution is uneven: denser clustering occurs toward the lower-left and lower-central regions, with several close pairs and short multi-lobed groupings where neighboring colonies touch or nearly touch; the upper field is comparatively more open. Some colonies sit near the inner plastic wall beside rim glare.

A distinctive non-colony feature occupies a mid-right / lower-right sector of the agar: a compact patch of small translucent, ring-outlined, glassy or golden foam-like bubbles that differ in texture from the opaque cream colony bodies. Bright rim reflections and surface specular pinpoints remain visually distinct from raised colonies when inspected carefully, but share brightness and approximate scale with the smallest pale dots—creating opportunities for object-identity confusion between true CFU and optical or condensation artifacts. Marker writing is minimal to absent compared with some other plates in the same dataset; the dominant interpretive hazards are the bubble/foam patch, rim glare, and multi-lobed contact clusters that must be handled correctly under identity and isolation rules.
```

*(Word count = 334. Qualitative density language only; no colony/bubble tallies, no millimeter estimates. Description does not state CFU/mL or the boxed GTFA string.)*

---

## 8. Distractors (exactly 5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `0, 79, 7.9E6` | **Artifact identity miss:** did not recognize mid-right translucent rings as countable bubble/foam artifacts (Nbubble=0) while somehow isolating correctly. |
| 2 | `1, 79, 7.9E6` | **Wrong foam binding:** treated the entire mid-right foam patch as a single object instead of discrete resolvable rings. |
| 3 | `11, 172, 1.7E7` | **Wrong isolation binding:** correct bubble count but tallied the full colony set instead of isolated-only. |
| 4 | `11, 140, 1.4E7` | **Wrong isolation + Strategy A-class full-plate undercount** (Grok 4.6-like N) with correct-ish bubble field. |
| 5 | `11, 79, 7.9E5` | **Calc trap (distractor only):** correct counts but forgot to divide by 0.1 mL (`79 × 10⁴`). |

**Testing note:** Score against GTFA **`11, 79, 7.9E6`**. Distractors are authoring/QA only and must **not** appear in the model-facing prompt.

---

## 9. Model failure justification (image misinterpretation)

Failure is expected from **wrong biological/visual category identity and/or wrong contact binding**, not bare undercount of the Strategy A full-colony target:

1. **Artifact identity / bubble binding (primary, directions 1+3):** models mis-state the mid-right foam ring count — e.g. `Nbubble=0` (bubbles misclassified as colonies or ignored as a countable artifact class), `Nbubble=1` (whole patch bound as one object), or inflated counts that fold in abutting opaque colonies / micro-grain. Wrong **element identity** or wrong **foam-field binding**.
2. **Wrong isolation / merge binding:** models report a full-plate-like second field (`172`, `157`, `140`) instead of isolated **79** — including contacting pairs/chains (wrong binding to the isolation criterion). Strategy A answers fail this field by construction.
3. **Artifact-as-isolated-colony:** bubble/foam objects counted into the isolated colony field.

Strategy A’s FAILURE_BAR_NOT_MET pattern (correct bubble *exclusion* + bare undercount of all colonies) is no longer the scored claim: the GTFA now requires an explicit artifact tally and an isolated-only colony field.

Arithmetic mistakes retained **only as distractors** (e.g. `11, 79, 7.9E5`).

Knowledge required is standard plate-count microbiology (pre-2025). No post-2025-12-31 facts are needed.

---

## 10. Vision model test results

### Attempt log

| Attempt | Action | Outcome |
|---------|--------|---------|
| 0 | Bordetella `sp06_img22` (GTFA `144, 1.4E7`) | FAILURE_BAR_NOT_MET: bare undercount |
| 1 | **Strategy A** Listeria `sp14_img18`, GTFA `172, 1.7E7` | **FAILED FAILURE_BAR:** Grok 4.6 `140, 1.4E7`; Grok 4.7 `157, 1.6E7` — correct bubble exclusion, bare undercount |
| 2 | **Strategy B** two-category + isolated-only, GTFA `11, 79, 7.9E6` | Package rewritten; parent retest — see `MODEL_TEST_PROTOCOL.md` |

### Results table (Strategy A — FAILED BAR; do not ship)

| Tester | Answer | Result |
|--------|--------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | `157, 1.6E7` | FAIL — bare undercount; correctly excluded bubbles/rim glare |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `140, 1.4E7` | FAIL — bare undercount; correctly excluded bubble/foam cluster |

### Results table (Strategy B; GTFA = `11, 79, 7.9E6`)

| Tester | Answer | Result |
|--------|--------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | *pending parent closed-book run* | — |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | *pending parent closed-book run* | — |

**Bar status:** **PENDING Strategy B retest** — nested agent cannot spawn Task; parent runs `MODEL_TEST_PROTOCOL.md`.

**Desired failures:** wrong `Nbubble` (0 / 1 / inflated) and/or second field near `172`/`157`/`140` (wrong isolation binding). Prefer documenting the model’s stated identity/binding reason.

---

## 11. Guidelines checklist

| Requirement | Status |
|-------------|--------|
| Assay = Petri Dishes & Culture Plates only | Pass |
| Real lab photo; CC BY 4.0 peer-reviewed OA dataset | Pass |
| Not reusing Erysipelothrix `sp10_img14` / 2.8E7 | Pass |
| Strategy A FAILURE_BAR evidence recorded; pivoted to B | Pass |
| ≤5 images; <5MB; ~2000 px JPEG; no annotation overlay | Pass |
| Prompt ≤2000 chars; image-dependent; 2–3 biology steps | Pass (1868) |
| Single unambiguous structured GTFA | Pass (`11, 79, 7.9E6`) |
| Dilution+volume factual; CFU formula not pasted | Pass |
| Precise counting rules (bubbles, isolation, rim) without appearance spoiler | Pass |
| Verifiable structured answer (OPEN_ENDED) | Pass |
| No explicit MC; implied space ≥10 | Pass |
| Image description ≥200 words; no GTFA spoiler | Pass |
| Exactly 5 incorrect distractors + testing note | Pass |
| Model failure = image misinterpretation (artifact identity / isolation binding) | Pass (intended; confirm on retest) |
| Both strongest vision models fail via interpretive error | **Pending parent Strategy B retest** |
