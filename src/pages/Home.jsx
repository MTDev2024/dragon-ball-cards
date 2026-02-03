import { useState, useEffect } from "react";
import { getAllCharacters } from "../services/dragonBallApi";
import CharacterGrid from "../components/CharacterGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import Shenron from "../assets/shenron.png";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const data = await getAllCharacters();
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  // Conditions d'affichage
  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center text-red-500 py-12">Erreur : {error}</div>
    );

  if (characters.length === 0)
    return (
      <div className="text-center text-white py-12">
        Aucun personnage trouvé
      </div>
    );

  return (
    <div className="p-8">
      <div className="flex items-center justify-center gap-4 mb-8 pt-8">
        <img src={Shenron} alt="Shenron" className="h-36" />
        <h1 className="text-4xl font-bold text-gray-900">
          Dragon Ball Z Characters
        </h1>
      </div>

      {/* Grille de personnages */}
      <CharacterGrid characters={characters} />
    </div>
  );
}

export default Home;
