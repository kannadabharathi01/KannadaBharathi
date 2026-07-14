"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      emailOrPhone: "",
      subject: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* Title */}
      <ScrollReveal className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ನಮ್ಮನ್ನು <span className="text-[#ED1C24]">ಸಂಪರ್ಕಿಸಿ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ಆಂದೋಲನಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಯಾವುದೇ ಸಲಹೆಗಳು, ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಸಂಪರ್ಕದಲ್ಲಿರಿ.
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
        {/* Contact Details cards */}
        <div className="space-y-6">
          <ScrollReveal delay={100}>
            <div className="glass p-6 rounded-3xl border border-white/60 shadow-md flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50/50 border border-amber-100/40 flex items-center justify-center text-[#ED1C24] flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase">ದೂರವಾಣಿ ಸಂಖ್ಯೆ</h4>
                <a href="tel:9880501705" className="text-lg font-heading font-extrabold text-gray-800 hover:text-[#ED1C24] transition-colors block">
                  9880501705
                </a>
                <span className="text-xs text-gray-500 font-semibold">ಸಂಪರ್ಕಿಸುವ ಸಮಯ: ಬೆಳಿಗ್ಗೆ ೯ ರಿಂದ ಸಂಜೆ ೬</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass p-6 rounded-3xl border border-white/60 shadow-md flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50/50 border border-amber-100/40 flex items-center justify-center text-[#ED1C24] flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase">ಇಮೇಲ್ ವಿಳಾಸ</h4>
                <a href="mailto:mlprasannawri@gmail.com" className="text-lg font-heading font-extrabold text-gray-800 hover:text-[#ED1C24] transition-colors block">
                  mlprasannawri@gmail.com
                </a>
                <span className="text-xs text-gray-500 font-semibold">೨೪ ಗಂಟೆಗಳ ಒಳಗೆ ಪ್ರತ್ಯುತ್ತರ ನೀಡಲಾಗುವುದು</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="glass p-6 rounded-3xl border border-white/60 shadow-md flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50/50 border border-amber-100/40 flex items-center justify-center text-[#ED1C24] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase">ಕಚೇರಿ ವಿಳಾಸ</h4>
                <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                  ಪೂಜ್ಯಾಯ ಹೈಟ್ಸ್, 103, ಪಿ & ಟಿ ಕಾಲೋನಿ, ಗಂಗಾನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form */}
        <ScrollReveal delay={200}>
          <div className="glass p-8 rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-green-50/50 border border-green-200 text-green-600 rounded-full mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-heading font-extrabold text-green-700">ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ!</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    ನಿಮ್ಮನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸಲಾಗುವುದು.
                  </p>
                </div>
                <div className="pt-4">
                  <Button onClick={handleReset} variant="outline" className="border-amber-200 hover:bg-amber-50/20 text-gray-600 font-bold px-6">
                    ಹೊಸ ಸಂದೇಶ ಬರೆಯಿರಿ
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">ನಿಮ್ಮ ಹೆಸರು</label>
                  <Input
                    type="text"
                    name="name"
                    required
                    placeholder="ಪೂರ್ಣ ಹೆಸರು ಬರೆಯಿರಿ"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">ಇಮೇಲ್ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                  <Input
                    type="text"
                    name="emailOrPhone"
                    required
                    placeholder="ಸಂಪರ್ಕ ಮಾಹಿತಿ ನೀಡಿ"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">ವಿಷಯ</label>
                  <Input
                    type="text"
                    name="subject"
                    required
                    placeholder="ಸಂದೇಶದ ಸಾರಾಂಶ"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">ಸಂದೇಶ</label>
                  <Textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white py-6 rounded-xl font-bold text-sm shadow-lg shadow-[#ED1C24]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                    <Send className="w-4 h-4" />
                    <span>ಸಂದೇಶ ಕಳುಹಿಸಿ</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
