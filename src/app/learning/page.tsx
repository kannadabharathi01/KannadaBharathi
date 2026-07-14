"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, HelpCircle, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";

const syllabusData = [
  {
    week: "ವಾರ ೧-೨ (ದಿನ ೧-೧೫)",
    title: "ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯ ಪರಿಚಯ",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      "ಕನ್ನಡ ಸ್ವರಗಳ ಪರಿಚಯ (ಅ ರಿಂದ ಔ ವರೆಗೆ) ಮತ್ತು ಉಚ್ಚಾರಣೆ",
      "ಕನ್ನಡ ವ್ಯಂಜನಗಳ ವರ್ಗೀಕರಣ ಮತ್ತು ಬರೆಯುವ ಅಭ್ಯಾಸ",
      "ಯೋಗವಾಹಗಳ ಪರಿಚಯ (ಅಂ ಮತ್ತು ಅಃ)",
      "ಅಕ್ಷರಗಳ ಆಕಾರ ಮತ್ತು ಸುಲಭವಾಗಿ ಬರೆಯುವ ತಂತ್ರಗಳು",
      "ಸರಳ ಅಕ್ಷರಗಳ ಸಂಯೋಜನೆ ಮತ್ತು ಶಬ್ದಕೋಶ ಪರಿಚಯ",
    ],
  },
  {
    week: "ವಾರ ೩-೪ (ದಿನ ೧೬-೩೦)",
    title: "ಗುಣಿತಾಕ್ಷರಗಳು ಮತ್ತು ಸರಳ ಪದಗಳು",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      "ಕನ್ನಡ ಕಾಗುಣಿತದ ಮೂಲ ತತ್ವಗಳು (ಸ್ವರ ಚಿಹ್ನೆಗಳು)",
      "ವ್ಯಂಜನಗಳಿಗೆ ಸ್ವರ ಚಿಹ್ನೆಗಳನ್ನು ಸೇರಿಸಿ ಕಾಗುಣಿತ ರಚನೆ",
      "ದ್ವಿತ್ವ ಮತ್ತು ಗುಂಪು ಗುಣಿತಾಕ್ಷರಗಳ ವಾಚನ ಅಭ್ಯಾಸ",
      "ಕಾಗುಣಿತ ಬಳಸಿ ಸರಳ ಎರಡಕ್ಷರ ಮತ್ತು ಮೂರಕ್ಷರಗಳ ಪದ ರಚನೆ",
      "ದೈನಂದಿನ ಬಳಕೆಯ ವಸ್ತುಗಳ ಹೆಸರುಗಳು ಮತ್ತು ಉಚ್ಚಾರಣೆ",
    ],
  },
  {
    week: "ವಾರ ೫-೬ (ದಿನ ೩೧-೪೫)",
    title: "ಒತ್ತಾಕ್ಷರಗಳು ಮತ್ತು ವಾಕ್ಯ ರಚನೆ",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      "ಕನ್ನಡ ಒತ್ತಾಕ್ಷರಗಳ ವಿಧಗಳು (ಸಜಾತೀಯ ಮತ್ತು ವಿಜಾತೀಯ ಸಂಯುಕ್ತಾಕ್ಷರ)",
      "ಒತ್ತಾಕ್ಷರ ಪದಗಳ ಬರವಣಿಗೆ ಮತ್ತು ಉಚ್ಚಾರಣಾ ನಿಯಮಗಳು",
      "ಸಣ್ಣ ಸಣ್ಣ ಸರಳ ವಾಕ್ಯಗಳ ರಚನೆ (ಕರ್ತೃ, ಕರ್ಮ, ಕ್ರಿಯಾಪದ)",
      "ಸರಳ ಕಥೆಗಳನ್ನು ಓದುವುದು ಮತ್ತು ಅರ್ಥೈಸಿಕೊಳ್ಳುವುದು",
      "ವಿರಾಮ ಚಿಹ್ನೆಗಳು ಮತ್ತು ಅವುಗಳ ಸರಿಯಾದ ಬಳಕೆ",
    ],
  },
  {
    week: "ವಾರ ೭-೮ (ದಿನ ೪೬-೬೦)",
    title: "ದೈನಂದಿನ ಸಂಭಾಷಣೆ ಮತ್ತು ಬರವಣಿಗೆ",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      "ಮನೆಯಲ್ಲಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸ್ಥಳಗಳಲ್ಲಿ ನಡೆಸುವ ಸರಳ ಸಂಭಾಷಣೆ",
      "ಸಂಖ್ಯೆಗಳು (೧ ರಿಂದ ೧೦೦) ಮತ್ತು ದಿನೋಪಯೋಗಿ ಗಣಿತ ಪದಗಳು",
      "ಕನ್ನಡ ಪತ್ರ ಬರವಣಿಗೆಯ ಮೂಲ ಹಂತಗಳು",
      "ನಿರೂಪಣೆ ಮತ್ತು ಸ್ವತಂತ್ರ ಬರವಣಿಗೆಯ ಅಭ್ಯಾಸ",
      "ಅಂತಿಮ ಪರೀಕ್ಷೆ ತಯಾರಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ಸಿದ್ಧತಾ ವಾಚನ",
    ],
  },
];

