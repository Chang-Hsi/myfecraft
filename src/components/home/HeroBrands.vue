<template>
  <div class="flex flex-col items-center gap-6">
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
      :in-view-once="true"
      class="cursor-default text-4xl text-center font-bold tracking-widest md:text-6xl"
    >
      <span class="text-rose-700">500+</span>企業的首選夥伴
      <div class="text-2xl py-8 text-gray-500">
        我們相信成果勝於空談，唯有結案並成功上線的作品，才是真正的實力
      </div>
    </motion.h1>

    <div class="w-[70vw] mx-auto mb-12">
      <BrandsGallery
        :photos="photos"
        :rowHeight="240"
        :spacing="12"
        :enter-duration="0.75"
        :col-delay="0.1"
        :row-delay="0.28"
      />
    </div>
  </div>
</template>

<script setup>
import { motion } from "motion-v";
import BrandsGallery from "./BrandsGallery.vue";

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
    src: "https://i.pinimg.com/736x/ae/11/d1/ae11d1733186c07e9d3ebbac3237233e.jpg",
    w: 1200,
    h: 800,
  },
  {
    src: "https://i.pinimg.com/1200x/af/5d/37/af5d37319fdb46d8d3e29844e41a7487.jpg",
    w: 800,
    h: 1200,
  },
  {
    src: "https://i.pinimg.com/736x/15/d7/e2/15d7e25fa488e7516f18ec9076081333.jpg",
    w: 1000,
    h: 900,
  },
  {
    src: "https://i.pinimg.com/1200x/ee/b5/2e/eeb52e5c93a0f9dcb266c9c734f8d7e4.jpg",
    w: 900,
    h: 900,
  },
  {
    src: "https://i.pinimg.com/736x/e3/28/02/e328022b8c871e387e8bf7cc6ce42b2c.jpg",
    w: 1080,
    h: 720,
  },
];
</script>
