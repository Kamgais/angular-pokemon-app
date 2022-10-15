import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http:HttpClient){

  }

  getPokemonList():Observable<Pokemon[]>{
  // return POKEMONS;
  return this.http.get<Pokemon[]>('api/pokemons').pipe(
    tap((pokemonList)=>console.table(pokemonList)),
    catchError((error) => {console.log(error);
                  return of([])}))
}


 getPokemonById(pokemonId:number):Observable<Pokemon|undefined>{
       
        return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
          tap((pokemon)=>console.table(pokemon)),
          catchError((error) => {console.log(error);
                        return of(undefined)})
        );
}

updatePokemon(pokemon:Pokemon):Observable<any>{

  const httpOptions ={
    headers : new HttpHeaders({'content-type' : 'application/json'})
  };

  return this.http.put('api/pokemons',pokemon,httpOptions).pipe(
    tap((pokemon)=>console.log(pokemon)),
    catchError((error) => {console.log(error);
                  return of(undefined)})
  )

}


deletePokemonById(pokemonId:number):Observable<any>{

  return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
    tap((pokemon)=>console.log(pokemon)),
    catchError((error) => {console.log(error);
                  return of(undefined)})
  )

}


addPokemon(pokemon:Pokemon):Observable<Pokemon|undefined>{

  const httpOptions ={
    headers : new HttpHeaders({'content-type' : 'application/json'})
  };

  return this.http.post<Pokemon>('api/pokemons',pokemon,httpOptions).pipe(
    tap((pokemon)=>console.log(pokemon)),
    catchError((error) => {console.log(error);
                  return of(undefined)})
  )


}

searchPokemonList(term:string):Observable<Pokemon[]|undefined>{
  if(term.length<=1){
    return of([]);
  }
return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(

    tap((pokemonList)=>console.log(pokemonList)),
    catchError((error) => {console.log(error);
                  return of(undefined)})
  )

}



 getPokemonTypeList():string[]{
   return[
          'Pflanze',
          'Feuer',
          'Insekt',
          'Normal',
          'Electrik',
          'Gift',
          'Baum',
          'Fliege',
          'Kampf',
          'Psy'
        ] ;
 }
}
