# Project Lumière — Cytology (CRIC #97)

**Assay:** Cytology · **Subdomain:** Cell Biology  
**Image:** CRIC Slide #97 (CC BY 4.0) — same file as current `cytology_image.jpg`

**Pivot (Science Judge + Prompt Checker + platform dual-pass):**
- Dropped morphometric HSIL/LSIL feature maps (MAPPING_STATED).
- Dropped bare HSIL/LSIL count ratio (COUNT_IS_THE_TASK).
- Dropped most-severe abbreviation-only endpoint (OPEN_ENDED; platform models both returned `SCC`).
- New endpoint: Bethesda-classified tallies + lesion burden index \(B\), reported as verifiable four-integer string.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `cytology_image.jpg` |
| Image DOI | https://doi.org/10.6084/m9.figshare.12229847 |
| Labels DOI | https://doi.org/10.6084/m9.figshare.12233156 |
| Paper | Scientific Data 8, Article 151 (2021) https://doi.org/10.1038/s41597-021-00933-8 |
| License | CC BY 4.0 |

Expert labels: LSIL 5, HSIL 12, SCC 4, ASC-US 5, NILM 3 → \(B = 5 + 2\cdot12 + 3\cdot4 = 41\).

---

## 2. Prompt (paste)

```
Image 1 is a field from a conventional cervical Pap smear stained with the Papanicolaou method. Restrict analysis to squamous epithelial cells.

Using standard Bethesda System interpretive criteria as applied in cervical cytology practice (do not invent ad hoc morphometric cutoffs; do not look up this image's published annotations), tally three mutually exclusive counts among included squamous epithelial cells:
- \(N_{\mathrm{LSIL}}\): cells meeting definitive LSIL criteria
- \(N_{\mathrm{HSIL}}\): cells meeting definitive HSIL criteria
- \(N_{\mathrm{SCC}}\): cells meeting definitive squamous cell carcinoma (SCC) criteria

Exclude ASC-US, ASC-H, NILM, inflammatory cells, and non-epithelial debris from all three tallies. Assign each included cell to at most one tally (never double-count). When a cell is equivocal between an ASC category and a definitive SIL/SCC category, exclude it from all three tallies.

Touch/overlap/cluster: separate cells if distinct nuclei are resolvable; one cell if multiple nuclei lie in one continuous cytoplasmic body without separable borders (multinucleated). Include a mononucleated cell only if its nucleus center is inside the frame (also if cut by the boundary under that rule). Include a multinucleated cell if and only if \(\ge 1\) nucleus center is inside the frame. For a multinucleated cell, classify using only its largest nucleus against the whole cell's cytoplasm.

Define the squamous lesion burden index
\[ B = N_{\mathrm{LSIL}} + 2 N_{\mathrm{HSIL}} + 3 N_{\mathrm{SCC}}. \]

Report four integers in this exact order, comma-separated with no spaces: \(N_{\mathrm{LSIL}},N_{\mathrm{HSIL}},N_{\mathrm{SCC}},B\).
```

(~1669 chars)

---

## 3. GTFA

**`5,12,4,41`**

---

## 4. Answer format

Text — four integers, comma-separated, no spaces: `N_LSIL,N_HSIL,N_SCC,B`

---

## 5. Golden solution

Step 1: Recognize a conventional Pap-stained cervical cytology field. Restrict scoring to squamous epithelial cells; ignore tiny dark inflammatory/debris objects.

Step 2: Apply inclusion rules for frame, overlap, and multinucleation as stated in the prompt.

Step 3 (domain): Apply **solver-supplied** Bethesda morphology to assign each included squamous cell to at most one of definitive LSIL, HSIL, or SCC. Exclude ASC-US/ASC-H/NILM and any ASC-vs-SIL equivocal cells. Do **not** use ad hoc morphometric cutoffs in place of Bethesda criteria.

Step 4: From expert-consistent field reading of this image: \(N_{\mathrm{LSIL}}=5\), \(N_{\mathrm{HSIL}}=12\), \(N_{\mathrm{SCC}}=4\).

Step 5: Compute \(B = 5 + 2\cdot12 + 3\cdot4 = 5 + 24 + 12 = 41\).

Step 6: Format as required: `5,12,4,41`.

Final Answer: 5,12,4,41

---

## 6. Image description

Keep current `IMAGE_DESCRIPTION.txt` (visual-only; no category spoilers).

---

## 7. Distractors (5)

1. `5,12,0,29` — missed all SCC; treated high-grade malignant cells as non-SCC or excluded  
2. `5,16,0,37` — lumped SCC into HSIL  
3. `10,12,4,46` — counted ASC-US as LSIL  
4. `0,12,4,36` — missed LSIL / koilocyte-class cells  
5. `5,12,4,40` — correct tallies but arithmetic error on \(B\)  

**Note:** Distractors (incorrect answers only). Note that in testing we provided the model all potential answers, including the GTFA.

---

## 8. Model failure justification (template)

Error type: **Wrong object counted / Label–element mis-binding**

The model misclassified squamous cells under Bethesda criteria (wrong \(N_{\mathrm{LSIL}}\), \(N_{\mathrm{HSIL}}\), and/or \(N_{\mathrm{SCC}}\)), so the burden index \(B\) and the four-integer report diverge from the expert field reading `5,12,4,41`. Failure is visual category-to-cell binding, not a pure arithmetic slip after a correct survey (unless the output matches distractor `5,12,4,40`).

---

## 9. Model tests

### Platform (authoritative)

| Block | Answer | vs GTFA `5,12,4,41` |
|-------|--------|---------------------|
| 1 | `0,8,2,22` | FAIL |
| 2 | `0,10,2,26` | FAIL |

**Failure bar: MET.**

**Block 1 justification (→ `0,8,2,22`):** Wrong object counted / label–element mis-binding. The model set \(N_{\mathrm{LSIL}}=0\) (missed definitive koilocyte/LSIL cells), under-counted HSIL as 8 (vs 12), and under-counted SCC as 2 (vs 4), yielding \(B=22\) instead of 41. Visual misclassification of squamous cells on the image; arithmetic on its own (wrong) tallies was internally consistent.

**Block 2 justification (→ `0,10,2,26`):** Wrong object counted / label–element mis-binding. Same pattern: \(N_{\mathrm{LSIL}}=0\), HSIL under-called as 10, SCC under-called as 2, so \(B=26\). Missed LSIL cells and under-bound high-grade/malignant cells to the expert categories; not a pure formula error after a correct cell survey.

### Local pre-checks (non-platform)

| Model | Answer |
|-------|--------|
| Grok-4.7 xhigh | `1,1,0,3` |
| Grok-4.6 xhigh | `4,0,0,4` |

---

## 10. References

```
Rezende et al. Cric searchable image database as a public platform for conventional pap smear cytology data. Scientific Data 8, Article 151 (2021). https://doi.org/10.1038/s41597-021-00933-8

CRIC Cervix Microscope Slide Image #97: https://doi.org/10.6084/m9.figshare.12229847 (CC BY 4.0)

CRIC Cervix cell classifications (LSIL=5, HSIL=12, SCC=4 → B=41): https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0)
```
