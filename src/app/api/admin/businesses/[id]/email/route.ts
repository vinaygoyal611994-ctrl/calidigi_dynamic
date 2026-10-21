import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'
import { sendMail } from '@/lib/mailer'
import { marketingEmail } from '@/lib/emailTemplates'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const { subject, message } = await req.json()

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json({ message: 'Subject and message are required.' }, { status: 400 })
    }

    const [rows] = await db.execute('SELECT title, email FROM businesses WHERE id = ?', [id]) as any[]
    const business = rows[0]
    if (!business) return NextResponse.json({ message: 'Business not found.' }, { status: 404 })
    if (!business.email) return NextResponse.json({ message: 'This business has no email address on file.' }, { status: 400 })

    await sendMail({
      to: business.email,
      subject: subject.trim(),
      html: marketingEmail(business.title, subject.trim(), message.trim()),
      type: 'business_marketing',
      toName: business.title,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Business email error:', err)
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 })
  }
}
