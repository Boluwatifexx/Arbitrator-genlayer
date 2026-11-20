# Project Lumière — Protein-ligand (P2X1–NF449 Figure 5)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Structural biology  
**Image:** Oken et al., *Nat Commun* (2024), Figure 5 (CC BY 4.0)

**Pivot:** Panel F `K136,8.9` was solved by Grok-4.6. New endpoint uses panel H: residue contacting both NF449 colors + sum of those two labeled distances.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` (Fig 5) |
| DOI | https://doi.org/10.1038/s41467-024-52636-4 |
| License | CC BY 4.0 |
| Panel | H |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`R292,6.3`**

(Panel H: R292 contacts green NF449 at \(3.0\,\text{\AA}\) and tan NF449 at \(3.3\,\text{\AA}\); sum \(6.3\))

---

## 4. Answer format

Text (case sensitive) — `Res,sum`

---

## 5. Golden solution

Step 1: Restrict to panel H (\(180^{\circ}\) rotated companion of panel G).

Step 2 (vision + domain): Find the residue with dashed contacts to both ligand carbon colors (green and tan). That residue is **R292** (bridges inner and outer NF449).

Step 3: Read the two labeled distances from R292: \(3.0\) (green) and \(3.3\) (tan).

Step 4: Sum \(3.0+3.3=6.3\).

Final Answer: R292,6.3

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt` (must not assign the dual-contact residue or the \(3.0\)/\(3.3\) pairing).

---

## 7. Distractors (5)

1. `R139,8.9` — R139 contacts only one NF449 color (three distances on green)  
2. `R292,6.0` — misread distances  
3. `K309,6.3` — wrong residue  
4. `R292,5.9` — arithmetic error  
5. `R292,3.3` — reported a single distance instead of the sum

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding**

The model selected the wrong residue as the dual-ligand contact and/or summed the wrong angstrom labels in panel H, so the token diverges from `R292,6.3`.

---

## 9. Model tests

Retest pending on `R292,6.3`.

Retired PASS: mitapivat; Fig6 arithmetic; Fig5 `2,6`; panel F `K136,8.9` (Grok-4.6).

---

## 10. References

```
Oken et al. Cryo-EM structures of the human P2X1 receptor reveal subtype-specific architecture and antagonism by supramolecular ligand-binding. Nature Communications (2024). https://doi.org/10.1038/s41467-024-52636-4 (CC BY 4.0)

Figure 5: https://doi.org/10.1038/s41467-024-52636-4
```
