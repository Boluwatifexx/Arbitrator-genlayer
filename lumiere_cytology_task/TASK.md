# Project Lumière — Cytology (Cervical Pap smear)

**Assay type: Cytology only.**  
**Image swap:** CRIC Slide **#97** (replaces #69 after duplicate-image reject).

---

## 1. Source fields

| Field | Value |
|-------|-------|
| **Assay type** | Cytology |
| **Subdomain** | Cell Biology |
| **Image file** | `cytology_image.jpg` |
| **Artifact copy** | `/opt/cursor/artifacts/cric_img_12229847_pap_smear.jpg` |
| **Dataset image** | CRIC Cervix Microscope Slide Image **#97** (`299abd9ed2593fa2a0bcd9ba0c73a576.png`) |
| **Image DOI** | https://doi.org/10.6084/m9.figshare.12229847 |
| **Classification data DOI** | https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0) |
| **Collection DOI** | https://doi.org/10.6084/m9.figshare.c.4960286.v2 |
| **Reference title** | Cric searchable image database as a public platform for conventional pap smear cytology data |
| **Where published** | Scientific Data, Volume 8, Article 151, 2021 |
| **Paper DOI** | https://doi.org/10.1038/s41597-021-00933-8 |
| **Dataset / image license** | **CC BY 4.0** |
| **Paper / reference license** | Creative Commons Attribution 4.0 International (CC BY 4.0) — Open Access |
| **Specs** | JPEG, 1376×1020, ~481 KB; no annotation overlays |

---

## 2. Prompt (paste) — thresholds added to settle borderline HSIL/LSIL calls

```
Image 1 is a field from a conventional cervical Pap smear stained with the Papanicolaou method. Restrict analysis to squamous epithelial cells. Take as the reference intermediate-type nuclear size the small dense nuclei in the abundant-cytoplasm large cells near the upper-right (about 85–91% across, 16–19% down).

Assign each squamous epithelial cell to at most one tally with these exclusive thresholds:
• HSIL if and only if (a) the nucleus occupies more than half of that cell’s visible area, AND (b) chromatin is dark and coarsely granular, AND (c) the nuclear contour is irregular (not smoothly round/oval).
• LSIL if and only if the cell fails the HSIL test, AND the nucleus occupies half or less of the cell’s visible area, AND at least one of: (d) nucleus clearly larger than the reference intermediate-type nuclei; or (e) a sharp pale perinuclear cavity with denser peripheral cytoplasm is present.
Exclude from both tallies any epithelial cell meeting neither set. Never double-count a cell.

When cells touch/overlap/cluster, count separate cells if distinct nuclei are resolvable; count as one cell only if multiple nuclei lie in one continuous cytoplasmic body without separable borders (multinucleated). Include a mononucleated cell only if its nucleus center is inside the frame (also if cut by the boundary under that rule). Include a multinucleated cell if and only if at least one nucleus center is inside the frame. Exclude inflammatory cells and non-epithelial debris.

Report (HSIL count)/(LSIL count) as a reduced fraction in lowest terms (for example, 3/5). Do not look up this image’s published annotations.
```

**Fix note:** Reviewer rejected unconstrained Bethesda calls as too borderline. Prompt now states exclusive visual thresholds (N:C half-area cut, chromatin, contour, reference nucleus, halo) plus overlap/frame conventions.

---

## 3. GTFA

**`12/5`**

Expert CRIC labels on this image: **HSIL = 12**, **LSIL = 5** (also present but not in the ratio: ASC-US 5, SCC 4, NILM 3).  
`12/5` is already in lowest terms.

---

## 4. Answer format

Text (case insensitive) — reduced fraction `a/b`

---

## 5. Golden solution

Step 1: Identify the preparation as a conventional cervical Pap smear (Papanicolaou stain). Restrict analysis to squamous epithelial cells; ignore tiny dark background objects.

Step 2: Fix the reference intermediate-type nuclear size from the small dense nuclei in the abundant-cytoplasm cells near the upper-right (about 85–91% across, 16–19% down).

Step 3: Apply overlap/frame rules: separate cells if distinct nuclei are resolvable; one cell if multinucleated (multiple nuclei in one continuous cytoplasmic body); mononucleated inclusion requires nucleus center in frame; multinucleated inclusion requires ≥1 nucleus center in frame.

Step 4: Apply the prompt’s exclusive HSIL threshold: nucleus occupies more than half of the cell’s visible area AND dark coarsely granular chromatin AND irregular nuclear contour. Expert application on this field yields **12** HSIL cells.

Step 5: Among remaining epithelial cells, apply the LSIL threshold: nucleus occupies half or less of the cell’s visible area AND (larger than the reference intermediate-type nuclei OR sharp pale perinuclear cavity with denser rim). Expert application yields **5** LSIL cells.

Step 6: Exclude cells meeting neither threshold. Never double-count.

Step 7: Ratio = 12/5 (already reduced).

Final Answer: 12/5

---

## 6. Image description

Paste `IMAGE_DESCRIPTION.txt` (visual-only per-cell inventory; no stain-name lecture beyond what’s already in the prompt context for the solver; no “inflammatory” label; no cell-class names; no counting-rule restatement; no GTFA).

---

## 7. Distractors (5)

1. `5/12` — inverted ratio  
2. `12/10` — folded ASC-US into LSIL  
3. `16/5` — counted SCC as HSIL  
4. `9/5` — HSIL undercount  
5. `4/5` — severe HSIL undercount  

**Note:** Distractors (incorrect answers only). Note that in testing we provided the model all potential answers, including the GTFA.

---

## 8. Model failure justification (template)

Error type: **Label–element or axis mis-binding**

The model produced an HSIL/LSIL ratio but bound Bethesda categories to the wrong cells. Expert CRIC labels on this field are **12 HSIL** and **5 LSIL** (`12/5`). Typical failures include over-calling ASC-US or SCC as HSIL/LSIL, missing HSIL cells at the crowded right/top edge, or under-calling LSIL in the lower-central mature orange-pink cells. Wrong membership counts propagate into an incorrect reduced fraction. This is morphologic label–element misbinding on the figure, not pure arithmetic.

---

## 9. Model tests (FAILURE_BAR MET on #97)

| Tester | HSIL | LSIL | Answer | vs GTFA `12/5` |
|--------|------|------|--------|----------------|
| Grok 4.7 (`grok-4.7-xhigh`) | 13 | 2 | `13/2` | ✗ fail |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | 4 | 5 | `4/5` | ✗ fail |

Failures are Bethesda category misbinding (HSIL over/under-call and LSIL miscount), not pure arithmetic.

---

## 10. References (if golden cites CRIC)

```
Rezende et al. Cric searchable image database as a public platform for conventional pap smear cytology data. Scientific Data 8, Article 151 (2021). https://doi.org/10.1038/s41597-021-00933-8

CRIC Cervix Microscope Slide Image #97: https://doi.org/10.6084/m9.figshare.12229847 (CC BY 4.0)

CRIC Cervix cell classifications (Bethesda labels used for HSIL=12, LSIL=5 on this image): https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0)
```
