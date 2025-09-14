<template>
  <section
    ref="wrapperRef"
    class="relative h-[70vh] sm:h-[78vh] md:h-[85vh] lg:h-[92vh] xl:h-screen"
  >
    <div class="sticky top-0 h-full overflow-hidden">
      <div class="absolute inset-0 z-[10] overflow-hidden">
        <img
          :src="Sky"
          alt="Sky"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          :style="skyStyle"
        />
      </div>

      <div class="absolute inset-0 z-[20] overflow-hidden">
        <div class="absolute inset-0" :style="moonStyle">
          <img
            :src="Moon"
            alt="Moon"
            class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
          <div
            class="absolute inset-0 flex items-center justify-center lg:justify-start pointer-events-none px-4 sm:px-6 lg:px-0"
          >
            <p
              class="text-black font-extrabold tracking-wide select-none text-center lg:text-left lg:whitespace-nowrap leading-[1.15] text-[clamp(24px,6vw,64px)] lg:pl-64 xl:pl-[680px]"
            >
              探索 。 網站的無限可能
            </p>
          </div>
        </div>
      </div>

      <div class="absolute inset-0 z-[40] overflow-hidden" :style="fgStyle">
        <img
          :src="Mountain"
          alt="Mountain"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
        <img
          :src="Lake"
          alt="Lake"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
      </div>

      <div class="absolute left-0 right-0 bottom-0 z-[30]" :style="bottomMaskStyle"></div>
    </div>
  </section>
</template>

<script setup>
// 變更說明：
// 1) 外層高度改為 RWD 響應（螢幕越小越短），避免壓迫下方內容。
// 2) 文字區改用 clamp 自動縮放，並在小螢幕置中、lg 以上靠左；用 lg:pl-64 / xl:pl-[680px] 微調位置。
// 3) sticky 容器改用 h-full 搭配外層 RWD 高度，視差進度仍以視窗高 state.vh 計算。

import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import Lake from "@/assets/img/Lake.png";
import Mountain from "@/assets/img/Mountain.png";
import Moon from "@/assets/img/Moon.png";
import Sky from "@/assets/img/Sky.png";

const wrapperRef = ref(null);

const speeds = reactive({
  sky: 0.08,
  moon: 0.22,
  foreground: 0.7,
});

const effectRangeRatio = 0.8;

const maskColor = "#f9fafb";
const maskBasePx = 80;
const maskGrowRatio = 0.65;

const state = reactive({
  progress: 0,
  vh: 0,
  reduceMotion: false,
});

const clampNum = (n, min, max) => Math.min(Math.max(n, min), max);

const updateProgress = () => {
  if (!wrapperRef.value) return;
  const rect = wrapperRef.value.getBoundingClientRect();
  const enteredPx = -rect.top;
  const rangePx = Math.max(1, Math.round(state.vh * effectRangeRatio));
  const scrolled = clampNum(enteredPx, 0, rangePx);
  state.progress = scrolled / rangePx;
};

let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateProgress();
    ticking = false;
  });
};
const onResize = () => {
  state.vh = window.innerHeight || document.documentElement.clientHeight;
  updateProgress();
};

onMounted(() => {
  state.vh = window.innerHeight || document.documentElement.clientHeight;
  state.reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  updateProgress();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
});

const skyStyle = computed(() => {
  const p = state.reduceMotion ? 0 : state.progress;
  const y = -p * state.vh * speeds.sky;
  return { transform: `translate3d(0, ${y}px, 0)` };
});
const moonStyle = computed(() => {
  const p = state.reduceMotion ? 0 : state.progress;
  const y = -p * state.vh * speeds.moon;
  return { transform: `translate3d(0, ${y}px, 0)` };
});
const fgStyle = computed(() => {
  const p = state.reduceMotion ? 0 : state.progress;
  const y = -p * state.vh * speeds.foreground;
  return { transform: `translate3d(0, ${y}px, 0)` };
});
const bottomMaskStyle = computed(() => {
  const p = state.reduceMotion ? 0 : state.progress;
  const grow = Math.round(p * state.vh * maskGrowRatio);
  const h = Math.max(0, maskBasePx + grow);
  return { height: `${h}px`, backgroundColor: maskColor, pointerEvents: "none" };
});
</script>

<style scoped>
img {
  will-change: transform;
}
</style>
