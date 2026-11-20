# Project Lumière — Protein-ligand (A3AR–CF101 Figure 2)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / GPCR structural biology  
**Image:** *Nat Commun* (2024) https://doi.org/10.1038/s41467-024-47207-6 Figure 2 (CC BY 4.0)

**Pivot:** P2X1 labeled-distance endpoints kept PASSing. New endpoint: adenine π-stack residue + TM6 Ballesteros-Weinstein count on panel a.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` |
| DOI | https://doi.org/10.1038/s41467-024-47207-6 |
| License | CC BY 4.0 |
| Panel | a |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`F168,3`**

(π-stack = F168; TM6 labels W243, L246, N250)

---

## 4. Answer format

Text (case sensitive) — `Res,count`

---

## 5. Golden solution

Step 1: Restrict to panel a (CF101 / orange ligand).

Step 2 (domain + vision): Adenosine-receptor nucleoside agonists place the adenine ring in a π-stack on ECL2 position 45.52. In panel a that residue is **F168**.

Step 3 (vision): Count labeled contacting residues whose Ballesteros-Weinstein index is on TM6 (integer part 6): **W243**, **L246**, **N250** → **3**.

Step 4: Format `F168,3`.

Final Answer: F168,3

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `F168,4` — overcount TM6  
2. `W243,3` — Trp6.48 mistaken for adenine π-stack  
3. `F168,2` — undercount TM6  
4. `H272,3` — TM7 His mistaken for π-stack  
5. `F168,45` — used BW number as the count  

---

## 8. Model failure justification (template)

Error type: **Label–element or axis mis-binding**

Wrong π-stack residue and/or wrong TM6 label count on panel a versus `F168,3`.

---

## 9. Model tests

Retest pending on `F168,3`.

---

## 10. References

```
Cryo-EM structures of adenosine receptor A3AR bound to selective agonists. Nature Communications (2024). https://doi.org/10.1038/s41467-024-47207-6 (CC BY 4.0)

Figure 2: https://doi.org/10.1038/s41467-024-47207-6
```
