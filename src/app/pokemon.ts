export interface Pokemon {
    name: string,
    url: string
}

export interface Pokemons {
    count: number,
    next: string,
    previous: any,
    results: Pokemon[]
}



export interface PokemonDetails {
    abilities: [{
        ability: {
            name: string
        }
    }],
    base_experience: number,
    forms: [],
    game_indices: [],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: Moves[],
    name: string,
    order: number,
    past_types: [],
    species: Species,
    sprites: Sprites,
    stats: Stats[],
    types: Types[],
    weight: number
};

interface Species {
    name: string,
    url: string
}
export interface PokemonLimit {
    limit: number
}

export interface Moves {
    move: {
        name: string,
        url: string
    },
    version_group_details: []
}

interface Stats {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export interface Types {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

interface Sprites {
    back_default: string,
    back_female: any,
    back_shiny: string,
    back_shiny_female: any,
    front_default: string,
    front_female: any,
    front_shiny: string,
    front_shiny_female: any,
    other: {
        dream_world: {},
        "official-artwork": {
            front_default: string
        }
    },
    version: {}
}

export interface PokemonMoves {
    accuracy: number,
    contest_combos: {},
    contest_effect: {},
    contest_type: {},
    damage_class: {},
    effect_chance: any;
    effect_changes: [],
    effect_entries: [],
    flavor_text_entries: [],
    generation: {},
    id: number,
    learned_by_pokemon: [],
    machines: [],
    meta: {},
    name: string,
    names: [],
    past_values: [],
    power: number,
    pp: number,
    priority: number,
    stat_changes: [],
    super_contest_effect: {},
    target: {},
    type: PokemonMoveType
}

interface PokemonMoveType {
    name: string,
    url: string
}

export interface PokemonSpecies {
    base_happiness: number,
    capture_rate: number,
    color: {},
    egg_group: [],
    evolution_chain: {
        url: string
    },
    evolves_from_species: any,
    flavor_text_entries: PokemonSpeciesFlavorText[],
    form_descriptions: [],
    forms_switchable: boolean,
    gender_rate: number,
    genera: [],
    generation: {},
    growth_rate: {},
    habitat: {},
    has_gender_difference: boolean,
    hatch_counter: number,
    id: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    name: string,
    order: number,
    pal_park_encounters: [],
    pokedex_numbers: [],
    shape: {},
    varieties: []
}

interface PokemonSpeciesFlavorText {
    flavor_text: string,
    language: {},
    version: {}
}

export interface PokemonFilterByType{
    pokemon: [{
        pokemon: {
            name: string,
            url: string
        },
        slot: number
    }]
}

export interface PokemonEvolution{
    baby_trigger_item: any,
    chain: PokemonChain,
    id: number;
}

interface PokemonChain{
    evolution_details: [],
    evolves_to: PokemonChain[],
    is_baby: boolean,
    species: {
        name: string,
        url: string
    }
}

export const pageLimit: number[] = [10, 20, 30, 40, 50];

export const pokemonType = [
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
    {name: 'fairy', color: '#fc68d0'},
    {name: 'dark', color: 'rgba(0, 0, 0, 0.462)'}

  ];