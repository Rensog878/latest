import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    village: '', district: '', state: 'Tamil Nadu', landAcres: ''
  })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register({ ...form, role: 'farmer' })
      toast.success('Registration successful! Welcome to Sathya Bio 🌿')
      navigate('/farmer', { replace: true })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page" style={{ justifyContent: 'center', alignItems: 'flex-start', padding: '40px 20px', minHeight: '100vh' }}>
      <div className="login-card animate-slide-up" style={{ maxWidth: '560px' }}>
        <div className="login-logo">
          <div className="login-logo-icon">🌱</div>
          <div className="login-logo-text">
            <div className="brand">Join Sathya Bio</div>
            <div className="tagline">Farmer Self-Registration</div>
          </div>
        </div>

        <h2 className="login-title">Create your account</h2>
        <p className="login-subtitle">Register to access our product store, crop advisory, and order tracking</p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Your name" value={form.name} onChange={set('name')} required />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp / Phone *</label>
              <input className="form-input" placeholder="10-digit number" value={form.phone} onChange={set('phone')} required maxLength={10} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Village / Town</label>
              <input className="form-input" placeholder="Village name" value={form.village} onChange={set('village')} />
            </div>
            <div className="form-group">
              <label className="form-label">District</label>
              <input className="form-input" placeholder="District" value={form.district} onChange={set('district')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">State</label>
              <select className="form-select" value={form.state} onChange={set('state')}>
                {['Tamil Nadu','Karnataka','Andhra Pradesh','Telangana','Kerala','Maharashtra','Gujarat','Punjab','Haryana','Rajasthan','Uttar Pradesh','Madhya Pradesh','Bihar','West Bengal','Odisha'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Farm Size (Acres)</label>
              <input className="form-input" type="number" placeholder="e.g. 5" value={form.landAcres} onChange={set('landAcres')} min="0.5" step="0.5" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input className="form-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={set('password')} required minLength={6} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input className="form-input" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set('confirmPassword')} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? <><div className="spinner" /> Registering...</> : '🌿 Create Farmer Account'}
          </button>
        </form>

        <div className="divider"><span>Already registered?</span></div>
        <Link to="/login"><button className="btn btn-secondary btn-full">← Back to Login</button></Link>
      </div>
    </div>
  )
}
