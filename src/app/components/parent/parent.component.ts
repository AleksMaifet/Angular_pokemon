import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '@app/components/child';
import { Observable } from 'rxjs';
import { PokemonService } from '@app/services';
import { HttpErrorResponse } from '@angular/common/http';
import { IPokemon, Nullable } from '@app/services/interfaces';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent, FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent implements OnInit {
  pokemonList$ = new Observable<IPokemon[]>();
  error$ = new Observable<Nullable<HttpErrorResponse>>();

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit() {
    const { pokemonList$, error$ } = this.pokemonService;

    this.pokemonList$ = pokemonList$;
    this.error$ = error$;
  }
}
