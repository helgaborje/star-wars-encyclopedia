import axios from 'axios'
import { useEffect, useState } from 'react'
import { Movies, People } from '../types'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'


const MoviePage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [movie, setMovie] = useState<Movies | null>(null)
    const { id } = useParams()
    const movieId = Number(id)
    

    const getMovie = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const res = await axios.get(`https://swapi.thehiveresistance.com/api/films/${id}`)
            // await new Promise(r => setTimeout(r, 3000))
            setMovie(res.data)
    
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    
	useEffect(() => {

        getMovie(movieId)
        
	}, [movieId])
    
    return (
        <>
            {movie && (

                <Card>
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>
                                <strong>Episode</strong> {movie.episode_id}
                        </Card.Text>
                        <Card.Text>
                                <strong>Relaese date</strong> {movie.release_date}
                            </Card.Text>
                            <Card.Text>
                                 <strong>Characters</strong>
                            </Card.Text>
                                {movie.characters.map((person) => (
                                    <div key={person.id}>
                                        <Link to={`/people/${person.id}`}>{person.name}</Link>
                                    </div>
                                ))}
                    </Card.Body>

                </Card>

      )}
    </>
    )
}


export default MoviePage