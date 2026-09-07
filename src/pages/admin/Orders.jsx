import { useState } from 'react'

const SAMPLE_ORDERS = []

const STATUS_COLORS = { Pending: 'yellow', Confirmed: 'blue', Dispatched: 'orange', 'Out for Delivery': 'purple', Delivered: 'green', Cancelled: 'red' }
const STATUSES = ['Pending', 'Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState(SAMPLE_ORDERS)
  const updateStatus = (id, status) => setOrders(o => o.map(x => x.id === id ? { ...x, status } : x))

  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>📦 Order Management</h1><p>{orders.length} orders total</p></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Farmer</th><th>Items</th><th>Amount</th><th>Status</th><th>Agent</th><th>Action</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td><strong style={{ color: 'var(--brand-400)' }}>{o.id}</strong></td>
                  <td><div style={{ fontWeight: 600 }}>{o.farmer}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.village}</div></td>
                  <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                  <td style={{ fontWeight: 700, color: 'var(--brand-400)' }}>₹{o.amount.toLocaleString()}</td>
                  <td><span className={`badge badge-${STATUS_COLORS[o.status] || 'gray'}`}>{o.status}</span></td>
                  <td>{o.agent}</td>
                  <td>
                    <select className="filter-select" style={{ padding: '4px 28px 4px 8px', fontSize: '0.78rem' }} value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
