function EventCard({ event, onBookClick }) {
  return (
    <div className="event-card">
      <div className="event-badge">{event.category}</div>
      <h2 className="event-title">{event.name}</h2>
      <div className="event-details">
        <p><span className="label">Date:</span> {event.date}</p>
        <p><span className="label">Time:</span> {event.time}</p>
        <p><span className="label">Venue:</span> {event.venue}</p>
        <p><span className="label">Available Tickets:</span> {event.availableTickets}</p>
      </div>
      <div className="event-footer">
        <div className="event-price">&#8377; {event.price} / ticket</div>
        <button
          className="btn-book-now"
          onClick={onBookClick}
          disabled={event.availableTickets === 0}
        >
          {event.availableTickets === 0 ? 'Sold Out' : 'Book Now'}
        </button>
      </div>
    </div>
  )
}

export default EventCard
