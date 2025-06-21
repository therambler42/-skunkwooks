import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, DollarSign, Package, Users } from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Active Customers',
    value: '2,350',
    change: '+180.1% from last month',
    icon: Users,
  },
  {
    title: 'Inventory Items',
    value: '12,234',
    change: '+19% from last month',
    icon: Package,
  },
  {
    title: 'Sales Orders',
    value: '573',
    change: '+201 since last hour',
    icon: BarChart3,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your ERP management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order #1234 received</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment processed for order #1233</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Low stock alert: Product ABC</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded hover:bg-gray-50">
                Create New Order
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50">
                Add New Customer
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50">
                Update Inventory
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50">
                Generate Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

