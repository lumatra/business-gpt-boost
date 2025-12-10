import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  message?: string;
  use_case?: string;
  company_size?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactRequest = await req.json();

    console.log("Sending contact form notification for:", data);

    const emailResponse = await resend.emails.send({
      from: "Helpzz Contact <noreply@helpzz.co.uk>",
      to: ["helpzz@lumatra.net"],
      subject: `New Contact Inquiry from ${data.company_name}`,
      html: `
        <h1>New Contact Form Inquiry</h1>
        <p><strong>Company:</strong> ${data.company_name}</p>
        <p><strong>Contact Name:</strong> ${data.contact_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Company Size:</strong> ${data.company_size || 'Not specified'}</p>
        <p><strong>Use Case:</strong> ${data.use_case || 'Not specified'}</p>
        <h2>Message:</h2>
        <p>${data.message || 'No message provided'}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
