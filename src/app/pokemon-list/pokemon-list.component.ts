import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { PokedexService } from '../pokedex.service';
import { Pokemon, PokemonDetails, PokemonLimit, Types, } from '../pokemon';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})

export class PokemonListComponent implements OnInit {

  public pageLimit: number[] = [10, 20, 30, 40, 50];
  public type = [
    {name: 'normal', color: '#a8a878'},
    {name: 'fighting', color: '#c03028'},
    {name: 'flying', color: '#a890f0'},
    {name: 'poison', color: '#a040a0'},
    {name: 'ground', color: '#e0c068'},
    {name: 'rock', color: '#b8a038'},
    {name: 'bug', color: '#a8b820'},
    {name: 'ghost', color: '#705898'},
    {name: 'steel', color: '#b8b8d0'},
    {name: 'fire', color: '#f08030'},
    {name: 'water', color: '#6890f0'},
    {name: 'grass', color: '#78c850'},
    {name: 'electric', color: '#f8d030'},
    {name: 'psychic', color: '#f85888'},
    {name: 'ice', color: '#98d8d8'},
    {name: 'dragon', color: '#7038f8'},
    {name: 'fairy', color: '#fc68d0'}

  ];

  public screenWidth = 0;
  public column = 0;
  public pokemonDetails: PokemonDetails[] = [];
  public searchAll: Pokemon[] = [];
  public searchedPokemonDetails: PokemonDetails[] = [];
  public totalNumberOfPokemons = 0;
  public currentPage = 1;
  public currentOffset = 0;
  public limit = 20;
  public search = '';
  public allPokemon = 1118;
  public initialOffset = 0;
  public filterByType = '';
  public isSearch = false;

  control = new FormControl();
  pokemonNames: string[] = [];
  filteredPokemons: Observable<string[]> | undefined;


  constructor(
    private pokemonService: PokedexService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setColumn();
    this.filter();
    this.getListOfPokemons();
    this.getListOfAllPokemons();
  }

  pokemonSearch(){
    this.pokemonDetails = [];
    this.totalNumberOfPokemons = 0;
    const pokemonObservable: Observable<PokemonDetails>[] = [];

    if( this.search.length > 2){
      const filteredPokemon = this.searchAll.filter((result) =>{
        return result.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      });
  
      filteredPokemon.map((pokemon) =>{
        this.totalNumberOfPokemons++;
        pokemonObservable.push(this.pokemonService.getPokemonDetails(pokemon.url));
      });
  
      forkJoin([...pokemonObservable]).subscribe((pokemon) =>{
        this.pokemonDetails = [...pokemon];
      });
    } 
    else {
      this.totalNumberOfPokemons = this.allPokemon;
      this.getListOfPokemons();
    }
  }

  filter(){
    this.filteredPokemons = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.pokemonNames.filter(pokemonNames => this._normalizeValue(pokemonNames).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getListOfAllPokemons() {
    const pokemonObservable: Observable<PokemonDetails>[] = [];

    this.pokemonService.getPokemons(this.allPokemon, this.initialOffset)
      .subscribe((response) => {

        response.results.map((pokemon) => {
            this.totalNumberOfPokemons++;
            this.pokemonNames.push(pokemon.name);
            this.searchAll.push(pokemon);
        });
      });
  }

  getListOfPokemons() {
    const pokemonObservable: Observable<PokemonDetails>[] = [];

    this.pokemonService.getPokemons(this.limit, (this.currentOffset) * (this.currentPage - 1))
      .subscribe((response) => {
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
    this.router.navigate([pokemon.id], {relativeTo: this.route});
  }

  typeColor(type: string) {
    let color = '';
    this.type.map((pokemonType) => {
      if(type == pokemonType.name){
        color = pokemonType.color;
      }
    });

    return color;
  }

  limiter(limit: number) {
    this.pageLimit.forEach((limiter) =>{
      if(limit == limiter){
        if(this.filterByType == ''){
          this.limit = limit;
          this.pokemonDetails = [];
          this.pageChange();
        }
        else {
          this.limit = limit;
          this.currentPage = 1;
          this.pageChange();
        }
      }
    });
  }

  filterType(type: string){
    this.pokemonDetails = [];
    this.totalNumberOfPokemons = 0;

    if(type == 'clear'){
      this.totalNumberOfPokemons = 1118;
      this.filterByType = '';
      this.getListOfPokemons();
    }
    else{
      this.filterByType = type;
      const pokemonObservable: Observable<PokemonDetails>[] = [];

      this.pokemonService.getPokemonByType(type).subscribe((pokemon) =>{
        pokemon.pokemon.map((result) =>{
          pokemonObservable.push(this.pokemonService.getPokemonDetails(result.pokemon.url));
        });

        forkJoin([...pokemonObservable]).subscribe((pokemon) =>{
          this.pokemonDetails = [...pokemon];
        });
      });
    }
  }

  pageChange(){
    if(this.filterByType != ''){
      this.pokemonDetails = this.pokemonDetails.slice(this.currentOffset, this.limit);
      this.filterType(this.filterByType);
    }
    else{
      this.getListOfPokemons();
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

