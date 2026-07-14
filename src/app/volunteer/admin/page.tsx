"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, LogOut, Loader2, Users, UserCheck, 
  Award, Heart, Menu, X, ChevronLeft, ChevronRight, 
  Sun, Moon, LayoutGrid 
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

type ActiveView = "learner" | "teacher" | "mentor" | "organizer" | "donor";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compact Sidebar States (w-52 when open, w-16 when collapsed)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Registrations state
  const [activeView, setActiveView] = useState<ActiveView>("learner");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    learner: 0,
    teacher: 0,
    mentor: 0,
    organizer: 0,
    donor: 0,
  });

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

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAdminRole(session.user.id);
      } else {
        setAuthChecked(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
        setAuthChecked(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error || !data || data.role !== "admin") {
        setIsAdmin(false);
        setError("ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ: ನಿಮ್ಮ ಖಾತೆಗೆ ಅಡ್ಮಿನ್ ಹಕ್ಕುಗಳಿಲ್ಲ.");
        await supabase.auth.signOut();
      } else {
        setIsAdmin(true);
        setError(null);
        fetchStats();
      }
    } catch (err) {
      setIsAdmin(false);
      setError("ಪರಿಶೀಲಿಸುವಲ್ಲಿ ತೊಂದರೆಯಾಗಿದೆ.");
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error("ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ: ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.");
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setRegistrations([]);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const tables: Record<ActiveView, string> = {
        learner: "learners_registration",
        teacher: "teachers_registration",
        mentor: "mentors_registration",
        organizer: "organizers_registration",
        donor: "donors_registration",
      };

      const newStats = { ...stats };
      for (const [key, table] of Object.entries(tables)) {
        const { count, error } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });
        
        if (!error && count !== null) {
          newStats[key as ActiveView] = count;
        }
      }
      setStats(newStats);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Realtime Database Changes Sync
  useEffect(() => {
    if (!isAdmin) return;

    fetchRegistrations();

    // Subscribe to INSERT events to reflect newly registered users in Realtime
    const channels = [
      supabase.channel("realtime-learners").on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "learners_registration" },
        () => { fetchStats(); if (activeView === "learner") fetchRegistrations(); }
      ),
      supabase.channel("realtime-teachers").on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "teachers_registration" },
        () => { fetchStats(); if (activeView === "teacher") fetchRegistrations(); }
      ),
      supabase.channel("realtime-mentors").on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mentors_registration" },
        () => { fetchStats(); if (activeView === "mentor") fetchRegistrations(); }
      ),
      supabase.channel("realtime-organizers").on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "organizers_registration" },
        () => { fetchStats(); if (activeView === "organizer") fetchRegistrations(); }
      ),
      supabase.channel("realtime-donors").on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "donors_registration" },
        () => { fetchStats(); if (activeView === "donor") fetchRegistrations(); }
      )
    ];

    channels.forEach(channel => channel.subscribe());

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [activeView, isAdmin]);

  const fetchRegistrations = async () => {
    setDataLoading(true);
    try {
      const tableMap: Record<ActiveView, string> = {
        learner: "learners_registration",
        teacher: "teachers_registration",
        mentor: "mentors_registration",
        organizer: "organizers_registration",
        donor: "donors_registration",
      };

      const { data, error } = await supabase
        .from(tableMap[activeView])
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err: any) {
      console.error("Error fetching data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-[#121212]">
        <Loader2 className="w-8 h-8 animate-spin text-[#ED1C24]" />
      </div>
    );
  }

  // Sidebar list configurations - wrapped in notranslate spans for Google Translate protection
  const menuItems = [
    { id: "learner", label: "ಕಲಿಯುವವರು", icon: <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no"><Users className="w-4 h-4" /></span> },
    { id: "teacher", label: "ಕಲಿಸುವ ಮಕ್ಕಳು", icon: <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no"><UserCheck className="w-4 h-4" /></span> },
    { id: "mentor", label: "ಮಾರ್ಗದರ್ಶಕರು", icon: <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no"><Award className="w-4 h-4" /></span> },
    { id: "organizer", label: "ಸಂಘಟಕರು", icon: <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no"><Shield className="w-4 h-4" /></span> },
    { id: "donor", label: "ದಾನಿಗಳು", icon: <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no"><Heart className="w-4 h-4" /></span> },
  ];

  // Admin user details helpers
  const adminEmail = session?.user?.email || "admin@namaah.io";
  const adminInitial = adminEmail.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50/40 dark:bg-[#121212] transition-colors duration-300">
      {!isAdmin ? (
        /* ADMIN LOGIN CARD */
        <div className="container mx-auto px-4 max-w-md py-24 text-left">
          <ScrollReveal className="glass dark:glass-dark rounded-3xl border border-white/60 dark:border-white/10 shadow-xl p-8 relative overflow-hidden">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/40 text-[#ED1C24] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-heading font-extrabold text-[#333333] dark:text-white">ನಿರ್ವಾಹಕ ಲಾಗಿನ್ (Admin)</h2>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-1">ಕನ್ನಡ ಭಾರತಿ ಆಂದೋಲನ</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 text-xs font-bold rounded-xl mb-4 text-center">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">ಇಮೇಲ್ ಐಡಿ</label>
                <Input
                  type="email"
                  required
                  className="text-xs dark:bg-[#1c1c1c] dark:border-white/10 dark:text-white"
                  placeholder="admin@kannadabharathi.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">ಪಾಸ್‌ವರ್ಡ್</label>
                <Input
                  type="password"
                  required
                  className="text-xs dark:bg-[#1c1c1c] dark:border-white/10 dark:text-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ಪ್ರವೇಶಿಸಲಾಗುತ್ತಿದೆ...
                    </span>
                  ) : (
                    "ಅಡ್ಮಿನ್ ಪ್ರವೇಶ"
                  )}
                </Button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      ) : (
        /* PREMIUM COMPACT COLLAPSIBLE SIDEBAR LAYOUT */
        <div className="flex text-left relative min-h-screen">
          {/* Backdrop overlay for mobile drawer */}
          {mobileOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* COMPACT SIDEBAR CONTAINER */}
          <aside
            className={`fixed top-0 left-0 h-screen z-50 flex flex-col justify-between border-r border-gray-200/50 dark:border-white/10 glass dark:glass-dark shadow-xl transition-all duration-300 ease-in-out
              ${sidebarOpen ? "w-52" : "w-16"}
              ${mobileOpen ? "translate-x-0 w-52" : "-translate-x-full md:translate-x-0"}
            `}
          >
            {/* Header & Logo */}
            <div>
              <div className="flex items-center gap-2.5 p-3.5 border-b border-gray-150/40 dark:border-white/5 h-16 overflow-hidden">
                <div className="w-8.5 h-8.5 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-lg flex-shrink-0 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                  ಕ
                </div>
                {sidebarOpen && (
                  <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
                    <span className="font-heading font-extrabold text-sm text-gray-800 dark:text-white leading-none">ಕನ್ನಡ ಭಾರತಿ</span>
                    <span className="text-[8px] text-[#ED1C24] font-bold tracking-wider mt-1 uppercase">ಆಂದೋಲನ ನಿರ್ವಾಹಕ</span>
                  </div>
                )}
              </div>

              {/* Navigation Items (Reference style: soft gray/red background with no float button) */}
              <nav className={`p-2 space-y-1 mt-3 ${!sidebarOpen ? "flex flex-col items-center" : ""}`}>
                {menuItems.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id as ActiveView);
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
                      
                      {/* Label - visible when sidebar is open */}
                      {sidebarOpen ? (
                        <span className="animate-in fade-in duration-300 whitespace-nowrap">{item.label}</span>
                      ) : (
                        /* Tooltip when sidebar is collapsed */
                        <span className="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-bold shadow-lg z-50">
                          {item.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & User Profile Section */}
            <div className="border-t border-gray-150/40 dark:border-white/5 bg-gray-50/25 dark:bg-black/5">
              {/* Profile Card (Namaah Nexus style, hidden when collapsed) */}
              {sidebarOpen && (
                <div className="p-3 flex items-center gap-2 animate-in fade-in duration-300">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-white/10 text-[#ED1C24] dark:text-white rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs border border-gray-200/40 dark:border-white/5 shadow-inner">
                    {adminInitial}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold text-gray-800 dark:text-white flex items-center leading-none">
                      ನಿರ್ವಾಹಕರು
                      <span className="bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 text-[8px] px-1.5 py-0.5 rounded-md font-extrabold ml-1.5 border border-purple-200/30">
                        Admin
                      </span>
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-semibold truncate mt-1">{adminEmail}</span>
                  </div>
                </div>
              )}

              {/* Bottom control buttons (Horizontal bar when open, vertical icons when closed) */}
              <div className={`p-2 border-t border-gray-150/40 dark:border-white/5 flex items-center justify-between
                ${sidebarOpen ? "flex-row p-3" : "flex-col gap-2.5 py-3 w-full items-center"}
              `}>
                {/* Theme Selector */}
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center text-gray-500 dark:text-gray-400 hover:text-[#ED1C24] dark:hover:text-white transition-all font-extrabold text-xs group relative
                    ${sidebarOpen ? "gap-1.5" : "justify-center w-10 h-10 rounded-lg bg-gray-100/50 dark:bg-white/5"}
                  `}
                >
                  <div className="flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
                    {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-600" />}
                  </div>
                  {sidebarOpen ? (
                    <span className="animate-in fade-in duration-300 text-[10px]">
                      {darkMode ? "ಲೈಟ್" : "ಡಾರ್ಕ್"}
                    </span>
                  ) : (
                    <span className="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-bold shadow-lg z-50">
                      {darkMode ? "ಲೈಟ್" : "ಡಾರ್ಕ್"}
                    </span>
                  )}
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all font-extrabold text-xs group relative
                    ${sidebarOpen ? "gap-1.5" : "justify-center w-10 h-10 rounded-lg bg-red-50/50 dark:bg-red-950/10"}
                  `}
                >
                  <div className="flex items-center justify-center transition-transform group-hover:translate-x-0.5 duration-200">
                    <LogOut className="w-4 h-4" />
                  </div>
                  {sidebarOpen ? (
                    <span className="animate-in fade-in duration-300 text-[10px]">ಲಾಗ್ ಔಟ್</span>
                  ) : (
                    <span className="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-bold shadow-lg z-50">
                      ಲಾಗ್ ಔಟ್
                    </span>
                  )}
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main 
            className={`flex-1 min-h-screen transition-all duration-300 p-5 md:p-6 
              ${sidebarOpen ? "md:ml-52" : "md:ml-16"}
              ml-0 w-full pt-20 md:pt-6
            `}
          >
            {/* Top Bar for Mobile Screens */}
            <div className="fixed top-0 left-0 right-0 h-14 border-b border-gray-150/40 dark:border-white/10 glass dark:glass-dark shadow-sm z-30 flex items-center justify-between px-4 md:hidden">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-[#ED1C24] transition-colors rounded-lg bg-gray-150/40 dark:bg-white/5"
                >
                  <Menu className="w-4 h-4" />
                </button>
                <span className="font-heading font-extrabold text-xs text-gray-800 dark:text-white">ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</span>
              </div>
              <div className="w-7 h-7 bg-gradient-to-br from-[#ED1C24] to-[#FFC20E] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                ಕ
              </div>
            </div>

            {/* Desktop Top Header Bar with Sidebar Collapse Trigger */}
            <div className="flex items-center justify-between mb-6 pb-3.5 border-b border-gray-150/40 dark:border-white/5">
              <div className="flex items-center">
                {/* Collapse button on desktop */}
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hidden md:flex p-1.5 text-gray-500 hover:text-[#ED1C24] dark:text-gray-400 dark:hover:text-white transition-colors rounded-lg bg-gray-100/50 dark:bg-white/5 mr-3.5 active:scale-95 shadow-sm border border-gray-250/20"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <div>
                  <h1 className="text-lg md:text-xl font-heading font-extrabold text-gray-800 dark:text-white leading-none">
                    {menuItems.find(i => i.id === activeView)?.label} ವಿವರಗಳು
                  </h1>
                  <p className="text-[10px] text-gray-450 dark:text-gray-500 font-semibold tracking-wider uppercase mt-1.5">
                    KB-2026 Admin Dashboard Panel &bull; Realtime updates active
                  </p>
                </div>
              </div>

              {/* Status indicator badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/20 dark:border-emerald-900/30 text-emerald-750 dark:text-emerald-450 text-[10px] font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Live
              </div>
            </div>

            {/* Realtime Statistics cards (Small Text Sizes) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-6">
              {[
                { label: "ಕಲಿಯುವವರು", count: stats.learner, icon: <Users className="w-3.5 h-3.5 text-blue-600" />, bg: "bg-blue-50/50 border-blue-150/40 dark:bg-blue-950/10 dark:border-blue-900/40 text-blue-700 dark:text-blue-400" },
                { label: "ಕಲಿಸುವ ಮಕ್ಕಳು", count: stats.teacher, icon: <UserCheck className="w-3.5 h-3.5 text-emerald-600" />, bg: "bg-emerald-50/50 border-emerald-150/40 dark:bg-emerald-950/10 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400" },
                { label: "ಮಾರ್ಗದರ್ಶಕರು", count: stats.mentor, icon: <Award className="w-3.5 h-3.5 text-purple-600" />, bg: "bg-purple-50/50 border-purple-150/40 dark:bg-purple-950/10 dark:border-purple-900/40 text-purple-700 dark:text-purple-400" },
                { label: "ಸಂಘಟಕರು", count: stats.organizer, icon: <Shield className="w-3.5 h-3.5 text-rose-600" />, bg: "bg-rose-50/50 border-rose-150/40 dark:bg-rose-950/10 dark:border-rose-900/40 text-rose-700 dark:text-rose-400" },
                { label: "ದಾನಿಗಳು", count: stats.donor, icon: <Heart className="w-3.5 h-3.5 text-amber-600" />, bg: "bg-amber-50/50 border-amber-150/40 dark:bg-amber-950/10 dark:border-amber-900/40 text-amber-700 dark:text-amber-400" },
              ].map((stat, idx) => (
                <div key={idx} className={`glass dark:glass-dark p-4 rounded-xl border ${stat.bg} shadow-sm flex flex-col justify-between transition-all hover:scale-[1.02] duration-200`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <span className="text-lg font-extrabold tracking-tight leading-none">{stat.count}</span>
                </div>
              ))}
            </div>

            {/* Table Details container */}
            <div className="glass dark:glass-dark rounded-2xl border border-white/60 dark:border-white/10 shadow-lg overflow-hidden">
              <div className="p-5">
                {dataLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-2.5">
                    <Loader2 className="w-7 h-7 animate-spin text-[#ED1C24]" />
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">ವಿವರಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...</span>
                  </div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">ಯಾವುದೇ ನೋಂದಣಿ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto scrollbar-none">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-gray-100/50 dark:border-white/5 text-gray-400 dark:text-gray-500 uppercase font-bold text-[9px] tracking-wider bg-gray-50/20">
                          <th className="py-3 px-3">ಗುರುತಿನ ಸಂಖ್ಯೆ (ID)</th>
                          <th className="py-3 px-3">ಹೆಸರು</th>
                          <th className="py-3 px-3">ವಯಸ್ಸು</th>
                          <th className="py-3 px-3">ಕ್ಷೇತ್ರ</th>
                          <th className="py-3 px-3">ಪ್ರತಿನಿಧಿ</th>
                          {activeView === "learner" && (
                            <>
                              <th className="py-3 px-3">ಮಾತೃ ಭಾಷೆ</th>
                              <th className="py-3 px-3">ಮೂಲ ಸ್ಥಳ</th>
                            </>
                          )}
                          {activeView === "teacher" && (
                            <>
                              <th className="py-3 px-3">ಶಾಲೆ</th>
                              <th className="py-3 px-3">ಲಿಂಕ್ಡ್ LRN ID</th>
                            </>
                          )}
                          {activeView === "mentor" && (
                            <>
                              <th className="py-3 px-3">ವೃತ್ತಿ</th>
                              <th className="py-3 px-3">ಲಿಂಕ್ಡ್ TCH ID</th>
                            </>
                          )}
                          {activeView === "organizer" && (
                            <>
                              <th className="py-3 px-3">ವೃತ್ತಿ</th>
                              <th className="py-3 px-3">ಲಿಂಕ್ಡ್ MNT ID</th>
                            </>
                          )}
                          {activeView === "donor" && (
                            <>
                              <th className="py-3 px-3">ಸಂಸ್ಥೆ/ಟ್ರಸ್ಟ್</th>
                              <th className="py-3 px-3">ಲಿಂಕ್ಡ್ TCH ID</th>
                            </>
                          )}
                          <th className="py-3 px-3">ದಾಖಲಾದ ದಿನಾಂಕ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100/50 dark:divide-white/5 font-medium text-gray-700 dark:text-gray-300">
                        {registrations.map((row) => (
                          <tr key={row.id} className="hover:bg-amber-50/5 dark:hover:bg-white/5 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-[#ED1C24]">{row.id}</td>
                            <td className="py-2.5 px-3 font-semibold text-gray-800 dark:text-white">{row.name}</td>
                            <td className="py-2.5 px-3">{row.age}</td>
                            <td className="py-2.5 px-3">{row.constituency}</td>
                            <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400">{row.representative}</td>
                            {activeView === "learner" && (
                              <>
                                <td className="py-2.5 px-3">{row.mother_tongue}</td>
                                <td className="py-2.5 px-3">{row.native_place}</td>
                              </>
                            )}
                            {activeView === "teacher" && (
                              <>
                                <td className="py-2.5 px-3">{row.school}</td>
                                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{row.linked_id_1}</td>
                              </>
                            )}
                            {activeView === "mentor" && (
                              <>
                                <td className="py-2.5 px-3">{row.occupation}</td>
                                <td className="py-2.5 px-3 text-purple-600 dark:text-purple-400 font-bold">{row.linked_id_1}</td>
                              </>
                            )}
                            {activeView === "organizer" && (
                              <>
                                <td className="py-2.5 px-3">{row.occupation}</td>
                                <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">{row.linked_id_1}</td>
                              </>
                            )}
                            {activeView === "donor" && (
                              <>
                                <td className="py-2.5 px-3">{row.school}</td>
                                <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400 font-bold">{row.linked_id_1}</td>
                              </>
                            )}
                            <td className="py-2.5 px-3 text-gray-400 dark:text-gray-500 text-[10px]">
                              {new Date(row.created_at).toLocaleDateString("kn-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
