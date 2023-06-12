import { MoviesResponse } from '../types'
import useGetData from "./useGetData"

const useGetMovies = () => {
	return useGetData<MoviesResponse>("https://swapi.thehiveresistance.com/api/films/")
}

export default useGetMovies
