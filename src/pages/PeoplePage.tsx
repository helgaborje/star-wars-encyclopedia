import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import Pagination from '../components/Pagination'
import { PeopleResponse } from '../types'


const PeoplePage = () => {
	const [result, setResult] = useState<PeopleResponse|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
    // const [searchInput, setSearchInput] = useState('')
    // // const [searchResult, setSearchResult] = useState<MoviesResponse | null>()
	// const [searchParams, setSearchParams] = useSearchParams()


	const getPeople =async () => {
        setError(null)
        setLoading(true)
		// setSearchResult(null)
		
		try {
			const res = await axios.get(`https://swapi.thehiveresistance.com/api/people/`)
			// await new Promise(r => setTimeout(r, 3000))
			setResult(res.data)	

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
	}
	
	const handleReadMore = (id: number) => {

		navigate(`${id}`)

	}
    
	useEffect(() => {
		getPeople()
	}, [page])
	
	
	return (
		<>
			<h1>People</h1>

			{error && <Alert variant='warning'>{error}</Alert>}

			{loading && (
				<img
					src="https://cdn.dribbble.com/users/891352/screenshots/2461612/darth_taper_dribbble.gif"
					className="img-fluid py-5 w-50 justify-content-center"
				/>
            )}

            {result && (
                <div id="results">
					<Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
						{result.data.map(hit => (
							<Col>
								<Card style={{ width: '18rem' }}>
										<ListGroup>
											<ListGroup.Item
												key={hit.id}>
												<Card.Body>
													<Card.Title>{hit.name}</Card.Title>
														<Card.Text>
															<strong>Homeworld</strong> {hit.homeworld.name}
														</Card.Text>
														<Card.Text>
															<strong>Appearce in</strong> {hit.films_count} <strong>films</strong>
														</Card.Text>
												</Card.Body>
												<div className="d-grid">
												<Button
													onClick={() => handleReadMore(hit.id)}
													variant="primary">Read more</Button>
												</div>
											</ListGroup.Item>
										</ListGroup>
								</Card>
							</Col>
                        ))}
					</Row>

					<Pagination
						page={page}
						total={result.last_page}
						hasPreviousPage={page > 1}
						hasNextPage={page + 1 < result.last_page}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
					/>
				</div>
            )}
		</>
	)
}

export default PeoplePage


   