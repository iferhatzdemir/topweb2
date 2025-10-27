export const DASHBOARD_STATS = [
  {
    id: "orders",
    label: "Aylık Sipariş",
    value: 842,
    trend: 18.4,
    description: "Geçen aya göre artış",
  },
  {
    id: "revenue",
    label: "Toplam Gelir",
    value: 126780,
    prefix: "₺",
    trend: 12.1,
    description: "Aylık toplam",
  },
  {
    id: "conversion",
    label: "Dönüşüm Oranı",
    value: 3.2,
    suffix: "%",
    trend: -0.6,
    description: "Sepetten ödeme", 
  },
  {
    id: "content",
    label: "Yayınlanan İçerik",
    value: 58,
    trend: 6.0,
    description: "Son 30 gün",
  },
];

export const REVENUE_SERIES = [
  { month: "Oca", value: 48000 },
  { month: "Şub", value: 51250 },
  { month: "Mar", value: 53800 },
  { month: "Nis", value: 60210 },
  { month: "May", value: 65350 },
  { month: "Haz", value: 70540 },
];

export const CONTENT_ACTIVITIES = [
  {
    id: "activity-1",
    title: "Yeni blog yazısı yayınlandı",
    actor: "İçerik Yöneticisi",
    time: "2 saat önce",
    status: "published",
  },
  {
    id: "activity-2",
    title: "Kampanya sayfası taslak olarak kaydedildi",
    actor: "Kıdemli Editör",
    time: "5 saat önce",
    status: "draft",
  },
  {
    id: "activity-3",
    title: "Günün ürünü banner'ı güncellendi",
    actor: "Süper Yönetici",
    time: "1 gün önce",
    status: "published",
  },
  {
    id: "activity-4",
    title: "Hero blok şeması revize edildi",
    actor: "Süper Yönetici",
    time: "2 gün önce",
    status: "review",
  },
];

export const CONTENT_PAGES = [
  {
    id: "page-hero",
    title: "Yaz Vitrini",
    slug: "yaz-vitrini",
    type: "landing",
    status: "published",
    updatedAt: "2024-07-02T08:00:00.000Z",
    author: "İçerik Yöneticisi",
  },
  {
    id: "page-blog",
    title: "Trend Haberler",
    slug: "trend-haberler",
    type: "blog",
    status: "review",
    updatedAt: "2024-07-01T17:12:00.000Z",
    author: "Kıdemli Editör",
  },
  {
    id: "page-faq",
    title: "Sıkça Sorulan Sorular",
    slug: "sss",
    type: "bilgi",
    status: "published",
    updatedAt: "2024-06-25T12:24:00.000Z",
    author: "Süper Yönetici",
  },
  {
    id: "page-kvkk",
    title: "KVKK Aydınlatma Metni",
    slug: "kvkk",
    type: "hukuk",
    status: "published",
    updatedAt: "2024-06-20T09:48:00.000Z",
    author: "Süper Yönetici",
  },
  {
    id: "page-about",
    title: "Hakkımızda",
    slug: "hakkimizda",
    type: "statik",
    status: "draft",
    updatedAt: "2024-06-19T10:15:00.000Z",
    author: "İçerik Yöneticisi",
  },
  {
    id: "page-returns",
    title: "İade Politikası",
    slug: "iade-politikasi",
    type: "statik",
    status: "published",
    updatedAt: "2024-06-18T07:32:00.000Z",
    author: "Kıdemli Editör",
  },
];

export const MEDIA_LIBRARY = [
  {
    id: "media-1",
    name: "kampanya-hero.jpg",
    type: "image/jpeg",
    size: 245678,
    uploadedAt: "2024-07-02T07:20:00.000Z",
    tags: ["hero", "kampanya"],
    variants: ["1080x640", "720x420", "360x210"],
  },
  {
    id: "media-2",
    name: "lookbook-2024.mp4",
    type: "video/mp4",
    size: 1845678,
    uploadedAt: "2024-06-29T14:10:00.000Z",
    tags: ["video", "lookbook"],
    variants: ["1080p", "720p"],
  },
  {
    id: "media-3",
    name: "social-square.png",
    type: "image/png",
    size: 185632,
    uploadedAt: "2024-06-21T11:35:00.000Z",
    tags: ["sosyal", "kampanya"],
    variants: ["1024x1024", "512x512"],
  },
  {
    id: "media-4",
    name: "app-store-badge.svg",
    type: "image/svg+xml",
    size: 3567,
    uploadedAt: "2024-06-18T09:05:00.000Z",
    tags: ["mobil", "banner"],
    variants: ["vektör"],
  },
];

export const MENU_TREE = [
  {
    id: "menu-home",
    label: "Ana Sayfa",
    href: "/",
    audience: "public",
    children: [],
  },
  {
    id: "menu-collections",
    label: "Koleksiyonlar",
    href: "/koleksiyonlar",
    audience: "public",
    children: [
      {
        id: "menu-summer",
        label: "Yaz 2024",
        href: "/koleksiyonlar/yaz-2024",
        audience: "public",
        children: [],
      },
      {
        id: "menu-premium",
        label: "Premium",
        href: "/koleksiyonlar/premium",
        audience: "members",
        children: [],
      },
    ],
  },
  {
    id: "menu-blog",
    label: "Blog",
    href: "/blog",
    audience: "public",
    children: [],
  },
];

export const BLOCK_LIBRARY = [
  {
    id: "hero-primary",
    label: "Hero Blok",
    component: "HeroPrimary",
    schema: {
      title: "Metin",
      subtitle: "Metin",
      backgroundImage: "Medya",
      cta: "Bağlantı",
    },
    fields: [
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "subtitle", label: "Alt Başlık", type: "textarea" },
      { key: "backgroundImage", label: "Arka Plan", type: "media", required: true },
      { key: "cta", label: "CTA", type: "link" },
    ],
  },
  {
    id: "feature-grid",
    label: "Özellik Izgarası",
    component: "FeatureGrid",
    schema: {
      title: "Metin",
      features: "Liste",
    },
    fields: [
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "features", label: "Özellikler", type: "repeatable" },
    ],
  },
];

export const BLOCK_SAMPLE_PAYLOAD = {
  blocks: [
    {
      id: "hero-primary",
      label: "Hero Blok",
      component: "HeroPrimary",
      props: {
        title: "Gül Kurusu Koleksiyonu",
        subtitle: "Yeni sezonda zarif tonlar",
        backgroundImage: "kampanya-hero.jpg",
        cta: {
          label: "Alışverişe Başla",
          href: "/koleksiyonlar/yaz-2024",
        },
      },
    },
  ],
};
