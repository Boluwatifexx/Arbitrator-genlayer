# Project Lumière — Petri Dishes & Culture Plates (Microbiology)

Paste-ready task package for Lumiere / Project Lumière.

**Strategy:** **A** — swapped from Bordetella `sp06_img22` (FAILURE_BAR_NOT_MET via bare undercount) to *Listeria monocytogenes* `sp14_img18`, a CC BY Makrai plate whose condensation-bubble/foam cluster and multi-lobed contact merges drive **interpretive** overcount (artifact-as-colony / wrong merge binding), matching the accepted Erysipelothrix failure pattern. **Not** `sp10_img14` / 2.8E7.

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
1. Apply standard viable plate-count colony recognition for this blood-agar culture. Count every colony whose center lies on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). When colonies touch or appear merged into multi-lobed masses, count them as separate CFU if two or more distinct colony centers or separating notches/waists are resolvable; count as one CFU only when they are fully fused into a single center with no resolvable waist. Exclude non-colony artifacts — including condensation bubbles/foam (translucent ring-like objects), optical reflections/rim glare, scratches, and debris.
2. From your colony count, compute the viable count (CFU/mL) of the original undiluted culture. Round the CFU/mL result to two significant figures in E-notation.

Final answer format (exactly): <integer colony count>, <CFU/mL in E-notation>
Example style (not the answer): 280, 2.8E7
```

**Character count:** 1242 (well under 2000).

**Design notes:** Image-dependent colony enumeration → structured answer with integer count **and** CFU/mL. Organism, medium, dilution, and plated volume stated factually (no colony-appearance color cues; no pasted CFU formula). Counting rules cover rim centers, merge/waist resolution, and explicit artifact classes (bubbles/foam, glare) without locating the traps on the plate. No explicit multiple choice; implied answer space ≫10.

---

## 3. GTFA (Ground-Truth Final Answer)

**`172, 1.7E7`**

Accepted equivalents only if the structured pair is preserved:
- Colony count must be the integer **`172`**
- CFU/mL may normalize as `1.7E7`, `1.7e7`, `1.7×10^7`, or `1.7 x 10^7` → treat as `1.7E7`
- Separators: comma+space preferred; comma without space (`172,1.7E7`) acceptable if both fields parse unambiguously

---

## 4. Answer format

- Short structured text: **`<integer colony count>, <CFU/mL in E-notation with two significant figures>`**
- Example style in the prompt (fake, not GTFA): `280, 2.8E7`
- Case-insensitive for the E-notation letter (`E` / `e`)
- No units string required in the scored answer (units are CFU/mL as defined in the prompt)
- No multi-sentence explanation in the scored field

---

## 5. Golden solution

1. **Visual enumeration (standard plate-count).** Apply viable plate-count colony recognition on this blood-agar culture. Count every colony whose center lies on or inside the agar surface, including rim-adjacent colonies when the center is on the agar. Touching/multi-lobed objects: count as separate CFU when ≥2 distinct centers or separating notches/waists are resolvable; count as one when fully fused into a single center. **Exclude** condensation bubbles/foam (translucent ring-like objects with clear/dark outlines, not opaque raised colony bodies), rim/optical reflections, scratches, and debris.
2. **Expert/dataset count.** Quadrant centroid tallies from the peer-reviewed annotation set: UL 35 + UR 37 + LL 55 + LR 45 → **N = 172** colonies. The mid-right condensation-bubble/foam cluster is **not** annotated as CFU (correctly excluded).
3. **Concentration calculation (standard plate-count microbiology).** With 100 µL (= 0.1 mL) of the 10⁻⁴ dilution plated:  
   `CFU/mL = (172 × 10⁴) / 0.1 = 1.72 × 10⁷`.
4. **Rounding + structured report.** Two significant figures → `1.7E7`. Final answer: **`172, 1.7E7`**.

Authoritative expert count is **172**. Counts other than 172 fail the structured GTFA even if CFU would round similarly under a CFU-only rubric.

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

A distinctive non-colony feature occupies a mid-right / lower-right sector of the agar: a compact patch of small translucent, ring-outlined, glassy or golden foam-like bubbles that differ in texture from the opaque cream colony bodies. Bright rim reflections and surface specular pinpoints remain visually distinct from raised colonies when inspected carefully, but share brightness and approximate scale with the smallest pale dots—creating opportunities for object-identity confusion between true CFU and optical or condensation artifacts. Marker writing is minimal to absent compared with some other plates in the same dataset; the dominant interpretive hazards are the bubble/foam patch, rim glare, and multi-lobed contact clusters.
```

*(Word count = 324. Qualitative density language only; no colony tallies, no millimeter estimates. Description does not state CFU/mL or the boxed GTFA string.)*

---

