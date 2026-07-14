"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Banner() {
  const pathname = usePathname();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    if (!pathname.startsWith("/volunteer/admin")) {
      setIsAdminLoggedIn(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdminLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

  if (isAdminLoggedIn) return null;

  return (
    <div className="bg-[#ED1C24] text-white text-xs sm:text-sm font-medium py-2.5 px-4 text-center tracking-wide shadow-sm relative z-50">
      🚀 ಕನ್ನಡ ಭಾರತಿ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಸ್ವಾಗತ. ಹೊಸ ಸೇವೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿವೆ.
    </div>
  );
}
