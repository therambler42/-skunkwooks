import { Menu, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="ml-4 text-lg font-semibold text-gray-900 lg:ml-0">
            Enterprise Resource Planning
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

