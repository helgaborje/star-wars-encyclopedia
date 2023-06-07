import axios from 'axios'
import { Movies_SearchResponse } from '../types'

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

export const search = async (query: string) => {
	return get<Movies_SearchResponse>(`/films/?search=${query}`)
}