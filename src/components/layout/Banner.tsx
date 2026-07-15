"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Banner() {
  const pathname = usePathname();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogged(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isDashboardRoute = pathname.startsWith("/volunteer/") || pathname.startsWith("/volunteer/admin");
  if (isDashboardRoute) return null;

  return (
    <div className="bg-[#ED1C24] text-white text-xs sm:text-sm font-medium py-2.5 px-4 text-center tracking-wide shadow-sm relative z-50">
      🚀 ಕನ್ನಡ ಭಾರತಿ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಸ್ವಾಗತ. ಹೊಸ ಸೇವೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿವೆ.
    </div>
  );
}
