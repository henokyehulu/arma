import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="flex flex-col max-w-6xl min-h-screen mx-auto border-x">
          <Header />
          <main className="flex flex-col flex-1 px-4 py-8 pb-20">
            <TRPCReactProvider headers={headers()}>
              {children}
            </TRPCReactProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
