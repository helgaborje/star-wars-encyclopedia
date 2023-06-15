import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
import { Species } from '../../types'
import { Link, useParams } from 'react-router-dom'


const SpeciePage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [specie, setSpecie] = useState<Species | null>(null)
    const { id } = useParams()
    const specieId = Number(id)
    

    const getSpecie = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const res = await axios.get(`https://swapi.thehiveresistance.com/api/species/${id}`)
            await new Promise(r => setTimeout(r, 3000))
            setSpecie(res.data)
    
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    
	useEffect(() => {

        getSpecie(specieId)
        
	}, [specieId])
    
    return (
        <>
            {error && <Alert variant='warning'>{error}</Alert>}

            {loading && (
                <div className='d-flex justify-content-center align-items-center'
                    style={{ height: '30vh' }}>
                    <img
                        src="https://cdn.dribbble.com/users/891352/screenshots/2461612/darth_taper_dribbble.gif"
                        alt="Loading Spinner"
                        style={{ width: '200px' }}
                    />
                </div>
            )}
            
            {specie && (

                <Card>
                    <h1>{specie.name}</h1>
                    <Card.Body>
                        <Card.Text>
                            <strong>Classification</strong> {specie.classification}
                        </Card.Text>
                        <Card.Text>
                            <strong>People of this specie:</strong>
                        </Card.Text>
                        {specie.people.map((person) => (
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


export default SpeciePage