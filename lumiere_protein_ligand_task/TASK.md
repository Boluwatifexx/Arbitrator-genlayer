# Project Lumière — Protein-ligand (P2X1–NF449 Figure 6)

**Assay:** Protein-ligand · **Subdomain:** Biochemistry / Pharmacology  
**Image:** Oken et al., *Nat Commun* (2024), Figure 6 (CC BY 4.0)

**Hardening:** `K136A,39` was solved by Grok-4.6. New endpoint = selectivity ratio \(S\) only (same mutant filter, more arithmetic).

---

## 1. Source fields

| Field | Value |
|-------|-------|
| Image | `protein_ligand_image.jpg` |
| DOI | https://doi.org/10.1038/s41467-024-52636-4 |
| License | CC BY 4.0 |
| Panels | A and C |

---

## 2. Prompt (paste)

See `PROMPT.txt` (~838 chars).

---

## 3. GTFA

**`34.7`**

Qualifying mutant K136A:  
\(S = (31/0.80)/(1.9/1.7) = 38.75 / 1.1176\ldots = 34.67 \to 34.7\).

---

## 4. Answer format

Decimal — one decimal place

---

## 5. Golden solution

Step 1: Restrict to panels A and C. Single-point mutants in both: R292A, K136A.

Step 2 (domain): Apply >10-fold NF449 \(\mathrm{IC}_{50}\) loss and ATP \(\mathrm{EC}_{50}\) within 2-fold of WT.

Step 3: R292A fails the ATP filter (\(49/1.7\approx 29\)). K136A passes (\(31/0.80=38.75\) fold IC50; \(1.9/1.7\approx 1.12\) fold EC50).

Step 4: Compute
\[
S = \frac{31/0.80}{1.9/1.7} = \frac{38.75}{1.9/1.7} \approx 34.67 \rightarrow 34.7.
\]

Final Answer: 34.7

---

## 6. Image description

Keep `IMAGE_DESCRIPTION.txt`.

---

## 7. Distractors (5)

1. `1.1` — R292A wrongly chosen: \((25/0.80)/(49/1.7)\)  
2. `38.8` — IC50 fold only; omitted EC50 normalization  
3. `34.6` — truncated instead of rounded  
4. `20.4` — mixed wrong legend values  
5. `39.0` — reported rounded IC50 fold instead of \(S\)

---

## 8. Model failure justification (template)

Error type: **Label–element mis-binding** and/or wrong derived quantity

The model picked the wrong mutant and/or failed to form \(S=(\mathrm{IC}_{50}\mathrm{fold})/(\mathrm{EC}_{50}\mathrm{fold})\) from the legend values, so the reported decimal diverges from `34.7`.

---

## 9. Model tests

| Endpoint | Model | Answer | Result |
|----------|-------|--------|--------|
| `K136A,39` (retired) | Grok-4.6 | `K136A,39` | PASS |
| `34.7` (current) | pending | — | — |

Mitapivat diagram endpoints: dual PASS (retired).

---

## 10. References

```
Oken et al. Cryo-EM structures of the human P2X1 receptor reveal subtype-specific architecture and antagonism by supramolecular ligand-binding. Nature Communications (2024). https://doi.org/10.1038/s41467-024-52636-4 (CC BY 4.0)

Figure 6: https://doi.org/10.1038/s41467-024-52636-4
```
