# Project Lumière — Protein-ligand (P2X1–NF449 Figure 5)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Structural biology  
**Image:** Oken et al., *Nat Commun* (2024), Figure 5 (CC BY 4.0)

**Pivot:** Stoichiometry `2,6` and Fig 6 legend arithmetic were dual-PASS. New endpoint binds the labeled \(2.8\,\text{\AA}\) contact to its residue and sums R139 distances in panel F.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` (Fig 5) |
| DOI | https://doi.org/10.1038/s41467-024-52636-4 |
| License | CC BY 4.0 |
| Panel | F |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`K136,8.9`**

(Panel F: \(2.8\,\text{\AA}\) contact is K136; R139 distances \(3.3+2.7+2.9=8.9\))

---

## 4. Answer format

Text (case sensitive) — `Res,sum`

---

## 5. Golden solution

Step 1: Restrict to panel F.

Step 2 (vision): Locate the dashed contact labeled \(2.8\); the protein partner is **K136**.

Step 3 (vision): Read the three dashed contacts from **R139** labeled \(3.3\), \(2.7\), and \(2.9\).

Step 4: Sum \(3.3+2.7+2.9=8.9\). Do not include the K136 \(2.8\) distance in the R139 sum.

Step 5: Format `K136,8.9`.

Final Answer: K136,8.9

---

## 6. Image description

Keep `IMAGE_DESCRIPTION.txt` (describes panel F distances without stating which residue owns \(2.8\)).

---

## 7. Distractors (5)

1. `K136,11.7` — included the \(2.8\) K136 distance in the R139 sum  
2. `R139,8.9` — swapped residue identity for the \(2.8\) contact  
3. `K136,6.0` — summed only two of three R139 distances  
4. `K136,8.8` — arithmetic/rounding error  
5. `N184,8.9` — wrong residue for the \(2.8\) contact  

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding**

The model bound the wrong residue to the \(2.8\,\text{\AA}\) label and/or summed the wrong set of angstrom labels for R139, so the token diverges from `K136,8.9`. Visual label-to-residue binding on panel F.

---

## 9. Model tests

Retest pending on `K136,8.9`.

Retired dual-PASS: mitapivat diagram; Fig6 `K136A,39`; Fig6 `S=34.7`; Fig5 stoichiometry `2,6`.

---

## 10. References

```
Oken et al. Cryo-EM structures of the human P2X1 receptor reveal subtype-specific architecture and antagonism by supramolecular ligand-binding. Nature Communications (2024). https://doi.org/10.1038/s41467-024-52636-4 (CC BY 4.0)

Figure 5: https://doi.org/10.1038/s41467-024-52636-4
```
