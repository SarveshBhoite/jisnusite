import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing & Web Development Services in Pune | Jisnu Digital",
  description:
    "From high-performance websites and mobile applications to SEO and digital marketing, Jisnu Digital delivers modern digital solutions designed to help businesses build a stronger online presence and achieve sustainable growth.",
  alternates: {
    canonical: "https://www.jisnudigital.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
