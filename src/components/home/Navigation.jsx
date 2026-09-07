import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, User } from 'lucide-react'

export default function Navigation({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
              🌾 SATHYA BIO
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#categories" className="text-gray-700 hover:text-green-600 font-medium">
              Categories
            </a>
            <a href="#crops" className="text-gray-700 hover:text-green-600 font-medium">
              Shop by Crop
            </a>
            <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">
              Features
            </a>
            <a href="#catalog" className="text-gray-700 hover:text-green-600 font-medium">
              Products
            </a>
            <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">
              Admin
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-green-600">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            md:hidden
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="space-y-3">
              <a href="#categories" className="block text-gray-700 hover:text-green-600">
                Categories
              </a>
              <a href="#crops" className="block text-gray-700 hover:text-green-600">
                Shop by Crop
              </a>
              <a href="#features" className="block text-gray-700 hover:text-green-600">
                Features
              </a>
              <a href="#catalog" className="block text-gray-700 hover:text-green-600">
                Products
              </a>
              <Link to="/login" className="block text-gray-700 hover:text-green-600">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Top Banner */}
      <div className="bg-green-50 text-center py-2 text-sm text-gray-700">
        <p>🎉 FLAT 15% OFF on first order — Use code <strong>FARM15</strong> | Free express delivery on orders above ₹999</p>
      </div>
    </nav>
  )
}
