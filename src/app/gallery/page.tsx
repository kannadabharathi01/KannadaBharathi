"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const galleryImages = [
  {
    src: "/images/karnataka-flag-bright-colorful-2.jpg",
    title: "ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಬಾವುಟ",
    desc: "ಹಳದಿ ಮತ್ತು ಕೆಂಪು ಬಣ್ಣದ ನಾಡಿನ ಸಂಕೇತ.",
  },
  {
    src: "/images/karnataka-map-yellow-red-flag-ha.jpg",
    title: "ಕನ್ನಡ ನಾಡಿನ ಭೂಪಟ",
    desc: "ಕನ್ನಡ ಜಾಗೃತಿಯ ಭೌಗೋಳಿಕ ವ್ಯಾಪ್ತಿ.",
  },
  {
    src: "/images/vidhana-soudha-located-bangalore.jpg",
    title: "ವಿಧಾನಸೌಧ, ಬೆಂಗಳೂರು",
    desc: "ಕನ್ನಡ ಆಡಳಿತದ ಶಕ್ತಿಕೇಂದ್ರ.",
  },
  {
    src: "/images/bangalore-children-participate-in-cultural-235496.jpg",
    title: "ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಮಕ್ಕಳು",
    desc: "ಕನ್ನಡ ಜಾಗೃತಿ ಸಾಂಸ್ಕೃತಿಕ ಉತ್ಸವ.",
  },
  {
    src: "/images/indian-man-playing-folk-musical.jpg",
    title: "ನಾಡಿನ ಜಾನಪದ ಕಲೆ",
    desc: "ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಜಾನಪದ ವಾದ್ಯ ವೈಭವ.",
  },
  {
    src: "/images/1.png",
    title: "ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ ಪ್ರಚಾರ",
    desc: "ಸಂಕಲ್ಪ ತೊಟ್ಟ ಸೇವಾದಾರರ ಸಭೆ.",
  },
  {
    src: "/images/4.jpeg",
    title: "ಅಕ್ಷರಾಭ್ಯಾಸ ತರಗತಿಗಳು",
    desc: "ಮಕ್ಕಳು ಮುದ್ದಾಗಿ ಇತರರಿಗೆ ಅಕ್ಷರ ಕಲಿಸುತ್ತಿರುವ ದೃಶ್ಯ.",
  },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Prevent background scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* Title */}
      <ScrollReveal className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ಚಿತ್ರ ಸಂಪುಟ / <span className="text-[#ED1C24]">ಗ್ಯಾಲರಿ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ, ಚಟುವಟಿಕೆಗಳು ಹಾಗೂ ನಮ್ಮ ಸಂಸ್ಕೃತಿಯನ್ನು ಬಿಂಬಿಸುವ ಅಪೂರ್ವ ಚಿತ್ರಗಳು.
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      {/* Masonry / Responsive Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, idx) => (
          <ScrollReveal 
            key={idx}
            delay={(idx % 6) * 80}
          >
            <div
              onClick={() => setSelectedIndex(idx)}
              className="glass rounded-3xl border border-white/60 shadow-md overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center border-b border-amber-50/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-550"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                
                {/* Hover overlay with eye icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="w-11 h-11 bg-[#ED1C24] rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-left bg-white/30 backdrop-blur-sm">
                <h3 className="font-heading font-extrabold text-base text-gray-800 mb-1 group-hover:text-[#ED1C24] transition-colors leading-tight">
                  {img.title}
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  {img.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 border border-white/10 hover:border-white/20 active:scale-95"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 border border-white/10 hover:border-white/20 active:scale-95"
            aria-label="Next Image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Compact Lightbox Card Container */}
          <div 
            onClick={(e) => e.stopPropagation()} // Stop closing click inside card
            className="max-w-xl w-full glass rounded-3xl overflow-hidden border border-white/40 shadow-2xl animate-in zoom-in-95 duration-200 text-center relative"
          >
            <div className="relative aspect-[16/11] bg-gray-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].title}
                className="object-contain w-full h-full p-2"
              />
            </div>
            <div className="p-6 bg-white/90 border-t border-amber-100/50 text-left">
              <h3 className="font-heading font-extrabold text-lg text-gray-800 mb-2 leading-tight">
                {galleryImages[selectedIndex].title}
              </h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                {galleryImages[selectedIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
