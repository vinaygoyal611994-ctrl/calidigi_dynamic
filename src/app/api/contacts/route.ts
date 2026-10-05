import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { sendMail } from '@/lib/mailer'
import { adminNotificationEmail, userConfirmationEmail } from '@/lib/emailTemplates'

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

    const emailData = { fname: fname.trim(), email: email.trim(), phone, company, projectType, budget, timeline, message, nda: !!nda }

    // Send emails in background (don't block response)
    Promise.all([
      sendMail({
        to: process.env.ADMIN_EMAIL || 'goyalshweta0310@gmail.com',
        subject: `🔔 New Inquiry from ${fname.trim()} — Calidigi`,
        html: adminNotificationEmail(emailData),
      }),
      sendMail({
        to: email.trim(),
        subject: 'Your Inquiry Has Been Received — Calidigi',
        html: userConfirmationEmail(fname.trim()),
      }),
    ]).catch(err => console.error('Email send error:', err))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact POST error:', err)
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
