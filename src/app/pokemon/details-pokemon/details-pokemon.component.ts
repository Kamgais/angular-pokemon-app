import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemons';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html'
})
export class DetailsPokemonComponent implements OnInit {
   
  pokemon:Pokemon|undefined;

  constructor(private route:ActivatedRoute, private router:Router,
                private pokemonService:PokemonService) { }

  ngOnInit(): void {
   
    const pokemonId:string|null = this.route.snapshot.paramMap.get('id')
    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId).subscribe(
        pokemon=> this.pokemon = pokemon
      )
    }
    
   
  }


  deletePokemon(pokemon:Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(
      ()=>{this.goToPokemonList()}
    )
  }


  goToPokemonList() {
    this.router.navigate(['/pokemons'])
  }

  goToEditPokemon(pokemon:Pokemon){
    this.router.navigate(['/edit/pokemons',pokemon.id])
  }

}