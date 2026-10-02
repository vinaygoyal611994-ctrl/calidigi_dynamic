import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fname, email, phone, company, projectType, budget, timeline, message, nda } = body

    if (!fname?.trim() || !email?.trim()) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 })
    }

    await db.execute(
      `INSERT INTO contacts (fname, email, phone, company, project_type, budget, timeline, message, nda)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fname.trim(), email.trim(), phone || null, company || null, projectType || null, budget || null, timeline || null, message || null, nda ? 1 : 0]
    )

    return NextResponse.json({ success: true, message: 'Thank you! We will be in touch soon.' })
  } catch (err) {
    console.error('Contact POST error:', err)
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
