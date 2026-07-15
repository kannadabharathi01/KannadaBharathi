import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ error: "Missing email or OTP" }, { status: 400 });
    }

    // 1. Fetch pending registration details
    const { data: pending, error: fetchError } = await supabaseAdmin
      .from("pending_registrations")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError || !pending) {
      return NextResponse.json({ error: "ದೃಢೀಕರಣ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೊದಲಿನಿಂದ ಪ್ರಯತ್ನಿಸಿ." }, { status: 400 });
    }

    // 2. Check if expired
    const isExpired = new Date() > new Date(pending.expires_at);
    if (isExpired) {
      return NextResponse.json({ error: "OTP ಅವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಹೊಸ OTP ಪಡೆದುಕೊಳ್ಳಿ." }, { status: 400 });
    }

    // 3. Verify OTP code
    if (pending.otp !== otp.trim()) {
      return NextResponse.json({ error: "ತಪ್ಪಾದ OTP ನಮೂದಿಸಲಾಗಿದೆ." }, { status: 400 });
    }

    // 4. Mark email as verified in pending_registrations table (does NOT create user yet!)
    const { error: updateError } = await supabaseAdmin
      .from("pending_registrations")
      .update({ is_verified: true })
      .eq("email", email);

    if (updateError) {
      throw new Error("ದೃಢೀಕರಣ ಸ್ಥಿತಿ ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ: " + updateError.message);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("OTP Verify Error:", err);
    return NextResponse.json({ error: err.message || "OTP verification failed" }, { status: 500 });
  }
}
