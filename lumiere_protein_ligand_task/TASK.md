# Project Lumière — Protein-ligand (P2X1–NF449 Figure 6)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Pharmacology  
**Image:** Oken et al., *Nat Commun* (2024), Figure 6 (CC BY 4.0)

**Pivot:** PK–mitapivat PoseEdit diagram was solved by both test models (residue list and backbone/side-chain endpoints). Switched to NF449 dose-response Figure 6 with a mutant-selection + fold-calculation endpoint.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` |
| DOI | https://doi.org/10.1038/s41467-024-52636-4 |
| License | CC BY 4.0 |
| Panels used | A and C |

---

## 2. Prompt (paste)

See `PROMPT.txt` (~802 chars).

---

## 3. GTFA

**`K136A,39`**

(Panel A: \(\mathrm{IC}_{50}\) K136A = 31 nM, WT = 0.80 nM → \(31/0.80=38.75\to 39\). Panel C: EC50 K136A = 1.9 µM vs WT 1.7 µM, within 2-fold. R292A fails the ATP EC50 criterion.)

---

## 4. Answer format

Text (case sensitive) — `Mutant,fold`

---

## 5. Golden solution

Step 1: Restrict to panels A and C. List single-point mutants present in both legends: R292A and K136A (N184A is A-only; R139A/K309A are not in A; double mutant excluded).

Step 2 (domain): Potency loss for an inhibitor means higher \(\mathrm{IC}_{50}\). Fold loss = \(\mathrm{IC}_{50,\mathrm{mut}}/\mathrm{IC}_{50,\mathrm{WT}}\). ATP \(\mathrm{EC}_{50}\) within 2-fold of WT means \(\mathrm{EC}_{50,\mathrm{mut}}/\mathrm{EC}_{50,\mathrm{WT}} \le 2\).

Step 3 (vision + calc):
- R292A: \(\mathrm{IC}_{50}\) fold \(25/0.80\approx 31\) (>10) but ATP \(\mathrm{EC}_{50}\) \(49/1.7\approx 29\) (not within 2-fold) → reject.
- K136A: \(\mathrm{IC}_{50}\) fold \(31/0.80=38.75\to 39\) (>10); ATP \(\mathrm{EC}_{50}\) \(1.9/1.7\approx 1.1\) (within 2-fold) → accept.

Step 4: Report `K136A,39`.

Final Answer: K136A,39

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `R292A,31` — meets IC50 fold but fails ATP EC50 filter  
2. `K136A,31` — wrong fold arithmetic (used R292A numerator)  
3. `N184A,6` — A-only mutant; fold ~6 is not >10  
4. `K136A,39` wait that's GTFA - use `R139A,81` — panel B mutant not in A  
5. `K136A/R139A,988` — double mutant excluded; wrong fold  

Fix distractor 4/5:
4. `R139A,81`  
5. `K136A,40` — off-by-one rounding  

---

## 8. Model failure justification (template)

Error type: **Label–element or axis mis-binding** / wrong panel or mutant filter

The model selected the wrong mutant and/or mis-read legend \(\mathrm{IC}_{50}\)/\(\mathrm{EC}_{50}\) values used in the fold test, so the token diverges from `K136A,39`. Failure is visual legend-to-curve binding and/or mis-application of the dual IC50/EC50 criteria on the figure.

---

## 9. Model tests

Retest pending on `K136A,39`.

Prior mitapivat diagram endpoints were dual-PASS (retired).

---

## 10. References

```
Oken et al. Cryo-EM structures of the human P2X1 receptor reveal subtype-specific architecture and antagonism by supramolecular ligand-binding. Nature Communications (2024). https://doi.org/10.1038/s41467-024-52636-4 (CC BY 4.0)

Figure 6 (NF449 IC50 / ATP EC50 dose-response panels): https://doi.org/10.1038/s41467-024-52636-4
```
