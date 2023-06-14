export type Planets = {
    id: number
    name: string
    films_count: number
    population: number
    residents_count: number
    rotation_period: number
    climate: string
    residents: {
        id: number
        name: string
    } []
}

export type PlanetsResponse = {
    current_page: number
    data: Planets[]
    last_page: number
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}