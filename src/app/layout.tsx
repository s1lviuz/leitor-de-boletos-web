import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Leitor de Boletos",
  description: "🔍 A solução definitiva para leitura de boletos bancários. Leitor de Boletos extrai facilmente a linha digitável de qualquer boleto a partir de arquivos PDF ou imagens.",
  robots: "noindex, nofollow",
  other: {
    "google-site-verification": "wgEovlavFLiAxb7NFmL1zQtR50Lxfe4_7kWVJfX77qA"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main className="flex flex-col min-h-screen w-full items-center justify-between bg-[#012A45] text-white">
          <header className="flex flex-col w-full items-center justify-center">
            <Image
              src="/ghost_icon.png"
              alt="Logo do Leitor de Boletos"
              width={200}
              height={200}
            />
            <h1 className="text-xl 2xl:text-4xl xl:text-2xl font-bold">Bem-vindo ao Leitor de Boletos 🎉</h1>
            <p className="2xl:text-lg mt-2 text-center">🔍 A solução definitiva para leitura de boletos bancários.</p>
          </header>
          <section className="max-w-xl mb-auto mt-5 xl:mt-10">
            {children}
          </section>
          <footer className="flex flex-col w-full items-center justify-center min-h-20">
            <p className="2xl:text-lg">Desenvolvido por:</p>
            <div className="flex gap-1 items-center">
              <GithubIcon size={24} />
              <a
                href="https://github.com/s1lviuz"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                <strong>@s1lviuz</strong>
              </a>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
