'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

export default function ExportPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const simulateExport = async (type: string) => {
    setMessage(`Exporting as ${type.toUpperCase()}...`)
    setLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      console.log(`${type} export done`)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-xl font-semibold">Export Options</h1>
      <div className="flex gap-4">
        <Button onClick={() => simulateExport('sheet')}>Export as Sheet</Button>
        <Button onClick={() => simulateExport('csv')}>Export as CSV</Button>
        <Button onClick={() => simulateExport('sql')}>Export as SQL</Button>
      </div>

      <Dialog open={loading}>
        <DialogContent className="flex flex-col items-center gap-4 py-10">
          <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          <p className="text-lg text-center">{message}</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
