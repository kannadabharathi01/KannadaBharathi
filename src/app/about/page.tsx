"use client";

import React from "react";
import NextLink from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Trophy, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
      {/* Breadcrumb / Back button */}
      <NextLink href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </NextLink>

      {/* Title */}
      <ScrollReveal className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ನಮ್ಮ <span className="text-[#ED1C24]">ಗುರಿ ಮತ್ತು ಹಿನ್ನೆಲೆ</span>
        </h1>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full"></div>
      </ScrollReveal>

      {/* Section 1: Why this campaign? */}
      <ScrollReveal>
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/60 shadow-md mb-12 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
            <HelpCircle className="text-[#ED1C24] w-7 h-7" />
            <span>ಈ ಕನ್ನಡ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮ ಏಕೆ ಬೇಕು?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-semibold text-sm md:text-base leading-relaxed">
            <div className="space-y-4">
              <p>
                ಕಳೆದ ಮೂರು-ನಾಲ್ಕು ದಶಕಗಳಿಂದ ಬಹುತೇಕರು ಇಂಗ್ಲಿಷ್ ಮಾಧ್ಯಮದ ಮೂಲಕ ಶಿಕ್ಷಣ ಪಡೆಯುತ್ತಿರುವುದರಿಂದ ಕನ್ನಡದ ಮೇಲಿನ ಆಸಕ್ತಿ ಕಡಿಮೆಯಾಗುತ್ತಿದೆ. ಕನ್ನಡ ಭಾಷೆ ಕಲಿಯುವುದು ಅನಿವಾರ್ಯವೂ ಅಲ್ಲ ಮತ್ತು ಅದು ಅನ್ನದ ಭಾಷೆಯೂ ಅಲ್ಲ ಎಂಬ ತಪ್ಪು ತಿಳುವಳಿಕೆಯಿಂದ ಕನ್ನಡದ ಬಳಕೆ ಕುಂಠಿತವಾಗಿ ವಿನಾಶದ ಹಾದಿ ಹಿಡಿದಿದೆ.
              </p>
              <p>
                ಕರ್ನಾಟಕದಲ್ಲಿ ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಅನ್ಯಭಾಷಿಕರು ಹೆಚ್ಚಾಗುತ್ತಿದ್ದಾರೆ. ನಮ್ಮ ಕನ್ನಡಿಗರೂ ಸಹ ಪರಭಾಷಿಕರೊಂದಿಗೆ ಅವರದೇ ಭಾಷೆಯಲ್ಲಿ ಸಂವಹನ ನಡೆಸಲು ಯತ್ನಿಸುತ್ತಿರುವುದರಿಂದ ಕನ್ನಡದ ಧ್ವನಿಯೇ ಕೇಳದಂತೆ ಮಾಯವಾಗುತ್ತಿದೆ.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಗಂಭೀರವಾಗಿ ಪರಿಗಣಿಸಿ ಸಾಹಿತ್ಯ, ಅಧ್ಯಯನ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ನಮ್ಮ ನಾಡಿನ ಹಿರಿಮೆ-ಗರಿಮೆಗಳ ಕುರಿತಾದ ಚಿಂತನೆಗಳು ಕಡಿಮೆಯಾಗುತ್ತಿವೆ. ಇದು ಹೀಗೆಯೇ ಮುಂದುವರಿದರೆ ಕರ್ನಾಟಕದಲ್ಲಿ ಕನ್ನಡಿಗರಿಗೆ ಹಾಗೂ ಕನ್ನಡ ಭಾಷೆಗೆ ದೊಡ್ಡ ಅಪಾಯ ಒದಗುವ ಸಾಧ್ಯತೆ ಇದೆ.
              </p>
              <p className="border-l-4 border-[#ED1C24] pl-4 italic text-gray-500 bg-amber-50/20 py-2 rounded-r-xl">
                ಹಾಗಾಗಿ ಎಂದಿಗಿಂತಲೂ ಈ ಹೊತ್ತಿನಲ್ಲಿ ಕನ್ನಡ ಭಾಷಾ ಜಾಗೃತಿಯ ಕಾರ್ಯಕ್ರಮ ಅತ್ಯಂತ ಜರೂರಾಗಿ ಅಗತ್ಯವಾಗಿದೆ.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 2: Historical context */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ScrollReveal delay={100}>
          <div className="glass p-8 rounded-3xl border border-white/60 shadow-md space-y-4 h-full hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-50/50 rounded-xl border border-amber-100/40 flex items-center justify-center text-[#ED1C24] shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-800">ಚಾರಿತ್ರಿಕ ಹಿನ್ನೆಲೆ</h3>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed">
              ೧೮೯೦ ನೇ ಇಸ್ವಿಯಲ್ಲಿಯೇ ಕರ್ನಾಟಕ ವಿದ್ಯಾವರ್ಧಕ ಸಂಘದ ಸ್ಥಾಪನೆಯ ಮೂಲಕ ಕನ್ನಡ ಜಾಗೃತಿಯಾಗಿ ಕರ್ನಾಟಕದಲ್ಲಿ ಆಂದೋಲನವು ಮಹತ್ವದ ಬೆಳವಣಿಗೆಯನ್ನು ಕಂಡಿತು. ಆನಂತರದ ದಿನಗಳಲ್ಲಿ ಕಾಲಕಾಲಕ್ಕೆ ತಕ್ಕಂತೆ ಚಳುವಳಿಗಳು ನಡೆಯುತ್ತಾ, ಭಾಷಾವಾರು ಪ್ರಾಂತ್ಯಗಳ ವಿಂಗಡಣೆಯಲ್ಲಿಯೂ ಮಹತ್ವದ ಪಾತ್ರವಹಿಸಿ ಕನ್ನಡದ ಅಸ್ಮಿತೆಯನ್ನು ಕಾಪಾಡಿಕೊಂಡವು.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass p-8 rounded-3xl border border-white/60 shadow-md space-y-4 h-full hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-50/50 rounded-xl border border-amber-100/40 flex items-center justify-center text-[#ED1C24] shadow-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-gray-800">ಗೋಕಾಕ್ ಚಳುವಳಿ</h3>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed">
              ಇತ್ತೀಚಿನ ದಿನಗಳಲ್ಲಿ ಡಾಕ್ಟರ್ ರಾಜಕುಮಾರ್ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ನಡೆದ ಗೋಕಾಕ್ ಚಳುವಳಿಯು ಅತ್ಯಂತ ಮಹತ್ವಪೂರ್ಣ ಫಲವನ್ನು ನೀಡಿದ್ದರಿಂದ ಕನ್ನಡದ ಜಾಗೃತಿ ಎರಡು ಮೂರು ದಶಕಗಳ ಕಾಲ ನಾಡಿನ ಎಲ್ಲೆಡೆ ಕಂಡುಬಂದಿತು. ಆದಾದ ನಂತರ ಇತ್ತೀಚಿಗೆ ಇಂತಹ ಯಾವುದೇ ಕ್ರಿಯಾಯೋಜನೆಯುಳ್ಳ ಭಾಷಾ ಚಳುವಳಿಯು ಕಂಡುಬಂದಿಲ್ಲ.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Section 3: Movie Inspiration */}
      <ScrollReveal>
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/60 shadow-md mb-12 hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ED1C24]/10 text-[#ED1C24] rounded-full text-xs font-bold border border-[#ED1C24]/20">
                ಚಲನಚಿತ್ರದ ಪ್ರೇರಣೆ
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-gray-800">
                &quot;ಭಾರತಿ ಟೀಚರ್&quot; ಪಾತ್ರದ ಸ್ಪೂರ್ತಿ
              </h2>
              <div className="text-gray-600 font-semibold text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  ಭಾರತಿ ಎಂಬ ಏಳನೇ ತರಗತಿ ಓದುವ ಹುಡುಗಿ ತನ್ನ ಹಳ್ಳಿಯ ಎಲ್ಲರನ್ನೂ ಕನ್ನಡ ಸಾಕ್ಷರರನ್ನಾಗಿ ಮಾಡುವ ಸಂಕಲ್ಪ ತೊಟ್ಟು ಅದರಂತೆ ಯಶಸ್ವಿಯಾಗುವುದೇ <span className="text-[#ED1C24] font-bold">&apos;ಭಾರತಿ ಟೀಚರ್ ಏಳನೇ ತರಗತಿ&apos;</span> ಚಿತ್ರದ ಕಥಾವಸ್ತು.
                </p>
                <p>
                  ಈ ಚಿತ್ರದ ಪಾತ್ರವನ್ನು ಸ್ಪೂರ್ತಿಯಾಗಿಟ್ಟುಕೊಂಡು ನಾಡಿನ ಎಲ್ಲ ಮಕ್ಕಳು ಸ್ವಯಂಪ್ರೇರಣೆಯಿಂದ ಕನಿಷ್ಠ ೧೦ ಜನರಿಗೆ ವಿದ್ಯಾದಾನ ಮಾಡುವ ಸಂಕಲ್ಪ ತೊಡಬೇಕು. ಶಿಕ್ಷಕರು ಹಾಗೂ ಸುಶಿಕ್ಷಿತರು ಮಕ್ಕಳಿಗೆ ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ ನೀಡಬೇಕು.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 flex-shrink-0 flex items-center justify-center">
              <div className="relative w-64 h-64 bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-white/60 flex items-center justify-center shadow-lg group overflow-hidden">
                <div className="text-center p-4">
                  <span className="text-6xl font-extrabold text-[#ED1C24] font-heading block mb-2 animate-pulse">ಭಾರತಿ</span>
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">ಟೀಚರ್</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 4: Why Children? */}
      <ScrollReveal>
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/60 shadow-md mb-12 space-y-6 hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
            <GraduationCap className="text-[#ED1C24] w-7 h-7" />
            <span>ಈ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಮಕ್ಕಳು ಏಕೆ ಭಾಗವಹಿಸಬೇಕು?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 font-semibold text-sm leading-relaxed">
            <ul className="space-y-4 list-disc pl-5">
              <li>
                <strong className="text-gray-800">ಸ್ವಯಂ ಪ್ರೇರಣೆ:</strong> ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಕನ್ನಡದ ಉಳಿವು ಸಾಧ್ಯವಾಗಬೇಕಾದರೆ ಅದು ಮಕ್ಕಳ ಸ್ವಯಂ ಪ್ರೇರಣೆಯ ನಿರ್ಧಾರದಿಂದ ಮಾತ್ರ ಸಾಧ್ಯ.
              </li>
              <li>
                <strong className="text-gray-800">ಅಹಂಕಾರವಿಲ್ಲದ ಕಲಿಕೆ:</strong> ದೊಡ್ಡವರು ಮತ್ತೊಬ್ಬರಿಗೆ ಹೇಳಿದರೆ ಅಹಂಕಾರಕ್ಕೆ ತಾಗುತ್ತದೆ. ಆದರೆ ಮುದ್ದಾದ ಮಕ್ಕಳು ಮುಗ್ಧವಾಗಿ &quot;ಕಲಿಸಬಹುದೇ&quot; ಎಂದು ಕೇಳಿದರೆ ಯಾರೂ ನಿರಾಕರಿಸುವುದಿಲ್ಲ.
              </li>
              <li>
                <strong className="text-gray-800">ವ್ಯಕ್ತಿತ್ವ ವಿಕಸನ:</strong> ಮಕ್ಕಳು ಕಲಿಸುವ ಹಂತಕ್ಕೆ ಬೆಳೆದಾಗ ಅವರಲ್ಲಿ ಪ್ರೌಢ ಚಿಂತನೆ ಮೂಡಿ ವ್ಯಕ್ತಿತ್ವವೇ ಪರಿಪೂರ್ಣಗೊಳ್ಳುತ್ತದೆ.
              </li>
            </ul>
            <ul className="space-y-4 list-disc pl-5">
              <li>
                <strong className="text-gray-800">ಸಂವಹನ ಸಾಮರ್ಥ್ಯ:</strong> ಸಮಾಜದೊಂದಿಗೆ ಮುಕ್ತವಾಗಿ ತೆರೆದುಕೊಳ್ಳುವುದರಿಂದ ಮಕ್ಕಳ ಸಂವಹನ ಕಲೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಪ್ರಜ್ಞೆ ವೃದ್ಧಿಯಾಗುತ್ತದೆ.
              </li>
              <li>
                <strong className="text-gray-800">ಸ್ವಾವಲಂಬನೆ:</strong> ಕಲಿಯುವ ಹಂತದಲ್ಲೇ ಸಮಾಜ ಸೇವೆ ಮಾಡುವ ದುಡಿಯುವ ಸಾಮರ್ಥ್ಯ ಹಾಗೂ ಹೆಮ್ಮೆ ಗಳಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.
              </li>
              <li>
                <strong className="text-gray-800">ಪ್ರೋತ್ಸಾಹ ಧನ:</strong> ಸಂಕಲ್ಪ ಪೂರ್ಣಗೊಳಿಸಿ ೧೦ ಜನರಿಗೆ ಕಲಿಸಿದ ಮಕ್ಕಳಿಗೆ ದಾನಿಗಳಿಂದ ೫,೦೦೦ ರೂಪಾಯಿ ಬಹುಮಾನ ನೀಡಲಾಗುತ್ತದೆ.
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* Action button */}
      <ScrollReveal className="text-center pt-8">
        <NextLink href="/volunteer">
          <Button className="bg-[#ED1C24] hover:bg-[#D11820] text-white text-lg font-bold px-10 py-7 rounded-full shadow-lg shadow-[#ED1C24]/30 hover:scale-105 active:scale-95 transition-all duration-200">
            ಆಂದೋಲನದಲ್ಲಿ ಭಾಗಿಯಾಗಿ
          </Button>
        </NextLink>
      </ScrollReveal>
    </div>
  );
}