## 8. Distractors (exactly 5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `185, 1.9E7` | **Artifact-as-colony** overcount (~+10–15): treating the mid-right condensation bubble/foam cluster as additional CFU, then correct arithmetic. |
| 2 | `205, 2.1E7` | **Merge-binding overcount**: over-segmenting multi-lobed contact clusters (especially lower-left) into extra CFU beyond resolvable waists. |
| 3 | `155, 1.6E7` | **Occlusion/shadow undercount**: missing colonies in the darker left-shadowed half or near rim glare. |
| 4 | `172, 1.7E6` | **Calc trap (distractor only):** expert count but forgot to divide by 0.1 mL (`172 × 10⁴`). |
| 5 | `172, 1.7E8` | **Calc trap (distractor only):** expert count but used dilution factor `10⁵` instead of `10⁴` (`172 × 10⁵ / 0.1`). |

**Testing note:** Automated / human evaluation should score against the GTFA **`172, 1.7E7`** in addition to confirming that each of the five distractors is incorrect. The distractor set is for authoring/QA only and must **not** appear in the model-facing prompt (no explicit multiple choice).

---

## 9. Model failure justification (image misinterpretation)

Failure on this item is expected to arise from **misinterpreting plate objects / merge structure**, not from bare perceptual undercount or pure arithmetic:

1. **Artifact-as-colony (primary, Erysipelothrix-class):** models bind the mid-right **condensation bubble/foam cluster** (translucent ring-like objects) as additional CFU, inflating N into the ~180–195 range (e.g. `185, 1.9E7`). This is wrong **element identity**, not a near-miss tally of correctly recognized colonies.
2. **Wrong merge binding:** models over-resolve multi-lobed contact clusters in dense lower-field regions, splitting fully fused or ambiguously waisted masses into extra CFU (e.g. `205, 2.1E7`).
3. **Rim-glare false positives:** specular arcs/pinpoints along the plastic wall are counted as rim-adjacent colonies.

These are the same interpretive failure classes that made the accepted Erysipelothrix task pass FAILURE_BAR (artifact/rim reflections and merge over-segmentation → **overcount**). Bare undercount without object-identity or merge-rule error is **not** the intended failure claim.

Arithmetic mistakes (omitting volume; off-by-one dilution decade) are retained **only as distractors** (`172, 1.7E6`, `172, 1.7E8`). Downstream CFU arithmetic on a wrong interpretive count is acceptable as the scored wrong answer.

Knowledge required is standard plate-count microbiology (pre-2025). No post-2025-12-31 facts are needed.

---

## 10. Vision model test results

### Attempt log

| Attempt | Action | Outcome |
|---------|--------|---------|
| 0 | Prior Bordetella `sp06_img22` package (GTFA `144, 1.4E7`) | Platform FAILURE_BAR_NOT_MET: Blocks undercounted (`128`/`126` → `1.3E7`); QC: bare miscount ≠ image misinterpretation |
| 1 | **Strategy A redesign** → Listeria `sp14_img18`, GTFA `172, 1.7E7`, bubble+merge traps | Package rewritten; closed-book retest — see `MODEL_TEST_PROTOCOL.md` |

### Results table (Strategy A prompt; GTFA = `172, 1.7E7`)

| Tester | Answer | Result |
|--------|--------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | *pending parent closed-book run* | — |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | *pending parent closed-book run* | — |

**Bar status:** **PENDING** — nested agent depth-limited for Task tool; parent must run `MODEL_TEST_PROTOCOL.md` with `file_attachments` to `plate_image.jpg` / artifact copy.

**Model substitutions:** Claude Opus / Sonnet / Fable unavailable on prior account runs; use strongest available Grok models as specified.

---

## 11. Guidelines checklist

| Requirement | Status |
|-------------|--------|
| Assay = Petri Dishes & Culture Plates only | Pass |
| Real lab photo; not synthetic/schematic/BioRender | Pass |
| Peer-reviewed OA; figure/dataset license CC BY 4.0 (not NC/ND; not preprint-only) | Pass |
| Not reusing Erysipelothrix `sp10_img14` / 2.8E7 package | Pass (`sp14_img18`, GTFA `172, 1.7E7`) |
| Not reusing failed Bordetella bare-undercount package as-is | Pass (image + failure mode redesigned) |
| ≤5 images; annotations <40%; image <5MB; ~2000 px long edge JPEG | Pass (1 image, ~853 KB, 2000 px) |
| No dark-mode screenshot; resize-only processing | Pass |
| Prompt ≤2000 chars; image-dependent; 2–3 biology steps | Pass |
| Single unambiguous short GTFA (structured) | Pass (`172, 1.7E7`) |
| Count feeds quantitative CFU/mL; dilution+volume factual; formula not pasted | Pass |
| Precise counting rules (edge centers, merge waists, artifact exclusion) without appearance spoiler | Pass |
| Verifiable structured answer (count + CFU); not value-only | Pass |
| No explicit MC; implied space ≥10; candidates not listed | Pass |
| Image description ≥200 words; no GTFA spoiler | Pass |
| Exactly 5 incorrect distractors + GTFA testing note | Pass |
| Model failure = image misinterpretation (artifact-as-colony / wrong merge binding) | Pass (intended; confirm on retest) |
| Dilution/volume task-specific (final CFU/mL not published as such) | Pass |
| Knowledge cutoff OK (no post-2025-12-31 requirement) | Pass |
| Both strongest vision models fail GTFA via interpretive error | **Pending parent retest** |
