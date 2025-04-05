#!/bin/bash

SRC_DIR="assets/images/uploads"
DEST_DIR="public/images/uploads"
TMP_DIR="tmp-reencoded"

echo "Checking Image Magick presence and versions..."
echo $(which magick)
echo $(`which magick` -version)
echo $(which convert)
echo $(`which convert` -version)
if ! command -v `which magick` &> /dev/null; then
  echo "❌ ImageMagick (convert) not found — skipping color fix"
  exit 0
fi

mkdir -p "$TMP_DIR"

echo "🔍 Re-encoding WebP images with preserved color profiles..."

find "$DEST_DIR" -type f -name '*.webp' | while read -r webp; do
  base=$(basename "$webp" .webp | sed 's/_hu_.*$//')

  # Find the matching source file
  for ext in jpg jpeg png tif tiff; do
    src="$SRC_DIR/$base.$ext"
    if [[ -f "$src" ]]; then
      break
    fi
  done

  if [[ ! -f "$src" ]]; then
    echo "⚠️  No source found for $base — skipping"
    continue
  fi

  echo "🎨 Processing $base — source: $src"

  # Get the output dimensions from the Hugo-generated image
  dims=$(identify -format "%wx%h" "$webp" 2>/dev/null)
  if [[ -z "$dims" ]]; then
    echo "❌ Could not get dimensions from $webp — skipping"
    continue
  fi

  # Extract ICC profile from the source image (if any)
  icc_path="$TMP_DIR/${base}.icc"
  magick "$src" icc:"$icc_path" 2>/dev/null
  echo $icc_path

  # Replace original .webp with corrected version
  #   assuming there was an ICC profile in the original else skip
  if [[ -s "$icc_path" ]]; then
    echo "📦 Embedded ICC profile found — re-encoding $base with preserved color"
    magick "$src" -resize "$dims" -profile "$icc_path" "$TMP_DIR/$base.webp"
    mv "$TMP_DIR/$base.webp" "$webp"
  else
    echo "🟢 No ICC profile found — assuming sRGB, skipping re-encode for $base"
  fi  
done

rm -rf "$TMP_DIR"
echo "✅ Done."