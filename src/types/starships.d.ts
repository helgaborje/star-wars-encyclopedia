export type Starships = {
    id: number
    name: string
    model: string
    starship_class: string
    manufacturer: string
    cost_in_credits: number
    length: number
    crew: number
    passengers: number
    max_atmosphering_speed: number
    hyperdrive_rating: number
    MGLT: number
    cargo_capacity: number
    consumables: string
    pilots_count: number
    films_count: number

}

export type StarshipsResponse = {
    current_page: number
    data: Starships[]
    last_page: number
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}