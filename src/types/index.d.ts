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
    next_page_url: string | null
    per_page: number
    prev_page_url: string | null
    to: number
    total: number


}