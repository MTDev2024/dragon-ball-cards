import CharacterCard from "./CharacterCard";

/**
 * Grille de personnages Dragon Ball
 * @param {Object} props
 * @param {Array} props.characters - Tableau de personnages à afficher
 */
function CharacterGrid({ characters }) {
  return (
    <div className="w-[70%] mx-auto grid grid-cols-4 pt-10 p-4  gap-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          image={character.image}
          race={character.race}
          gender={character.gender}
          affiliation={character.affiliation}
          ki={character.ki}
          maxKi={character.maxKi}
        />
      ))}
    </div>
  );
}

export default CharacterGrid;
