"use client";

import { POKEMON_TYPE_COLORS } from "@/app/constants";
import { Pokemon } from "@/app/types";
import React from "react";
import img from "next/image";

type Props = {
  selectedPokemon?: Pokemon;
};

const SelectedPokemon = ({ selectedPokemon }: Props) => {
  return (
    <article>
      <div
        style={{
          backgroundColor:
            POKEMON_TYPE_COLORS[
              selectedPokemon?.types[0].type
                .name as keyof typeof POKEMON_TYPE_COLORS
            ],
        }}
        className="rounded-t-lg"
      >
        <img
          loading="lazy"
          className="h-56 aspect-square m-auto"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon?.id}.png`}
          alt={selectedPokemon?.name}
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="grid">
            <span className="font-extrabold py-2 text-gray-800 text-sm">
              HEIGHT
            </span>

            <div className="text-center text-sm font-semibold text-gray-700 py-1.5 w-full pl-6 pr-4">
              {(Number(selectedPokemon?.height) * 10) / 100}m
            </div>
          </div>
          <div>
            <span className="font-extrabold py-2 text-gray-800 text-sm">
              WEIGHT
            </span>

            <div className="text-center text-sm font-semibold text-gray-700 capitalize py-1.5 w-full pl-6 pr-4">
              {Number(selectedPokemon?.weight) / 10}kg
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-center grid gap-1">
          <span className="blck text-base text-gray-400 font-extrabold">
            #{selectedPokemon?.id}
          </span>
          <span
            style={{
              color:
                POKEMON_TYPE_COLORS[
                  selectedPokemon?.types[0].type
                    .name as keyof typeof POKEMON_TYPE_COLORS
                ],
            }}
            className="block text-2xl text-gray-800 font-bold capitalize"
          >
            {selectedPokemon?.name}
          </span>
        </div>

        <ul className="flex pt-1 pb-2  items-center justify-center gap-2">
          {selectedPokemon?.abilities.map((ability, idx) => (
            <li
              className="bg-custom-gray-50 w-fit text-center border text-sm font-semibold text-gray-700 capitalize border-gray-300 py-1.5 lg:text-left px-4 rounded-full"
              key={idx}
            >
              {ability.ability.name.replace("-", " ")}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default SelectedPokemon;
