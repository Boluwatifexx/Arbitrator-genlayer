# Image provenance

## Selected image
- **File in dataset:** `sp06_img22.jpg`
- **Species (dataset ID sp06):** *Bordetella bronchiseptica*
- **NOT** the excluded Erysipelothrix package image `sp10_img14.jpg`

## Source
- **Dataset:** Annotated dataset for deep-learning-based bacterial colony detection
- **Figshare DOI:** https://doi.org/10.6084/m9.figshare.22022540.v3
- **Companion paper:** Makrai et al., *Scientific Data* (2023) — https://doi.org/10.1038/s41597-023-02404-8
- **Dataset license (verified on Figshare API article metadata):** **CC BY 4.0** (`license.name = "CC BY 4.0"`, url https://creativecommons.org/licenses/by/4.0/)
- **Paper license:** Creative Commons Attribution 4.0 International (Open Access)
- **Download method:** Figshare API `https://api.figshare.com/v2/file/download/<file_id>` (direct ndownloader host returned WAF 403 from this environment; API download succeeded)
- **File id for this image:** `39122102` (from article 22022540 file list)
- **Annotation count in `images.xls` / `annot_tab.csv`:** 144 colony bounding boxes (expert manual annotations published with the dataset)

## Local deliverable copies
- Task image (resized ~2000 px long edge JPEG): `sp06_img22_bordetella_plate.jpg` / `plate_image.jpg`
- Artifact copy: `/opt/cursor/artifacts/sp06_img22_bordetella_plate.jpg`
- Near-original download retained as `sp06_img22_source_original.jpg` for provenance (not required for platform upload)

## Processing applied
- Resize only: original 2183×2200 → 1985×2000 JPEG (LANCZOS), quality ~92
- No sharpening, contrast enhancement, color correction, or annotation overlays on the task image
- File size after resize: ~536 KB (<5 MB)
- Annotations occupy ≪40% of the image area (task image is the raw plate photo only)

## Why this plate (visual traps)
- Many small, similar colonies with multiple touching/near-touching pairs (dense-field split risk)
- Dark marker writing visible through the translucent agar (artifact-as-colony / occlusion risk)
- Colonies near the plastic rim with specular rim glare (rim undercount / glare false-positive risk)
- Moderate contrast cream colonies on dark blood agar (not a schematic / BioRender figure)

## Task-specific dilution note
Published dataset metadata gives per-image colony counts but **does not** define the assay dilution/volume used in this Lumière prompt. Dilution (10⁻⁴) and plated volume (0.1 mL) are task-authored so the final CFU/mL GTFA is not a value published as such in the source metadata.
