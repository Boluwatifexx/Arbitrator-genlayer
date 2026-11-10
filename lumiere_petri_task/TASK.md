# Project Lumière — Petri Dishes & Culture Plates (Microbiology)

Paste-ready task package for Lumiere / Project Lumière.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| **Assay type** | Petri Dishes & Culture Plates (Microbiology) |
| **Image file** | `plate_image.jpg` (also `sp06_img22_bordetella_plate.jpg`) |
| **Artifact copy** | `/opt/cursor/artifacts/sp06_img22_bordetella_plate.jpg` |
| **Dataset image ID** | `sp06_img22.jpg` (*Bordetella bronchiseptica*; **not** `sp10_img14`) |
| **Dataset title** | Annotated dataset for deep-learning-based bacterial colony detection |
| **Dataset DOI** | https://doi.org/10.6084/m9.figshare.22022540.v3 |
| **Paper** | Makrai et al., *Scientific Data* (2023) https://doi.org/10.1038/s41597-023-02404-8 |
| **Dataset license** | **CC BY 4.0** (verified via Figshare article API `license.name`) |
| **Paper license** | CC BY 4.0 (Open Access) |
| **Image type** | Real laboratory photograph of an incubated blood agar plate |
| **Long edge** | 2000 px (resized from 2183×2200; JPEG; ~536 KB) |
| **Annotations on task image** | None (raw plate photo only) |
| **Preprints / NC / ND / paywall** | None — peer-reviewed OA + CC BY dataset |

See also: `PROVENANCE.md`, `COUNT_NOTES.md`.

---

## 2. Prompt (≤2000 characters)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Bordetella bronchiseptica suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. Identify and count every bacterial colony on the plate (raised pale colonies on the dark agar). Do not count rim reflections, condensation, ink/marker writing visible through the agar, scratches, or other non-colony artifacts.
2. Compute the concentration in the original undiluted suspension as CFU/mL using:
   CFU/mL = (colony count × dilution factor) / volume plated in mL
   where dilution factor = 10⁴ and volume plated = 0.1 mL.
3. Report the result rounded to two significant figures in E-notation (example format: 3.2E6).

