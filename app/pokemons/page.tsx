"use client";

import { signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {};

interface Pokemon {
  name: string;
  image: string;
  height: number;
  weight: number;
}

const Pokemons = (props: Props) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemonList();
  }, [currentPage]);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${
          (currentPage - 1) * 10
        }`
      );
      const { results, count } = response.data;
      const pokemons = await Promise.all(
        results.map(async (pokemon: any) => {
          const response = await axios.get(pokemon.url);
          const { name, sprites, height, weight } = response.data;
          return {
            name,
            image: sprites.front_default,
            height,
            weight,
          };
        })
      );
      setPokemonList(pokemons);
      setTotalPages(Math.ceil(count / 10));
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchPokemonList();
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pokémon List</h1>
        <button
          onClick={() => signOut()}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSearchSubmit} className="mb-4 text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Pokémon by name"
          className="border border-gray-300 rounded px-4 py-2 mr-2 "
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Search
        </button>
      </form>
      <div className="grid gap-x-8 gap-y-4 grid-cols-3">
        {filteredPokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon)}
            className="cursor-pointer justify-self-center"
          >
            <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24" />
            <p className="text-center">{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-600 rounded px-4 py-2 mr-2"
        >
          Previous Page
        </button>
        {Array.from(Array(totalPages).keys())
          .filter(
            (page) =>
              (currentPage <= 10 && page < 10) ||
              (currentPage > 10 &&
                page >= Math.floor((currentPage - 1) / 10) * 10 &&
                page < Math.floor((currentPage - 1) / 10) * 10 + 10)
          )
          .map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              } rounded px-4 py-2 mr-2`}
            >
              {page + 1}
            </button>
          ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-600 rounded px-4 py-2"
        >
          Next Page
        </button>
      </div>
      {selectedPokemon && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-64 p-4 rounded z-50">
            <h2 className="text-xl font-bold mb-2">{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="w-full"
            />
            <p className="mt-2">Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
