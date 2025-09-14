<!-- src/views/Seo.vue -->
<template>
  <div>
    <SeoBanner />
    <SeoCarousel />
    <SeoList />
  </div>
</template>

<script setup>
// 原有組件
import SeoBanner from "../components/seo/SeoBanner.vue";
import SeoCarousel from "../components/seo/SeoCarousel.vue";
import SeoList from "../components/seo/SeoList.vue";

// 頁級 SEO
import { useHead } from "@unhead/vue";

// 分享圖建議放 public/og/seo.jpg（1200×630）；沒有時會吃 App.vue 的預設 OG
const SITE_URL = import.meta.env.VITE_SITE_URL;
const SEO_OG = `${SITE_URL}/og/seo.jpg`;

// 說明：canonical 與 og:url 已由 App.vue 動態產生，這裡只設定頁面特有的內容
useHead({
  // 標題（App.vue 的 titleTemplate 會自動加上「｜前端匠作」）
  title: "SEO 策略指南與實戰教學",

  // SERP 描述（110–160 字）
  meta: [
    {
      name: "description",
      content:
        "SEO 策略指南：新手入門到進階，涵蓋關鍵字研究、技術 SEO、內容優化與成效追蹤。提供實作範例與工具建議，協助你穩定提升自然流量與轉換。",
    },

    // Open Graph / Twitter（列表頁專屬分享訊息）
    { property: "og:title", content: "SEO 策略指南與實戰教學｜前端匠作" },
    {
      property: "og:description",
      content:
        "關鍵字研究、技術 SEO、內容與內部連結的完整做法，附工具與檢核清單，幫你把 SEO 做對做滿。",
    },
    { property: "og:image", content: SEO_OG },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "SEO 策略指南與實戰教學｜前端匠作" },
    {
      name: "twitter:description",
      content: "完整 SEO 實戰：關鍵字研究、技術最佳化、內容策略與量測追蹤。",
    },
    { name: "twitter:image", content: SEO_OG },
  ],

  // JSON-LD（麵包屑 + 列表頁結構）
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "首頁",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "SEO 策略指南",
            item: `${SITE_URL}/seo`,
          },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "SEO 策略指南",
        description:
          "收錄 SEO 教學與實戰文章，包含關鍵字研究、技術 SEO、內容優化與追蹤量測。",
        isPartOf: {
          "@type": "WebSite",
          name: import.meta.env.VITE_SITE_NAME,
          url: SITE_URL,
        },
      }),
    },
  ],
});
</script>
