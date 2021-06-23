import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { PokedexService } from '../pokedex.service';
import { Pokemon, PokemonDetails, PokemonLimit, } from '../pokemon';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})

export class PokemonListComponent implements OnInit {

  public pageLimit: PokemonLimit[] = [
    { limit: 10 },
    { limit: 20 },
    { limit: 30 },
    { limit: 40 },
    { limit: 50 },
  ]

  public screenWidth = 0;
  public column = 0;
  public pokemonDetails: PokemonDetails[] = [];
  public totalNumberOfPokemons = 0;
  public currentPage = 1;
  public currentOffset = 0;
  public limit = 20;


  constructor(
    private pokemonService: PokedexService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setColumn();
    this.getListOfPokemons();
    console.log(this.limit)
  }


  getListOfPokemons() {
    const pokemonObservable: Observable<PokemonDetails>[] = [];

    this.pokemonService.getPokemons(this.limit, (this.currentOffset) * (this.currentPage - 1))
      .subscribe((response) => {
        this.totalNumberOfPokemons = response.count;


        // I used fork join
        response.results.map((pokemon) => {
          pokemonObservable.push(this.pokemonService.getPokemonDetails(pokemon.url));
        });

        forkJoin([...pokemonObservable]).subscribe((pokemon) => {
          this.pokemonDetails = [...pokemon]
        })
      });
  }

  setColumn() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1324) {
      this.column = 5;
    }
    else if (this.screenWidth <= 1324 && this.screenWidth >= 1222) {
      this.column = 4;
    }
    else if (this.screenWidth <= 1221 && this.screenWidth >= 802) {
      this.column = 3;
    }
    else if (this.screenWidth <= 803 && this.screenWidth >= 640) {
      this.column = 2;
    }
    else if (this.screenWidth <= 641 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

  onSelect(pokemon: PokemonDetails) {
    this.router.navigate(['/pokemon-details', pokemon.id]);
  }

  typeColor(type: string) {
    switch (type) {
      case 'normal':
        return '#a8a878';
      case 'fighting':
        return '#c03028';
      case 'flying':
        return '#a890f0';
      case 'poison':
        return '#a040a0';
      case 'ground':
        return '#e0c068';
      case 'rock':
        return '#b8a038';
      case 'bug':
        return '#a8b820';
      case 'ghost':
        return '#705898';
      case 'steel':
        return '#b8b8d0';
      case 'fire':
        return '#f08030';
      case 'water':
        return '#6890f0';
      case 'grass':
        return '#78c850';
      case 'electric':
        return '#f8d030';
      case 'psychic':
        return '#f85888';
      case 'ice':
        return '#98d8d8';
      case 'dragon':
        return '#7038f8';
      case 'dark':
        return '#705848';
      case 'fairy':
        return '#fc68d0';
      case 'shadow':
        return '#64515e';
      default:
        return 'black';
    }
  }

  limiter(limit: number) {
    console.log(limit);
    switch (limit) {
      case 10:
        this.limit = 10;
        this.pokemonDetails = [];
        this.getListOfPokemons()
        break;
      case 20:
        this.limit = 20;
        this.pokemonDetails = [];
        this.getListOfPokemons()
        break;
      case 30:
        this.limit = 30;
        this.pokemonDetails = [];
        this.getListOfPokemons()
        break;
      case 40:
        this.limit = 40;
        this.pokemonDetails = [];
        this.getListOfPokemons()
        break;
      default:
        this.limit = 50;
        this.pokemonDetails = [];
        this.getListOfPokemons()
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1324) {
      this.column = 5;
    }
    else if (this.screenWidth <= 1324 && this.screenWidth >= 1222) {
      this.column = 4;
    }
    else if (this.screenWidth <= 1221 && this.screenWidth >= 802) {
      this.column = 3;
    }
    else if (this.screenWidth <= 801 && this.screenWidth >= 640) {
      this.column = 2;
    }
    else if (this.screenWidth <= 641 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

}
function concatMap(arg0: (res: Pokemon) => void): import("rxjs").OperatorFunction<Pokemon, unknown> {
  throw new Error('Function not implemented.');
}

