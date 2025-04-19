// app/api/sync/route.ts
import { NextResponse } from 'next/server'
import { syncModels } from '@/lib/models'

export const GET = async () => {
  try {
    await syncModels()
    return NextResponse.json({ message: 'Models synced successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to sync models', details: err }, { status: 500 })
  }
}
