import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, Observable, Subject } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styles: [
  ]
})
export class SearchComponentComponent implements OnInit {
  // {...a..ab...abz..ab..abc}
  searchTerms = new Subject<string>()
  pokemonList$:Observable<Pokemon[]|undefined>

  constructor(private router:Router, private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.pokemonList$ = this.searchTerms.pipe(
         debounceTime(300),
         distinctUntilChanged(),
         switchMap(term=>this.pokemonService.searchPokemonList(term))
    )
  }


  search(term:string){
      this.searchTerms.next(term)
  }


  goToDetail(pokemon:Pokemon){
    const link=['/pokemons',pokemon.id];
    this.router.navigate(link)

  }

}
