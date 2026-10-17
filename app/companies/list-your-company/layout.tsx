import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Company | Jisnu Digital Directory",
  description: "Submit and register your company on the Jisnu Digital business directory.",
  alternates: {
    canonical: "https://www.jisnudigital.com/companies/list-your-company",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ListYourCompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
