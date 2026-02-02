import { useState, useEffect } from "react";
import { getAllCharacters } from "../services/dragonBallApi";
import CharacterCard from "../components/CharacterCard";
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

  return (
    <div className="p-8 ">
      <div className="flex items-center justify-center gap-4 mb-8 pt-8">
        <img src={Shenron} alt="Shenron" className="h-16" />
        <h1 className="text-4xl font-bold text-gray-700">
          Dragon Ball Z Characters
        </h1>
      </div>
      <div className="w-[70%] mx-auto grid grid-cols-4 pt-10 p-4  gap-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            image={character.image}
            race={character.race}
            gender={character.gender}
            affiliation={character.affiliation}
            ki={character.ki}
            maxKi={character.maxKi}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
