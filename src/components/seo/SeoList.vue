<template>
  <section class="w-full bg-white">
    <div class="mx-auto max-w-5xl px-4 py-8 md:py-10">
      <ul>
        <li
          v-for="(p, i) in posts"
          :key="p.id || i"
          class="border-b border-gray-200 last:border-b-0"
          @click="$router.push({ name: 'seo-detail', params: { id: p.id } })"
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
import { storeToRefs } from "pinia";
import { useSeoStore } from "@/stores/seo";

const seoStore = useSeoStore();
const { posts } = storeToRefs(seoStore);
</script>

<style scoped></style>
