<!-- src/views/Home.vue -->
<template>
  <section>
    <HeroBanner />
    <HeroPricing />
    <HeroBrands />
    <HeroProjects />
    <HeroCards />
    <HeroParallax />
    <HeroContact />
  </section>
</template>

<script setup>
// 組件載入（原樣）
import HeroBanner from "@/components/home/HeroBanner.vue";
import HeroPricing from "@/components/home/HeroPricing.vue";
import HeroBrands from "@/components/home/HeroBrands.vue";
import HeroProjects from "@/components/home/HeroProjects.vue";
import HeroCards from "@/components/home/HeroCards.vue";
import HeroParallax from "@/components/home/HeroParallax.vue";
import HeroContact from "@/components/home/HeroContact.vue";

// 新增：頁級 SEO
import { useHead } from "@unhead/vue";

// 說明：建議把首頁分享圖放在 public/og/home.jpg
// 若暫時沒有此檔，會用 App.vue 的 DEFAULT_OG
const SITE_URL = import.meta.env.VITE_SITE_URL;
const HOME_OG = `${SITE_URL}/og/home.jpg`;

useHead({
  // 會由 App.vue 的 titleTemplate 自動加上「｜前端匠作」
  // （控制在 30–60 字內，主關鍵字置前）
  title: "全方位網頁設計與前端開發",

  // SERP 描述（110–160 字，頁頁唯一）
  meta: [
    {
      name: "description",
      content:
        "精準規劃與高效執行，嚴控時程與預算，在不增加複雜度下打造可維運的網站與後台。服務涵蓋 Vue3/Vite 開發、SEO 與效能優化、長期維運，深受 500+ 企業信賴。",
    },

    // 分享用（OG/Twitter 建議明確帶品牌）
    { property: "og:title", content: "全方位網頁設計與前端開發｜前端匠作" },
    {
      property: "og:description",
      content:
        "嚴控時程與預算，打造可維運的高品質網站與後台；Vue3/Vite、SEO、效能優化與長期維運，500+ 企業的首選夥伴。",
    },
    { property: "og:image", content: HOME_OG },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "全方位網頁設計與前端開發｜前端匠作" },
    {
      name: "twitter:description",
      content:
        "嚴控時程與預算，打造可維運的高品質網站與後台；Vue3/Vite、SEO、效能優化與長期維運。",
    },
    { name: "twitter:image", content: HOME_OG },
  ],

  // 說明：canonical 與 og:url 已由 App.vue 動態產生，這裡不用再設定
});
</script>
