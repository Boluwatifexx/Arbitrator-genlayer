# Project Lumière — Cytology (Cervical Pap smear)

Paste-ready task package. **Assay type: Cytology only.**

---

## 1. Source fields

| Field | Value |
|-------|-------|
| **Assay type** | Cytology |
| **Image file** | `cytology_image.jpg` |
| **Artifact copy** | `/opt/cursor/artifacts/cric_img69_pap_smear.jpg` |
| **Dataset image** | CRIC Cervix Microscope Slide Image #69 (`eb47620da7f5e3594085fb3279b1904a.png`) |
| **Dataset** | CRIC searchable image database / CRIC Cervix collection |
| **Image DOI** | https://doi.org/10.6084/m9.figshare.12229733 |
| **Classification data DOI** | https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0) |
| **Collection DOI** | https://doi.org/10.6084/m9.figshare.c.4960286.v2 |
| **Paper** | Rezende et al., *Scientific Data* **8**, Article **151** (2021) — Cric searchable image database as a public platform for conventional pap smear cytology data. https://doi.org/10.1038/s41597-021-00933-8 |
| **Where published** | Scientific Data, Volume 8, Article 151, 2021 |
| **Dataset / image license** | **CC BY 4.0** |
| **Paper license** | CC BY 4.0 (Open Access) |
| **Image type** | Real conventional Pap smear photomicrograph (Papanicolaou stain); no annotation overlays on the task image |
| **Specs** | JPEG, 1376×1020, ~435 KB |

**Reference title:** Cric searchable image database as a public platform for conventional pap smear cytology data  
**Reference license text:** Creative Commons Attribution 4.0 International License (CC BY 4.0) — Open Access as stated by the publisher.

---

## 2. Prompt (paste)

```
Image 1 is a field from a conventional cervical Pap smear stained with the Papanicolaou method. Restrict analysis to squamous epithelial cells. Using Bethesda System interpretive criteria, identify every cell in the field that meets criteria for HSIL and every cell that meets criteria for LSIL. Compute the ratio (number of HSIL cells) / (number of LSIL cells) and report it as a single reduced fraction in lowest terms (for example, 3/5). When epithelial cells touch, overlap, or appear clustered, count them as separate cells if two or more distinct nuclei are resolvable; count as one cell only when multiple nuclei lie within a single continuous cytoplasmic body without separable cell borders (a multinucleated cell). For a mononucleated cell, include it only if its nucleus center lies inside the visible frame (including cells cut by the image boundary under that same rule). For a multinucleated cell, include it if and only if at least one of its nucleus centers lies inside the visible frame; otherwise exclude it. Exclude inflammatory cells and non-epithelial debris from both tallies. Do not use external look-up of this image's published annotations.
```

**Character count:** ~1180 (≤2000).

**Design notes:**
- **DOMAIN_KNOWLEDGE_FLOOR:** Solver must supply Bethesda HSIL vs LSIL morphology; prompt does not paste nuclear-size/halo/N:C criteria. Neutral “count large dark blobs / count pale blobs” does not recover the expert labels.
- **COUNTING_IS_THE_TASK:** Raw tallies are not the scored answer; they feed a **lesion-composition ratio** used in cytology field interpretation.
- **Implied MC:** Answer space is many possible reduced fractions (≫10).
- **Counting rules:** overlap/cluster separation by distinct nuclei; multinucleated = one cell; mono- vs multi-nucleated frame-boundary criteria; exclude inflam/debris.
- No pasted formula beyond the ratio definition; no annotation boxes on the image.

---

## 3. GTFA

**`10/17`**

Expert CRIC labels on this image: **HSIL = 10**, **LSIL = 17** (NILM = 5; no ASC-US/ASC-H/SCC on this slide file).  
`10/17` is already in lowest terms.

Accepted equivalents only if mathematically identical after reduction (e.g. not `10/17.0` prose). Prefer exact `10/17`.

---

## 4. Answer format

- **Text (case insensitive)** — reduced fraction `a/b`
- No units; no multi-sentence scored field

---

## 5. Golden solution

1. **Recognize the preparation.** Conventional Pap smear, Papanicolaou stain; squamous epithelial cells are the diagnostic objects.
2. **Apply Bethesda LSIL criteria** (solver-supplied): squamous cells with viral/koilocytic or low-grade nuclear change and relatively abundant cytoplasm — expert labels mark **17** such cells in this field.
3. **Apply Bethesda HSIL criteria** (solver-supplied): squamous cells with high-grade nuclear enlargement/hyperchromasia and increased N:C relative to LSIL/NILM — expert labels mark **10** such cells, concentrated especially in the mid-left / central cyanophilic clusters with enlarged dark nuclei.
4. **Separate clusters:** overlapping/touching epithelial cells with resolvable distinct nuclei count separately; a true multinucleated cell (multiple nuclei in one cytoplasmic body) counts once. **Exclude** neutrophils/inflammatory dots, debris, and NILM squamous cells from both tallies. **Frame rule:** mononucleated — nucleus center in frame; multinucleated — ≥1 nucleus center in frame.
5. **Ratio:** HSIL/LSIL = 10/17, already reduced (gcd=1).
6. **Report:** `10/17`.

