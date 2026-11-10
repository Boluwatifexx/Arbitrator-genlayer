# Vision model test protocol — Strategy B (PENDING PARENT RUN)

## Status
**Nested cloud-agent Task depth is limited** — this subagent cannot spawn the dual closed-book vision testers. **Parent agent must run** the protocol below before claiming FAILURE_BAR MET.

**Strategy A FAILED FAILURE_BAR** (do not ship):
| Tester | Answer | Note |
|--------|--------|------|
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | `140, 1.4E7` | Explicitly excluded bubble/foam → bare undercount |
| Grok 4.7 (`grok-4.7-xhigh`) | `157, 1.6E7` | Explicitly excluded bubbles/rim glare → bare undercount |

Package redesign (**Strategy B**) is complete: same Listeria `sp14_img18`, **isolated-only** GTFA `79, 7.9E6`.

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
- Return ONLY: (1) one brief sentence naming the integer isolated colony count you used and, if relevant, whether you excluded contacting colonies and/or bubble/foam or glare objects, (2) the structured final answer in the required format.
```

## Prompt text (Strategy B task prompt only — no GTFA / golden / distractors)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Listeria monocytogenes suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. Apply standard viable plate-count colony recognition for this blood-agar culture. Identify candidate colonies whose centers lie on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). Exclude non-colony artifacts — including condensation bubbles/foam (translucent ring-like objects), optical reflections/rim glare, scratches, and debris.
2. From those candidate colonies, count ONLY isolated colonies: a colony contributes to the tally if and only if its margin does not touch any other colony's margin (no shared contact point and no resolvable connecting waist/notch to a neighbor). Colonies that participate in a touching pair, chain, or multi-lobed contact group are excluded entirely (do not count any member of a contacting group). Fully fused single-center masses with no resolvable waist count as one contacting unit and contribute 0 to the isolated tally.
3. From the isolated colony count, compute the viable count (CFU/mL) of the original undiluted culture. Round the CFU/mL result to two significant figures in E-notation.

Final answer format (exactly): <integer isolated colony count>, <CFU/mL in E-notation>
Example style (not the answer): 120, 1.2E7
```

## Pass/fail criteria (applied)
- **GTFA:** `79, 7.9E6`
- **FAIL (desired):** any other structured answer. Prefer failures that show:
  - **Wrong isolation binding:** N near `172` / `157` / `140` (full-plate / Strategy A answers) — model included contacting colonies
  - **Artifact identity error:** N inflated by counting mid-right bubble/foam as isolated CFU
  - **Inverted category:** N near `93` (contact-involved only)
- **FAILURE_BAR preference:** document the model’s stated reason (included contacts / counted foam / etc.). Full-plate-like answers relative to isolated GTFA are interpretive (wrong binding), not bare undercount of the isolated set.
- **PASS (would require harden / revise):** answer equals `79, 7.9E6`.
- **FAILURE_BAR risk to watch:** model correctly applies isolation but bare-undercounts isolated colonies (e.g. `65–75` range) without contact/identity error — note and consider further pivot (explicit `Nbubble` two-category if a cleaner artifact integer can be locked, or image swap).

## Results table (fill in)

| Tester | Answer | Interpretive error noted? | Result |
|--------|--------|---------------------------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | | | |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | | | |

## After results
1. Copy answers into `TASK.md` §10 Strategy B table.
2. If both fail via isolation-binding / artifact-identity error → mark bar **MET**.
3. If either hits GTFA or only bare-undercounts the isolated set without binding/identity error → pivot again (do not ship).

## Prior evidence (superseded)
- Bordetella `sp06_img22` / GTFA `144, 1.4E7`: platform Blocks `128`/`126` → FAILURE_BAR_NOT_MET (bare undercount).
- Strategy A Listeria / GTFA `172, 1.7E7`: Grok `140`/`157` with correct bubble exclusion → FAILURE_BAR_NOT_MET (bare undercount).
