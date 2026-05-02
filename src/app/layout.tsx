import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import { InitialLoader } from "@/components/initial-loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jerry's Portfolio",
  description: "Portfolio landing page for Jerry Robayo, full stack developer.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <InitialLoader>{children}</InitialLoader>
      </body>
    </html>
  );
}
