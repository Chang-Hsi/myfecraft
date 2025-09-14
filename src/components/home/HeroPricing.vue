<!-- src/components/home/HeroPricing.vue -->
<template>
  <div class="flex flex-col items-center justify-center gap-6 py-14 md:py-28">
    <motion.h1
      :initial="{ y: 20, opacity: 0 }"
      :while-in-view="{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          scale: { type: 'spring', visualDuration: 0.8, bounce: 0.5 },
        },
      }"
      :whileHover="{ scale: 1.03, transition: { duration: 0.5 } }"
      :in-view-options="{ margin: '50px 0px -50px 0px' }"
      class="cursor-default text-center text-3xl sm:text-4xl md:text-6xl font-bold tracking-widest px-4"
    >
      <span class="text-rose-700">全方位</span>網頁設計夥伴
      <div class="text-lg sm:text-xl md:text-2xl py-6 md:py-8 text-gray-500">
        精準規劃與高效執行，幫助您把每一分預算發揮到最大效益
      </div>
    </motion.h1>

    <div class="w-full">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-6 md:gap-8"
        >
          <motion.div
            v-for="(item, index) in aboutCards"
            :key="index"
            :initial="{ scale: 0.96, opacity: 0 }"
            :while-in-view="{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.3,
                scale: { type: 'spring', visualDuration: 0.8, bounce: 0.5 },
                delay: 0.1 + index * 0.05,
              },
            }"
            :whileHover="{ scale: 1.02, transition: { duration: 0.3 } }"
            :in-view-options="{ margin: '50px 0px -50px 0px' }"
            class="relative h-full md:hover:scale-[1.02] hover:z-10 transition-transform"
          >
            <div
              class="h-full w-full rounded-3xl bg-white p-6 sm:p-7 md:p-8 shadow-xl ring-1 ring-black/5 flex flex-col"
            >
              <div
                class="text-center text-2xl sm:text-3xl font-extrabold"
                :style="{ color: item.color }"
              >
                {{ item.title }}
              </div>

              <div class="mt-1 text-center font-semibold text-gray-500">
                {{ item.subtitle }}
              </div>

              <div class="my-4 h-px bg-gray-200"></div>

              <div
                class="text-center text-sm sm:text-base leading-6 text-gray-600 space-y-1"
              >
                <div>{{ item.desc1 }}</div>
                <div>{{ item.desc2 }}</div>
              </div>

              <div class="flex-1"></div>

              <div class="my-4 h-px bg-gray-200"></div>

              <button
                class="w-full rounded-full py-3 font-semibold text-white shadow-sm transition active:translate-y-[1px] hover:shadow focus:outline-none focus:ring-2"
                :style="{ backgroundColor: item.color, '--tw-ring-color': item.color }"
              >
                方案介紹說明
              </button>

              <button
                class="mt-3 w-full rounded-full bg-gray-100 py-3 font-semibold text-gray-400 shadow-sm cursor-not-allowed"
              >
                查看方案作品
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 調整說明（避免在 <template> 內放註解）：
// 1) 移除固定寬度 w-[60vw] 與卡片 w-[280px]，改成容器 max-w-7xl，自適應不重疊。
// 2) 網格使用 repeat(auto-fit, minmax(260px, 1fr))，每張卡片最小 260px，不足就自動換行；間距使用 gap-6/8。
// 3) 卡片本體改為 h-full + flex flex-col，並在文案區後放入 <div class="flex-1"> 撐開，確保各卡等高、按鈕貼底。
// 4) 放大效果限制在 md+（md:hover:scale），再加 hover:z-10，避免放大時壓住鄰卡造成「視覺重疊」。

import { ref } from "vue";
import { motion } from "motion-v";

const aboutCards = ref([
  {
    title: "$8,800",
    subtitle: "8800超值方案",
    desc1: "#最熱銷方案 #最高CP值",
    desc2: "#版型最多 #功能最靈活",
    color: "#d05353",
  },
  {
    title: "$45,000",
    subtitle: "模組購物車方案",
    desc1: "#多功能 #和平台抽成掰掰 #",
    desc2: "電商網 #最豐富金物流商",
    color: "#49a6bb",
  },
  {
    title: "$45,000",
    subtitle: "半客製形象網站方案",
    desc1: "#有需要再加購 #半客製化 #",
    desc2: "產業強化 #手機介面升級",
    color: "#438cc0",
  },
  {
    title: "依功能報價",
    subtitle: "客製化網站專案",
    desc1: "#量身打造 #產業策略企劃 #",
    desc2: "網頁系統規劃 #特規功能",
    color: "#5470bb",
  },
]);
</script>
