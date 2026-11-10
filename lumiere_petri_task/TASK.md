# Project Lumière — Petri Dishes & Culture Plates (Microbiology)

Paste-ready task package for Lumiere / Project Lumière.

**Strategy:** **B** — pivoted from Strategy A on the same *Listeria monocytogenes* `sp14_img18` plate. Strategy A (`172, 1.7E7` all-colony tally) failed FAILURE_BAR: Grok 4.6/`140, 1.4E7` and Grok 4.7/`157, 1.6E7` correctly excluded the mid-right bubble/foam cluster but bare-undercounted true colonies (same FAILURE_BAR_NOT_MET pattern as Bordetella). Strategy B redesigns the **question** so the scored target is the **isolated-only subset** (no margin contact), forcing **wrong merge/isolation binding** and/or **artifact-as-colony identity** errors rather than bare undercount of the full correctly recognized set. Mid-right honeycomb bubble micro-count was judged too ambiguous for a clean `Nbubble` GTFA (wall-sharing cells; “dozens” of tiny rings), so direction **(2) isolated-only** is used, with artifact exclusion retained. **Not** `sp10_img14` / 2.8E7.

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
1. Apply standard viable plate-count colony recognition for this blood-agar culture. Identify candidate colonies whose centers lie on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). Exclude non-colony artifacts — including condensation bubbles/foam (translucent ring-like objects), optical reflections/rim glare, scratches, and debris.
2. From those candidate colonies, count ONLY isolated colonies: a colony contributes to the tally if and only if its margin does not touch any other colony's margin (no shared contact point and no resolvable connecting waist/notch to a neighbor). Colonies that participate in a touching pair, chain, or multi-lobed contact group are excluded entirely (do not count any member of a contacting group). Fully fused single-center masses with no resolvable waist count as one contacting unit and contribute 0 to the isolated tally.
3. From the isolated colony count, compute the viable count (CFU/mL) of the original undiluted culture. Round the CFU/mL result to two significant figures in E-notation.

Final answer format (exactly): <integer isolated colony count>, <CFU/mL in E-notation>
Example style (not the answer): 120, 1.2E7
```

**Character count:** 1527 (under 2000).

**Design notes:** Image-dependent **isolated-subset** enumeration → structured answer with integer isolated count **and** CFU/mL. Organism, medium, dilution, and plated volume stated factually (no colony-appearance color cues; no pasted CFU formula). Counting rules cover rim centers, isolation/contact binding, and explicit artifact classes (bubbles/foam, glare) without locating the traps on the plate. No explicit multiple choice; implied answer space ≫10. Primary scored failure mode is **wrong isolation/merge binding** (e.g. reporting a full-plate-like tally) and/or **artifact-as-colony**, not bare undercount of the full 172 set.

---

## 3. GTFA (Ground-Truth Final Answer)

**`79, 7.9E6`**

Accepted equivalents only if the structured pair is preserved:
- Isolated colony count must be the integer **`79`**
- CFU/mL may normalize as `7.9E6`, `7.9e6`, `7.9×10^6`, or `7.9 x 10^6` → treat as `7.9E6`
- Separators: comma+space preferred; comma without space (`79,7.9E6`) acceptable if both fields parse unambiguously

---

## 4. Answer format

- Short structured text: **`<integer isolated colony count>, <CFU/mL in E-notation with two significant figures>`**
- Example style in the prompt (fake, not GTFA): `120, 1.2E7`
- Case-insensitive for the E-notation letter (`E` / `e`)
- No units string required in the scored answer (units are CFU/mL as defined in the prompt)
- No multi-sentence explanation in the scored field

---

## 5. Golden solution

1. **Visual recognition + artifact exclusion.** Apply viable plate-count colony recognition on this blood-agar culture. Candidate colonies: centers on/inside agar (including rim-adjacent when the center is on agar). **Exclude** condensation bubbles/foam (translucent ring-like objects with clear/dark outlines, not opaque raised colony bodies), rim/optical reflections, scratches, and debris. The mid-right condensation-bubble/foam cluster has **0** expert CFU boxes (correctly excluded).
2. **Isolated-only filter (interpretive binding).** Keep a colony only if its margin does not touch any other colony (no shared contact point; no resolvable connecting waist/notch). Any colony in a touching pair/chain/multi-lobed contact group is excluded entirely. Fully fused single-center masses contribute 0 to the isolated tally.
3. **Expert isolated count.** From the peer-reviewed Makrai annotation set (172 colony boxes for `sp14_img18`), approximate each colony as a circle with diameter = mean bbox side and mark contact when circle margins touch (distance between centers ≤ r₁+r₂). Result: **N_isolated = 79** (93 colonies participate in at least one contact). Quadrant context for the full set remains UL 35 + UR 37 + LL 55 + LR 45 = 172, but only the isolated subset is scored.
4. **Concentration calculation (standard plate-count microbiology).** With 100 µL (= 0.1 mL) of the 10⁻⁴ dilution plated:  
   `CFU/mL = (79 × 10⁴) / 0.1 = 7.9 × 10⁶`.
5. **Rounding + structured report.** Two significant figures → `7.9E6`. Final answer: **`79, 7.9E6`**.

Authoritative expert isolated count is **79**. Counts other than 79 fail the structured GTFA even if CFU would round similarly under a CFU-only rubric.

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

A distinctive non-colony feature occupies a mid-right / lower-right sector of the agar: a compact patch of small translucent, ring-outlined, glassy or golden foam-like bubbles that differ in texture from the opaque cream colony bodies. Bright rim reflections and surface specular pinpoints remain visually distinct from raised colonies when inspected carefully, but share brightness and approximate scale with the smallest pale dots—creating opportunities for object-identity confusion between true CFU and optical or condensation artifacts. Marker writing is minimal to absent compared with some other plates in the same dataset; the dominant interpretive hazards are the bubble/foam patch, rim glare, and multi-lobed contact clusters that must be excluded from an isolated-only tally.
```

