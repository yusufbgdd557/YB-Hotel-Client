import React from "react"

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
	return (
		<nav aria-label="Page navigation">
			<ul className="pagination justify-content-center" style={{margin: "0 auto"}}>
				{pageNumbers.map((pageNumber) => (
					<li
						key={pageNumber}
						className={`page-item ${currentPage === pageNumber ? "active" : ""}`} style={{ zIndex: 0 }}>
						<button onClick={() => onPageChange(pageNumber)} className="page-link">
							{pageNumber}
						</button>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default RoomPaginator