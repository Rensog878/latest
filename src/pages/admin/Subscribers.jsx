const SUBS = [
  { name: 'Rameshwar Patel', phone: '9845012345', crop: 'Paddy / Rice', season: 'Kharif', acres: 5, village: 'Karur', date: '2026-08-30' },
  { name: 'Suresh Pillai',   phone: '9751234567', crop: 'Cotton',      season: 'Kharif', acres: 8, village: 'Coimbatore', date: '2026-08-29' },
  { name: 'Meena Devi',      phone: '9942345678', crop: 'Tomato',      season: 'Rabi',   acres: 2, village: 'Salem', date: '2026-08-28' },
]

export default function AdminSubscribers() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1>📩 Advisory Subscribers</h1><p>{SUBS.length.toLocaleString()} farmers registered</p></div>
        <button className="btn btn-primary">📲 WhatsApp Broadcast</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Farmer</th><th>Phone</th><th>Crop</th><th>Season</th><th>Acres</th><th>Village</th><th>Date</th></tr></thead>
            <tbody>
              {SUBS.map((s, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td><span className="badge badge-green">📱 {s.phone}</span></td>
                  <td>{s.crop}</td>
                  <td><span className="badge badge-blue">{s.season}</span></td>
                  <td>{s.acres} ac</td>
                  <td>{s.village}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
