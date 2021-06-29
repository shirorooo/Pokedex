import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { PokedexService } from '../pokedex.service';
import { pageLimit, Pokemon, PokemonDetails, pokemonType } from '../pokemon';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})

export class PokemonListComponent implements OnInit {

  pageLimit = pageLimit;
  type = pokemonType;
  screenWidth = 0;
  column = 0;
  pokemonDetails: PokemonDetails[] = [];
  searchAll: Pokemon[] = [];
  searchedPokemonDetails: PokemonDetails[] = [];
  totalNumberOfPokemons = 0;
  currentPage = 1;
  currentOffset = 0;
  limit = 10;
  search = '';
  allPokemon = 1118;
  initialOffset = 0;
  filterByType = '';
  isSearch = false;

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

  // WILL SEARCH THE POKEMON THAT MATCHES THE DATA IN SEARCH BAR
  pokemonSearch(){
    this.pokemonDetails = [];
    this.totalNumberOfPokemons = 0;
    const pokemonObservable: Observable<PokemonDetails>[] = [];

    // WILL PERFORM THE FILTERING AND SEARCH ONCE THE INPUT TEXT REACHES THE LENGTH OF 3
    if( this.search.length > 2){
      this.isSearch = true;

      // WILL GET ALL THE POKEMON THAT MATCHES THE TEXTS INPUT IN FORM
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
      this.isSearch = false;
      this.totalNumberOfPokemons = this.allPokemon;
      this.getListOfPokemons();
    }
  }

  // WILL PERFORM AUTOCOMPLETE
  filter(){
    this.filteredPokemons = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.pokemonNames.filter(pokemonNames => pokemonNames.toLocaleLowerCase().includes(filterValue));
  }

  // WILL GET ALL THE LIST OF POKEMON 
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

  // WILL GET THE DETAILS OF POKEMONS BASE ON THE LIMIT SET 
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

  // SETS THE COLUMN OF THE CARDS
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

  // NAVIGATE TO POKEMON DETAILS
  onSelect(pokemon: PokemonDetails) {
    this.router.navigate([pokemon.id], {relativeTo: this.route});
  }

  // WILL SET THE BACKGROUND COLOR OF EACH TYPE
  typeColor(type: string) {
    let color = '';
    pokemonType.map((pokemonType) => {
      if(type == pokemonType.name){
        color = pokemonType.color;
      }
    });

    return color;
  }

  // WILL SET THE LIMIT OF POKEMON THAT WILL BE DISPLAYED PER PAGE
  limiter(limit: number) {
    this.currentPage = 1;
    this.pageLimit.forEach((limiter) =>{
      if(limit == limiter){
        if(this.filterByType == ''){
          this.limit = limit;
          this.pokemonDetails = [];
          this.pageChange();
        }
        else {
          this.limit = limit;
          this.pageChange();
        }
      }
    });
  }

  // WILL DISPLAY THE POKEMON THAT IS FILTERED BY TYPE
  filterType(type: string){
    this.pokemonDetails = [];
    this.totalNumberOfPokemons = 0;

    if(type == 'clear'){
      // change to dynamic
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

  // WHEN PAGINATOR IS CLICKED WILL DISPLAY THE NEXT SET OF DATA
  pageChange(){
    if(this.filterByType != ''){
      this.pokemonDetails = this.pokemonDetails.slice(this.currentOffset, this.limit);
      this.filterType(this.filterByType);
    }
    else if(this.isSearch == true){
      this.pokemonDetails = this.pokemonDetails.slice(this.currentOffset, this.currentOffset + this.limit);
      this.pokemonSearch();
    }
    else{
      this.getListOfPokemons();
    }
  }


  // WILL CHECK IF THE WINDOW SIZE CHANGED
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

