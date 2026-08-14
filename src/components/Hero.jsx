/**
 * Bannière plein écran mettant en avant un personnage
 * @param {Object} props
 * @param {Object} props.character
 */
function Hero({ character }) {
  if (!character) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[420px] overflow-hidden flex items-center justify-center bg-gray-950">
      {/* Aura lumineuse derrière le personnage */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/60" />

      <img
        src={character.image}
        alt={character.name}
        className="relative z-10 h-full object-contain drop-shadow-[0_0_60px_rgba(250,204,21,0.45)]"
      />

      <div className="absolute z-20 bottom-10 left-0 right-0 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
          Dragon Ball Universe
        </h1>
        <p
          translate="no"
          className="text-yellow-400 text-xl mt-3 font-semibold"
        >
          {character.name}
        </p>
      </div>
    </div>
  );
}

export default Hero;
