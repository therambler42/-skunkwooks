import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Save, User, Bell, Shield, Database } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your system preferences and configuration</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue="john@example.com"
              />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email Notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Low Stock Alerts</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Order Updates</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <CardTitle>Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter new password"
              />
            </div>
            <Button>
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-600" />
              <CardTitle>System Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue="Your Company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

