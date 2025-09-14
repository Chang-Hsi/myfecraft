<!-- src/views/SeoDetail.vue -->
<template>
  <div>
    <SeoBanner />
    <SeoArticle />
  </div>
</template>

<script setup>
import SeoArticle from "../components/seo/SeoArticle.vue";
import SeoBanner from "../components/seo/SeoBanner.vue";
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useSeoStore } from "@/stores/seo";

const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

const route = useRoute();
const store = useSeoStore();
const id = computed(() => String(route.params.id || ""));

// 文章資料（title / excerpt / cover / date 來自 Pinia）
const post = computed(() => store.byId(id.value));

// Fallback：若資料缺少，給保底值
const title = computed(() => post.value?.title || "SEO 文章");
const description = computed(
  () => post.value?.excerpt || "SEO 策略與實戰教學，從關鍵字研究到技術最佳化。"
);
const image = computed(
  // 建議準備 /og/seo-default.jpg 當通用分享圖
  () => post.value?.cover || `${SITE_URL}/og/seo.jpg`
);
const pageUrl = computed(() => `${SITE_URL}/seo/${id.value}`);

// 將 2025/07/15 → 2025-07-15（ISO）
function toISO(d) {
  if (!d) return undefined;
  const [y, m, day] = String(d).split(/[./-]/).map(Number);
  const dt = new Date(y, (m || 1) - 1, day || 1);
  return isNaN(dt.getTime()) ? undefined : dt.toISOString().slice(0, 10);
}
const datePublished = computed(() => toISO(post.value?.date));
const dateModified = computed(() => toISO(post.value?.updated || post.value?.date));

useHead({
  // 標題會經由 App.vue 的 titleTemplate 自動加上「｜前端匠作」
  title,
  meta: [
    { name: "description", content: description },

    // Open Graph / Twitter（文章頁建議指定 og:type=article）
    { property: "og:type", content: "article" },
    { property: "og:title", content: computed(() => `${title.value}｜${SITE_NAME}`) },
    { property: "og:description", content: description },
    { property: "og:image", content: image },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: computed(() => `${title.value}｜${SITE_NAME}`) },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    // Article 補充欄位
    { property: "article:published_time", content: datePublished },
    { property: "article:modified_time", content: dateModified },
    { property: "article:section", content: "SEO" },
  ],

  // JSON-LD（Breadcrumb + Article）
  script: [
    {
      type: "application/ld+json",
      children: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "SEO 策略指南",
              item: `${SITE_URL}/seo`,
            },
            { "@type": "ListItem", position: 3, name: title.value, item: pageUrl.value },
          ],
        })
      ),
    },
    {
      type: "application/ld+json",
      children: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title.value,
          description: description.value,
          image: [image.value],
          datePublished: datePublished.value,
          dateModified: dateModified.value,
          author: [{ "@type": "Organization", name: SITE_NAME }],
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/LOGO.png` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl.value },
        })
      ),
    },
  ],
});

// 找不到文章時，避免索引
if (!post.value) {
  useHead({ meta: [{ name: "robots", content: "noindex,nofollow" }] });
}
</script>
