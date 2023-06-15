import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
import { Vehicles } from '../../types'
import { Link, useParams } from 'react-router-dom'


const VehiclePage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [vehicle, setVehicle] = useState<Vehicles | null>(null)
    const { id } = useParams()
    const vehicleId = Number(id)
    

    const getVehicle = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const res = await axios.get(`https://swapi.thehiveresistance.com/api/vehicles/${id}`)
            await new Promise(r => setTimeout(r, 3000))
            setVehicle(res.data)
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    
	useEffect(() => {

        getVehicle(vehicleId)
        
	}, [vehicleId])
    
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

            {vehicle && (

                <Card>
                    <h1>{vehicle.name}</h1>
                    <Card.Body>
                        <Card.Text>
                            <strong>Model</strong> {vehicle.model}
                        </Card.Text>
                        <Card.Text>
                            <strong>Cargo Capacity</strong> {vehicle.cargo_capacity}
                        </Card.Text>
                        <Card.Text>
                                <strong>Appearce in films:</strong>
                        </Card.Text>
                        {vehicle.films.map((films) => (
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


export default VehiclePage