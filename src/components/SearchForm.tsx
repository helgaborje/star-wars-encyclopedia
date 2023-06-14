import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


interface SearchFormProps {
    value: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (e: any) => void
    onSubmit: (e: React.FormEvent) => void
  }

const SearchForm: React.FC<SearchFormProps> = ({ value, onChange, onSubmit }) => {


  return (
    <>

    <Form className='mb-4' onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="querySearch">
            <Form.Control
                onChange={onChange}
                placeholder="Enter your search query"
                required
                type="text"
                value={value}
            />
        </Form.Group>

        <div className="d-flex justify-content-end">
            <Button
            className='button'
                variant="outline-warning"
                type="submit"
                disabled={!value.trim().length}
            >Search</Button>
        </div>
          </Form>
         
</>
  )
}

export default SearchForm