import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Auth Pages
import Login    from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import IngredientDetail from './pages/IngredientDetail'
import FarmerProfile from './pages/farmer/Profile'

// Admin Pages
import AdminLayout    from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCMS       from './pages/admin/CMS'
import AdminProducts  from './pages/admin/Products'
import AdminOrders    from './pages/admin/Orders'
import AdminSubscribers from './pages/admin/Subscribers'
import AdminAnalytics from './pages/admin/Analytics'
import AdminUsers     from './pages/admin/Users'
import AdminProfileFields from './pages/admin/ProfileFields'
import Employees from './pages/admin/Employees'
import SupportTickets from './pages/admin/SupportTickets'

// Employee Pages
import EmployeeLayout    from './layouts/EmployeeLayout'
import EmployeeDashboard from './pages/employee/Dashboard'

// Delivery Pages
import DeliveryLayout    from './layouts/DeliveryLayout'
import DeliveryDashboard from './pages/delivery/Dashboard'

// Billing Pages
import BillingLayout    from './layouts/BillingLayout'
import BillingDashboard from './pages/billing/Dashboard'

// Tickets & Chat (shared between admin/employee)
import Tickets     from './pages/shared/Tickets'
import ChatRecords from './pages/shared/ChatRecords'

export default function App() {
  const { user } = useAuth()

  // Home page is now the vanilla HTML in public/index.html
  // This component just returns null, letting the HTML handle the display
  const HomePage = () => {
    // If user is logged in as admin/staff, redirect them to their portal
    if (user) {
      const roleMap = { admin: '/admin', employee: '/employee', delivery: '/delivery', billing: '/billing' }
      const redirectPath = roleMap[user.role]
      if (redirectPath) {
        return <Navigate to={redirectPath} replace />
      }
    }
    // For public users or unrecognized roles, show the vanilla HTML home page
    return null
  }

  return (
    <Routes>
      {/* Public Home - Vanilla HTML Page */}
      <Route path="/"        element={<HomePage />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product/:id/ingredients" element={<IngredientDetail />} />
      <Route path="/farmer/profile" element={<PrivateRoute allowedRoles={['farmer']}><FarmerProfile /></PrivateRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminLayout /></PrivateRoute>}>
        <Route index             element={<AdminDashboard />} />
        <Route path="cms"        element={<AdminCMS />} />
        <Route path="users"      element={<AdminUsers />} />
        <Route path="profile-fields" element={<AdminProfileFields />} />
        <Route path="products"   element={<AdminProducts />} />
        <Route path="orders"     element={<AdminOrders />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
        <Route path="analytics"  element={<AdminAnalytics />} />
        <Route path="employees"  element={<Employees />} />
        <Route path="support-tickets" element={<SupportTickets />} />
        <Route path="tickets"    element={<Tickets />} />
        <Route path="chat"       element={<ChatRecords />} />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<PrivateRoute allowedRoles={['employee']}><EmployeeLayout /></PrivateRoute>}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>

      {/* Delivery Routes */}
      <Route path="/delivery" element={<PrivateRoute allowedRoles={['delivery']}><DeliveryLayout /></PrivateRoute>}>
        <Route index element={<DeliveryDashboard />} />
      </Route>

      {/* Billing Routes */}
      <Route path="/billing" element={<PrivateRoute allowedRoles={['billing']}><BillingLayout /></PrivateRoute>}>
        <Route index element={<BillingDashboard />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
