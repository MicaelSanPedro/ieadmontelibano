import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IEAD | Igreja Evangélica Assembleia de Deus - Rondonópolis - MT",
  description:
    "Bem-vindo à Igreja Evangélica Assembleia de Deus no bairro Monte Líbano, Rondonópolis - MT. Venha adorar ao Senhor conosco. Cultos, eventos e a Palavra de Deus para sua vida.",
  keywords: [
    "IEAD",
    "Rondonópolis",
    "Monte Líbano",
    "Assembleia de Deus",
    "igreja",
    "culto",
    "evangélica",
    "Mato Grosso",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "IEAD | Assembleia de Deus - Rondonópolis - MT",
    description:
      "Igreja Evangélica Assembleia de Deus no bairro Monte Líbano, Rondonópolis - MT. Um lugar de paz e comunhão.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
