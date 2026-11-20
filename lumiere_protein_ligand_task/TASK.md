# Project Lumière — Protein-ligand (Parkin Figure 5 SAR + R²)

**Assay:** Protein-ligand · **Subdomain:** Medicinal chemistry / computational docking  
**Image:** *Nat Commun* https://doi.org/10.1038/s41467-024-51889-3 Figure 5 (CC BY 4.0)

**Pivot:** ITC fold arithmetic PASSed both Groks. New endpoint: panel-c stereoisomer/R-group→EC50 binding + panel-d solid vs dashed R².

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` ← `raw/parkin/fig5.png` |
| DOI | https://doi.org/10.1038/s41467-024-51889-3 |
| License | CC BY 4.0 |
| Panels | c, d |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`100,0.31,0.78`**

(Panel c: BIO-2006661 (S), methylsulfonamide, EC50 \(0.10\,\mu\mathrm{M}=100\,\mathrm{nM}\). Panel d left: solid \(R^2=0.31\), dashed excl. # \(R^2=0.78\).)

---

## 4. Answer format

Text — `EC50_nM,R2_solid,R2_dashed`

---

## 5. Golden solution

Step 1 (vision): In panel c, the methylsulfonamide S-row is **BIO-2006661** with EC50 **0.10 µM**.

Step 2 (domain): \(0.10\times1000=100\,\mathrm{nM}\).

Step 3 (vision): Panel d left prints **R² = 0.31** on the solid line and **R² = 0.78** on the dashed (#-excluded) line — do not swap, and do not use the right-plot 0.90.

Step 4: Report `100,0.31,0.78`.

Final Answer: 100,0.31,0.78

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `100,0.78,0.31` — swapped solid/dashed R²  
2. `100,0.31,0.90` — used right-plot R² as dashed  
3. `10,0.31,0.78` — left EC50 in µM×10 or mis-converted 0.10  
4. `280,0.31,0.78` — picked difluoroethyl S (BIO-2008218, 0.28 µM)  
5. `100,0.31,0.31` — duplicated solid R²  

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding** (table row and/or regression-line R²)

Wrong EC50_nM and/or R² pair versus `100,0.31,0.78`.

---

## 9. Model tests

Local Grok-4.7-xhigh and Grok-4.6-xhigh both returned `100,0.31,0.78` (PASS). Holding dual-fail bar not yet met; further pivots required.

Prior local dual-PASS this session: Parkin ITC `150,2400`; DAT `2.7,2.4,F326A`; B⁰AT1 `4,3` / `JX238,27` / `3.44,4.22,JX225`; Polθ residue/mechanism/noncompetitive.

Retired PASS: Parkin ITC `150,2400`; DAT `2.7,2.4,F326A`; B⁰AT1; Polθ; A3AR; P2X1; mitapivat.

---

## 10. References

```
Activation of parkin by a molecular glue. Nature Communications (2024). https://doi.org/10.1038/s41467-024-51889-3 (CC BY 4.0)

Figure 5: https://doi.org/10.1038/s41467-024-51889-3
```
