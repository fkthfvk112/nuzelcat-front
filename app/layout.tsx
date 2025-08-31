import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./(components)/Navigation";
import { url } from "./(constants)/Urls";
import Footer from "./(components)/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "누젤냥",
  description: "누가누가 제일 귀여운 고양이일까",
  icons: {
    icon:"/nuzelicon.ico"
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const navItems = [
    { label: '홈', href: '/' },
    { label: '업로드', href: url.UPLOAD },
    // { label: '문의', href: '/contact' },
  ];
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation items={navItems} style={{ backgroundColor: '#fff' }}>
          {/* <button style={{ marginLeft: 'auto' }}>로그인</button> */}
        </Navigation>
        {children}
        <Footer />
      </body>
    </html>
  );
}
