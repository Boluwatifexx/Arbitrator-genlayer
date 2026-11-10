# Vision model test protocol — COMPLETE

## Status
**Tests complete.** QC-fixed prompt with structured GTFA `144, 1.4E7` was closed-book tested on the strongest available vision models. **Dual-model failure bar: MET.**

Claude Opus / Sonnet / Fable were **unavailable** on this account; Grok 4.7 and Grok 4.6 were used.

## Models run
1. `grok-4.7-xhigh` → `147, 1.5E7` — ✗ fail (overcount → wrong CFU)
2. `cursor-grok-4.6-xhigh` → `137, 1.4E7` — ✗ fail (wrong count; CFU coincides only because 137∈135–144 band — full structured GTFA still fails)

## Shared closed-book instructions used

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

## Pass/fail criteria (applied)
- **GTFA:** `144, 1.4E7`
- **FAIL (desired / achieved):** any other structured answer. Both testers failed exact structured match.
- **PASS (would require harden / revise):** answer equals `144, 1.4E7` — did not occur.

## Prior evidence (CFU-only prompt; superseded)
Under the old value-only GTFA `1.4E7`, Grok 4.6 counted **132** → `1.3E7` and Grok 4.7 counted **121** → `1.2E7`. Re-test under the QC-fixed structured prompt is recorded in `TASK.md` §10 and above.

## Record location
Authoritative results live in `TASK.md` §10.
