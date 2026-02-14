#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"

echo "Aggressively optimizing WebP images for mobile performance..."

# Resize to max 600px width and reduce quality to 75 for better compression
find public/assets -type f -name "*.webp" | while read img; do
  filesize=$(du -k "$img" | cut -f1)
  
  # Only process files larger than 500KB
  if [ $filesize -gt 500 ]; then
    echo "Optimizing $img (${filesize}KB)..."
    magick "$img" -resize "600x600>" -quality 75 "${img}.temp"
    
    if [ -f "${img}.temp" ]; then
      mv "${img}.temp" "$img"
      newsize=$(du -k "$img" | cut -f1)
      echo "  ✓ Reduced from ${filesize}KB to ${newsize}KB"
    else
      echo "  ✗ Failed to optimize $img"
    fi
  fi
done

echo "Aggressive optimization complete!"
