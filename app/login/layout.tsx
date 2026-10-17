import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Login | Jisnu Digital",
  description: "Secure login portal for Jisnu Digital clients and partners.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
