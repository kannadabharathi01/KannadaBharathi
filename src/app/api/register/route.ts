import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, registrationId, payload } = body;

    if (!email || !password || !registrationId || !payload) {
      return NextResponse.json({ error: "Missing required registration parameters" }, { status: 400 });
    }

    // 1. Verify that this email is marked as verified in pending_registrations
    const { data: pending, error: fetchError } = await supabaseAdmin
      .from("pending_registrations")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError || !pending) {
      return NextResponse.json({ error: "ನೋಂದಣಿ ವೈಫಲ್ಯ: ಇಮೇಲ್ ದೃಢೀಕರಣ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ." }, { status: 400 });
    }

    if (!pending.is_verified) {
      return NextResponse.json({ error: "ನೋಂದಣಿ ವೈಫಲ್ಯ: ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಇಮೇಲ್ ಐಡಿಯನ್ನು ಪರಿಶೀಲಿಸಿ." }, { status: 400 });
    }

    // 2. Create the user using admin client (auto-confirms the email)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        ...payload,
        registration_id: registrationId,
      },
    });

    if (authError) {
      console.error("Admin createUser error:", authError);
      return NextResponse.json({ error: "ಖಾತೆ ತೆರೆಯಲು ವಿಫಲವಾಗಿದೆ: " + (authError.message || "Unknown error") }, { status: 400 });
    }

    // 3. Clean up the pending verification record
    await supabaseAdmin
      .from("pending_registrations")
      .delete()
      .eq("email", email);

    return NextResponse.json({ success: true, registrationId });
  } catch (err: any) {
    console.error("Registration route error:", err);
    return NextResponse.json({ error: err.message || "Failed to complete registration" }, { status: 500 });
  }
}
