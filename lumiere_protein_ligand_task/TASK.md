# Project Lumière — Protein-ligand (P2X1–NF449 Figure 5)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Structural biology  
**Image:** Oken et al., *Nat Commun* (2024), Figure 5 (CC BY 4.0)

**Pivot:** Fig 6 legend arithmetic (`K136A,39` and `S=34.7`) was solved by Grok-4.6. New endpoint uses Fig 5 dual-ligand occupancy × P2X trimer stoichiometry.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` (Fig 5) |
| DOI | https://doi.org/10.1038/s41467-024-52636-4 |
| License | CC BY 4.0 |

---

## 2. Prompt (paste)

See `PROMPT.txt` (~691 chars).

---

## 3. GTFA

**`2,6`**

(\(n_{\mathrm{site}}=2\) inner+outer NF449; 3 sites on the homotrimer → \(n_{\mathrm{receptor}}=6\))

---

## 4. Answer format

Ordered list / text — two integers `n_site,n_receptor`

---

## 5. Golden solution

Step 1 (vision): In panels B/C, two distinct NF449 molecules (tan and green carbon skeletons) occupy the highlighted competitive site → \(n_{\mathrm{site}}=2\).

Step 2 (domain): Canonical P2X receptors are homotrimers with three equivalent orthosteric/competitive sites around the extracellular vestibule.

Step 3: Same dual occupancy at each site → \(n_{\mathrm{receptor}}=2\times 3=6\).

Final Answer: 2,6

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `2,2` — counted one site only; missed trimer multiplicity  
2. `2,3` — treated one ligand per site after seeing dual ligands  
3. `1,3` — saw only one ligand per site  
4. `2,4` — wrong oligomer factor  
5. `3,6` — miscounted ligands per site as 3  

---

## 8. Model failure justification (template)

Error type: **Wrong object counted** / oligomer stoichiometry misbind

The model miscounted NF449 molecules at the highlighted site and/or failed to apply homotrimeric P2X site multiplicity, so the token diverges from `2,6`. Visual dual-ligand binding plus receptor-assembly domain knowledge—not a formatting typo.

---

## 9. Model tests

Retest pending on `2,6`.

Retired (dual PASS): mitapivat diagram endpoints; Fig 6 `K136A,39`; Fig 6 `S=34.7` (Grok-4.6 PASS; 4.7 pending when pivoted).

---

## 10. References

```
Oken et al. Cryo-EM structures of the human P2X1 receptor reveal subtype-specific architecture and antagonism by supramolecular ligand-binding. Nature Communications (2024). https://doi.org/10.1038/s41467-024-52636-4 (CC BY 4.0)

Figure 5 (dual NF449 supramolecular site): https://doi.org/10.1038/s41467-024-52636-4
```
