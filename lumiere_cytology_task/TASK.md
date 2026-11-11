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
Image 1 is a field from a conventional cervical Pap smear stained with the Papanicolaou method. Restrict analysis to squamous epithelial cells. Using Bethesda System interpretive criteria, identify every cell in the field that meets criteria for HSIL and every cell that meets criteria for LSIL. Compute the ratio (number of HSIL cells) / (number of LSIL cells) and report it as a single reduced fraction in lowest terms (for example, 3/5). Count a cell only if its nucleus center lies inside the visible frame; include cells cut by the image boundary when the nucleus center remains inside the frame; exclude inflammatory cells and non-epithelial debris from both tallies. Do not use external look-up of this image's published annotations.
```

**Character count:** ~740 (≤2000).

**Design notes:**
- **DOMAIN_KNOWLEDGE_FLOOR:** Solver must supply Bethesda HSIL vs LSIL morphology; prompt does not paste nuclear-size/halo/N:C criteria. Neutral “count large dark blobs / count pale blobs” does not recover the expert labels.
- **COUNTING_IS_THE_TASK:** Raw tallies are not the scored answer; they feed a **lesion-composition ratio** used in cytology field interpretation.
- **Implied MC:** Answer space is many possible reduced fractions (≫10).
- **Counting rules:** nucleus-center-in-frame; partial/edge-cut handled; exclude inflam/debris.
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
4. **Exclude** neutrophils/inflammatory dots, debris, and NILM squamous cells from both tallies. Include boundary-cut epithelial cells only if the nucleus center is inside the frame.
5. **Ratio:** HSIL/LSIL = 10/17, already reduced (gcd=1).
6. **Report:** `10/17`.

**Final Answer:** `10/17`

---

## 6. Image description (≥200 words; no answer leak)

```
The image is a rectangular color photomicrograph of a conventional cervical cytology smear stained with the Papanicolaou method. The field is crowded with cells against a pale, slightly filmy background. No scale bar, printed label, arrows, or digital overlays appear on the image.

Large squamous epithelial cells dominate the mid and lower portions of the field. Many have abundant cytoplasm that stains orange-pink or cyan-blue and relatively small dense nuclei; these are scattered singly and in loose sheets, including several large orange polygonal cells toward the right side. Elsewhere, especially toward the center-left, epithelial cells appear more crowded and overlapping, with cytoplasm that is more cyanophilic and with nuclei that look larger and darker than those of the orange superficial-type cells.

Throughout the background are numerous much smaller dark-stained inflammatory cells, visible as tiny purple-black dots, sometimes in loose clusters and sometimes adjacent to the large epithelial cells. These small cells are clearly smaller than epithelial nuclei.

Cell density is uneven: the upper-left region is relatively emptier, showing more background film, whereas the central and lower regions are more cellular. Some epithelial cells sit near the image edges and may be only partially included in the frame. Overlap of epithelial cytoplasm is common in the denser clusters, so nuclear outlines must be traced carefully to decide which nuclei belong to separate epithelial cells.

Lighting is brightfield and fairly even, with the stain providing the main contrast between cytoplasm, nuclei, and background. The overall appearance is that of a real Pap-stained smear photograph rather than a schematic diagram.
```

*(Word count ≈ 260. No HSIL/LSIL counts; no ratio.)*

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
