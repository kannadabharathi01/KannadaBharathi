"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Calendar, UserCheck, Play, Printer, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function PledgePage() {
  const [name, setName] = useState("");
  const [pledged, setPledged] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setPledged(true);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 print:max-w-full print:py-0">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors print:hidden">
        <ArrowLeft className="w-4 h-4" />
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* Title */}
      <ScrollReveal className="text-center mb-12 print:hidden">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ಕನ್ನಡ ಜಾಗೃತಿ <span className="text-[#ED1C24]">ಸಂಕಲ್ಪ ಮತ್ತು ಪ್ರತಿಜ್ಞಾವಿಧಿ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ೬೦ ದಿನಗಳಲ್ಲಿ ಕನ್ನಡ ಕಲಿಯಲು ಅಥವಾ ಕಲಿಸಲು ನಿಮ್ಮ ಪ್ರತಿಜ್ಞೆಯನ್ನು ಸ್ವೀಕರಿಸಿ, ಜವಾಬ್ದಾರಿಯುತ ಕನ್ನಡಿಗನಾಗಿ
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 items-start mb-16 print:grid-cols-1">
        {/* Left side: Video & Instruction */}
        <div className="space-y-6 print:hidden">
          <ScrollReveal delay={100}>
            <div className="glass p-6 rounded-3xl border border-white/60 shadow-md space-y-4 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-heading font-bold text-gray-800 flex items-center gap-2">
                <UserCheck className="text-[#ED1C24]" />
                <span>ಪ್ರತಿಜ್ಞಾವಿಧಿ ಏಕೆ ಬೇಕು?</span>
              </h3>
              <p className="text-sm text-gray-600 font-semibold leading-relaxed">
                ಕನ್ನಡ ಕಲಿಯಬಯಸುವವರು ಮತ್ತು ಕಲಿಸುವವರು ಮೊದಲು ಸಂಕಲ್ಪ ತೊಡಬೇಕು. ಭಾಷೆ ಬರುವುದಿಲ್ಲ ಎಂಬ ಕೀಳರಿಮೆ ಬಿಟ್ಟು, ೬೦ ದಿನಗಳಲ್ಲಿ ಸಂಪೂರ್ಣ ಸಹಕಾರದೊಂದಿಗೆ ಕನ್ನಡ ಕಲಿಯುತ್ತೇವೆ ಎಂದು ಪ್ರತಿಜ್ಞೆ ಮಾಡುವುದು ಹಾಗೂ ಅದನ್ನು ದಾಖಲೀಕರಣ ಮಾಡುವುದು ಕಲಿಕೆಗೆ ಭದ್ರ ಬುನಾದಿ ಹಾಕುತ್ತದೆ.
              </p>
            </div>
          </ScrollReveal>

          {/* Video Player Placeholder */}
          <ScrollReveal delay={200}>
            <div className="relative aspect-video bg-gray-900 rounded-3xl border border-white/60 overflow-hidden flex items-center justify-center shadow-lg group">
              <div className="absolute inset-0 bg-[url('/images/karnataka-flag-bright-colorful-2.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500"></div>
              {/* Visual Video Play Overlay */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#ED1C24] hover:bg-[#D11820] flex items-center justify-center text-white cursor-pointer shadow-md hover:scale-110 active:scale-95 transition-all">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
              <div className="absolute bottom-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-full text-[10px] font-semibold text-white">
                ವಿಡಿಯೋ: ಭಾರತಿ ಟೀಚರ್ ಚಿತ್ರದ ಸಂದೇಶ
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right side: Interactive Form or Certificate */}
        <div>
          {!pledged ? (
            <ScrollReveal delay={150}>
              <div className="glass p-8 rounded-3xl border border-white/60 shadow-lg space-y-6 print:hidden">
                <h3 className="text-xl font-heading font-bold text-gray-800 text-center">
                  ನನ್ನ ಕನ್ನಡ ಸಂಕಲ್ಪ
                </h3>
                
                <div className="p-4 bg-amber-50/30 rounded-2xl border border-amber-100/30 text-gray-600 text-sm font-semibold leading-relaxed italic">
                  &quot;ನಾನು ಕನ್ನಡ ನಾಡಿನ ಜವಾಬ್ದಾರಿಯುತ ಪ್ರಜೆಯಾಗಿ, ಈ ದಿನದಿಂದ ಮುಂದಿನ ೬೦ ದಿನಗಳ ಕಾಲ ಸಂಪೂರ್ಣ ಶ್ರದ್ಧೆ ಮತ್ತು ಆಸಕ್ತಿಯಿಂದ ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಕಲಿಯುತ್ತೇನೆ. ನನ್ನ ಬದುಕಿನಲ್ಲಿ, ವ್ಯವಹಾರದಲ್ಲಿ ಮತ್ತು ದೈನಂದಿನ ಸಂವಹನದಲ್ಲಿ ಕನ್ನಡವನ್ನೇ ಬಳಸುತ್ತೇನೆ. ನನ್ನ ಮೂಲಕ ಮತ್ತೊಬ್ಬರಿಗೂ ಕನ್ನಡವನ್ನು ಕಲಿಸಿ, ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಉಳಿವಿಗೆ ಸದಾ ಶ್ರಮಿಸುತ್ತೇನೆ ಎಂದು ಪ್ರತಿಜ್ಞೆ ಮಾಡುತ್ತೇನೆ.&quot;
                </div>

                <form onSubmit={handlePledge} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು (ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ)
                    </label>
                    <Input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ಉದಾ: ರಾಜೇಶ್ ಗೌಡ"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      ದಿನಾಂಕ
                    </label>
                    <Input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white py-6 rounded-xl font-bold text-base shadow-lg shadow-[#ED1C24]/10 transition-transform active:scale-98">
                    ಸಂಕಲ್ಪ ಸ್ವೀಕರಿಸಿ
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={100} className="space-y-6">
              {/* Certificate Area */}
              <div
                ref={certificateRef}
                className="relative bg-white p-8 md:p-12 rounded-3xl border-[12px] border-double border-[#ED1C24] shadow-xl text-center space-y-6 overflow-hidden max-w-lg mx-auto print:border-[16px] print:shadow-none print:my-0"
              >
                {/* Corner Flags decoration */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-[#FFC20E]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#ED1C24]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#ED1C24]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFC20E]"></div>

                {/* Logo mark */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-full mx-auto flex items-center justify-center text-white font-bold text-3xl shadow-md">
                  ಕ
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#ED1C24] tracking-widest uppercase block">
                    ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ
                  </span>
                  <h4 className="text-3xl font-heading font-extrabold text-[#333333]">
                    ಸಂಕಲ್ಪ ಪತ್ರ
                  </h4>
                </div>

                <div className="w-24 h-0.5 bg-amber-200 mx-auto"></div>

                <div className="text-sm font-semibold text-gray-600 leading-relaxed space-y-4">
                  <p>
                    ಶ್ರೀ / ಶ್ರೀಮತಿ <span className="text-xl font-extrabold text-[#ED1C24] block my-2 underline decoration-[#FFC20E] decoration-4">{name}</span>
                  </p>
                  <p>
                    ಇವರು ಇಂದು ಸ್ವಯಂ ಪ್ರೇರಿತರಾಗಿ ಕನ್ನಡ ನಾಡಿನಲ್ಲಿ ಕನ್ನಡ ಉಳಿಸಿ, ಬೆಳೆಸಲು ಮತ್ತು ಇತರರಿಗೆ ಕನ್ನಡವನ್ನು ಪ್ರೀತಿಯಿಂದ ಕಲಿಸಲು ಸಾಂಪ್ರದಾಯಿಕ ಪ್ರತಿಜ್ಞೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸ್ವೀಕರಿಸಿದ್ದಾರೆ.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 text-left border-t border-amber-100/60">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400">ದಿನಾಂಕ</span>
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#ED1C24]" />
                      {date}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-gray-400">ದೃಢೀಕರಿಸಿದ ಸಂಸ್ಥೆ</span>
                    <span className="text-xs font-bold text-[#ED1C24] flex items-center justify-end gap-1">
                      <Award className="w-3.5 h-3.5" />
                      ಕನ್ನಡ ಭಾರತಿ
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions under Certificate */}
              <div className="flex gap-4 justify-center print:hidden">
                <Button onClick={handlePrint} variant="outline" className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full font-bold px-6 py-5">
                  <Printer className="w-4 h-4 mr-2" />
                  ಮುದ್ರಿಸಿ / PDF ಉಳಿಸಿ
                </Button>
                
                <Button onClick={() => setPledged(false)} className="bg-[#ED1C24] hover:bg-[#D11820] text-white rounded-full font-bold px-6 py-5">
                  ಮತ್ತೊಂದು ಸಂಕಲ್ಪ
                </Button>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-2xl flex items-center justify-center gap-2 print:hidden max-w-sm mx-auto">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ಸಂಕಲ್ಪವು ಸಫಲವಾಗಲಿ.</span>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
