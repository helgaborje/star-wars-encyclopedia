export type Vechicles = {
    id: number
    name: string
    model: string
    vechicle_class: string
    manufacturer: string
    length: number
    cost_in_credits: number
    crew: number
    passengers: number
    max_atmosphering_speed: number
    cargo_capacity: number
    consumables: string
    pilots_count: number
    films_count: number
}

export type VechiclesResponse = {
    current_page: number
    data: Vechicles[]
    last_page: number
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}