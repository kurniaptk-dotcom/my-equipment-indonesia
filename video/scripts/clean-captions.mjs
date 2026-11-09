// Removes the chunk-overlap duplicate and fixes misheard words in the transcript.
import { readFileSync, writeFileSync } from "node:fs";

const file = "src/voiceover-captions.json";
const captions = JSON.parse(readFileSync(file, "utf8"));

// Indices 61-75 are a duplicated, truncated copy of 76-92 (chunk overlap).
const cleaned = captions.filter((_, i) => i < 61 || i > 75);

const fixes = {
  " ga": " gak",
  " jegel": " jegal",
  " demikinaikan": " demi naikin",
  " sayingan": " saingan",
  " mahluk": " makhluk",
  " melayinkan": " melainkan",
  " rava": " rasa",
  " semua.": " semu.",
  " sisanya": " sisa",
};

for (const c of cleaned) {
  if (fixes[c.text] !== undefined) c.text = fixes[c.text];
}

writeFileSync(file, JSON.stringify(cleaned, null, 2));
console.log(cleaned.map((c) => c.text).join(""));
