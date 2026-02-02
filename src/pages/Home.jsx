import { useState, useEffect } from "react";
import { getAllCharacters } from "../services/dragonBallApi";

function Home() {
  const [characters, setCharacters] = useState([]); // Tableau vide
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

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-grey text-center mb-8 pt-8">
        🐉 Dragon Ball Z Characters
      </h1>
      <div className="w-[70%] mx-auto grid grid-cols-4 gap-4 pt-10">
        {characters.map((character) => (
          <div key={character.id} className="bg-gray-800 p-4 rounded">
            <p className="text-white font-bold">{character.name}</p>
            <p className="text-gray-400 text-sm">{character.race}</p>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
