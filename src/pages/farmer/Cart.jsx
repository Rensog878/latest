import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

const getCart = () => JSON.parse(localStorage.getItem('sathya_cart') || '[]')
const saveCart = (c) => localStorage.setItem('sathya_cart', JSON.stringify(c))

export default function FarmerCart() {
  const [cart, setCart] = useState(getCart())
  const navigate = useNavigate()

  const update = (id, qty) => {
    if (qty < 1) { remove(id); return }
    const updated = cart.map(i => i._id === id ? { ...i, qty } : i)
    setCart(updated); saveCart(updated)
  }

  const remove = (id) => {
    const updated = cart.filter(i => i._id !== id)
    setCart(updated); saveCart(updated)
    toast.success('Item removed')
  }

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  const gst      = Math.round(subtotal * 0.18)
  const total    = subtotal + gst

  const handleCheckout = () => {
    if (!window.Razorpay) { toast.error('Razorpay not loaded'); return }
    const options = {
      key: 'rzp_test_DEMO_KEY',
      amount: total * 100,
      currency: 'INR',
      name: 'Sathya Bio',
      description: `${cart.length} item(s) — Crop Inputs`,
      image: 'https://via.placeholder.com/60x60/22c55e/fff?text=SB',
      handler: (response) => {
        toast.success(`Payment successful! ID: ${response.razorpay_payment_id}`)
        saveCart([])
        setCart([])
        navigate('/farmer/orders')
      },
      theme: { color: '#22c55e' }
    }
    new window.Razorpay(options).open()
  }

  if (cart.length === 0) return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>🛒 My Cart</h1></div>
      <div className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Browse our premium agro inputs and add products to your cart</p>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/products')}>Shop Now</button>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🛒 My Cart ({cart.length} items)</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* Items */}
        <div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-img">{item.emoji || '🌿'}</div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.category}</div>
                <div className="cart-item-price">₹{(item.price * (item.qty || 1)).toLocaleString()}</div>
              </div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => update(item._id, (item.qty || 1) - 1)}>−</button>
                <span className="qty-value">{item.qty || 1}</span>
                <button className="qty-btn" onClick={() => update(item._id, (item.qty || 1) + 1)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => remove(item._id)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card" style={{ position: 'sticky', top: '80px' }}>
          <div className="card-header"><div className="card-title">Order Summary</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>GST (18%)</span><span>₹{gst.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Delivery</span><span style={{ color: 'var(--brand-400)' }}>FREE</span>
            </div>
            <div style={{ borderTop: '1px solid var(--surface-border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
              <span>Total</span><span style={{ color: 'var(--brand-400)' }}>₹{total.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary btn-full btn-lg" onClick={handleCheckout}>
              💳 Pay with Razorpay
            </button>
            <button className="btn btn-secondary btn-full" onClick={() => navigate('/farmer/products')}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
