# Project Lumière — Protein-ligand (PK–mitapivat Figure 3)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Structural biology  
**Image:** MDPI *Crystals* 2024, 14, 441, Figure 3 (CC BY 4.0)

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` / `/opt/cursor/artifacts/pk_mitapivat_figure3.jpg` |
| Paper | Nna-Mvondo et al., *Crystals* **14**, 441 (2024) |
| DOI | https://doi.org/10.3390/cryst14050441 |
| License | CC BY 4.0 |
| Panel used for GTFA | Left (2D interaction diagram) |

---

## 2. Prompt (paste)

```
Image 1 shows interactions between human pyruvate kinase and mitapivat (MTPV). Use only the left panel (the 2D ligand-interaction diagram that includes an interaction-type legend). Using standard structural-biology definitions of hydrogen bonds, \(\pi\)-\(\pi\) stacking, and hydrophobic contacts as encoded by that legend's line styles, identify every protein residue that forms a direct hydrogen bond with MTPV. Report those residues in ascending sequence-number order as one-letter code plus residue number, comma-separated with no spaces (example: A12,T40). Separately identify the protein residue that forms the labeled \(\pi\)-\(\pi\) stacking interaction with MTPV and append it after a semicolon with no spaces. Final format: HbondResList;PiRes (example: A12,T40;F8). Do not use the right-hand 3D ribbon/surface panel. Do not count hydrophobic contacts as hydrogen bonds. Do not look up published annotations or PDB entries for this figure.
```

(~948 chars)

---

## 3. GTFA

**`K321,L363,Y400;F36`**

---

## 4. Answer format

Text (case sensitive for residue letters) — structured token `HbondResList;PiRes`

---

## 5. Golden solution

Step 1: Restrict reading to the left panel (2D diagram + legend). Ignore the right-hand ribbon/surface panel and its water-mediated dashed network.

Step 2 (domain): Using structural-biology interaction classes, map the legend styles: dark-blue dashed = hydrogen bond; cyan dashed with dots = \(\pi\)-\(\pi\) stacking; green arcs = hydrophobic contacts. Only the first class enters the H-bond list; only the second identifies the \(\pi\)-\(\pi\) partner.

Step 3 (vision): Three dark-blue dashed contacts link MTPV to protein residues labeled **K321**, **L363**, and **Y400** (each distance printed 2.7). Green hydrophobic arcs at F36/L404 are not hydrogen bonds.

Step 4: Sort H-bond residues by ascending sequence number: K321, L363, Y400.

Step 5 (vision + domain): The cyan dashed \(\pi\)-\(\pi\) contact (labeled 4.8) joins MTPV’s central aromatic ring to **F36**.

Step 6: Format as required.

Final Answer: K321,L363,Y400;F36

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt` (≥200 words, visual-only).

---

## 7. Distractors (5)

1. `L363,Y400;F36` — missed K321 H-bond  
2. `K321,L363,Y400,L404;F36` — counted hydrophobic L404 as H-bond  
3. `K321,L363,Y400;L404` — wrong \(\pi\)-\(\pi\) partner  
4. `Y400,L363,K321;F36` — correct set but not ascending sequence order  
5. `K321,L363,Y400;F36,L404` — appended hydrophobic contact into PiRes  

---

## 8. Model failure justification (template)

Error type: **Label–element or axis mis-binding** / wrong interaction class

The model mis-assigned residues to hydrogen-bond vs hydrophobic vs \(\pi\)-\(\pi\) classes on the left-panel diagram, and/or failed ascending sequence ordering, so the token diverges from `K321,L363,Y400;F36`. Failure is visual interaction-to-residue binding on the figure, not a formatting typo after a correct read.

---

## 9. Model tests

Pending dual closed-book vision retest.

---

## 10. References

```
Nna-Mvondo et al. High Resolution Crystal Structure of the Pyruvate Kinase Tetramer in Complex with the Allosteric Activator Mitapivat/AG-348. Crystals 14, 441 (2024). https://doi.org/10.3390/cryst14050441 (CC BY 4.0)

Figure 3 (PK–MTPV interaction diagram): https://doi.org/10.3390/cryst14050441
```
