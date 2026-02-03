import Nimbus from "../assets/nimbus.png";

/**
 * Composant de chargement
 * @param {Object} props
 * @param {string} props.message
 */
function LoadingSpinner({ message = "Chargement des personnages..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Nuage animé */}
      <img src={Nimbus} alt="Kinto-Un" className="h-64 animate-slide" />

      {/* Message */}
      <p className="text-white text-xl mt-8 animate-pulse">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
