'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Eye, Copy } from 'lucide-react'
import Link from 'next/link'

const mockData = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  quotationId: `Q${1000 + i}`,
  client: `client${i}@example.com`,
  amount: `$${(100 + i * 5).toFixed(2)}`,
  category: i % 2 === 0 ? 'Design' : 'Development',
}))

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const totalPages = Math.ceil(mockData.length / perPage)
  const paginatedData = mockData.slice((currentPage - 1) * perPage, currentPage * perPage)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/quotations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Quotation
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-background p-4 shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Quotation ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>{quote.id}</TableCell>
                <TableCell>{quote.quotationId}</TableCell>
                <TableCell>{quote.client}</TableCell>
                <TableCell>{quote.amount}</TableCell>
                <TableCell>{quote.category}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost"><Copy className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination & Per Page */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(1)} isActive={currentPage === 1}>First</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(currentPage - 1)}>Prev</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(currentPage + 1)}>Next</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(totalPages)}>Last</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Records per page:</span>
            <Select value={String(perPage)} onValueChange={(val) => { setPerPage(Number(val)); setCurrentPage(1) }}>
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map(n => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
