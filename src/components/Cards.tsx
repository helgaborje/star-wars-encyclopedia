import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

interface CardsProps {
    title: string
    subtitle: string
    description: string | number
    info?: string
    onReadMore: () => void
}

const Cards: React.FC<CardsProps> = ({
    title,
    subtitle,
    count,
    description,
    info,
    onReadMore,
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup>
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                <strong>{subtitle}</strong> {description} {count}
                            </Card.Text>
                            <Card.Text>
                            <strong>Additional info:</strong>
                            <p>{info}</p>
                            </Card.Text>
                    </Card.Body>
                    <div className="d-grid">
                    <Button
                        className='button'
                        onClick={onReadMore}
                        variant="outline-warning">Read more</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
		</Card>
    )
}

export default Cards