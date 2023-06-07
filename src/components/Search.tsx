import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { Movies_SearchResponse } from '../types'



const Search = () => {
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<Movies_SearchResponse | null>()
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query')

    const searchMovies =async (searchQuery: string) => {
        setError(null)
        setLoading(true)
		setSearchResult(null)
		
		try {
			const res = await fetch(`https://swapi.thehiveresistance.com/api/films/?search=${searchQuery}`)
			if (!res.ok) {
			  throw new Error('Failed to fetch data')
			}
		
			const data: Movies_SearchResponse = await res.json()
            setSearchResult(data)
            
		  } catch (err: any) {
            setError(err.message)
            
		  } finally {
			setLoading(false)
		  }
    }
    

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

        setPage(0)

        setSearchParams({query: searchInput})
        
        searchMovies(searchInput)
    }

    useEffect(() => {
        if (!query) {
            return
        }
        searchMovies(query)
	   }, [query])
	
    console.log(searchResult)
    

  return (
    <>

    <Form className='mb-4' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="querySearch">
            <Form.Label>Search</Form.Label>
            <Form.Control
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Enter your search query"
                required
                type="text"
                value={searchInput}
            />
        </Form.Group>

        <div className="d-flex justify-content-end">
            <Button
                variant="success"
                type="submit"
                disabled={!searchInput.trim().length}
            >Search</Button>
        </div>
          </Form>
          
          {error && <Alert variant='warning'>{error}</Alert>}

            {loading && (
                <p>Loading...</p>
            )}

            {searchResult && (
                <div id="search-results">
                    <p>Showing {searchResult.total} search results for {query}...</p>

                    <ListGroup className='mb-3'>
                        {searchResult.data.map(hit => (
                            <ListGroup.Item
                                action
                                // href={hit.url}
                                key={hit.id}
                            >
                                <h2 className='h3'>{hit.title}</h2>
                                <p><strong>Episode:</strong> {hit.episode_id}</p>
                                <p><strong>Released:</strong> {hit.release_date}</p>
                                <p> {hit.characters_count} <strong>characters</strong></p>

                                <Button
                                    variant="primary"
                                    type="submit">
                                    Read more
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </div>
            )} 
</>
  )
}

export default Search