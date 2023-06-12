export type Movies = {
    id: number
    title: string
    episode_id: number
    release_date: number
    characters_count: number
}

export type MoviesResponse = {
    current_page: number
    data: Movies[]
    last_page: number
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

export type People = {
    id: number
    name: string
    birth_year: string
    films_count: number
    species_count: number
    starships_count: number
    vehicles_count: number
    homeworld: {
        id: number
        name: string
    }

}

export type PeopleResponse = {
    current_page: number
    data: People[]
    last_page: number
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
    
}