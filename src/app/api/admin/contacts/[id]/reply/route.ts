import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/authMiddleware'
import db from '@/lib/db'
import { sendMail } from '@/lib/mailer'
import { replyEmail } from '@/lib/emailTemplates'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthUser(req)
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const { replyMessage } = await req.json()

    if (!replyMessage?.trim()) {
      return NextResponse.json({ message: 'Reply message is required.' }, { status: 400 })
    }

    const [rows] = await db.execute('SELECT fname, email FROM contacts WHERE id = ?', [id]) as any[]
    const contact = rows[0]
    if (!contact) return NextResponse.json({ message: 'Contact not found.' }, { status: 404 })

    await sendMail({
      to: contact.email,
      subject: `Re: Your Inquiry — Calidigi`,
      html: replyEmail(contact.fname, replyMessage.trim()),
    })

    await db.execute('UPDATE contacts SET status = ? WHERE id = ?', ['replied', id])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reply error:', err)
    return NextResponse.json({ message: 'Failed to send reply.' }, { status: 500 })
  }
}
