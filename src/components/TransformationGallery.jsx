import { useState } from "react";

/**
 * Galerie interactive des transformations d'un personnage
 * @param {Object} props
 * @param {Array} props.transformations
 */
function TransformationGallery({ transformations }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = transformations[selectedIndex];

  return (
    <div>
      {/* Affichage principal */}
      <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center mb-4">
        <img
          src={selected.image}
          alt={selected.name}
          className="h-72 object-contain drop-shadow-[0_0_40px_rgba(250,204,21,0.4)]"
        />
        <h3
          translate="no"
          className="text-2xl font-bold text-yellow-400 mt-4"
        >
          {selected.name}
        </h3>
        <p translate="no" className="text-gray-300 mt-1">
          Ki : {selected.ki}
        </p>
      </div>

      {/* Sélecteur de vignettes */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {transformations.map((t, index) => (
          <button
            key={t.id}
            onClick={() => setSelectedIndex(index)}
            className={`shrink-0 rounded-lg p-2 border-2 transition-colors ${
              index === selectedIndex
                ? "border-yellow-400 bg-gray-800"
                : "border-transparent bg-gray-900 hover:border-gray-600"
            }`}
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 object-contain"
            />
            <p
              translate="no"
              className="text-xs text-gray-300 mt-1 w-16 truncate"
            >
              {t.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TransformationGallery;
