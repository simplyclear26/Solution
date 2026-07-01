const RESEND_API_KEY = process.env.RESEND_API_KEY!
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solutions.simplyclear.work'
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL ?? 'clarify@simplyclear.work'

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Simply Clear <clarify@simplyclear.work>',
      to,
      subject,
      html,
    }),
  })
}

export async function sendMagicLink(
  email: string,
  name: string,
  token: string
): Promise<void> {
  const link = `${APP_URL}/start?token=${token}`
  const firstName = name?.split(' ')[0] || 'there'

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: Georgia, serif; background: #FAF8F4; margin: 0; padding: 40px 20px; color: #1C1C1E; }
  .container { max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #E5E3DF; }
  .header { background: #1C1C1E; padding: 32px 40px; }
  .header p { color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px; font-family: system-ui, sans-serif; }
  .header h1 { color: white; font-size: 22px; font-weight: normal; margin: 0; }
  .body { padding: 40px; }
  .body p { font-size: 15px; line-height: 1.7; color: #3A3A3C; font-family: system-ui, sans-serif; font-weight: 300; margin: 0 0 20px; }
  .btn { display: inline-block; background: #2AB8A0; color: white !important; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-family: system-ui, sans-serif; font-size: 15px; font-weight: 500; margin: 8px 0 24px; }
  .note { font-size: 12px !important; color: #8E8E93 !important; }
  .link { word-break: break-all; font-size: 12px; color: #8E8E93; font-family: monospace; background: #F5F4F1; padding: 12px; border-radius: 6px; }
  .footer { padding: 24px 40px; border-top: 1px solid #E5E3DF; }
  .footer p { font-size: 12px; color: #8E8E93; font-family: system-ui, sans-serif; margin: 0; font-style: italic; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <p>Simply Clear Solution™</p>
    <h1>Ready when you are.</h1>
  </div>
  <div class="body">
    <p>Hi ${firstName},</p>
    <p>Thank you for purchasing the Simply Clear Solution. Your unique assessment link is below — click it to begin, or save this email and come back when the time is right.</p>
    <p>This link gives you access for <strong>90 days</strong>. You can pause and resume at any time.</p>
    <a href="${link}" class="btn">Begin my assessment</a>
    <p class="note">If the button does not work, copy and paste this link into your browser:</p>
    <div class="link">${link}</div>
    <p style="margin-top: 32px;">Once you complete the assessment, someone from Simply Clear will be in touch within 24 hours to arrange your included 60-minute post-assessment consult.</p>
    <p>If you have any questions before you begin, just reply to this email.</p>
  </div>
  <div class="footer">
    <p>Simply Clear &nbsp;·&nbsp; Adelaide, Australia &nbsp;·&nbsp; simplyclear.work</p>
  </div>
</div>
</body>
</html>`

  await sendEmail(email, 'Your Simply Clear Solution — let\'s get started', html)
}

export async function sendPurchaseNotification(
  name: string,
  email: string,
  organisation: string,
  abn: string,
  token: string
): Promise<void> {
  const link = `${APP_URL}/start?token=${token}`

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; color: #1C1C1E; padding: 40px; max-width: 600px;">
  <h2 style="font-family: Georgia, serif; font-weight: normal; margin-bottom: 24px;">New Simply Clear Solution purchase</h2>
  <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; color: #8E8E93; font-size: 13px; width: 140px;">Name</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; font-size: 13px;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; color: #8E8E93; font-size: 13px;">Email</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; font-size: 13px;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; color: #8E8E93; font-size: 13px;">Organisation</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; font-size: 13px;">${organisation || 'Not provided'}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; color: #8E8E93; font-size: 13px;">ABN</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #E5E3DF; font-size: 13px;">${abn || 'Not provided'}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; color: #8E8E93; font-size: 13px;">Amount</td>
      <td style="padding: 10px 0; font-size: 13px; font-weight: 500;">$997 AUD</td>
    </tr>
  </table>
  <p style="font-size: 13px; color: #636366; margin-bottom: 8px;">Their access link:</p>
  <p style="font-size: 12px; font-family: monospace; background: #F5F4F1; padding: 12px; border-radius: 6px; word-break: break-all;">${link}</p>
  <p style="font-size: 13px; color: #636366; margin-top: 24px;">Reply directly to <a href="mailto:${email}">${email}</a> to arrange their post-assessment consult within 24 hours.</p>
  <p style="font-size: 12px; color: #8E8E93; margin-top: 32px; font-style: italic;">Simply Clear · clarify@simplyclear.work</p>
</body>
</html>`

  await sendEmail(NOTIFICATION_EMAIL, `New purchase — ${name} from ${organisation || email}`, html)
}
