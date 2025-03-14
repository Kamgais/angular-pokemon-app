import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';

@Component({
    selector: 'app-add-pokemon',
    template: `
    <h2 class="center">Pokemon hinzufügen</h2>
    <app-pokemon-form [pokemon] = "pokemon"></app-pokemon-form>
  `,
    styles: [],
    standalone: true,
    imports: [PokemonFormComponent]
})
export class AddPokemonComponent implements OnInit {

 pokemon:Pokemon;

  ngOnInit(): void {
    this.pokemon = new Pokemon()
  }

}
