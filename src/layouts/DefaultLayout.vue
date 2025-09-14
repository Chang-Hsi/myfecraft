<template>
  <div class="min-h-svh flex flex-col">
    <!-- Header -->
    <SiteHeader />

    <!-- 內容區 -->
    <main class="flex-1 bg-gray-100">
      <!-- 中間主內容：由子路由渲染 -->
      <RouterView />
    </main>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
</script>
