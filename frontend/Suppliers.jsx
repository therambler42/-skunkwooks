import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter, Mail, Phone } from 'lucide-react'

const suppliers = [
  { id: 1, name: 'ABC Supplies', email: 'contact@abcsupplies.com', phone: '+1-555-0201', category: 'Raw Materials', status: 'Active' },
  { id: 2, name: 'XYZ Materials', email: 'info@xyzmaterials.com', phone: '+1-555-0202', category: 'Components', status: 'Active' },
  { id: 3, name: 'Global Parts', email: 'sales@globalparts.com', phone: '+1-555-0203', category: 'Electronics', status: 'Inactive' },
  { id: 4, name: 'Tech Components', email: 'orders@techcomponents.com', phone: '+1-555-0204', category: 'Technology', status: 'Active' },
]

export default function Suppliers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-gray-600">Manage your supplier relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Supplier List</CardTitle>
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
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Contact</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b">
                    <td className="p-2 font-medium">{supplier.name}</td>
                    <td className="p-2">{supplier.category}</td>
                    <td className="p-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-1" />
                          {supplier.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {supplier.status}
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

