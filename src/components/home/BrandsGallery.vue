<!-- src/components/BrandsGallery.vue -->
<template>
  <div ref="root" class="w-full">
    <div class="relative" :style="{ height: geometry.containerHeight + 'px' }">
      <motion.div
        v-for="(cell, i) in cells"
        :key="i"
        class="absolute overflow-hidden rounded-2xl ring-1 ring-black/5 group"
        :style="{
          width: cell.box.width + 'px',
          height: cell.box.height + 'px',
          left: cell.box.left + 'px',
          top: cell.box.top + 'px',
        }"
        :initial="{ opacity: 0, y: 16, scale: 0.98 }"
        :while-in-view="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: enterDuration, delay: cell.delay },
        }"
        :in-view-options="{ margin: '50px 0px -50px 0px' }"
        :in-view-once="true"
      >
        <img
          :src="photos[i].src"
          :alt="photos[i].alt || ''"
          class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-140"
          loading="lazy"
        />
      </motion.div>
    </div>
  </div>
</template>

<script setup>
// 變更說明：
// 1) 在卡片容器加上 .group（讓內部 img 能吃到 group-hover）
// 2) 在 img 加上 transition-transform / duration-500 / ease-out / group-hover:scale-110
//    需要更大或更小放大倍率，改成 group-hover:scale-[1.08] 之類即可。
//    想放慢一點，改 duration-700；想更順，改 ease-[cubic-bezier(0.2,0.8,0.2,1)]
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { motion } from "motion-v";
import justifiedLayout from "justified-layout";

const props = defineProps({
  photos: { type: Array, required: true },
  rowHeight: { type: Number, default: 220 },
  spacing: { type: Number, default: 12 },
  forceRatio: { type: [Boolean, Number], default: false },
  showWidows: { type: Boolean, default: true },
  rowDelay: { type: Number, default: 0.18 },
  colDelay: { type: Number, default: 0.06 },
  enterDuration: { type: Number, default: 0.45 },
});

const root = ref(null);
const geometry = ref({ boxes: [], containerHeight: 0 });
const cells = ref([]);
const enterDuration = props.enterDuration;
let ro;

const buildCells = (g) => {
  const boxes = g.boxes || [];
  const tol = Math.max(1, Math.floor(props.spacing / 2));
  const rowTops = [];
  for (const b of boxes) {
    if (!rowTops.some((t) => Math.abs(t - b.top) <= tol)) rowTops.push(b.top);
  }
  rowTops.sort((a, b) => a - b);

  const tmp = boxes.map((b, idx) => {
    const rowIndex = rowTops.findIndex((t) => Math.abs(t - b.top) <= tol);
    return { i: idx, box: b, rowIndex, left: b.left };
  });

  const rows = new Map();
  for (const it of tmp) {
    if (!rows.has(it.rowIndex)) rows.set(it.rowIndex, []);
    rows.get(it.rowIndex).push(it);
  }
  for (const arr of rows.values()) {
    arr.sort((a, b) => a.left - b.left);
    arr.forEach((it, colIndex) => (it.colIndex = colIndex));
  }

  cells.value = tmp
    .sort((a, b) => a.rowIndex - b.rowIndex || a.colIndex - b.colIndex)
    .map((it) => ({
      ...it,
      delay: it.rowIndex * props.rowDelay + it.colIndex * props.colDelay,
    }));
};

const compute = () => {
  const el = root.value;
  if (!el) return;
  const containerWidth = Math.floor(el.clientWidth);

  const ratios = props.photos.map((p) => (!p || !p.w || !p.h ? 1 : p.w / p.h));

  const g = justifiedLayout(ratios, {
    containerWidth,
    containerPadding: 0,
    boxSpacing: { horizontal: props.spacing, vertical: props.spacing },
    targetRowHeight: props.rowHeight,
    targetRowHeightTolerance: 0.25,
    forceAspectRatio: props.forceRatio,
    showWidows: props.showWidows,
  });

  geometry.value = g;
  buildCells(g);
};

onMounted(() => {
  compute();
  ro = new ResizeObserver(() => compute());
  ro.observe(root.value);
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
