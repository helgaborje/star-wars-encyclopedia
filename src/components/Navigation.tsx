import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link, NavLink} from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar className='navbar' variant="dark" expand="md">
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/">
                    <Image src="/Star-Wars-transparent-logo.png" /> 
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                        <Nav.Link as={NavLink} end to="/films">MOVIES</Nav.Link>
                        <Nav.Link as={NavLink} end to="/people">PEOPLE</Nav.Link>
                        <Nav.Link as={NavLink} end to="/planets">PLANETS</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    
    )
}

export default Navigation