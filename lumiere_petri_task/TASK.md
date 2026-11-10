# Project Lumière — Petri Dishes & Culture Plates (Microbiology)

Paste-ready task package for Lumiere / Project Lumière.

**Strategy C (current):** Same *Listeria monocytogenes* `sp14_img18` plate. Pivoted from Strategy B after Prompt Checker MAJOR flags:
- **DOMAIN_KNOWLEDGE_FLOOR** — geometric “translucent ring / non-opaque center” instructions made the task solvable with neutral object labels
- **COUNTING_IS_THE_TASK** — bubble/foam tally was a scored endpoint with no downstream biology

Strategy C restores an Erysipelothrix-style **viable-count** endpoint: colony enumeration feeds CFU/mL + the conventional countable-range judgment. No artifact tally in the answer; no geometric ring tutorial; CFU formula not pasted. **Not** `sp10_img14` / 2.8E7.

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
| **Paper** | Makrai et al., *Scientific Data* **10**, Article **497** (2023) https://doi.org/10.1038/s41597-023-02404-8 |
| **Dataset license** | **CC BY 4.0** |
| **Paper license** | CC BY 4.0 (Open Access) |
| **Image type** | Real laboratory photograph of an incubated blood agar plate |
| **Long edge** | 2000 px JPEG (~853 KB); no annotation overlays |

---

## 2. Prompt (≤2000 characters) — PASTE THIS

```
Image 1 shows a blood-agar spread plate of Listeria monocytogenes after incubation. To prepare it, 100 µL of a $10^{-4}$ dilution of a broth culture was spread over the entire plate. Using standard viable plate-count practice, determine the viable count of the undiluted broth culture in CFU/mL. Apply the conventional countable-range criterion used when reporting a spread-plate count. Resolve contiguous colonies by distinct centers; do not treat non-colony plate artifacts as CFU. Report the answer in E-notation to two significant figures, without units (for example, 3.4E7). If the plate is outside the countable range, report Uncountable.
```

**Character count:** ~555 (under 2000).

**Design notes:**
- Domain knowledge load-bearing: what counts as a CFU on blood agar, plate-count formula, 30–300 countable-range rule (not pasted as numbers—solver supplies the conventional criterion).
- Neutral-label test: replacing microbiological CFU/colony/countable-range concepts with “count pale dots and multiply” breaks the intended task.
- Counting feeds **biological** endpoints (range judgment + viable count)—count is not the scored answer.
- No geometric bubble/ring tutorial; no bubble field in the answer.
- No pasted CFU algebra; no colony color/appearance spoon-feeding.

---

## 3. GTFA

**`1.7E7`**

Accepted equivalents: `1.7e7`, `1.7×10^7`, `1.7 x 10^7` → normalize to `1.7E7`.

Expert colony count **N = 172** (Makrai annotations).  
`CFU/mL = (172 × 10^4) / 0.1 = 1.72 × 10^7` → two sig figs **`1.7E7`**.  
172 ∈ conventional countable range (30–300) → not `Uncountable`.  
Nearby counts that still round to `1.7E7` under two-sig-fig E-notation: treat carefully in review; authoritative expert N is **172**.

---

## 4. Answer format

- **Text (case insensitive)**
- Single short token: CFU/mL in E-notation with two significant figures, **or** the word `Uncountable`
- No units string; no multi-sentence scored field

---

## 5. Golden solution

1. **Recognize the assay.** Blood-agar spread plate of *L. monocytogenes*; 100 µL of a 10⁻⁴ dilution was plated. The undiluted viable count is obtained from a standard plate-count calculation after enumerating CFU on the plate.
2. **Enumerate CFU.** Count each colony-forming unit whose center lies on the agar, including rim-adjacent colonies with centers on the agar. Resolve contiguous/multi-lobed contacts by distinct centers (separate CFU when centers remain resolvable; one CFU when fully fused). Exclude non-colony artifacts (condensation/foam, rim reflections, scratches, debris)—recognition uses microbiological plate-reading practice, not a geometric ring checklist in the prompt.
3. **Expert total.** Quadrant context from annotations: UL 35 + UR 37 + LL 55 + LR 45 → **N = 172**.
4. **Countable-range judgment.** Conventional spread-plate countable range is 30–300 colonies. 172 is within range → the plate may be used to report a viable count (not `Uncountable`).
5. **Viable count.** Volume plated = 100 µL = 0.1 mL; dilution factor of the plated suspension = 10⁻⁴.  
   `CFU/mL = N / (0.1 × 10^{-4}) = 172 / 10^{-5} = 1.72 × 10^7`.
6. **Report.** Two significant figures in E-notation → **`1.7E7`**.

**Final Answer:** `1.7E7`

---

## 6. References

1. Makrai, L. et al. Annotated dataset for deep-learning-based bacterial colony detection. *Scientific Data* **10**, 497 (2023). https://doi.org/10.1038/s41597-023-02404-8
2. Dataset (CC BY 4.0): https://doi.org/10.6084/m9.figshare.22022540.v3
3. Solver-supplied standard plate-count relation and conventional 30–300 countable-range practice for spread plates.

---

## 7. Image description (≥200 words; descriptive, non-spoilers)

