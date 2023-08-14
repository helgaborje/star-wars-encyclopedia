/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { VehiclesResponse } from '../../types'
import { searchVehicle as searchVehicleAPI } from '../../services/SwapiAPI'
import Cards from '../../components/Cards'
import SearchForm from '../../components/SearchForm'
import Pagination from '../../components/Pagination'


const VehiclesPage = () => {
	const [result, setResult] = useState<VehiclesResponse|null>(null)
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [pageParams, setPageParams] = useSearchParams("page")
	const [searchInput, setSearchInput] = useState("")
	const [searchParams, setSearchParams] = useSearchParams()

	const search = searchParams.get('search')

	const getVehicles = async () => {
        setError(null)
		setLoading(true)
		setResult(null)
		
		try {
			const res = await axios.get(`https://swapi.thehiveresistance.com/api/vehicles?page=${page}`)
			await new Promise(r => setTimeout(r, 2000))
			setResult(res.data)	

		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
	}

	const searchVehicle = async (searchQuery: string, searchPage = 0 ) => {
        setError(null)
        setLoading(true)
		setResult(null)
		
        try {
			const res = await searchVehicleAPI(searchQuery, searchPage)
			await new Promise(r => setTimeout(r, 2000))
			setResult(res)	

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
	
		setSearchParams({ search: searchInput, page: "1"  })
		searchVehicle(searchInput, page)
	}

	useEffect(() => {
		const currentPage = pageParams.get("page")
		
		if (!currentPage) {
			setPage(1)
			setPageParams({ page: "1" })
		} else {
			setPage(parseInt(currentPage))
		}

	}, [pageParams, setPageParams])
    
	useEffect(() => {
		const currentSearch = searchParams.get('search')
		const currentPage = searchParams.get('page')

		if (!currentSearch) {
			getVehicles()
		} else {
			searchVehicle(currentSearch, parseInt(currentPage || '1'))
		}

	}, [page, search, location])
	
	return (
		<>
			<h1>Vehicles</h1>

			{error && <Alert variant='warning'>{error}</Alert>}

			{!loading && !error && (
				<SearchForm
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					onSubmit={handleSubmit} />
			)}

            {loading && (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '30vh' }}>
                    <img
                        src="https://cdn.dribbble.com/users/891352/screenshots/2461612/darth_taper_dribbble.gif"
                        alt="Loading Spinner"
                        style={{ width: '200px' }}
                    />
                </div>
            )}

            {result && (
				<div id="results">
					{result.data.length > 0 && search ? (
						<p>Showing {result.total} search results for {search}...</p>
						):( search && <p>No results found for {search}.</p>)
					}
					<Row xs={1} md={2} lg={3} xxl={4} className="g-4">
						{result.data.map(hit => (
							<Col key={hit.id}>
								<Cards 
									title={hit.name}
									subtitle="Population"
									description={hit.population}
									info={`Appearce in ${hit.films_count} films`}
									onReadMore={() => handleReadMore(hit.id)}
								/>
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

export default VehiclesPage