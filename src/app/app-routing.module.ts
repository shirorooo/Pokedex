import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'pokemon', component: PokemonListComponent},
  {path: 'pokemon/:id', component: PokemonDetailsComponent},
  {path: 'item', component: ItemListComponent},
  {path: '**', component: PageNotFoundComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  LandingPageComponent, 
  PokemonListComponent, 
  ItemListComponent,
  PageNotFoundComponent,
  PokemonDetailsComponent,
];
