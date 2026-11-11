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

## 2. Prompt (paste — unchanged structure)

```
Image 1 is a field from a conventional cervical Pap smear stained with the Papanicolaou method. Restrict analysis to squamous epithelial cells. Using Bethesda System interpretive criteria, identify every cell in the field that meets criteria for HSIL and every cell that meets criteria for LSIL. Compute the ratio (number of HSIL cells) / (number of LSIL cells) and report it as a single reduced fraction in lowest terms (for example, 3/5). When epithelial cells touch, overlap, or appear clustered, count them as separate cells if two or more distinct nuclei are resolvable; count as one cell only when multiple nuclei lie within a single continuous cytoplasmic body without separable cell borders (a multinucleated cell). For a mononucleated cell, include it only if its nucleus center lies inside the visible frame (including cells cut by the image boundary under that same rule). For a multinucleated cell, include it if and only if at least one of its nucleus centers lies inside the visible frame; otherwise exclude it. Exclude inflammatory cells and non-epithelial debris from both tallies. Do not use external look-up of this image's published annotations.
```

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

Step 1: Identify the preparation as a conventional cervical Pap smear (Papanicolaou stain). Restrict analysis to squamous epithelial cells; do not score the numerous tiny dark background objects as epithelial cells.

Step 2: Apply the prompt’s separation rules. When epithelial cells touch or overlap, count separate cells if distinct nuclei are resolvable. Count a multinucleated epithelial cell as one cell when multiple nuclei lie in a single continuous cytoplasmic body. Include a mononucleated cell only if its nucleus center is inside the frame; include a multinucleated cell if at least one nucleus center is inside the frame.

Step 3: Using Bethesda System criteria (solver-supplied), identify every LSIL squamous cell in the field — mature cells with relatively abundant cytoplasm plus nuclear enlargement and/or koilocytic perinuclear clearing. Expert enumeration on this image yields **5** LSIL cells (concentrated especially in the lower-central orange-pink group).

Step 4: Using Bethesda System criteria (solver-supplied), identify every HSIL squamous cell — less mature cells with markedly increased N:C ratio, hyperchromatic/coarse nuclei, often in blue-green cytoplasm (including near the top edge and right-sided crowded groups). Expert enumeration yields **12** HSIL cells.

Step 5: Do not include ASC-US, SCC, or NILM cells in either tally. Do not look up external published annotations while solving; the counts above are the image-grounded expert totals for this field.

Step 6: Ratio = 12 / 5. Already reduced (gcd=1) → **12/5**.

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

## 9. Model tests

Pending / fill when dual Grok results return on the new image.

---

## 10. References (if golden cites CRIC)

```
Rezende et al. Cric searchable image database as a public platform for conventional pap smear cytology data. Scientific Data 8, Article 151 (2021). https://doi.org/10.1038/s41597-021-00933-8

CRIC Cervix Microscope Slide Image #97: https://doi.org/10.6084/m9.figshare.12229847 (CC BY 4.0)

CRIC Cervix cell classifications (Bethesda labels used for HSIL=12, LSIL=5 on this image): https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0)
```
