"use client";

import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { client } from "../clients/pokeapi";
import { POKEMON_TYPE_COLORS, QueryKeys } from "../constants";
import { GetPaginatedPokemonsResponse, Pokemon } from "../types";
import SelectedPokemon from "./components/SelectedPokemon";
import Modal from "../components/Modal";
import { fetchPokemons, fetchPokemon } from "../api";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import img from "next/img";

const Pokemons = () => {
  const [page, setPage] = React.useState<number>(1);
  const [isSelectedPokemonVisible, setIsSelectedPokemonVisible] =
    React.useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState<Pokemon>();

  const {
    isLoading,
    isError,
    error,
    data: pokeListData,
    isPreviousData,
  } = useQuery({
    queryKey: [QueryKeys.POKEMON_LIST, { page }],
    queryFn: () => fetchPokemons(page),
    select(response) {
      return {
        pokemonList: response?.results,
        hasMore: Boolean(response?.next),
        count: response?.count,
      };
    },
    keepPreviousData: true,
  });

  const pokeDetailsQueries =
    pokeListData?.pokemonList?.map((pokemon) => ({
      queryKey: [QueryKeys.POKEMON, pokemon?.name],
      queryFn: () => fetchPokemon(String(pokemon.name)),
      select(data: Pokemon) {
        return data;
      },
      enabled: Boolean(pokemon?.name),
      refetchOnWindowFocus: false,
    })) || [];

  const pokeDetails = useQueries({ queries: pokeDetailsQueries });
  const totalPages = Math.ceil(Number(pokeListData?.count) / 10) || 0;

  const handleSelectPokemon = (pokemon?: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsSelectedPokemonVisible(true);
  };

  return (
    <div className="min-h-screen bg-custom-gray-50">
      <div className="">
        <Header />
        <div className="p-4 grid gap-4 max-w-7xl m-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            // TODO: fix this any
            <div>Error: {error as any}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-12">
              <div
                className={`col-span-12  grid w-full h-fit grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-16 mt-20`}
              >
                {pokeDetails?.map(({ data, isLoading }) => (
                  <button
                    id="selectpokemon"
                    key={data?.id}
                    className="bg-white h-full relative w-full p-4 shadow-sm rounded-2xl"
                    onClick={() => handleSelectPokemon(data)}
                  >
                    {isLoading ? (
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="bg-gray-200 dark:bg-gray-700 relative w-full h-32 p-4 shadow-sm rounded-2xl" />
                      </div>
                    ) : (
                      <div className="flex items-center h-full pt-8 justify-center flex-col">
                        <div
                          className={`absolute flex items-start -top-12 h-[105px]`}
                        >
                          <img
                            className="m-auto"
                            loading="lazy"
                            src={
                              data?.sprites.versions?.["generation-v"][
                                "black-white"
                              ].animated?.front_default ??
                              data?.sprites.versions?.["generation-v"][
                                "black-white"
                              ].front_default ??
                              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`
                            }
                            alt={`${data?.name} picture`}
                          />
                        </div>
                        <div className="text-center grid gap-1">
                          <span className="blck text-xs text-gray-400 mt-3 font-extrabold">
                            N°{data?.id}
                          </span>
                          <span className="mt-2 block text-lg text-gray-800 font-bold capitalize">
                            {data?.name}
                          </span>
                          <ul className="flex gap-2 justify-center">
                            {data?.types.map((type) => (
                              <li
                                style={{
                                  backgroundColor:
                                    POKEMON_TYPE_COLORS[
                                      type.type
                                        .name as keyof typeof POKEMON_TYPE_COLORS
                                    ],
                                }}
                                className={`font-semibold px-3 py-1 rounded-lg text-white text-[11px] uppercase`}
                                key={type.type.name}
                              >
                                {type.type.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-center mt-12">
          <button
            className="disabled:text-gray-300  disabled:cursor-not-allowed"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            <AiOutlineArrowLeft className="h-6 w-6" />
          </button>
          {Array.from(Array(totalPages).keys())
            .filter(
              (current) =>
                (page <= 10 && current < 10) ||
                (page > 10 &&
                  current >= Math.floor((page - 1) / 10) * 10 &&
                  current < Math.floor((page - 1) / 10) * 10 + 10)
            )
            .map((current) => (
              <button
                key={current + 1}
                onClick={() => setPage(current + 1)}
                className={`${
                  page === current + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                } text-sm shadow-sm rounded-lg px-4 py-2 mr-2`}
              >
                {current + 1}
              </button>
            ))}
          <button
            onClick={() => {
              if (!isPreviousData && pokeListData?.hasMore) {
                setPage((old) => old + 1);
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={isPreviousData || !pokeListData?.hasMore}
          >
            <AiOutlineArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isSelectedPokemonVisible}
        onClose={() => setIsSelectedPokemonVisible(false)}
      >
        <SelectedPokemon selectedPokemon={selectedPokemon} />
      </Modal>
    </div>
  );
};

export default Pokemons;
