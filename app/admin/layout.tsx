import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理後台 | 雅博堂",
  description: "雅博堂管理後台",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No public navbar or footer for admin routes (login + dashboard)
  return <>{children}</>;
}
