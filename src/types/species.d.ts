export type Species = {
    id: number
    name: string
    classification: string
    designation: string
    average_height: number
    average_lifespan: number
    eye_colors: string
    hair_colors: string
    skin_colors: string
    language: string
    people_count: number
    films_count: number
    homeworld:{
        id: number
        name: string
    }[]
    people: {
        id: number
        name: string
    }[]
}

export type SpeciesResponse = {
    current_page: number
    data: Species[]
    last_page: number
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}