**Final Answer:** `10/17`

---

## 6. Image description (≥200 words; descriptive only — paste from IMAGE_DESCRIPTION.txt)

See also `IMAGE_DESCRIPTION.txt` (≈1100 words). Paste-ready text:

```
The image is a rectangular color brightfield photomicrograph of a cellular smear on a pale, slightly filmy background. No scale bar, printed text, arrows, or digital overlays appear on the image. Across the field are many large cells with visible cytoplasm and nuclei, plus far more numerous tiny dark purple-to-black rounded or irregular objects that are much smaller than the large-cell nuclei and are scattered singly and in loose clumps through the background. Occasional small pale orange-tan disks also appear in the background.

Large cells are described below by approximate location (percent of image width from the left, percent of image height from the top), referring to the nucleus position. Cytoplasm color, nuclear size/shape/chromatin appearance, nuclear contour, nucleoli if visible, perinuclear clearing/halos, multinucleation, and overlaps are noted from what is visible.

Near the extreme upper-left corner (about 2% across, 1% down): a large cell with abundant cytoplasm and an enlarged nucleus relative to the smallest dense nuclei elsewhere; the cell is cut by the top and left edges.

Near the upper-right margin (about 83% across, 6% down): a cell with relatively scant cytoplasm and a large, dark, coarsely textured oval nucleus that fills much of the cell profile.

Near the upper-right margin farther right (about 91% across, 6% down): a large cell with more abundant cytoplasm and an enlarged, dark oval nucleus; neighboring cytoplasm from adjacent large cells overlaps this region.

Upper-right cluster, upper portion (about 69% across, 16% down): a large cell with abundant orange-pink cytoplasm and an enlarged oval nucleus that is darker than the tiniest pinpoint nuclei in other orange-pink cells nearby.

Upper-right cluster (about 73% across, 21% down): a large cell with abundant orange-pink cytoplasm, an enlarged dark nucleus, and a pale zone around the nucleus within the cytoplasm.

Upper-right / mid-right cluster (about 62% across, 25% down): a cell with blue-green cytoplasm, a large dark oval nucleus with coarse texture, and a thin cytoplasmic rim.

Upper-right cluster (about 75% across, 25% down): within one continuous orange-pink cytoplasmic body, two dark nuclei lie close together without a clear separating cell border between them (multinucleated appearance).

Upper-right cluster immediately adjacent (about 73% across, 26% down): a separate large orange-pink cell with one enlarged dark nucleus and overlapping borders with the multinucleated cytoplasmic body beside it.

Mid-left to center, upper part of a diagonal blue-green group (about 26% across, 29% down): a cell with blue-green cytoplasm, scant rim relative to nuclear size, and a large dark oval nucleus with coarse granular texture and a somewhat irregular contour.

Same diagonal group (about 37% across, 34% down): a cell with blue-green cytoplasm and a large dark oval nucleus with coarse chromatin texture; cytoplasm overlaps neighbors.

Same diagonal group (about 33% across, 37% down): a touching/overlapping neighbor with blue-green cytoplasm and a separate large dark nucleus that remains resolvable as its own nuclear center.

Same diagonal group (about 37% across, 44% down): a cell with blue-green cytoplasm, a large dark oval nucleus, and an irregular nuclear outline; cytoplasmic borders merge visually with adjacent cells.

Same diagonal group, lower left of the pair at the tail (about 40% across, 49% down): a smaller blue-green cell with a dark nucleus that is still large relative to the cytoplasmic rim, with an irregular nuclear contour.

Same diagonal group, lower right of that pair (about 45% across, 48% down): a rounded blue-green cell with a dark nucleus and a thin cytoplasmic rim; the two nuclei in this pair remain separately resolvable.

Mid-right (about 75% across, 42% down): a large cell with abundant orange-pink to mixed-tone cytoplasm and a very small, dense, dark, pinpoint nucleus.

Lower mid-left (about 19% across, 62% down): a large cell with abundant orange-pink cytoplasm, an enlarged dark nucleus, and a pale perinuclear zone with denser cytoplasm at the periphery.

Lower center-left (about 27% across, 66% down): a large cell with abundant orange-pink cytoplasm, a sharply outlined pale perinuclear cavity, denser peripheral cytoplasm, and an enlarged dark nucleus.

Lower center (about 43% across, 65% down): an elongated blue-green cell with a large dark oval nucleus oriented roughly horizontally and a high nuclear share of the cell outline.

Lower center-right (about 57% across, 64% down): a blue-green cell with elongated cytoplasm and a markedly enlarged, very dark, coarsely textured nucleus occupying much of the cell width.

Mid-right lower (about 84% across, 58% down): a large cell with abundant pale orange-pink cytoplasm and a very small dense dark nucleus.

Far right mid-height (about 89% across, 64% down): a large cell with abundant cytoplasm and a small dense dark nucleus; overlaps nearby large cells.

Lower-left group (about 26% across, 76% down): a large cell with abundant pink-orange cytoplasm and an enlarged, moderately dark oval nucleus.

Lower-left group (about 22% across, 82% down): an adjacent large cell with abundant pink-orange cytoplasm and an enlarged oval dark nucleus; cytoplasmic borders touch/overlap the cell above.

Lower mid (about 38% across, 80% down): a large cell with mixed blue-green to pink cytoplasm and an enlarged dark nucleus among overlapping neighbors.

Lower mid-right (about 61% across, 80% down): a blue-green cell with a dark oval nucleus and limited cytoplasmic rim relative to nuclear size.

Lower-right cluster (about 90% across, 80% down): a large orange-pink cell with an enlarged dark, somewhat smudged-looking nucleus; overlaps neighbors.

Lower-right cluster (about 90% across, 89% down): a large orange-pink cell with an enlarged dark nucleus and a pale zone near the nucleus.

Lower-right (about 80% across, 73% down): a large cell with abundant cytoplasm and a small dense dark nucleus.

Bottom-right (about 68% across, 94% down): a cell with orange-pink to mixed cytoplasm, an enlarged dark nucleus, and a relatively limited cytoplasmic rim compared with the large orange-pink sheets above it.

Bottom edge (about 45% across, 97% down): a large cell cut by the bottom border, with visible cytoplasm and an enlarged dark nucleus whose center remains in frame.

Bottom edge (about 53% across, 99% down): another large cell along the bottom margin with cytoplasm and a dark nucleus near the edge.

Bottom-left corner region (about 4% across, 95% down): a large cell with abundant orange-pink cytoplasm and a very small dense dark nucleus, partly near the frame edge.

Throughout, many additional tiny dark purple-black objects remain in the background between these large cells; they lack the broad cytoplasmic sheets of the large cells. In several regions, large-cell cytoplasm is stacked or overlapping so that more than one dark nuclear center is visible within crowded areas of the field.
```

