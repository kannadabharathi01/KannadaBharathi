"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, UserPlus, Users, Award, Shield, IndianRupee, 
  CheckCircle2, Eye, EyeOff, Mail, Lock, LogOut, 
  MapPin, Calendar, Building, Sparkles, AlertCircle, FileBadge, Loader2,
  LayoutGrid, BookOpen, Settings, Sun, Moon, Menu, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type RoleType = "learner" | "teacher" | "mentor" | "organizer" | "donor";
type ViewMode = "login" | "register" | "forgot" | "reset";

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
    <div className="mt-2.5 space-y-1 text-[10px] sm:text-xs font-semibold">
      {reqs.map((r, i) => (
        <div key={i} className="flex items-center gap-1.5 transition-colors duration-200">
          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white ${r.met ? "bg-green-500 font-bold" : "bg-gray-300"}`}>
            {r.met ? "✓" : "•"}
          </span>
          <span className={r.met ? "text-green-600" : "text-gray-400"}>{r.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function VolunteerPage() {
  const router = useRouter();
  const isLoggingInRef = useRef(false);
  const [viewMode, setViewMode] = useState<ViewMode>("login");
  const [userSession, setUserSession] = useState<any>(null);
  
  // Tab control for registration
  const [activeTab, setActiveTab] = useState<RoleType>("learner");
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");

  // Reset password states
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Registration password toggles
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Shared state for forms
  const [formData, setFormData] = useState({
    constituency: "",
    representative: "",
    name: "",
    age: "",
    gender: "M",
    guardian: "",
    motherTongue: "ಕನ್ನಡ",
    nativePlace: "",
    occupation: "",
    school: "",
    details: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedId1: "",
    linkedId2: "",
    linkedId3: "",
  });

  // Check auth session and redirect to dynamic dashboard on mount
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        if (roleData?.role === "admin") {
          await supabase.auth.signOut();
        } else {
          router.replace(`/volunteer/${session.user.id}`);
        }
      }
    });

    // Check query params for password reset trigger
    const query = new URLSearchParams(window.location.search);
    if (query.get("reset") === "true" || window.location.hash.includes("type=recovery")) {
      setViewMode("reset");
    }
  }, [router]);

  // Monitor auth changes and redirect
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (isLoggingInRef.current) return;
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        if (roleData?.role === "admin") {
          await supabase.auth.signOut();
          setError("ಈ ಇಮೇಲ್ ನೋಂದಾಯಿಸಲಾಗಿಲ್ಲ (This email is not registered).");
        } else {
          router.replace(`/volunteer/${session.user.id}`);
        }
      } else {
        setUserSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);



  // 5 seconds redirect countdown handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (submittedId && viewMode === "register") {
      setCountdown(5);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setViewMode("login");
            resetForm();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [submittedId, viewMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      constituency: "",
      representative: "",
      name: "",
      age: "",
      gender: "M",
      guardian: "",
      motherTongue: "ಕನ್ನಡ",
      nativePlace: "",
      occupation: "",
      school: "",
      details: "",
      email: "",
      password: "",
      confirmPassword: "",
      linkedId1: "",
      linkedId2: "",
      linkedId3: "",
    });
    setSubmittedId(null);
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(false);
    setIsEmailOtpSent(false);
    setIsEmailVerified(false);
    setEmailVerificationLoading(false);
    setOtpDigits(["", "", "", ""]);
    setOtpError(null);
    setShowReverifyButton(false);
    setOtpVerifying(false);
    setTempPayload(null);
    setTempRegId(null);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);
    isLoggingInRef.current = true;
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (loginError) throw loginError;

      // Fetch role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (roleData?.role === "admin") {
        await supabase.auth.signOut();
        throw new Error("ಈ ಇಮೇಲ್ ನೋಂದಾಯಿಸಲಾಗಿಲ್ಲ (This email is not registered).");
      } else {
        setSuccessMsg("ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ! ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...");
        setTimeout(() => {
          router.replace(`/volunteer/${data.user.id}`);
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಪರಿಶೀಲಿಸಿ.");
    } finally {
      setIsSubmitting(false);
      isLoggingInRef.current = false;
    }
  };

  // Forgot Password handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/volunteer?reset=true`,
      });
      if (resetError) throw resetError;
      setSuccessMsg("ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ!");
    } catch (err: any) {
      setError(err.message || "ಇಮೇಲ್ ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Password (new password submission) handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    if (!isPasswordStrong(newPassword)) {
      setError("ಪಾಸ್‌ವರ್ಡ್ ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಬೇಕು (Password must meet all requirements).");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;
      setSuccessMsg("ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ! ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.");
      setTimeout(() => {
        setViewMode("login");
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "ಪಾಸ್‌ವರ್ಡ್ ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dashboard & Sidebar States
  const [activeView, setActiveView] = useState<"dashboard" | "profile" | "linked" | "syllabus" | "settings">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dark/Light Mode Management for Candidate Dashboard
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

  // Registration & OTP States
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [showReverifyButton, setShowReverifyButton] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [tempPayload, setTempPayload] = useState<Record<string, any> | null>(null);
  const [tempRegId, setTempRegId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  // 1-minute countdown timer
  useEffect(() => {
    if (!isEmailOtpSent || isEmailVerified) return;

    setTimeLeft(60);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOtpError("OTP ಕಾಲಾವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಹೊಸ OTP ಪಡೆದುಕೊಳ್ಳಿ. (OTP Expired)");
          setShowReverifyButton(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEmailOtpSent, isEmailVerified]);

  const handleSendEmailOtp = async () => {
    if (!formData.email) return;
    setEmailVerificationLoading(true);
    setError(null);
    setSuccessMsg(null);
    setOtpError(null);
    setShowReverifyButton(false);
    setOtpDigits(["", "", "", "", "", ""]);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.");

      setIsEmailOtpSent(true);
      setSuccessMsg("OTP ಪರಿಶೀಲನಾ ಸಂಕೇತವನ್ನು ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ!");
    } catch (err: any) {
      console.error("Send OTP Error:", err);
      setError(err.message || "OTP ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.");
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  const triggerVerifyOtp = async (otpCode: string) => {
    if (timeLeft === 0) {
      setOtpError("OTP ಕಾಲಾವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಹೊಸ OTP ಪಡೆದುಕೊಳ್ಳಿ. (OTP Expired)");
      return;
    }
    setOtpVerifying(true);
    setOtpError(null);
    setShowReverifyButton(false);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: otpCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ.");

      setIsEmailVerified(true);
      setSuccessMsg("ಇಮೇಲ್ ಯಶಸ್ವಿಯಾಗಿ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ!");
      setOtpError(null);
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setOtpError(err.message || "ತಪ್ಪಾದ OTP");
      setTimeout(() => {
        setShowReverifyButton(true);
      }, 2000);
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleOtpDigitChange = async (index: number, val: string) => {
    if (timeLeft === 0) {
      setOtpError("OTP ಕಾಲಾವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಹೊಸ OTP ಪಡೆದುಕೊಳ್ಳಿ. (OTP Expired)");
      return;
    }
    setOtpError(null);
    if (val.length > 1) {
      const cleaned = val.replace(/\D/g, "").slice(0, 6);
      if (cleaned.length === 6) {
        const newDigits = cleaned.split("");
        setOtpDigits(newDigits);
        await triggerVerifyOtp(cleaned);
        return;
      }
    }

    const cleanVal = val.replace(/\D/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }

    const fullOtp = newDigits.join("");
    if (fullOtp.length === 6) {
      await triggerVerifyOtp(fullOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Registration handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    if (!isEmailVerified) {
      setError("ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಇಮೇಲ್ ಐಡಿಯನ್ನು ಪರಿಶೀಲಿಸಿ (Please verify your email first).");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ.");
      setIsSubmitting(false);
      return;
    }

    if (!isPasswordStrong(formData.password)) {
      setError("ಪಾಸ್‌ವರ್ಡ್ ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಬೇಕು (Password must meet all requirements).");
      setIsSubmitting(false);
      return;
    }

    // Generate Custom display ID
    const prefixMap: Record<RoleType, string> = {
      learner: "LRN",
      teacher: "TCH",
      mentor: "MNT",
      organizer: "ORG",
      donor: "DNR",
    };
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `KB-2026-${prefixMap[activeTab]}-${randNum}`;

    // 1. Prepare options data for signUp metadata
    const signUpOptionsData: Record<string, any> = {
      role: activeTab,
      name: formData.name,
      age: parseInt(formData.age) || 0,
      gender: formData.gender,
      guardian: formData.guardian,
      constituency: formData.constituency,
      representative: formData.representative,
      registration_id: generatedId,
      details: formData.details || "",
    };

    if (activeTab === "learner") {
      signUpOptionsData.mother_tongue = formData.motherTongue;
      signUpOptionsData.native_place = formData.nativePlace;
      signUpOptionsData.occupation = formData.occupation || null;
    } else if (activeTab === "teacher") {
      signUpOptionsData.school = formData.school;
      signUpOptionsData.linked_id_1 = formData.linkedId1;
    } else if (activeTab === "mentor") {
      signUpOptionsData.occupation = formData.occupation;
      signUpOptionsData.linked_id_1 = formData.linkedId1;
    } else if (activeTab === "organizer") {
      signUpOptionsData.occupation = formData.occupation;
      signUpOptionsData.linked_id_1 = formData.linkedId1;
    } else if (activeTab === "donor") {
      signUpOptionsData.school = formData.school;
      signUpOptionsData.linked_id_1 = formData.linkedId1;
    }

    setTempPayload(signUpOptionsData);
    setTempRegId(generatedId);

    try {
      // Call secure registration API route
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          registrationId: generatedId,
          payload: signUpOptionsData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ನೋಂದಣಿ ವೈಫಲ್ಯ.");

      setSubmittedId(generatedId);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("ನೋಂದಣಿ ವೈಫಲ್ಯ: " + (err.message || "ದಯವಿಟ್ಟು ಸಂಪರ್ಕ ಸಾಧನಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserSession(null);
    setViewMode("login");
    resetForm();
  };



  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-4xl py-6 sm:py-12 flex flex-col items-center justify-center min-h-[85vh]">
      {/* Back button */}
      <Link href="/" className="self-start inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-6 sm:mb-8 transition-colors">
        <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no">
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* RENDER FORMS IF NOT LOGGED IN */}
      <ScrollReveal className="w-full">
          <div key={viewMode} className="w-full glass rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden transition-all duration-300">
            {/* Header branding */}
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[#333333] mb-2 sm:mb-3">
                {viewMode === "login" && <span>ಕನ್ನಡ ಭಾರತಿ ಲಾಗಿನ್</span>}
                {viewMode === "register" && <span>ಸೇವಾದಾರರ ನೋಂದಣಿ ಫಾರ್ಮ್</span>}
                {viewMode === "forgot" && <span>ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ</span>}
                {viewMode === "reset" && <span>ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಿ</span>}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold max-w-lg mx-auto leading-relaxed px-2">
                {viewMode === "login" && "ನಿಮ್ಮ ಇಮೇಲ್ ಐಡಿ ಹಾಗೂ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸಿ ಲಾಗಿನ್ ಮಾಡಿ"}
                {viewMode === "register" && "ಆಂದೋಲನದಲ್ಲಿ ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ, ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ವಿಶಿಷ್ಟ ಗುರುತಿನ ಸಂಖ್ಯೆ (ID) ಪಡೆಯಿರಿ."}
                {viewMode === "forgot" && "ನಿಮ್ಮ ರಿಜಿಸ್ಟರ್ಡ್ ಇಮೇಲ್ ಐಡಿ ನಮೂದಿಸಿ, ಪಾಸ್‌ವರ್ಡ್ ರಿಸೆಟ್ ಲಿಂಕ್ ಪಡೆಯಿರಿ"}
                {viewMode === "reset" && "ನಿಮ್ಮ ಖಾತೆಗಾಗಿ ಹೊಸ ಲಾಗಿನ್ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ರಚಿಸಿ"}
              </p>
              <div className="w-14 h-1 bg-[#FFC20E] mx-auto rounded-full mt-3 sm:mt-4"></div>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="p-3 sm:p-4 mb-6 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 sm:p-4 mb-6 bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* VIEW MODE: RESET PASSWORD */}
            {viewMode === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6 max-w-md mx-auto py-2 sm:py-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಹೊಸ ಪಾಸ್‌ವರ್ಡ್</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  required
                  placeholder="ಕನಿಷ್ಠ ೮ ಅಕ್ಷರಗಳು"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordRequirements pass={newPassword} />
            </div>

                <div className="text-center pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white py-5 sm:py-6 rounded-full font-bold text-sm sm:text-base shadow-md shadow-[#ED1C24]/10 transition-transform active:scale-95 duration-200"
                  >
                    {isSubmitting ? "ಅಪ್‌ಡೇಟ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "ಪಾಸ್‌ವರ್ಡ್ ಉಳಿಸಿ"}
                  </Button>
                </div>
              </form>
            )}

            {/* VIEW MODE: FORGOT PASSWORD */}
            {viewMode === "forgot" && (
              <form onSubmit={handleForgotPassword} className="space-y-4 sm:space-y-6 max-w-md mx-auto py-2 sm:py-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಇಮೇಲ್ ಐಡಿ</label>
                  <div className="relative">
                    <Input
                      type="email"
                      required
                      placeholder="ನಿಮ್ಮ ನೋಂದಾಯಿತ ಇಮೇಲ್ ಬರೆಯಿರಿ"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="pl-10"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white py-5 sm:py-6 rounded-full font-bold text-sm sm:text-base shadow-md shadow-[#ED1C24]/10 transition-transform active:scale-95 duration-200"
                  >
                    {isSubmitting ? "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ..." : "ರಿಸೆಟ್ ಲಿಂಕ್ ಕಳುಹಿಸಿ"}
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-amber-50">
                  <button 
                    type="button"
                    onClick={() => {
                      setViewMode("login");
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-[#ED1C24] transition-colors"
                  >
                    ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಮರಳಿ
                  </button>
                </div>
              </form>
            )}

            {/* VIEW MODE: LOGIN SCREEN */}
            {viewMode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6 max-w-md mx-auto py-2 sm:py-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಇಮೇಲ್ ಐಡಿ</label>
                  <div className="relative">
                    <Input
                      type="email"
                      required
                      placeholder="ಉದಾ: user@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase">ಪಾಸ್‌ವರ್ಡ್</label>
                    <button 
                      type="button" 
                      onClick={() => setViewMode("forgot")}
                      className="text-[10px] sm:text-[11px] font-bold text-gray-400 hover:text-[#ED1C24] transition-colors"
                    >
                      ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      placeholder="ನಿಮ್ಮ ಲಾಗಿನ್ ಪಾಸ್‌ವರ್ಡ್"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#ED1C24] hover:bg-[#D11820] text-white py-5 sm:py-6 rounded-full font-bold text-sm sm:text-base shadow-md shadow-[#ED1C24]/10 transition-transform active:scale-95 duration-200"
                  >
                    {isSubmitting ? "ಲಾಗಿನ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "ಲಾಗಿನ್ ಮಾಡಿ"}
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-amber-50/50">
                  <p className="text-xs font-bold text-gray-400">
                    ಖಾತೆಯನ್ನು ಹೊಂದಿಲ್ಲವೇ?{" "}
                    <button 
                      type="button"
                      onClick={() => {
                        setViewMode("register");
                        setError(null);
                        setSuccessMsg(null);
                      }}
                      className="text-[#ED1C24] hover:underline"
                    >
                      ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* VIEW MODE: REGISTRATION VIEW */}
            {viewMode === "register" && (
              <>
                {submittedId ? (
                  /* Success Screen with Countdown */
                  <div className="text-center py-6 sm:py-10 space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50/50 border border-green-200 text-green-600 rounded-full mx-auto flex items-center justify-center shadow-inner">
                      <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no">
                        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                      </span>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-green-700">ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!</h3>
                      <p className="text-xs sm:text-sm font-semibold text-gray-500">
                        ನಿಮ್ಮ ವಿವರಗಳನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಲಾಗಿದೆ.
                      </p>
                    </div>

                    <div className="bg-amber-50/30 p-5 sm:p-6 rounded-2xl border border-amber-100 max-w-md mx-auto space-y-3 sm:space-y-4 text-left">
                      <div className="flex justify-between border-b border-amber-200/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">ಗುರುತಿನ ಸಂಖ್ಯೆ (ID)</span>
                        <span className="text-sm sm:text-base font-extrabold text-[#ED1C24]">{submittedId}</span>
                      </div>
                      <div className="flex justify-between border-b border-amber-200/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">ಹೆಸರು</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-700">{formData.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-amber-200/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">ಪಾತ್ರ</span>
                        <span className="text-xs sm:text-sm font-bold text-[#D18C00]">
                          {activeTab === "learner" && <span>ಕಲಿಯುವವರು (Form 1)</span>}
                          {activeTab === "teacher" && <span>ಕಲಿಸುವ ಮಗು (Form 2)</span>}
                          {activeTab === "mentor" && <span>ಮಾರ್ಗದರ್ಶಕರು (Form 3)</span>}
                          {activeTab === "organizer" && <span>ಸಂಘಟಕರು (Form 4)</span>}
                          {activeTab === "donor" && <span>ದಾನಿಗಳು (Form 5)</span>}
                        </span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase">ಕ್ಷೇತ್ರ</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-700">{formData.constituency || "ಬೆಂಗಳೂರು"}</span>
                      </div>
                    </div>

                    {/* Countdown Notification */}
                    <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] sm:text-xs font-bold rounded-xl max-w-sm mx-auto flex items-center justify-center gap-2">
                      <span className="animate-spin text-xs sm:text-sm">⌛</span>
                      <span>ನಿಮ್ಮನ್ನು {countdown} ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಕರೆದೊಯ್ಯಲಾಗುವುದು...</span>
                    </div>

                    <div className="pt-4 sm:pt-6">
                      <Button onClick={resetForm} className="bg-[#ED1C24] hover:bg-[#D11820] text-white rounded-full font-bold px-6 py-4 sm:px-8 sm:py-5 text-xs sm:text-sm">
                        ಮತ್ತೊಂದು ಹೊಸ ನೋಂದಣಿ
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Tabs and Forms */
                  <div>
                    {/* Tabs navigation */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 max-w-3xl mx-auto glass p-1.5 rounded-2xl border border-white/60 shadow-md w-full">
                      {[
                        { id: "learner", label: "ಕಲಿಯುವವರು", icon: <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> },
                        { id: "teacher", label: "ಕಲಿಸುವ ಮಕ್ಕಳು", icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" /> },
                        { id: "mentor", label: "ಮಾರ್ಗದರ್ಶಕರು", icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" /> },
                        { id: "organizer", label: "ಸಂಘಟಕರು", icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> },
                        { id: "donor", label: "ದಾನಿಗಳು", icon: <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" /> },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(tab.id as RoleType);
                            setError(null);
                          }}
                          className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:py-2 sm:px-4 md:px-5 rounded-xl text-[9px] sm:text-xs md:text-sm font-extrabold transition-all whitespace-nowrap ${
                            activeTab === tab.id
                              ? "bg-[#ED1C24] text-white shadow-md active:scale-95"
                              : "text-gray-600 hover:bg-gray-100/60 hover:text-[#ED1C24]"
                          }`}
                        >
                          <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no">
                            {tab.icon}
                          </span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Actual Registration Form */}
                    <form key={activeTab} onSubmit={handleRegisterSubmit} className="space-y-4 sm:space-y-6">
                      <div className="border-b border-amber-100/50 pb-3 sm:pb-4 mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg md:text-xl font-heading font-extrabold text-gray-800">
                          {activeTab === "learner" && <span>ಕಲಿಯುವವರ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 1)</span>}
                          {activeTab === "teacher" && <span>ಕಲಿಸುವ ಮಗುವಿನ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 2)</span>}
                          {activeTab === "mentor" && <span>ಮಾರ್ಗದರ್ಶಕರ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 3)</span>}
                          {activeTab === "organizer" && <span>ಸಂಘಟಕರ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 4)</span>}
                          {activeTab === "donor" && <span>ದಾನಿಗಳ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 5)</span>}
                        </h3>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest block mt-0.5 sm:mt-1">
                          * ಎಲ್ಲಾ ಫಾರ್ಮ್ ಕ್ಷೇತ್ರಗಳು ಕಡ್ಡಾಯವಾಗಿವೆ
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Constituency */}
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಕ್ಷೇತ್ರದ ಹೆಸರು</label>
                          <Input
                            type="text"
                            name="constituency"
                            required
                            placeholder="ಉದಾ: ರಾಜಾಜಿನಗರ"
                            value={formData.constituency}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Representative */}
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಜನಪ್ರತಿನಿಧಿಗಳ ಹೆಸರು</label>
                          <Input
                            type="text"
                            name="representative"
                            required
                            placeholder="ಉದಾ: ಮಹೇಶ್ ಗೌಡ"
                            value={formData.representative}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Name */}
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">
                            {activeTab === "teacher" ? <span>ಮಗುವಿನ ಪೂರ್ಣ ಹೆಸರು</span> : <span>ಪೂರ್ಣ ಹೆಸರು</span>}
                          </label>
                          <Input
                            type="text"
                            name="name"
                            required
                            placeholder="ನಿಮ್ಮ ಹೆಸರು ಬರೆಯಿರಿ"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Age */}
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ವಯಸ್ಸು</label>
                          <Input
                            type="number"
                            name="age"
                            required
                            placeholder="ನಿಮ್ಮ ವಯಸ್ಸು"
                            value={formData.age}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಲಿಂಗ</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="flex h-10 sm:h-12 w-full rounded-xl border border-amber-100/80 bg-white/60 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24]/30 disabled:cursor-not-allowed disabled:opacity-50 font-semibold transition-all shadow-sm text-gray-600"
                          >
                            <option value="M">ಪುರುಷ (M)</option>
                            <option value="F">ಮಹಿಳೆ (F)</option>
                            <option value="OTH">ಇತರ (OTH)</option>
                          </select>
                        </div>

                        {/* Parent/Guardian */}
                        <div>
                          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ತಾಯಿ / ತಂದೆ / ಪೋಷಕರ ಹೆಸರು</label>
                          <Input
                            type="text"
                            name="guardian"
                            required
                            placeholder="ಪೋಷಕರ ಹೆಸರು ಬರೆಯಿರಿ"
                            value={formData.guardian}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Role Specific Fields */}
                        {activeTab === "learner" && (
                          <>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಮಾತೃ ಭಾಷೆ</label>
                              <Input
                                type="text"
                                name="motherTongue"
                                required
                                value={formData.motherTongue}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಮೂಲ ಸ್ಥಳ</label>
                              <Input
                                type="text"
                                name="nativePlace"
                                required
                                placeholder="ನಿಮ್ಮ ಊರಿನ ಹೆಸರು"
                                value={formData.nativePlace}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ವೃತ್ತಿ / ಓದುತ್ತಿರುವುದು</label>
                              <Input
                                type="text"
                                name="occupation"
                                placeholder="ಉದಾ: ಸಾಫ್ಟ್‌ವೇರ್ ಇಂಜಿನಿಯರ್"
                                value={formData.occupation}
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "teacher" && (
                          <>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಓದುತ್ತಿರುವ ತರಗತಿ / ಶಾಲೆ</label>
                              <Input
                                type="text"
                                name="school"
                                required
                                placeholder="ಉದಾ: ೭ನೇ ತರಗತಿ, ಗಾಂಧಿ ಶಾಲೆ"
                                value={formData.school}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಲಿಂಕ್ ಮಾಡಬೇಕಾದ ಕಲಿಯುವವರ ID (ಕನಿಷ್ಠ ೧)</label>
                              <Input
                                type="text"
                                name="linkedId1"
                                required
                                placeholder="ಉದಾ: KB-2026-LRN-1082"
                                value={formData.linkedId1}
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "mentor" && (
                          <>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ವೃತ್ತಿ (ಶಿಕ್ಷಕರು/ಸಾಹಿತಿಗಳು/ನಿವೃತ್ತರು)</label>
                              <Input
                                type="text"
                                name="occupation"
                                required
                                placeholder="ಉದಾ: ನಿವೃತ್ತ ಪ್ರಿನ್ಸಿಪಾಲ್"
                                value={formData.occupation}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಲಿಂಕ್ ಮಾಡಬೇಕಾದ ಮಕ್ಕಳ ID (ಕನಿಷ್ಠ ೧)</label>
                              <Input
                                type="text"
                                name="linkedId1"
                                required
                                placeholder="ಉದಾ: KB-2026-TCH-4521"
                                value={formData.linkedId1}
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "organizer" && (
                          <>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ವೃತ್ತಿ / ಸಂಸ್ಥೆ</label>
                              <Input
                                type="text"
                                name="occupation"
                                required
                                placeholder="ಉದಾ: ಕನ್ನಡ ಸೇನಾ ಸಂಘಟನೆ"
                                value={formData.occupation}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಲಿಂಕ್ ಮಾಡಬೇಕಾದ ಮಾರ್ಗದರ್ಶಕರ ID</label>
                              <Input
                                type="text"
                                name="linkedId1"
                                required
                                placeholder="ಉದಾ: KB-2026-MNT-7231"
                                value={formData.linkedId1}
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "donor" && (
                          <>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಸಂಸ್ಥೆ / ಟ್ರಸ್ಟ್ ಹೆಸರು</label>
                              <Input
                                type="text"
                                name="school"
                                required
                                placeholder="ಉದಾ: ಕಾವೇರಿ ಚಾರಿಟೇಬಲ್ ಟ್ರಸ್ಟ್"
                                value={formData.school}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಧನಸಹಾಯ ಪಡೆಯುತ್ತಿರುವ ಮಕ್ಕಳ ID</label>
                              <Input
                                type="text"
                                name="linkedId1"
                                required
                                placeholder="ಉದಾ: KB-2026-TCH-1892"
                                value={formData.linkedId1}
                                onChange={handleInputChange}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Account Credentials Section */}
                      <div className="border-t border-amber-100/50 pt-6 mt-6">
                        <h4 className="text-sm font-bold text-gray-800 uppercase mb-4 flex items-center gap-1.5">
                          <Lock className="w-4 h-4 text-red-500" />
                          <span>ಖಾತೆಯ ವಿವರಗಳು (Account Credentials)</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                          <div>
                            <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಇಮೇಲ್ ಐಡಿ</label>
                            <div className="relative">
                              <Input
                                type="email"
                                name="email"
                                required
                                placeholder="ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isEmailVerified}
                                className={isEmailVerified ? "pr-8 border-green-500 bg-green-50/10" : ""}
                              />
                              {isEmailVerified && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold text-xs">✓</span>
                              )}
                            </div>
                            
                            {/* Verification Button & OTP Input Box Section */}
                            {!isEmailVerified && formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                              <div className="mt-2.5">
                                {!isEmailOtpSent ? (
                                  <button
                                    type="button"
                                    onClick={handleSendEmailOtp}
                                    disabled={emailVerificationLoading}
                                    className="w-full bg-[#ED1C24]/10 hover:bg-[#ED1C24]/20 text-[#ED1C24] dark:bg-[#ED1C24]/20 dark:hover:bg-[#ED1C24]/30 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
                                  >
                                    {emailVerificationLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    <span>ಇಮೇಲ್ ದೃಢೀಕರಿಸಿ (Verify Email)</span>
                                  </button>
                                ) : (
                                  <div className="space-y-2 p-3 bg-gray-50/50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                    <span className="block text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">ನಮೂದಿಸಿ OTP (Enter OTP)</span>
                                    <div className="flex items-center gap-1.5">
                                      {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                          key={index}
                                          id={`otp-input-${index}`}
                                          type="text"
                                          maxLength={1}
                                          value={otpDigits[index] || ""}
                                          onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                          disabled={otpVerifying || timeLeft === 0}
                                          className="w-8 h-8 text-center text-sm font-extrabold bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ED1C24] dark:text-white disabled:opacity-50"
                                        />
                                      ))}
                                      {otpVerifying && <Loader2 className="w-4 h-4 animate-spin text-[#ED1C24] ml-1" />}
                                    </div>
                                    <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 mt-1">
                                      <span>ಕಾಲಮಿತಿ (Time left): {timeLeft > 0 ? `0:${timeLeft < 10 ? '0' + timeLeft : timeLeft}` : "0:00"}</span>
                                      {timeLeft === 0 && <span className="text-red-500 font-extrabold">OTP ಅವಧಿ ಮುಗಿದಿದೆ (Expired)</span>}
                                    </div>
                                    {otpError && (
                                      <div className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1.5 animate-in fade-in duration-150">
                                        <span className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">✗</span>
                                        <span>{otpError}</span>
                                      </div>
                                    )}
                                    {(showReverifyButton || timeLeft === 0) && (
                                      <button
                                        type="button"
                                        onClick={handleSendEmailOtp}
                                        disabled={emailVerificationLoading}
                                        className="text-[10px] font-extrabold text-[#ED1C24] hover:underline transition-colors mt-1.5 block"
                                      >
                                        ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ (Re-verify / Resend)
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {isEmailVerified && (
                              <div className="mt-2 text-[10px] sm:text-xs font-semibold text-green-600 flex items-center gap-1.5 animate-in fade-in duration-200">
                                <span className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center text-[9px] text-white font-bold">✓</span>
                                <span>ಇಮೇಲ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ (Email Verified)</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಪಾಸ್‌ವರ್ಡ್</label>
                            <div className="relative">
                              <Input
                                type={showRegPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="ಕನಿಷ್ಠ ೮ ಅಕ್ಷರಗಳು"
                                value={formData.password}
                                onChange={handleInputChange}
                              />
                              <button
                                type="button"
                                onClick={() => setShowRegPassword(!showRegPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            <PasswordRequirements pass={formData.password} />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ</label>
                            <div className="relative">
                              <Input
                                type={showRegConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                placeholder="ಮತ್ತೊಮ್ಮೆ ಟೈಪ್ ಮಾಡಿ"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                              />
                              <button
                                type="button"
                                onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {showRegConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            {formData.confirmPassword && (
                              <div className="mt-2.5 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200">
                                {formData.password === formData.confirmPassword ? (
                                  <>
                                    <span className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center text-[9px] text-white font-bold">
                                      ✓
                                    </span>
                                    <span className="text-green-600">ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಾಣಿಕೆಯಾಗಿದೆ (Passwords match)</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">
                                      ✗
                                    </span>
                                    <span className="text-red-500">ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ (Passwords do not match)</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* About me description details */}
                      <div>
                        <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase mb-1.5 sm:mb-2">ವೈಯಕ್ತಿಕ ವಿವರ / ಹಿನ್ನೆಲೆ</label>
                        <Textarea
                          name="details"
                          rows={4}
                          placeholder="ನಿಮ್ಮ ಬಗ್ಗೆ ಅಥವಾ ಆಂದೋಲನದ ಉದ್ದೇಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಬರೆಯಿರಿ"
                          value={formData.details}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="text-center pt-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full sm:w-auto min-w-[160px] bg-[#ED1C24] hover:bg-[#D11820] text-white py-4 sm:py-5 px-6 sm:px-12 rounded-full font-bold text-xs sm:text-sm md:text-base shadow-lg shadow-[#ED1C24]/10 transition-transform active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ..." : "ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ"}
                        </Button>
                      </div>
                    </form>

                    <div className="text-center pt-6 border-t border-amber-50/50 mt-8">
                      <p className="text-xs font-bold text-gray-400">
                        ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?{" "}
                        <button 
                          type="button"
                          onClick={() => {
                            setViewMode("login");
                            setError(null);
                            setSuccessMsg(null);
                          }}
                          className="text-[#ED1C24] hover:underline"
                        >
                          ಲಾಗಿನ್ ಮಾಡಿ
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    );
  }