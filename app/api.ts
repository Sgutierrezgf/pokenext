import { client } from "./clients/pokeapi";
import { GetPaginatedPokemonsResponse, Pokemon } from "./types";

export const fetchPokemons = async (page: number) => {
  const response = await client.get<GetPaginatedPokemonsResponse>(
    `/pokemon?limit=10&offset=${(page - 1) * 10}`
  );

  return response.data;
};

export const fetchPokemon = async (name: string) => {
  const response = await client.get<Pokemon>(`/pokemon/${name}`);

  return response.data;
};