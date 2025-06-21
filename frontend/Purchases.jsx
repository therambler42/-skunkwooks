import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter } from 'lucide-react'

const purchaseOrders = [
  { id: 1, orderNumber: 'PO-001', supplier: 'ABC Supplies', date: '2024-01-15', amount: 1299.99, status: 'Received' },
  { id: 2, orderNumber: 'PO-002', supplier: 'XYZ Materials', date: '2024-01-16', amount: 849.99, status: 'Pending' },
  { id: 3, orderNumber: 'PO-003', supplier: 'Global Parts', date: '2024-01-17', amount: 2199.99, status: 'Ordered' },
  { id: 4, orderNumber: 'PO-004', supplier: 'Tech Components', date: '2024-01-18', amount: 599.99, status: 'Shipped' },
]

export default function Purchases() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
          <p className="text-gray-600">Manage your purchase orders and procurement</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Purchase
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Purchase Orders</CardTitle>
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
                  <th className="text-left p-2">Order Number</th>
                  <th className="text-left p-2">Supplier</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-2 font-medium">{order.orderNumber}</td>
                    <td className="p-2">{order.supplier}</td>
                    <td className="p-2 text-gray-600">{order.date}</td>
                    <td className="p-2">${order.amount}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Received' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Ordered' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">
                        View
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

