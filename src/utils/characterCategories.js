// Ids des personnages de fusion connus (l'API ne les distingue pas)
export const FUSION_IDS = [15, 65, 66]; // Gotenks, Gogeta, Vegetto

const GOD_RACES = ["God", "Angel"];
const VILLAIN_AFFILIATIONS = ["Villain", "Army of Frieza"];
const Z_FIGHTER_AFFILIATIONS = ["Z Fighter", "Assistant of Beerus"];

export function isFusion(character) {
  return FUSION_IDS.includes(character.id);
}

/**
 * Répartit les personnages en rangées thématiques pour la homepage.
 * Chaque personnage n'apparaît que dans une seule rangée.
 */
export function categorize(characters) {
  const fusions = characters.filter(isFusion);
  const claimed = new Set(fusions.map((c) => c.id));

  const gods = characters.filter(
    (c) => !claimed.has(c.id) && GOD_RACES.includes(c.race)
  );
  gods.forEach((c) => claimed.add(c.id));

  const villains = characters.filter(
    (c) => !claimed.has(c.id) && VILLAIN_AFFILIATIONS.includes(c.affiliation)
  );
  villains.forEach((c) => claimed.add(c.id));

  const zFighters = characters.filter(
    (c) => !claimed.has(c.id) && Z_FIGHTER_AFFILIATIONS.includes(c.affiliation)
  );
  zFighters.forEach((c) => claimed.add(c.id));

  const others = characters.filter((c) => !claimed.has(c.id));

  return [
    { key: "z-fighters", title: "Guerriers Z", characters: zFighters },
    { key: "villains", title: "Vilains", characters: villains },
    { key: "fusions", title: "Fusions", characters: fusions },
    { key: "gods", title: "Dieux & Anges", characters: gods },
    { key: "others", title: "Autres", characters: others },
  ].filter((row) => row.characters.length > 0);
}
