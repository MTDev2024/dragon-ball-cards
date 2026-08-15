import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterById } from "../services/dragonBallApi";
import { isFusion } from "../utils/characterCategories";
import LoadingSpinner from "../components/LoadingSpinner";
import TransformationGallery from "../components/TransformationGallery";

function Chip({ label, value, accent }) {
  if (!value) return null;
  return (
    <span
      translate="no"
      className={`px-3 py-1 rounded-full text-sm font-semibold border ${
        accent
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-gray-800 text-gray-200 border-gray-700"
      }`}
    >
      {label} : {value}
    </span>
  );
}

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchCharacter() {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacter();
  }, [id]);

  if (loading) return <LoadingSpinner message="Chargement du personnage..." />;

  if (error)
    return (
      <div className="text-center text-red-500 py-12">Erreur : {error}</div>
    );

  if (!character)
    return (
      <div className="text-center text-white py-12">
        Personnage introuvable
      </div>
    );

  const fusion = isFusion(character);

  return (
    <div className="bg-gray-950 min-h-screen text-white px-6 md:px-12 py-8">
      <main className="mx-auto max-w-[1600px]">
        <Link
          to="/"
          className="inline-block text-yellow-400 hover:text-yellow-300 mb-6"
        >
          ← Retour
        </Link>

        {/* En-tête */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative shrink-0 mx-auto md:mx-0">
            <img
              src={character.image}
              alt={character.name}
              className="w-72 h-72 object-contain bg-gray-900 rounded-lg"
            />
            {fusion && (
              <span className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full uppercase">
                Fusion
              </span>
            )}
          </div>

          <div className="flex-1">
            <h1
              translate="no"
              className="text-4xl font-extrabold text-yellow-400 mb-4"
            >
              {character.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Chip label="Race" value={character.race} />
              <Chip label="Genre" value={character.gender} />
              <Chip label="Affiliation" value={character.affiliation} />
              <Chip label="Ki" value={character.ki} accent />
              <Chip label="Ki Max" value={character.maxKi} accent />
            </div>
            <p lang="es" className="text-gray-300 leading-relaxed max-w-3xl">
              {character.description}
            </p>
          </div>
        </div>

        {/* Planète d'origine */}
        {character.originPlanet && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Planète d'origine</h2>
            <div className="flex flex-col sm:flex-row gap-6 bg-gray-900 rounded-lg p-6">
              {character.originPlanet.image && (
                <img
                  src={character.originPlanet.image}
                  alt={character.originPlanet.name}
                  className="w-40 h-40 object-contain bg-gray-800 rounded shrink-0"
                />
              )}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 translate="no" className="text-xl font-bold">
                    {character.originPlanet.name}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      character.originPlanet.isDestroyed
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {character.originPlanet.isDestroyed
                      ? "Détruite"
                      : "Intacte"}
                  </span>
                </div>
                <p lang="es" className="text-gray-300 max-w-3xl">
                  {character.originPlanet.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Transformations */}
        {character.transformations?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Transformations</h2>
            <TransformationGallery
              transformations={character.transformations}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default CharacterDetail;
