"use client";
import Link from "next/link";
import React from "react";
import { useLocale } from "@/hooks/useLocale";

const LoginPrimary = () => {
  const { t } = useLocale('auth');

  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                {t('login.title')}
              </h1>
              <p>
                {t('login.subtitle')}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form action="#" className="ltn__form-box contact-form-box">
                <input type="text" name="email" placeholder={t('login.email')} />
                <input
                  type="password"
                  name="password"
                  placeholder={t('login.password')}
                />
                <div className="btn-wrapper mt-0">
                  <button
                    className="theme-btn-1 btn btn-block w-100"
                    type="submit"
                  >
                    {t('login.signIn')}
                  </button>
                </div>
                <div className="go-to-btn mt-20">
                  <Link
                    href="#"
                    title={t('login.forgotPassword')}
                    data-bs-toggle="modal"
                    data-bs-target="#ltn_forget_password_modal"
                  >
                    <small>{t('login.forgotPassword')}</small>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>{t('login.noAccount')}</h4>
              <p>
                {t('login.createAccountDescription')}
              </p>
              <div className="btn-wrapper">
                <Link href="/register" className="theme-btn-1 btn black-btn">
                  {t('login.createAccount')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrimary;
