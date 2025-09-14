<template>
  <div class="relative flex min-h-[80vh] w-full flex-col gap-0 items-center">
    <section
      class="relative w-full min-h-[28vh] bg-white flex items-center overflow-hidden"
    >
      <div class="marquee w-full absolute inset-x-0 bottom-0">
        <div class="marquee-track">
          <div class="marquee-loop">
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
          </div>
          <div class="marquee-loop" aria-hidden="true">
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
            <span class="marquee-item">NEW WEBSITE DESIGN</span>
          </div>
        </div>
      </div>
    </section>

    <div class="absolute inset-0 z-50 grid place-items-center">
      <div
        class="w-full md:w-[86vw] lg:w-[70vw] xl:w-[56vw] max-w-7xl min-h-[50vh] bg-transparent transform translate-y-0 px-4 sm:px-6"
      >
        <div class="flex items-center justify-center gap-8 lg:gap-16">
          <!-- 手機輪播區塊（寬度不足時直接隱藏，避免擠壓文字） -->
          <div
            class="relative hidden lg:inline-block w-[460px] xl:w-[560px] 2xl:w-[660px]"
          >
            <img :src="layoutSrc" class="invisible block w-full h-auto select-none" />
            <img
              :src="imgs[aIdx]"
              class="absolute inset-0 w-full h-auto transition-opacity duration-200 ease-linear select-none"
              :class="active === 'a' ? 'opacity-100' : 'opacity-0'"
              alt="phone_bg_a"
            />
            <img
              :src="imgs[bIdx]"
              class="absolute inset-0 w-full h-auto transition-opacity duration-200 ease-linear select-none"
              :class="active === 'b' ? 'opacity-100' : 'opacity-0'"
              alt="phone_bg_b"
            />
          </div>

          <!-- 文字區塊（小螢幕自動縮小字級與按鈕尺寸） -->
          <div class="flex w-full max-w-[720px] flex-col lg:pl-6 xl:pl-12 pt-10 lg:pt-16">
            <div>
              <button
                class="inline-flex items-center rounded-full bg-rose-700 text-white px-5 py-3 text-base sm:px-6 sm:py-3.5 sm:text-lg lg:px-7 lg:py-3.5 lg:text-xl xl:px-8 xl:py-4 xl:text-2xl"
              >
                查看更多作品
              </button>
            </div>

            <div class="w-full">
              <div
                class="pt-10 sm:pt-12 lg:pt-16 text-gray-900 font-semibold leading-tight text-2xl sm:text-3xl lg:text-4xl"
              >
                讓MyFeCraft設計
              </div>

              <div
                class="mt-1 font-extrabold text-gray-900 leading-tight tracking-tight text-3xl sm:text-5xl lg:text-6xl"
              >
                您網站的
                <span class="text-rose-800">最佳後盾</span>
              </div>

              <div
                class="mt-4 font-bold text-gray-400 leading-relaxed text-base sm:text-lg lg:text-xl"
              >
                從初期的網站企劃、功能評估，<br class="hidden sm:block" />
                到專案完成後的長期服務支援，我們始終以五星品質，陪伴您的每一步！
              </div>

              <div
                class="mt-3 text-amber-300 tracking-tight text-right text-2xl sm:text-3xl lg:text-4xl"
              >
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// RWD 規則（說明放在這裡，避免在 <template> 內加註解）
// - 手機輪播：hidden lg:inline-block → 只有 ≥1024px 顯示，寬度不足時自動隱藏，釋放空間給文字。
// - 文字與按鈕：用 Tailwind 響應式字級（base→lg→xl→2xl 等）與 padding 漸進縮放，避免擠壓換行。
// - 外層寬度：w-full → md:w-[86vw] → lg:w-[70vw] → xl:w-[56vw]，並設 max-w-7xl；搭配左右 padding 確保視覺舒適。

import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import iphone_bg3 from "@/assets/img/iphone_bg3.png";
import iphone_bg4 from "@/assets/img/iphone_bg4.png";
import iphone_bg6 from "@/assets/img/iphone_bg6.png";

const imgs = [iphone_bg3, iphone_bg4, iphone_bg6];

const aIdx = ref(0);
const bIdx = ref(1);
const active = ref("a"); // 'a' 或 'b'：顯示哪一層
const layoutSrc = computed(() =>
  active.value === "a" ? imgs[aIdx.value] : imgs[bIdx.value]
);

let timer = null;

onMounted(() => {
  imgs.forEach((src) => {
    const im = new Image();
    im.src = src;
  });
  timer = setInterval(next, 5000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

function next() {
  if (active.value === "a") {
    bIdx.value = (aIdx.value + 1) % imgs.length;
    active.value = "b";
  } else {
    aIdx.value = (bIdx.value + 1) % imgs.length;
    active.value = "a";
  }
}
</script>

<style scoped>
.marquee {
  overflow: hidden;
  bottom: -20px;
  --gap: 3rem;
  --speed: 55s;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-left var(--speed) linear infinite;
}
.marquee-loop {
  display: flex;
  gap: var(--gap);
}
.marquee-item {
  color: #f3f4f6;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  line-height: 1;
  font-size: clamp(40px, 10vw, 160px);
  white-space: nowrap;
  user-select: none;
}
@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* 保持既有淡入淡出的設定 */
.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.1s linear;
}
.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

img[alt^="phone_bg_"] {
  will-change: opacity;
  backface-visibility: hidden;
}
</style>
