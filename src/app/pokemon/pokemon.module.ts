import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BordCardDirective } from './bord-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard';


const pkmnroutes: Routes = [
  {path:'edit/pokemons/:id' , component: EditPokemonComponent, canActivate:[AuthGuard]},
  {path:'pokemon/add', component:AddPokemonComponent, canActivate:[AuthGuard]},
  {path:'pokemons', component: ListPokemonComponent, canActivate:[AuthGuard]},
  {path:'pokemons/:id', component: DetailsPokemonComponent, canActivate:[AuthGuard]},
  
];

@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailsPokemonComponent,
    BordCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchComponentComponent,
    LoaderComponent
   
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pkmnroutes)
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