```
The image is a top-down color laboratory photograph of a single circular plastic Petri dish resting on a dark, matte surface. The dish nearly fills the frame; no scale bar, printed ruler, UI chrome, or secondary dishes appear. Overhead lighting illuminates the plate with mild left–right unevenness: the left half of the agar sits under a soft darker shadow, while the right half is brighter and more translucent. Specular highlights run along the clear plastic rim, with elongated bright arcs especially along the right and upper-right inner wall, plus small glints on raised colony surfaces.

The culture medium is an opaque to semi-opaque reddish-brown blood agar forming a moist, slightly reflective plane. Surface texture includes faint inoculation streaks and soft tonal gradients that do not themselves look like discrete raised colonies. Along portions of the agar–plastic junction, minute trapped features and rim meniscus glints are visible.

Many small microbial colonies appear as opaque cream to off-white, roughly circular, convex raised dots scattered across all quadrants. Sizes look broadly similar across the plate, with a minority of slightly smaller pinpoints. Distribution is uneven: denser clustering occurs toward the lower-left and lower-central regions, with several close pairs and short multi-lobed groupings where neighboring colonies touch or nearly touch; the upper field is comparatively more open. Some colonies sit near the inner plastic wall beside rim glare.

A distinctive non-colony feature occupies a mid-right / lower-right sector of the agar: a compact patch of small translucent, glassy or foam-like objects that differ in texture from the opaque cream colony bodies. Bright rim reflections and surface specular pinpoints remain visually distinct from raised colonies when inspected carefully, but share brightness and approximate scale with the smallest pale dots. Marker writing is minimal to absent. The main visual hazards for plate reading are distinguishing true colonies from the mid-right foam-like patch and from rim glare, and correctly resolving touching or multi-lobed colony groups.
```

*(Word count ≈ 320. No tallies, no GTFA, no millimeter claims.)*

---

## 8. Distractors (exactly 5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `1.4E7` | Undercount (~140) after excluding the mid-right foam patch but missing true colonies (Strategy A Grok 4.6-class). |
| 2 | `1.6E7` | Undercount (~157) with correct-ish artifact exclusion (Strategy A Grok 4.7-class). |
| 3 | `1.9E7` | **Artifact-as-colony overcount** (~190): treating mid-right foam/condensation and/or rim glints as CFU. |
| 4 | `1.7E6` | Calc trap: correct-ish N≈172 but forgot ÷0.1 mL. |
| 5 | `Uncountable` | Misapplies the countable-range criterion despite N≈172 being within 30–300. |

**Testing note:** Score against GTFA **`1.7E7`**. Distractors are authoring/QA only — do not put them in the model-facing prompt.

---

## 9. Model failure justification (adapt to platform responses)

**Error type:** Figure-based quantitative / object-identity error in plate reading.

**If the model returns a wrong CFU (e.g. 1.4E7 / 1.6E7 / 1.9E7):**  
The model’s CFU/mL formula setup may be intact, but the image-derived colony count is wrong. Expert annotation gives **172** CFU on this plate (within the conventional countable range), so the viable count is **1.7E7**. An undercount reflects incomplete recovery of true colonies in dense/contact regions; an overcount such as ~1.9E7 reflects **misidentifying non-colony artifacts** (mid-right condensation/foam patch and/or rim glare) as CFU—an image **category/identity** error, not arithmetic. Because the count is the only image-derived input to the viable-count calculation, the error propagates to the reported E-notation value.

**If the model returns `Uncountable`:**  
It misapplied the conventional countable-range judgment despite a countable plate (~172 CFU).

**If the model returns no response (platform “did not return a response”):**  
The model failed to produce a completed image-based plate-count solution and therefore did not reach GTFA `1.7E7`. Use only when Retry does not yield a response; prefer a substantive wrong answer when available for a stronger FAILURE_BAR write-up.

---

## 10. Prior test notes (superseded strategies)

| Strategy | GTFA | Outcome |
|----------|------|---------|
| Bordetella `sp06_img22` | `144, 1.4E7` | FAILURE_BAR_NOT_MET (bare undercount) |
| A — Listeria all-colony | `172, 1.7E7` | FAILURE_BAR_NOT_MET (bare undercount; bubbles correctly excluded) |
| B — bubble + isolated | `11, 79, 7.9E6` | Dual Grok fail interpretively, but Prompt Checker: DOMAIN_KNOWLEDGE_FLOOR + COUNTING_IS_THE_TASK |
| **C — viable count + range (current)** | **`1.7E7`** | Submit this prompt; re-run Blocks after paste |

---

## 11. QC self-check for Strategy C

| Flag | Mitigation |
|------|------------|
| DOMAIN_KNOWLEDGE_FLOOR | No geometric ring tutorial; solver supplies CFU recognition, plate-count math, countable-range criterion |
| COUNTING_IS_THE_TASK | Scored answer is viable count / Uncountable — not a raw tally endpoint |
| COUNTING_RULES_UNDEFINED | Distinct-center rule + exclude non-colony artifacts (without neutral ring SOP) |
| OPEN_ENDED | Short unambiguous GTFA; golden solution holds the trace |
| ANSWER_OR_SOLUTION_LEAK | Image description has no counts / no GTFA |
| FAILURE_BAR | Prefer wrong answers that show artifact↔colony misbinding; blanks only if Retry fails |
