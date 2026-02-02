/**
 * Service API pour Dragon Ball
 * Documentation : https://web.dragonball-api.com/
 */

const BASE_URL = "https://dragonball-api.com/api";

/**
 * Récupère tous les personnages Dragon Ball
 * @returns {Promise<Array>} Liste des personnages
 */
export async function getAllCharacters() {
  try {
    // Requête HTTP / Attente réponse
    const response = await fetch(`${BASE_URL}/characters?limit=100`);
    // Vérification réponse serveur OK (200-299)
    // Si 404 ou 500 -> erreur
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    // Conversion réponse -> objet JavaScript
    const data = await response.json();
    //  Return tableau personnages (pas l'objet complet)
    return data.items;
  } catch (error) {
    console.error("Erreur getAllCharacters:", error.message);
    throw error;
  }
}
