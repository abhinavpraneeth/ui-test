import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PokemonListDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  height: number;
  weight: number;
  sprites: ImageSprites;
  listOfAbilities: string[];
  abilities: any[];
}
export interface ImageSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export const CARDS_PER_PAGE = [10, 20, 50];

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset = 0): Observable<PokemonListDto> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonListDto>(url);
  }

  getPokemon(url: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(url).pipe(
      map((detail) => {
        detail.listOfAbilities = detail?.abilities.map(
          (obj) => obj?.ability?.name
        );
        return detail;
      })
    );
  }
}
