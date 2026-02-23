import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "二次元角色扮演站",
  description: "开启你的幻想之旅",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
