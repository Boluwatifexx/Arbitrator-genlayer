# Project Lumière — Cytology (CRIC #97)

**Assay:** Cytology · **Subdomain:** Cell Biology  
**Image:** CRIC Slide #97 (CC BY 4.0)

**Pivot (Justification Checker / borderline):** Free-field Bethesda tallies were rejected as borderline. New design:
1. **Locked 21-cell coordinate panel** (which cells to score).
2. **Morphometric Pattern A/B/C thresholds** (settle every borderline call).
3. **Domain step:** map A/B/C → low-grade SIL / high-grade SIL / invasive SCC via Bethesda knowledge (not stated as iff diagnostic names in the rules).
4. Report \(n_1,n_2,n_3,B\) with \(B=n_1+2n_2+3n_3\).

GTFA remains **`5,12,4,41`**.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `cytology_image.jpg` |
| Image DOI | https://doi.org/10.6084/m9.figshare.12229847 |
| Labels DOI | https://doi.org/10.6084/m9.figshare.12233156 |
| Paper | Scientific Data 8, Article 151 (2021) https://doi.org/10.1038/s41597-021-00933-8 |
| License | CC BY 4.0 |

---

## 2. Prompt (paste)

See `PROMPT.txt` (~1931 chars).

---

## 3. GTFA

**`5,12,4,41`**

---

## 4. Answer format

Ordered list — four integers, comma-separated, no spaces: \(n_1,n_2,n_3,B\)

---

## 5. Golden solution

Step 1: Restrict scoring to the 21 panel cells (nucleus centers nearest the listed coordinates). Ignore all other cells, inflammatory objects, and debris.

Step 2: Apply the stated morphometric Pattern A/B/C rules with reference nucleus (85,16) and chromatin anchor (54,61). First match wins.

Step 3 (pattern tally from the panel):
- Pattern C (high nuclear fraction + anchor chromatin + irregular contour + orangeophilic/keratinized): the four center-cluster cells at (54,61), (57,65), (54,69), (56,73) → \(n_C=4\).
- Pattern B (high nuclear fraction + anchor chromatin + irregular; cyanophilic/blue-green, not C): the twelve cells at (78,1), (81,3), (7,5), (84,7), (27,57), (80,59), (25,63), (74,64), (77,65), (67,73), (80,95), (83,96) → \(n_B=12\).
- Pattern A (nuclear fraction \(\le\) half with \(\ge 2\times\) enlargement or pale perinuclear clearing): the five cells at (59,50), (61,74), (60,78), (63,87), (66,94) → \(n_A=5\).

Step 4 (domain knowledge): Under Bethesda squamous morphology, Pattern A matches **low-grade SIL** (mature cytoplasm, \(\mathrm{N:C}\le 1/2\), enlargement/halo), Pattern B matches **high-grade SIL** (immature scant cyanophilic cytoplasm, high \(\mathrm{N:C}\), coarse dark chromatin, irregular membranes), and Pattern C matches **invasive squamous carcinoma** morphology (high-\(\mathrm{N:C}\) cells with orangeophilic keratinization and/or caudate/spindle keratinized shapes). Therefore in increasing severity order: \(n_1=n_A=5\), \(n_2=n_B=12\), \(n_3=n_C=4\).

Step 5: Compute
\[
B = n_1 + 2 n_2 + 3 n_3 = 5 + 2 \times 12 + 3 \times 4 = 5 + 24 + 12 = 41.
\]

Step 6: Format as required.

Final Answer: 5,12,4,41

---

## 6. Image description

Keep current `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `5,12,0,29` — missed Pattern C / failed carcinoma mapping  
2. `5,16,0,37` — lumped Pattern C into Pattern B  
3. `4,12,5,38` — reversed severity order (mapped C as low-grade, A as carcinoma)  
4. `0,12,4,36` — missed Pattern A  
5. `5,12,4,40` — correct tallies/mapping but arithmetic error on \(B\)  

---

## 8. Model failure justification (template)

Error type: **Wrong object counted / Label–element mis-binding** (or axis mis-binding if severity order reversed)

The model mis-assigned panel cells to Patterns A/B/C and/or mis-mapped patterns onto the Bethesda severity order, so the reported \(n_1,n_2,n_3,B\) diverges from `5,12,4,41`. Failure is visual pattern binding and/or grade-axis binding on the image, not a pure arithmetic slip after a correct survey (unless `5,12,4,40`).

---

## 9. Model tests

| Block | Model | Answer | vs GTFA `5,12,4,41` |
|-------|-------|--------|---------------------|
| 1 | Grok-4.7 xhigh | `13,2,2,23` | FAIL |
| 2 | Grok-4.6 xhigh | `9,8,4,37` | FAIL |

**Failure bar: MET** (both wrong via visual pattern / grade mis-binding on the locked panel).

**Block 1 justification (→ `13,2,2,23`):** Wrong object counted / label–element mis-binding. Mis-assigned panel cells among Patterns A/B/C (and/or severity order), yielding \(n_1=13\), \(n_2=2\), \(n_3=2\), \(B=23\) instead of `5,12,4,41`. Visual pattern-binding error on the locked panel, not a pure arithmetic slip after a correct survey.

**Block 2 justification (→ `9,8,4,37`):** Wrong object counted / label–element mis-binding. Mis-assigned panel cells among Patterns A/B/C (and/or severity order), yielding \(n_1=9\), \(n_2=8\), \(n_3=4\), \(B=37\) instead of `5,12,4,41`. Visual pattern-binding error on the locked panel.

---

## 10. References

```
Rezende et al. Cric searchable image database as a public platform for conventional pap smear cytology data. Scientific Data 8, Article 151 (2021). https://doi.org/10.1038/s41597-021-00933-8

CRIC Cervix Microscope Slide Image #97: https://doi.org/10.6084/m9.figshare.12229847 (CC BY 4.0)

CRIC Cervix cell classifications: https://doi.org/10.6084/m9.figshare.12233156 (CC BY 4.0)
```
