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
    abilities: [],
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

interface Types {
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
    evolution_chain: {},
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