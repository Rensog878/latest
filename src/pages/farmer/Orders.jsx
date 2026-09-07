export default function FarmerOrders() {
  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>📦 My Orders</h1><p>Track your delivery status in real time</p></div>
      <div className="empty-state">
        <div className="empty-state-icon">📦</div>
        <h3>No orders yet</h3>
        <p>Your orders will appear here after you place them from the store.</p>
      </div>
    </div>
  )
}
