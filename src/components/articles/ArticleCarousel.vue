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

const tags = [
  "網頁設計新手指南",
  "網頁設計技術實作",
  "網頁設計實戰技巧",
  "網頁設計新觀點",
];

const posts = ref([
  {
    img: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
    title: "網站設計與網站開發是不同的，你知道嗎？",
    excerpt: "設計與開發看似相似，實際卻大不同。了解兩者差異，才能打造專業又實用的網站。",
  },
  {
    img: "https://www.iware.com.tw/upload/images/301.jpg",
    title: "網站用戶界面設計的4條重要規則",
    excerpt:
      "良好的用戶體驗來自細節。掌握四大界面設計規則，提升網站的專業感與操作流暢度。",
  },
  {
    img: "https://www.iware.com.tw/upload/images/website_redo_1.jpg",
    title: "企業網站設計是如何設計產品頁面",
    excerpt: "產品頁面是銷售關鍵。從排版到資訊呈現，掌握設計技巧，讓你的產品更具吸引力。",
  },
  {
    img: "https://www.iware.com.tw/upload/images/256.jpg",
    title: "關於我們頁面內容創建指南",
    excerpt:
      "好的『關於我們』能贏得信任。學習如何寫出真誠、專業的內容，展現品牌的核心價值。",
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