*(Word count = 331. Qualitative density language only; no colony tallies, no millimeter estimates. Description does not state CFU/mL or the boxed GTFA string.)*

---

## 8. Distractors (exactly 5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `172, 1.7E7` | **Wrong isolation binding:** counted the full expert set (all colonies), ignoring the isolated-only filter. |
| 2 | `93, 9.3E6` | **Inverted contact category:** counted contact-involved colonies (172−79) instead of the isolated subset. |
| 3 | `140, 1.4E7` | **Full-plate-like tally without isolation** (Strategy A Grok 4.6-class answer): failed isolation filter; also typical bare undercount of the full set. |
| 4 | `79, 7.9E5` | **Calc trap (distractor only):** expert isolated count but forgot to divide by 0.1 mL (`79 × 10⁴`). |
| 5 | `79, 7.9E7` | **Calc trap (distractor only):** expert isolated count but used dilution factor `10⁵` instead of `10⁴` (`79 × 10⁵ / 0.1`). |

**Testing note:** Automated / human evaluation should score against the GTFA **`79, 7.9E6`** in addition to confirming that each of the five distractors is incorrect. The distractor set is for authoring/QA only and must **not** appear in the model-facing prompt (no explicit multiple choice).

---

## 9. Model failure justification (image misinterpretation)

Failure on this item is expected to arise from **misinterpreting isolation/contact structure and/or object identity**, not from bare perceptual undercount of the same target category:

1. **Wrong isolation / merge binding (primary):** models report a full-plate-like integer (e.g. `172`, `157`, `140`) instead of the isolated-only subset **79** — they include contacting pairs/chains/multi-lobed groups, i.e. wrong binding to the isolation criterion. This is an interpretive category error relative to the scored target, not a near-miss tally of isolated colonies.
2. **Artifact-as-colony (identity):** models bind mid-right condensation bubble/foam objects (or rim glare) as additional “isolated” CFU, inflating the isolated tally.
3. **Inverted contact category:** models count only contacting colonies (`93`) instead of isolated ones.

These failure classes are **image misinterpretation** (wrong visual category / wrong merge binding). Strategy A’s FAILURE_BAR_NOT_MET pattern — correct bubble exclusion + bare undercount of all colonies — is no longer the scored claim, because the GTFA is no longer the full 172 set.

