"use client"

import { useEffect, useState, useRef } from "react"
import html2pdf from "html2pdf.js"
import { Button } from "@/components/ui/button"

type QuotationItem = {
  name: string
  quantity: number
  price: number
  taxPercent: number
  notes?: string
}

type QuotationData = {
  companyName: string
  companySlogan: string
  companyEmail: string
  companyPhone: string
  companyWebsite: string
  companyLogo: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientWebsite: string
  quotationId: string
  category: string
  items: QuotationItem[]
  date: string
}

export default function QuotationPage() {
  const [data, setData] = useState<QuotationData | null>(null)
  const pdfRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const name = searchParams.get("name") || "Client"

    setData({
      companyName: "Mbivu Tech",
      companySlogan: "Innovating the Future",
      companyEmail: "info@mbivutech.com",
      companyPhone: "+254 712 345678",
      companyWebsite: "https://mbivutech.com",
      companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJ0T0pY3mW6mMgUMzRF1XSdbpQJYGZNDkoA&s",
      clientName: name,
      clientEmail: "client@example.com",
      clientPhone: "+254 701 234567",
      clientWebsite: "https://clientsite.com",
      quotationId: "QT-00123",
      category: "Web Development",
      items: [
        {
          name: "Website Design",
          quantity: 1,
          price: 500,
          taxPercent: 10,
          notes: "Responsive UI, CMS integration",
        },
        {
          name: "Hosting",
          quantity: 1,
          price: 100,
          taxPercent: 5,
          notes: "1-year hosting included",
        },
      ],
      date: new Date().toLocaleDateString(),
    })
  }, [])

  const calculateTotal = () =>
    data?.items.reduce(
      (acc, item) =>
        acc + item.quantity * item.price * (1 + item.taxPercent / 100),
      0
    ) ?? 0

    const handleDownloadPDF = async () => {
      if (!pdfRef.current) return
    
      // Ensure images are loaded
      const images = pdfRef.current.querySelectorAll("img")
      await Promise.all(
        Array.from(images).map(
          img =>
            new Promise(resolve => {
              if (img.complete) return resolve(true)
              img.onload = img.onerror = () => resolve(true)
            })
        )
      )
    
      html2pdf()
        .set({
          margin: 0.5,
          filename: `quotation-${data?.quotationId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(pdfRef.current)
        .save()
    }

  if (!data) return <p className="p-4">Loading quotation...</p>

  return (
    <div className="max-w-5xl mx-auto px-4 mt-6">
      <div className="mb-4 text-right">
        <Button
          onClick={handleDownloadPDF}
          className="btn hover:cursor-pointer text-white px-4 py-2 rounded shadow"
        >
          Download PDF
        </Button>
      </div>

      <div
        ref={pdfRef}
        className="p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <header className="text-center mb-10">
          <img
            src={data.companyLogo}
            alt="Company Logo"
            className="mx-auto h-16 mb-2"
          />
          <h1 className="text-3xl font-bold text-blue-700">{data.companyName}</h1>
          <p className="text-blue-500 italic">{data.companySlogan}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 mb-6">
          <div className="space-y-1">
            <h2 className="font-semibold text-gray-900">Company Info</h2>
            <p>Email: {data.companyEmail}</p>
            <p>Phone: {data.companyPhone}</p>
            <p>Website: {data.companyWebsite}</p>
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold text-gray-900">Client Info</h2>
            <p>Name: {data.clientName}</p>
            <p>Email: {data.clientEmail}</p>
            <p>Phone: {data.clientPhone}</p>
            <p>Website: {data.clientWebsite}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
          <p><strong>Quotation ID:</strong> {data.quotationId}</p>
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Date:</strong> {data.date}</p>
        </div>

        <table className="w-full border border-gray-200 text-sm mb-6">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-3 border">Item</th>
              <th className="p-3 border">Qty</th>
              <th className="p-3 border">Price (USD)</th>
              <th className="p-3 border">Tax %</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => {
              const total = item.quantity * item.price * (1 + item.taxPercent / 100)
              return (
                <tr key={idx} className="text-gray-700">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border text-center">{item.quantity}</td>
                  <td className="p-2 border text-right">${item.price.toFixed(2)}</td>
                  <td className="p-2 border text-center">{item.taxPercent}%</td>
                  <td className="p-2 border text-right">${total.toFixed(2)}</td>
                  <td className="p-2 border">{item.notes || "-"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="text-right text-lg font-semibold text-blue-700 mb-8">
          Grand Total: ${calculateTotal().toFixed(2)}
        </div>

        <footer className="text-sm text-gray-500 text-center border-t pt-4 space-y-1">
          <p>Prepared by {data.companyName} | {data.companyEmail}</p>
          <p>Thank you for considering us for your project!</p>
          <p className="pt-2 text-gray-600">
            This quotation is hereby regulated and controlled by our policies at{" "}
            <a
              href="https://mbivutech.com/policies"
              target="_blank"
              className="text-blue-600 underline"
            >
              mbivutech.com/policies
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
