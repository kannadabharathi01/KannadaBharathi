"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, UserPlus, Users, Award, Shield, IndianRupee, 
  CheckCircle2, Eye, EyeOff, Mail, Lock, LogOut, 
  MapPin, Calendar, Building, Sparkles, AlertCircle, FileBadge, Loader2,
  LayoutGrid, BookOpen, Settings, Sun, Moon, Menu, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";

const isPasswordStrong = (pass: string) => {
  return pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass);
};

const PasswordRequirements = ({ pass }: { pass: string }) => {
  const reqs = [
    { label: "ಕನಿಷ್ಠ ೮ ಅಕ್ಷರಗಳು (Min 8 characters)", met: pass.length >= 8 },
    { label: "ಕನಿಷ್ಠ ಒಂದು ದೊಡ್ಡ ಅಕ್ಷರ (One Capital letter A-Z)", met: /[A-Z]/.test(pass) },
    { label: "ಕನಿಷ್ಠ ಒಂದು ಸಂಖ್ಯೆ (One Number 0-9)", met: /[0-9]/.test(pass) },
    { label: "ಕನಿಷ್ಠ ಒಂದು ವಿಶೇಷ ಚಿಹ್ನೆ (One Special symbol: @, #, $, etc.)", met: /[^A-Za-z0-9]/.test(pass) },
  ];

  return (
    <div className="mt-2.5 space-y-1.5 animate-in fade-in duration-200">
      {reqs.map((r, i) => (
        <div key={i} className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold transition-colors duration-200">
          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white font-bold ${r.met ? 'bg-green-500' : 'bg-gray-250 text-gray-400'}`}>
            {r.met ? "✓" : "•"}
          </span>
          <span className={r.met ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}>{r.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function VolunteerDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const pathId = resolvedParams.id;
  const router = useRouter();

  const [userSession, setUserSession] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Sidebar & Navigation States
  const [activeView, setActiveView] = useState<"dashboard" | "profile" | "linked" | "syllabus" | "settings">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dark/Light Mode Management
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Authenticate session and check path security
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        if (session.user.id !== pathId) {
          // Security violation: user tried accessing someone else's dashboard
          router.replace("/volunteer");
        } else {
          setUserSession(session);
          fetchUserProfile(session.user.id);
        }
      } else {
        router.replace("/volunteer");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (session.user.id !== pathId) {
          router.replace("/volunteer");
        } else {
          setUserSession(session);
          fetchUserProfile(session.user.id);
        }
      } else {
        router.replace("/volunteer");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathId, router]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .eq("id", userId)
        .single();
      if (!error && data) {
        setProfileData(data);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/volunteer");
  };

  if (!authChecked || !userSession || !profileData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50/40 dark:bg-[#0c0c0c]">
        <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500">ಪ್ರವೇಶ ನಿಯಂತ್ರಣ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/40 dark:bg-[#0c0c0c] dark:text-white transition-colors duration-300 text-left relative flex w-full">
       {/* Sidebar drawer backdrop for mobile */}
       {mobileOpen && (
         <div 
           className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
           onClick={() => setMobileOpen(false)}
         />
       )}

       {/* SIDEBAR */}
       <aside
         className={`fixed top-0 left-0 h-screen z-50 flex flex-col justify-between border-r border-gray-200/50 dark:border-white/10 glass dark:glass-dark shadow-xl transition-all duration-300 ease-in-out
           ${sidebarOpen ? "w-52" : "w-16"}
           ${mobileOpen ? "translate-x-0 w-52" : "-translate-x-full md:translate-x-0"}
         `}
       >
         {/* Logo and role info */}
         <div>
           <div className="flex items-center gap-2.5 p-3.5 border-b border-gray-150/40 dark:border-white/5 h-16 overflow-hidden">
             <div className="w-8.5 h-8.5 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-lg flex-shrink-0 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
               ಕ
             </div>
             {sidebarOpen && (
               <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
                 <span className="font-heading font-extrabold text-sm text-gray-800 dark:text-white leading-none">ಕನ್ನಡ ಭಾರತಿ</span>
                 <span className="text-[8px] text-[#ED1C24] font-bold tracking-wider mt-1 uppercase">
                   {profileData.role === "learner" && "ಕಲಿಯುವವರ ಪೋರ್ಟಲ್"}
                   {profileData.role === "teacher" && "ಕಲಿಸುವ ಮಕ್ಕಳ ಪೋರ್ಟಲ್"}
                   {profileData.role === "mentor" && "ಮಾರ್ಗದರ್ಶಕರ ಪೋರ್ಟಲ್"}
                   {profileData.role === "organizer" && "ಸಂಘಟಕರ ಪೋರ್ಟಲ್"}
                   {profileData.role === "donor" && "ದಾನಿಗಳ ಪೋರ್ಟಲ್"}
                   {profileData.role === "mla" && "ಜನಪ್ರತಿನಿಧಿ ಪೋರ್ಟಲ್"}
                 </span>
               </div>
             )}
           </div>

           {/* Navigation menu */}
           <nav className={`p-2 space-y-1 mt-3 ${!sidebarOpen ? "flex flex-col items-center" : ""}`}>
             {[
               { id: "dashboard", label: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", icon: <LayoutGrid className="w-4 h-4" /> },
               { id: "profile", label: "ನನ್ನ ವಿವರಗಳು", icon: <UserPlus className="w-4 h-4" /> },
               { id: "linked", label: "ಸಂಬಂಧಿತ ಸದಸ್ಯರು", icon: <Users className="w-4 h-4" /> },
               { id: "syllabus", label: "ಕಲಿಕಾ ಪಠ್ಯಕ್ರಮ", icon: <BookOpen className="w-4 h-4" /> },
               { id: "settings", label: "ಖಾತೆ ಸೆಟ್ಟಿಂಗ್ಸ್", icon: <Settings className="w-4 h-4" /> },
             ].map((item) => {
               const isActive = activeView === item.id;
               return (
                 <button
                   key={item.id}
                   onClick={() => {
                     setActiveView(item.id as any);
                     setMobileOpen(false);
                   }}
                   className={`flex items-center gap-2.5 rounded-lg transition-all font-extrabold text-xs relative group
                     ${sidebarOpen ? "w-full p-2.5 justify-start" : "w-10 h-10 justify-center"}
                     ${isActive 
                       ? "bg-[#ED1C24]/10 text-[#ED1C24] dark:bg-[#ED1C24]/20" 
                       : "text-gray-600 hover:bg-gray-150/40 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                     }
                   `}
                 >
                   <div className={`flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${isActive ? "text-[#ED1C24]" : "text-gray-500 dark:text-gray-400"}`}>
                     {item.icon}
                   </div>
                   {sidebarOpen && <span className="truncate">{item.label}</span>}
                 </button>
               );
             })}
           </nav>
         </div>

         {/* Sidebar footer: toggle, dark mode, logout */}
         <div className="p-2 border-t border-gray-150/40 dark:border-white/5 space-y-1.5">
           <button
             onClick={toggleDarkMode}
             className={`flex items-center gap-2.5 rounded-lg transition-all font-extrabold text-xs text-gray-600 hover:bg-gray-150/40 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white
               ${sidebarOpen ? "w-full p-2.5 justify-start" : "w-10 h-10 justify-center"}
             `}
           >
             {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
             {sidebarOpen && <span>{darkMode ? "ಲೈಟ್ ಮೋಡ್" : "ಡಾರ್ಕ್ ಮೋಡ್"}</span>}
           </button>
           <button
             onClick={handleLogout}
             className={`flex items-center gap-2.5 rounded-lg transition-all font-extrabold text-xs text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-955/20
               ${sidebarOpen ? "w-full p-2.5 justify-start" : "w-10 h-10 justify-center"}
             `}
           >
             <LogOut className="w-4 h-4" />
             {sidebarOpen && <span>ಲೋಗೌಟ್</span>}
           </button>
         </div>
       </aside>

       {/* MAIN CONTENT AREA */}
       <div className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? "md:pl-52" : "md:pl-16"}`}>
         {/* Header */}
         <header className="sticky top-0 z-30 h-16 border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-[#0c0c0c]/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button
               onClick={() => setMobileOpen(!mobileOpen)}
               className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 md:hidden transition-colors"
             >
               <Menu className="w-5 h-5" />
             </button>
             <button
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hidden md:block transition-colors"
             >
               {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
             </button>
             <div className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500">
               ಪೋರ್ಟಲ್ / {activeView === "dashboard" ? "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" : activeView === "profile" ? "ನನ್ನ ವಿವರಗಳು" : activeView === "linked" ? "ಸಂಬಂಧಿತ ಸದಸ್ಯರು" : activeView === "syllabus" ? "ಕಲಿಕಾ ಪಠ್ಯಕ್ರಮ" : "ಖಾತೆ ಸೆಟ್ಟಿಂಗ್ಸ್"}
             </div>
           </div>

           <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 bg-amber-50/50 dark:bg-amber-955/20 border border-amber-100/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-[#ED1C24] dark:text-[#FFC20E] shadow-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24] dark:bg-[#FFC20E] animate-ping" />
               <span>ನೋಂದಣಿ ಐಡಿ: {profileData.registration_id}</span>
             </div>
           </div>
         </header>

         {/* Content Workspace */}
         <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6">
           {activeView === "dashboard" && <DashboardView profileData={profileData} />}
           {activeView === "profile" && <ProfileView profileData={profileData} />}
           {activeView === "linked" && <LinkedMembersView profileData={profileData} />}
           {activeView === "syllabus" && <SyllabusView profileData={profileData} />}
           {activeView === "settings" && <AccountSettingsView profileData={profileData} handleLogout={handleLogout} />}
         </main>
       </div>
    </div>
  );
}

// ----------------------------------------------------
// DASHBOARD SUB-VIEWS FOR CANDIDATES (FORMS 1-6)
// ----------------------------------------------------

function DashboardView({ profileData }: { profileData: any }) {
  const roleTitleMap: Record<string, string> = {
    learner: "ಕಲಿಯುವವರು (Form 1)",
    teacher: "ಕಲಿಸುವ ಮಕ್ಕಳು (Form 2)",
    mentor: "ಮಾರ್ಗದರ್ಶಕರು (Form 3)",
    organizer: "ಸಂಘಟಕರು (Form 4)",
    donor: "ದಾನಿಗಳು (Form 5)",
    mla: "ಜನಪ್ರತಿನಿಧಿ / MLA (Form 6)",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Stats counters row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#ED1C24] to-[#D11820] text-white p-5 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/75">ನನ್ನ ಪಾತ್ರ (My Role)</span>
          <h4 className="text-sm sm:text-base font-black tracking-tight">{roleTitleMap[profileData.role] || "ಸದಸ್ಯರು"}</h4>
          <span className="text-[10px] text-amber-300 font-bold block pt-1">ಕನ್ನಡ ಭಾರತಿ ಸಕ್ರಿಯ ಅಭಿಯಾನಿ</span>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-250/20 dark:border-white/10 p-5 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500">ಸಂಪರ್ಕಿತರು (Linked Members)</span>
          <h4 className="text-xl sm:text-2xl font-black text-gray-700 dark:text-white">
            {profileData.linked_id_1 ? "೧ ಸಕ್ರಿಯ" : "೦ ಸಕ್ರಿಯ"}
          </h4>
          <span className="text-[9px] text-gray-400 dark:text-gray-500 font-semibold truncate block">
            ಐಡಿ: {profileData.linked_id_1 || "ಯಾವುದೂ ಇಲ್ಲ"}
          </span>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-250/20 dark:border-white/10 p-5 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500">ಕ್ಷೇತ್ರ ವ್ಯಾಪ್ತಿ (Scope)</span>
          <h4 className="text-lg sm:text-xl font-black text-gray-700 dark:text-white flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#ED1C24]" />
            {profileData.constituency || "ಬೆಂಗಳೂರು"}
          </h4>
          <span className="text-[9px] text-gray-400 dark:text-gray-500 font-semibold block">
            ಪ್ರತಿನಿಧಿ: {profileData.representative || "ಲಭ್ಯವಿಲ್ಲ"}
          </span>
        </div>
      </div>

      {/* Role specific guidelines card */}
      <div className="bg-amber-50/20 dark:bg-amber-955/5 border border-amber-100/50 dark:border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>ನಿಮ್ಮ ಪಾತ್ರದ ಕರ್ತವ್ಯಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶನ (Guidelines for your role)</span>
        </h3>
        
        <ul className="space-y-3 text-xs font-semibold text-gray-600 dark:text-gray-400 list-disc list-inside">
          {profileData.role === "learner" && (
            <>
              <li>ನಿಮ್ಮ ಮಗುವಿನ ಶಿಕ್ಷಕರೊಂದಿಗೆ ದಿನಕ್ಕೆ ಕನಿಷ್ಠ ೨೦ ನಿಮಿಷ ಕಲಿಕೆಯಲ್ಲಿ ತೊಡಗಿರಿ.</li>
              <li>೬೦ ದಿನಗಳಲ್ಲಿ ಕನ್ನಡ ಓದುವುದು ಮತ್ತು ಬರೆಯಲು ಕಲಿಯುವ ಸಂಕಲ್ಪ ಪೂರ್ಣಗೊಳಿಸಿ.</li>
              <li>ಪ್ರತಿ ವಾರ ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಚೆಕ್‌ಲಿಸ್ಟ್ ಮೂಲಕ ಗುರುತು ಮಾಡಿ.</li>
            </>
          )}
          {profileData.role === "teacher" && (
            <>
              <li>ಕನಿಷ್ಠ ೧೦ ಜನ ಭಾಷೆ ಬಾರದವರಿಗೆ ಕನ್ನಡ ಕಲಿಸಲು ಪ್ರೇರೇಪಿಸಿ.</li>
              <li>ಕನ್ನಡ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರ ಸಿದ್ಧಪಡಿಸಿದ ಪಠ್ಯಕ್ರಮವನ್ನು ಬಳಸಿ.</li>
              <li>ಕಲಿಯುತ್ತಿರುವವರ ಪ್ರಗತಿಯನ್ನು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವರದಿ ಮಾಡಿ.</li>
            </>
          )}
          {profileData.role === "mentor" && (
            <>
              <li>ನಿಮ್ಮ ಅಧೀನದಲ್ಲಿರುವ ಕಲಿಸುವ ಮಕ್ಕಳಿಗೆ ಮತ್ತು ಕಲಿಯುವವರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿ.</li>
              <li>ವಾರಕ್ಕೊಮ್ಮೆ ಕಲಿಕಾ ಪ್ರಗತಿ ಪರಿಶೀಲಿಸಿ ವೀಡಿಯೊ ಅಥವಾ ಫೋಟೋ ಸಾಕ್ಷ್ಯಗಳನ್ನು ನೋಡಿ.</li>
              <li>ಕಲಿಕಾ ಅವಧಿ ಮುಗಿದ ನಂತರ ಅಂತಿಮ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ದೃಢೀಕರಣ ಪೂರ್ಣಗೊಳಿಸಿ.</li>
            </>
          )}
          {profileData.role === "organizer" && (
            <>
              <li>ನಿಮ್ಮ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರದಲ್ಲಿ ಕನ್ನಡ ಜಾಗೃತಿ ಸಭೆಗಳನ್ನು ಸಂಘಟಿಸಿ.</li>
              <li>ಶಿಕ್ಷಕರು ಮತ್ತು ಕಲಿಯುವವರ ನಡುವೆ ಸಂಪರ್ಕ ಸೇತುವೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿ.</li>
              <li>ನಿಮ್ಮ ವಲಯದಲ್ಲಿ ಹೆಚ್ಚು ನೋಂದಣಿಗಳನ್ನು ಉತ್ತೇಜಿಸಿ.</li>
            </>
          )}
          {profileData.role === "donor" && (
            <>
              <li>ಕಲಿಕಾ ಪುಸ್ತಕಗಳು ಮತ್ತು ಸಲಕರಣೆಗಳ ಕಿಟ್‌ಗಳನ್ನು ಪ್ರಾಯೋಜಿಸಿ.</li>
              <li>ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ ಮಕ್ಕಳಿಗೆ ೫,೦೦೦ ರೂ ಬಹುಮಾನ ನೀಡಲು ಸಹಾಯ ಮಾಡಿ.</li>
              <li>ಆಂದೋಲನದ ಆರ್ಥಿಕ ನೆರವಿನ ವರದಿಯನ್ನು ಇಲ್ಲಿ ವೀಕ್ಷಿಸಿ.</li>
            </>
          )}
          {profileData.role === "mla" && (
            <>
              <li>ನಿಮ್ಮ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರದ ಎಲ್ಲ ಶಾಲೆಗಳಲ್ಲಿ "ಭಾರತಿ ಟೀಚರ್" ಚಲನಚಿತ್ರ ಪ್ರದರ್ಶನ ಏರ್ಪಡಿಸಿ.</li>
              <li>ನಿಮ್ಮ ಕ್ಷೇತ್ರದ ಮಾರ್ಗದರ್ಶಕರ ನೋಂದಣಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಅನುಮೋದಿಸಿ.</li>
              <li>ಕ್ಷೇತ್ರದ ಒಟ್ಟಾರೆ ಕಲಿಕಾ ಪ್ರಗತಿಯ ಅಂಕಿ-ಅಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function ProfileView({ profileData }: { profileData: any }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-250/20 dark:border-white/10 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6 text-left animate-in fade-in duration-200">
      <div>
        <h3 className="text-sm font-extrabold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">
          ವೈಯಕ್ತಿಕ ವಿವರಗಳು (Profile details)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs sm:text-sm font-semibold">
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಪೂರ್ಣ ಹೆಸರು</span>
          <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.name}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಇಮೇಲ್ ಐಡಿ</span>
          <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.email}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ವಯಸ್ಸು</span>
          <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.age} ವರ್ಷಗಳು</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಲಿಂಗ</span>
          <span className="text-gray-700 dark:text-gray-300 block mt-0.5">
            {profileData.gender === "M" ? "ಪುರುಷ" : profileData.gender === "F" ? "ಮಹಿಳೆ" : "ಇತರ"}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಪೋಷಕರ ಹೆಸರು</span>
          <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.guardian}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ</span>
          <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.constituency || "ಬೆಂಗಳೂರು"}</span>
        </div>

        {profileData.role === "learner" && (
          <>
            <div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಮಾತೃ ಭಾಷೆ</span>
              <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.mother_tongue}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಮೂಲ ಸ್ಥಳ</span>
              <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.native_place}</span>
            </div>
          </>
        )}

        {profileData.role === "mla" && (
          <>
            <div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ರಾಜಕೀಯ ಪಕ್ಷ</span>
              <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.occupation}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಆಯ್ಕೆಯಾದ ವರ್ಷ</span>
              <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.school}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">ಕಚೇರಿ ವಿಳಾಸ</span>
              <span className="text-gray-700 dark:text-gray-300 block mt-0.5">{profileData.native_place}</span>
            </div>
          </>
        )}

        {profileData.role !== "learner" && profileData.role !== "mla" && (
          <>
            <div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block uppercase">
                {profileData.role === "donor" ? "ಸಂಸ್ಥೆ / ಟ್ರಸ್ಟ್" : "ಶಾಲೆ / ಸಂಸ್ಥೆ / ವೃತ್ತಿ"}
              </span>
              <span className="text-gray-700 dark:text-gray-300 block mt-0.5">
                {profileData.school || profileData.occupation || "ಲಭ್ಯವಿಲ್ಲ"}
              </span>
            </div>
          </>
        )}
      </div>

      {profileData.details && (
        <div className="bg-gray-50/50 dark:bg-white/5 rounded-xl border border-gray-150/40 dark:border-white/5 p-4 space-y-2">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold block uppercase">ವೈಯಕ್ತಿಕ ವಿವರಣೆ</span>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold leading-relaxed">
            {profileData.details}
          </p>
        </div>
      )}
    </div>
  );
}

