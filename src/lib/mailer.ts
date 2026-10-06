import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail({ to, subject, html }: { to: string | string[]; subject: string; html: string }) {
  return resend.emails.send({
    from: process.env.RESEND_FROM || 'Calidigi <onboarding@resend.dev>',
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  })
}
