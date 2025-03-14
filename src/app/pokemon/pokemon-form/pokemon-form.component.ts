import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-pokemon-form',
    templateUrl: './pokemon-form.component.html',
    styleUrls: ['./pokemon-form.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, LoaderComponent, PokemonTypeColorPipe]
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon:Pokemon;
   types:string[]
   isAddForm:boolean= this.router.url.includes('add')
  constructor(private pokemonService:PokemonService, private router:Router) { }

  ngOnInit(): void {
    //PokemonTypeList
     this.types = this.pokemonService.getPokemonTypeList()
  }

  hasType(type:string):boolean{
    return this.pokemon.types.includes(type);
  }

  selectType($event:Event,type:string){
    const isChecked:boolean = ($event.target as HTMLInputElement).checked;
    if(isChecked){
      this.pokemon.types.push(type)
    }
    else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index,1)
    }
  }

  onSubmit():void {
   // console.log('Submit form')
   if(this.isAddForm){
     
    this.pokemonService.addPokemon(this.pokemon).subscribe(
      (pokemon)=>  this.router.navigate(['/pokemons',pokemon?.id])

    )


   }
     else {
       this.pokemonService.updatePokemon(this.pokemon).subscribe(
      ()=>  this.router.navigate(['/pokemons',this.pokemon.id])

    )
   
  }
}

  isTypesValid(type:string):boolean {

    if(this.pokemon.types.length === 1 && this.hasType(type)){
       return false;
    }


    if(this.pokemon.types.length > 2 && !this.hasType(type)) {

      return false;

    }

    return true;
  }

}
