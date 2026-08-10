import nodemailer from 'nodemailer';

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Codex" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
};

export const sendInquiryNotification = async (inquiry) => {
  const adminHtml = `
    <h2>New Inquiry from ${inquiry.name}</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.phone || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Business</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.businessName || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Industry</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.industry || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Budget</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.budget || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Source</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.source}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${inquiry.message}</td></tr>
    </table>
  `;

  await sendEmail({
    to: EMAIL_USER,
    subject: `New Inquiry from ${inquiry.name} — ${inquiry.businessName || 'Unknown Business'}`,
    html: adminHtml,
  });

  const clientHtml = `
    <h2>Hi ${inquiry.name},</h2>
    <p>Thank you for reaching out to Codex! We've received your message and will get back to you within 24 hours.</p>
    <p>In the meantime, feel free to check out our <a href="${process.env.CLIENT_URL}/portfolio">portfolio</a>.</p>
    <br>
    <p>Best regards,<br>Team Codex</p>
  `;

  await sendEmail({
    to: inquiry.email,
    subject: 'We received your message — Codex',
    html: clientHtml,
  });
};
