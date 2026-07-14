"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t border-amber-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl">
                ಕ
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                  ಕನ್ನಡ ಭಾರತಿ
                </span>
                <span className="text-[9px] text-[#FFC20E] font-bold tracking-widest uppercase">
                  ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ - ನಾಡಿನ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಕನ್ನಡ ಓದುವುದು, ಬರೆಯುವುದು ಕಲಿಸುವ ಒಂದು ಮಹಾನ್ ಅಭಿಯಾನ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 border-b border-amber-500/20 pb-2 inline-block text-[#FFC20E]">
              ಪ್ರಮುಖ ಕೊಂಡಿಗಳು
            </h3>
            <ul className="space-y-3 font-semibold text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ನಮ್ಮ ಬಗ್ಗೆ
                </Link>
              </li>
              <li>
                <Link href="/movement" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ಆಂದೋಲನ
                </Link>
              </li>
              <li>
                <Link href="/pledge" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ಸಂಕಲ್ಪ
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ಸೇವಾದಾರರು
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 border-b border-amber-500/20 pb-2 inline-block text-[#FFC20E]">
              ಸಂಪನ್ಮೂಲಗಳು
            </h3>
            <ul className="space-y-3 font-semibold text-sm">
              <li>
                <Link href="/learning" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ಕಲಿಕಾ ಕಾರ್ಯಕ್ರಮ
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ಚಿತ್ರಗಳು
                </Link>
              </li>
              <li>
                <Link href="/movement" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ವೀಡಿಯೊಗಳು
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#FFC20E] transition-colors duration-200">
                  ಸುದ್ದಿಗಳು
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 border-b border-amber-500/20 pb-2 inline-block text-[#FFC20E]">
              ಸಂಪರ್ಕಿಸಿ
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <span className="text-[#ED1C24] text-base">📍</span>
                <span>
                  ಪೂಜ್ಯಾಯ ಹೈಟ್ಸ್, 103, ಪಿ & ಟಿ ಕಾಲೋನಿ, ಗಂಗಾನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ED1C24] text-base">📧</span>
                <a href="mailto:mlprasannawri@gmail.com" className="hover:text-[#FFC20E] transition-colors">
                  mlprasannawri@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ED1C24] text-base">📞</span>
                <a href="tel:9880501705" className="hover:text-[#FFC20E] transition-colors">
                  9880501705
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left text-gray-500 text-sm font-semibold">
          <p>© {new Date().getFullYear()} ಕನ್ನಡ ಭಾರತಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/about" className="hover:text-[#FFC20E] transition-colors">
              ಗೌಪ್ಯತಾ ನೀತಿ
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-[#FFC20E] transition-colors">
              ನಿಯಮಗಳು
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
