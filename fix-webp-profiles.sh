#!/bin/bash

# Default directories
DEFAULT_SRC_DIR="assets/images/uploads"
DEFAULT_DEST_DIR="public/images/uploads"
TMP_DIR="tmp-reencoded"

# Help function
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo "Fix WebP image color profiles by preserving the original color profiles."
    echo "The script examines the WebP images in dest and regererates each file as it "
    echo "finds a match in source using the original color profile from the source images."
    echo ""
    echo "Options:"
    echo "  -s, --source DIR     Source directory containing original images (default: $DEFAULT_SRC_DIR)"
    echo "  -d, --dest DIR       Destination directory containing WebP images to regenerate with color profiles from source (default: $DEFAULT_DEST_DIR)"
    echo "  -h, --help           Display this help message and exit"
    echo ""
}

# Process WebP images with preserved color profiles
process_images() {
    local SRC_DIR="$1"
    local DEST_DIR="$2"
    local TMP_DIR="$3"

    echo "🔍 Checking Image Magick presence..."
    if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
        echo "❌ ImageMagick not found — skipping color fix"
        return 1
    fi

    # Determine which command to use (magick or convert)
    CONVERT_CMD="convert"
    if command -v magick &> /dev/null; then
        CONVERT_CMD="magick"
    fi

    mkdir -p "$TMP_DIR"

    echo "🔍 Re-encoding WebP images with preserved color profiles..."
    echo "   Source directory: $SRC_DIR"
    echo "   Destination directory: $DEST_DIR"

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
        dims=$($CONVERT_CMD identify -format "%wx%h" "$webp" 2>/dev/null)
        if [[ -z "$dims" ]]; then
            echo "❌ Could not get dimensions from $webp — skipping"
            continue
        fi

        # Extract ICC profile from the source image (if any)
        icc_path="$TMP_DIR/${base}.icc"
        $CONVERT_CMD "$src" icc:"$icc_path" 2>/dev/null

        # Replace original .webp with corrected version
        if [[ -s "$icc_path" ]]; then
            echo "📦 Embedded ICC profile found — re-encoding $base with preserved color"
            $CONVERT_CMD "$src" -resize "$dims" -profile "$icc_path" "$TMP_DIR/$base.webp"
            mv "$TMP_DIR/$base.webp" "$webp"
        else
            echo "🟢 No ICC profile found — assuming sRGB, skipping re-encode for $base"
        fi  
    done

    rm -rf "$TMP_DIR"
    echo "✅ Done."
}

# Parse command line arguments
SRC_DIR="$DEFAULT_SRC_DIR"
DEST_DIR="$DEFAULT_DEST_DIR"

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -s|--source) SRC_DIR="$2"; shift ;;
        -d|--dest) DEST_DIR="$2"; shift ;;
        -h|--help) show_help; exit 0 ;;
        *) echo "Unknown parameter: $1"; show_help; exit 1 ;;
    esac
    shift
done

# Execute the main function
process_images "$SRC_DIR" "$DEST_DIR" "$TMP_DIR"