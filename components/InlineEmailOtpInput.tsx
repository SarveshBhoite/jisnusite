"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Send, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

interface InlineEmailOtpInputProps {
  email: string;
  onVerificationChange: (isVerified: boolean) => void;
  className?: string;
}

// Session storage helper
export function isEmailVerifiedInSession(email: string): boolean {
  if (typeof window === "undefined" || !email) return false;
  try {
    const verifiedObj = JSON.parse(sessionStorage.getItem("verified_emails") || "{}");
    const timestamp = verifiedObj[email.toLowerCase().trim()];
    if (!timestamp) return false;
    // Valid for 15 minutes
    return Date.now() - timestamp < 15 * 60 * 1000;
  } catch {
    return false;
  }
}

export function setEmailVerifiedInSession(email: string) {
  if (typeof window === "undefined" || !email) return;
  try {
    const verifiedObj = JSON.parse(sessionStorage.getItem("verified_emails") || "{}");
    verifiedObj[email.toLowerCase().trim()] = Date.now();
    sessionStorage.setItem("verified_emails", JSON.stringify(verifiedObj));
  } catch (err) {
    console.error("Session storage error:", err);
  }
}

export default function InlineEmailOtpInput({
  email,
  onVerificationChange,
  className = "",
}: InlineEmailOtpInputProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const cleanEmail = email ? email.toLowerCase().trim() : "";
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  // Check initial verification state
  useEffect(() => {
    if (isValidEmail && isEmailVerifiedInSession(cleanEmail)) {
      setIsVerified(true);
      onVerificationChange(true);
    } else {
      setIsVerified(false);
      onVerificationChange(false);
    }
  }, [cleanEmail]);

  // Timer countdown
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!isValidEmail) {
      setErrorMsg("Please enter a valid email address first.");
      return;
    }

    setSending(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setCountdown(60);
        setSuccessMsg("Verification code sent to your email!");
      } else {
        setErrorMsg(data.message || "Failed to send code.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.trim().length !== 6) {
      setErrorMsg("Enter 6-digit OTP code.");
      return;
    }

    setVerifying(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, otp: otpCode.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsVerified(true);
        setEmailVerifiedInSession(cleanEmail);
        onVerificationChange(true);
        setSuccessMsg("Email verified!");
      } else {
        setErrorMsg(data.message || "Invalid OTP code.");
        onVerificationChange(false);
      }
    } catch (err) {
      setErrorMsg("Verification error.");
    } finally {
      setVerifying(false);
    }
  };

  if (isVerified) {
    return (
      <div className={`mt-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Email Verified Successfully</span>
        </div>
        <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">Verified</span>
      </div>
    );
  }

  return (
    <div className={`mt-2 space-y-2 ${className}`}>
      {!otpSent ? (
        <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 pl-1">
            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Email verification required</span>
          </div>
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={sending || !isValidEmail}
            className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all shrink-0"
          >
            {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            <span>Get Code</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2 p-3 bg-slate-50 border border-cyan-200 rounded-xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP code *"
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold tracking-widest text-slate-900 outline-none focus:border-cyan-600"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={verifying || otpCode.length !== 6}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all shrink-0"
            >
              {verifying ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
              <span>Verify</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span>Code sent to email</span>
            <button
              type="button"
              disabled={countdown > 0 || sending}
              onClick={handleSendOtp}
              className="text-cyan-600 hover:underline font-bold disabled:text-slate-400 flex items-center gap-1"
            >
              {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              {countdown > 0 ? `Resend (${countdown}s)` : "Resend Code"}
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <p className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 p-1.5 rounded-lg text-center">
          {errorMsg}
        </p>
      )}
      {successMsg && !isVerified && (
        <p className="text-[11px] font-semibold text-cyan-600 bg-cyan-50 border border-cyan-100 p-1.5 rounded-lg text-center">
          {successMsg}
        </p>
      )}

      <p className="text-[11px] text-amber-700 font-semibold bg-amber-50/80 border border-amber-200/60 p-2 rounded-lg text-center">
        ⚠️ Email verification is mandatory to submit form
      </p>
    </div>
  );
}
