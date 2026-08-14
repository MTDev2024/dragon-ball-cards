import { useRef } from "react";
import { Link } from "react-router-dom";
import RowCard from "./RowCard";

function ScrollButton({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Précédent" : "Suivant"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.12] bg-white/[.02] text-white/70 transition-all duration-200 hover:border-yellow-400/50 hover:text-yellow-400"
    >
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
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
    <section className="mb-[52px]">
      <div className="mb-[18px] flex items-end justify-between px-6 md:px-12 lg:px-14">
        <div className="flex items-center gap-3.5">
          <span
            className="block h-5 w-[3px] rounded-sm"
            style={{ background: "linear-gradient(180deg, #facc15, rgba(250,204,21,0))" }}
          />
          <h2 className="text-xl font-semibold tracking-[-0.01em] text-[#f4f4f6]">
            {title}
          </h2>
          <span className="text-xs font-medium text-white/35">
            {characters.length} fiches
          </span>
        </div>

        <div className="flex gap-2">
          <ScrollButton direction="left" onClick={() => scrollByAmount(-700)} />
          <ScrollButton direction="right" onClick={() => scrollByAmount(700)} />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-14 py-8 snap-x snap-mandatory scroll-smooth"
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
    </section>
  );
}

export default CharacterRow;
