<!-- src/components/ParallaxHero.vue -->
<template>
  <section ref="sectionRef" class="relative h-[70vh] overflow-hidden bg-white">
    <img
      src="@/assets/img/Parallax_bg.gif"
      alt="視差圖背景圖片"
      class="absolute inset-0 w-full h-full object-cover"
      :style="imgStyle"
    />
    <div
      class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <h1
        class="font-extrabold text-black/80 leading-none select-none whitespace-nowrap text-[clamp(40px,10vw,160px)]"
      >
        1+1 = ∞
      </h1>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const sectionRef = ref(null);
const y = ref(0);

/* 視差速度（建議 0.15 ~ 0.4） */
const SPEED = 0.4;

/* 更新位移（區塊相對視窗頂部的位置） */
const update = () => {
  const el = sectionRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  y.value = rect.top * SPEED;
};

onMounted(() => {
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", update);
  window.removeEventListener("resize", update);
});

/* 背景圖位移 + 微放大避免邊緣露白 */
const imgStyle = computed(() => ({
  transform: `translateY(${y.value}px) scale(1.05)`,
  willChange: "transform",
  transition: "transform 0.02s linear",
}));
</script>

<style scoped>
/* 提升硬體加速穩定性（特別是 iOS Safari） */
img {
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* 若背景過亮可開啟下方陰影提升可讀性（預設關閉） */
/*
h1 {
  text-shadow: 0 2px 12px rgba(0,0,0,.18);
}
*/
</style>
