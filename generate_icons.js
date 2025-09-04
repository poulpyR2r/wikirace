// Script pour générer automatiquement toutes les icônes WikiRace
// Exécuter avec : node generate_icons.js

const fs = require("fs");
const path = require("path");

// Template SVG pour WikiRace
const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${
  size / 2 - 2
}" fill="#0066CC" stroke="#ffffff" stroke-width="2"/>
  
  <!-- Wikipedia W inspired icon -->
  <g fill="#ffffff">
    <!-- W letter adapted for ${size}x${size} -->
    <path d="M${size * 0.15} ${size * 0.25} L${size * 0.25} ${size * 0.25} L${
  size * 0.35
} ${size * 0.65} L${size * 0.4} ${size * 0.35} L${size * 0.45} ${
  size * 0.35
} L${size * 0.5} ${size * 0.65} L${size * 0.6} ${size * 0.25} L${size * 0.7} ${
  size * 0.25
} L${size * 0.55} ${size * 0.75} L${size * 0.48} ${size * 0.75} L${
  size * 0.425
} ${size * 0.5} L${size * 0.37} ${size * 0.75} L${size * 0.3} ${
  size * 0.75
} Z"/>
    
    <!-- Connection dots -->
    <circle cx="${size * 0.8}" cy="${size * 0.3}" r="${
  size * 0.03
}" fill="#ffffff"/>
    <circle cx="${size * 0.85}" cy="${size * 0.45}" r="${
  size * 0.03
}" fill="#ffffff"/>
    <circle cx="${size * 0.8}" cy="${size * 0.6}" r="${
  size * 0.03
}" fill="#ffffff"/>
  </g>
</svg>`;

// Tailles d'icônes nécessaires pour PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Créer le dossier icons s'il n'existe pas
const iconsDir = path.join(__dirname, "client", "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log("🎨 Génération des icônes WikiRace...");

// Générer les SVG pour chaque taille
iconSizes.forEach((size) => {
  const svgContent = createSVGIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);

  fs.writeFileSync(filepath, svgContent.trim());
  console.log(`✅ Créé: ${filename}`);
});

// Créer aussi une version PNG simplifiée (base64 placeholder)
const pngPlaceholder = (size) =>
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAKADAAQAAAABAAAASAAAAAA`;

iconSizes.forEach((size) => {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);

  // Pour simplifier, on crée juste un placeholder
  // En production, vous devriez convertir les SVG en PNG
  fs.writeFileSync(filepath, ""); // Placeholder vide
  console.log(`📝 Placeholder créé: ${filename}`);
});

// Créer l'image Open Graph pour le partage social
const createOGImage = () => `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0066CC"/>
  
  <!-- Main content area -->
  <rect x="60" y="60" width="1080" height="510" fill="#ffffff" rx="20"/>
  
  <!-- WikiRace logo -->
  <circle cx="200" cy="200" r="80" fill="#0066CC"/>
  <g fill="#ffffff" transform="translate(160, 160)">
    <path d="M10 20 L20 20 L35 60 L45 30 L55 30 L65 60 L80 20 L90 20 L70 80 L60 80 L50 50 L40 80 L30 80 Z"/>
  </g>
  
  <!-- Title -->
  <text x="320" y="180" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#0066CC">WikiRace</text>
  <text x="320" y="230" font-family="Arial, sans-serif" font-size="32" fill="#333333">Le jeu de course Wikipedia</text>
  
  <!-- Description -->
  <text x="320" y="290" font-family="Arial, sans-serif" font-size="24" fill="#666666">Défiez vos amis dans une course passionnante</text>
  <text x="320" y="320" font-family="Arial, sans-serif" font-size="24" fill="#666666">à travers les articles Wikipedia !</text>
  
  <!-- Features -->
  <text x="320" y="380" font-family="Arial, sans-serif" font-size="20" fill="#0066CC">✓ Multijoueur en temps réel</text>
  <text x="320" y="410" font-family="Arial, sans-serif" font-size="20" fill="#0066CC">✓ 100% gratuit et sans inscription</text>
  <text x="320" y="440" font-family="Arial, sans-serif" font-size="20" fill="#0066CC">✓ Éducatif et amusant</text>
  
  <!-- URL -->
  <text x="320" y="500" font-family="Arial, sans-serif" font-size="18" fill="#999999">games.wikirace.taylora.fr</text>
</svg>`;

// Créer l'image Open Graph
const ogImagePath = path.join(__dirname, "client", "public", "og-image.svg");
fs.writeFileSync(ogImagePath, createOGImage().trim());
console.log("✅ Créé: og-image.svg");

// Créer aussi le logo principal
const logoPath = path.join(__dirname, "client", "public", "logo.svg");
fs.writeFileSync(logoPath, createSVGIcon(256).trim());
console.log("✅ Créé: logo.svg");

console.log("🎉 Toutes les icônes ont été générées !");
console.log("");
console.log("📋 Prochaines étapes :");
console.log(
  "1. Convertir les SVG en PNG avec un outil comme ImageMagick ou en ligne"
);
console.log("2. Optimiser les images avec des outils comme TinyPNG");
console.log("3. Tester les icônes avec Lighthouse PWA audit");
console.log("4. Vérifier l'affichage sur mobile et desktop");
