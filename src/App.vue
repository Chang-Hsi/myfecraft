<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
// 全站預設與動態 canonical/robots
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const SITE_NAME = import.meta.env.VITE_SITE_NAME;
const SITE_URL = import.meta.env.VITE_SITE_URL;

// 建議用 1200x630 的 og-default.jpg
const DEFAULT_OG = `${SITE_URL}/LOGO.png`;

// PRD 索引、SIT/UAT noindex：.env 控制
const INDEXABLE = (import.meta.env.VITE_INDEXABLE ?? "true") === "true";
const route = useRoute();

// 依路由動態產生 canonical（移除結尾斜線、忽略查詢與 hash）
const canonical = computed(() => {
  const path = (route.path || "/").replace(/\/+$/, "") || "/";
  return `${SITE_URL}${path}`;
});

// 若頁面設 meta.noindex，則覆寫為 noindex
const robots = computed(() =>
  route.meta?.noindex
    ? "noindex,nofollow"
    : INDEXABLE
    ? "index,follow"
    : "noindex,nofollow"
);

useHead({
  // 標題模板：頁名｜站名（各頁自行設 title 即可套用）
  title: SITE_NAME,
  titleTemplate: (title) => (title ? `${title}｜${SITE_NAME}` : SITE_NAME),

  htmlAttrs: { lang: "zh-Hant" },

  meta: [
    // 預設描述（頁面未提供時使用）
    {
      name: "description",
      content:
        "前端匠作是一個專注 Vue3/Vite，提供前端網站開發、SEO、效能優化與長期維運的專業團隊。",
    },

    // 依環境與頁面 meta.noindex 控制索引
    { name: "robots", content: robots },

    { name: "theme-color", content: "#ffffff" },
    { name: "color-scheme", content: "light dark" },

    // Open Graph 預設（og:title 建議各頁自行覆寫；這裡提供保底）
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "zh_TW" },
    // og:url 依路由變動
    { property: "og:url", content: canonical },
    { property: "og:image", content: DEFAULT_OG },
  ],

  // link 可接受響應式值：動態 canonical
  link: [{ rel: "canonical", href: canonical }],

  script: [
    // Organization
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
    // WebSite + SearchAction（若未來有 /search）
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
