# Vision model test protocol — PARENT HANDOFF (REQUIRED)

## Status
**QC revise complete** (structured GTFA `144, 1.4E7`). Nested Cursor Task spawn is **unavailable** to this worker (subagent depth limit / Task tool not exposed). **Parent must run both closed-book vision tests** and record results back into `TASK.md` §10.

## Models to run (prefer in order)
1. `grok-4.7-xhigh`
2. `cursor-grok-4.6-xhigh`

(Claude Opus / Sonnet / Fable if available on the account; otherwise the two Grok models above.)

## How to run
Use Cursor Task tool with:
- `file_attachments: [/workspace/lumiere_petri_task/plate_image.jpg]`
  (alternate: `/opt/cursor/artifacts/sp06_img22_bordetella_plate.jpg`)
- `run_in_background: false`
- Give **ONLY** the prompt below + ask for the structured final answer
- Closed-book: **no** GTFA / golden / distractors; **no** web/CSV/repo answers; **no** auto-counting scripts

## Shared closed-book instructions for each tester

```
Closed-book vision test. Reason about the attached plate image only (mental zoom/crop allowed).

Rules:
- Do NOT run automated colony-counting code or scripts.
- Do NOT web-search the paper, Figshare annotations, or CSV counts.
- Do NOT ask for the GTFA or look for task answer keys in the repo.
- Return ONLY: (1) one brief sentence naming the integer colony count you used, (2) the structured final answer in the required format.
```

## Prompt text (task prompt only — no GTFA / golden / distractors)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Bordetella bronchiseptica suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. Apply standard viable plate-count colony recognition for this blood-agar culture. Count every colony whose center lies on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). When colonies touch or appear merged, count them as separate CFU if two or more distinct colony centers or margins are resolvable; count as one CFU only when they are fully fused into a single center. Exclude non-colony artifacts (writing, optical reflections, bubbles, scratches).
2. From your colony count, compute the viable count (CFU/mL) of the original undiluted culture. Round the CFU/mL result to two significant figures in E-notation.

Final answer format (exactly): <integer colony count>, <CFU/mL in E-notation>
Example style (not the answer): 280, 2.8E7
```

## Pass/fail criteria
- **GTFA:** `144, 1.4E7`
- **FAIL (desired):** any other structured answer, including prior undercounts such as `132, 1.3E7` or `121, 1.2E7`, overcounts such as `160, 1.6E7` / `170, 1.7E7`, or calc traps `144, 1.4E6` / `144, 1.4E8`.
- **PASS (must harden / revise):** answer equals `144, 1.4E7` (or accepted CFU notation equivalent with count exactly 144).

## Prior evidence (CFU-only prompt; superseded)
Under the old value-only GTFA `1.4E7`, Grok 4.6 counted **132** → `1.3E7` and Grok 4.7 counted **121** → `1.2E7`. Those undercounts would already fail the new structured GTFA, but parent must still re-test under the **revised** prompt (counting rules + no formula + structured answer).

## After runs
Update `TASK.md` §10 results table with colony count, structured answer, and pass/fail for each model. Dual-model failure bar is **MET** only when both ≠ `144, 1.4E7`.
