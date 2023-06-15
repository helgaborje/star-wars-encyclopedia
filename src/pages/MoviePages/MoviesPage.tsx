import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { MoviesResponse } from '../../types'
import Pagination from '../../components/Pagination'
import SearchForm from '../../components/SearchForm'
import { searchMovie } from '../../services/SwapiAPI'


const MoviesPage = () => {
	const [result, setResult] = useState<MoviesResponse|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [pageParams, setPageParams] = useSearchParams("page")
	const [searchInput, setSearchInput] = useState("")
	const [searchParams, setSearchParams] = useSearchParams()

	const search = searchParams.get('search')

	const getMovies = async (page: number) => {
        setError(null)
        setLoading(true)
		setResult(null)
		
		try {
			const res = await axios.get(`https://swapi.thehiveresistance.com/api/films/?page=${page}`)
			await new Promise(r => setTimeout(r, 2000))
			setResult(res.data)	

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
		setPageParams({ page: String(page) })
	}

	const searchMovies =async (searchQuery: string, searchPage = 0 ) => {
		setError(null)
        setLoading(true)
		setResult(null)
		
        try {
			const res = await searchMovie(searchQuery, searchPage)
			await new Promise(r => setTimeout(r, 2000))
			setResult(res)	
			
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
    }
    
	const handleReadMore = (id: number) => {
		navigate(`${id}`)
	}

    
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!searchInput.trim().length) {
			return
		}
	
		setPage(0)
		setSearchParams({ search: searchInput })
		searchMovies(searchInput)
	}

	useEffect(() => {
		const currentPage = pageParams.get("page")
		if (currentPage) {
			setPage(parseInt(currentPage))
		} else {
			setPage(1)
			setPageParams({ page: "1" })
		}

		if (!search) {
			getMovies(page)
		} else {
			setSearchParams({search: searchInput})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page, search])
	
	return (
		<>
			<h1>Movies</h1>

			{error && <Alert variant='warning'>{error}</Alert>}

			{!loading && (
				<SearchForm
				value={searchInput}
				onChange={e => setSearchInput(e.target.value)}
				onSubmit={handleSubmit} />
			)}

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
			
			{result && (
				<div id="results">
					{result.data.length > 0 && search ?
						<p>Showing {result.total} search results for {search}...</p>
						: <p></p>
					}
					<Row xs={1} md={2} lg={3} xxl={4} className="g-4">
						{result.data.map(hit => (
							<Col key={hit.id}>
								<Card style={{ width: '18rem' }}>
									<ListGroup>
										<ListGroup.Item>
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
													className='button'
													onClick={() => handleReadMore(hit.id)}
													variant="outline-warning">Read more</Button>
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
						hasNextPage={page < result.last_page}
						onPreviousPage={() => {
							setPage(prevValue => {
								const prevPage = prevValue - 1
								setPageParams({ page: prevPage.toString() })
								return prevPage
							})
						}}
						onNextPage={() => {
							setPage(prevValue => {
								const nextPage = prevValue + 1
								setPageParams({ page: nextPage.toString() })
								return nextPage
							})
						}}
					/>
				</div>
			)}
            
		</>
	)
}

export default MoviesPage
