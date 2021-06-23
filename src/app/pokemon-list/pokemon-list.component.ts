import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { PokedexService } from '../pokedex.service';
import { Pokemon, PokemonDetails, } from '../pokemon';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})

export class PokemonListComponent implements OnInit {
  @Input() paginationPage!: number;
  @Input() paginationOffset!: number;

  public screenWidth = 0;
  public column = 0;
  public pokemonDetails: PokemonDetails[] = [];
  public totalNumberOfPokemons = 0;
  public currentPage = 1;
  public currentOffset = 0;


  constructor(
    private pokemonService: PokedexService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setColumn();
    this.getListOfPokemons();
    console.log(this.pokemonDetails)
  }


  getListOfPokemons() {
    const pokemonObservable: Observable<PokemonDetails>[] = [];

    this.pokemonService.getPokemons(20, (this.currentOffset) * (this.currentPage - 1))
      .subscribe((response) => {
        this.totalNumberOfPokemons = response.count;


        // I used fork join
        response.results.map((pokemon) => {
          pokemonObservable.push(this.pokemonService.getPokemonDetails(pokemon.url));
        });

        forkJoin([...pokemonObservable]).subscribe((pokemon) => {
          this.pokemonDetails = [...pokemon]
        })

        console.log(this.pokemonDetails)
      });
  }

  setColumn() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1144) {
      this.column = 5;
    }
    else if (this.screenWidth <= 990 && this.screenWidth >= 580) {
      this.column = 3;
    }
    else if (this.screenWidth <= 581 && this.screenWidth >= 390) {
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1144) {
      this.column = 5;
    }
    else if (this.screenWidth <= 990 && this.screenWidth >= 580) {
      this.column = 3;
    }
    else if (this.screenWidth <= 581 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

}
function concatMap(arg0: (res: Pokemon) => void): import("rxjs").OperatorFunction<Pokemon, unknown> {
  throw new Error('Function not implemented.');
}

