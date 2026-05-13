import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const recipient = process.env.CONTACT_TO_EMAIL || "jerryrobayo1130@gmail.com";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactRequest;
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill out your name, email, and message." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !from) {
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 500 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [recipient],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    },
    {
      idempotencyKey: `portfolio-contact/${randomUUID()}`,
    },
  );

  if (error) {
    return NextResponse.json(
      { error: error.message || "Could not send your message." },
      { status: 400 },
    );
  }

  return NextResponse.json({ id: data?.id });
}
