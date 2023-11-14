import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '@app/components/child';
import { Observable } from 'rxjs';
import { IPokemon, PokemonService } from '@app/services';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent, FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  pokemonList$ = new Observable<IPokemon[]>();

  constructor(private readonly pokemonService: PokemonService) {
    this.pokemonList$ = pokemonService.pokemonList$;
  }
}
