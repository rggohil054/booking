import { useState } from 'react'

function BookingForm({ event, onBookTicket, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    } else if (/\d/.test(name)) {
      newErrors.name = 'Name should not contain numbers'
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    if (quantity > event.availableTickets) {
      alert(`Only ${event.availableTickets} tickets available!`)
      return
    }

    // Create booking object
    const booking = {
      id: Date.now(),
      customerName: name,
      customerEmail: email,
      quantity: quantity,
      eventName: event.name,
      totalPrice: quantity * event.price,
      bookedAt: new Date().toLocaleString(),
    }

    onBookTicket(booking)

    // Reset form
    setName('')
    setEmail('')
    setQuantity(1)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <form className="booking-form" onSubmit={handleSubmit}>
          <h3>Book Your Tickets</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                const val = e.target.value.replace(/[0-9]/g, '')
                setName(val)
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
              }}
              placeholder="Enter your name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
              }}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Number of Tickets</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={event.availableTickets}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="form-total">
            Total: &#8377; {quantity * event.price}
          </div>

          <button type="submit" className="btn-book" disabled={event.availableTickets === 0}>
            {event.availableTickets === 0 ? 'Sold Out' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
