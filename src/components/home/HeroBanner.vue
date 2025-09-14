<!-- src/components/home/HeroBanner.vue -->
<template>
  <div class="relative">
    <JustifiedGallery
      :photos="photos"
      :rowHeight="240"
      :spacing="12"
      :autoScroll="true"
      :pxPerSecond="80"
      :pauseOnHover="false"
      :fixedHeight="560"
    />

    <div
      class="absolute inset-y-0 right-0 z-10 bg-gray-50 pointer-events-auto hidden xl:block xl:w-1/2"
    >
      <div class="h-full flex justify-center items-center">
        <div class="w-full max-w-2xl px-6 md:px-10 lg:px-14 py-10">
          <MotionGroup preset="slideVisibleTop" :duration="600">
            <section>
              <p class="text-gray-600 leading-7 md:leading-8 text-base md:text-lg mb-4">
                一些模組的功能和一點特別功能，<br class="hidden md:block" />
                我們能在預算內提供最高 CP 值的服務。
              </p>
            </section>
            <section>
              <h2
                class="font-extrabold tracking-tight text-3xl md:text-5xl leading-tight mb-6 text-gray-900"
              >
                精準控制時程與預算<br class="hidden md:block" />
                與您一起探索<span class="text-rose-700">無限可能</span>
              </h2>
            </section>
            <section>
              <div class="flex flex-wrap gap-3">
                <button
                  class="inline-flex items-center rounded-full px-5 py-3 text-white bg-rose-700 hover:bg-rose-700 active:bg-rose-700 transition"
                  @click="onLearnMore"
                >
                  了解方案資訊 ›
                </button>
                <button
                  class="inline-flex items-center rounded-full px-5 py-3 border border-rose-700 text-rose-700 hover:bg-rose-50 active:bg-rose-100 transition"
                  @click="onCases"
                >
                  查看作品案例 ›
                </button>
              </div>
            </section>
          </MotionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import JustifiedGallery from "./JustifiedGallery.vue";

const onLearnMore = () => {
  console.log("learn more");
};
const onCases = () => {
  console.log("cases");
};

const photos = [
  {
    src: "https://i.pinimg.com/736x/f4/f4/cd/f4f4cd8837b7a03076d1eeee28395483.jpg",
    w: 1200,
    h: 800,
  },
  {
    src: "https://i.pinimg.com/736x/29/32/b9/2932b9384398305b27e8b78bffa9924d.jpg",
    w: 800,
    h: 1200,
  },
  {
    src: "https://i.pinimg.com/1200x/4e/6c/14/4e6c14cfdca89666bb46a57f5f63d2e3.jpg",
    w: 1000,
    h: 900,
  },
  {
    src: "https://i.pinimg.com/736x/7e/17/cb/7e17cb526139b60e2774a781c6e6d1dd.jpg",
    w: 900,
    h: 900,
  },
  {
    src: "https://i.pinimg.com/736x/37/7d/91/377d91fdb9c64bfe5b0b0d852138542c.jpg",
    w: 1080,
    h: 720,
  },
  {
    src: "https://i.pinimg.com/1200x/3a/f2/77/3af2777f23c8d67ae98eef0b9eeae797.jpg",
    w: 1220,
    h: 1080,
  },
  {
    src: "https://i.pinimg.com/736x/37/da/21/37da2134b6a048f5e34241b9f03d67fc.jpg",
    w: 1600,
    h: 700,
  },
  {
    src: "https://i.pinimg.com/736x/ed/41/e6/ed41e622295f7bfe9f2f82cbfcc9b0c1.jpg",
    w: 700,
    h: 1000,
  },
  {
    src: "https://i.pinimg.com/1200x/ec/ae/f4/ecaef408ba39e187f6c642c4b6d3142b.jpg",
    w: 1400,
    h: 950,
  },
  {
    src: "https://i.pinimg.com/736x/a6/ea/49/a6ea49819103b1a21fdeba8083f0756f.jpg",
    w: 960,
    h: 960,
  },
  {
    src: "https://i.pinimg.com/736x/32/00/c3/3200c376c21f9640b6abc58aebbbfdf1.jpg",
    w: 1170,
    h: 960,
  },
];
</script>
