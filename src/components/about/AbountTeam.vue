<!-- src/components/OurTeamStrip.vue -->
<template>
  <section ref="wrapRef" class="w-full">
    <div class="bg-white flex justify中心 items-center py-8">
      <img src="@/assets/img/title.png" alt="Our Team 標題" class="max-w-[85vw]" />
    </div>

    <div ref="stripRef" class="w-full grid grid-cols-1 md:grid-cols-4 overflow-x-clip">
      <div class="team-card pre-hide relative h-[60vh] md:h-[72vh] overflow-hidden group">
        <img
          src="@/assets/img/Plan.jpeg"
          alt="Our Team 功能企劃"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
        />
        <div
          class="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/60"
        ></div>

        <div
          class="absolute left-8 right-8 bottom-10 text-white drop-shadow-md pointer-events-none"
        >
          <div
            class="transition-transform duration-500 ease-out group-hover:-translate-y-10"
          >
            <div class="text-4xl md:text-5xl font-semibold">Our Team</div>
            <div class="mt-2 text-xl md:text-2xl opacity-90">功能企劃</div>
          </div>
          <p
            class="mt-4 text-base md:text-lg leading-relaxed opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            以親民價格規劃實用功能，先理解產業需求再推薦合適方案，拒絕堆砌用不到的模組，提供務實有效的解決方案。
          </p>
        </div>
      </div>

      <div class="team-card pre-hide relative h-[60vh] md:h-[72vh] overflow-hidden group">
        <img
          src="@/assets/img/PM.jpg"
          alt="Our Team 專案經理"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
        />
        <div
          class="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/60"
        ></div>

        <div
          class="absolute left-8 right-8 bottom-10 text-white drop-shadow-md pointer-events-none"
        >
          <div
            class="transition-transform duration-500 ease-out group-hover:-translate-y-10"
          >
            <div class="text-4xl md:text-5xl font-semibold">Our Team</div>
            <div class="mt-2 text-xl md:text-2xl opacity-90">專案經理</div>
          </div>
          <p
            class="mt-4 text-base md:text-lg leading-relaxed opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            掌控時程、成本與風險，梳理需求與驗收標準，用清晰溝通與節點管理，確保專案如期高品質交付。
          </p>
        </div>
      </div>

      <div class="team-card pre-hide relative h-[60vh] md:h-[72vh] overflow-hidden group">
        <img
          src="@/assets/img/FrontEnd.jpg"
          alt="Our Team 前端設計"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
        />
        <div
          class="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/60"
        ></div>

        <div
          class="absolute left-8 right-8 bottom-10 text-white drop-shadow-md pointer-events-none"
        >
          <div
            class="transition-transform duration-500 ease-out group-hover:-translate-y-10"
          >
            <div class="text-4xl md:text-5xl font-semibold">Our Team</div>
            <div class="mt-2 text-xl md:text-2xl opacity-90">前端設計</div>
          </div>
          <p
            class="mt-4 text-base md:text-lg leading-relaxed opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            專注速度與體驗，Tailwind + Vue3
            組件化落地設計，強化互動與可維護性，跨裝置一致表現。
          </p>
        </div>
      </div>

      <div class="team-card pre-hide relative h-[60vh] md:h-[72vh] overflow-hidden group">
        <img
          src="@/assets/img/BackEnd.jpg"
          alt="Our Team 後端程式"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
        />
        <div
          class="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/60"
        ></div>

        <div
          class="absolute left-8 right-8 bottom-10 text-white drop-shadow-md pointer-events-none"
        >
          <div
            class="transition-transform duration-500 ease-out group-hover:-translate-y-10"
          >
            <div class="text-4xl md:text-5xl font-semibold">Our Team</div>
            <div class="mt-2 text-xl md:text-2xl opacity-90">後端程式</div>
          </div>
          <p
            class="mt-4 text-base md:text-lg leading-relaxed opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            穩定的 API
            與資料模型設計，重視擴充與安全，支援多環境佈署，讓系統在成長中保持可控。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 進場動畫修正重點：改用 gsap.fromTo 指定起訖值，並在 onComplete 才移除 pre-hide。
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const stripRef = ref(null);

const imagesReady = (root) =>
  Promise.all(
    [...root.querySelectorAll("img")].map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) return resolve(true);
          img.addEventListener("load", () => resolve(true), { once: true });
          img.addEventListener("error", () => resolve(true), { once: true });
        })
    )
  );

const playEnter = (cards) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });
    cards.forEach((c) => c.classList.remove("pre-hide"));
    return;
  }

  gsap.fromTo(
    cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.14,
      onComplete: () => cards.forEach((c) => c.classList.remove("pre-hide")),
    }
  );
};

onMounted(async () => {
  const root = stripRef.value;
  if (!root) return;

  await imagesReady(root);

  const cards = root.querySelectorAll(".team-card");

  const io = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (e?.isIntersecting) {
        playEnter(cards);
        io.disconnect();
      }
    },
    { threshold: 0.2, rootMargin: "120px 0px -10% 0px" }
  );
  io.observe(root);
});
</script>

<style scoped>
/* FOUC 防治：初始隱藏並位移，等進入視口才淡入上滑 */
.pre-hide {
  opacity: 0;
  transform: translateY(40px);
  will-change: transform, opacity;
}
/* 可選：桌機分割線 */
@media (min-width: 768px) {
  .team-card:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
