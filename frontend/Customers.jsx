import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter, Mail, Phone } from 'lucide-react'

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0123', company: 'Acme Corp', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0124', company: 'Tech Solutions', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1-555-0125', company: 'Global Industries', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1-555-0126', company: 'Innovation Labs', status: 'Active' },
]

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Customer List</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Company</th>
                  <th className="text-left p-2">Contact</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="p-2 font-medium">{customer.name}</td>
                    <td className="p-2">{customer.company}</td>
                    <td className="p-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

