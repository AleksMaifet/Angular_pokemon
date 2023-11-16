import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { IPokemon, Nullable } from '@app/services/interfaces';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  @Input({ required: true }) pokemonList!: IPokemon[];
  @Input({ required: true }) error!: Nullable<HttpErrorResponse>;

  getPokemonImageUrl(id?: string) {
    if (id) {
      return `${environment.imageUrl}${id}.gif`;
    }
    return null;
  }
}
