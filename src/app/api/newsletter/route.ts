import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { sendMail } from '@/lib/mailer'
import { newsletterWelcomeEmail, newsletterAdminEmail } from '@/lib/emailTemplates'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name?.trim()) {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 })
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ message: 'Valid email address is required.' }, { status: 400 })
    }

    const cleanName  = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    try {
      await db.execute(
        'INSERT INTO newsletters (name, email) VALUES (?, ?)',
        [cleanName, cleanEmail]
      )
    } catch (e: any) {
      if (e.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'This email is already subscribed.' }, { status: 409 })
      }
      throw e
    }

    // Send emails in background — don't block response
    Promise.all([
      sendMail({
        to: cleanEmail,
        subject: 'Welcome to Calidigi Insights Newsletter!',
        html: newsletterWelcomeEmail(cleanName),
        type: 'newsletter_welcome',
        toName: cleanName,
      }),
      sendMail({
        to: process.env.ADMIN_EMAIL || 'goyalshweta0310@gmail.com',
        subject: `📬 New Newsletter Subscriber — ${cleanName}`,
        html: newsletterAdminEmail(cleanName, cleanEmail),
        type: 'newsletter_admin',
        toName: 'Admin',
      }),
    ]).catch(err => console.error('Newsletter email error:', err))

    return NextResponse.json({ message: 'Subscribed successfully!' })
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return NextResponse.json({ message: 'Server error. Please try again.' }, { status: 500 })
  }
}
