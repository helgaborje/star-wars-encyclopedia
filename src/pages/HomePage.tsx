import { useState } from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

const HomePage = () => {
	// const [loading, setLoading] = useState(false)
	// const [error, setError] = useState<string | false>(false)
  
  
	// setError(false)

  


	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					<Col xs lg="2">
            			<h1 className="">Welcome to StarWars Encyclopedia</h1>
            		</Col>
                      {/* {error && (
			<div className='alert alert-warning mt-2'>
				{error}
			</div>
			)} */}
			
			{/* {loading && (
			<img
				src="https://cdn.dribbble.com/users/891352/screenshots/2461612/darth_taper_dribbble.gif"
				className="img-fluid py-5 w-50 justify-content-center"
				/>) */}
					</Row>
</Container>
		</>
	)
}

export default HomePage