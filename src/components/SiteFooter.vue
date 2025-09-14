<template>
  <footer class="mt-12 bg-white/80 backdrop-blur">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-500">
      <div>© {{ year }} MyFeCraft. All rights reserved.</div>
      <div class="mt-1 opacity-80">Built with Vue 3 · Vite · Tailwind</div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
