"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Users, Award, Shield, IndianRupee, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { supabase } from "@/lib/supabaseClient";

type RoleType = "learner" | "teacher" | "mentor" | "organizer" | "donor";

export default function VolunteerPage() {
  const [activeTab, setActiveTab] = useState<RoleType>("learner");
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    // Linked IDs
    linkedId1: "",
    linkedId2: "",
    linkedId3: "",
  });

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
      linkedId1: "",
      linkedId2: "",
      linkedId3: "",
    });
    setSubmittedId(null);
    setError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const prefixMap: Record<RoleType, string> = {
      learner: "LRN",
      teacher: "TCH",
      mentor: "MNT",
      organizer: "ORG",
      donor: "DNR",
    };
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `KB-2026-${prefixMap[activeTab]}-${randNum}`;

    try {
      let table = "";
      let payload: Record<string, any> = {
        id: generatedId,
        name: formData.name,
        age: parseInt(formData.age) || 0,
        gender: formData.gender,
        guardian: formData.guardian,
        constituency: formData.constituency,
        representative: formData.representative,
      };

      if (activeTab === "learner") {
        table = "learners_registration";
        payload.mother_tongue = formData.motherTongue;
        payload.native_place = formData.nativePlace;
        payload.occupation = formData.occupation || null;
      } else if (activeTab === "teacher") {
        table = "teachers_registration";
        payload.school = formData.school;
        payload.linked_id_1 = formData.linkedId1;
      } else if (activeTab === "mentor") {
        table = "mentors_registration";
        payload.occupation = formData.occupation;
        payload.linked_id_1 = formData.linkedId1;
      } else if (activeTab === "organizer") {
        table = "organizers_registration";
        payload.occupation = formData.occupation;
        payload.linked_id_1 = formData.linkedId1;
      } else if (activeTab === "donor") {
        table = "donors_registration";
        payload.school = formData.school;
        payload.linked_id_1 = formData.linkedId1;
      }

      const { error: insertError } = await supabase.from(table).insert([payload]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      setSubmittedId(generatedId);
    } catch (err: any) {
      console.error("Supabase insert error:", err);
      setError("ನೋಂದಣಿ ವೈಫಲ್ಯ: " + (err.message || "ದಯವಿಟ್ಟು ಸಂಪರ್ಕ ಸಾಧನಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ED1C24] mb-8 transition-colors">
        <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no">
          <ArrowLeft className="w-4 h-4" />
        </span>
        <span>ಮುಖಪುಟಕ್ಕೆ ಮರಳಿ</span>
      </Link>

      {/* Header */}
      <ScrollReveal className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#333333] mb-4">
          ಸೇವಾದಾರರ <span className="text-[#ED1C24]">ನೋಂದಣಿ ಫಾರ್ಮ್</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          ಆಂದೋಲನದಲ್ಲಿ ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ, ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ವಿಶಿಷ್ಟ ಗುರುತಿನ ಸಂಖ್ಯೆ (ID) ಪಡೆಯಿರಿ.
        </p>
        <div className="w-20 h-1 bg-[#FFC20E] mx-auto rounded-full mt-4"></div>
      </ScrollReveal>

      {/* Custom Tabs Navigation */}
      <ScrollReveal delay={100}>
        <div className="flex flex-row items-center justify-start md:justify-center gap-2 mb-10 max-w-3xl mx-auto glass p-1.5 rounded-2xl border border-white/60 shadow-md scrollbar-none w-full flex-nowrap overflow-x-auto">
          {[
            { id: "learner", label: "ಕಲಿಯುವವರು", icon: <UserPlus className="w-5 h-5" /> },
            { id: "teacher", label: "ಕಲಿಸುವ ಮಕ್ಕಳು", icon: <Users className="w-5 h-5" /> },
            { id: "mentor", label: "ಮಾರ್ಗದರ್ಶಕರು", icon: <Award className="w-5 h-5" /> },
            { id: "organizer", label: "ಸಂಘಟಕರು", icon: <Shield className="w-5 h-5" /> },
            { id: "donor", label: "ದಾನಿಗಳು", icon: <IndianRupee className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as RoleType);
                setSubmittedId(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3.5 md:py-2 md:px-5 rounded-xl text-[10px] sm:text-xs md:text-sm font-extrabold transition-all whitespace-nowrap flex-shrink-0 ${
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
      </ScrollReveal>

      {/* Form Content Area */}
      <ScrollReveal delay={200}>
        <div className="glass rounded-3xl border border-white/60 shadow-xl p-8 md:p-10 relative overflow-hidden">
          {submittedId ? (
            /* Success Screen */
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-20 h-20 bg-green-50/50 border border-green-200 text-green-600 rounded-full mx-auto flex items-center justify-center shadow-inner">
                <span className="notranslate flex-shrink-0 flex items-center justify-center" translate="no">
                  <CheckCircle2 className="w-12 h-12" />
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-extrabold text-green-700">ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!</h3>
                <p className="text-sm font-semibold text-gray-500">
                  ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಮತ್ತು ಸಿಸ್ಟಂನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ.
                </p>
              </div>

              <div className="bg-amber-50/30 p-6 rounded-2xl border border-amber-100 max-w-md mx-auto space-y-4 text-left">
                <div className="flex justify-between border-b border-amber-200/50 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">ಗುರುತಿನ ಸಂಖ್ಯೆ (ID)</span>
                  <span className="text-base font-extrabold text-[#ED1C24]">{submittedId}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/50 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">ಹೆಸರು</span>
                  <span className="text-sm font-bold text-gray-700">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/50 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">ಪಾತ್ರ</span>
                  <span className="text-sm font-bold text-[#D18C00]">
                    {activeTab === "learner" && <span>ಕಲಿಯುವವರು (Form 1)</span>}
                    {activeTab === "teacher" && <span>ಕಲಿಸುವ ಮಗು (Form 2)</span>}
                    {activeTab === "mentor" && <span>ಮಾರ್ಗದರ್ಶಕರು (Form 3)</span>}
                    {activeTab === "organizer" && <span>ಸಂಘಟಕರು (Form 4)</span>}
                    {activeTab === "donor" && <span>ದಾನಿಗಳು (Form 5)</span>}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-xs font-bold text-gray-400 uppercase">ಕ್ಷೇತ್ರ</span>
                  <span className="text-sm font-bold text-gray-700">{formData.constituency || "ಬೆಂಗಳೂರು"}</span>
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={resetForm} className="bg-[#ED1C24] hover:bg-[#D11820] text-white rounded-full font-bold px-8 py-5">
                  ಮತ್ತೊಂದು ಹೊಸ ನೋಂದಣಿ
                </Button>
              </div>
            </div>
          ) : (
            /* Actual Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-amber-100/50 pb-4 mb-6">
                <h3 className="text-xl font-heading font-extrabold text-gray-800">
                  {activeTab === "learner" && <span>ಕಲಿಯುವವರ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 1)</span>}
                  {activeTab === "teacher" && <span>ಕಲಿಸುವ ಮಗುವಿನ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 2)</span>}
                  {activeTab === "mentor" && <span>ಮಾರ್ಗದರ್ಶಕರ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 3)</span>}
                  {activeTab === "organizer" && <span>ಸಂಘಟಕರ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 4)</span>}
                  {activeTab === "donor" && <span>ದಾನಿಗಳ ಮಾಹಿತಿ ಭರ್ತಿ ಮಾಡಿ (FORM 5)</span>}
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mt-1">
                  * ಎಲ್ಲಾ ಫಾರ್ಮ್ ಕ್ಷೇತ್ರಗಳು ಕಡ್ಡಾಯವಾಗಿವೆ
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Constituency */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಕ್ಷೇತ್ರದ ಹೆಸರು</label>
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
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಜನಪ್ರತಿನಿಧಿಗಳ ಹೆಸರು</label>
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
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
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
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ವಯಸ್ಸು</label>
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
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಲಿಂಗ</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="flex h-12 w-full rounded-xl border border-amber-100/80 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24]/30 disabled:cursor-not-allowed disabled:opacity-50 font-semibold transition-all shadow-sm text-gray-600"
                  >
                    <option value="M">ಪುರುಷ (M)</option>
                    <option value="F">ಮಹಿಳೆ (F)</option>
                    <option value="OTH">ಇತರ (OTH)</option>
                  </select>
                </div>

                {/* Parent/Guardian */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ತಾಯಿ / ತಂದೆ / ಪೋಷಕರ ಹೆಸರು</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಮಾತೃ ಭಾಷೆ</label>
                      <Input
                        type="text"
                        name="motherTongue"
                        required
                        value={formData.motherTongue}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಮೂಲ ಸ್ಥಳ</label>
                      <Input
                        type="text"
                        name="nativePlace"
                        required
                        placeholder="ನಿಮ್ಮ ಊರಿನ ಹೆಸರು"
                        value={formData.nativePlace}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ವೃತ್ತಿ / ಓದುತ್ತಿರುವುದು</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಓದುತ್ತಿರುವ ತರಗತಿ / ಶಾಲೆ</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಲಿಂಕ್ ಮಾಡಬೇಕಾದ ಕಲಿಯುವವರ ID (ಕನಿಷ್ಠ ೧)</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ವೃತ್ತಿ (ಶಿಕ್ಷಕರು/ಸಾಹಿತಿಗಳು/ನಿವೃತ್ತರು)</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಲಿಂಕ್ ಮಾಡಬೇಕಾದ ಮಕ್ಕಳ ID (ಕನಿಷ್ಠ ೧)</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ವೃತ್ತಿ / ಸಂಸ್ಥೆ</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಲಿಂಕ್ ಮಾಡಬೇಕಾದ ಮಾರ್ಗದರ್ಶಕರ ID</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಸಂಸ್ಥೆ / ಟ್ರಸ್ಟ್ ಹೆಸರು</label>
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
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ಧನಸಹಾಯ ಪಡೆಯುತ್ತಿರುವ ಮಕ್ಕಳ ID</label>
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

              {/* About me description details */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">ವೈಯಕ್ತಿಕ ವಿವರ / ಹಿನ್ನೆಲೆ</label>
                <Textarea
                  name="details"
                  rows={4}
                  placeholder="ನಿಮ್ಮ ಬಗ್ಗೆ ಅಥವಾ ಆಂದೋಲನದ ಉದ್ದೇಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಬರೆಯಿರಿ"
                  value={formData.details}
                  onChange={handleInputChange}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-xl text-center">
                  <span>{error}</span>
                </div>
              )}

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#ED1C24] hover:bg-[#D11820] text-white py-6 px-12 rounded-full font-bold text-base shadow-lg shadow-[#ED1C24]/10 transition-transform active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ..." : "ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
