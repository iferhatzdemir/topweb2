import { Inter, Poppins } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-family-body",
});
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-family-heading",
});

export const metadata = {
  title: "Broccoli - Organik Gıda E-Ticaret",
  description: "Taze ve organik ürünler için güvenilir adresiniz. %100 doğal ve sağlıklı gıdalar.",
  keywords: "organik gıda, doğal ürünler, sağlıklı beslenme, e-ticaret",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning={true}
      className={`${poppins.variable} ${inter.variable}`}
    >
      <body
        className={inter.className}
        suppressHydrationWarning={true}
      >
        <Suspense fallback={<div></div>}>
          {children}

          <Script src="/plugins.js" strategy="lazyOnload" />
          <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeeHDCOXmUMja1CFg96RbtyKgx381yoBU&loading=async"
            strategy="lazyOnload"
          />
        </Suspense>
      </body>
    </html>
  );
}
