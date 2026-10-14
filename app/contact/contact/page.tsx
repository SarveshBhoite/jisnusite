import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Jisnu Digital Solutions",
  alternates: {
    canonical: "https://www.jisnudigital.com/contact",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactContactRedirectPage() {
  permanentRedirect("/contact");
}
