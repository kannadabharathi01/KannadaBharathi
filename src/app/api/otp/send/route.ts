import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Fetch SMTP settings from database
    const { data: smtp, error: smtpError } = await supabaseAdmin
      .from("smtp_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (smtpError || !smtp) {
      return NextResponse.json({ 
        error: "ಇಮೇಲ್ ಸೇವೆ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಅಡ್ಮಿನ್ ಇಮೇಲ್ ಕಾನ್ಫಿಗರೇಶನ್ ಮಾಡಲು ತಿಳಿಸಿ. (SMTP settings not configured)" 
      }, { status: 500 });
    }

    // 2. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes expiry

    // 3. Save pending verification record
    const { error: pendingError } = await supabaseAdmin
      .from("pending_registrations")
      .upsert({
        email,
        otp,
        is_verified: false,
        expires_at: expiresAt,
      });

    if (pendingError) {
      throw new Error("ಪರಿಶೀಲನೆ ಮಾಹಿತಿ ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ: " + pendingError.message);
    }

    // 4. Send Email using configured SMTP
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user_name,
        pass: smtp.password,
      },
    });

    console.log(`Sending registration OTP (6-digit) to ${email}...`);

    await transporter.sendMail({
      from: `"${smtp.from_email}" <${smtp.from_email}>`,
      to: email,
      subject: "ಕನ್ನಡ ಭಾರತಿ - ಇಮೇಲ್ ದೃಢೀಕರಣ OTP (Email Verification Code)",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6; max-width: 500px; padding: 10px;">
          <p>ನಮಸ್ತೆ (Hello),</p>
          <p>ಕನ್ನಡ ಭಾರತಿ ಸ್ವಯಂಸೇವಕರ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆಯ ಇಮೇಲ್ ಪರಿಶೀಲನಾ OTP ಸಂಕೇತ ಇಲ್ಲಿದೆ:</p>
          <p style="font-size: 28px; font-weight: bold; color: #ED1C24; letter-spacing: 6px; margin: 15px 0; font-family: monospace;">${otp}</p>
          <p>ಈ ಸಂಕೇತವು ಮುಂದಿನ ೧೦ ನಿಮಿಷಗಳವರೆಗೆ ಮಾತ್ರ ಮಾನ್ಯವಾಗಿರುತ್ತದೆ. ಇಮೇಲ್ ಸುರಕ್ಷತೆಗಾಗಿ ಇದನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">
            ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ - ಕನ್ನಡ ಭಾರತಿ
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("OTP Send Error:", err);
    return NextResponse.json({ error: err.message || "Failed to send OTP email" }, { status: 500 });
  }
}
