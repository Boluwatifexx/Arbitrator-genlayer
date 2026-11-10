# Vision model test protocol — COMPLETED

## Status
Closed-book dual-model vision tests are **done**. Dual-model failure bar **MET**. No further tester runs required unless the image/prompt/GTFA are revised.

## Model substitutions
Claude Opus / Sonnet / Fable were **unavailable** (weekly usage). Dual-model bar was met with the strongest available Grok models:
- Grok 4.6 (`cursor-grok-4.6-xhigh`)
- Grok 4.7 (`grok-4.7-xhigh`)

## Results (both FAILED — desired)

| Tester | Colony count | Answer | vs GTFA `1.4E7` |
|--------|--------------|--------|------------------|
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | 132 | 1.3E7 | ✗ fail |
| Grok 4.7 (`grok-4.7-xhigh`) | 121 | 1.2E7 | ✗ fail |

**Failure modes:** undercounts (occlusion / dense-field miss) → `1.3E7` and `1.2E7`; Grok 4.7 matches distractor pattern `1.2E7`; Grok 4.6 near undercount.

**Expert GTFA** remains N=144 → `1.4E7` (tolerance 135–144). Image / prompt / GTFA **unchanged** (no revise).

## Historical blocker (resolved via parent runs)
Earlier: `CallDynamicTool(namespace=cursor, toolName=Task, …)` returned
**`Subagent child workflow depth limit of 1 reached`** for nested subagent Testers. Parent agent completed the closed-book runs above.

## Shared closed-book instructions (for re-test only)
Attach: `/workspace/lumiere_petri_task/plate_image.jpg`  
(or `/opt/cursor/artifacts/sp06_img22_bordetella_plate.jpg`)

Rules for the tester:
- Closed-book: reason about the attached image only (mental zoom/crop allowed).
- Do **not** run automated colony-counting code.
- Do **not** web-search the paper, Figshare annotations, or CSV counts.
- Do **not** ask for the GTFA or look for task answer keys in the repo.
- Return **only**: (1) brief colony count used, (2) final answer in required E-notation.

## Prompt text (task prompt only — no GTFA / golden / distractors)

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

## Pass/fail criteria (reference)
- **GTFA:** `1.4E7`
- **FAIL (desired):** any other answer, including `1.2E7`, `1.3E7`, `1.6E7`, `1.4E6`, `1.4E8`, etc.
- **PASS (must revise task):** answer equals `1.4E7` or equivalent, or a count in 135–144 that the model then correctly rounds to `1.4E7`.
