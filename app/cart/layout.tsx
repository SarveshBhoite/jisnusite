import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | Jisnu Digital",
  description: "View and manage items in your shopping cart.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
