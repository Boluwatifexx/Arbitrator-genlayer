# Image provenance

## Selected image
- **File in dataset:** `sp14_img18.jpg`
- **Species (dataset ID sp14):** *Listeria monocytogenes*
- **NOT** the excluded Erysipelothrix package image `sp10_img14.jpg`
- **NOT** the prior Bordetella package image `sp06_img22.jpg` (FAILURE_BAR_NOT_MET via bare undercount)

## Source
- **Dataset:** Annotated dataset for deep-learning-based bacterial colony detection
- **Figshare DOI:** https://doi.org/10.6084/m9.figshare.22022540.v3
- **Companion paper:** Makrai et al., *Scientific Data* (2023) — https://doi.org/10.1038/s41597-023-02404-8
- **Dataset license (verified on Figshare API article metadata):** **CC BY 4.0** (`license.name = "CC BY 4.0"`, url https://creativecommons.org/licenses/by/4.0/)
- **Paper license:** Creative Commons Attribution 4.0 International (Open Access)
- **Download method:** Figshare API `https://api.figshare.com/v2/file/download/<file_id>` (direct ndownloader host may return WAF 403; API download succeeds)
- **File id for this image:** `39122426` (from article 22022540 file list)
- **Annotation count in `images.xls` / `annot_tab.csv`:** 172 colony bounding boxes (expert manual annotations published with the dataset)

## Local deliverable copies
- Task image (resized ~2000 px long edge JPEG): `sp14_img18_listeria_plate.jpg` / `plate_image.jpg`
- Artifact copy: `/opt/cursor/artifacts/sp14_img18_listeria_plate.jpg`
- Near-original download retained as `sp14_img18_source_original.jpg` for provenance (not required for platform upload)

## Processing applied
- Resize only: original 2480×2487 → 1994×2000 JPEG (LANCZOS), quality ~92
- No sharpening, contrast enhancement, color correction, or annotation overlays on the task image
- File size after resize: ~853 KB (<5 MB)
- Annotations occupy ≪40% of the image area (task image is the raw plate photo only)

## Why this plate (Strategy B — interpretive traps)
- **Strategy A failed FAILURE_BAR** on this same image: models correctly excluded mid-right condensation bubble/foam but bare-undercounted the full 172 set (`140` / `157`)
- **Strategy B** forces a scored **Nbubble = 11** identity field on the mid-right translucent-ring cluster (0 expert CFU boxes) plus **N_isolated = 79**, so full-plate-like answers and foam miscounts are interpretive failures
- Dense lower-field contact structure supports isolation/contact discrimination
- Rim specular glare along the plastic wall → rim false-positive risk
- Isolated subset still within pen+calculator plate-count range

## Task-specific dilution note
Published dataset metadata gives per-image colony counts but **does not** define the assay dilution/volume used in this Lumière prompt. Dilution (10⁻⁴) and plated volume (0.1 mL) are task-authored so the final CFU/mL GTFA is not a value published as such in the source metadata.
