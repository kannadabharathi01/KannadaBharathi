import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    // 1. Verify admin authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (roleError || roleData?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    // 2. Read SMTP config and test details
    const body = await req.json();
    const { host, port, user_name, password, from_email, test_email } = body;

    if (!host || !port || !user_name || !password || !from_email || !test_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 3. Create nodemailer transporter and send test mail
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: parseInt(port) === 465, // true for port 465, false for other ports (like 587)
      auth: {
        user: user_name,
        pass: password,
      },
    });

    console.log(`Sending test email to ${test_email} using SMTP ${host}...`);

    await transporter.sendMail({
      from: `"${from_email}" <${from_email}>`,
      to: test_email,
      subject: "ಕನ್ನಡ ಭಾರತಿ - SMTP ಸಂಪರ್ಕ ಪರೀಕ್ಷೆ (SMTP Connection Test)",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 12px; max-width: 600px; margin: 0 auto; background-color: #fff9f8;">
          <h2 style="color: #ED1C24; text-align: center;">ಕನ್ನಡ ಭಾರತಿ</h2>
          <p style="font-size: 16px; font-weight: bold; color: #333;">ನಮಸ್ತೆ,</p>
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            ನಿಮ್ಮ ಅಡ್ಮಿನ್ ಪ್ಯಾನಲ್ ಇಮೇಲ್ SMTP ಕಾನ್ಫಿಗರೇಶನ್ ಯಶಸ್ವಿಯಾಗಿ ಸಂಪರ್ಕಗೊಂಡಿದೆ. ಇದು ಪರೀಕ್ಷಾರ್ಥ ಇಮೇಲ್ ಆಗಿದೆ.
          </p>
          <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; margin-top: 25px; text-align: center;">
            ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ - ಕನ್ನಡ ಭಾರತಿ
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("SMTP Test Error:", err);
    return NextResponse.json({ error: err.message || "Failed to send test email" }, { status: 500 });
  }
}
