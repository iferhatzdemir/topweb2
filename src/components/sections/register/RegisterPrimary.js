"use client";

import Link from "next/link";
import React from "react";
import { useLocale } from "@/hooks/useLocale";

const RegisterPrimary = () => {
  const { t } = useLocale('auth');

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                {t('register.title')}
              </h1>
              <p>{t('register.subtitle')}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form action="#" className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  name="firstname"
                  placeholder={t('register.firstName')}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder={t('register.lastName')}
                />
                <input
                  type="text"
                  name="email"
                  placeholder={t('register.email')}
                />
                <input
                  type="password"
                  name="password"
                  placeholder={t('register.password')}
                />
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder={t('register.confirmPassword')}
                />
                <label className="checkbox-inline">
                  <input type="checkbox" /> {t('register.consentProcessing')}
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" /> {t('register.consentPrivacy')}
                </label>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                  >
                    {t('register.createButton')}
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <p>{t('register.agreeTerms')}</p>
                <p>
                  <Link href="#">
                    {t('register.termsConditions')} &nbsp; | &nbsp; {t('register.privacyPolicy')}
                  </Link>
                </p>
                <div className="go-to-btn mt-50">
                  <Link href="/login">{t('register.haveAccountLink')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPrimary;
