function CharacterCard({ name, image, race, gender, affiliation, ki, maxKi }) {
  return (
    <div className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-contain rounded mb-4 bg-gray-900"
      />

      <h2 className="text-yellow-500 text-2xl font-bold mb-3">{name}</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Race :</span>
          <span className="text-white font-semibold">{race}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Gender :</span>
          <span className="text-white font-semibold">{gender}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Affiliation :</span>
          <span className="text-white font-semibold">{affiliation}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">ki :</span>
          <span className="text-white font-semibold">{ki}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Max Ki :</span>
          <span className="text-white font-semibold">{maxKi}</span>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
