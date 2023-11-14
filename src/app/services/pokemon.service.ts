import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';

export interface IPokemon {
  id?: string;
  name: string;
  url: string;
}

interface IResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonList$: BehaviorSubject<IPokemon[]> = new BehaviorSubject<IPokemon[]>([]);

  constructor(private readonly http: HttpClient) {
    this.getPokemonList();
  }

  private setPokemonId(pokemon: IPokemon[]) {
    return pokemon.map(pokemon => {
      const url = new URL(pokemon.url);
      const id = url.pathname.split('/').filter(Boolean).at(-1);

      return { ...pokemon, id };
    });
  }

  private getPokemonList() {
    this.http
      .get<IResponse>(`${environment.apiUrl}`, {
        params: {
          offset: 0,
          limit: 20,
        },
      })
      .subscribe(res => {
        const { results } = res;

        this.pokemonList$.next(this.setPokemonId(results));
      });
  }
}
