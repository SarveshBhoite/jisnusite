"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2, X } from "lucide-react";

type FormState = {
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  service: string;
  location: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  mobile: "",
  email: "",
  businessName: "",
  service: "",
  location: "",
};

export default function PricingPopup() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const blockedPaths = ["/login", "/logout"];
    const isDashboardPath = pathname?.startsWith("/dashboard");

    if (isDashboardPath || blockedPaths.includes(pathname || "")) {
      setShow(false);
      return;
    }

    const popupClosed = sessionStorage.getItem("consultPopupClosed");
    if (popupClosed) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isClient, pathname]);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem("consultPopupClosed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const [firstName, ...restName] = form.name.trim().split(" ");
      const lastName = restName.join(" ");

      const message = [
        "Free consultant inquiry",
        `Name: ${form.name}`,
        `Mobile: ${form.mobile}`,
        `Business Name: ${form.businessName}`,
        `Service Kai Pahije: ${form.service}`,
        `Location/City: ${form.location}`,
      ].join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || form.name,
          lastName: lastName || "Lead",
          email: form.email,
          company: form.businessName,
          subject: "Free consultant request",
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Thank you! Our team will contact you soon.");
      setForm(INITIAL_FORM);
      closePopup();
    } catch (error) {
      alert("Unable to submit now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!show || !isClient) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={closePopup}
      />

      <div className="relative z-[100000] w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8">
        <button
          onClick={closePopup}
          className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-5">
          <h2 className="text-2xl font-black text-slate-900">Free Consultant</h2>
          <p className="mt-1 text-sm text-slate-500">Fill this form and we will contact you shortly.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Mob Num</label>
            <input
              required
              type="tel"
              value={form.mobile}
              onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Mobile number"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Mail Id</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Email address"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Business Name</label>
            <input
              required
              type="text"
              value={form.businessName}
              onChange={(e) => setForm((prev) => ({ ...prev, businessName: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Your business"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Service Kai Pahije</label>
            <input
              required
              type="text"
              value={form.service}
              onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Required service"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Location / City</label>
            <input
              required
              type="text"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="City"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 mt-2 flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white hover:bg-cyan-700 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit Free Consultant Request
          </button>
        </form>
      </div>
    </div>
  );
}
