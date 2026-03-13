import { NextRequest, NextResponse } from "next/server";

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  privacy: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.privacy) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Insert into Supabase if configured
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabaseRes = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          company: body.company || null,
          message: body.message,
          created_at: new Date().toISOString(),
        }),
      });

      if (!supabaseRes.ok) {
        console.error("Supabase insert failed:", await supabaseRes.text());
      }
    }

    // Send email via Resend (or fallback SMTP)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Hakamana Web <noreply@hakamana.cl>",
          to: ["contacto@hakamana.cl"],
          reply_to: body.email,
          subject: `Nueva consulta de ${body.name}${body.company ? ` - ${body.company}` : ""}`,
          html: `
            <h2>Nueva consulta desde el sitio web</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(body.name)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Teléfono</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(body.phone || "No proporcionado")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Empresa</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(body.company || "No proporcionada")}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(body.message).replace(/\n/g, "<br>")}</td></tr>
            </table>
            <p style="color:#999;font-size:12px;margin-top:20px;">Enviado desde hakamana.cl - ${new Date().toLocaleString("es-CL")}</p>
          `,
        }),
      });

      if (!emailRes.ok) {
        console.error("Email send failed:", await emailRes.text());
        return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 });
      }
    } else {
      // Log the contact if no email service is configured
      console.log("New contact submission:", {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        message: body.message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
