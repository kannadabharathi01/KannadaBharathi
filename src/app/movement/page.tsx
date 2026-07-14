"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Film, UserPlus, PlayCircle, ClipboardList, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";

const actionSteps = [
  {
    title: "೧. ಭಾರತಿ ಟೀಚರ್ ಚಲನಚಿತ್ರ ಪ್ರದರ್ಶನ",
    icon: <Film className="w-6 h-6" />,
    desc: "ಎಲ್ಲ ಶಾಲೆಗಳಲ್ಲಿ, ಸಭಾಂಗಣಗಳಲ್ಲಿ ಅಥವಾ ಚಿತ್ರಮಂದಿರಗಳಲ್ಲಿ ಮಕ್ಕಳಿಗೆ ಮತ್ತು ನಾಗರಿಕರಿಗೆ ಮೊದಲಿಗೆ 'ಭಾರತಿ ಟೀಚರ್' ಚಿತ್ರದ ಪ್ರದರ್ಶನ ಏರ್ಪಡಿಸುವುದು.",
  },
  {
    title: "೨. ಸಕಲ ಸೇವಾದಾರರ ಹೆಸರು ನೋಂದಣಿ",
    icon: <UserPlus className="w-6 h-6" />,
    desc: "ಚಲನಚಿತ್ರ ವೀಕ್ಷಣೆಯ ನಂತರ ಕಲಿಯುವವರು, ಕಲಿಸುವ ಮಕ್ಕಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರ ಹೆಸರುಗಳನ್ನು ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳುವುದು.",
  },
  {
    title: "೩. ಪ್ರತಿಜ್ಞಾವಿಧಿ ಸ್ವೀಕಾರ ಹಾಗೂ ದಾಖಲೆ",
    icon: <PlayCircle className="w-6 h-6" />,
    desc: "ಕಲಿಯುವವರು '೬೦ ದಿನಗಳಲ್ಲಿ ಕನ್ನಡ ಕಲಿಯುತ್ತೇವೆ' ಎಂದು ಪ್ರತಿಜ್ಞೆ ಮಾಡುವುದು ಹಾಗೂ ಇದರ ವಿಡಿಯೋ ಮುದ್ರಿಸಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದಾಖಲಿಸುವುದು.",
  },
  {
    title: "೪. ವಾರಾವಾರು ಪ್ರಗತಿ ವರತಿ",
    icon: <ClipboardList className="w-6 h-6" />,
    desc: "ಪ್ರತಿ ವಾರವೂ ಕಲಿಕೆಯ ಬೆಳವಣಿಗೆಯ ವಿವಿಧ ಹಂತಗಳನ್ನು ಫೋಟೋ ಅಥವಾ ಕಿರು ವಿಡಿಯೋಗಳ ಮೂಲಕ ಜಾಲತಾಣದಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದು.",
  },
  {
    title: "೫. ಕನ್ನಡ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರದ ಪಠ್ಯ",
    icon: <BookOpen className="w-6 h-6" />,
    desc: "ಕನ್ನಡ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರ ಸಿದ್ಧಪಡಿಸಿದ ೬೦ ದಿನಗಳಲ್ಲಿ ಕನ್ನಡ ಕಲಿಸುವ ವಿಶೇಷ ಪಠ್ಯಕ್ರಮವನ್ನು ಮಕ್ಕಳು ಆಸಕ್ತರಿಗೆ ಹಂಚಿ ಕಲಿಸುವುದು.",
  },
  {
    title: "೬. ಅಂತಿಮ ಮೌಲ್ಯಮಾಪನ ಹಾಗೂ ಪುರಸ್ಕಾರ",
    icon: <GraduationCap className="w-6 h-6" />,
    desc: "೬೦ ದಿನಗಳ ಕೊನೆಯಲ್ಲಿ ಮಾರ್ಗದರ್ಶಕರ ಸಮ್ಮುಖದಲ್ಲಿ ಪರೀಕ್ಷೆ ನಡೆಸಿ, ಯಶಸ್ವಿಯಾದ ಮಕ್ಕಳಿಗೆ ೫,೦೦೦ ರೂಪಾಯಿ ನಗದು ಬಹುಮಾನ ಹಾಗೂ ಪ್ರಮಾಣಪತ್ರ ನೀಡುವುದು.",
  },
];

