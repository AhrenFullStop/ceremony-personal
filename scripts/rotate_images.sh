#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"

echo "Rotating images 90 degrees clockwise..."

# Array of image numbers that need rotation
# Note: repeated numbers mean multiple 90-degree rotations (e.g., 27 appears twice = 180 degrees total)
images_to_rotate=(2 8 24 27 27 38 67 68 70 70 72)

# Process each image
for img_num in "${images_to_rotate[@]}"; do
  img_path="public/assets/${img_num}.webp"
  
  if [ ! -f "$img_path" ]; then
    echo "  ⚠ Warning: $img_path not found, skipping..."
    continue
  fi
  
  echo "Rotating $img_path by 90 degrees clockwise..."
  
  # Rotate 90 degrees clockwise and preserve quality
  magick "$img_path" -rotate 90 -quality 85 "${img_path}.temp"
  
  if [ -f "${img_path}.temp" ]; then
    # Preserve original permissions
    chmod --reference="$img_path" "${img_path}.temp" 2>/dev/null || chmod 644 "${img_path}.temp"
    mv "${img_path}.temp" "$img_path"
    echo "  ✓ Rotated $img_path"
  else
    echo "  ✗ Failed to rotate $img_path"
  fi
done

echo ""
echo "Rotation complete!"
echo "Images rotated: ${#images_to_rotate[@]} operations on $(echo ${images_to_rotate[@]} | tr ' ' '\n' | sort -u | wc -l | xargs) unique files"
