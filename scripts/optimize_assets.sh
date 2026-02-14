#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"

# Enable nullglob to handle no matches
shopt -s nullglob

echo "Starting asset optimization..."

# Process Images
find assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read img; do
  filename=$(basename "$img")
  extension="${filename##*.}"
  basename="${filename%.*}"
  dir=$(dirname "$img")
  webp_path="$dir/$basename.webp"
  
  echo "Converting $img to WebP..."
  magick "$img" -quality 80 "$webp_path"
  
  if [ -f "$webp_path" ]; then
    echo "Updating references to $filename..."
    # Find files containing the filename and replace it
    grep -rl "$filename" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude="*.webp" --exclude="optimize_assets.sh" | while read file; do
      sed -i '' "s/$filename/$basename.webp/g" "$file"
      echo "  Updated $file"
    done
    
    echo "Removing original $img"
    rm "$img"
  else
    echo "Failed to convert $img"
  fi
done

# Process Videos
find assets -type f -name "*.mp4" -size +10M | while read vid; do
  echo "Compressing video $vid..."
  mv "$vid" "${vid}.original"
  
  # Remove audio (-an) and compress
  ffmpeg -y -i "${vid}.original" -c:v libx264 -crf 28 -preset medium -an "$vid" < /dev/null
  
  if [ $? -eq 0 ]; then
    original_size=$(du -h "${vid}.original" | cut -f1)
    new_size=$(du -h "$vid" | cut -f1)
    echo "Compressed $vid: $original_size -> $new_size"
    rm "${vid}.original"
  else
    echo "Failed to compress $vid, restoring original."
    mv "${vid}.original" "$vid"
  fi
done

echo "Optimization complete."
