<!-- src/views/About.vue -->
<template>
  <div>
    <AboutBanner />
    <AboutProjects />
    <AbountServices />
    <AbountTeam />
    <AbountAfter />
    <HeroContact />
  </div>
</template>

<script setup>
import AboutBanner from "../components/about/AboutBanner.vue";
import AboutProjects from "../components/about/AboutProjects.vue";
import AbountServices from "../components/about/AbountServices.vue";
import AbountTeam from "../components/about/AbountTeam.vue";
import AbountAfter from "../components/about/AbountAfter.vue";
import HeroContact from "@/components/home/HeroContact.vue";

// 新增：頁級 SEO
import { useHead } from "@unhead/vue";

const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;
const ABOUT_OG = `${SITE_URL}/og/about.jpg`;

useHead({
  // 標題由 App.vue 的 titleTemplate 自動接「｜前端匠作」
  title: "關於我們",
  meta: [
    {
      name: "description",
      content:
        "我們是前端匠作，專注網站設計與前端開發。以五星服務品質與豐富專案經驗，提供多元方案、雲端維運、SSL 憑證申請與專屬 SEO 優化，協助品牌在時程與預算內達成高品質上線。",
    },

    // 分享訊息（可依需要覆寫）
    { property: "og:title", content: `關於我們｜${SITE_NAME}` },
    {
      property: "og:description",
      content:
        "網站不只好看，更要可維運、可成長。了解我們的團隊與服務理念：策略規劃、設計體驗、技術落地與長期支援。",
    },
    { property: "og:image", content: ABOUT_OG },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `關於我們｜${SITE_NAME}` },
    {
      name: "twitter:description",
      content: "從規劃到上線、從維運到成長，成為你長期可信賴的數位夥伴。",
    },
    { name: "twitter:image", content: ABOUT_OG },
  ],

  // JSON-LD（麵包屑 + 關於頁型別）
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "關於我們",
            item: `${SITE_URL}/about`,
          },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: `關於我們｜${SITE_NAME}`,
        description: "認識前端匠作：網站設計與前端開發團隊、服務範圍與價值主張。",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        primaryImageOfPage: { "@type": "ImageObject", url: ABOUT_OG },
      }),
    },
  ],
});
</script>
