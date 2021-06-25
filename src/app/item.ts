export interface Items{
    count: number,
    next: string,
    previous: string,
    results: ItemResults[]
}

export interface ItemResults{
    name: string,
    url:string
}

export interface ItemByCategory{
    items: [{
        name: string,
        url: string
    }]
}

export interface ItemDetails{
    attributes: [],
    baby_trigger_for: any,
    category: ItemCategory,
    cost: number,
    effect_entries: EffectEntries[],
    flavor_text_entries: [],
    fling_effect: any,
    fling_power: any,
    game_indices: [],
    held_by_pokemon: [],
    id: number,
    machines: [],
    name: string,
    names: [],
    sprites: {
        default: string
    }
}

export interface ItemCategory{
    name: string,
    url: string
}

interface EffectEntries{
    effect: string,
    language: {},
    short_effect: string
}

export interface ItemCategoryList{
    count: number,
    next: string,
    previous: any,
    results: ItemCategory[]
}