"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, Mail, ShieldCheck, X, RefreshCw, CheckCircle2 } from "lucide-react";

interface EmailVerificationModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerified: () => void;
  title?: string;
  description?: string;
}

// Session store helper to keep email verified in session memory
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

export default function EmailVerificationModal({
  isOpen,
  email,
  onClose,
  onVerified,
  title = "Verify Your Email",
  description = "To prevent spam and secure your request, please enter the 6-digit code sent to your email.",
}: EmailVerificationModalProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Send OTP automatically when modal opens
  useEffect(() => {
    if (isOpen && email) {
      setError("");
      setSuccess(false);
      setDigits(["", "", "", "", "", ""]);
      handleSendOtp();
    }
  }, [isOpen, email]);

  // Countdown timer for resend
  useEffect(() => {
    let timer: any;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleSendOtp = async () => {
    setResending(true);
    setError("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send verification code.");
      } else {
        setOtpSent(true);
        setCountdown(60);
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
      }
    } catch (err) {
      setError("Network error while sending OTP.");
    } finally {
      setResending(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Paste full code
      const pasted = value.replace(/\D/g, "").slice(0, 6).split("");
      const newDigits = [...digits];
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    const val = value.replace(/\D/g, "");
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otpCode = digits.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid code. Please try again.");
      } else {
        setSuccess(true);
        setEmailVerifiedInSession(email);
        setTimeout(() => {
          onVerified();
          onClose();
        }, 1000);
      }
    } catch (err) {
      setError("Network error during verification.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/65 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4 shadow-inner">
            {success ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
            ) : (
              <ShieldCheck className="w-7 h-7" />
            )}
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xs">{description}</p>

          {/* Email badge */}
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-cyan-600" />
            <span>{email}</span>
          </div>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="mt-6 text-center py-6 text-emerald-600 font-bold text-base flex flex-col items-center gap-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <span>Email Verified Successfully!</span>
            <p className="text-xs text-slate-400 font-normal">Submitting your form now...</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="mt-6 space-y-5">
            {/* 6 Digit Input Group */}
            <div className="flex justify-center gap-2 md:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <div className="text-center text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 rounded-xl p-2.5">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || digits.join("").length !== 6}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <span>Verify & Submit Form</span>
              )}
            </button>

            {/* Resend Section */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Didn&apos;t receive code?</span>
              <button
                type="button"
                disabled={countdown > 0 || resending}
                onClick={handleSendOtp}
                className="font-semibold text-cyan-600 hover:text-cyan-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
              >
                {resending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
