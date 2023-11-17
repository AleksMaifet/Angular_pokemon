import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { IPokemon, Nullable } from '@app/services/interfaces';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonService } from '@app/services';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  throttle = 300;
  scrollDistance = 1;

  @Input({ required: true }) pokemonList!: IPokemon[];
  @Input({ required: true }) error!: Nullable<HttpErrorResponse>;

  constructor(private readonly pokemonService: PokemonService) {}

  getPokemonImageUrl(id?: string) {
    if (id) {
      return `${environment.imageUrl}${id}.gif`;
    }
    return null;
  }

  onScroll() {
    this.pokemonService.getNextPokemonList();
  }
}
