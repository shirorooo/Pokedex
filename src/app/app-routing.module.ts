import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: 'item-list', component: ItemListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  LandingPageComponent, 
  PokemonListComponent, 
  ItemListComponent
];
