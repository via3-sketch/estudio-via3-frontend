import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#070707] text-white flex flex-col min-h-screen">

        <Navbar />

        <main className="pt-16 flex-1">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}