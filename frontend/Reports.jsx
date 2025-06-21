import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Calendar, BarChart3, TrendingUp } from 'lucide-react'

const reportTypes = [
  { name: 'Sales Report', description: 'Monthly sales performance and trends', icon: TrendingUp },
  { name: 'Inventory Report', description: 'Current stock levels and movements', icon: BarChart3 },
  { name: 'Financial Report', description: 'Revenue, expenses, and profit analysis', icon: Calendar },
  { name: 'Customer Report', description: 'Customer activity and engagement metrics', icon: BarChart3 },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and view business reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <Card key={report.name}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <div className="flex space-x-2">
                  <Button size="sm">
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Monthly Sales Report - January 2024</h4>
                <p className="text-sm text-gray-600">Generated on Jan 31, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Inventory Status Report</h4>
                <p className="text-sm text-gray-600">Generated on Jan 30, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Financial Summary Q4 2023</h4>
                <p className="text-sm text-gray-600">Generated on Jan 15, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

