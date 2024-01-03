import React, { useState, useEffect, isValidElement } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const checkInDate = moment(booking.checkInDate)
	const checkOutDate = moment(booking.checkOutDate)
	const numberOfDays = checkOutDate.diff(checkInDate, "days")
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()
	
	const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])


	return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title hotel-color">Reservation Summary</h4>
				<p>
					<strong>Name :</strong> {booking.guestFullName}
				</p>
				<p>
				<strong> Email : </strong>{booking.guestEmail}
				</p>
				<p>
				<strong> Check-in Date : </strong> {moment(booking.checkInDate).format("MMM Do YYYY")}
				</p>
				<p>
				<strong> Check-out Date : </strong> {moment(booking.checkOutDate).format("MMM Do YYYY")}
				</p>
				<p>
				<strong> Number of Days Booked : </strong> {numberOfDays}
				</p>

				<div>
					<h5 className="hotel-color">Number of Guest</h5>
					<strong>
						Adult{booking.numberOfAdults > 1 ? "s" : ""} : </strong> {booking.numberOfAdults}
					
					
						<p> <strong>Children : </strong>{booking.numberOfChildren}</p>
					
				</div>

				{payment > 0 ? (
					<>
						<p>
						<strong>Total Payment : </strong> ${payment}
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Booking Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Booking & Proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">Check-out date must be after check-in date.</p>
				)}
			</div>
		</div>
	)
}

export default BookingSummary