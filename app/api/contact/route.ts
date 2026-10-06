import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INQUIRY_TYPES: Record<string, string> = {
  buyer: 'Buyer / café / wellness business',
  origin: 'Origin partner',
  strategic: 'Strategic partner',
};

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string; inquiryType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();
  // Optional audience selection from the Contact page; unknown values are ignored.
  const inquiryType = INQUIRY_TYPES[body.inquiryType ?? ''] ?? '';

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required.' },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  // onboarding@resend.dev is Resend's shared test sender (only delivers to your
  // own account email). Set CONTACT_FROM to a verified domain in production.
  const from = process.env.CONTACT_FROM ?? 'VivaTTerra <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO ?? 'fabrizio@vivatterra.com';

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact form message from ${name}${inquiryType ? ` (${inquiryType})` : ''}`,
      text: `Name: ${name}\nEmail: ${email}${inquiryType ? `\nInquiry type: ${inquiryType}` : ''}\n\nMessage:\n${message || '(no message)'}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Could not send your message. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: 'Could not send your message. Please try again.' },
      { status: 500 }
    );
  }
}
