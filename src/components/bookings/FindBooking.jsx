import React, { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumberOfGuests: ""
    })

    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumberOfGuests: ""
    }
    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center" style={{ textAlign: "left" }}>
                <h2 className="text-center mb-4">Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter your booking confirmation code"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Find Booking
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div>Finding your booking...</div>
                ) : error ? (
                    <div className="text-danger">Error: {error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3 className="card-title hotel-color mb-3">Booking Information</h3>
                        <p><strong>Confirmation Code :</strong> {bookingInfo.bookingConfirmationCode}</p>
                        <p><strong>Full Name :</strong> {bookingInfo.guestFullName}</p>
                        <p><strong> Email Address : </strong> {bookingInfo.guestEmail}</p>
                        <p>
                            <strong> Check-In Date : </strong> {moment(bookingInfo.checkInDate)
                              .subtract(1, "month")
                              .format("MMM Do, YYYY")}
                        </p>
                        <p>
                            <strong> Check-Out Date : </strong> {moment(bookingInfo.checkOutDate)
                              .subtract(1, "month")
                              .format("MMM Do, YYYY")}
                        </p>
                        <p><strong>Room Number :</strong> {bookingInfo.roomResponse.id}</p>
                        <p><strong>Room Type : </strong> {bookingInfo.roomResponse.roomType}</p>
                        <p><strong>Booking ID :</strong> {bookingInfo.id}</p>


                        <p><strong> Adults : </strong> {bookingInfo.numberOfAdults}</p>
                        <p><strong> Children : </strong> {bookingInfo.numberOfChildren}</p>
                        <p><strong> Total Guests : </strong> {bookingInfo.totalNumberOfGuests}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.id)}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    null
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
            </div>
        </>
    )
}

export default FindBooking