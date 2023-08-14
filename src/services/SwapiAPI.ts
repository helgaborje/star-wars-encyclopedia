import axios from 'axios'
import { MoviesResponse, PeopleResponse, PlanetsResponse, SpeciesResponse, StarshipsResponse, VehiclesResponse } from '../types'

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

export const searchMovie = async (query: string, page = 1) => {
	return get<MoviesResponse>(`/films/?search=${query}&page=${page}`)
}

export const searchPerson = async (query: string, page = 1) => {
	return get<PeopleResponse>(`/people/?search=${query}&page=${page}`)
}

export const searchPlanet = async (query: string, page = 1) => {
	return get<PlanetsResponse>(`/planets/?search=${query}&page=${page}`)
}

export const searchSpecie = async (query: string, page = 1) => {
	return get<SpeciesResponse>(`/species/?search=${query}&page=${page}`)
}

export const searchStarship = async (query: string, page = 1) => {
	return get<StarshipsResponse>(`/starships/?search=${query}&page=${page}`)
}

export const searchVehicle = async (query: string, page = 1) => {
	return get<VehiclesResponse>(`/vehicles/?search=${query}&page=${page}`)
}