#!/bin/bash

echo "🔍 Searching for unnecessary, backup, and temporary files..."

# Estensioni e nomi noti da rimuovere
PATTERNS=(
  "*.bak"
  "*.tmp"
  "*~"
  "*.swp"
  "*.log"
  ".DS_Store"
  "*.old"
  "*.orig"
  "*.copy"
  "*.zip"
)

# Cartelle da eliminare se presenti
DIRS=(
  ".turbo"
  ".next"
  "dist"
  "coverage"
)

# Trova i file corrispondenti
echo "🧾 Scanning files..."
FOUND_FILES=()
for pattern in "${PATTERNS[@]}"; do
  while IFS= read -r file; do
    FOUND_FILES+=("$file")
  done < <(find . -type f -name "$pattern")
done

# Aggiunge cartelle
for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    FOUND_FILES+=("$dir")
  fi
done

# Se non trova nulla
if [ ${#FOUND_FILES[@]} -eq 0 ]; then
  echo "✅ No unnecessary or backup files found."
  exit 0
fi

# Mostra i risultati
echo "⚠️ The following files/folders were found and can be deleted:"
printf '%s\n' "${FOUND_FILES[@]}"
echo

# Chiede conferma
read -p "❓ Do you want to delete ALL of these? (y/N): " CONFIRM
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
  echo "🧹 Cleaning up..."
  for item in "${FOUND_FILES[@]}"; do
    rm -rf "$item"
    echo "❌ Removed: $item"
  done
  echo "✅ Cleanup complete!"
else
  echo "❌ Cleanup aborted by user."
fi
