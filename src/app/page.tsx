"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Users, BookOpen, Map, House, User, Target, FileBadge, Bookmark, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Counter from "@/components/shared/Counter";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-24 pb-20 text-center">
          <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFC20E]/20 text-[#D11820] rounded-full text-xs sm:text-sm font-bold tracking-wide border border-[#FFC20E]/30 shadow-sm glass">
              <Sparkles className="w-4 h-4 text-[#ED1C24]" />
              <span>ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-[#333333] leading-none tracking-tight">
              ಕನ್ನಡ <span className="text-[#ED1C24]">ಭಾರತಿ</span>
            </h1>
            
            <p className="text-2xl md:text-4xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-bold font-heading">
              &quot;ಪ್ರತಿ ಕನ್ನಡಿಗನು ಮತ್ತೊಬ್ಬರಿಗೆ ಕನ್ನಡ ಕಲಿಸೋಣ&quot;
            </p>
            
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto font-medium">
              ಮಕ್ಕಳ ಮುಗ್ಧತೆಯ ಮೂಲಕ ಮನೆಮನೆಗಳಲ್ಲಿ ಕನ್ನಡದ ಜಾಗೃತಿ ಮೂಡಿಸುವ ಹಾಗೂ ಗಾಂಧಿಗಿರಿಯ ಹಾದಿಯಲ್ಲಿ ಕನ್ನಡ ಕಲಿಸುವ ವಿಶಿಷ್ಟ ಅಭಿಯಾನ.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/volunteer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#ED1C24] hover:bg-[#D11820] text-white text-lg font-bold px-10 py-7 rounded-full shadow-lg shadow-[#ED1C24]/30 hover:scale-105 active:scale-95 transition-all duration-200">
                  ಆಂದೋಲನಕ್ಕೆ ಸೇರಿ
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-[#ED1C24] text-[#ED1C24] bg-transparent hover:bg-[#ED1C24]/5 text-lg font-bold px-10 py-7 rounded-full hover:scale-105 active:scale-95 transition-all duration-200">
                  ನಮ್ಮ ಗುರಿ ತಿಳಿಯಿರಿ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Pledge Journey Section */}
      <section className="py-24 bg-transparent relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#333333] mb-6">
              ನಮ್ಮ <span className="text-[#ED1C24]">ಸಂಕಲ್ಪದ ಪಯಣ</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              ಒಬ್ಬ ವ್ಯಕ್ತಿಯಿಂದ ಆರಂಭವಾಗುವ ಸಣ್ಣ ಹೆಜ್ಜೆ, ಇಡೀ ಕರ್ನಾಟಕದ ಭವಿಷ್ಯವನ್ನೇ ಬದಲಿಸಬಲ್ಲದು.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-6xl mx-auto relative z-10">
            {[
              { title: "ಒಬ್ಬ ವ್ಯಕ್ತಿ", icon: <User className="w-8 h-8" />, desc: "ಸ್ವಯಂ ಸಂಕಲ್ಪ ತೊಡುವುದು" },
              { title: "ಹತ್ತು ಜನರಿಗೆ ಕನ್ನಡ", icon: <Users className="w-8 h-8" />, desc: "ಕನಿಷ್ಠ ೧೦ ಜನರಿಗೆ ಜ್ಞಾನದಾನ" },
              { title: "ಒಂದು ಗ್ರಾಮ", icon: <House className="w-8 h-8" />, desc: "ಗ್ರಾಮದ ಸಹಭಾಗಿತ್ವ" },
              { title: "ಒಂದು ತಾಲೂಕು", icon: <Map className="w-8 h-8" />, desc: "ತಾಲೂಕು ಮಟ್ಟದ ವಿಸ್ತರಣೆ" },
              { title: "ಒಂದು ಜಿಲ್ಲೆ", icon: <Target className="w-8 h-8" />, desc: "ಜಿಲ್ಲೆಯಾದ್ಯಂತ ಯಶಸ್ಸು" },
              { title: "ಸಂಪೂರ್ಣ ಕರ್ನಾಟಕ", icon: <Shield className="w-8 h-8" />, desc: "೨.೫ ಕೋಟಿ ನವಸಾಕ್ಷರರು" },
            ].map((step, index) => (
              <ScrollReveal 
                key={index}
                delay={index * 100}
              >
                <div className="glass flex flex-col items-center p-6 rounded-3xl hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-center border border-white/60 h-full">
                  <div className="w-16 h-16 rounded-full bg-amber-50/50 border border-amber-200/40 flex items-center justify-center text-[#ED1C24] shadow-sm mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose Cards Section */}
      <section className="py-24 bg-transparent border-y border-amber-100/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal className="mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#333333]">
              ಆಂದೋಲನದ <span className="text-[#FFC20E]">ಮುಖ್ಯ ಉದ್ದೇಶಗಳು</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "ಕನ್ನಡ ಉಳಿಸೋಣ", color: "text-[#ED1C24] hover:bg-red-50/30" },
              { title: "ಕನ್ನಡ ಬೆಳೆಸೋಣ", color: "text-[#D18C00] hover:bg-amber-50/30" },
              { title: "ಕನ್ನಡ ಕಲಿಸೋಣ", color: "text-blue-600 hover:bg-blue-50/30" },
              { title: "ಕನ್ನಡದಲ್ಲಿ ಬದುಕೋಣ", color: "text-green-600 hover:bg-green-50/30" },
            ].map((card, idx) => (
              <ScrollReveal 
                key={idx}
                delay={idx * 100}
              >
                <div className={`glass p-8 rounded-3xl font-heading font-extrabold text-lg md:text-xl border border-white/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-center justify-center min-h-[120px] cursor-default ${card.color}`}>
                  {card.title}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#333333] mb-4">
              ಆಂದೋಲನದ <span className="text-[#ED1C24]">ಪ್ರಗತಿ</span>
            </h2>
            <p className="text-gray-500 font-semibold text-sm">
              ಇಡೀ ಕರ್ನಾಟಕವನ್ನು ಕನ್ನಡಮಯಗೊಳಿಸುವ ನಮ್ಮ ಪ್ರಮುಖ ಗುರಿಗಳು
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "ಸೇವಾದಾರರು", target: 5000, suffix: "+", hasComma: true, icon: <Users className="w-7 h-7" /> },
              { label: "ಕಲಿಯುತ್ತಿರುವವರು", target: 50000, suffix: "+", hasComma: true, icon: <BookOpen className="w-7 h-7" /> },
              { label: "ಜಿಲ್ಲೆಗಳು", target: 31, suffix: "", hasComma: false, icon: <Map className="w-7 h-7" /> },
              { label: "ಗ್ರಾಮಗಳು", target: 224, suffix: "+", hasComma: false, icon: <House className="w-7 h-7" /> },
            ].map((stat, idx) => (
              <ScrollReveal 
                key={idx}
                delay={idx * 100}
              >
                <div className="text-center p-8 glass rounded-3xl hover:-translate-y-1 transition-all duration-300 border border-white/60 h-full">
                  <div className="w-14 h-14 mx-auto bg-amber-50/50 rounded-full flex items-center justify-center text-[#ED1C24] shadow-sm mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-heading font-extrabold text-[#333333] mb-2">
                    <Counter target={stat.target} suffix={stat.suffix} hasComma={stat.hasComma} />
                  </div>
                  <div className="text-sm font-bold text-gray-500">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Services Section */}
      <section className="py-24 bg-transparent border-t border-amber-100/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#333333]">
              ಪ್ರಮುಖ <span className="text-[#ED1C24]">ಸೇವೆಗಳು</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "ಸೇವಾದಾರರ ನೋಂದಣಿ", icon: <Users className="w-6 h-6" />, href: "/volunteer", badge: "ಲೈವ್" },
              { title: "೬೦ ದಿನಗಳ ಕಲಿಕಾ ಕಾರ್ಯಕ್ರಮ", icon: <Target className="w-6 h-6" />, href: "/learning", badge: "ಲಭ್ಯವಿದೆ" },
              { title: "ಸಂಕಲ್ಪ ಹಾಗೂ ಪ್ರಮಾಣಪತ್ರ", icon: <FileBadge className="w-6 h-6" />, href: "/pledge", badge: "ಲಭ್ಯವಿದೆ" },
              { title: "ಜಿಲ್ಲಾವಾರು ಮಾಹಿತಿ", icon: <Map className="w-6 h-6" />, href: "/districts", badge: "೩೧ ಜಿಲ್ಲೆಗಳು" },
              { title: "ಕನ್ನಡ ಜ್ಞಾನ ಭಂಡಾರ", icon: <Bookmark className="w-6 h-6" />, href: "/learning", badge: "ಪಠ್ಯಪುಸ್ತಕಗಳು" },
              { title: "ಸಂಯೋಜಕರ ಪೋರ್ಟಲ್", icon: <Shield className="w-6 h-6" />, href: "/volunteer", badge: "ಲಾಗಿನ್" },
            ].map((svc, idx) => (
              <ScrollReveal 
                key={idx}
                delay={idx * 80}
              >
                <Link href={svc.href} className="group block h-full">
                  <div className="glass p-8 rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1 border border-white/60">
                    <div className="absolute top-4 right-4 bg-amber-50 text-[#ED1C24] text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-100">
                      {svc.badge}
                    </div>
                    <div className="w-14 h-14 bg-amber-50/50 rounded-2xl flex items-center justify-center text-[#ED1C24] mb-6 group-hover:bg-[#ED1C24] group-hover:text-white transition-all duration-300">
                      {svc.icon}
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-gray-800 group-hover:text-[#ED1C24] transition-colors mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold mt-auto flex items-center gap-1">
                      <span>ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ತಿಳಿಯಿರಿ</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform animate-pulse" />
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-24 bg-gradient-to-r from-[#ED1C24] to-[#D11820] text-white relative overflow-hidden rounded-3xl my-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-7xl font-serif text-[#FFC20E] opacity-50 block mb-2 leading-none">&ldquo;</span>
          <h2 className="text-2xl md:text-4xl lg:text-4xl font-heading font-medium leading-relaxed max-w-3xl mx-auto animate-float-slow">
            ದೊಡ್ಡವರು ಯಾರೇ ಯಾರಿಗೇ ಆದರೂ ಕನ್ನಡ ಕಲಿಯಲು ಹೇಳಿದರೆ ಅದು ಅವರ ಅಹಂಕಾರಕ್ಕೆ ತಾಗುತ್ತದೆ. ಆದರೆ ಮಕ್ಕಳು ಮುದ್ದಾಗಿ, ಮುಗ್ಧವಾಗಿ <span className="text-[#FFC20E] font-extrabold">&apos;ನಾನು ನಿಮಗೆ ಕಲಿಸಬಹುದೇ?&apos;</span> ಎಂದರೆ ಯಾರೇ ಆದರೂ ನಿರಾಕರಿಸುವುದಿಲ್ಲ.
          </h2>
          <div className="w-16 h-1 bg-[#FFC20E] mx-auto rounded-full mt-10"></div>
        </div>
      </section>
    </>
  );
}
