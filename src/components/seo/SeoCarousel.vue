<template>
  <section class="w-full bg-white h-[60vh]">
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-4"
    >
      <span
        v-for="t in tags"
        :key="t"
        class="py-10 cursor-pointer select-none text-xl text-black hover:text-rose-700"
      >
        <span class="text-rose-700"># </span>

        {{ t }}
      </span>
    </div>

    <!-- 輪播區 -->
    <div class="relative mx-auto max-w-7xl px-4">
      <div
        class="relative overflow-visible rounded-[36px] bg-gray-100 px-4 py-8 md:px-8 md:py-12"
      >
        <h2 class="mb-6 text-center text-2xl text-black font-semibold md:text-3xl">
          <span class="text-rose-700">精選</span>文章
        </h2>

        <!-- 自訂左右箭頭 -->
        <button
          ref="prevEl"
          aria-label="上一張"
          class="nav-btn absolute left-[-18px] top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 hover:bg-rose-700 text-white shadow-lg transition hover:brightness-110 md:left-[-22px]"
        >
          <!-- 左箭頭 SVG -->
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          ref="nextEl"
          aria-label="下一張"
          class="nav-btn absolute right-[-18px] top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 hover:bg-rose-700 text-white shadow-lg transition hover:brightness-110 md:right-[-22px]"
        >
          <!-- 右箭頭 SVG -->
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Swiper -->
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="breakpoints"
          :navigation="{ prevEl: prevEl, nextEl: nextEl }"
          :loop="true"
          @before-init="onBeforeInit"
        >
          <SwiperSlide v-for="(p, i) in posts" :key="i">
            <article class="overflow-hidden rounded-2xl">
              <div class="aspect-[16/9] overflow-hidden">
                <img
                  :src="p.img"
                  :alt="p.title"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-125"
                />
              </div>
              <div class="p-5 md:p-6">
                <h3 class="mb-2 text-xl font-bold leading-snug text-gray-900 md:text-2xl">
                  {{ p.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ p.excerpt }}
                </p>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
/* 需求重點：
   - v-motion：頂部標籤淡入
   - Swiper：3 欄卡片輪播 + 自訂左右圓形箭頭
   - 圖片與文字你可自行替換 posts 陣列
*/
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";

const tags = ["SEO初學者指南", "SEO技術相關", "SEO關鍵字研究", "Google相關資訊"];

const posts = ref([
  {
    img:
      "https://www.da-vinci.com.tw/uploads/images/20275395a4d4726b38f9daafa67ffce7.jpg",
    title: "SEO初學者教學，搞懂SEO讓你網站訂單接不完",
    excerpt: "從零開始學SEO，掌握基礎觀念與實作技巧，讓網站流量暴增，訂單源源不絕。",
  },
  {
    img: "https://www.nsc.tw/upload/images/20250602031919xvx6d.png",
    title: "新手必讀的 SEO 優化完整指南",
    excerpt: "完整的SEO優化教學，帶你從入門到進階，快速提升網站曝光率與搜尋排名。",
  },
  {
    img: "https://frankknow.com/wp-content/uploads/2025/03/SEO-Keyword-Ranking.jpg",
    title: "掌握Google搜尋演算法，提升搜尋排名的秘訣",
    excerpt: "解析Google搜尋演算法，學會實用策略與秘訣，讓你的網站脫穎而出。",
  },
  {
    img: "https://frankknow.com/wp-content/uploads/2025/07/What-Is-GEO.jpg",
    title: "GEO是什麼？和SEO有什麼不同？",
    excerpt: "搞懂GEO與SEO的差異與應用場景，選對策略，幫助企業快速達成行銷目標。",
  },
]);

/* 自訂左右箭頭元素 */
const prevEl = ref(null);
const nextEl = ref(null);
const onBeforeInit = (swiper) => {
  swiper.params.navigation.prevEl = prevEl.value;
  swiper.params.navigation.nextEl = nextEl.value;
  swiper.navigation.init();
  swiper.navigation.update();
};

/* RWD：手機1張、平板2張、桌機3張 */
const breakpoints = {
  768: { slidesPerView: 2, spaceBetween: 24 },
  1024: { slidesPerView: 3, spaceBetween: 28 },
};
</script>

<style scoped>
/* 讓卡片與灰底之間留點呼吸 */
:deep(.swiper) {
  padding: 0.25rem;
}
</style>
