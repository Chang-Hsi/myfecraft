<!-- src/components/SequentialCircles.vue -->
<template>
  <div ref="wrapRef" class="py-10 px-30 flex justify-center gap-6 overflow-x-clip">
    <div class="ball relative w-[380px]">
      <img
        src="@/assets/img/RoundOutline.png"
        alt="圓形邊框 1"
        class="block w-full pointer-events-none select-none"
      />
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="text-3xl font-bold text-gray-600 leading-tight">
          <div>五星</div>
          <div>服務品質</div>
        </div>
      </div>
    </div>

    <div class="ball relative w-[380px]">
      <img
        src="@/assets/img/RoundOutline.png"
        alt="圓形邊框 2"
        class="block w-full pointer-events-none select-none"
      />
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="text-3xl font-bold text-gray-600 leading-tight">
          <div>豐富</div>
          <div>開發經驗案例</div>
        </div>
      </div>
    </div>

    <div class="ball relative w-[380px]">
      <img
        src="@/assets/img/RoundOutline.png"
        alt="圓形邊框 3"
        class="block w-full pointer-events-none select-none"
      />
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="text-3xl font-bold text-gray-600 leading-tight">
          <div>最多</div>
          <div>方案選擇</div>
        </div>
      </div>
    </div>

    <div class="ball relative w-[380px]">
      <img
        src="@/assets/img/RoundOutline.png"
        alt="圓形邊框 4"
        class="block w-full pointer-events-none select-none"
      />
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="text-3xl font-bold text-gray-600 leading-tight">
          <div>創新</div>
          <div>設計風格</div>
        </div>
      </div>
    </div>

    <div class="ball relative w-[380px]">
      <img
        src="@/assets/img/RoundOutline.png"
        alt="圓形邊框 5"
        class="block w-full pointer-events-none select-none"
      />
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="text-3xl font-bold text-gray-600 leading-tight">
          <div>多元</div>
          <div>系統功能</div>
        </div>
      </div>
    </div>
  </div>

  <div class="py-10 px-72 text-2xl text-gray-500 text-center leading-loose tracking-wide">
    <p>
      在資訊快速更迭的浪潮中，企業若要脫穎而出，
      需要的不只是漂亮的網站，而是一個能夠長期支撐品牌發展的數位夥伴。
    </p>
    <p>
      我們深知，每一個專案都承載著企業的願景與信任。
      因此我們不只提供網站建置服務，更注重策略規劃、設計體驗與技術細節，
      讓每一個作品都能真正成為品牌價值的延伸。
      從形象官網到電商平台，從資訊整合到創新應用，這不僅是一項服務，更是一份承諾
    </p>
    <p class="text-rose-700 font-extrabold">
      ——陪伴企業在數位時代中穩健前行，並開創更多可能。
    </p>
  </div>
</template>

<script setup>
// 動畫：序列進場（避免 FOUC，支援 prefers-reduced-motion）
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const wrapRef = ref(null);

const imagesReady = (rootEl) => {
  const imgs = rootEl.querySelectorAll("img");
  return Promise.all(
    [...imgs].map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) return resolve(true);
          img.addEventListener("load", () => resolve(true), { once: true });
          img.addEventListener("error", () => resolve(true), { once: true });
        })
    )
  );
};

const playEnter = (targets) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(targets, {
      x: 0,
      opacity: 1,
      visibility: "visible",
      clearProps: "transform",
    });
    return;
  }
  gsap.set(targets, { visibility: "visible", willChange: "transform, opacity" });
  gsap.to(targets, {
    x: 0,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    stagger: 0.18,
    onComplete: () => gsap.set(targets, { clearProps: "will-change" }),
  });
};

onMounted(async () => {
  const el = wrapRef.value;
  if (!el) return;
  const targets = el.querySelectorAll(".ball");

  await imagesReady(el);

  const io = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (e?.isIntersecting) {
        playEnter(targets);
        io.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: "150px 0px -10% 0px" }
  );
  io.observe(el);
});
</script>

<style scoped>
/* 初始先隱藏並移出畫面，避免還沒綁到動畫前出現閃爍 */
.ball {
  visibility: hidden;
  opacity: 0;
  transform: translateX(100vw);
  will-change: transform, opacity;
  display: block;
}
</style>
