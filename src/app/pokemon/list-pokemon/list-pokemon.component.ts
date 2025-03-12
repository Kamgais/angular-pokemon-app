import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemons';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { BordCardDirective } from '../bord-card.directive';
import { NgFor, DatePipe } from '@angular/common';
import { SearchComponentComponent } from '../search-component/search-component.component';

@Component({
    selector: 'app-list-pokemon',
    templateUrl: './list-pokemon.component.html',
    styles: [],
    standalone: true,
    imports: [SearchComponentComponent, NgFor, BordCardDirective, DatePipe, PokemonTypeColorPipe]
})
export class ListPokemonComponent implements OnInit {
  pokemonList:Pokemon[]
  constructor(private router:Router, 
    private pokemonService:PokemonService) {
  
   }

   ngOnInit(): void {
  this.pokemonService.getPokemonList().subscribe(
    pokemonList=> this.pokemonList = pokemonList
  )
   }

   goToPokemon(pokemon:Pokemon){
     this.router.navigate(['/pokemons',pokemon.id])
   }

   goToAddPokemon(){
     this.router.navigate(['/pokemon/add'])
   }

 


}
