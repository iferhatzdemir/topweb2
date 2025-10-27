"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AccessGate from "@/components/admin/AccessGate";
import {
  CONTENT_ACTIVITIES,
  DASHBOARD_STATS,
  REVENUE_SERIES,
} from "@/lib/admin/mockData";
import styles from "./dashboard.module.css";

const currency = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

const numberFormat = new Intl.NumberFormat("tr-TR");

const DashboardPage = () => {
  const { user } = useAdminAuth();

  return (
    <AccessGate
      permission="dashboard.view"
      fallback={(
        <div className={styles.denied}>
          <Card variant="outlined">
            <h1>Gösterge paneline erişim yok</h1>
            <p>Bu alanı görüntülemek için dashboard.view iznine sahip olmalısınız.</p>
          </Card>
        </div>
      )}
    >
      <div className={styles.container}>
        <section className={styles.statsGrid}>
        {DASHBOARD_STATS.map((stat) => {
          const formattedValue = stat.prefix
            ? `${stat.prefix}${numberFormat.format(stat.value)}`
            : stat.suffix === "%"
            ? `${stat.value}${stat.suffix}`
            : numberFormat.format(stat.value);

          const trendLabel = stat.trend > 0 ? `+${stat.trend}%` : `${stat.trend}%`;

          return (
            <Card key={stat.id} className={styles.statCard} variant="elevated">
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{stat.label}</span>
                <Badge variant={stat.trend >= 0 ? "success" : "outline"}>
                  {trendLabel}
                </Badge>
              </div>
              <p className={styles.statValue}>{formattedValue}</p>
              <span className={styles.statDescription}>{stat.description}</span>
            </Card>
          );
        })}
      </section>

      <section className={styles.columns}>
        <Card className={styles.revenueCard} variant="elevated" title="Gelir Eğrisi">
          <div className={styles.revenueChart}>
            {REVENUE_SERIES.map((entry) => (
              <div key={entry.month} className={styles.revenueBar}>
                <div
                  className={styles.revenueBarFill}
                  style={{ height: `${Math.max(18, entry.value / 1200)}px` }}
                  aria-label={`${entry.month} ayı geliri ${currency.format(entry.value)}`}
                />
                <span>{entry.month}</span>
              </div>
            ))}
          </div>
        </Card>
        <AccessGate permission="content.read">
          <Card
            className={styles.activityCard}
            variant="elevated"
            title="İçerik Aktiviteleri"
            subtitle="Son güncellemeler"
          >
            <ul className={styles.activityList}>
              {CONTENT_ACTIVITIES.map((activity) => (
                <li key={activity.id}>
                  <div>
                    <p className={styles.activityTitle}>{activity.title}</p>
                    <p className={styles.activityMeta}>
                      {activity.actor} · {activity.time}
                    </p>
                  </div>
                  <Badge variant={activity.status === "published" ? "success" : "outline"}>
                    {activity.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </AccessGate>
        </section>

        <AccessGate anyOf={["content.write", "media.manage", "menus.manage"]}>
          <Card
            className={styles.quickActions}
            variant="outlined"
            title="Hızlı İşlemler"
            subtitle={`Rolünüz: ${user?.role}`}
          >
            <div className={styles.actionGrid}>
              <AccessGate permission="content.write">
                <button type="button">Yeni içerik oluştur</button>
              </AccessGate>
              <AccessGate permission="content.publish">
                <button type="button">Yayın bekleyenleri incele</button>
              </AccessGate>
              <AccessGate permission="media.manage">
                <button type="button">Medya kütüphanesini aç</button>
              </AccessGate>
              <AccessGate permission="menus.manage">
                <button type="button">Menü sıralamasını düzenle</button>
              </AccessGate>
              <AccessGate permission="blocks.manage">
                <button type="button">Blok şemasını güncelle</button>
              </AccessGate>
            </div>
          </Card>
        </AccessGate>
      </div>
    </AccessGate>
  );
};

export default DashboardPage;
