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
      .pipe(
        catchError(this.catchError),
        map(res => {
          const { results } = res;

          return this.setPokemonId(results);
        }),
      )
      .subscribe(list => {
        this.pokemonList$.next(list);
      });
  }

  private catchError = (err: HttpErrorResponse) => {
    this.error$.next(err);

    return EMPTY;
  };
}
