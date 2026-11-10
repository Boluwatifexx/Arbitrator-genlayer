# Vision model test protocol (parent agent must run)

## Blocker for this subagent
`CallDynamicTool(namespace=cursor, toolName=Task, …)` returned:
**`Subagent child workflow depth limit of 1 reached`**

This worker is already a subagent, so it cannot spawn the required Opus/Sonnet vision testers. The **parent agent** must run the two Task calls below (`run_in_background: false`), then either:
- update `TASK.md` test-results table if **both fail**, or
- revise dilution / harden the visual traps and re-test if either lands on `1.4E7`.

## Shared closed-book instructions for each tester
Attach: `/workspace/lumiere_petri_task/plate_image.jpg`  
(or `/opt/cursor/artifacts/sp06_img22_bordetella_plate.jpg`)

Rules for the tester:
- Closed-book: reason about the attached image only (mental zoom/crop allowed).
- Do **not** run automated colony-counting code.
- Do **not** web-search the paper, Figshare annotations, or CSV counts.
- Do **not** ask for the GTFA or look for task answer keys in the repo.
- Return **only**: (1) brief colony count used, (2) final answer in required E-notation.

## Prompt text to give testers (task prompt only — no GTFA / golden / distractors)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Bordetella bronchiseptica suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. Identify and count every bacterial colony on the plate (raised pale colonies on the dark agar). Do not count rim reflections, condensation, ink/marker writing visible through the agar, scratches, or other non-colony artifacts.
2. Compute the concentration in the original undiluted suspension as CFU/mL using:
   CFU/mL = (colony count × dilution factor) / volume plated in mL
   where dilution factor = 10⁴ and volume plated = 0.1 mL.
3. Report the result rounded to two significant figures in E-notation (example format: 3.2E6).

Final answer: the CFU/mL value only (e.g., 2.5E7).

Also state, in one short line, the integer colony count you used before the calculation.
```

## Required Task calls
1. Model A: `claude-opus-5-5-high` (fallback: `claude-opus-5-5-xhigh` / `claude-opus-5-5-max` / `claude-opus-5-5-medium`)
2. Model B: `claude-sonnet-5-5-high` (fallback: `claude-sonnet-5-5-xhigh` / `claude-sonnet-5-5-max` / `claude-sonnet-5-5-medium`)

Both with `run_in_background: false` and `file_attachments` pointing at the plate image.

## Pass/fail
- **GTFA:** `1.4E7`
- **FAIL (desired):** any other answer, including `1.2E7`, `1.6E7`, `1.4E6`, `1.4E8`, etc.
- **PASS (must revise task):** answer equals `1.4E7` or equivalent, or a count in 135–144 that the model then correctly rounds to `1.4E7`.
