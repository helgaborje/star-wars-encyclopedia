import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

const HomePage = () => {

	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					<Col>
						<h1>Welcome to Star Wars Encyclopedia</h1>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default HomePage