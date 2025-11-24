import { useState } from 'react'
import './CafeOrders.css'

function CafeOrders() {
  const [selectedCafe, setSelectedCafe] = useState(null)
  const [cart, setCart] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  const cafes = [
    {
      id: 1,
      name: 'Coffee Island',
      distance: '100m',
      nextStop: 'Ακρόπολη',
      rating: 4.7,
      logo: '☕',
      menu: [
        { id: 101, name: 'Espresso', price: 2.50, category: 'Καφές' },
        { id: 102, name: 'Cappuccino', price: 3.20, category: 'Καφές' },
        { id: 103, name: 'Freddo Cappuccino', price: 3.50, category: 'Καφές' },
        { id: 104, name: 'Κρουασάν', price: 2.00, category: 'Γεύμα' },
        { id: 105, name: 'Τυρόπιτα', price: 2.50, category: 'Γεύμα' },
        { id: 106, name: 'Χυμός Πορτοκάλι', price: 3.00, category: 'Αναψυκτικό' }
      ]
    },
    {
      id: 2,
      name: 'Mikel',
      distance: '150m',
      nextStop: 'Ακρόπολη',
      rating: 4.5,
      logo: '☕',
      menu: [
        { id: 201, name: 'Espresso', price: 2.30, category: 'Καφές' },
        { id: 202, name: 'Latte', price: 3.00, category: 'Καφές' },
        { id: 203, name: 'Iced Coffee', price: 3.20, category: 'Καφές' },
        { id: 204, name: 'Σάντουιτς', price: 4.50, category: 'Γεύμα' },
        { id: 205, name: 'Μάφιν', price: 2.20, category: 'Γεύμα' },
        { id: 206, name: 'Coca Cola', price: 2.00, category: 'Αναψυκτικό' }
      ]
    },
    {
      id: 3,
      name: 'Starbucks',
      distance: '200m',
      nextStop: 'Μουσείο',
      rating: 4.6,
      logo: '☕',
      menu: [
        { id: 301, name: 'Americano', price: 3.50, category: 'Καφές' },
        { id: 302, name: 'Caramel Macchiato', price: 4.20, category: 'Καφές' },
        { id: 303, name: 'Frappuccino', price: 4.50, category: 'Καφές' },
        { id: 304, name: 'Bagel', price: 3.50, category: 'Γεύμα' },
        { id: 305, name: 'Cookie', price: 2.50, category: 'Γεύμα' },
        { id: 306, name: 'Λεμονάδα', price: 3.50, category: 'Αναψυκτικό' }
      ]
    }
  ]

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1, cafe: selectedCafe.name }])
    }
  }

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId)
    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId))
    } else {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handlePayment = (e) => {
    e.preventDefault()
    // Προσομοίωση πληρωμής
    setOrderConfirmed(true)
    setTimeout(() => {
      setOrderConfirmed(false)
      setShowCheckout(false)
      setCart([])
      setSelectedCafe(null)
      setCardInfo({ number: '', name: '', expiry: '', cvv: '' })
    }, 4000)
  }

  return (
    <div className="cafe-orders-container">
      {!selectedCafe ? (
        <>
          <div className="cafes-header">
            <h2>Συνεργαζόμενες Καφετέριες</h2>
            <p>Παραγγείλτε και παραλάβετε στην επόμενη στάση!</p>
          </div>
          <div className="cafes-list">
            {cafes.map(cafe => (
              <div 
                key={cafe.id} 
                className="cafe-card"
                onClick={() => setSelectedCafe(cafe)}
              >
                <div className="cafe-logo">{cafe.logo}</div>
                <div className="cafe-info">
                  <h3>{cafe.name}</h3>
                  <div className="cafe-meta">
                    <span className="distance">📍 {cafe.distance}</span>
                    <span className="rating">⭐ {cafe.rating}</span>
                  </div>
                  <p className="next-stop">Παράδοση στη στάση: <strong>{cafe.nextStop}</strong></p>
                </div>
                <button className="order-btn">Παραγγελία →</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {!showCheckout ? (
            <div className="menu-view">
              <div className="menu-header">
                <button 
                  className="back-btn"
                  onClick={() => setSelectedCafe(null)}
                >
                  ← Πίσω
                </button>
                <div className="cafe-title">
                  <span className="cafe-logo-small">{selectedCafe.logo}</span>
                  <h2>{selectedCafe.name}</h2>
                </div>
                <div className="cart-icon" onClick={() => cart.length > 0 && handleCheckout()}>
                  🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                </div>
              </div>

              <div className="delivery-info">
                <span>📦 Παράδοση στη στάση: <strong>{selectedCafe.nextStop}</strong></span>
                <span>⏱️ Εκτιμώμενος χρόνος: <strong>15 λεπτά</strong></span>
              </div>

              <div className="menu-grid">
                {selectedCafe.menu.map(item => (
                  <div key={item.id} className="menu-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <span className="item-category">{item.category}</span>
                      <span className="item-price">€{item.price.toFixed(2)}</span>
                    </div>
                    <button 
                      className="add-btn"
                      onClick={() => addToCart(item)}
                    >
                      + Προσθήκη
                    </button>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="cart-summary">
                  <div className="cart-items-preview">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item-mini">
                        <span>{item.name} x{item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id)}>−</button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <span>Σύνολο: €{getTotalPrice()}</span>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      Ολοκλήρωση Παραγγελίας
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="checkout-view">
              {!orderConfirmed ? (
                <>
                  <div className="checkout-header">
                    <button 
                      className="back-btn"
                      onClick={() => setShowCheckout(false)}
                    >
                      ← Πίσω
                    </button>
                    <h2>Ολοκλήρωση Παραγγελίας</h2>
                  </div>

                  <div className="order-summary">
                    <h3>Η Παραγγελία σας</h3>
                    <div className="order-items">
                      {cart.map(item => (
                        <div key={item.id} className="order-item">
                          <span className="item-name">{item.name} x{item.quantity}</span>
                          <span className="item-total">€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-total">
                      <span>Σύνολο:</span>
                      <span className="total-amount">€{getTotalPrice()}</span>
                    </div>
                    <div className="delivery-details">
                      <p>📍 Παράδοση: <strong>{selectedCafe.nextStop}</strong></p>
                      <p>⏱️ Εκτιμώμενος χρόνος: <strong>15 λεπτά</strong></p>
                    </div>
                  </div>

                  <form className="payment-form" onSubmit={handlePayment}>
                    <h3>Πληρωμή με Κάρτα</h3>
                    <div className="form-group">
                      <label>Αριθμός Κάρτας</label>
                      <input 
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Όνομα Κατόχου</label>
                      <input 
                        type="text"
                        placeholder="ΟΝΟΜΑ ΕΠΩΝΥΜΟ"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Λήξη</label>
                        <input 
                          type="text"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input 
                          type="text"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="pay-btn">
                      💳 Πληρωμή €{getTotalPrice()}
                    </button>
                  </form>
                </>
              ) : (
                <div className="order-confirmation">
                  <div className="success-icon">✅</div>
                  <h2>Η παραγγελία σας ολοκληρώθηκε!</h2>
                  <p>Η παραγγελία σας θα είναι έτοιμη στη στάση <strong>{selectedCafe.nextStop}</strong></p>
                  <p className="order-number">Αριθμός Παραγγελίας: #2024{Math.floor(Math.random() * 9999)}</p>
                  <div className="confirmation-animation">
                    <div className="spinner"></div>
                    <p>Ειδοποίηση στην καφετέρια...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CafeOrders
