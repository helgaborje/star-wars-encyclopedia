import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
import { Starships } from '../../types'
import { Link, useParams } from 'react-router-dom'


const StarshipPage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [starship, setStarship] = useState<Starships | null>(null)
    const { id } = useParams()
    const starshipId = Number(id)
    

    const getStarship = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const res = await axios.get(`https://swapi.thehiveresistance.com/api/starships/${id}`)
            await new Promise(r => setTimeout(r, 3000))
            setStarship(res.data)
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    
	useEffect(() => {

        getStarship(starshipId)
        
	}, [starshipId])
    
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

            {starship && (

                <Card>
                    <h1>{starship.name}</h1>
                    <Card.Body>
                        <Card.Text>
                            <strong>Model</strong> {starship.model}
                        </Card.Text>
                        <Card.Text>
                            <strong>Cargo Capacity</strong> {starship.cargo_capacity}
                        </Card.Text>
                        <Card.Text>
                                <strong>Appearce in films:</strong>
                        </Card.Text>
                        {starship.films.map((films) => (
                            <div key={films.id}>
                                <Link to={`/films/${films.id}`}>{films.title}</Link>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            )}
    </>
    )
}


export default StarshipPage