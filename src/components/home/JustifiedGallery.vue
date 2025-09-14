<template>
  <!-- 外層根容器 -->
  <div ref="root" class="w-full" :data-pause="pauseOnHover">
    <!-- autoScroll=false：靜態呈現 -->
    <div
      v-if="!autoScroll"
      class="relative overflow-hidden"
      :style="{ height: containerHeightUsed + 'px' }"
    >
      <div
        v-for="(box, i) in geometry.boxes"
        :key="`s-${i}`"
        class="absolute overflow-hidden rounded-2xl ring-1 ring-black/5"
        :style="{
          width: box.width + 'px',
          height: box.height + 'px',
          transform: `translate(${box.left}px, ${box.top}px)`,
        }"
      >
        <img
          :src="photos[i]?.src"
          :alt="photos[i]?.alt || ''"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- autoScroll=true：循環滾動 -->
    <div v-else class="overflow-hidden" :style="{ height: containerHeightUsed + 'px' }">
      <div
        :key="animationKey"
        class="jg-ticker flex"
        :style="{
          '--w': containerWidth + 'px',
          '--duration': duration + 's',
          'animation-play-state': prefersReducedMotion ? 'paused' : undefined,
        }"
      >
        <div
          v-for="page in 2"
          :key="page"
          class="relative shrink-0"
          :style="{
            width: containerWidth + 'px',
            height: containerHeightUsed + 'px',
          }"
        >
          <div
            v-for="(box, i) in geometry.boxes"
            :key="`${page}-${i}`"
            class="absolute overflow-hidden rounded-2xl ring-1 ring-black/5"
            :style="{
              width: box.width + 'px',
              height: box.height + 'px',
              transform: `translate(${box.left}px, ${box.top}px)`,
            }"
          >
            <img
              :src="photos[i]?.src"
              :alt="photos[i]?.alt || ''"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 不在 <template> 內加註解：這裡說明改動要點
// 1) 新增 props.fixedHeight（Number|null），若有值則鎖定容器高度為此值。
// 2) 靜態與滾動兩種模式都改用 containerHeightUsed（fixedHeight 優先，否則使用幾何計算高度）。
// 3) 為靜態模式外層加上 overflow-hidden，當寬度變小導致列數增加時，多出的列不會把高度撐高。

import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import justifiedLayout from "justified-layout";

const props = defineProps({
  photos: { type: Array, required: true }, // [{ src, w, h, alt? }, ...]
  rowHeight: { type: Number, default: 220 },
  spacing: { type: Number, default: 12 },
  forceRatio: { type: [Boolean, Number], default: false },
  showWidows: { type: Boolean, default: true },

  // 自動滾動
  autoScroll: { type: Boolean, default: false },
  pxPerSecond: { type: Number, default: 24 },
  pauseOnHover: { type: Boolean, default: true },

  // ★ 新增：固定高度（像素）。給數字就鎖定高度；不給則維持原本自適應高度。
  fixedHeight: { type: [Number, null], default: null },
});

const root = ref(null);
const geometry = ref({ boxes: [], containerHeight: 0 });
const containerWidth = ref(0);
const animationKey = ref(0);
const prefersReducedMotion = ref(false);

// 固定高度 or 幾何高度（二擇一）
const containerHeightUsed = computed(() => {
  if (typeof props.fixedHeight === "number" && props.fixedHeight > 0) {
    return props.fixedHeight;
  }
  return geometry.value.containerHeight || 0;
});

// 從 photos 取得寬高比
const ratios = computed(() => props.photos.map((p) => (p?.w && p?.h ? p.w / p.h : 1)));

// 計算幾何資訊
const compute = () => {
  const el = root.value;
  if (!el) return;
  const w = Math.max(0, Math.floor(el.clientWidth));
  containerWidth.value = w;

  const g = justifiedLayout(ratios.value, {
    containerWidth: w,
    containerPadding: 0,
    boxSpacing: { horizontal: props.spacing, vertical: props.spacing },
    targetRowHeight: props.rowHeight,
    targetRowHeightTolerance: 0.25,
    forceAspectRatio: props.forceRatio,
    showWidows: props.showWidows,
  });

  geometry.value = g;

  // 每次尺寸變化重啟動畫，避免位移接縫
  animationKey.value++;
};

// 動畫圈數時間（距離 ÷ 速度）
const duration = computed(() => {
  if (!props.autoScroll || !containerWidth.value || props.pxPerSecond <= 0) return 0;
  return +(containerWidth.value / props.pxPerSecond).toFixed(2);
});

let ro;
onMounted(() => {
  compute();
  ro = new ResizeObserver(() => compute());
  ro.observe(root.value);

  const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const updateMotion = () => (prefersReducedMotion.value = !!m?.matches);
  try {
    updateMotion();
    m?.addEventListener?.("change", updateMotion);
  } catch {
    /* older Safari 無 addEventListener */
  }
});

watch(
  () => [
    props.photos,
    props.rowHeight,
    props.spacing,
    props.forceRatio,
    props.showWidows,
  ],
  () => compute(),
  { deep: true }
);

onBeforeUnmount(() => {
  if (ro) ro.disconnect();
});
</script>

<style scoped>
/* 循環滾動動畫（位移距離與時間由 CSS 變數控制） */
.jg-ticker {
  width: calc(var(--w, 0px) * 2);
  will-change: transform;
  animation-name: jg-scroll-left;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: var(--duration, 60s);
}

[data-pause="true"] .jg-ticker:hover {
  animation-play-state: paused;
}

@keyframes jg-scroll-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-1 * var(--w)));
  }
}
</style>
