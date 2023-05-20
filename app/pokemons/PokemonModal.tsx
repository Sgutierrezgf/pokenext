import React, { useEffect, useState } from "react";
import axios from "axios";

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  // Agrega más propiedades si deseas mostrar más detalles
}

interface PokemonModalProps {
  pokemonUrl: string;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemonUrl, onClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemonUrl);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonUrl]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal">
      <h2>{pokemonDetails.name}</h2>
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      {/* Agrega más detalles aquí */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PokemonModal;
