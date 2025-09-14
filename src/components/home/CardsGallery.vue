<template>
  <div
    class="marquee relative w-full overflow-hidden py-6"
    :data-pause-on-hover="pauseOnHover"
    :style="{ '--dur': speed + 's', '--gap': gap + 'px' }"
  >
    <div class="marquee-track">
      <div class="marquee-loop">
        <div
          v-for="(c, i) in items"
          :key="'a-' + i"
          class="w-[380px] h-[380px] shrink-0 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-black/5"
        >
          <img :src="c.img" alt="" class="h-44 w-full rounded-2xl object-cover mb-3" />
          <div class="text-xl font-semibold text-gray-800">{{ c.title }}</div>
          <div class="mt-2 text-lg text-gray-500 leading-8">{{ c.desc }}</div>
        </div>
      </div>

      <div class="marquee-loop" aria-hidden="true">
        <div
          v-for="(c, i) in items"
          :key="'b-' + i"
          class="w-[380px] h-[380px] shrink-0 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-black/5"
        >
          <img :src="c.img" alt="" class="h-44 w-full rounded-2xl object-cover mb-3" />
          <div class="text-xl font-semibold text-gray-800">{{ c.title }}</div>
          <div class="mt-2 text-lg text-gray-500 leading-8">{{ c.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  speed: { type: Number, default: 25 },
  pauseOnHover: { type: Boolean, default: true },
  gap: { type: Number, default: 24 },
});
</script>

<style scoped>
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee var(--dur) linear infinite;
}
.marquee-loop {
  display: flex;
  gap: var(--gap);
  padding-inline: var(--gap);
}
.marquee[data-pause-on-hover="true"]:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  } /* 兩組內容等寬，各佔 50% */
}
</style>