export default function LearningPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* Title */}
      <ScrollReveal className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ೬೦ ದಿನಗಳ <span className="text-[#ED1C24]">ಕಲಿಕಾ ಪಠ್ಯಕ್ರಮ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ಕನ್ನಡ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರದ ಮಾರ್ಗಸೂಚಿಯಂತೆ ಸಿದ್ಧಪಡಿಸಲಾದ ಹಂತ-ಹಂತದ ಸುಲಭ ಕಲಿಕಾ ಯೋಜನೆ.
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      {/* Resource Download banner */}
      <ScrollReveal>
        <div className="glass p-6 rounded-3xl border border-white/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-50/50 border border-amber-100/40 flex items-center justify-center text-[#ED1C24] flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-extrabold text-gray-800">ಕಲಿಕಾ ಪುಸ್ತಕಗಳು (PDF)</h4>
              <p className="text-xs text-gray-400 font-semibold">೬೦ ದಿನಗಳ ಪಠ್ಯಪುಸ್ತಕ ಮತ್ತು ಪ್ರಶ್ನೆಕೋಶವನ್ನು ಉಚಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ</p>
            </div>
          </div>
          <Button className="bg-[#ED1C24] hover:bg-[#D11820] text-white rounded-full font-bold px-6 py-4 flex items-center gap-2 text-sm active:scale-95 duration-200">
            <Download className="w-4 h-4" />
            <span>ಪುಸ್ತಕ ಡೌನ್‌ಲೋಡ್</span>
          </Button>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Week Selection Side Menu */}
        <div className="space-y-3">
          {syllabusData.map((data, idx) => (
            <ScrollReveal 
              key={idx}
              delay={idx * 100}
            >
              <button
                onClick={() => setSelectedWeek(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                  selectedWeek === idx
                    ? "bg-[#ED1C24] text-white border-[#ED1C24] shadow-md shadow-[#ED1C24]/10 active:scale-[0.98]"
                    : "glass text-gray-600 border-white/60 hover:bg-amber-50/20 hover:text-[#ED1C24]"
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${selectedWeek === idx ? "text-amber-200" : "text-gray-400"}`}>
                  {data.week}
                </span>
                <span className="text-base font-heading font-extrabold leading-tight">{data.title}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Week Details Content */}
        <ScrollReveal className="md:col-span-2">
          <div className="glass p-8 rounded-3xl border border-white/60 shadow-lg min-h-[300px] hover:shadow-xl transition-all duration-300">
            <div className="border-b border-amber-100/50 pb-4 mb-6">
              <span className="text-xs font-bold text-[#ED1C24] uppercase tracking-wider block">
                Syllabus Details • {syllabusData[selectedWeek].week}
              </span>
              <h3 className="text-2xl font-heading font-extrabold text-gray-800 mt-1">
                {syllabusData[selectedWeek].title}
              </h3>
            </div>

            <div className="space-y-4">
              {syllabusData[selectedWeek].items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  <div className="w-5 h-5 rounded-md bg-amber-50/50 border border-amber-200/40 flex items-center justify-center text-[#ED1C24] flex-shrink-0 mt-0.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm md:text-base text-gray-600 font-semibold leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-amber-100/40 flex items-center justify-between text-xs text-gray-400 font-semibold">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                ಕಲಿಕೆಗೆ ಶಿಕ್ಷಕ ಅಥವಾ ಮಾರ್ಗದರ್ಶಕ ಅಗತ್ಯ
              </span>
              <span>೬೦ ದಿನಗಳ ಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆ</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
