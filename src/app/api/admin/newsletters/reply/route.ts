import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import { sendMail } from '@/lib/mailer'
import { baseNewsletterReplyEmail } from '@/lib/emailTemplates'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { email, name, subject, message } = await req.json()
    if (!email || !message?.trim()) {
      return NextResponse.json({ message: 'Email and message are required.' }, { status: 400 })
    }

    await sendMail({
      to: email,
      subject: subject?.trim() || 'Message from Calidigi',
      html: baseNewsletterReplyEmail(name || 'Subscriber', message.trim()),
      type: 'newsletter_reply',
      toName: name || undefined,
    })

    return NextResponse.json({ message: 'Email sent successfully.' })
  } catch (err) {
    console.error('Newsletter reply error:', err)
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 })
  }
}
