import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { PokedexService } from '../pokedex.service';
import { Moves, PokemonDetails, PokemonMoves, PokemonSpecies } from '../pokemon';
import { pokemonsURL } from '../urls';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  public pokemonID: any;
  public pokemon!: PokemonDetails;
  public statColor!: string;
  public pokemonSpecies!: PokemonSpecies;
  public pokemonMoves: PokemonMoves[] = [];
  public screenWidth = 0;
  public column = 0;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokedexService
  ) { }

  ngOnInit(): void {
    this.setColumn();
    this.pokemonID = this.route.snapshot.paramMap.get('id');
    this.getPokemonDetails();
  }

  getPokemonDetails() {
    const pokemonObservable: Observable<PokemonMoves>[] = [];
    this.pokemonService.getPokemonDetails(pokemonsURL + `/${this.pokemonID}`)
      .subscribe((response) => {
        this.pokemon = response;

        this.pokemonService.getPokemonSpeciesDetails(this.pokemon.species.url)
          .subscribe((response) => {
            this.pokemonSpecies = response;
          });

        response.moves.map((result) => {
          pokemonObservable.push(this.pokemonService.getPokemonMovesDetails(result.move.url));
        });

        forkJoin([...pokemonObservable]).subscribe((move) => {
          this.pokemonMoves = [...move]
        })
      });
  }



  typeColor(type: string) {
    switch (type) {
      case 'normal':
        this.statColor = '#a8a878';
        return '#a8a878';
      case 'fighting':
        this.statColor = '#c03028';
        return '#c03028';
      case 'flying':
        this.statColor = '#a890f0';
        return '#a890f0';
      case 'poison':
        this.statColor = '#a040a0';
        return '#a040a0';
      case 'ground':
        this.statColor = '#e0c068';
        return '#e0c068';
      case 'rock':
        this.statColor = '#b8a038';
        return '#b8a038';
      case 'bug':
        this.statColor = '#a8b820';
        return '#a8b820';
      case 'ghost':
        this.statColor = '#705898';
        return '#705898';
      case 'steel':
        this.statColor = '#b8b8d0';
        return '#b8b8d0';
      case 'fire':
        this.statColor = '#f08030';
        return '#f08030';
      case 'water':
        this.statColor = '#6890f0';
        return '#6890f0';
      case 'grass':
        this.statColor = '#78c850';
        return '#78c850';
      case 'electric':
        this.statColor = '#f8d030';
        return '#f8d030';
      case 'psychic':
        this.statColor = '#f85888';
        return '#f85888';
      case 'ice':
        this.statColor = '#98d8d8';
        return '#98d8d8';
      case 'dragon':
        this.statColor = '#7038f8';
        return '#7038f8';
      case 'dark':
        this.statColor = '#705848';
        return '#705848';
      case 'fairy':
        this.statColor = '#fc68d0';
        return '#fc68d0';
      case 'shadow':
        this.statColor = '#64515e';
        return '#64515e';
      default:
        this.statColor = 'black';
        return 'black';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1144) {
      this.column = 6;
    }
    else if (this.screenWidth <= 990 && this.screenWidth >= 580) {
      this.column = 3;
    }
    else if (this.screenWidth <= 581 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

  setColumn() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1144) {
      this.column = 6;
    }
    else if (this.screenWidth <= 990 && this.screenWidth >= 580) {
      this.column = 3;
    }
    else if (this.screenWidth <= 581 && this.screenWidth >= 390) {
      this.column = 1;
    }
  }

}