*(Word count ≈ 1050. No stain/prep name, no “inflammatory”/cell-class labels, no HSIL/LSIL counts or ratio, no restated counting rules.)*

---

## 7. Distractors (5 incorrect) + testing note

| # | Distractor | Rationale |
|---|------------|-----------|
| 1 | `17/10` | Inverted ratio (LSIL/HSIL) — wrong lesion-composition framing. |
| 2 | `10/22` | Counted NILM (5) into the LSIL tally (17+5). |
| 3 | `15/17` | Over-called borderline/high N:C NILM or crowded cells as HSIL. |
| 4 | `5/17` | HSIL undercount — recognized only part of the high-grade population. |
| 5 | `27/5` | Collapsed HSIL+LSIL into one atypical tally over NILM. |

**Testing note:** Score against GTFA `10/17`. Do not place distractors in the model-facing prompt.

---

## 8. Model failure justification (template)

Error type: label–element / category misbinding on cytology morphology.

The model’s arithmetic reduction of a ratio may be fine, but the **image-derived HSIL and/or LSIL membership** is wrong. Expert CRIC Bethesda labels on this field give **10 HSIL** and **17 LSIL** cells (ratio `10/17`). Failure modes include: (a) mistaking LSIL/koilocytic cells for HSIL or the reverse; (b) folding NILM squamous cells into LSIL; (c) missing HSIL cells inside crowded cyanophilic clusters; (d) counting inflammatory nuclei as epithelial atypia. These are **morphologic category errors in reading the smear**, not pure arithmetic. The wrong tallies propagate into a wrong reduced fraction instead of `10/17`.

---

## 9. Model tests (FAILURE_BAR MET)

Closed-book; image attached; no CSV/annotation lookup.

| Tester | HSIL | LSIL | Answer | vs GTFA `10/17` |
|--------|------|------|--------|-----------------|
| Grok 4.7 (`grok-4.7-xhigh`) | 3 | 7 | `3/7` | ✗ fail |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | 4 | 3 | `4/3` | ✗ fail |

**FAILURE_BAR:** Both failures are **Bethesda morphologic category misbinding** (wrong HSIL/LSIL membership on the smear), which then yields a wrong ratio — not pure arithmetic on a correct tally.
