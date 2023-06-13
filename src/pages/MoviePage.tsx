import axios from 'axios'
import { useEffect, useState } from 'react'
import { Movies } from '../types'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'


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
            await new Promise(r => setTimeout(r, 3000))
            setMovie(res.data)
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            {error && <Alert variant='warning'>{error}</Alert>}

            {loading && (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '30vh' }}>
                    <img
                        src="https://cdn.dribbble.com/users/891352/screenshots/2461612/darth_taper_dribbble.gif"
                        // className="img-fluid py-5 spinner-size"
                        alt="Loading Spinner"
                        style={{ width: '200px' }}

                    />
                </div>
            )}

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
                            {movie.opening_crawl}
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