Arithmetic mistakes (omitting volume; off-by-one dilution decade) are retained **only as distractors** (`79, 7.9E5`, `79, 7.9E7`).

Knowledge required is standard plate-count microbiology (pre-2025). No post-2025-12-31 facts are needed.

---

## 10. Vision model test results

### Attempt log

| Attempt | Action | Outcome |
|---------|--------|---------|
| 0 | Prior Bordetella `sp06_img22` package (GTFA `144, 1.4E7`) | Platform FAILURE_BAR_NOT_MET: Blocks undercounted (`128`/`126` → `1.3E7`); QC: bare miscount ≠ image misinterpretation |
| 1 | **Strategy A** → Listeria `sp14_img18`, GTFA `172, 1.7E7`, bubble+merge traps | **FAILED FAILURE_BAR:** Grok 4.6 `140, 1.4E7` and Grok 4.7 `157, 1.6E7` — explicitly excluded bubble/foam → bare undercount of correctly recognized colonies |
| 2 | **Strategy B redesign** → isolated-only subset on same plate, GTFA `79, 7.9E6` | Package rewritten; closed-book retest — see `MODEL_TEST_PROTOCOL.md` |

### Results table (Strategy A — FAILED BAR; do not ship)

| Tester | Answer | Result |
|--------|--------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | `157, 1.6E7` | FAIL — bare undercount; correctly excluded bubbles/rim glare |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `140, 1.4E7` | FAIL — bare undercount; correctly excluded bubble/foam cluster |

### Results table (Strategy B prompt; GTFA = `79, 7.9E6`)

| Tester | Answer | Result |
|--------|--------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | *pending parent closed-book run* | — |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | *pending parent closed-book run* | — |

**Bar status:** **PENDING Strategy B retest** — nested agent depth-limited for Task tool; parent must run `MODEL_TEST_PROTOCOL.md` with `file_attachments` to `plate_image.jpg` / artifact copy.

**Desired Strategy B failures:** answers near `172`/`157`/`140` (full-plate / Strategy A answers) → wrong isolation binding; or inflated counts from bubble-as-colony. Prefer documenting the model’s stated reason (included contacts / counted foam / etc.).

**Model substitutions:** Claude Opus / Sonnet / Fable unavailable on prior account runs; use strongest available Grok models as specified.

---

## 11. Guidelines checklist

| Requirement | Status |
|-------------|--------|
| Assay = Petri Dishes & Culture Plates only | Pass |
| Real lab photo; not synthetic/schematic/BioRender | Pass |
| Peer-reviewed OA; figure/dataset license CC BY 4.0 (not NC/ND; not preprint-only) | Pass |
| Not reusing Erysipelothrix `sp10_img14` / 2.8E7 package | Pass (`sp14_img18`, GTFA `79, 7.9E6`) |
| Strategy A FAILURE_BAR evidence recorded; pivoted to B | Pass |
| ≤5 images; annotations <40%; image <5MB; ~2000 px long edge JPEG | Pass (1 image, ~853 KB, 2000 px) |
| No dark-mode screenshot; resize-only processing | Pass |
| Prompt ≤2000 chars; image-dependent; 2–3 biology steps | Pass |
| Single unambiguous short GTFA (structured) | Pass (`79, 7.9E6`) |
| Count feeds quantitative CFU/mL; dilution+volume factual; formula not pasted | Pass |
| Precise counting rules (edge centers, isolation/contact, artifact exclusion) without appearance spoiler | Pass |
| Verifiable structured answer (isolated count + CFU); not value-only | Pass |
| No explicit MC; implied space ≥10; candidates not listed | Pass |
| Image description ≥200 words; no GTFA spoiler | Pass |
| Exactly 5 incorrect distractors + GTFA testing note | Pass |
| Model failure = image misinterpretation (wrong isolation binding / artifact identity) | Pass (intended; confirm on retest) |
| Dilution/volume task-specific (final CFU/mL not published as such) | Pass |
| Knowledge cutoff OK (no post-2025-12-31 requirement) | Pass |
| Both strongest vision models fail GTFA via interpretive error | **Pending parent Strategy B retest** |
