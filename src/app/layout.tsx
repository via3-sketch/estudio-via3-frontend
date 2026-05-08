import "./globals.css";

import { UserProvider } from "@/context/UserContext";

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#070707] text-white flex flex-col min-h-screen">

        <UserProvider>

          <LayoutWrapper>
            {children}
          </LayoutWrapper>

        </UserProvider>

      </body>
    </html>
  );
}