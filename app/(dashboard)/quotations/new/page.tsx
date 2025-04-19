'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

const itemSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().min(1),
  taxPercent: z.coerce.number().min(0),
  taxAmount: z.coerce.number().min(0),
  total: z.coerce.number().min(0),
  notes: z.string().optional(),
})

const formSchema = z.object({
  companyName: z.string().min(1),
  companyEmail: z.string().email(),
  companyWebsite: z.string().url(),
  companySlogan: z.string(),
  companyPhone: z.string(),
  clientPhone: z.string(),
  clientEmail: z.string().email(),
  clientWebsite: z.string().optional(),
  category: z.string(),
  quotationId: z.string().min(1),
  companyLogo: z.any().optional(),
  items: z.array(itemSchema),
  emailClient: z.boolean().optional(),
})

export default function CreateQuotationPage() {
  const [showNotesIndex, setShowNotesIndex] = useState<number | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      companyWebsite: '',
      companySlogan: '',
      companyPhone: '',
      clientPhone: '',
      clientEmail: '',
      clientWebsite: '',
      category: '',
      quotationId: 'QT-',
      items: [],
      emailClient: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: form.control,
  })

  const addItem = () =>
    append({
      name: '',
      price: 0,
      quantity: 1,
      taxPercent: 0,
      taxAmount: 0,
      total: 0,
    })

  const handleLogoChange = (file: File | undefined) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoPreview(url)
      console.log('Selected logo:', file)
    }
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Creating quotation with:', data)
  }

  const calculateItemTotals = (index: number) => {
    const item = form.getValues(`items.${index}`)
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    const taxPercent = Number(item.taxPercent) || 0
    const taxAmount = (price * quantity * taxPercent) / 100
    const total = price * quantity + taxAmount

    form.setValue(`items.${index}.taxAmount`, taxAmount)
    form.setValue(`items.${index}.total`, total)
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Quotation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Logo</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-48 h-48 border-2 border-dashed border-muted rounded-md cursor-pointer hover:bg-muted/20 transition relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              field.onChange(file)
                              handleLogoChange(file)
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            id="logo-upload"
                          />
                          {logoPreview ? (
                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                          ) : (
                            <label htmlFor="logo-upload" className="text-muted-foreground text-sm cursor-pointer">
                              Upload Logo
                            </label>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['companyName', 'companyEmail', 'companyWebsite', 'companySlogan', 'companyPhone', 'clientPhone', 'clientEmail', 'clientWebsite', 'category', 'quotationId'].map((name) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{name.replace(/([A-Z])/g, ' $1')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-blue-600 font-semibold">Items</h3>
                  <Button type="button" onClick={addItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="p-2 text-left">Item Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Qty</th>
                        <th className="p-2 text-left">Tax %</th>
                        <th className="p-2 text-left">Tax Amt</th>
                        <th className="p-2 text-left">Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map((field, index) => (
                        <tr
                          key={field.id}
                          onClick={() => setShowNotesIndex(index === showNotesIndex ? null : index)}
                          className="cursor-pointer border-b"
                        >
                          <td className="p-2">
                            <Input {...form.register(`items.${index}.name`)} />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              {...form.register(`items.${index}.price`)}
                              onBlur={() => calculateItemTotals(index)}
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              {...form.register(`items.${index}.quantity`)}
                              onBlur={() => calculateItemTotals(index)}
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              {...form.register(`items.${index}.taxPercent`)}
                              onBlur={() => calculateItemTotals(index)}
                            />
                          </td>
                          <td className="p-2">
                            <Input type="number" {...form.register(`items.${index}.taxAmount`)} readOnly />
                          </td>
                          <td className="p-2">
                            <Input type="number" {...form.register(`items.${index}.total`)} readOnly />
                          </td>
                          <td className="p-2 text-right">
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {showNotesIndex !== null && (
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name={`items.${showNotesIndex}.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Item notes..." {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.watch('emailClient')}
                  onCheckedChange={(val) => form.setValue('emailClient', val)}
                  id="email-client"
                />
                <label htmlFor="email-client" className="text-sm">
                  Email client the quotation
                </label>
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