export default function MovementPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* Title */}
      <ScrollReveal className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ಕ್ರಿಯಾಯೋಜನೆ ಮತ್ತು <span className="text-[#ED1C24]">ಆಂದೋಲನ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ಕನ್ನಡ ಜಾಗೃತಿಯನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಮೂಡಿಸಲು ರೂಪಿಸಲಾದ ೬ ಹಂತಗಳ ವಿವರವಾದ ಕ್ರಿಯಾಯೋಜನೆ
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      {/* Slogan Alert */}
      <ScrollReveal>
        <div className="glass border border-white/60 p-6 rounded-3xl text-center mb-12 shadow-md">
          <p className="text-lg font-heading font-extrabold text-[#D18C00]">
            &quot;ಕನ್ನಡ ಕಲಿ - ಕನ್ನಡ ಕಲಿಸು. ಇದು ನಮ್ಮ ಹೊಸ ಕನಸು.&quot;
          </p>
        </div>
      </ScrollReveal>

      {/* Action Steps Vertical Timeline */}
      <div className="relative border-l-2 border-amber-200/60 ml-4 md:ml-6 space-y-12 mb-16">
        {actionSteps.map((step, idx) => (
          <div key={idx} className="relative pl-8 md:pl-10 group">
            {/* Timeline Bullet Icon */}
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#ED1C24] flex items-center justify-center text-[#ED1C24] shadow-sm group-hover:bg-[#ED1C24] group-hover:text-white transition-all duration-300">
              {step.icon}
            </div>

            {/* Content Card */}
            <ScrollReveal delay={idx * 100}>
              <div className="glass p-6 rounded-3xl border border-white/60 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg md:text-xl font-heading font-extrabold text-gray-800 mb-2 group-hover:text-[#ED1C24] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 font-semibold leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>

      {/* Grid Stats info */}
      <ScrollReveal>
        <div className="glass border border-white/60 p-8 rounded-3xl text-center mb-12 space-y-6 shadow-md hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-2xl font-heading font-extrabold text-[#ED1C24]">
            ಕ್ಷೇತ್ರವಾರು ನಿರೀಕ್ಷಿತ ಗುರಿ
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center max-w-lg mx-auto">
            <div className="p-4 glass rounded-2xl shadow-sm border border-white/50">
              <span className="block text-xl font-extrabold text-gray-800">೫೦೦</span>
              <span className="text-[11px] font-bold text-gray-500">ಮಾರ್ಗದರ್ಶಕರು</span>
            </div>
            <div className="p-4 glass rounded-2xl shadow-sm border border-white/50">
              <span className="block text-xl font-extrabold text-gray-800">೫,೦೦೦</span>
              <span className="text-[11px] font-bold text-gray-500">ಕಲಿಸುವ ಮಕ್ಕಳು</span>
            </div>
            <div className="p-4 glass rounded-2xl shadow-sm border border-white/50">
              <span className="block text-xl font-extrabold text-gray-800">೫೦,೦೦೦</span>
              <span className="text-[11px] font-bold text-gray-500">ಕಲಿತವರು</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            ಒಟ್ಟು ೨೨೪ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಏಕಕಾಲದಲ್ಲಿ ಅನುಷ್ಠಾನ
          </p>
        </div>
      </ScrollReveal>

      {/* CTA Button */}
      <ScrollReveal className="text-center">
        <Link href="/volunteer">
          <Button className="bg-[#ED1C24] hover:bg-[#D11820] text-white text-lg font-bold px-10 py-7 rounded-full shadow-lg shadow-[#ED1C24]/30 hover:scale-105 active:scale-95 transition-all duration-200">
            ನೋಂದಣಿ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ
          </Button>
        </Link>
      </ScrollReveal>
    </div>
  );
}
