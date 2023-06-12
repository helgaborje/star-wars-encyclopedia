import { useEffect, useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import useGetData from '../hooks/useGetData'
import axios from 'axios'
import { MoviesResponse } from '../types'
import Pagination from '../components/Pagination'



const MoviesPage = () => {
	const [data, setData] = useState<MoviesResponse|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    // const [searchResult, setSearchResult] = useState<MoviesResponse | null>()
	const [searchParams, setSearchParams] = useSearchParams()


	const getMovies =async () => {
        setError(null)
        setLoading(true)
		// setSearchResult(null)
		
		try {
			const res = await axios.get(`https://swapi.thehiveresistance.com/api/films/`)
			await new Promise(r => setTimeout(r, 3000))
			setData(res.data)	

		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
    }
    
       useEffect(() => {
			getMovies()
	   }, [])
	
	console.log(data)
	
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

            {data && (
                <div id="results">
					<Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
						{data.data.map(hit => (
							<Col>
								<Card style={{ width: '18rem' }}>
									<Card.Body>
										<ListGroup>
											<ListGroup.Item
												action
												key={hit.id}>
												<Card.Title>{hit.title}</Card.Title>
													<Card.Text>
														<p><strong>Episode:</strong> {hit.episode_id}</p>
														<p><strong>Released:</strong> {hit.release_date}</p>
														<p> {hit.characters_count} <strong>characters</strong></p>
													</Card.Text>
												<Button variant="primary">Read more</Button>
											</ListGroup.Item>
										</ListGroup>
      								</Card.Body>
								</Card>
							</Col>
                        ))}
					</Row>

					<Pagination
						page={data.current_page}
						total={data.total}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < data.current_page}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
						onNextPage={() => { setPage(prevValue => prevValue + 1) }}
					/>
            	</div>
            )}
		</>
	)
}

export default MoviesPage

