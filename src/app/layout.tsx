import type { Metadata } from "next";
import { Noto_Sans_Kannada, Baloo_Tamma_2 } from "next/font/google";
import "./globals.css";
import Banner from "@/components/layout/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-sans",
  weight: ["400", "500", "700", "800"],
});

const balooTamma = Baloo_Tamma_2({
  subsets: ["kannada"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ಕನ್ನಡ ಭಾರತಿ | ಕನ್ನಡ ಜಾಗೃತಿ ಆಂದೋಲನ",
  description: "ಮಕ್ಕಳ ಮುಗ್ಧತೆಯ ಮೂಲಕ ಮನೆಮನೆಗಳಲ್ಲಿ ಕನ್ನಡದ ಜಾಗೃತಿ ಮೂಡಿಸುವ ಹಾಗೂ ಗಾಂಧಿಗಿರಿಯ ಹಾದಿಯಲ್ಲಿ ಕನ್ನಡ ಕಲಿಸುವ ವಿಶಿಷ್ಟ ಅಭಿಯಾನ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kn"
      className={`${notoKannada.variable} ${balooTamma.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[#333333] relative">
        {/* Background Gradients and Glow Blobs (Bask Tech inspired) */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF9EC]">
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#FFC20E]/15 blur-[120px] animate-drift"></div>
          <div className="absolute -left-40 top-1/4 h-[700px] w-[700px] rounded-full bg-[#ED1C24]/10 blur-[140px] animate-drift" style={{ animationDelay: "-7s" }}></div>
          <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#FFC20E]/10 blur-[100px] animate-drift" style={{ animationDelay: "-14s" }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-grid-overlay overflow-hidden"></div>

        <Banner />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
