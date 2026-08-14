import { isFusion } from "../utils/characterCategories";

/**
 * Carte compacte utilisée dans les rangées horizontales de la homepage
 * @param {Object} props
 * @param {Object} props.character
 */
function RowCard({ character }) {
  const fusion = isFusion(character);

  return (
    <div className="group relative w-44 md:w-52 shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:z-10">
      <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[3/4] shadow-md group-hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-shadow duration-300">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-contain p-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {fusion && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Fusion
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p translate="no" className="text-white font-bold text-sm truncate">
            {character.name}
          </p>
          <p translate="no" className="text-gray-300 text-xs truncate">
            {character.race}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RowCard;
