import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


interface SearchFormProps {
    onSubmit: (searchQuery: string) => void
  }

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
    const [searchInput, setSearchInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(searchInput)
      }

  return (
    <>

    <Form className='mb-4' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="querySearch">

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
            className='button'
                variant="outline-warning"
                type="submit"
                disabled={!searchInput.trim().length}
            >Search</Button>
        </div>
          </Form>
         
</>
  )
}

export default SearchForm