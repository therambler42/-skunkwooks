import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter } from 'lucide-react'

const inventoryItems = [
  { id: 1, name: 'Product A', sku: 'SKU001', quantity: 150, price: 29.99, status: 'In Stock' },
  { id: 2, name: 'Product B', sku: 'SKU002', quantity: 5, price: 49.99, status: 'Low Stock' },
  { id: 3, name: 'Product C', sku: 'SKU003', quantity: 0, price: 19.99, status: 'Out of Stock' },
  { id: 4, name: 'Product D', sku: 'SKU004', quantity: 75, price: 39.99, status: 'In Stock' },
]

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Inventory Items</CardTitle>
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
                  <th className="text-left p-2">Product Name</th>
                  <th className="text-left p-2">SKU</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2 text-gray-600">{item.sku}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
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

