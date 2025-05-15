const xlsx = require("xlsx");
const fs = require("fs");

const filePath = "./machines.xlsx";

if (fs.existsSync(filePath)) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  console.log("✅ Fichier trouvé. Voici un aperçu :", data.slice(0, 3)); // affiche les 3 premières lignes
} else {
  console.error("❌ Fichier introuvable :", filePath);
}
