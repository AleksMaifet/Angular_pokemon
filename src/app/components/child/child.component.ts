import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPokemon } from '@app/services';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  @Input({ required: true }) pokemonList!: IPokemon[];

  getPokemonImageUrl(id?: string) {
    if (id) {
      return `${environment.imageUrl}${id}.gif`;
    }
    return null;
  }
}
