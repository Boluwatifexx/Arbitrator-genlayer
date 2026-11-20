# Project Lumière — Protein-ligand (PK–mitapivat Figure 3)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Structural biology  
**Image:** MDPI *Crystals* 2024, 14, 441, Figure 3 (CC BY 4.0)

**Hardening:** Prior residue-list endpoint `K321,L363,Y400;F36` was solved by Grok-4.6. New endpoint requires backbone vs side-chain classification of the three direct H-bonds.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` |
| Paper | Nna-Mvondo et al., *Crystals* **14**, 441 (2024) |
| DOI | https://doi.org/10.3390/cryst14050441 |
| License | CC BY 4.0 |
| Panel | Left (2D interaction diagram) |

---

## 2. Prompt (paste)

See `PROMPT.txt` (~990 chars).

---

## 3. GTFA

**`2,1;K321`**

(L363 and Y400 = backbone; K321 side-chain \(\mathrm{NH_3^+}\))

---

## 4. Answer format

Text (case sensitive) — `n_bb,n_sc;Residue`

---

## 5. Golden solution

Step 1: Use only the left panel. Identify the three direct protein-MTPV hydrogen bonds (dark-blue dashed legend style). Exclude green hydrophobic arcs and the cyan \(\pi\)-\(\pi\) contact.

Step 2 (vision): The three H-bond partners are K321, L363, and Y400.

Step 3 (domain + vision): Read how each residue is drawn:
- L363 contacts MTPV via its backbone carbonyl oxygen → backbone
- Y400 contacts MTPV via its backbone NH → backbone
- K321 contacts MTPV via its terminal side-chain ammonium → side-chain

Step 4: \(n_{\mathrm{bb}}=2\), \(n_{\mathrm{sc}}=1\); side-chain residue = K321.

Step 5: Format.

Final Answer: 2,1;K321

---

## 6. Image description

Keep `IMAGE_DESCRIPTION.txt` (visual-only; does not state backbone/side-chain classifications).

---

## 7. Distractors (5)

1. `3,0;K321` — treated all three as backbone  
2. `1,2;K321` — swapped backbone/side-chain counts  
3. `2,1;Y400` — wrong side-chain residue  
4. `2,1;L363` — wrong side-chain residue  
5. `2,1;F36` — used \(\pi\)-\(\pi\) residue as side-chain H-bond donor  

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding** / interaction-role misread

The model misclassified which hydrogen-bond protein partners use backbone vs side-chain atoms as drawn, and/or named the wrong side-chain residue, so the token diverges from `2,1;K321`. Visual chemical-role binding on the left-panel diagram, not a pure format error.

---

## 9. Model tests

| Endpoint | Model | Answer | Result |
|----------|-------|--------|--------|
| `K321,L363,Y400;F36` (retired) | Grok-4.7 | `K321,L363,Y400;F36` | PASS (too easy) |
| `K321,L363,Y400;F36` (retired) | Grok-4.6 | `K321,L363,Y400;F36` | PASS (too easy) |
| `2,1;K321` (current) | Grok-4.7 / 4.6 | pending | — |

---

## 10. References

```
Nna-Mvondo et al. High Resolution Crystal Structure of the Pyruvate Kinase Tetramer in Complex with the Allosteric Activator Mitapivat/AG-348. Crystals 14, 441 (2024). https://doi.org/10.3390/cryst14050441 (CC BY 4.0)

Figure 3: https://doi.org/10.3390/cryst14050441
```
