import { useState, useEffect } from "react";
import { getAllCharacters } from "../services/dragonBallApi";
import CharacterGrid from "../components/CharacterGrid";
import Shenron from "../assets/Shenron.png";

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
  if (loading)
    return <div className="text-center text-white py-12">Chargement...</div>;
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

  return <CharacterGrid characters={characters} />;
}

export default Home;
