#!/bin/bash

TARGET="/home/ubuntu/Scrivania/zaccaria-autonoleggio/src/components/ui/EnhancedMobileMenu.js"
LOGO_WRAPPER="/home/ubuntu/Scrivania/zaccaria-autonoleggio/src/components/layout/OptimizedHeader.js"

if [ ! -f "$TARGET" ]; then
  echo "❌ Menu file not found: $TARGET"
  exit 1
fi

echo "📦 Backup file..."
cp "$TARGET" "$TARGET.bak"
cp "$LOGO_WRAPPER" "$LOGO_WRAPPER.bak"

echo "🛠 1. X hamburger always clickable and visible"
sed -i 's/className={`md:hidden .* transition-all duration-300 bg-transparent /className={`md:hidden fixed top-6 right-6 z-\[100\] w-12 h-12 flex flex-col justify-center items-center transition-transform duration-500 bg-transparent cursor-pointer /' "$TARGET"

echo "🎯 2. Make content start lower, prevent logo overlap"
sed -i 's/container relative z-10 h-full .* px-6 py-20/container relative z-10 h-full mt-28 px-6 py-20 flex flex-col justify-start/' "$TARGET"

echo "🎨 3. Background: premium overlay, soft blur"
sed -i 's/className={`fixed inset-0 z-40 .*/className={`fixed inset-0 z-40 transform transition-transform duration-700 ease-\[cubic-bezier\(0.77,0,0.175,1\)\] bg-gradient-to-br from-black via-neutral-900 to-neutral-950 backdrop-blur-md backdrop-saturate-150 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}/' "$TARGET"

echo "🎞 4. Rimuove clip-path vecchio (ora è slide-in)"
sed -i '/clip-path:/d' "$TARGET"

echo "🪄 5. Aggiunta effetto cascata su voci menu"
sed -i 's/style={{ transitionDelay: isOpen ? `${index \* 100 \+ 100}ms` : '\''0ms'\'' }}/style={{ transitionDelay: isOpen ? `${index \* 120}ms` : '\''0ms'\'' }}/' "$TARGET"

echo "🎯 6. Hamburger animato"
# Ruota la prima e terza linea
sed -i 's/rotate-45 translate-y-2/rotate-45 translate-y-2 scale-110/' "$TARGET"
sed -i 's/-rotate-45 -translate-y-2/-rotate-45 -translate-y-2 scale-110/' "$TARGET"

echo "✅ Deluxe mobile menu experience applied. Slide-in, premium background, smooth nav."