function LinkedMembersView({ profileData }: { profileData: any }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-250/20 dark:border-white/10 rounded-2xl shadow-sm p-5 sm:p-6 space-y-5 text-left animate-in fade-in duration-200">
      <div>
        <h3 className="text-sm font-extrabold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">
          ಸಂಬಂಧಿತ ಸದಸ್ಯರು (Linked Members)
        </h3>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
          ನಿಮ್ಮ ಖಾತೆಗೆ ಲಿಂಕ್ ಮಾಡಲಾದ ಸಕ್ರಿಯ ಅಭಿಯಾನಿಗಳು ಮತ್ತು ಅವರ ಸ್ಥಿತಿ.
        </p>
      </div>

      {profileData.linked_id_1 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-150/40 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 dark:bg-[#ED1C24]/20 flex items-center justify-center text-[#ED1C24]">
                <FileBadge className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block font-bold uppercase">ಸಂಪರ್ಕಿತ ಗುರುತಿನ ಸಂಖ್ಯೆ</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#ED1C24]">{profileData.linked_id_1}</span>
              </div>
            </div>
            <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold">
              ಸಕ್ರಿಯ (Active)
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 space-y-3">
          <span className="text-3xl block">🔗</span>
          <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-bold block">ಯಾವುದೇ ಸದಸ್ಯರು ಲಿಂಕ್ ಆಗಿಲ್ಲ.</span>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 max-w-xs mx-auto">
            ಖಾತೆಯ ಸೆಟ್ಟಿಂಗ್ಸ್ ಪುಟದಲ್ಲಿ ಹೋಗಿ ಅಥವಾ ಅಡ್ಮಿನ್ ಸಹಾಯ ಪಡೆದು ಸಂಬಂಧಿತ ಶಿಕ್ಷಕರು, ಕಲಿಯುವವರು ಅಥವಾ ಮಾರ್ಗದರ್ಶಕರ ಐಡಿ ಸಂಖ್ಯೆಯನ್ನು ಲಿಂಕ್ ಮಾಡಿ.
          </p>
        </div>
      )}
    </div>
  );
}

