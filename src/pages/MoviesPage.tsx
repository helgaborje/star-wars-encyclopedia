import { useEffect, useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { Movies, Movies_SearchResponse } from '../types'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



const MoviesPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<Movies_SearchResponse | null>()
	const [searchParams, setSearchParams] = useSearchParams()


	const fetchMovies =async () => {
        setError(null)
        setLoading(true)
		setSearchResult(null)
		
		try {
			const res = await fetch(`https://swapi.thehiveresistance.com/api/films/`);
			if (!res.ok) {
			  throw new Error('Failed to fetch data');
			}
		
			const data: Movies_SearchResponse = await res.json();
			setSearchResult(data);
		  } catch (err: any) {
			setError(err.message);
		  } finally {
			setLoading(false);
		  }
    }
    
       useEffect(() => {
fetchMovies()
	   }, [])
	
	console.log(searchResult)
	
	return (
		<>
			<h1>Movies</h1>

			{error && <Alert variant='warning'>{error}</Alert>}

            {loading && (
                <p>Loading...</p>
            )}

            {searchResult && (
                <div id="search-results">
					<Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
						{searchResult.data.map(hit => (
							<Col key={hit.id}>
								<Card style={{ width: '18rem' }}>
                            		<ListGroup.Item action>
										<Card.Body>
        									<Card.Title>{hit.title}</Card.Title>
        										<Card.Text>
													<p><strong>Episode:</strong> {hit.episode_id}</p>
													<p><strong>Released:</strong> {hit.release_date}</p>
													<p> {hit.characters_count} <strong>characters</strong></p>
        										</Card.Text>
        										<Button variant="primary">Read more</Button>
      									</Card.Body>
									</ListGroup.Item>
								</Card>
							</Col>
                        ))}
					</Row>
            	</div>
            )}
		</>
	)
}

export default MoviesPage

