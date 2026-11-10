# Vision model test protocol — Strategy B (PENDING PARENT RUN)

## Status
**Nested cloud-agent Task depth is limited** — this subagent cannot spawn the dual closed-book vision testers. **Parent agent must run** the protocol below before claiming FAILURE_BAR MET.

**Strategy A FAILED FAILURE_BAR** (do not ship):
| Tester | Answer | Note |
|--------|--------|------|
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `140, 1.4E7` | Explicitly excluded bubble/foam → bare undercount |
| Grok 4.7 (`grok-4.7-xhigh`) | `157, 1.6E7` | Explicitly excluded bubbles/rim glare → bare undercount |

Package redesign (**Strategy B**) is complete: same Listeria `sp14_img18`, GTFA **`11, 79, 7.9E6`** (Nbubble + N_isolated + CFU).

## Models to run
1. `grok-4.7-xhigh`
2. `cursor-grok-4.6-xhigh`

Attach the plate image via `file_attachments` (prefer `/workspace/lumiere_petri_task/plate_image.jpg` or `/opt/cursor/artifacts/sp14_img18_listeria_plate.jpg`).

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
  - **Wrong Nbubble:** `0` / `1` / inflated (artifact identity or foam-field binding error)
  - **Wrong isolation binding:** second field near `172` / `157` / `140` (full-plate / Strategy A answers)
- **FAILURE_BAR preference:** document the model’s stated reason (miscounted foam / treated patch as one / included contacts / counted foam as CFU).
- **PASS (would require harden / revise):** answer equals `11, 79, 7.9E6`.
- **FAILURE_BAR risk to watch:** Nbubble correct **and** isolated field only bare-undercounted without contact/identity error — note and consider further pivot.

## Results table (fill in)

| Tester | Answer | Interpretive error noted? | Result |
|--------|--------|---------------------------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | | | |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | | | |

## After results
1. Copy answers into `TASK.md` §10 Strategy B table.
2. If both fail via artifact-identity and/or isolation-binding error → mark bar **MET**.
3. If either hits GTFA or only bare-undercounts without identity/binding error → pivot again (do not ship).

## Prior evidence (superseded)
- Bordetella `sp06_img22` / GTFA `144, 1.4E7`: platform Blocks `128`/`126` → FAILURE_BAR_NOT_MET (bare undercount).
- Strategy A Listeria / GTFA `172, 1.7E7`: Grok `140`/`157` with correct bubble exclusion → FAILURE_BAR_NOT_MET (bare undercount).