function SyllabusView({ profileData }: { profileData: any }) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`kb_syllabus_${profileData.id}`);
      if (saved) {
        try {
          setChecklist(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [profileData.id]);

  const handleToggle = (day: number) => {
    const nextChecklist = { ...checklist, [day]: !checklist[day] };
    setChecklist(nextChecklist);
    localStorage.setItem(`kb_syllabus_${profileData.id}`, JSON.stringify(nextChecklist));
  };

  const totalDays = 60;
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  const syllabusDays = [
    { range: "ದಿನ ೧-೧೫ (ವಾರ ೧-೨)", title: "ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯ ಪರಿಚಯ", desc: "ಸ್ವರಗಳು, ವ್ಯಂಜನಗಳು, ಮತ್ತು ಸರಳ ಅಕ್ಷರ ಜೋಡಣೆ ಕಲಿಯುವುದು." },
    { range: "ದಿನ ೧೬-೩೦ (ವಾರ ೩-೪)", title: "ಗುಣಿತಾಕ್ಷರಗಳು ಮತ್ತು ಸರಳ ಪದಗಳು", desc: "ಸ್ವರ ಚಿಹ್ನೆಗಳು, ಕಾಗುಣಿತ ರಚನೆ, ಮತ್ತು ದಿನಬಳಕೆಯ ಸರಳ ಶಬ್ದಗಳು." },
    { range: "ದಿನ ೩೧-೪೫ (ವಾರ ೫-೬)", title: "ಒತ್ತಾಕ್ಷರಗಳು ಮತ್ತು ವಾಕ್ಯ ರಚನೆ", desc: "ಸಜಾತೀಯ-ವಿಜಾತೀಯ ಸಂಯುಕ್ತಾಕ್ಷರಗಳು, ಮತ್ತು ಸರಳ ವಾಕ್ಯಗಳನ್ನು ಓದುವುದು." },
    { range: "ದಿನ ೪೬-೬೦ (ವಾರ ೭-೮)", title: "ದೈನಂದಿನ ಸಂಭಾಷಣೆ ಮತ್ತು ಬರವಣಿಗೆ", desc: "ಸಣ್ಣ ಕಥೆಗಳು, ಸಾಮಾನ್ಯ ಸಂವಹನ, ಮತ್ತು ಸ್ವತಂತ್ರ ಲೇಖನ ಅಭ್ಯಾಸ." },
  ];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-250/20 dark:border-white/10 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 dark:border-white/5 pb-3 gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-widest">
            ೬೦ ದಿನಗಳ ಕಲಿಕಾ ಪಠ್ಯಕ್ರಮ (60 Days Course Progress)
          </h3>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold block mt-0.5">
            ದಿನನಿತ್ಯದ ಕಲಿಕಾ ಪ್ರಗತಿಯನ್ನು ಇಲ್ಲಿ ಮಾರ್ಕ್ ಮಾಡುವ ಮೂಲಕ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.
          </span>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2">
          <div className="w-24 bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-[10px] sm:text-xs font-extrabold text-green-500">{progressPercent}% ಪ್ರಗತಿ</span>
        </div>
      </div>

      <div className="space-y-6">
        {syllabusDays.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-xs font-black text-gray-700 dark:text-gray-300 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-gray-100 dark:border-white/5">
              <span>{section.title}</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400">{section.range}</span>
            </h4>
            <p className="text-[11px] text-gray-550 dark:text-gray-400 font-semibold px-3">
              {section.desc}
            </p>

            {/* Checkbox grid for days */}
            <div className="grid grid-cols-5 sm:grid-cols-15 gap-2 px-3 pt-1">
              {Array.from({ length: 15 }, (_, i) => {
                const dayNum = idx * 15 + i + 1;
                const isChecked = !!checklist[dayNum];
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => handleToggle(dayNum)}
                    className={`h-8 rounded-lg text-[10px] sm:text-xs font-black transition-all flex items-center justify-center select-none ${
                      isChecked
                        ? "bg-green-500 text-white shadow-sm"
                        : "bg-gray-100/50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSettingsView({ profileData, handleLogout }: { profileData: any; handleLogout: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (password !== confirmPassword) {
      setError("ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ.");
      setLoading(false);
      return;
    }

    if (!isPasswordStrong(password)) {
      setError("ಪಾಸ್‌ವರ್ಡ್ ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಬೇಕು.");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      
      setSuccess("ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲ್ಪಟ್ಟಿದೆ! ಲೋಗೌಟ್ ಮಾಡಲಾಗುತ್ತಿದೆ...");
      setTimeout(() => {
        handleLogout();
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "ನವೀಕರಣ ವಿಫಲವಾಗಿದೆ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-250/20 dark:border-white/10 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6 text-left animate-in fade-in duration-200">
      <div>
        <h3 className="text-sm font-extrabold text-[#ED1C24] dark:text-[#FFC20E] uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-2">
          ಪಾಸ್‌ವರ್ಡ್ ಬದಲಿಸಿ (Change Password)
        </h3>
      </div>

      {success && (
        <div className="p-3 bg-green-50 dark:bg-green-955/25 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold rounded-xl text-center">
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-955/25 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 text-xs font-bold rounded-xl text-center">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">ಹೊಸ ಪಾಸ್‌ವರ್ಡ್</label>
          <Input
            type="password"
            required
            className="text-xs dark:bg-[#1c1c1c] dark:border-white/10 dark:text-white font-semibold h-9"
            placeholder="ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಬರೆಯಿರಿ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordRequirements pass={password} />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ</label>
          <Input
            type="password"
            required
            className="text-xs dark:bg-[#1c1c1c] dark:border-white/10 dark:text-white font-semibold h-9"
            placeholder="ಮತ್ತೊಮ್ಮೆ ಬರೆಯಿರಿ"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#ED1C24] hover:bg-[#D11820] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "ಅಪ್‌ಡೇಟ್ ಮಾಡಿ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
