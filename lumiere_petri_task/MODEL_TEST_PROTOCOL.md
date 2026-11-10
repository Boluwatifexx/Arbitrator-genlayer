# Vision model test protocol — PENDING PARENT RUN

## Status
**Nested cloud-agent Task depth is limited** — this subagent cannot spawn the dual closed-book vision testers. **Parent agent must run** the protocol below before claiming FAILURE_BAR MET.

Package redesign (Strategy A) is complete: Listeria `sp14_img18`, GTFA `172, 1.7E7`.

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
- Return ONLY: (1) one brief sentence naming the integer colony count you used and, if relevant, whether you excluded any bubble/foam or glare objects, (2) the structured final answer in the required format.
```

## Prompt text (task prompt only — no GTFA / golden / distractors)

```
You are analyzing a digital photograph of a blood agar culture plate from a quantitative plate-count assay.

A Listeria monocytogenes suspension was serially diluted, and 100 µL of the 10⁻⁴ dilution was spread evenly across the agar surface and incubated until discrete colonies were visible.

Using only the image:
1. Apply standard viable plate-count colony recognition for this blood-agar culture. Count every colony whose center lies on or inside the agar surface (include rim-adjacent colonies if the colony center is on the agar). When colonies touch or appear merged into multi-lobed masses, count them as separate CFU if two or more distinct colony centers or separating notches/waists are resolvable; count as one CFU only when they are fully fused into a single center with no resolvable waist. Exclude non-colony artifacts — including condensation bubbles/foam (translucent ring-like objects), optical reflections/rim glare, scratches, and debris.
2. From your colony count, compute the viable count (CFU/mL) of the original undiluted culture. Round the CFU/mL result to two significant figures in E-notation.

Final answer format (exactly): <integer colony count>, <CFU/mL in E-notation>
Example style (not the answer): 280, 2.8E7
```

## Pass/fail criteria (applied)
- **GTFA:** `172, 1.7E7`
- **FAIL (desired):** any other structured answer, ideally with N > 172 from bubble-as-colony and/or merge over-segmentation (document the model’s stated reason).
- **FAILURE_BAR preference:** answers that **overcount** via artifact misbinding or wrong merge binding. If a model only undercounts without naming/committing an identity error, note FAILURE_BAR risk and consider Strategy B follow-up (isolated-subset / explicit identity judgment).
- **PASS (would require harden / revise):** answer equals `172, 1.7E7`.

## Results table (fill in)

| Tester | Answer | Interpretive error noted? | Result |
|--------|--------|---------------------------|--------|
| Grok 4.7 (`grok-4.7-xhigh`) | | | |
| Grok 4.6 (`cursor-grok-4.6-xhigh`) | | | |

## After results
1. Copy answers into `TASK.md` §10.
2. If both fail via interpretive overcount → mark bar **MET**.
3. If either hits GTFA or only bare-undercounts → pivot Strategy B/C per task brief (do not ship).

## Prior evidence (superseded Bordetella package)
Under Bordetella `sp06_img22` / GTFA `144, 1.4E7`, platform Blocks answered `128, 1.3E7` and `126, 1.3E7` → QC FAILURE_BAR_NOT_MET (bare undercount). Local Grok retests under structured prompt gave `147, 1.5E7` and `137, 1.4E7` — still insufficient as a FAILURE_BAR claim for undercount-class errors.
