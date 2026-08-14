import { useRef } from "react";
import { Link } from "react-router-dom";
import RowCard from "./RowCard";

function ScrollButton({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Défiler vers la gauche" : "Défiler vers la droite"}
      className={`group/btn hidden md:flex items-center ${
        isLeft ? "justify-start left-0 bg-gradient-to-r" : "justify-end right-0 bg-gradient-to-l"
      } absolute top-0 bottom-0 z-20 w-20 from-gray-950/90 to-transparent text-white opacity-0 outline-none transition-opacity group-hover/row:opacity-100 group-focus-within/row:opacity-100 focus-visible:opacity-100`}
    >
      <span
        className={`flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-gray-950/80 shadow-lg transition-all duration-200 group-hover/btn:scale-110 group-hover/btn:bg-yellow-500 group-hover/btn:text-gray-900 group-hover/btn:border-yellow-400 group-focus-visible/btn:ring-2 group-focus-visible/btn:ring-yellow-400 group-focus-visible/btn:ring-offset-2 group-focus-visible/btn:ring-offset-gray-950 ${
          isLeft ? "ml-3" : "mr-3"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </span>
    </button>
  );
}

/**
 * Rangée horizontale scrollable de personnages
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.characters
 */
function CharacterRow({ title, characters }) {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white px-6 md:px-12 mb-4">
        {title}
      </h2>

      <div className="relative group/row">
        <ScrollButton direction="left" onClick={() => scrollByAmount(-500)} />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-12 py-8 snap-x snap-mandatory scroll-smooth"
        >
          {characters.map((character) => (
            <Link
              key={character.id}
              to={`/character/${character.id}`}
              className="snap-start shrink-0"
            >
              <RowCard character={character} />
            </Link>
          ))}
        </div>

        <ScrollButton direction="right" onClick={() => scrollByAmount(500)} />
      </div>
    </section>
  );
}

export default CharacterRow;
