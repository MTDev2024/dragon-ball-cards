import { motion } from "framer-motion";
import { isFusion } from "../utils/characterCategories";

/**
 * Carte compacte utilisée dans les rangées horizontales de la homepage
 * @param {Object} props
 * @param {Object} props.character
 */
function RowCard({ character }) {
  const fusion = isFusion(character);
  const hasImage = Boolean(character.image);

  return (
    <motion.div
      className="relative aspect-[3/4] w-[clamp(150px,45vw,190px)] shrink-0 overflow-hidden rounded-xl border border-white/[.07] shadow-[0_8px_24px_rgba(0,0,0,.45)] sm:w-[212px]"
      style={{ background: "linear-gradient(165deg, #161c2c 0%, #0c111c 100%)" }}
      whileHover={{
        y: -6,
        scale: 1.03,
        boxShadow:
          "0 0 0 1px rgba(250,204,21,.45), 0 0 34px rgba(250,204,21,.22), 0 18px 40px rgba(0,0,0,.6)",
        borderColor: "rgba(250,204,21,.4)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {/* Halo interne */}
      <div
        className="absolute left-1/2 top-[44%] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(250,204,21,.14), rgba(250,204,21,0) 72%)",
          filter: "blur(8px)",
        }}
      />

      {hasImage ? (
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain px-3.5 pt-3.5 pb-[42px] drop-shadow-[0_10px_22px_rgba(0,0,0,.55)]"
        />
      ) : (
        <div className="absolute inset-x-0 top-0 bottom-[42px] flex items-center justify-center">
          <span
            translate="no"
            className="bg-clip-text text-[64px] font-extrabold tracking-[-0.04em] text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(253,230,138,.55), rgba(224,168,15,.12))",
            }}
          >
            {character.name?.charAt(0) ?? "?"}
          </span>
        </div>
      )}

      {/* Voile bas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,14,0) 42%, rgba(5,7,14,.72) 78%, rgba(5,7,14,.95) 100%)",
        }}
      />

      {fusion && (
        <span className="absolute right-2.5 top-2.5 rounded-full bg-yellow-400 px-[7px] py-[3px] text-[9px] font-bold uppercase tracking-[0.14em] text-ink-700">
          Fusion
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 px-3.5 pt-3.5 pb-[15px]">
        <p
          translate="no"
          className="truncate text-sm font-semibold tracking-[-0.01em] text-[#f4f4f6]"
        >
          {character.name}
        </p>
        <p
          translate="no"
          className="mt-[3px] truncate text-[11.5px] font-medium tracking-[0.04em] text-yellow-400/60"
        >
          {character.race}
        </p>
      </div>
    </motion.div>
  );
}

export default RowCard;
