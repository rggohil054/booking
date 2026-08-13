import { useState, useCallback, useEffect } from 'react'
import EventCard from './components/EventCard'
import BookingForm from './components/BookingForm'
import TicketList from './components/TicketList'
import ThankYou from './components/ThankYou'
import './App.css'

const INITIAL_TICKETS = 50

function getStoredBookings() {
  try {
    const data = localStorage.getItem('bookings')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function App() {
  // List of all bookings (loaded from localStorage)
  const [bookings, setBookings] = useState(getStoredBookings)

  // Event data (availableTickets calculated from stored bookings)
  const bookedCount = bookings.reduce((sum, b) => sum + b.quantity, 0)
  const [event, setEvent] = useState({
    name: 'React India Conference 2026',
    date: '15 August, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Bangalore International Exhibition Centre',
    category: 'Tech Conference',
    price: 999,
    availableTickets: INITIAL_TICKETS - bookedCount,
  })

  // Current page: 'home', 'thankyou', or 'mybookings'
  const [currentPage, setCurrentPage] = useState('home')

  // Show/hide booking form modal
  const [showForm, setShowForm] = useState(false)

  // Store the latest booking to show on Thank You page
  const [latestBooking, setLatestBooking] = useState(null)

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
    // Update available tickets based on current bookings
    const totalBooked = bookings.reduce((sum, b) => sum + b.quantity, 0)
    setEvent((prev) => ({ ...prev, availableTickets: INITIAL_TICKETS - totalBooked }))
  }, [bookings])

  // Handler: book tickets
  function handleBookTicket(booking) {
    setBookings([booking, ...bookings])

    // Close form modal & show Thank You page
    setShowForm(false)
    setLatestBooking(booking)
    setCurrentPage('thankyou')
  }

  // Handler: go back to home page
  const handleGoBack = useCallback(() => {
    setCurrentPage('home')
    setLatestBooking(null)
  }, [])

  // Handler: cancel a booking
  function handleCancelBooking(bookingId) {
    setBookings(bookings.filter((b) => b.id !== bookingId))
  }

  // ===== PAGE: Thank You =====
  if (currentPage === 'thankyou' && latestBooking) {
    return <ThankYou booking={latestBooking} onGoBack={handleGoBack} />
  }

  // ===== PAGE: My Bookings =====
  if (currentPage === 'mybookings') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🎟️ My Bookings</h1>
          <p>Your booked tickets</p>
        </header>
        <button className="btn-back" onClick={() => setCurrentPage('home')}>
          ← Back to Home
        </button>
        <TicketList bookings={bookings} onCancelBooking={handleCancelBooking} />
      </div>
    )
  }

  // ===== PAGE: Home =====
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎟️ Book your Ticket</h1>
        <p>Book your event tickets in seconds</p>
      </header>

      {bookings.length > 0 && (
        <button className="btn-my-bookings" onClick={() => setCurrentPage('mybookings')}>
          My Bookings ({bookings.length})
        </button>
      )}

      <main className="app-main-center">
        <EventCard event={event} onBookClick={() => setShowForm(true)} />
      </main>

      {/* Booking Form Modal — appears on button click */}
      {showForm && (
        <BookingForm
          event={event}
          onBookTicket={handleBookTicket}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default App
