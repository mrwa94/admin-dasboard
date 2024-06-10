import { Metadata } from "next";

import prismadb from '@/lib/prismadb'
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";



import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard ",
  description: "Admin Dashboard e-commerce web app",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const store = prismadb.store 
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ModalProvider />
          <ToasterProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
