import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemByCategory, ItemCategoryList, ItemDetails, Items } from './item';
import { PokemonDetails, PokemonFilterByType, PokemonMoves, Pokemons, PokemonSpecies } from './pokemon';
import { environment } from 'src/environments/environment';
// import { itemCategoryURL, itemsURL, pokemonsURL } from './urls';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number): Observable<Pokemons> {
    return this.http.get<Pokemons>(environment.pokemonsURL + '?limit=' + limit + '&offset=' + offset);
  }

  getPokemonDetails(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url);
  }

  getPokemonSpeciesDetails(url: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(url);
  }

  getPokemonMovesDetails(url: string) {
    return this.http.get<PokemonMoves>(url);
  }

  getItems(limit: number, offset: number): Observable<Items>{
    return this.http.get<Items>(environment.itemsURL + '?limit=' + limit + '&offset=' + offset);
  }

  getItemDetails(url: string): Observable<ItemDetails>{
    return this.http.get<ItemDetails>(url);
  }

  getItemCategoryList(): Observable<ItemCategoryList>{
    return this.http.get<ItemCategoryList>(environment.itemCategoryURL + `?limit=45&offset=0"` );
  }

  getItemByCategory(category: string){
    return this.http.get<ItemByCategory>(environment.itemCategoryURL + `/${category}`);
  }

  getPokemonByType(type: string): Observable<PokemonFilterByType>{
    return this.http.get<PokemonFilterByType>(environment.typeURL + type);
  }
}
