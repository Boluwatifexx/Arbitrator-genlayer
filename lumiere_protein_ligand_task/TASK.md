# Project Lumière — Protein-ligand (PK–mitapivat PoseEdit pocket)

**Assay:** Protein-ligand · **Subdomain:** Structure-based ligand recognition  
**Image:** *Crystals* https://doi.org/10.3390/cryst14050441 Figure 3 — 3D MTPV pocket crop (CC BY 4.0)

**Pivot:** Labeled OCR / H-bond lists / SAR tables PASSed both local Groks. New endpoint: face-on F36 color + ligand-contacting water count + side-chain N→amide carbonyl 2.7 Å donor.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` ← 3D crop of `raw/crystals-14-00441-g003.png` |
| DOI | https://doi.org/10.3390/cryst14050441 |
| License | CC BY 4.0 |
| Panels | Figure 3 3D close-up only |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`green,1,K321`**

(Green F36 is face-on to the phenylene; only one red water sphere has a direct dashed contact to MTPV; K321 is the sole side-chain N → ligand amide carbonyl 2.7 Å donor. L363 and Y400 are backbone 2.7 Å contacts.)

---

## 4. Answer format

Text — `F36_color,water_count,residue`

---

## 5. Golden solution

Step 1 (vision): Identify which F36 ring packs face-on against the central phenylene → **green** (cyan F36 is offset).

Step 2 (vision): Count red water spheres with a dashed line that reaches an MTPV atom. Two waters are drawn; only the central (V362-adjacent) water contacts the ligand. The L404-adjacent water bridges protein only → **1**.

Step 3 (vision): Among 2.7 Å H-bond dashes, select the side-chain nitrogen donor to the ligand amide carbonyl → **K321** (not L363 backbone C=O or Y400 backbone NH).

Step 4: Report `green,1,K321`.

Final Answer: green,1,K321

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `green,2,K321` — counts both waters, including the protein-only bridge  
2. `cyan,1,K321` — wrong F36 copy  
3. `green,1,L363` — backbone carbonyl contact, not side-chain N→amide  
4. `green,1,Y400` — backbone NH→sulfonyl contact  
5. `green,0,K321` — missed the ligand-contacting water  

---

## 8. Model failure justification (template)

Error type: **Label–element / contact mis-binding** (water mediation scope and/or F36 stack assignment)

Wrong water count and/or F36 color and/or 2.7 Å donor versus `green,1,K321`.

---

## 9. Model tests

| Model | Trial | Output | Result |
|-------|-------|--------|--------|
| grok-4.7-xhigh | 1 | `green,2,K321` | FAIL |
| cursor-grok-4.6-xhigh | 1 | `green,2,K321` | FAIL |
| grok-4.7-xhigh | 2 | `green,1,K321` | PASS |
| cursor-grok-4.6-xhigh | 2 | `green,2,K321` | FAIL |
| grok-4.7-xhigh | 3 | `green,1,K321` | PASS |
| cursor-grok-4.6-xhigh | 3 | `green,2,K321` | FAIL |

**Holding (≥1 of 2 fail): MET** — Grok-4.6-xhigh consistently returns `green,2,K321`.

Retired local dual-PASS this session: AR–lamin `5,40,699,NTD`; Parkin fold/SAR/ITC; DAT; B⁰AT1; Polθ; CB2 H-bonds; P2X1 color/inner-outer; A3AR mutant grids; H2R cross-bind; TMEM106B site residues.

---

## 10. References

```
Han X, et al. High Resolution Crystal Structure of the Pyruvate Kinase Tetramer in Complex with the Allosteric Activator Mitapivat/AG-348. Crystals (2024) 14:441. https://doi.org/10.3390/cryst14050441 (CC BY 4.0)

Figure 3: https://www.mdpi.com/2073-4352/14/5/441
```
