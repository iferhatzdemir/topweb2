"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card, Footer, Input, Modal, Navbar } from "@/components/ui";
import styles from "./TokenizedThemeShowcase.module.css";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/shop", label: "Mağaza" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
];

const footerColumns = [
  {
    title: "Ürünler",
    items: [
      { href: "#", label: "Organik Sebzeler" },
      { href: "#", label: "Egzotik Meyveler" },
      { href: "#", label: "Glütensiz Atıştırmalıklar" },
    ],
  },
  {
    title: "Destek",
    items: [
      { href: "#", label: "Sıkça Sorulan Sorular" },
      { href: "#", label: "İade Politikası" },
      { href: "#", label: "Kargo Bilgisi" },
    ],
  },
];

const footerSocial = [
  { href: "https://instagram.com", label: "Instagram", icon: "📸" },
  { href: "https://x.com", label: "X", icon: "✕" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "in" },
];

const TokenizedThemeShowcase = () => {
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const target = document.body;
    if (!target) return undefined;
    if (isDark) {
      target.classList.add("theme-dark");
    } else {
      target.classList.remove("theme-dark");
    }
    return () => target.classList.remove("theme-dark");
  }, [isDark]);

  return (
    <div className={styles.wrapper}>
      <Navbar
        logo={<span className={styles.brand}>Broccoli UI</span>}
        links={navLinks}
        onThemeToggle={() => setIsDark((prev) => !prev)}
        cta={
          <Button as={Link} href="/shop" size="sm">
            Mağazaya Git
          </Button>
        }
      />

      <section className={styles.grid}>
        <Card
          title="Sepetiniz hazır!"
          subtitle="Yeni token tabanlı kart bileşeni."
          actions={
            <Button onClick={() => setModalOpen(true)} variant="primary">
              Detayları Gör
            </Button>
          }
        >
          <div className={styles.formRow}>
            <Input
              name="email"
              type="email"
              label="E-posta"
              placeholder="ornek@broccoli.dev"
            />
            <Input
              name="note"
              as="textarea"
              label="Notunuz"
              placeholder="Siparişinize dair kısa bir not bırakın"
              helperText="Minimum 10 karakter"
            />
          </div>
          <div className={styles.badgeRow}>
            <Badge>Yeni</Badge>
            <Badge variant="success">%20 indirim</Badge>
            <Badge variant="outline">Sınırlı Stok</Badge>
          </div>
        </Card>

        <Card
          title="Başarı Hikâyesi"
          subtitle="Token uyumlu kart & buton kombinasyonu"
          padding="lg"
          actions={
            <Button as={Link} href="/blog" variant="secondary" tone="outline">
              Blog Yazıları
            </Button>
          }
        >
          <p>
            Tüm bileşenler global design token setini kullanacak şekilde yeniden
            düzenlendi. Aydınlık ve karanlık tema arasında geçiş yaptığınızda
            renk, tipografi ve boşluk değerleri otomatik olarak uyum sağlar.
          </p>
          <div className={styles.actionRow}>
            <Button tone="ghost" variant="neutral" size="sm">
              İncelemeyi paylaş
            </Button>
            <Button size="sm">Sepete Ekle</Button>
          </div>
        </Card>
      </section>

      <Footer
        columns={footerColumns}
        social={footerSocial}
        bottom={<span>© {new Date().getFullYear()} Broccoli. Tüm hakları saklıdır.</span>}
      />

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Sepet detayları"
        footer={
          <>
            <Button tone="ghost" variant="neutral" onClick={() => setModalOpen(false)}>
              Vazgeç
            </Button>
            <Button>Ödemeye Geç</Button>
          </>
        }
      >
        <p>
          Token tabanlı modal bileşeni, global renk ve boşluk değişkenlerini
          kullanarak hem açık hem koyu temada tutarlı görünür.
        </p>
      </Modal>
    </div>
  );
};

export default TokenizedThemeShowcase;
