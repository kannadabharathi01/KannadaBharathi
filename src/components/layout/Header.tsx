"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ChevronRight, Info, Award, UserPlus, BookOpen, MapPin, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const dropdownLinks = [
  { href: "/movement", label: "ಆಂದೋಲನದ ವಿವರ", desc: "ಆಂದೋಲನದ ೬ ಹಂತದ ಕ್ರಿಯಾಯೋಜನೆ", icon: <Info className="w-4 h-4" /> },
  { href: "/pledge", label: "ಸಂಕಲ್ಪ ಪತ್ರ", desc: "ಪ್ರತಿಜ್ಞಾವಿಧಿ ಸ್ವೀಕಾರ ಹಾಗೂ ಪ್ರಮಾಣಪತ್ರ", icon: <Award className="w-4 h-4" /> },
  { href: "/volunteer", label: "ಸೇವಾದಾರರ ನೋಂದಣಿ", desc: "ಕಲಿಯುವವರು/ಕಲಿಸುವವರು ಫಾರ್ಮ್‌ಗಳು", icon: <UserPlus className="w-4 h-4" /> },
  { href: "/learning", label: "ಕಲಿಕಾ ಪಠ್ಯಕ್ರಮ", desc: "೬೦ ದಿನಗಳ ಕನ್ನಡ ಕಲಿಕಾ ಹಂತಗಳು", icon: <BookOpen className="w-4 h-4" /> },
  { href: "/districts", label: "ಜಿಲ್ಲಾವಾರು ಪ್ರಗತಿ", desc: "೩೧ ಜಿಲ್ಲೆಗಳ ಅಂಕಿ-ಅಂಶಗಳು", icon: <MapPin className="w-4 h-4" /> },
  { href: "/gallery", label: "ಚಿತ್ರ ಸಂಪುಟ", desc: "ಕಾರ್ಯಕ್ರಮಗಳ ಆಪೂರ್ವ ಚಿತ್ರಗಳು", icon: <ImageIcon className="w-4 h-4" /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  // Sliding pill navigation indicator state
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0, height: 0, top: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for each main navigation element
  const homeRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLAnchorElement>(null);
  const campaignRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);

  const isCampaignRoute = dropdownLinks.some((l) => pathname === l.href);

  useEffect(() => {
    const updateRect = () => {
      let activeEl: HTMLElement | null = null;
      if (pathname === "/") {
        activeEl = homeRef.current;
      } else if (pathname === "/about") {
        activeEl = aboutRef.current;
      } else if (isCampaignRoute) {
        activeEl = campaignRef.current;
      } else if (pathname === "/contact") {
        activeEl = contactRef.current;
      }

      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          top: activeEl.offsetTop,
        });
      } else {
        setActiveRect({ left: 0, width: 0, height: 0, top: 0 });
      }
    };

    // Calculate position immediately and after a short timeout to handle DOM updates cleanly
    updateRect();
    const timer = setTimeout(updateRect, 80);

    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
      clearTimeout(timer);
    };
  }, [pathname, isCampaignRoute]);

  return (
    <header className="sticky top-3 z-40 flex justify-center px-4 w-full print:hidden mt-3 mb-2">
      <nav className="glass flex w-full md:w-auto md:max-w-4xl items-center justify-between py-2 pl-5 pr-2.5 transition-all duration-300 rounded-full border border-white/10 bg-transparent mx-auto gap-8 lg:gap-12">
        
        {/* Logo Section */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group mr-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-full shadow-sm flex items-center justify-center text-white font-bold text-base group-hover:scale-105 transition-transform duration-200">
            ಕ
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base text-[#333333] tracking-tight leading-none">
              ಕನ್ನಡ ಭಾರತಿ
            </span>
            <span className="text-[8px] text-[#ED1C24] font-bold tracking-wider">
              ಆಂದೋಲನ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links Container */}
        <div ref={containerRef} className="hidden md:flex items-center space-x-1 relative z-0">
          
          {/* Sliding Pill Background Indicator */}
          {activeRect.width > 0 && (
            <div
              className="absolute bg-[#ED1C24]/15 border border-[#ED1C24]/25 rounded-full transition-all duration-300 ease-out shadow-sm shadow-[#ED1C24]/5 backdrop-blur-sm -z-10"
              style={{
                left: `${activeRect.left}px`,
                width: `${activeRect.width}px`,
                height: `${activeRect.height}px`,
                top: `${activeRect.top}px`,
              }}
            />
          )}

          {/* Home Link */}
          <Link
            ref={homeRef}
            href="/"
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 ${
              pathname === "/"
                ? "active-nav-link text-[#ED1C24] font-extrabold"
                : "text-gray-600 hover:text-[#ED1C24]"
            }`}
          >
            ಮುಖಪುಟ
          </Link>

          {/* About Link */}
          <Link
            ref={aboutRef}
            href="/about"
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 ${
              pathname === "/about"
                ? "active-nav-link text-[#ED1C24] font-extrabold"
                : "text-gray-600 hover:text-[#ED1C24]"
            }`}
          >
            ನಮ್ಮ ಬಗ್ಗೆ
          </Link>

          <div
            ref={campaignRef}
            className="relative"
            onMouseEnter={() => setIsDropdownHovered(true)}
            onMouseLeave={() => setIsDropdownHovered(false)}
          >
            <button
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 flex items-center gap-1.5 ${
                isCampaignRoute
                  ? "active-nav-link text-[#ED1C24] font-extrabold"
                  : "text-gray-600 hover:text-[#ED1C24]"
              }`}
            >
              <span>ಆಂದೋಲನ</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownHovered ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Floating Window (Bask Tech style glass window) */}
            {isDropdownHovered && (
              <div className="absolute top-[38px] left-1/2 -translate-x-1/2 w-80 glass rounded-2xl border border-white/50 bg-white/95 backdrop-blur-xl shadow-xl p-3 animate-in fade-in slide-in-from-top-2 duration-150 grid gap-1.5">
                {dropdownLinks.map((link) => {
                  const isSubActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        isSubActive
                          ? "bg-amber-50/50 text-[#ED1C24]"
                          : "hover:bg-gray-50 text-gray-700 hover:text-[#ED1C24]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSubActive ? "bg-[#ED1C24] text-white" : "bg-amber-50 text-[#ED1C24]"}`}>
                        {link.icon}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold leading-tight">{link.label}</span>
                        <span className="text-[10px] text-gray-400 font-semibold mt-0.5">{link.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact Link */}
          <Link
            ref={contactRef}
            href="/contact"
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 ${
              pathname === "/contact"
                ? "active-nav-link text-[#ED1C24] font-extrabold"
                : "text-gray-600 hover:text-[#ED1C24]"
            }`}
          >
            ಸಂಪರ್ಕಿಸಿ
          </Link>

          {/* Login Divider */}
          <div className="pl-3 ml-3 border-l border-amber-100/50">
            <Link href="/volunteer">
              <Button size="sm" className="bg-[#ED1C24] hover:bg-[#D11820] text-white rounded-full px-5 text-xs font-bold shadow-md shadow-[#ED1C24]/10 active:scale-95 transition-all">
                ಲಾಗಿನ್
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Action Button */}
        <div className="md:hidden flex items-center pr-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-[#ED1C24] p-2 rounded-full hover:bg-gray-100/60 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Glass overlay) */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl border border-amber-100/50 shadow-xl p-4 animate-in slide-in-from-top duration-200 flex flex-col gap-2 text-left">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              pathname === "/" ? "bg-amber-50 text-[#ED1C24]" : "text-gray-600 hover:bg-amber-50/20"
            }`}
          >
            ಮುಖಪುಟ
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              pathname === "/about" ? "bg-amber-50 text-[#ED1C24]" : "text-gray-600 hover:bg-amber-50/20"
            }`}
          >
            ನಮ್ಮ ಬಗ್ಗೆ
          </Link>

          {/* Collapsible Mobile Submenu */}
          <div className="border-t border-amber-50/50 pt-2 mt-1">
            <button
              onClick={() => setIsMobileSubmenuOpen(!isMobileSubmenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-600 hover:text-[#ED1C24]"
            >
              <span>ಆಂದೋಲನ ಪುಟಗಳು</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${isMobileSubmenuOpen ? "rotate-90" : ""}`} />
            </button>

            {isMobileSubmenuOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l border-amber-100 ml-4">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false);
                      setIsMobileSubmenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold ${
                      pathname === link.href ? "text-[#ED1C24] bg-amber-50/50" : "text-gray-500 hover:text-[#ED1C24]"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border-t border-amber-50/50 mt-1 ${
              pathname === "/contact" ? "bg-amber-50 text-[#ED1C24]" : "text-gray-600 hover:bg-amber-50/20"
            }`}
          >
            ಸಂಪರ್ಕಿಸಿ
          </Link>

          <div className="pt-4 border-t border-amber-100 mt-2 px-2">
            <Link href="/volunteer" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white rounded-xl py-6 font-bold text-sm">
                ಲಾಗಿನ್
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
