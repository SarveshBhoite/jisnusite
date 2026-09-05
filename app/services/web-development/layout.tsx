import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Company in Pune | Jisnu Digital",
  description:
    "Jisnu Digital provides professional web development services in Pune, including business websites, custom web applications, e-commerce development and SEO-friendly websites.",
  alternates: {
    canonical: "https://www.jisnudigital.com/services/web-development",
  },
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
