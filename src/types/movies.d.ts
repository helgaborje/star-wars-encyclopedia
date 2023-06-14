export type Movies = {
    id: number
    title: string
    episode_id: number
    release_date: number
    characters_count: number
    characters: {
        id: number
        name: string
    }[]
    opening_crawl: string
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