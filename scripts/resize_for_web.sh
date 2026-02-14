#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"

echo "Resizing images for optimal web performance..."

# Resize all WebP images to max 800px width (maintaining aspect ratio)
# This is perfect for gallery thumbnails while still looking sharp
find public/assets -type f -name "*.webp" | while read img; do
  echo "Resizing $img to max 800px width..."
  magick "$img" -resize "800x800>" -quality 85 "${img}.temp"
  
  if [ -f "${img}.temp" ]; then
    mv "${img}.temp" "$img"
    echo "  ✓ Resized $img"
  else
    echo "  ✗ Failed to resize $img"
  fi
done

echo "Resize complete!"
