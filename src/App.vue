<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const SITE_NAME = import.meta.env.VITE_SITE_NAME;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const DEFAULT_OG = `${SITE_URL}/LOGO.png`;
const INDEXABLE = (import.meta.env.VITE_INDEXABLE ?? "true") === "true";
const route = useRoute();

const canonical = computed(() => {
  const path = (route.path || "/").replace(/\/+$/, "") || "/";
  return `${SITE_URL}${path}`;
});
const robots = computed(() =>
  route.meta?.noindex
    ? "noindex,nofollow"
    : INDEXABLE
    ? "index,follow"
    : "noindex,nofollow"
);

useHead({
  title: SITE_NAME,
  titleTemplate: (title) => (title ? `${title}｜${SITE_NAME}` : SITE_NAME),
  htmlAttrs: { lang: "zh-Hant" },
  meta: [
    // 新增：Google Search Console 驗證
    {
      name: "google-site-verification",
      content: "mPzaSifvozgZVQFkJLs4j_13xwaOXQR4iMHG5aDDsvY",
    },

    {
      name: "description",
      content:
        "前端匠作是一個專注 Vue3/Vite，提供前端網站開發、SEO、效能優化與長期維運的專業團隊。",
    },
    { name: "robots", content: robots },
    { name: "theme-color", content: "#ffffff" },
    { name: "color-scheme", content: "light dark" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "zh_TW" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: DEFAULT_OG },
  ],
  link: [{ rel: "canonical", href: canonical }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/LOGO.png`,
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }),
    },
  ],
});
</script>
