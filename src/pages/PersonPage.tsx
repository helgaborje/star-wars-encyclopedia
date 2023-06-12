import axios from 'axios'
import { useEffect, useState } from 'react'
import { People } from '../types'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'


const PersonPage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [person, setPerson] = useState<People | null>(null)
    const { id } = useParams()
    const personId = Number(id)
    

    const getPerson = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const res = await axios.get(`https://swapi.thehiveresistance.com/api/people/${id}`)
            // await new Promise(r => setTimeout(r, 3000))
            setPerson(res.data)
    
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    
	useEffect(() => {

        getPerson(personId)
        
	}, [personId])
    
    return (
        <>
            {person && (

                <Card>
                    <Card.Body>
                        <Card.Title>{person.name}</Card.Title>
                            <Card.Text>
                                <strong>Homeworld</strong> {person.homeworld.name}
                            </Card.Text>
                            <Card.Text>
                                 <strong>Appearce in films:</strong>
                            </Card.Text>
                                {person.films.map((film) => (
                                    <div key={film.id}>
                                        <Link to={`/films/${film.id}`}>{film.title}</Link>
                                    </div>
                                ))}
                    </Card.Body>

                </Card>

      )}
    </>
    )
}


export default PersonPage