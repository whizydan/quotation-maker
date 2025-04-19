// app/(auth)/register/page.tsx

'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

const blockedEmails = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
  'icloud.com', 'protonmail.com', 'gmx.com', 'yandex.com', 'mail.com'
]

const blockedDomains = [
  'vercel.app', 'netlify.app', 'render.com', 'glitch.me', 'repl.co'
]

const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name is too short'),
  postalAddress: z.string().min(5, 'Postal address is too short'),
  phoneNumber: z.string().min(7, 'Phone number is too short'),
  companyEmail: z.string().email().refine(email => {
    const domain = email.split('@')[1]
    return !blockedEmails.includes(domain)
  }, {
    message: 'Use a valid company email (not Gmail, Yahoo, etc.)'
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  domainUrl: z.string().url('Enter a valid URL').refine(url => {
    return !blockedDomains.some(bad => url.includes(bad))
  }, {
    message: 'Enter your actual company domain (not test domains like vercel.app)'
  })
})

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      postalAddress: '',
      phoneNumber: '',
      companyEmail: '',
      password: '',
      domainUrl: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true)
    try {
      // Replace with API call
      console.log('Registering company:', data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: 'companyName', label: 'Company Name' },
                { name: 'postalAddress', label: 'Postal Address' },
                { name: 'phoneNumber', label: 'Phone Number' },
                { name: 'companyEmail', label: 'Company Email', type: 'email' },
                { name: 'password', label: 'Password', type: 'password' },
                { name: 'domainUrl', label: 'Company Domain (URL)' }
              ].map(({ name, label, type = 'text' }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof registerSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input type={type} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
