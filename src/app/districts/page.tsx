"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, MapPin, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollReveal from "@/components/shared/ScrollReveal";

const districtsData = [
  { name: "ಬೆಂಗಳೂರು ನಗರ", coordinator: "ಕೆ. ಎಂ. ಪ್ರಸನ್ನ ಕುಮಾರ್", volunteers: 1240, learners: 15400 },
  { name: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", coordinator: "ಮಂಜುನಾಥ್ ಜಿ.", volunteers: 340, learners: 2800 },
  { name: "ರಾಮನಗರ", coordinator: "ರವಿಶಂಕರ್ ಸಿ.", volunteers: 280, learners: 2100 },
  { name: "ಕೋಲಾರ", coordinator: "ನಾರಾಯಣಸ್ವಾಮಿ ಎಂ.", volunteers: 410, learners: 3600 },
  { name: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", coordinator: "ಗಂಗಾಧರ್ ಆರ್.", volunteers: 195, learners: 1450 },
  { name: "ತುಮಕೂರು", coordinator: "ಶಿವಣ್ಣ ಎಸ್. ಪಿ.", volunteers: 520, learners: 4900 },
  { name: "ಚಿತ್ರದುರ್ಗ", coordinator: "ತಿಮ್ಮೇಶ್ ಎಂ.", volunteers: 310, learners: 2900 },
  { name: "ದಾವಣಗೆರೆ", coordinator: "ಸಿದ್ಧಪ್ಪ ಹಾಲಪ್ಪ", volunteers: 290, learners: 2450 },
  { name: "ಶಿವಮೊಗ್ಗ", coordinator: "ವಿಶ್ವನಾಥ್ ಶೆಟ್ಟಿ", volunteers: 380, learners: 3400 },
  { name: "ಮೈಸೂರು", coordinator: "ರಾಜೇಂದ್ರ ಪ್ರಸಾದ್", volunteers: 620, learners: 5900 },
  { name: "ಮಂಡ್ಯ", coordinator: "ಚನ್ನೇಗೌಡ ಹೆಚ್.", volunteers: 480, learners: 4200 },
  { name: "ಹಾಸನ", coordinator: "ದೇವೇಗೌಡ ವೈ.", volunteers: 390, learners: 3100 },
  { name: "ಚಾಮರಾಜನಗರ", coordinator: "ಮಹದೇವ ಪ್ರಭು", volunteers: 210, learners: 1800 },
  { name: "ಚಿಕ್ಕಮಗಳೂರು", coordinator: "ಉಮೇಶ್ ಪೂಜಾರಿ", volunteers: 220, learners: 1950 },
  { name: "ದಕ್ಷಿಣ ಕನ್ನಡ", coordinator: "ವಾಸುದೇವ್ ಭಟ್", volunteers: 510, learners: 4800 },
  { name: "ಉಡುಪಿ", coordinator: "ವೆಂಕಟೇಶ್ ಕಲ್ಯಾಣಪುರ", volunteers: 340, learners: 2900 },
  { name: "ಕೊಡಗು", coordinator: "ಅಪ್ಪಣ್ಣ ಕೆ.", volunteers: 180, learners: 1300 },
  { name: "ಬೆಳಗಾವಿ", coordinator: "ಬಸವರಾಜ್ ಪಾಟೀಲ್", volunteers: 780, learners: 7100 },
  { name: "ಧಾರವಾಡ", coordinator: "ಸುರೇಶ್ ಕುಲಕರ್ಣಿ", volunteers: 450, learners: 4100 },
  { name: "ಗದಗ", coordinator: "ಹುಚ್ಚಪ್ಪ ಹಿರೇಮಠ", volunteers: 230, learners: 1900 },
  { name: "ಹಾವೇರಿ", coordinator: "ಶಿವಕುಮಾರ್ ಬಿ.", volunteers: 310, learners: 2800 },
  { name: "ಬಾಗಲಕೋಟೆ", coordinator: "ಸಂಗಪ್ಪ ಮೇಲ್ಕೋಟೆ", volunteers: 390, learners: 3200 },
  { name: "ವಿಜಯಪುರ", coordinator: "ಮಲ್ಲಪ್ಪ ಬಿರಾದಾರ್", volunteers: 420, learners: 3900 },
  { name: "ಉತ್ತರ ಕನ್ನಡ", coordinator: "ಗಣಪತಿ ಹೆಗಡೆ", volunteers: 310, learners: 2700 },
  { name: "ಕಲಬುರಗಿ", coordinator: "ಶರಣಬಸಪ್ಪ ಪಾಟೀಲ್", volunteers: 560, learners: 5100 },
  { name: "ಯಾದಗಿರಿ", coordinator: "ಲಿಂಗಪ್ಪ ನಾಯಕ", volunteers: 190, learners: 1500 },
  { name: "ಬೀದರ್", coordinator: "ಸಂಜಯ್ ವೈ.", volunteers: 240, learners: 2200 },
  { name: "ರಾಯಚೂರು", coordinator: "ತಿಮ್ಮಪ್ಪ ರೆಡ್ಡಿ", volunteers: 320, learners: 2900 },
  { name: "ಕೊಪ್ಪಳ", coordinator: "ಹನುಮಂತಪ್ಪ ಕೆ.", volunteers: 210, learners: 1900 },
  { name: "ಬಳ್ಳಾರಿ", coordinator: "ಗೋವಿಂದರಾಜುಲು ಟಿ.", volunteers: 340, learners: 3100 },
  { name: "ವಿಜಯನಗರ", coordinator: "ಶ್ರೀಕಾಂತ್ ವರ್ಮಾ", volunteers: 280, learners: 2400 },
];

export default function DistrictsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDistricts = districtsData.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          ಜಿಲ್ಲಾವಾರು <span className="text-[#ED1C24]">ಮಾಹಿತಿ ಮತ್ತು ಪ್ರಗತಿ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ಕರ್ನಾಟಕದ ೩೧ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿರುವ ಸೇವಾದಾರರು ಹಾಗೂ ಕಲಿಯುವವರ ಅಂಕಿ-ಅಂಶಗಳ ವಿವರ.
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      {/* Search bar */}
      <ScrollReveal className="max-w-md mx-auto mb-12">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="ಜಿಲ್ಲೆಯ ಹೆಸರನ್ನು ಹುಡುಕಿ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 rounded-full h-13"
          />
        </div>
      </ScrollReveal>

      {/* Grid Layout */}
      {filteredDistricts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.map((district, idx) => (
            <ScrollReveal 
              key={idx}
              delay={(idx % 6) * 80}
            >
              <div className="glass p-6 rounded-3xl border border-white/60 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-amber-50/50 border border-amber-100/40 flex items-center justify-center text-[#ED1C24]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-heading font-extrabold text-gray-800">
                      {district.name}
                    </h3>
                  </div>

                  <div className="space-y-2 border-t border-amber-100/50 pt-4 text-xs font-semibold text-gray-500">
                    <div className="flex justify-between">
                      <span>ಸಂಯೋಜಕರು:</span>
                      <span className="text-gray-800 font-bold">{district.coordinator}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#ED1C24]" />
                        Volunteers:
                      </span>
                      <span className="text-gray-800 font-bold text-sm">{district.volunteers.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#ED1C24]" />
                        Learners:
                      </span>
                      <span className="text-gray-800 font-bold text-sm">{district.learners.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-100/40">
                  <Link href="/volunteer">
                    <Button variant="outline" className="w-full border-amber-100 hover:bg-[#ED1C24] hover:text-white text-xs font-bold py-2 rounded-xl active:scale-[0.98] transition-transform">
                      ಈ ಜಿಲ್ಲೆಯಿಂದ ನೋಂದಾಯಿಸಿ
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 font-semibold">
          ಹುಡುಕಿದ ಹೆಸರಿನ ಯಾವುದೇ ಜಿಲ್ಲೆ ಕಂಡುಬಂದಿಲ್ಲ.
        </div>
      )}
    </div>
  );
}
