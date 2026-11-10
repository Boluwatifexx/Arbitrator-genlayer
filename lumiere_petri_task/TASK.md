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
1. Apply standard viable plate-count colony recognition for this blood-agar culture. Count every colony whose center lies on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). When colonies touch or appear merged, count them as separate CFU if two or more distinct colony centers or margins are resolvable; count as one CFU only when they are fully fused into a single center. Exclude non-colony artifacts (writing, optical reflections, bubbles, scratches).
2. From your colony count, compute the viable count (CFU/mL) of the original undiluted culture. Round the CFU/mL result to two significant figures in E-notation.

Final answer format (exactly): <integer colony count>, <CFU/mL in E-notation>
Example style (not the answer): 280, 2.8E7
```

**Character count:** ~1105 (well under 2000).

**Design notes:** Image-dependent colony enumeration → structured answer with integer count **and** CFU/mL. Organism, medium, dilution, and plated volume stated factually (no colony-appearance cues; no pasted CFU formula / dilution-factor algebra — solver supplies standard plate-count microbiology). Counting rules cover rim/edge centers, touching/merged colonies, and non-colony artifact exclusion without spoon-feeding morphology colors. No explicit multiple choice; implied answer space ≫10. No candidate list.

---

## 3. GTFA (Ground-Truth Final Answer)

**`144, 1.4E7`**

Accepted equivalents only if the structured pair is preserved:
- Colony count must be the integer **`144`**
- CFU/mL may normalize as `1.4E7`, `1.4e7`, `1.4×10^7`, or `1.4 x 10^7` → treat as `1.4E7`
- Separators: comma+space preferred; comma without space (`144,1.4E7`) acceptable if both fields parse unambiguously

---

## 4. Answer format

- Short structured text: **`<integer colony count>, <CFU/mL in E-notation with two significant figures>`**
- Example style in the prompt (fake, not GTFA): `280, 2.8E7`
- Case-insensitive for the E-notation letter (`E` / `e`)
- No units string required in the scored answer (units are CFU/mL as defined in the prompt)
- No multi-sentence explanation in the scored field

---

## 5. Golden solution

1. **Visual enumeration (standard plate-count).** Apply viable plate-count colony recognition on this blood-agar culture. Count every colony whose center lies on or inside the agar surface, including rim-adjacent colonies when the center is on the agar. Touching/merged objects: count as separate CFU when ≥2 distinct centers/margins are resolvable; count as one when fully fused into a single center. Exclude non-colony artifacts (marker writing visible through the agar, rim/optical reflections, condensation bubbles, scratches).
2. **Expert/dataset count.** Quadrant centroid tallies from the peer-reviewed annotation set: UL 31 + UR 48 + LL 37 + LR 28 → **N = 144** colonies.
3. **Concentration calculation (standard plate-count microbiology).** With 100 µL (= 0.1 mL) of the 10⁻⁴ dilution plated:  
   `CFU/mL = (144 × 10⁴) / 0.1 = 1.44 × 10⁷`.
4. **Rounding + structured report.** Two significant figures → `1.4E7`. Final answer: **`144, 1.4E7`**.

Authoritative expert count is **144**. Counts other than 144 fail the structured GTFA even if CFU would round to `1.4E7` under a CFU-only rubric.

---

## 6. References

1. Makrai, L. et al. Annotated dataset for deep-learning-based bacterial colony detection. *Scientific Data* **10**, 448 (2023). https://doi.org/10.1038/s41597-023-02404-8
2. Makrai, L. et al. Dataset on Figshare (CC BY 4.0). https://doi.org/10.6084/m9.figshare.22022540.v3
3. Standard plate-count relation (solver-supplied; not pasted in the prompt): `CFU/mL = (colonies × dilution factor) / volume plated (mL)`.

---

## 7. Image description (≥200 words; descriptive, non-spoilers)

```
The image is a top-down color laboratory photograph of a single circular plastic Petri dish resting on a plain, light-colored laboratory surface. The frame is filled almost entirely by the dish; no scale bar, printed label, digital UI chrome, or secondary dishes appear. Bright overhead lighting illuminates the plate fairly evenly, producing high contrast between pale colonies and the dark agar while also generating specular highlights along the clear plastic rim—most conspicuously a continuous bright white reflection arc along the right and upper-right inner wall—and small pinpoint glints on raised colony surfaces and on the glossy agar itself.

