"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { z } from "@/lib/zod-lite";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import styles from "./login.module.css";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta girin."),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı."),
});

const ROLE_HINTS = [
  { role: "superadmin", description: "Tam yetki, tüm modüllere erişim" },
  { role: "content-admin", description: "İçerik, menü ve blok yönetimi" },
  { role: "editor", description: "İçerik oluşturma ve güncelleme" },
];

const AdminLoginPage = () => {
  const router = useRouter();
  const { ready, user, login } = useAdminAuth();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (user) {
      router.replace("/admin/dashboard");
    }
  }, [ready, user, router]);

  const errorSummary = useMemo(() => Object.values(errors).filter(Boolean), [errors]);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    const result = loginSchema.safeParse(formState);
    if (!result.success) {
      const issueMap = result.error.issues.reduce(
        (acc, issue) => ({ ...acc, [issue.path.at(-1)]: issue.message }),
        {}
      );
      setErrors(issueMap);
      return;
    }

    setSubmitting(true);
    const response = await login(formState);
    setSubmitting(false);

    if (!response.success) {
      setServerError(response.error);
      return;
    }

    router.replace("/admin/dashboard");
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}> 
          <h1>Rose Admin Paneline Giriş</h1>
          <p>Demo kullanıcılarıyla rol bazlı yetkilendirmeyi deneyin.</p>
        </div>
        {errorSummary.length > 0 ? (
          <div className={styles.formAlert} role="alert">
            {errorSummary.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        ) : null}
        {serverError ? (
          <div className={styles.formAlert} role="alert">
            <p>{serverError}</p>
          </div>
        ) : null}
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="E-posta"
            name="email"
            value={formState.email}
            onChange={handleChange("email")}
            type="email"
            placeholder="admin@rosecommerce.dev"
            error={errors.email}
          />
          <Input
            label="Şifre"
            name="password"
            value={formState.password}
            onChange={handleChange("password")}
            type="password"
            placeholder="Şifrenizi girin"
            error={errors.password}
          />
          <Button type="submit" variant="primary" tone="solid" fullWidth disabled={submitting}>
            {submitting ? "Giriş yapılıyor..." : "Panele giriş yap"}
          </Button>
        </form>
        <div className={styles.hints}>
          <h2>Demo Roller</h2>
          <ul>
            {ROLE_HINTS.map((hint) => (
              <li key={hint.role}>
                <Badge variant="outline">
                  {hint.role}
                </Badge>
                <span>{hint.description}</span>
              </li>
            ))}
          </ul>
          <p className={styles.credentials}>
            Örnek: <strong>admin@rosecommerce.dev / Admin123!</strong>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
