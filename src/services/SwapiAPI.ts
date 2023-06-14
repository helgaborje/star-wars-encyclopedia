import axios from 'axios'
import { MoviesResponse, PeopleResponse } from '../types'

const instance = axios.create({
	baseURL: "https://swapi.thehiveresistance.com/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)
	return response.data as T
}

// export const searchMovie = async (query: string) => {
// 	return get<MoviesResponse>(`/films/?search=${query}`)
// }

export const searchMovie = async (query: string, page = 1) => {
	return get<MoviesResponse>(`/films/?search=${query}&page=${page}`)
}

export const searchPerson = async (query: string, page = 1) => {
	return get<PeopleResponse>(`/people/?search=${query}&page=${page}`)
}