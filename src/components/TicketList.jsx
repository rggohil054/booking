function TicketList({ bookings, onCancelBooking }) {
  if (bookings.length === 0) {
    return (
      <div className="ticket-list-empty">
        <p>No tickets booked yet. Book your first ticket above!</p>
      </div>
    )
  }

  return (
    <div className="ticket-list">
      <h3>Your Booked Tickets ({bookings.length})</h3>
      {bookings.map((booking) => (
        <div key={booking.id} className="ticket-item">
          <div className="ticket-header">
            <span className="ticket-id">#{booking.id}</span>
            <span className="ticket-date">{booking.bookedAt}</span>
          </div>
          <div className="ticket-body">
            <p><strong>{booking.customerName}</strong></p>
            <p>{booking.customerEmail}</p>
            <p>Event: {booking.eventName}</p>
            <p>Tickets: {booking.quantity} | Total: &#8377; {booking.totalPrice}</p>
          </div>
          <button
            className="btn-cancel"
            onClick={() => onCancelBooking(booking.id, booking.quantity)}
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  )
}

export default TicketList
