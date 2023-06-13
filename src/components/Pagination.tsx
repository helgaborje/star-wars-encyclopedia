import React from 'react'
import Button from 'react-bootstrap/Button'

interface IPaginationProps {
	page: number
	total: number
	hasPreviousPage: boolean
	hasNextPage: boolean
	onPreviousPage: () => void
	onNextPage: () => void
}

const Pagination: React.FC<IPaginationProps> = ({
	page,
	total,
	hasPreviousPage,
	hasNextPage,
	onPreviousPage,
	onNextPage,
}) => {
	return (
		<div className="d-flex justify-content-between align-items-center m-3">
			<div className="prev">
				<Button
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
					variant="outline-light"
				>Previous Page</Button>
			</div>

			<div className="page">Page {page}/{total}</div>

			<div className="next">
				<Button
					disabled={!hasNextPage}
					onClick={onNextPage}
					variant="outline-light"
				>Next Page</Button>
			</div>
		</div>
	)
}

export default Pagination
