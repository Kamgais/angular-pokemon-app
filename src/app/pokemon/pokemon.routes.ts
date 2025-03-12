import { Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { PokemonService } from "./pokemon.service";

export default [{
  path: '',
  providers: [PokemonService],
  children: [
    {
      path:'edit/pokemons/:id' , 
      loadComponent: () => import('./edit-pokemon/edit-pokemon.component').then(module => module.EditPokemonComponent),
  },
    {
      path:'pokemon/add',
      title: 'Add pokemon',
      loadComponent: () => import('./add-pokemon/add-pokemon.component').then(module => module.AddPokemonComponent),
  },
    {
      path:'pokemons',
      title: 'Pokedex',
      loadComponent: () => import('./list-pokemon/list-pokemon.component').then(module => module.ListPokemonComponent),
    },
    {
      path:'pokemons/:id', 
      loadComponent: () => import('./details-pokemon/details-pokemon.component').then(module => module.DetailsPokemonComponent),
  },
  ]
}
 
  
] as Routes;