Final answer: the CFU/mL value only (e.g., 2.5E7).
```

**Character count:** ~748 (well under 2000).

**Design notes:** Image-dependent colony enumeration → quantitative CFU/mL (count alone is not the answer). Dilution + volume stated. No explicit multiple choice; implied answer space ≫10. No candidate list. Biology reasoning: (1) discriminate colonies vs artifacts, (2) complete plate count, (3) apply dilution/volume formula and round.

---

## 3. GTFA (Ground-Truth Final Answer)

**`1.4E7`**

Accepted equivalents only if exactly the same value: `1.4×10^7`, `1.4 x 10^7`, `1.4e7` (normalize to `1.4E7`).

---

## 4. Answer format

- Single short token: CFU/mL in **E-notation with two significant figures** (e.g., `1.4E7`).
- No units string required in the scored answer (units are CFU/mL as defined in the prompt).
- No multi-sentence explanation in the scored field.

---

## 5. Golden solution

1. **Visual enumeration.** On the blood agar plate, count each raised, pale/cream, roughly circular colony. Exclude: (a) bright specular highlights that are not colony bodies, (b) reflections along the plastic rim, (c) dark blue/black marker writing visible through the agar, (d) scratches or agar texture. Touching colonies that retain two (or more) distinct centers are counted separately.
2. **Expert/dataset count.** Quadrant centroid tallies from the peer-reviewed annotation set: UL 31 + UR 48 + LL 37 + LR 28 → **N = 144** colonies.
3. **Concentration calculation.**  
   `CFU/mL = (144 × 10⁴) / 0.1 = 1.44 × 10⁷`.
4. **Rounding.** Two significant figures → **`1.4E7`**.

Tolerance: integer counts **135–144** still round to `1.4E7` under the stated rule; the authoritative expert count used here is **144**.

---

## 6. References

1. Makrai, L. et al. Annotated dataset for deep-learning-based bacterial colony detection. *Scientific Data* **10**, 448 (2023). https://doi.org/10.1038/s41597-023-02404-8
2. Makrai, L. et al. Dataset on Figshare (CC BY 4.0). https://doi.org/10.6084/m9.figshare.22022540.v3
3. Standard plate-count relation: `CFU/mL = (colonies × dilution factor) / volume plated (mL)`.

---

## 7. Image description (≥200 words; descriptive, non-spoilers)

The image is a top-down color photograph of a single circular Petri dish resting on a plain, light-colored surface. The culture medium is an opaque, deep reddish-brown agar filling the dish to a flat, slightly reflective surface. The transparent plastic rim of the dish forms a thin, bright ring; specular highlights run along portions of the inner rim, especially where the overhead light catches the plastic. Outside the dish the background is uniformly pale and out of focus.

Across the agar are many small, discrete microbial colonies. Individual colonies appear as pale off-white to cream, roughly circular, convex dots, each often showing a tiny bright specular glint on its upper surface. Colony diameters are similar across the plate, generally on the order of one to a few millimeters in the photograph, with a minority of slightly smaller pinpoint colonies. Distribution is broad rather than confined to a single streak: colonies occur in all quadrants, including near the inner wall of the dish.

Several colonies lie close enough that their margins touch or nearly touch, forming pairs or short linear triplets, particularly toward the central and right-central regions. Elsewhere, colonies are well separated against the dark agar. A few colonies sit immediately adjacent to the plastic rim, where rim glare and the curved wall reduce local contrast.

Through the translucent agar, dark handwritten marker strokes are visible as blurred blue-black bands and digit-like shapes crossing the mid-plate region. Colonies that overlie these ink marks appear as pale dots against a darker local background. The agar surface also shows faint tonal unevenness and soft rectangular shadows unrelated to colony morphology. Occasional sharp white pinpoints of reflected light are present on the glossy medium and must be distinguished from true raised colonies.

Lighting is bright and diffuse from above, yielding high overall contrast between pale colonies and dark medium, while also creating the rim reflections and surface glints noted above. There is no scale bar, printed label, or digital UI chrome in the frame. The photograph is a real laboratory plate image (not a schematic diagram).

*(Word count ≈ 320.)*

---

## 8. Distractors (exactly 5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `1.6E7` | Dense-field **overcount** (~160): splitting touching pairs/triplets into extra colonies. |
| 2 | `1.7E7` | **Artifact-as-colony** overcount (~170): treating marker ink blobs and/or rim glare pinpoints as colonies. |
| 3 | `1.2E7` | **Occlusion undercount** (~120): missing colonies overlying dark marker strokes or pressed against the rim. |
| 4 | `1.4E6` | **Calc trap (distractor only):** correct-ish count (~144) but forgot to divide by 0.1 mL (`144 × 10⁴`). |
| 5 | `1.4E8` | **Calc trap (distractor only):** used dilution factor `10⁵` instead of `10⁴` (`144 × 10⁵ / 0.1`). |

**Testing note:** Automated / human evaluation should score against the GTFA **`1.4E7`** in addition to confirming that each of the five distractors is incorrect. The distractor set is for authoring/QA only and must **not** appear in the model-facing prompt (no explicit multiple choice).

---

## 9. Model failure justification (image misinterpretation)

Failure on this item is expected to arise from **misreading the plate image**, not from pure arithmetic or OCR:

1. **Dense-field overcount** — models split touching colony clusters that still have distinct centers, inflating N into the mid-150s–170s and producing `1.6E7` / `1.7E7`.
2. **Artifact-as-colony** — dark marker writing seen through the agar, rim speculars, and surface glints are mistaken for additional colonies.
3. **Occlusion undercount** — colonies sitting on/near marker strokes or the rim are skipped, pushing N toward ~110–130 (`1.1E7`–`1.3E7`).

Arithmetic mistakes (omitting volume; off-by-one dilution decade) are retained **only as distractors**; a valid model-failure claim for Lumière requires the primary error to be visual (miscount / artifact / occlusion). Downstream CFU arithmetic on a wrong count is acceptable as the scored wrong answer.

Knowledge required is standard plate-count microbiology (pre-2025). No post-2025-12-31 facts are needed.

---

## 10. Vision model test results

### Attempt log

| Attempt | Action | Outcome |
|---------|--------|---------|
| 0 | Subagent tried `cursor` / `Task` with Opus & Sonnet | **Blocked:** `Subagent child workflow depth limit of 1 reached` |
| 1+ | **Parent must run** protocol in `MODEL_TEST_PROTOCOL.md` | Pending |

### Results table (fill after parent Task runs)

| Model slug | Colony count used | Final answer | Pass/Fail vs GTFA `1.4E7` | Notes |
|------------|-------------------|--------------|--------------------------|-------|
| `claude-opus-5-5-high` (or closest available) | *pending* | *pending* | *pending — must FAIL* | Attach `plate_image.jpg`; closed-book |
| `claude-sonnet-5-5-high` (or closest available) | *pending* | *pending* | *pending — must FAIL* | Attach `plate_image.jpg`; closed-book |

**Hard gate:** both models must **FAIL** (answer ≠ `1.4E7` and not a count in the 135–144 band that rounds to GTFA). If either passes, revise (harder visual region / different dilution mapping near-miss counts to other E-notation) and re-test.

---

## 11. Guidelines checklist

| Requirement | Status |
|-------------|--------|
| Assay = Petri Dishes & Culture Plates only | Pass |
| Real lab photo; not synthetic/schematic/BioRender | Pass |
| Peer-reviewed OA; figure/dataset license CC BY 4.0 (not NC/ND; not preprint-only) | Pass |
| Not reusing Erysipelothrix `sp10_img14` / 2.8E7 package | Pass (`sp06_img22`, GTFA `1.4E7`) |
| ≤5 images; annotations <40%; image <5MB; ~2000 px long edge JPEG | Pass (1 image, ~536 KB, 2000 px) |
| No dark-mode screenshot; resize-only processing | Pass |
| Prompt ≤2000 chars; image-dependent; 2–3 biology steps | Pass |
| Single unambiguous short GTFA | Pass (`1.4E7`) |
| Count feeds quantitative CFU/mL; dilution+volume in prompt | Pass |
| No explicit MC; implied space ≥10; candidates not listed | Pass |
| Image description ≥200 words; no GTFA spoiler | Pass |
| Exactly 5 incorrect distractors + GTFA testing note | Pass |
| Model failure = image misinterpretation (not pure arithmetic) | Pass (by design; live confirmation pending parent Task) |
| Dilution/volume task-specific (final CFU/mL not published as such) | Pass |
| Knowledge cutoff OK (no post-2025-12-31 requirement) | Pass |
| Both strongest vision models fail GTFA | **Pending parent Task runs** |
