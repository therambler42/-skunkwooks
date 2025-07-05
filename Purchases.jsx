
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter } from 'lucide-react'

const PURCHASE_KEY = 'skunkswooks_purchase_orders'
const SUPPLIER_KEY = 'skunkswooks_suppliers'

export default function Purchases() {
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    orderNumber: '',
    supplier_id: '',
    date: '',
    amount: '',
    status: 'Pending'
  })

  useEffect(() => {
    const savedPOs = JSON.parse(localStorage.getItem(PURCHASE_KEY)) || []
    const savedSuppliers = JSON.parse(localStorage.getItem(SUPPLIER_KEY)) || []
    setPurchaseOrders(savedPOs)
    setSuppliers(savedSuppliers)
  }, [])

  const handleMarkReceived = (id) => {
    const updated = purchaseOrders.map((po) =>
      po.id === id
        ? { ...po, status: 'Received', received_date: new Date().toISOString() }
        : po
    )
    setPurchaseOrders(updated)
    localStorage.setItem(PURCHASE_KEY, JSON.stringify(updated))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPO = {
      ...form,
      id: Date.now(),
      amount: parseFloat(form.amount),
      received: false,
      received_date: null
    }
    const updated = [...purchaseOrders, newPO]
    setPurchaseOrders(updated)
    localStorage.setItem(PURCHASE_KEY, JSON.stringify(updated))
    setForm({
      orderNumber: '',
      supplier_id: '',
      date: '',
      amount: '',
      status: 'Pending'
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
          <p className="text-gray-600">Manage your purchase orders and procurement</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order #</th>
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
                    <td className="p-2">
                      {suppliers.find((s) => s.supplier_id === order.supplier_id)?.name || 'Unknown'}
                    </td>
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
                    <td className="p-2 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => alert('View coming soon')}>View</Button>
                      {order.status !== 'Received' && (
                        <Button variant="default" size="sm" onClick={() => handleMarkReceived(order.id)}>
                          Receive
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px]">
            <h3 className="text-lg font-bold mb-4">New Purchase Order</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                name="orderNumber"
                placeholder="PO Number"
                value={form.orderNumber}
                onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                required
              />
              <select
                className="w-full border p-2 rounded"
                name="supplier_id"
                value={form.supplier_id}
                onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s.supplier_id} value={s.supplier_id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                className="w-full border p-2 rounded"
                type="date"
                name="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
              <input
                className="w-full border p-2 rounded"
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
