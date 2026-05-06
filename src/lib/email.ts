import nodemailer from "nodemailer";

// Strip surrounding quotes and whitespace — handles env values like: PASS= "my pass"
const clean = (v: string | undefined) => v?.trim().replace(/^["']|["']$/g, "") ?? "";

const transporter = nodemailer.createTransport({
  host: clean(process.env.SMTP_HOST) || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure: false,
  auth: {
    user: clean(process.env.SMTP_USER),
    pass: clean(process.env.SMTP_PASS),
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${clean(process.env.SMTP_USER)}>`,
    to,
    replyTo: data.email,
    subject: `Portfolio Contact from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#0f172a;color:#f8fafc;border-radius:12px;">
        <h2 style="margin:0 0 16px;color:#818cf8;">New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#22d3ee;">${data.email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #6366f1;padding-left:12px;margin:8px 0;color:#94a3b8;">
          ${data.message.replace(/\n/g, "<br>")}
        </blockquote>
        <p style="margin-top:20px;font-size:12px;color:#64748b;">
          Reply directly to this email to respond to ${data.name}.
        </p>
      </div>
    `,
  });
}

export async function sendFeedbackNotification(data: {
  name: string;
  designation: string;
  company: string;
  rating: number;
  message: string;
}) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return;

  await transporter.sendMail({
    from: `"Portfolio Feedback" <${process.env.SMTP_USER}>`,
    to,
    subject: `New Feedback from ${data.name} (${data.company})`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#0f172a;color:#f8fafc;border-radius:12px;">
        <h2 style="margin:0 0 16px;color:#818cf8;">New Feedback Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Designation:</strong> ${data.designation}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Rating:</strong> ${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #6366f1;padding-left:12px;margin:8px 0;color:#94a3b8;">
          ${data.message}
        </blockquote>
        <p style="margin-top:20px;font-size:12px;color:#64748b;">
          Review this in Google Sheets and change status to "approved" to publish.
        </p>
      </div>
    `,
  });
}
