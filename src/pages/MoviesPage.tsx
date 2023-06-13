import { useEffect, useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { MoviesResponse } from '../types'
import Pagination from '../components/Pagination'



const MoviesPage = () => {
	const [result, setResult] = useState<MoviesResponse|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
    // const [searchInput, setSearchInput] = useState('')
    // // const [searchResult, setSearchResult] = useState<MoviesResponse | null>()
	// const [searchParams, setSearchParams] = useSearchParams()


	const getMovies = async () => {
        setError(null)
        setLoading(true)
		// setSearchResult(null)
		
		try {
			const res = await axios.get(`https://swapi.thehiveresistance.com/api/films/`)
			await new Promise(r => setTimeout(r, 3000))
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
		getMovies()
	}, [])
	
	console.log(result)
	
	return (
		<>
			<h1>Movies</h1>

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
												<Card.Title>{hit.title}</Card.Title>
													<Card.Text>
														<strong>Episode:</strong> {hit.episode_id}
													</Card.Text>
													<Card.Text>
														<strong>Released:</strong> {hit.release_date}
													</Card.Text>
													<Card.Text>
														{hit.characters_count} <strong>characters</strong>
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

export default MoviesPage

