import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import Purchases from './pages/Purchases'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

