"use client";

import { useMemo } from "react";
import { useSWRLite } from "@/lib/swr-lite/useSWRLite";
import {
  extractContentBlocks,
  extractHeroBlock,
  getCategoryWithProducts,
  getPageBySlug,
  getProductById,
  getStaticPage,
  listBlogPosts,
  listCategories,
  mapProductSummary,
} from "./queries";

const createFetcher = (fn, ...args) => () => fn(...args);

export const useCmsHomePage = (initialData, options = {}) => {
  return useSWRLite(
    ["cms", "home-page"],
    createFetcher(getPageBySlug, initialData?.slug ?? "home"),
    { initialData, ...options }
  );
};

export const useCmsPage = (slug, initialData, options = {}) => {
  return useSWRLite(["cms", "page", slug], createFetcher(getPageBySlug, slug), {
    initialData,
    ...options,
  });
};

export const useCmsCategory = (slug, initialData, options = {}) => {
  return useSWRLite(
    slug ? ["cms", "category", slug] : null,
    createFetcher(getCategoryWithProducts, slug),
    { initialData, ...options }
  );
};

export const useCmsCategories = (options = {}) => {
  return useSWRLite(["cms", "categories"], listCategories, options);
};

export const useCmsProduct = (id, initialData, options = {}) => {
  return useSWRLite(["cms", "product", id], createFetcher(getProductById, id), {
    initialData,
    ...options,
  });
};

export const useCmsBlogPosts = (initialData, options = {}) => {
  return useSWRLite(["cms", "blog-posts"], listBlogPosts, {
    initialData,
    ...options,
  });
};

export const useCmsStaticPage = (slug, initialData, options = {}) => {
  return useSWRLite(["cms", "static", slug], createFetcher(getStaticPage, slug), {
    initialData,
    ...options,
  });
};

export const useCmsHero = (page) => {
  return useMemo(() => extractHeroBlock(page), [page]);
};

export const useCmsBlocks = (page) => {
  return useMemo(() => extractContentBlocks(page), [page]);
};

export const useCmsProductSummary = (product) => {
  return useMemo(() => mapProductSummary(product), [product]);
};
