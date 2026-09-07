import { useState } from 'react'
import toast from 'react-hot-toast'

const DEFAULT_CONTENT = {
  heroTitle: 'Grow More. Protect Better. Farm Smarter.',
  heroSubtitle: 'India\'s most trusted source for premium bio-pesticides, crop protection, and agro-inputs — trusted by 15,000+ farmers.',
  banner: '🚜 Free Delivery on orders above ₹999 | Use code KISAN20 for 20% off first order',
  advisoryTitle: 'Get Weekly Crop & Pesticide Recommendations',
  advisoryDesc: 'Join 15,000+ farmers receiving our free seasonal advisory newsletter. Kharif & Rabi crop schedules, disease alerts, and exclusive offers every week.',
  phone: '+91-98450-12345',
  address: '14, Kavundampalayam, Coimbatore – 641030, Tamil Nadu',
}

export default function AdminCMS() {
  const [content, setContent] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sathya_cms') || '{}') } catch { return {} }
  })
  const [saving, setSaving] = useState(false)

  const merged = { ...DEFAULT_CONTENT, ...content }
  const set = k => e => setContent(c => ({ ...c, [k]: e.target.value }))

  const save = async () => {
    setSaving(true)
    localStorage.setItem('sathya_cms', JSON.stringify(merged))
    try {
      await fetch('/api/cms', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(merged) })
    } catch { /* offline — localStorage persisted */ }
    toast.success('Content published live! ✅')
    setSaving(false)
  }

  const fields = [
    { key: 'heroTitle',      label: '🏠 Hero Title',      type: 'input' },
    { key: 'heroSubtitle',   label: '📝 Hero Subtitle',   type: 'textarea' },
    { key: 'banner',         label: '📢 Announcement Banner', type: 'input' },
    { key: 'advisoryTitle',  label: '🌾 Advisory Section Title', type: 'input' },
    { key: 'advisoryDesc',   label: '📩 Advisory Description', type: 'textarea' },
    { key: 'phone',          label: '📞 Support Phone', type: 'input' },
    { key: 'address',        label: '📍 Address', type: 'input' },
  ]

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1>✏️ Live CMS Editor</h1><p>Edit website content — changes go live instantly</p></div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? <><div className="spinner" /> Publishing...</> : '🚀 Publish Live'}
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {fields.map(f => (
            <div key={f.key} className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">{f.label}</label>
              {f.type === 'textarea'
                ? <textarea className="form-textarea" value={merged[f.key]} onChange={set(f.key)} rows={3} />
                : <input className="form-input" value={merged[f.key]} onChange={set(f.key)} />
              }
            </div>
          ))}
        </div>
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--surface-border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary btn-lg" onClick={save} disabled={saving}>
            {saving ? <><div className="spinner" /> Publishing...</> : '🚀 Publish All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
