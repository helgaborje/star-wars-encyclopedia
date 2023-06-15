import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
import { Planets } from '../../types'
import { Link, useParams } from 'react-router-dom'


const PlanetPage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [planet, setPlanet] = useState<Planets | null>(null)
    const { id } = useParams()
    const planetId = Number(id)
    

    const getPlanet = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const res = await axios.get(`https://swapi.thehiveresistance.com/api/planets/${id}`)
            await new Promise(r => setTimeout(r, 3000))
            setPlanet(res.data)
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    
	useEffect(() => {

        getPlanet(planetId)
        
	}, [planetId])
    
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

            {planet && (

                <Card>
                    <h1>{planet.name}</h1>
                    <Card.Body>
                        <Card.Text>
                            <strong>Rotaion period</strong> {planet.rotation_period}
                        </Card.Text>
                        <Card.Text>
                            <strong>Climate</strong> {planet.climate}
                        </Card.Text>
                        <Card.Text>
                                <strong>Residents:</strong>
                        </Card.Text>
                        {planet.residents.map((person) => (
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


export default PlanetPage