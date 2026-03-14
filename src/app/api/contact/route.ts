import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const contactSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  mensaje: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { error: dbError } = await supabase.from("contactos").insert({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || null,
        empresa: data.empresa || null,
        mensaje: data.mensaje,
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        // TODO: Cambiar a noreply@hakamana.cl cuando el dominio este verificado en Resend
        from: "Hakamana Website <onboarding@resend.dev>",
        to: ["contacto@hakamana.cl"],
        subject: `Nueva consulta de ${data.nombre}${data.empresa ? ` - ${data.empresa}` : ""}`,
        html: `
          <h2>Nueva consulta desde el sitio web</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <td style="padding: 8px 16px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Nombre</td>
              <td style="padding: 8px 16px; border: 1px solid #ddd;">${data.nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 16px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Email</td>
              <td style="padding: 8px 16px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.telefono ? `<tr>
              <td style="padding: 8px 16px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Telefono</td>
              <td style="padding: 8px 16px; border: 1px solid #ddd;">${data.telefono}</td>
            </tr>` : ""}
            ${data.empresa ? `<tr>
              <td style="padding: 8px 16px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Empresa</td>
              <td style="padding: 8px 16px; border: 1px solid #ddd;">${data.empresa}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 16px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">Mensaje</td>
              <td style="padding: 8px 16px; border: 1px solid #ddd;">${data.mensaje}</td>
            </tr>
          </table>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
