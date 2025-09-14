<template>
  <section class="w-full bg-white">
    <div class="mx-auto max-w-5xl px-4 py-8 md:py-10">
      <ul>
        <li
          v-for="(p, i) in posts"
          :key="p.id || i"
          class="border-b border-gray-200 last:border-b-0"
        >
          <div
            v-motion-fade-visible-once
            :delay="i * 70"
            :duration="450"
            class="py-6 space-y-4"
          >
            <!-- 上區塊：分類 + 日期（單獨一行） -->
            <div class="mb-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span class="inline-flex items-center gap-1">
                <!-- 類別 icon -->
                <img src="../../assets/img/logo.png" class="w-[25px]" alt="" />
                {{ p.category }}
              </span>
              <span class="h-1 w-1 rounded-full bg-gray-300"></span>
              <span class="inline-flex items-center gap-1">
                <!-- 日曆 icon -->
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M16 2v3M8 2v3M3 9h18M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ p.date }}
              </span>
            </div>

            <!-- 下區塊：左=標題+摘要；右=固定寬高縮圖 -->
            <div class="flex gap-10">
              <!-- 左區塊 -->
              <div class="">
                <h3
                  class="mb-3 text-2xl font-bold leading-snug text-gray-900 md:text-[28px]"
                >
                  {{ p.title }}
                </h3>
                <p
                  class="text-gray-600 leading-relaxed md:text-lg md:leading-8 line-clamp-2"
                >
                  {{ p.excerpt }}
                </p>
              </div>

              <!-- 右區塊：固定寬(300px) + 16:9 -->
              <div
                class="shrink-0 w-[300px] h-[170px] overflow-hidden rounded-xl bg-gray-100 shadow-sm group"
              >
                <img
                  :src="p.cover"
                  :alt="p.title"
                  class="h-full w-full object-cover origin-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.18]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const posts = ref([
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
  {
    id: 1,
    category: "MyFeCraft",
    date: "2025/07/15",
    title: "網頁設計輕鬆上手：免費與付費方案完全指南",
    excerpt:
      "本指南會先介紹網站設計的流程，涵蓋從設計到開發上線的各階段重點，並比較常見的付費與免費方案優缺點與選擇建議。",
    cover: "https://www.nsc.tw/upload/images/20250807065726q2rvy.webp",
  },
  {
    id: 2,
    category: "MyFeCraft",
    date: "2025/07/11",
    title: "網頁設計 vs. 網頁開發：初學者必知的角色差異",
    excerpt:
      "設計與開發雖常被混為一談，但職能與技能重點不同。本文用淺顯方式解析兩者分工與合作關係，避免常見誤解。",
    cover: "https://www.iware.com.tw/upload/images/designer_programmer_01.png",
  },
  {
    id: 3,
    category: "MyFeCraft",
    date: "2025/07/10",
    title: "老闆做網站必看：免費平台 vs 設計公司完整比較",
    excerpt:
      "從成本、彈性、維護、SEO 與擴充性等面向比較兩種建站方式，提供決策時的評估清單與風險提醒。",
    cover: "https://www.nsc.tw/upload/images/20250714011536qpjqi.webp",
  },
]);
</script>

<style scoped></style>
