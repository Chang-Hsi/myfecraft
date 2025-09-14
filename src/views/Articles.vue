<!-- src/views/Articles.vue -->
<template>
  <div>
    <ArticleBanner />
    <ArticleCarousel />
    <ArticleList />
  </div>
</template>

<script setup>
import ArticleBanner from "../components/articles/ArticleBanner.vue";
import ArticleCarousel from "../components/articles/ArticleCarousel.vue";
import ArticleList from "../components/articles/ArticleList.vue";

// 頁級 SEO
import { useHead } from "@unhead/vue";

// 說明：建議放一張列表頁分享圖 public/og/articles.jpg（1200×630）
// 沒有時會吃 App.vue 的預設 OG
const SITE_URL = import.meta.env.VITE_SITE_URL;
const ARTICLES_OG = `${SITE_URL}/og/articles.jpg`;

useHead({
  // 標題（App.vue 的 titleTemplate 會自動加「｜前端匠作」）
  title: "網頁設計專欄與實戰文章",

  // SERP 描述（110–160；頁頁唯一）
  meta: [
    {
      name: "description",
      content:
        "從版面規劃、UI/UX 到前端技術實作，蒐集網頁設計的流程心法與落地技巧。提供範例與檢核清單，幫助你在時程與預算內做出好網站。",
    },

    // Open Graph / Twitter（列表頁的分享資訊）
    { property: "og:title", content: "網頁設計專欄與實戰文章｜前端匠作" },
    {
      property: "og:description",
      content:
        "版型到互動、從設計到前端實作的完整觀點與教學，一次看懂關鍵做法與選型思路。",
    },
    { property: "og:image", content: ARTICLES_OG },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "網頁設計專欄與實戰文章｜前端匠作" },
    {
      name: "twitter:description",
      content: "聚焦網頁設計與前端實戰：流程、元件化、互動與效能等主題的可落地做法。",
    },
    { name: "twitter:image", content: ARTICLES_OG },
  ],

  // 麵包屑 + 集合頁 JSON-LD（canonical/og:url 已由 App.vue 動態處理）
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
            name: "網頁設計專欄",
            item: `${SITE_URL}/articles`,
          },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "網頁設計專欄",
        description:
          "收錄網頁設計與前端實作文章：從流程、UI/UX 到效能與元件化的最佳實務。",
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
