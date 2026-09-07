import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🌾 SATHYA BIO</h3>
            <p className="text-gray-400 text-sm mb-4">
              India's leading digital platform for high-efficacy bio-pesticides, crop protection chemicals, and soil health fertilizers.
            </p>
            <p className="text-gray-400 text-sm">
              Providing 100% bio-certified products with fast express dispatch to 15,000+ farmers across India.
            </p>
          </div>

          {/* Store Categories */}
          <div>
            <h4 className="font-bold text-white mb-4">Store Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">Bio-Fungicides</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Insecticides</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Herbicides</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Bio-Stimulants</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Nematicides</a></li>
            </ul>
          </div>

          {/* Top Crops */}
          <div>
            <h4 className="font-bold text-white mb-4">Top Crops</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">Paddy / Rice Care</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Cotton Protection</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Tomato & Vegetables</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Sugarcane Care</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Horticulture & Fruits</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Customer Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-green-400" />
                <div>
                  <p className="text-gray-300 font-semibold">Toll Free</p>
                  <p>1800-425-9999</p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-green-400" />
                <div>
                  <p className="text-gray-300 font-semibold">Email</p>
                  <p>support@sathyabio.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-semibold">Address</p>
                  <p>Sathya Bio Tech Park<br />Hyderabad, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>
            <p>© 2026 Sathya Bio Agro Tech Ltd. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition">Terms of Sale</a>
            <a href="#" className="hover:text-green-400 transition">Refund Policy</a>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-green-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>✓ 100% Secure Payment (UPI, COD, NetBanking) | ✓ Express Delivery | ✓ 24/7 Support</p>
        </div>
      </div>
    </footer>
  )
}
