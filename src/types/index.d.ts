export type Movies = {
    id: number
    title: string
    episode_id: number
    release_date: number
    characters_count: number
}

export type Movies_SearchResponse = {
    data: Movies[]
    per_page: number
    total: number


}