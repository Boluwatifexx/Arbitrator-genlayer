# Project Lumière — Protein-ligand (Polθ–AB25583 Figure 1)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Enzymology  
**Image:** *Nat Commun* https://doi.org/10.1038/s41467-024-51351-4 Figure 1 (CC BY 4.0)

**Pivot:** Structure-label OCR endpoints kept PASSing. New endpoint uses panel d ATP-dependence to classify competitive vs noncompetitive inhibition.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` |
| DOI | https://doi.org/10.1038/s41467-024-51351-4 |
| License | CC BY 4.0 |
| Panel | d |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`6,noncompetitive`**

(ATP legend: 100, 400, 600 µM → ratio \(600/100=6\); overlaid curves ⇒ noncompetitive w.r.t. ATP)

---

## 4. Answer format

Text (case insensitive on class) — `ratio,class`

---

## 5. Golden solution

Step 1: Restrict to panel d.

Step 2 (vision): Legend ATP concentrations are 100, 400, and 600 µM. Ratio \(600/100=6\).

Step 3 (domain + vision): The three AB25583 inhibition curves nearly superimpose across a 6-fold ATP range, so potency does not drop as [ATP] rises. That pattern rejects classical competitive ATP-site inhibition and matches **noncompetitive** (allosteric) inhibition w.r.t. ATP.

Step 4: Report `6,noncompetitive`.

Final Answer: 6,noncompetitive

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `6,competitive` — wrong mechanism class  
2. `4,noncompetitive` — used 400/100  
3. `6,uncompetitive` — wrong class synonym not requested  
4. `3,noncompetitive` — counted conditions instead of concentration ratio  
5. `600,noncompetitive` — reported highest [ATP] instead of the ratio  

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding** / mechanism misclassification

Wrong ATP concentration ratio from panel d legend and/or misclassified competitive vs noncompetitive behavior from the overlaid curves versus `6,noncompetitive`.

---

## 9. Model tests

Retest pending.

Retired PASS: A3AR `F168,3` (Grok-4.6); P2X1 distance/stoichiometry; mitapivat PoseEdit; Fig6 arithmetic.

---

## 10. References

```
Structural basis for a Polθ helicase small-molecule inhibitor revealed by cryo-EM. Nature Communications (2024). https://doi.org/10.1038/s41467-024-51351-4 (CC BY 4.0)

Figure 1: https://doi.org/10.1038/s41467-024-51351-4
```
