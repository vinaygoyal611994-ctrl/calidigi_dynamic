import { Resend } from 'resend'
import db from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail({
  to, subject, html, type = 'general', toName,
}: {
  to: string | string[]
  subject: string
  html: string
  type?: string
  toName?: string
}) {
  const toArr = Array.isArray(to) ? to : [to]
  const primaryEmail = toArr[0]

  let status: 'sent' | 'failed' = 'sent'
  let errorMsg: string | null = null

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || 'Calidigi <onboarding@resend.dev>',
      to: toArr,
      subject,
      html,
    })
    if (result.error) {
      status = 'failed'
      errorMsg = result.error.message
    }
    return result
  } catch (err: any) {
    status = 'failed'
    errorMsg = err?.message || 'Unknown error'
    throw err
  } finally {
    db.execute(
      'INSERT INTO email_logs (type, to_email, to_name, subject, status, error_msg) VALUES (?, ?, ?, ?, ?, ?)',
      [type, primaryEmail, toName || null, subject, status, errorMsg]
    ).catch(() => {})
  }
}
