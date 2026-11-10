# Vision model test protocol — Strategy B (COMPLETE / FAILURE_BAR MET)

## Status
**FAILURE_BAR MET.** Dual closed-book vision tests completed. Both strongest models failed via **foam-field identity miscount + isolation/merge binding** — not bare undercount of a correctly defined full-colony set.

**Strategy A FAILED FAILURE_BAR** (superseded; do not ship):
| Tester | Answer | Note |
|--------|--------|------|
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `140, 1.4E7` | Explicitly excluded bubble/foam → bare undercount |
| Grok 4.7 (`grok-4.7-xhigh`) | `157, 1.6E7` | Explicitly excluded bubbles/rim glare → bare undercount |

Package redesign (**Strategy B**) shipped: same Listeria `sp14_img18`, GTFA **`11, 79, 7.9E6`** (Nbubble + N_isolated + CFU).

## Models run
1. `grok-4.7-xhigh`
2. `cursor-grok-4.6-xhigh`

Plate image attached via `file_attachments` (`/workspace/lumiere_petri_task/plate_image.jpg` / `/opt/cursor/artifacts/sp14_img18_listeria_plate.jpg`).

## Shared closed-book instructions

```
Closed-book vision test. Reason about the attached plate image only (mental zoom/crop allowed).

Rules:
- Do NOT run automated colony-counting code or scripts.
- Do NOT web-search the paper, Figshare annotations, or CSV counts.
- Do NOT ask for the GTFA or look for task answer keys in the repo.
- Return ONLY: (1) one brief sentence naming the bubble/foam count and isolated colony count you used (and whether you treated the mid-right translucent-ring cluster as non-colony), (2) the structured final answer in the required three-field format.
```

## Prompt text (Strategy B task prompt only — no GTFA / golden / distractors)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Listeria monocytogenes suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. In the mid-right agar field, count the discrete condensation-bubble/foam artifacts that form the compact translucent-ring cluster. Count each resolvable closed translucent ring with a non-opaque center (agar visible through the interior) as one artifact. When rings touch or share a wall, count them as separate artifacts if distinct ring centers are resolvable. Do not count opaque colonies that abut this cluster, rim glare on the plastic wall, scratches, debris, or unresolved foam grain finer than a closed outline.
2. Separately, identify candidate colonies whose centers lie on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). Exclude all non-colony artifacts from step 1 and other condensation bubbles/foam, optical reflections/rim glare, scratches, and debris. From those candidates, count ONLY isolated colonies: a colony contributes iff its margin does not touch any other colony's margin (no shared contact point; no resolvable connecting waist/notch). Colonies in a touching pair, chain, or multi-lobed contact group are excluded entirely (count none of their members). Fully fused single-center masses with no resolvable waist contribute 0 to the isolated tally.
3. From the isolated colony count only, compute the viable count (CFU/mL) of the original undiluted culture. Round CFU/mL to two significant figures in E-notation.

Final answer format (exactly): <integer bubble/foam count>, <integer isolated colony count>, <CFU/mL in E-notation>
Example style (not the answer): 9, 120, 1.2E7
```

## Pass/fail criteria (applied)
- **GTFA:** `11, 79, 7.9E6`
- **FAIL (desired):** any other structured answer. Prefer failures that show:
  - **Wrong Nbubble:** `0` / `1` / inflated / miscounted rings (artifact identity or foam-field binding error)
  - **Wrong isolation binding:** second field ≠ `79` (contact/merge misbinding; may also land near full-plate `172` / Strategy A `157`/`140`)
- **FAILURE_BAR preference:** document the model’s stated reason (miscounted foam / treated patch as one / included contacts / counted foam as CFU).
- **PASS (would require harden / revise):** answer equals `11, 79, 7.9E6`.
- **FAILURE_BAR risk watched:** Nbubble correct **and** isolated field only bare-undercounted without contact/identity error — **not observed**.

## Results table (COMPLETE)

| Tester | Answer | Interpretive error | Result |
|--------|--------|--------------------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | `7, 106, 1.1E7` | Wrong Nbubble (7≠11) artifact identity; wrong isolation binding (106≠79) | ✗ fail |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `9, 117, 1.2E7` | Wrong Nbubble (9≠11); wrong isolation binding (117≠79) | ✗ fail |

**FAILURE_BAR MET:** primary errors are foam-field identity miscount + isolation/merge binding — not bare undercount of a correctly defined full-colony set.

## Prior evidence (superseded)
- Bordetella `sp06_img22` / GTFA `144, 1.4E7`: platform Blocks `128`/`126` → FAILURE_BAR_NOT_MET (bare undercount).
- Strategy A Listeria / GTFA `172, 1.7E7`: Grok `140`/`157` with correct bubble exclusion → FAILURE_BAR_NOT_MET (bare undercount).
- Strategy B Listeria / GTFA `11, 79, 7.9E6`: Grok 4.7 `7, 106, 1.1E7`; Grok 4.6 `9, 117, 1.2E7` → **FAILURE_BAR MET**.
