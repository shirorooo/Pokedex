import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { PokedexService } from '../pokedex.service';
import { PokemonDetails, PokemonEvolution, PokemonMoves, PokemonSpecies, pokemonType } from '../pokemon';
import { environment } from 'src/environments/environment';
// import { pokemonsURL } from '../urls';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  type = pokemonType;
  pokemonURL: any;
  pokemon!: PokemonDetails;
  statColor!: string;
  pokemonSpecies!: PokemonSpecies;
  pokemonMoves: PokemonMoves[] = [];
  screenWidth = 0;
  column = 0;
  previousPokemon = 0;
  nextPokemon = 0;
  primaryForm!: PokemonDetails;
  tierTwoEvolution: PokemonDetails[] = [];
  tierThreeEvolution: PokemonDetails[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokedexService
  ) { }

  ngOnInit(): void {
    this.getParamID();
    this.getPokemonDetails();
    this.setColumn();
  }

  // WILL CHECK IF THE ID IS VALID
  getParamID(){
    this.route.paramMap
    .subscribe((params: ParamMap) => {
      this.pokemonURL = params.get('id');
    },
    (error) =>{
      this.router.navigate(['error-404']);
    });
  }

  // NAVIGATE TO POKEMON DETAILS
  showPokemonDetails(pokemonID: number){
    this.router.navigateByUrl('pokemon', {skipLocationChange: true}).then(() => {
      this.router.navigate(['pokemon', pokemonID]);
    });
  }
  
  // WILL GET THE ID 
  getID(id: number){

    let pokemonID: string = '';
    if(id.toString().length == 1){
      pokemonID = `#00${id}`;
    }
    else if(id.toString().length == 2){
      pokemonID = `#0${id}`;
    }
    else{
      pokemonID = `#${id}`;
    }

    return pokemonID;
  }

  // WILL CONVERT THE HEIGHT FROM API
  getHeight(height: number){
    return parseFloat((height * 3.0937).toFixed(1));
  }

  // WILL CONVERT THE WEIGHT FROM API
  getWeight(weight: number){
    return parseFloat((weight / 4.536
      ).toFixed(1));
  }

  // WILL GET THE DETAIL OF THE POKEMON
  getPokemonDetails() {

    const pokemonObservable: Observable<PokemonMoves>[] = [];
    this.pokemonService.getPokemonDetails(environment.pokemonsURL + `/${this.pokemonURL}`)
      .subscribe((response) => {
        this.pokemon = response;

        // WILL GET ALL THE DETAILS OF THE SPECIES
        this.pokemonService.getPokemonSpeciesDetails(this.pokemon.species.url)
          .subscribe((response) => {
            this.pokemonSpecies = response;

            // WILL GET THE EVOLUTION CHAIN OF THIS POKEMON
            this.pokemonService.getEvolutionChain(response.evolution_chain.url).subscribe((evolution) =>{
              const secondaryEvolution = evolution.chain.evolves_to;

              //WILL GET THE PRIMARY EVOLUTION
              this.pokemonService.getPokemonEvolutionDetail(evolution.chain.species.name).subscribe((pokemon) =>{
                this.primaryForm = pokemon;
              });

              // WILL GET THE SECONDARY EVOLUTION
              if(secondaryEvolution != null){
                const secondaryObservable: Observable<PokemonDetails>[] = [];
                secondaryEvolution.map((pokemon) =>{
                  secondaryObservable.push(this.pokemonService.getPokemonEvolutionDetail(pokemon.species.name));

                  // WILL GET THE TERTIARY EVOLUTION
                  if(pokemon.evolves_to != null){
                    const tertiaryEvolution: Observable<PokemonDetails>[] = [];
                    pokemon.evolves_to.map((pokemon) =>{
                      tertiaryEvolution.push(this.pokemonService.getPokemonEvolutionDetail(pokemon.species.name));
                    });

                    forkJoin([...tertiaryEvolution]).subscribe((pokemon) =>{
                      this.tierThreeEvolution = [...pokemon];
                    });
                  }
                }
                );
                forkJoin([...secondaryObservable]).subscribe((pokemon) =>{
                  this.tierTwoEvolution = [...pokemon];
                });
              }
            });
          });

        // WILL GET ALL THE DETAILS OF THE MOVE OF THE SPECIFIC POKEMON
        response.moves.map((result) => {
          pokemonObservable.push(this.pokemonService.getPokemonMovesDetails(result.move.url));
        });

        forkJoin([...pokemonObservable]).subscribe((move) => {
          this.pokemonMoves = [...move]
        });
      },
      (error) =>{
        this.router.navigate(['error-404']);
      }
      );
  }

  // WILL SET THE BACKGROUND COLOR OF TYPE
  typeColor(type: string) {
    let color = '';
    this.type.map((pokemonType) => {
      if(type == pokemonType.name){
        color = pokemonType.color;
      }
    });
    return color;
  }

  // WILL CHECK IF THE WINDOW IS RESIZED
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
