<!-- src/views/Works.vue -->
<template>
  <div>
    <WorksBanner />
    <WorksList />
  </div>
</template>

<script setup>
// 原有組件
import WorksBanner from "../components/works/WorksBanner.vue";
import WorksList from "../components/works/WorksList.vue";

// 頁級 SEO
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

// 說明：建議放一張列表頁分享圖 public/og/works.jpg（1200×630）
const SITE_URL = import.meta.env.VITE_SITE_URL;
const WORKS_OG = `${SITE_URL}/og/works.jpg`;

// 若你用 query 來切換類別（例如 ?cat=frontend/admin/app/pos），以下會自動帶入標題
const route = useRoute();
const catMap = {
  all: "全部作品",
  frontend: "前台網站專案",
  admin: "後台控制系統",
  app: "客製化 APP 方案",
  pos: "POS 機操作介面",
};
const cat = computed(() => String(route.query.cat || "all"));
const catLabel = computed(() => catMap[cat.value] || "全部作品");

// 標題與描述（App.vue 的 titleTemplate 會自動加上「｜前端匠作」）
const pageTitle = computed(() =>
  cat.value === "all" ? "網頁設計作品集" : `網頁設計作品集｜${catLabel.value}`
);
const pageDesc = computed(
  () =>
    `展示各類型網站設計成果：${Object.values(catMap).join(
      "、"
    )}。注重可維運、效能與實際上線品質，協助你在時程與預算內完成高品質作品。`
);

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDesc },

    // 分享訊息（可被各單頁覆寫）
    { property: "og:title", content: computed(() => `${pageTitle.value}｜前端匠作`) },
    { property: "og:description", content: pageDesc },
    { property: "og:image", content: WORKS_OG },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: computed(() => `${pageTitle.value}｜前端匠作`) },
    { name: "twitter:description", content: pageDesc },
    { name: "twitter:image", content: WORKS_OG },
  ],

  // JSON-LD：麵包屑 + 集合頁
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "作品集", item: `${SITE_URL}/works` },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: pageTitle.value,
        description: pageDesc.value,
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
