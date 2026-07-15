"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Footer() {
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
    <footer className="w-full px-3 sm:px-6 lg:px-8 mt-8 mb-4 sm:mt-12 sm:mb-6 print:hidden">
      <ScrollReveal className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-white/10 glass dark:glass-dark shadow-xl p-4 sm:p-6 md:p-8 relative overflow-hidden transition-colors duration-300">
        
        {/* Background glow blobs */}
        <div className="absolute -right-20 -bottom-20 w-44 h-44 rounded-full bg-[#FFC20E]/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-44 h-44 rounded-full bg-[#ED1C24]/5 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8 relative z-10 text-center sm:text-left">
          
          {/* Logo and About */}
          <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-lg shadow flex items-center justify-center text-white font-extrabold text-base sm:text-lg">
                ಕ
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-gray-800 dark:text-white leading-none">
                  ಕನ್ನಡ ಭಾರತಿ
                </span>
                <span className="text-[7px] sm:text-[8px] text-[#ED1C24] dark:text-[#FFC20E] font-bold tracking-widest uppercase mt-1">
                  ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ
                </span>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs lg:text-[11px] leading-relaxed font-medium max-w-xs">
              ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ - ನಾಡಿನ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಕನ್ನಡ ಓದುವುದು, ಬರೆಯುವುದು ಕಲಿಸುವ ಒಂದು ಮಹಾನ್ ಅಭಿಯಾನ.
            </p>
            
            {/* Social Icons (Facebook, Instagram, WhatsApp, X) */}
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 pt-1">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-[#1877F2] hover:to-[#3B5998] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm border border-transparent"
              >
                <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm border border-transparent"
              >
                <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-[#25D366] hover:to-[#128C7E] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm border border-transparent"
              >
                <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* X */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-[#2b2b2b] hover:to-[#000000] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm border border-transparent"
              >
                <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[10px] sm:text-xs font-bold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-wider mb-2.5 sm:mb-3">
              ಪ್ರಮುಖ ಕೊಂಡಿಗಳು
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs lg:text-[11px] font-semibold">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ನಮ್ಮ ಬಗ್ಗೆ
                </Link>
              </li>
              <li>
                <Link href="/movement" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ಆಂದೋಲನ
                </Link>
              </li>
              <li>
                <Link href="/pledge" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ಸಂಕಲ್ಪ
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ಸೇವಾದಾರರು
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[10px] sm:text-xs font-bold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-wider mb-2.5 sm:mb-3">
              ಸಂಪನ್ಮೂಲಗಳು
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs lg:text-[11px] font-semibold">
              <li>
                <Link href="/learning" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ಕಲಿಕಾ ಕಾರ್ಯಕ್ರಮ
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ಚಿತ್ರಗಳು
                </Link>
              </li>
              <li>
                <Link href="/movement" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ವೀಡಿಯೊಗಳು
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-[#FFC20E] transition-all duration-200 hover:translate-x-0.5 inline-block">
                  ಸುದ್ದಿಗಳು
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[10px] sm:text-xs font-bold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-wider mb-2.5 sm:mb-3">
              ಸಂಪರ್ಕಿಸಿ
            </h3>
            <ul className="flex flex-col items-center sm:items-start space-y-2.5 sm:space-y-3.5 text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs lg:text-[11px] font-semibold">
              <li className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2">
                <span className="text-[#ED1C24] dark:text-[#FFC20E] text-xs">📍</span>
                <span>
                  ಪೂಜ್ಯಾಯ ಹೈಟ್ಸ್, 103, ಪಿ & ಟಿ ಕಾಲೋನಿ, ಗಂಗಾನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ
                </span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2">
                <span className="text-[#ED1C24] dark:text-[#FFC20E] text-xs">📧</span>
                <a href="mailto:mlprasannawri@gmail.com" className="hover:text-[#ED1C24] dark:hover:text-[#FFC20E] transition-colors">
                  mlprasannawri@gmail.com
                </a>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2">
                <span className="text-[#ED1C24] dark:text-[#FFC20E] text-xs">📞</span>
                <a href="tel:9880501705" className="hover:text-[#ED1C24] dark:hover:text-[#FFC20E] transition-colors">
                  9880501705
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-gray-150/40 dark:border-white/5 my-4 sm:my-5 relative z-10" />

        {/* Bottom copyright and legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-gray-400 dark:text-gray-500 text-[9px] sm:text-xs lg:text-[10px] font-bold gap-2.5 relative z-10">
          <p>© {new Date().getFullYear()} ಕನ್ನಡ ಭಾರತಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.</p>
          <div className="space-x-2.5 sm:space-x-3.5">
            <Link href="/about" className="hover:text-[#ED1C24] dark:hover:text-[#FFC20E] transition-colors">
              ಗೌಪ್ಯತಾ ನೀತಿ
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-[#ED1C24] dark:hover:text-[#FFC20E] transition-colors">
              ನಿಯಮಗಳು
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
