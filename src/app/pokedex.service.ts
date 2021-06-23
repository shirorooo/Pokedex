import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails, PokemonMoves, Pokemons, PokemonSpecies } from './pokemon';
import { pokemonsURL } from './urls';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number): Observable<Pokemons> {
    return this.http.get<Pokemons>(pokemonsURL + '?limit=' + limit + '&offset=' + offset);
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
}
