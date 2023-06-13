
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
				</Row>
			</Container>
		</>
	)
}

export default HomePage