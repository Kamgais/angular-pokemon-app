import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemons';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-details-pokemon',
    templateUrl: './details-pokemon.component.html',
    standalone: true,
    imports: [NgIf, NgFor, LoaderComponent, DatePipe, PokemonTypeColorPipe]
})
export class DetailsPokemonComponent implements OnInit {
   
  pokemon:Pokemon|undefined;

  constructor(
    private route:ActivatedRoute, private router:Router,
    private pokemonService:PokemonService,
    private title: Title
              ) { }

  ngOnInit(): void {
   
    const pokemonId:string|null = this.route.snapshot.paramMap.get('id')
    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.initTitle(pokemon);
   
        })
    }
    
   
  }


  initTitle(pokemon: Pokemon| undefined) {
    if(!pokemon) {
      this.title.setTitle('Pokemon not found');
      return;
    }

    this.title.setTitle(pokemon.name);
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
