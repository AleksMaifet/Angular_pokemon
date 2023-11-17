import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IPokemon, IResponse, Nullable } from '@app/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonList$: BehaviorSubject<IPokemon[]> = new BehaviorSubject<IPokemon[]>([]);
  error$: BehaviorSubject<Nullable<HttpErrorResponse>> = new BehaviorSubject<
    Nullable<HttpErrorResponse>
  >(null);
  offset = 0;
  defaultLimit = 20;

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
          offset: this.offset,
          limit: this.defaultLimit,
        },
      })
      .pipe(
        catchError(this.catchError),
        map(res => {
          const { results } = res;

          return this.setPokemonId(results);
        }),
      )
      .subscribe(list => {
        const updatedPokemonList = this.pokemonList$.getValue().concat(list);

        this.pokemonList$.next(updatedPokemonList);
      });
  }

  getNextPokemonList() {
    this.offset += this.defaultLimit;
    this.getPokemonList();
  }

  private catchError = (err: HttpErrorResponse) => {
    this.error$.next(err);

    return EMPTY;
  };
}
