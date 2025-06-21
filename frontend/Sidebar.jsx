import { Link, useLocation } from 'react-router-dom'
import { X, Home, Package, ShoppingCart, ShoppingBag, Users, Truck, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Sales', href: '/sales', icon: ShoppingCart },
  { name: 'Purchases', href: '/purchases', icon: ShoppingBag },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Suppliers', href: '/suppliers', icon: Truck },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">ERP System</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => onClose()}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}