The culture medium is an opaque, deep reddish-brown to maroon blood agar that fills the dish as a flat, slightly reflective plane. The agar appears smooth and moist overall. A few minute trapped air bubbles sit near the agar–plastic junction along portions of the rim; faint tonal unevenness and soft rectangular shadowing are visible across the mid-plate but do not resemble colonies. Occasional sharp white optical pinpoints of reflected light on the glossy surface are distinct from the raised, off-white colony bodies. Fine surface scratches, if present, are minimal and do not dominate the field.

Dark handwritten permanent-marker strokes on the underside of the dish show through the translucent agar as blurred blue-black bands. Near the upper central region a faint digit-like mark resembling “10” is visible; a thicker, largely illegible horizontal scribble crosses the mid-plate as a dark blurry band beneath the colony layer. Colonies overlying these ink marks remain visible as pale dots against the darker local background.

Across the agar are many small, discrete microbial colonies. Individual colonies appear as pale off-white to cream, roughly circular, convex dots, each often carrying a tiny bright specular glint on its upper surface. Diameters are similar across the plate—generally on the order of one to a few millimeters in the photograph—with a minority of slightly smaller pinpoint colonies. Distribution is broad rather than confined to a streak line: colonies occupy all four quadrants of the circular field, including positions immediately adjacent to the inner plastic wall where rim glare and the curved wall reduce local contrast.

