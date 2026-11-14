# Project Lumière — Cytology (CRIC #97)

**Assay:** Cytology · **Subdomain:** Cell Biology  
**Image:** CRIC Slide #97 (CC BY 4.0) — same file as current `cytology_image.jpg`

**Science Judge pivot:** Dropped morphometric HSIL/LSIL feature maps + count-ratio endpoint (MAPPING_STATED / COUNT_IS_THE_TASK / SOLUTION_HAS_NO_DOMAIN_STEP). New endpoint = **most severe Bethesda squamous category present** (solver supplies Bethesda morphology + severity hierarchy).

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `cytology_image.jpg` / `/opt/cursor/artifacts/cric_img_12229847_pap_smear.jpg` |
| Image DOI | https://doi.org/10.6084/m9.figshare.12229847 |
| Labels DOI | https://doi.org/10.6084/m9.figshare.12233156 |
| Paper | Scientific Data 8, Article 151 (2021) https://doi.org/10.1038/s41597-021-00933-8 |
| License | CC BY 4.0 |

Expert labels on this field: SCC 4, HSIL 12, LSIL 5, ASC-US 5, NILM 3 → **most severe = SCC**.

---

## 2. Prompt (paste)

```
Image 1 is a field from a conventional cervical Pap smear stained with the Papanicolaou method. Restrict analysis to squamous epithelial cells. Using standard Bethesda System interpretive criteria as applied in cervical cytology practice, determine the most severe squamous diagnostic category present in this field. A category is present if at least one squamous epithelial cell meets standard Bethesda criteria for that category. When epithelial cells touch, overlap, or appear clustered, treat them as separate cells if two or more distinct nuclei are resolvable; treat as one cell only if multiple nuclei lie in one continuous cytoplasmic body without separable borders (multinucleated). Include a mononucleated cell only if its nucleus center is inside the frame (also if cut by the boundary under that rule). Include a multinucleated cell if and only if \(\ge 1\) nucleus center is inside the frame. Exclude inflammatory cells and non-epithelial debris. Do not invent ad hoc morphometric cutoffs in place of Bethesda criteria, and do not look up this image's published annotations. Report the standard Bethesda abbreviation only (for example, LSIL).
```

(~1155 chars)

---

## 3. GTFA

**`SCC`**

Accepted equivalents (normalize): `SCC`, `scc`, `Squamous cell carcinoma` → prefer **`SCC`**.

---

## 4. Answer format

Text (case insensitive) — Bethesda abbreviation

---

## 5. Golden solution

Step 1: Recognize a conventional Pap-stained cervical cytology field. Restrict scoring to squamous epithelial cells; ignore tiny dark inflammatory/debris objects.

Step 2: Apply inclusion rules: separate overlapping cells when distinct nuclei are resolvable; one cell if multinucleated (multiple nuclei in one continuous cytoplasmic body); mononucleated cells need nucleus center in frame; multinucleated cells need \(\ge 1\) nucleus center in frame.

Step 3: Using **solver-supplied** Bethesda morphology (not ad hoc morphometrics), survey squamous cells for categories present. This field contains cells meeting criteria for NILM, ASC-US, LSIL, HSIL, and SCC (expert CRIC labels: 3 / 5 / 5 / 12 / 4 respectively).

Step 4: Apply the **solver-supplied** Bethesda severity hierarchy for squamous diagnoses. In standard practice the severity order is:  
SCC > HSIL > ASC-H > LSIL > ASC-US > NILM (Negative for intraepithelial lesion).

Step 5: Because at least one SCC cell is present, the most severe squamous category in the field is **SCC**.

Final Answer: SCC

---

## 6. Image description

Keep current `IMAGE_DESCRIPTION.txt` (visual-only; no category spoilers).

---

## 7. Distractors (5)

1. `HSIL` — saw high-grade cells but missed invasive/SCC-criteria cells  
2. `LSIL` — focused on koilocyte/mature atypical cells only  
3. `ASC-H` — intermediate atypical call, not most severe present  
4. `ASC-US` — under-called atypical squamous cells  
5. `NILM` — treated field as negative despite atypical/malignant cells  

**Note:** Distractors (incorrect answers only). Note that in testing we provided the model all potential answers, including the GTFA.

---

## 8. Model failure justification (template)

Error type: **Label–element or axis mis-binding**

The model inspected the smear but bound the wrong Bethesda severity label to the field. Expert CRIC labels include SCC cells, so the most severe squamous category is **SCC**. Reporting `HSIL` (or lower) means high-grade/other atypical cells were recognized while SCC-criteria cells were missed or mislabeled as HSIL — a category-to-object misbinding on the image, not a failure of the severity ladder alone after a correct cell read.

---

## 9. Model tests

| Block | Model | Answer | vs GTFA `SCC` |
|-------|-------|--------|---------------|
| 2 | Grok-4.6 xhigh | `LSIL` | FAIL (under-called; missed SCC/HSIL) |
| 1 | Grok-4.7 xhigh | pending | — |

**Failure justification (Block 2 → LSIL):** Label–element mis-binding. The model bound the field to LSIL (koilocyte/mature atypical morphology) while expert labels include SCC cells; most severe category is SCC. Image misread of the highest-grade cells, not a severity-ladder failure after a correct cell survey.

---

## 10. References

```
Rezende et al. Cric searchable image database as a public platform for conventional pap smear cytology data. Scientific Data 8, Article 151 (2021). https://doi.org/10.1038/s41597-021-00933-8

CRIC Cervix Microscope Slide Image #97: https://doi.org/10.6084/m9.figshare.12229847 (CC BY 4.0)

CRIC Cervix cell classifications (SCC present → most severe = SCC): https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0)
```
