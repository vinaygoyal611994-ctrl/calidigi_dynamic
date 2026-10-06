const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.calidigi.com'

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Calidigi</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0A0F1E 0%,#1a2540 100%);padding:32px 40px;text-align:center;">
          <img src="https://www.calidigi.com/images/logo.png" alt="Calidigi" width="160" height="48" style="height:48px;width:auto;display:inline-block;max-width:160px;" />
          <p style="margin:12px 0 0;color:rgba(255,255,255,0.6);font-size:13px;letter-spacing:0.05em;">California Digital Growth & AI Agency</p>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:40px;">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8f9fb;padding:28px 40px;border-top:1px solid #eee;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
            <strong style="color:#0A0F1E;">Calidigi</strong> — Digital Marketing, Web Design & AI Solutions
          </p>
          <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;">
            San Francisco, California, USA
          </p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            <a href="mailto:sales@calidigi.com" style="color:#F5821F;text-decoration:none;">sales@calidigi.com</a>
            &nbsp;·&nbsp;
            <a href="${siteUrl}" style="color:#F5821F;text-decoration:none;">www.calidigi.com</a>
          </p>
          <p style="margin:16px 0 0;font-size:11px;color:#d1d5db;">
            © ${new Date().getFullYear()} Calidigi. All rights reserved.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
`

export function adminNotificationEmail(data: {
  fname: string
  email: string
  phone?: string
  company?: string
  projectType?: string
  budget?: string
  timeline?: string
  message?: string
  nda: boolean
}) {
  const row = (label: string, value?: string) => value ? `
    <tr>
      <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#6b7280;white-space:nowrap;border-bottom:1px solid #f3f4f6;width:140px;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
    </tr>` : ''

  const content = `
    <div style="margin-bottom:28px;">
      <div style="display:inline-block;background:#FFF3E0;border:1px solid #F5821F;border-radius:20px;padding:4px 14px;font-size:12px;font-weight:700;color:#F5821F;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">New Lead</div>
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#0A0F1E;">New Contact Inquiry</h1>
      <p style="margin:0;font-size:15px;color:#6b7280;">A new inquiry has been submitted through the Calidigi website contact form.</p>
    </div>

    <div style="background:#f8f9fb;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:28px;">
      <div style="background:#0A0F1E;padding:12px 16px;">
        <p style="margin:0;font-size:12px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:0.08em;text-transform:uppercase;">Contact Details</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('Name', data.fname)}
        ${row('Email', `<a href="mailto:${data.email}" style="color:#F5821F;text-decoration:none;">${data.email}</a>`)}
        ${row('Phone', data.phone)}
        ${row('Company', data.company)}
        ${row('Project Type', data.projectType)}
        ${row('Budget', data.budget)}
        ${row('Timeline', data.timeline)}
        ${row('NDA Requested', data.nda ? '✅ Yes' : 'No')}
      </table>
    </div>

    ${data.message ? `
    <div style="background:#f8f9fb;border-radius:12px;padding:20px;border:1px solid #e5e7eb;margin-bottom:28px;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">${data.message.replace(/\n/g, '<br>')}</p>
    </div>` : ''}

    <div style="text-align:center;margin-top:32px;">
      <a href="${siteUrl}/admin/contacts" style="display:inline-block;background:#F5821F;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
        View in Admin Panel →
      </a>
    </div>
  `
  return baseTemplate(content)
}

export function userConfirmationEmail(fname: string) {
  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:72px;height:72px;background:#E8F5E9;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px;">
        <span style="font-size:32px;">✅</span>
      </div>
      <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#0A0F1E;">Thank You, ${fname}!</h1>
      <p style="margin:0;font-size:16px;color:#6b7280;line-height:1.6;">Your inquiry has been successfully received.<br>Our team will get back to you shortly.</p>
    </div>

    <div style="background:#f8f9fb;border-radius:12px;padding:24px;border-left:4px solid #F5821F;margin-bottom:28px;">
      <h3 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#0A0F1E;">What Happens Next?</h3>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;vertical-align:top;">
            <span style="display:inline-block;width:28px;height:28px;background:#F5821F;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#fff;">1</span>
          </td>
          <td style="padding:8px 0 8px 12px;font-size:14px;color:#374151;vertical-align:top;">
            <strong>Review</strong> — Our team reviews your inquiry within a few hours.
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;">
            <span style="display:inline-block;width:28px;height:28px;background:#F5821F;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#fff;">2</span>
          </td>
          <td style="padding:8px 0 8px 12px;font-size:14px;color:#374151;vertical-align:top;">
            <strong>Consultation</strong> — We schedule a free strategy call to understand your goals.
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;">
            <span style="display:inline-block;width:28px;height:28px;background:#F5821F;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#fff;">3</span>
          </td>
          <td style="padding:8px 0 8px 12px;font-size:14px;color:#374151;vertical-align:top;">
            <strong>Proposal</strong> — We send a tailored proposal matching your needs and budget.
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#0A0F1E;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
      <p style="margin:0 0 6px;font-size:14px;color:rgba(255,255,255,0.6);">Have an urgent question?</p>
      <a href="mailto:sales@calidigi.com" style="font-size:16px;font-weight:700;color:#F5821F;text-decoration:none;">sales@calidigi.com</a>
    </div>

    <div style="text-align:center;">
      <a href="${siteUrl}" style="display:inline-block;background:#F5821F;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Visit Calidigi.com →
      </a>
    </div>
  `
  return baseTemplate(content)
}

export function replyEmail(fname: string, replyMessage: string) {
  const content = `
    <div style="margin-bottom:24px;">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#0A0F1E;">Hello ${fname},</h1>
      <p style="margin:0;font-size:15px;color:#6b7280;">Thank you for reaching out to Calidigi. Here is our response to your inquiry:</p>
    </div>

    <div style="background:#f8f9fb;border-radius:12px;padding:24px;border-left:4px solid #F5821F;margin-bottom:28px;">
      <p style="margin:0;font-size:15px;color:#374151;line-height:1.8;">${replyMessage.replace(/\n/g, '<br>')}</p>
    </div>

    <div style="background:#0A0F1E;border-radius:12px;padding:24px;text-align:center;">
      <p style="margin:0 0 6px;font-size:14px;color:rgba(255,255,255,0.6);">Questions? Reach us anytime</p>
      <a href="mailto:sales@calidigi.com" style="font-size:16px;font-weight:700;color:#F5821F;text-decoration:none;">sales@calidigi.com</a>
    </div>
  `
  return baseTemplate(content)
}
