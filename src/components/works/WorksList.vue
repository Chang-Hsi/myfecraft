<!-- src/components/WorksList.vue -->
<template>
  <div class="w-full bg-white">
    <div class="mx-auto py-10" :style="containerStyle">
      <div class="mb-6 flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
        <button
          v-for="t in tabs"
          :key="t.value"
          @click="selectType(t.value)"
          :class="[
            // 移除 mx-auto
            'px-4 py-2 rounded-full border transition',
            activeType === t.value
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ t.label }}
        </button>
      </div>

      <div class="my-12 flex justify-center">
        <Paginator
          :rows="rows"
          :first="first"
          :totalRecords="totalRecords"
          @page="onPage"
          class="w-full md:w-auto"
        />
      </div>

      <masonry-wall :items="pagedItems" :column-width="columnWidth" :gap="gap">
        <template #default="{ item, index }">
          <motion.div
            :initial="{ y: 12, opacity: 0 }"
            :while-in-view="fadeInUp(index)"
            :inViewOptions="{ once: true, margin: '100px 0px -10% 0px' }"
            class="mb-4 w-full overflow-hidden rounded-2xl ring-1 ring-black/5 group"
          >
            <div class="w-full" :style="{ aspectRatio: item.ratio }">
              <img
                :src="item.src"
                :alt="`圖 ${index + 1}`"
                class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-150"
                loading="lazy"
              />
            </div>
          </motion.div>
        </template>
      </masonry-wall>

      <div class="my-12 flex justify-center">
        <Paginator
          :rows="rows"
          :first="first"
          :totalRecords="totalRecords"
          @page="onPage"
          class="w-full md:w-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { motion } from "motion-v";
import Paginator from "primevue/paginator";
import { usePhotoWallStore } from "@/stores/works.js";
import { storeToRefs } from "pinia";

const photoStore = usePhotoWallStore();

const columnWidth = 300; // ← 視覺需要可改 300~340 之間
const gap = 16; // 欄間距（也可改 16 看起來更透氣）

// 讓容器寬度吃視窗，最多不超過 1400px；masonry 會依容器寬自動決定欄數
const containerStyle = computed(() => ({
  width: "min(94vw, 1400px)",
}));

/* tabs */
const tabs = [
  { label: "全部作品", value: "all" },
  { label: "前台網站專案", value: "web" },
  { label: "後台控制系統", value: "dev" },
  { label: "客製化APP方案", value: "app" },
  { label: "POS機操作介面", value: "pos" },
];
const activeType = ref("all");

/* 進場動畫（保留原邏輯） */
const fadeInUp = (i) => ({
  y: 0,
  opacity: 1,
  transition: {
    duration: 0.3,
    delay: i * 0.03,
    scale: { type: "spring", visualDuration: 0.6, bounce: 0.6 },
  },
});

const { items } = storeToRefs(photoStore);

/* 過濾 + 分頁 */
const filteredItems = computed(() =>
  activeType.value === "all"
    ? items.value
    : items.value.filter((i) => i.type === activeType.value)
);

const first = ref(0);

/* 建議把每頁數改成 4 的倍數（例如 20 或 24），版面會更齊整 */
const rows = ref(20); // ← 例如 5 列 * 4 欄 = 20
const totalRecords = computed(() => filteredItems.value.length);
const pagedItems = computed(() =>
  filteredItems.value.slice(first.value, first.value + rows.value)
);

function onPage(e) {
  first.value = e.first;
  rows.value = e.rows;
}

function selectType(value) {
  activeType.value = value;
  first.value = 0;
}
</script>

<style scoped>
/* 圓形頁碼按鈕外觀 */
:deep(.p-paginator .p-paginator-page) {
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  line-height: 40px; /* 讓數字置中 */
  border: 1px solid #e5e7eb; /* #e5e7eb = gray-200 */
  color: #6b7280; /* gray-500 */
  background: #fff;
}

/* Hover 狀態 */
:deep(.p-paginator .p-paginator-page:hover) {
  background: #f3f4f6; /* gray-100 */
  color: #111827; /* gray-900 */
}

/* 被選中（黑底白字）— 同時相容 data-p-highlight 與 aria-current 寫法 */
:deep(.p-paginator .p-paginator-page[data-p-highlight="true"]),
:deep(.p-paginator .p-paginator-page[aria-current="page"]) {
  background: #0a0a0a !important; /* 黑 */
  color: #fff !important; /* 白 */
  border-color: transparent;
}

/* 兩側的上一頁/下一頁/第一頁/最後頁，也改成黑白系 */
:deep(.p-paginator .p-paginator-first),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-last) {
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  color: #9ca3af; /* gray-400 */
}
:deep(.p-paginator .p-paginator-first:hover),
:deep(.p-paginator .p-paginator-prev:hover),
:deep(.p-paginator .p-paginator-next:hover),
:deep(.p-paginator .p-paginator-last:hover) {
  background: #f3f4f6; /* gray-100 */
  color: #111827; /* gray-900 */
}

/* 每頁筆數下拉的外框也用灰色系 */
:deep(.p-paginator .p-dropdown) {
  border-color: #e5e7eb; /* gray-200 */
  border-radius: 12px;
}
</style>
