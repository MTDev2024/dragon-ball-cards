import { useState, useEffect } from "react";
import { getAllCharacters } from "../services/dragonBallApi";
import { categorize } from "../utils/characterCategories";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CharacterRow from "../components/CharacterRow";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const rows = categorize(characters);

  return (
    <div className="min-h-screen bg-ink-800">
      <Navbar />
      <Hero />

      <main className="relative z-30 -mt-10 pb-10">
        {rows.map((row) => (
          <CharacterRow
            key={row.key}
            title={row.title}
            characters={row.characters}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
