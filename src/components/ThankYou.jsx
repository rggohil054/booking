function ThankYou({ booking, onGoBack }) {
  return (
    <div className="thankyou-page">
      <div className="thankyou-card">
        <div className="thankyou-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p className="thankyou-msg">Thank you, <strong>{booking.customerName}</strong>!</p>
        <div className="thankyou-details">
          <p>Event: {booking.eventName}</p>
          <p>Tickets: {booking.quantity}</p>
          <p>Total Paid: ₹{booking.totalPrice}</p>
          <p>Booking ID: #{booking._id?.slice(-6) || booking.id}</p>
        </div>
        <button className="btn-go-home" onClick={onGoBack}>
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default ThankYou
