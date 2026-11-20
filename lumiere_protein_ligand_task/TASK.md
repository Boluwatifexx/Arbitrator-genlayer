# Project Lumière — Protein-ligand (AR–lamin PLA / DHT–ARCC4 Figure 3)

**Assay:** Protein-ligand · **Subdomain:** Cellular pharmacology / PLA  
**Image:** *Nat Commun* https://doi.org/10.1038/s41467-024-52344-z Figure 3 (CC BY 4.0)

**Pivot:** Labeled structure/SAR/ITC OCR PASSed both Groks. New endpoint: panel-C ligand-treatment medians (ARCC4 PROTAC vs DHT agonist) + LBD start + NTD vs LBD pull-down.

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` ← `raw/ar_lamin/fig3.png` |
| DOI | https://doi.org/10.1038/s41467-024-52344-z |
| License | CC BY 4.0 |
| Panels | C, E, F |

---

## 2. Prompt (paste)

See `PROMPT.txt`.

---

## 3. GTFA

**`5,40,699,NTD`**

(Panel C pink bars ≈5 for ARCC4 and ≈38–40 for DHT → nearest 5 = 5,40; panel E LBD starts at 699; panels E–F His blot pulls down AR-NTD, not AR-LBD.)

---

## 4. Answer format

Text — `arcc_med,dht_med,lbd_start,domain`

---

## 5. Golden solution

Step 1 (vision): Panel C graph — ARCC4 pink bar near ~5; DHT pink bar near ~40 (EtOH mid ~25–30 for orientation).

Step 2: Round to nearest 5 → **5,40**.

Step 3 (vision): Panel E LBD labeled **699–920** → start **699**.

Step 4 (vision + domain): Panel F His blot shows AR-NTD recovered in lamin IP; AR-LBD is absent/faint → **NTD**. Consistent with ligand-independent NTD–rod contact (DHT increases AR levels/PLA; ARCC4 degrades AR and collapses PLA).

Step 5: Report `5,40,699,NTD`.

Final Answer: 5,40,699,NTD

---

## 6. Image description

See `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `5,40,699,LBD` — wrong domain  
2. `5,35,699,NTD` — DHT median not rounded to nearest 5  
3. `0,40,699,NTD` — treated ARCC4 as zero  
4. `5,40,560,NTD` — used DBD/NTD boundary instead of LBD start  
5. `40,5,699,NTD` — swapped ARCC4/DHT medians  

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding** (graph bars / blot lanes) and/or domain misassignment

Wrong median pair, LBD start, and/or domain versus `5,40,699,NTD`.

---

## 9. Model tests

Local Grok-4.7-xhigh and Grok-4.6-xhigh both returned `5,40,699,NTD` (PASS). Holding dual-fail bar still unmet after PLA/domain pivot.

Retired PASS this session: Parkin SAR/ITC; DAT distances; B⁰AT1 grid/distances; Polθ residue/mechanism/noncompetitive; A3AR; P2X1; mitapivat.

---

## 10. References

```
Nuclear lamin A/C phosphorylation by loss of androgen receptor leads to cancer-associated fibroblast activation. Nature Communications (2024). https://doi.org/10.1038/s41467-024-52344-z (CC BY 4.0)

Figure 3: https://doi.org/10.1038/s41467-024-52344-z
```
