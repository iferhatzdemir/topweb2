import { Inter, Poppins } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense } from "react";
import { headers } from "next/headers";
import { i18n } from "@/i18n/config";

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
  const headerList = headers();
  const activeLocale = headerList.get("x-locale") || i18n.defaultLocale;

  return (
    <html
      lang={activeLocale}
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
