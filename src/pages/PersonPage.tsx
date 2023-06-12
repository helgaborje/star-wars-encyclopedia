import axios from 'axios'
import { useEffect, useState } from 'react'
import { People } from '../types'
import { useParams } from 'react-router-dom'


const PersonPage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [person, setPerson] = useState<People>(null)
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
                
                
        <div>
          <div>{person.name}</div>
        </div>
      )}
    </>
    )
}


export default PersonPage