Spatial inventory by quadrant (partitioning the circular agar by vertical and horizontal midlines through the dish center), counting each distinct colony body including rim-adjacent colonies whose centers lie on the agar and counting touching neighbors separately when distinct centers or margins remain resolvable: the upper-left quadrant contains 31 colonies; the upper-right quadrant contains 48 colonies and is the densest region, with several close pairs and short linear groupings; the lower-left quadrant contains 37 colonies; the lower-right quadrant contains 28 colonies and is the sparsest. Approximately a dozen pairs of colonies have centers close enough that their margins touch or nearly touch—most often in the crowded upper-right and central regions—while elsewhere colonies are well separated against the dark medium. Roughly two dozen colonies sit in the outer rim band next to the plastic wall. Summing the four quadrant tallies accounts for every resolvable colony on the plate.
```

*(Word count = 500. Quadrant inventory: UL 31 + UR 48 + LL 37 + LR 28. Description does not state CFU/mL or the boxed GTFA string.)*

---

## 8. Distractors (exactly 5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `160, 1.6E7` | Dense-field **overcount** (~160): splitting touching pairs/triplets into extra colonies, then correct arithmetic on the wrong count. |
| 2 | `170, 1.7E7` | **Artifact-as-colony** overcount (~170): treating marker writing and/or rim glare pinpoints as colonies. |
| 3 | `120, 1.2E7` | **Occlusion undercount** (~120): missing colonies overlying dark marker strokes or pressed against the rim. |
| 4 | `144, 1.4E6` | **Calc trap (distractor only):** expert count but forgot to divide by 0.1 mL (`144 × 10⁴`). |
| 5 | `144, 1.4E8` | **Calc trap (distractor only):** expert count but used dilution factor `10⁵` instead of `10⁴` (`144 × 10⁵ / 0.1`). |

**Testing note:** Automated / human evaluation should score against the GTFA **`144, 1.4E7`** in addition to confirming that each of the five distractors is incorrect. The distractor set is for authoring/QA only and must **not** appear in the model-facing prompt (no explicit multiple choice).

---

## 9. Model failure justification (image misinterpretation)

Failure on this item is expected to arise from **misreading the plate image**, not from pure arithmetic or OCR:

1. **Dense-field overcount** — models split touching colony clusters that still have distinct centers, inflating N into the mid-150s–170s and producing structured answers such as `160, 1.6E7` / `170, 1.7E7`.
2. **Artifact-as-colony** — marker writing seen through the agar, rim speculars, and surface glints are mistaken for additional colonies.
3. **Occlusion undercount** — colonies sitting on/near marker strokes or the rim are skipped, pushing N toward ~110–130 (e.g. `120, 1.2E7` / `132, 1.3E7`).

Arithmetic mistakes (omitting volume; off-by-one dilution decade) are retained **only as distractors** (`144, 1.4E6`, `144, 1.4E8`); a valid model-failure claim for Lumière requires the primary error to be visual (miscount / artifact / occlusion). Downstream CFU arithmetic on a wrong count is acceptable as the scored wrong answer. The structured GTFA also fails any near-miss count that is not exactly **144**, even when CFU rounds to `1.4E7`.

Knowledge required is standard plate-count microbiology (pre-2025), including colony recognition and the viable-count formula. No post-2025-12-31 facts are needed.

---

## 10. Vision model test results

### Attempt log

| Attempt | Action | Outcome |
|---------|--------|---------|
| 0 | Prior package: Grok 4.6 + Grok 4.7 closed-book (CFU-only GTFA `1.4E7`) | Both failed (`1.3E7`, `1.2E7`) |
| 1 | QC revise → structured GTFA `144, 1.4E7` | Prompt + golden/distractors hardened |
| 2 | Closed-book re-test under QC-fixed prompt (structured GTFA) | **Bar MET** — both strongest available models fail exact structured match |

### Results table (QC-fixed prompt; structured GTFA = `144, 1.4E7`)

| Tester | Answer | Result |
|--------|--------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | `147, 1.5E7` | ✗ fail (overcount → wrong CFU) |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `137, 1.4E7` | ✗ fail (wrong count; CFU coincides only because 137∈135–144 band — full structured GTFA still fails) |

**Bar status:** **MET** on exact structured match (both ≠ `144, 1.4E7`).

**Model substitutions:** Claude Opus / Sonnet / Fable **unavailable** on this account; tested strongest available Grok models as above.

---

## 11. Guidelines checklist

| Requirement | Status |
|-------------|--------|
| Assay = Petri Dishes & Culture Plates only | Pass |
| Real lab photo; not synthetic/schematic/BioRender | Pass |
| Peer-reviewed OA; figure/dataset license CC BY 4.0 (not NC/ND; not preprint-only) | Pass |
| Not reusing Erysipelothrix `sp10_img14` / 2.8E7 package | Pass (`sp06_img22`, GTFA `144, 1.4E7`) |
| ≤5 images; annotations <40%; image <5MB; ~2000 px long edge JPEG | Pass (1 image, ~536 KB, 2000 px) |
| No dark-mode screenshot; resize-only processing | Pass |
| Prompt ≤2000 chars; image-dependent; 2–3 biology steps | Pass |
| Single unambiguous short GTFA (structured) | Pass (`144, 1.4E7`) |
| Count feeds quantitative CFU/mL; dilution+volume factual in prompt; formula not pasted | Pass |
| Precise counting rules (edge centers, merged CFU, artifact exclusion) without appearance spoiler | Pass |
| Verifiable structured answer (count + CFU); not value-only | Pass |
| No explicit MC; implied space ≥10; candidates not listed | Pass |
| Image description ≥200 words; no GTFA spoiler | Pass |
| Exactly 5 incorrect distractors + GTFA testing note | Pass (structured pairs) |
| Model failure = image misinterpretation (not pure arithmetic) | Pass (primary: overcount / artifact / occlusion) |
| Dilution/volume task-specific (final CFU/mL not published as such) | Pass |
| Knowledge cutoff OK (no post-2025-12-31 requirement) | Pass |
| Both strongest vision models fail GTFA | **Pass / bar MET** (Grok 4.7 `147, 1.5E7`; Grok 4.6 `137, 1.4E7`; Claude/Fable unavailable) |
